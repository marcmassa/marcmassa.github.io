/* R10: real, semantic, keyboard/screen-reader accessible fallback for every graph node.
   Generated from GRAPH (single source of truth, R8) — runs before graph.js/Cytoscape,
   has no dependency on Canvas or JS graph interaction succeeding.
   Note: the hub's identity is already shown in the page header — this section
   does not repeat it as a duplicate title (fixed 2026-08-21, Marc's feedback). */
document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('accessible-content');
  const byId = {};
  GRAPH.nodes.forEach(n => { byId[n.id] = n; });
  // Note: the hub's intro/location blurb now lives in the page header (Marc's
  // request, 2026-08-22) — not repeated here to avoid the earlier duplicate-banner issue.

  function renderDetail(n) {
    let html = '<h2>' + n.detail.title + '</h2><p class="teaser">' + n.detail.teaser + '</p>';
    if (n.detail.timeline) {
      n.detail.timeline.forEach(job => {
        html += '<div class="job"><p class="job-role">' + job.role + '</p>' +
          '<p class="mono meta">' + job.company + ' · ' + job.dates + '</p>' +
          '<ul>' + job.bullets.map(b => '<li>' + b + '</li>').join('') + '</ul></div>';
      });
    } else {
      html += '<p>' + n.detail.body + '</p>';
    }
    if (n.detail.skillsList) {
      html += '<ul class="skills-list">' + n.detail.skillsList.map(s =>
        '<li><strong>' + s.name + '</strong> — ' + s.note + '</li>'
      ).join('') + '</ul>';
    }
    if (n.detail.stack) html += '<p class="mono meta">' + n.detail.stack + '</p>';
    if (n.detail.metric) html += '<p class="metric">' + n.detail.metric + '</p>';
    if (n.detail.links) {
      html += n.detail.links.map(l => '<a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + '</a>').join(' · ');
    }
    return html;
  }

  GRAPH.nodes.filter(n => n.kind === 'primary').forEach(n => {
    const section = document.createElement('section');
    section.id = 'a11y-' + n.id;
    section.innerHTML = renderDetail(n);

    // Secondary nodes (e.g. individual projects under "Projects")
    const children = GRAPH.nodes.filter(c => c.kind === 'secondary' && GRAPH.edges.some(e => e.source === n.id && e.target === c.id));
    children.forEach(c => {
      const sub = document.createElement('div');
      sub.className = 'sub-entry';
      sub.innerHTML = renderDetail(c);
      const leaves = GRAPH.nodes.filter(l => l.parent === c.id);
      if (leaves.length) sub.innerHTML += '<ul>' + leaves.map(l => '<li>' + l.label + '</li>').join('') + '</ul>';
      section.appendChild(sub);
    });

    // Leaves directly under this primary (contact links) — skipped for Skills,
    // whose leaves are already covered by the richer skillsList above.
    const leaves = n.detail.skillsList ? [] : GRAPH.nodes.filter(l => l.parent === n.id);
    if (leaves.length) {
      const ul = document.createElement('ul');
      ul.innerHTML = leaves.map(l => l.kind === 'link'
        ? '<li><a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + '</a></li>'
        : '<li>' + l.label + '</li>').join('');
      section.appendChild(ul);
    }
    root.appendChild(section);
  });
});
