/* R10: real, semantic, keyboard/screen-reader accessible fallback for every graph node.
   Generated from GRAPH (single source of truth, R8) — runs before graph.js/Cytoscape,
   has no dependency on Canvas or JS graph interaction succeeding. */
document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('accessible-content');
  const byId = {};
  GRAPH.nodes.forEach(n => { byId[n.id] = n; });

  const hub = byId['hub'];
  const hubSection = document.createElement('section');
  hubSection.innerHTML = '<h2>' + hub.detail.title + '</h2><p class="teaser">' + hub.detail.teaser + '</p><p>' + hub.detail.body + '</p>';
  root.appendChild(hubSection);

  GRAPH.nodes.filter(n => n.kind === 'primary').forEach(n => {
    const section = document.createElement('section');
    section.id = 'a11y-' + n.id;
    let html = '<h2>' + n.detail.title + '</h2><p class="teaser">' + n.detail.teaser + '</p><p>' + n.detail.body + '</p>';
    if (n.detail.stack) html += '<p class="mono meta">' + n.detail.stack + '</p>';
    if (n.detail.metric) html += '<p class="metric">' + n.detail.metric + '</p>';
    if (n.detail.link) html += '<a href="' + n.detail.link + '" target="_blank" rel="noopener">View project</a>';

    const leaves = GRAPH.nodes.filter(l => l.parent === n.id);
    if (leaves.length) {
      html += '<ul>' + leaves.map(l => {
        if (l.kind === 'link') return '<li><a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + '</a></li>';
        return '<li>' + l.label + '</li>';
      }).join('') + '</ul>';
    }
    section.innerHTML = html;
    root.appendChild(section);
  });
});
