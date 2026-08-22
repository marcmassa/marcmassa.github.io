/* Cytoscape.js wiring for the interactive mind-map (R9). Findings: specs/portfolio-site/findings.md F2/F3/F6. */
document.addEventListener('DOMContentLoaded', function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Preload every node image before building the graph, so the first paint
  // never races a still-downloading background-image (fixes intermittent
  // blank icons observed 2026-08-22).
  const imageUrls = GRAPH.nodes.map(n => n.image).filter(Boolean);
  let loaded = 0;
  function whenImagesReady(cb) {
    if (imageUrls.length === 0) return cb();
    imageUrls.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => { loaded++; if (loaded === imageUrls.length) cb(); };
      img.src = src;
    });
  }

  const byId = {};
  GRAPH.nodes.forEach(n => { byId[n.id] = n; });
  function childrenOf(id) { return GRAPH.edges.filter(e => e.source === id).map(e => byId[e.target]); }
  function parentOf(id) { const e = GRAPH.edges.find(e => e.target === id); return e ? byId[e.source] : null; }

  const elements = [];
  GRAPH.nodes.forEach(n => elements.push({
    data: { id: n.id, label: n.label, kind: n.kind, image: n.image || '', flagship: !!n.flagship, node: n }
  }));
  GRAPH.edges.forEach(e => elements.push({ data: { source: e.source, target: e.target } }));

  let cy;
  whenImagesReady(() => {
    cy = cytoscape({
      container: document.getElementById('cy'),
      elements: elements,
      minZoom: 0.4,
      maxZoom: 2.5,
      wheelSensitivity: 0.25,
      style: [
        { selector: 'edge', style: {
            'width': 1.4, 'line-color': '#2a3550', 'curve-style': 'haystack', 'haystack-radius': 0
        }},
        { selector: 'node', style: {
            'label': 'data(label)', 'color': '#ADB5C4',
            'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            'font-size': 11, 'text-valign': 'bottom', 'text-margin-y': 6, 'text-outline-width': 0,
            'border-width': 2,
            'transition-property': 'opacity, border-width', 'transition-duration': 150
        }},
        { selector: 'node[kind = "hub"]', style: {
            'width': 92, 'height': 92,
            'background-color': '#12314a', 'border-color': '#c98500',
            'font-size': 15, 'color': '#ECEAE3', 'font-family': 'Georgia, serif'
        }},
        { selector: 'node[kind = "primary"]', style: {
            'width': 58, 'height': 58,
            'background-color': '#12314a', 'border-color': '#199e70', 'color': '#ECEAE3', 'font-weight': 'bold'
        }},
        { selector: 'node[kind = "secondary"]', style: {
            'width': 44, 'height': 44,
            'background-color': '#12314a', 'border-color': '#c98500', 'color': '#ECEAE3'
        }},
        { selector: 'node[?flagship]', style: { 'width': 56, 'height': 56, 'border-width': 3 } },
        { selector: 'node[kind = "leaf"]', style: {
            'width': 18, 'height': 18, 'background-color': '#199e70', 'border-color': '#0f7a56', 'font-size': 10
        }},
        { selector: 'node[kind = "link"]', style: {
            'width': 20, 'height': 20, 'background-color': '#6E7887', 'border-color': '#4d5566', 'font-size': 10
        }},
        { selector: '.dim', style: { 'opacity': 0.15 } },
        { selector: '.highlight', style: { 'border-width': 4, 'opacity': 1 } }
      ],
      layout: { name: 'cose', animate: !reduceMotion, idealEdgeLength: 75, nodeRepulsion: 9500, padding: 40 }
    });
    setupIconLayer();
    wireInteraction();
  });

  function setupIconLayer() {
    const layer = document.getElementById('node-icons-layer');
    const imgEls = {};
    cy.nodes().forEach(n => {
      const src = n.data('image');
      if (!src) return;
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      layer.appendChild(img);
      imgEls[n.id()] = img;
    });
    function sync() {
      Object.keys(imgEls).forEach(id => {
        const n = cy.getElementById(id);
        const img = imgEls[id];
        const pos = n.renderedPosition();
        const size = n.renderedWidth() * 0.72; // inset so the node's border ring stays visible
        img.style.left = pos.x + 'px';
        img.style.top = pos.y + 'px';
        img.style.width = size + 'px';
        img.style.height = size + 'px';
        img.style.opacity = n.hasClass('dim') ? 0.15 : 1;
      });
    }
    cy.on('render', sync);
    sync();
  }

  function wireInteraction() {
    const tooltip = document.getElementById('tooltip');
    const overlay = document.getElementById('focus-overlay');
    const focusCard = document.getElementById('focus-card');
    const focusClose = document.getElementById('focus-close');
    const breadcrumbEl = document.getElementById('focus-breadcrumb');
    const sideLeft = document.getElementById('focus-side-left');
    const sideRight = document.getElementById('focus-side-right');
    let lastFocused = null;
    let stack = []; // breadcrumb: array of node ids from hub-adjacent down to current

    function showTooltip(node, evt) {
      if (overlay.classList.contains('open')) return;
      const d = node.data('node');
      if (!d.detail) return;
      tooltip.innerHTML = '<strong>' + d.detail.title + '</strong><br>' + d.detail.teaser;
      tooltip.style.left = evt.renderedPosition.x + 16 + 'px';
      tooltip.style.top = evt.renderedPosition.y - 10 + 'px';
      tooltip.style.display = 'block';
    }
    function hideTooltip() { tooltip.style.display = 'none'; }

    function detailHtml(d) {
      let html = '<h2 id="focus-title">' + d.detail.title + '</h2><p class="teaser">' + d.detail.teaser + '</p>';
      if (d.detail.timeline) {
        d.detail.timeline.forEach(job => {
          html += '<div class="job"><div class="job-role">' + job.role + '</div>' +
            '<div class="job-meta mono">' + job.company + ' · ' + job.dates + '</div>' +
            '<ul>' + job.bullets.map(b => '<li>' + b + '</li>').join('') + '</ul></div>';
        });
      } else {
        html += '<p>' + d.detail.body + '</p>';
      }
      if (d.detail.stack) html += '<div class="meta mono">' + d.detail.stack + '</div>';
      if (d.detail.metric) html += '<div class="metric">' + d.detail.metric + '</div>';
      if (d.detail.links) {
        html += '<div class="card-links">' + d.detail.links.map(l =>
          '<a class="card-link" href="' + l.url + '" target="_blank" rel="noopener">' + l.label + ' →</a>'
        ).join('') + '</div>';
      }
      return html;
    }

    function sideChip(node, extraClass, label) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'side-chip' + (extraClass ? ' ' + extraClass : '');
      btn.textContent = label || node.label;
      btn.addEventListener('click', () => {
        if (node.kind === 'link' && node.url) { window.open(node.url, '_blank', 'noopener'); return; }
        if (node.detail) navigateTo(node.id);
      });
      return btn;
    }

    function renderBreadcrumb() {
      breadcrumbEl.innerHTML = '';
      stack.forEach((id, i) => {
        const n = byId[id];
        if (i > 0) {
          const sep = document.createElement('span');
          sep.className = 'crumb-sep'; sep.textContent = '/';
          breadcrumbEl.appendChild(sep);
        }
        if (i === stack.length - 1) {
          const cur = document.createElement('span');
          cur.className = 'crumb-current'; cur.textContent = n.label;
          breadcrumbEl.appendChild(cur);
        } else {
          const btn = document.createElement('button');
          btn.type = 'button'; btn.textContent = n.label;
          btn.addEventListener('click', () => { stack = stack.slice(0, i + 1); render(); });
          breadcrumbEl.appendChild(btn);
        }
      });
    }

    function render() {
      const id = stack[stack.length - 1];
      const n = byId[id];
      focusCard.innerHTML = detailHtml(n);
      renderBreadcrumb();

      sideLeft.innerHTML = '';
      const parent = parentOf(id);
      if (parent && parent.detail) {
        const label = document.createElement('div');
        label.className = 'side-label'; label.textContent = 'Back to';
        sideLeft.appendChild(label);
        sideLeft.appendChild(sideChip(parent, 'back', '← ' + parent.label));
      }

      sideRight.innerHTML = '';
      const kids = childrenOf(id).filter(k => k && (k.detail || k.kind === 'link'));
      if (kids.length) {
        const label = document.createElement('div');
        label.className = 'side-label'; label.textContent = 'Explore';
        sideRight.appendChild(label);
        kids.forEach(k => sideRight.appendChild(sideChip(k)));
      }
    }

    function navigateTo(id) {
      stack.push(id);
      render();
    }

    function openFocus(nodeId, evt) {
      const n = byId[nodeId];
      if (!n.detail) return;
      hideTooltip();
      lastFocused = evt && evt.originalEvent ? evt.originalEvent.target : document.activeElement;
      stack = [nodeId];
      render();
      overlay.classList.add('open');
      if (cy) { cy.userPanningEnabled(false); cy.userZoomingEnabled(false); }
      focusClose.focus();
    }
    function closeFocus() {
      overlay.classList.remove('open');
      stack = [];
      if (cy) { cy.userPanningEnabled(true); cy.userZoomingEnabled(true); }
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }
    focusClose.addEventListener('click', closeFocus);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeFocus(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeFocus();
    });

    cy.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      showTooltip(node, evt);
      const neighborhood = node.closedNeighborhood();
      cy.elements().not(neighborhood).addClass('dim');
      neighborhood.addClass('highlight');
    });
    cy.on('mouseout', 'node', () => {
      hideTooltip();
      cy.elements().removeClass('dim highlight');
    });
    cy.on('mousemove', 'node', (evt) => showTooltip(evt.target, evt));

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const d = node.data('node');
      if (d.kind === 'link' && d.url) {
        window.open(d.url, '_blank', 'noopener');
        return;
      }
      if (!d.detail) return;
      openFocus(d.id, evt);
    });

    window.addEventListener('resize', () => { if (cy) cy.resize(); });
    // R10: the graph panel can be hidden/shown via the Graph/List tabs — Cytoscape
    // needs an explicit resize+fit when its container goes from display:none back to visible.
    document.addEventListener('graph-panel-shown', () => { if (cy) { cy.resize(); cy.fit(undefined, 30); } });
  }
});
