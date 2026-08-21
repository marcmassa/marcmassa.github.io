/* Node/edge schema for the interactive mind-map (R9). Single source of truth (R8). */
const GRAPH = {
  nodes: [
    { id: 'hub', label: 'Marc Massa Capó', kind: 'hub', image: 'assets/memoji.png',
      detail: { title: 'Marc Massa Capó', teaser: 'DevOps Engineer → AI Platform & Agent Systems Architect',
        body: 'Palma de Mallorca · Remote. Building the infrastructure that lets AI agents run in production, not just demos.' } },

    { id: 'about', label: 'About', kind: 'primary', image: 'assets/icons/about.svg',
      detail: { title: 'About', teaser: 'DevOps → AI Platform & Agent Systems Architect',
        body: 'Senior DevOps Engineer transitioning into AI Platform & Agent Systems Architecture. Hands-on with GKE, Vertex AI, and Gemini Enterprise in production — not just certifications.' } },

    { id: 'securit', label: 'SecurIT', kind: 'primary', image: 'assets/icons/securit.svg',
      detail: { title: 'SecurIT', teaser: 'Sole developer, end-to-end — adopted across 30+ teams at Indra',
        body: 'DevSecOps compliance platform that centralizes security, quality, and SDLC reports from every tool into a single dashboard. Built after evaluating market alternatives that were too expensive and bloated.',
        stack: 'Python · React · PostgreSQL', metric: 'Adopted across 30+ product teams at Indra — review time cut from days to hours' } },

    { id: 'hypermove', label: 'Hypermove', kind: 'primary', image: 'assets/icons/hypermove.svg',
      detail: { title: 'Hypermove', teaser: 'VMware Exit — core contributor',
        body: 'VMware Exit project — migrating infrastructure off VMware as part of a large-scale platform transition.',
        stack: 'Kubernetes · Terraform' } },

    { id: 'harness', label: 'Harness Dashboard', kind: 'primary', image: 'assets/icons/harness.svg',
      detail: { title: 'Harness Dashboard', teaser: 'Creator & maintainer — 2.3k+ installs on Open-VSX',
        body: 'VS Code/IDE extension for visualizing and developing AI architectures on a graphical whiteboard. Part of the Harness SDD Framework — a spec-driven development template combining harness engineering with agentic workflows.',
        stack: 'TypeScript', metric: '2.3k+ installs on Open-VSX', link: 'https://github.com/marcmassa/harness-manager' } },

    { id: 'skills', label: 'Skills', kind: 'primary', image: 'assets/icons/skills.svg',
      detail: { title: 'Skills', teaser: 'Stack across cloud, AI infra, and automation', body: 'Click a connected node to see the full stack.' } },

    { id: 'contact', label: 'Contact', kind: 'primary', image: 'assets/icons/contact.svg',
      detail: { title: 'Contact', teaser: 'GitHub, Ko-fi, LinkedIn', body: 'Connected nodes open directly — no detail panel for pure links.' } },

    // Skill leaves
    { id: 'skill-gke', label: 'GKE', kind: 'leaf', parent: 'skills' },
    { id: 'skill-vertex', label: 'Vertex AI', kind: 'leaf', parent: 'skills' },
    { id: 'skill-gemini', label: 'Gemini Enterprise', kind: 'leaf', parent: 'skills' },
    { id: 'skill-k8s', label: 'Kubernetes', kind: 'leaf', parent: 'skills' },
    { id: 'skill-tf', label: 'Terraform', kind: 'leaf', parent: 'skills' },
    { id: 'skill-azure', label: 'Azure', kind: 'leaf', parent: 'skills' },
    { id: 'skill-openshift', label: 'OpenShift', kind: 'leaf', parent: 'skills' },
    { id: 'skill-n8n', label: 'n8n', kind: 'leaf', parent: 'skills' },
    { id: 'skill-mcp', label: 'MCP', kind: 'leaf', parent: 'skills' },
    { id: 'skill-cicd', label: 'CI/CD', kind: 'leaf', parent: 'skills' },
    { id: 'skill-jira', label: 'Jira', kind: 'leaf', parent: 'skills' },

    // Project stack leaves
    { id: 'securit-py', label: 'Python', kind: 'leaf', parent: 'securit' },
    { id: 'securit-react', label: 'React', kind: 'leaf', parent: 'securit' },
    { id: 'securit-pg', label: 'PostgreSQL', kind: 'leaf', parent: 'securit' },

    // Contact links
    { id: 'link-github', label: 'GitHub', kind: 'link', parent: 'contact', url: 'https://github.com/marcmassa' },
    { id: 'link-kofi', label: 'Ko-fi', kind: 'link', parent: 'contact', url: 'https://ko-fi.com/marcmassa' },
    { id: 'link-linkedin', label: 'LinkedIn', kind: 'link', parent: 'contact', url: 'https://www.linkedin.com/in/marc-massa-capo' }
  ],

  edges: [
    { source: 'hub', target: 'about' },
    { source: 'hub', target: 'securit' },
    { source: 'hub', target: 'hypermove' },
    { source: 'hub', target: 'harness' },
    { source: 'hub', target: 'skills' },
    { source: 'hub', target: 'contact' },

    { source: 'skills', target: 'skill-gke' },
    { source: 'skills', target: 'skill-vertex' },
    { source: 'skills', target: 'skill-gemini' },
    { source: 'skills', target: 'skill-k8s' },
    { source: 'skills', target: 'skill-tf' },
    { source: 'skills', target: 'skill-azure' },
    { source: 'skills', target: 'skill-openshift' },
    { source: 'skills', target: 'skill-n8n' },
    { source: 'skills', target: 'skill-mcp' },
    { source: 'skills', target: 'skill-cicd' },
    { source: 'skills', target: 'skill-jira' },

    { source: 'securit', target: 'securit-py' },
    { source: 'securit', target: 'securit-react' },
    { source: 'securit', target: 'securit-pg' },

    { source: 'contact', target: 'link-github' },
    { source: 'contact', target: 'link-kofi' },
    { source: 'contact', target: 'link-linkedin' }
  ]
};
