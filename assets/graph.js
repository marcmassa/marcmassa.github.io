/* Cytoscape.js wiring for the interactive mind-map (R9). Findings: specs/portfolio-site/findings.md F3. */
document.addEventListener('DOMContentLoaded', function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elements = [];
  GRAPH.nodes.forEach(n => elements.push({ data: { id: n.id, label: n.label, kind: n.kind, image: n.image || '', node: n } }));
  GRAPH.edges.forEach(e => elements.push({ data: { source: e.source, target: e.target } }));

  const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: elements,
    minZoom: 0.4,
    maxZoom: 2.5,
    wheelSensitivity: 0.25,
    style: [
      {
        selector: 'edge',
        style: {
          'width': 1.4,
          'line-color': '#2a3550',
          'curve-style': 'haystack',
          'haystack-radius': 0
        }
      },
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'color': '#ADB5C4',
          'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          'font-size': 11,
          'text-valign': 'bottom',
          'text-margin-y': 6,
          'text-outline-width': 0,
          'background-fit': 'cover',
          'border-width': 2,
          'transition-property': 'opacity, border-width',
          'transition-duration': 150
        }
      },
      { selector: 'node[kind = "hub"]', style: {
          'width': 92, 'height': 92, 'background-image': 'data(image)',
          'background-color': '#12314a', 'border-color': '#c98500',
          'font-size': 15, 'color': '#ECEAE3', 'font-family': 'Georgia, serif'
      }},
      { selector: 'node[kind = "primary"]', style: {
          'width': 56, 'height': 56, 'background-image': 'data(image)',
          'background-color': '#12314a', 'border-color': '#199e70', 'color': '#ECEAE3'
      }},
      { selector: 'node[kind = "leaf"]', style: {
          'width': 20, 'height': 20, 'background-color': '#199e70', 'border-color': '#0f7a56',
          'font-size': 10
      }},
      { selector: 'node[kind = "link"]', style: {
          'width': 22, 'height': 22, 'background-color': '#6E7887', 'border-color': '#4d5566',
          'font-size': 10
      }},
      { selector: '.dim', style: { 'opacity': 0.15 } },
      { selector: '.highlight', style: { 'border-width': 4, 'opacity': 1 } }
    ],
    layout: { name: 'cose', animate: !reduceMotion, idealEdgeLength: 70, nodeRepulsion: 9000, padding: 40 }
  });

  const tooltip = document.getElementById('tooltip');
  const panel = document.getElementById('panel');
  const panelBody = document.getElementById('panel-body');
  const panelClose = document.getElementById('panel-close');
  let lastFocused = null;

  function showTooltip(node, evt) {
    const d = node.data('node');
    if (!d.detail) return;
    tooltip.innerHTML = '<strong>' + d.detail.title + '</strong><br>' + d.detail.teaser;
    tooltip.style.left = evt.renderedPosition.x + 16 + 'px';
    tooltip.style.top = evt.renderedPosition.y - 10 + 'px';
    tooltip.style.display = 'block';
  }
  function hideTooltip() { tooltip.style.display = 'none'; }

  function openPanel(node) {
    const d = node.data('node');
    if (!d.detail) return;
    lastFocused = document.activeElement;
    let html = '<h2 id="panel-title">' + d.detail.title + '</h2><p class="teaser">' + d.detail.teaser + '</p><p>' + d.detail.body + '</p>';
    if (d.detail.stack) html += '<div class="meta mono">' + d.detail.stack + '</div>';
    if (d.detail.metric) html += '<div class="metric">' + d.detail.metric + '</div>';
    if (d.detail.link) html += '<a class="panel-link" href="' + d.detail.link + '" target="_blank" rel="noopener">View project →</a>';
    panelBody.innerHTML = html;
    panel.classList.add('open');
    // R10.3: move focus into the panel; R9.9: also drives the CSS transition
    panelClose.focus();
  }
  function closePanel() {
    panel.classList.remove('open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }
  panelClose.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
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
    if (reduceMotion) { openPanel(node); return; }
    // brief pulse to tie the click to the panel opening (R9.9)
    const w = node.width(), h = node.height();
    node.animate({ style: { width: w * 1.25, height: h * 1.25 } }, {
      duration: 110, easing: 'ease-out',
      complete: () => node.animate({ style: { width: w, height: h } }, { duration: 140, easing: 'ease-in' })
    });
    setTimeout(() => openPanel(node), 90);
  });

  window.addEventListener('resize', () => cy.resize());
});
