/* Cytoscape.js wiring for the interactive mind-map (R9). Findings: specs/portfolio-site/findings.md F2/F3/F6. */
document.addEventListener('DOMContentLoaded', function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elements = [];
  GRAPH.nodes.forEach(n => elements.push({
    data: { id: n.id, label: n.label, kind: n.kind, image: n.image || '', flagship: !!n.flagship, node: n }
  }));
  GRAPH.edges.forEach(e => elements.push({ data: { source: e.source, target: e.target } }));

  const cy = cytoscape({
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
          'background-fit': 'cover', 'border-width': 2,
          'transition-property': 'opacity, border-width', 'transition-duration': 150
      }},
      { selector: 'node[kind = "hub"]', style: {
          'width': 92, 'height': 92, 'background-image': 'data(image)',
          'background-color': '#12314a', 'border-color': '#c98500',
          'font-size': 15, 'color': '#ECEAE3', 'font-family': 'Georgia, serif'
      }},
      { selector: 'node[kind = "primary"]', style: {
          'width': 58, 'height': 58, 'background-image': 'data(image)',
          'background-color': '#12314a', 'border-color': '#199e70', 'color': '#ECEAE3', 'font-weight': 'bold'
      }},
      { selector: 'node[kind = "secondary"]', style: {
          'width': 44, 'height': 44, 'background-image': 'data(image)',
          'background-color': '#12314a', 'border-color': '#c98500', 'color': '#ECEAE3'
      }},
      // F6: size = importance WITHIN a tier — SecurIT is the flagship project (marc/AGENTS.md rule 4)
      { selector: 'node[?flagship]', style: { 'width': 56, 'height': 56, 'border-width': 3 } },
      { selector: 'node[kind = "leaf"]', style: {
          'width': 18, 'height': 18, 'background-color': '#199e70', 'border-color': '#0f7a56', 'font-size': 10
      }},
      { selector: 'node[kind = "link"]', style: {
          'width': 20, 'height': 20, 'background-color': '#6E7887', 'border-color': '#4d5566', 'font-size': 10
      }},
      { selector: '.dim', style: { 'opacity': 0.15 } },
      { selector: '.highlight', style: { 'border-width': 4, 'opacity': 1 } },
      { selector: '.card-open', style: { 'opacity': 0 } }
    ],
    layout: { name: 'cose', animate: !reduceMotion, idealEdgeLength: 75, nodeRepulsion: 9500, padding: 40 }
  });

  const tooltip = document.getElementById('tooltip');
  const card = document.getElementById('node-card');
  const cardBody = document.getElementById('node-card-body');
  const cardClose = document.getElementById('node-card-close');
  const cardBackdrop = document.getElementById('card-backdrop');
  const cyContainer = document.getElementById('cy');
  let lastFocused = null;
  let openNodeId = null;

  function showTooltip(node, evt) {
    if (card.classList.contains('open')) return;
    const d = node.data('node');
    if (!d.detail) return;
    tooltip.innerHTML = '<strong>' + d.detail.title + '</strong><br>' + d.detail.teaser;
    tooltip.style.left = evt.renderedPosition.x + 16 + 'px';
    tooltip.style.top = evt.renderedPosition.y - 10 + 'px';
    tooltip.style.display = 'block';
  }
  function hideTooltip() { tooltip.style.display = 'none'; }

  function detailHtml(d) {
    let html = '<h2 id="card-title">' + d.detail.title + '</h2><p class="teaser">' + d.detail.teaser + '</p>';
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

  // R9.5: the node itself opens — an HTML card anchored at the node's on-screen position,
  // scaling up from that point, rather than a decoupled side panel.
  function openCard(node, evt) {
    const d = node.data('node');
    if (!d.detail) return;
    hideTooltip();
    lastFocused = evt && evt.originalEvent ? evt.originalEvent.target : document.activeElement;
    openNodeId = node.id();

    const pos = node.renderedPosition();
    const rect = cyContainer.getBoundingClientRect();
    const cardW = Math.min(360, window.innerWidth - 32);
    const cardMaxH = Math.min(420, window.innerHeight * 0.6);
    let left = rect.left + pos.x - cardW / 2;
    let top = rect.top + pos.y + 30;
    left = Math.max(16, Math.min(left, window.innerWidth - cardW - 16));
    top = Math.max(rect.top + 16, Math.min(top, window.innerHeight - cardMaxH - 16));

    cardBody.innerHTML = detailHtml(d);
    card.style.setProperty('--origin-x', (rect.left + pos.x - left) + 'px');
    card.style.setProperty('--origin-y', (rect.top + pos.y - top) + 'px');
    card.style.left = left + 'px';
    card.style.top = top + 'px';
    card.style.maxHeight = cardMaxH + 'px';

    node.addClass('card-open');
    cy.userPanningEnabled(false);
    cy.userZoomingEnabled(false);
    card.classList.add('open');
    cardBackdrop.classList.add('open');
    cardClose.focus();
  }
  function closeCard() {
    card.classList.remove('open');
    cardBackdrop.classList.remove('open');
    if (openNodeId) cy.getElementById(openNodeId).removeClass('card-open');
    openNodeId = null;
    cy.userPanningEnabled(true);
    cy.userZoomingEnabled(true);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }
  cardClose.addEventListener('click', closeCard);
  cardBackdrop.addEventListener('click', closeCard);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && card.classList.contains('open')) closeCard();
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
    openCard(node, evt);
  });

  window.addEventListener('resize', () => { cy.resize(); if (card.classList.contains('open')) closeCard(); });
});
