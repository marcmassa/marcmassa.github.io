/* Node/edge schema for the interactive mind-map (R9). Single source of truth (R8).
   Hierarchy (F6): hub > primary (About/Experience/Projects/Skills/Contact) >
   secondary (individual projects, under Projects) > leaf/link. */
const GRAPH = {
  nodes: [
    { id: 'hub', label: 'Marc Massa Capó', kind: 'hub', image: 'assets/memoji.png',
      detail: { title: 'Marc Massa Capó', teaser: 'DevOps Engineer → AI Platform & Agent Systems Architect',
        body: 'Palma de Mallorca · Remote. Building the infrastructure that lets AI agents run in production, not just demos.' } },

    { id: 'about', label: 'About', kind: 'primary', image: 'assets/icons/about.svg',
      detail: { title: 'About', teaser: 'DevOps → AI Platform & Agent Systems Architect',
        body: '5+ years in cloud infrastructure and automation. Senior DevOps & Platform Engineer specializing in Multi-Agent Systems, LLM security, and GenAI platform engineering — now deliberately transitioning toward AI Platform & Agent Systems Architecture. Hands-on production experience with GKE, Vertex AI, and Gemini Enterprise, not just certifications.' } },

    { id: 'experience', label: 'Experience', kind: 'primary', image: 'assets/icons/experience.svg',
      detail: { title: 'Experience', teaser: '5+ years — Indra (current) → RIU Hotels',
        body: 'Career timeline, cloud infra and automation track record.',
        timeline: [
          { role: 'Senior DevOps Engineer', company: 'Indra · Palma de Mallorca (Remote)', dates: 'Feb 2023 – Present',
            bullets: ['CI/CD automation (Jenkins/GitLab) for GCP Cloud Run — 30% cost reduction', 'Created SecurIT and Hypermove (see Projects)'] },
          { role: 'DevOps Engineer', company: 'RIU Hotels · Palma de Mallorca', dates: 'Jun 2021 – Feb 2023',
            bullets: ['OpenShift orchestration for containerizing critical services — +50% resilience', 'Ansible + Jenkins automation — -25% human error'] }
        ] } },

    { id: 'projects', label: 'Projects', kind: 'primary', image: 'assets/icons/projects.svg',
      detail: { title: 'Projects', teaser: 'SecurIT, Hypermove, Harness Dashboard', body: 'Click a connected node to see each project in depth.' } },

    { id: 'skills', label: 'Skills', kind: 'primary', image: 'assets/icons/skills.svg',
      detail: { title: 'Skills', teaser: 'Stack across cloud, AI infra, and automation',
        body: 'Real hands-on tools, not just certifications — and how each one shows up in my day-to-day work.',
        skillsList: [
          { name: 'GKE', note: 'Operating production workloads on Google Kubernetes Engine' },
          { name: 'Vertex AI', note: 'Building and serving AI/ML workloads on Google Cloud\'s AI platform' },
          { name: 'Gemini Enterprise', note: 'Agent orchestration & enterprise search — Vertex AI\'s current branding post Cloud Next 2026' },
          { name: 'Kubernetes', note: 'Container orchestration across cloud and on-prem environments' },
          { name: 'Terraform', note: 'Infrastructure as code for reproducible cloud provisioning' },
          { name: 'Azure', note: 'Cloud infrastructure and services on Microsoft Azure' },
          { name: 'OpenShift', note: 'Enterprise Kubernetes — used at RIU Hotels to containerize critical services (+50% resilience)' },
          { name: 'n8n', note: 'Workflow automation, from deterministic pipelines to agent-assisted flows' },
          { name: 'MCP', note: 'Model Context Protocol — connecting AI agents to real tools and data' },
          { name: 'CI/CD', note: 'Pipeline automation (Jenkins/GitLab) — cut GCP Cloud Run costs by 30% at Indra' },
          { name: 'Jira', note: 'Daily ticketing and workflow tracking across teams' }
        ] } },

    { id: 'contact', label: 'Contact', kind: 'primary', image: 'assets/icons/contact.svg',
      detail: { title: 'Contact', teaser: 'GitHub, Ko-fi, LinkedIn', body: 'Connected nodes open directly — no detail panel for pure links.' } },

    // Projects (secondary tier, under "Projects")
    { id: 'securit', label: 'SecurIT', kind: 'secondary', flagship: true, image: 'assets/icons/securit.svg',
      detail: { title: 'SecurIT', teaser: 'Sole developer, end-to-end — adopted across 30+ teams at Indra',
        body: 'Kubernetes-native DevSecOps compliance platform centralizing every analysis and test result of a product — SonarQube, Trivy, SBOM (CycloneDX/SPDX), Dependency-Check — into a single place. AI-powered (Google ADK/Gemini) license mitigation.',
        stack: 'Python · TypeScript · React · PostgreSQL · Kubernetes', metric: 'Adopted across 30+ product teams at Indra — review cycles cut from days to hours' } },

    { id: 'hypermove', label: 'Hypermove', kind: 'secondary', image: 'assets/icons/hypermove.svg',
      detail: { title: 'Hypermove', teaser: 'Developer, Product Owner & architect — VMware Exit, full company-wide adoption',
        body: 'End-to-end VMware Exit platform, owned across the full lifecycle — architecture, product direction, and implementation: concurrent batch migration engine, automated IaC generation (K8s/Helm/Terraform), a D3 topology map with VLAN visualization, and real-time SSE log streaming.',
        stack: 'Go · React · Kubernetes · Terraform', metric: 'Full company-wide adoption as Indra\'s standard vSphere → Kubernetes migration tool' } },

    { id: 'harness', label: 'Harness Dashboard', kind: 'secondary', image: 'assets/icons/harness.svg',
      detail: { title: 'Harness Dashboard', teaser: 'Creator & maintainer — 2.3k+ installs on Open-VSX',
        body: 'VS Code/IDE extension for visualizing and developing AI architectures on a graphical whiteboard. Part of the open-source Harness SDD Framework — a spec-driven development template for structured AI-human collaboration.',
        stack: 'TypeScript', metric: '2.3k+ installs on Open-VSX',
        links: [
          { label: 'View on Open-VSX', url: 'https://open-vsx.org/extension/marcmassacapo/harness-dashboard-vscode' },
          { label: 'Source on GitHub', url: 'https://github.com/marcmassa/harness-manager' }
        ] } },

    { id: 'kiro', label: 'Kiro Task Manager', kind: 'secondary', image: 'assets/icons/kiro.svg',
      detail: { title: 'Kiro Task Manager', teaser: 'Built during an AWS-Spain Kiro workshop',
        body: 'Kanban-style task management web app with a Spanish-language UI — three columns (Por Hacer / En Progreso / Completadas) plus a productivity analytics dashboard. Single-package monorepo (no separate bundler config); ships its own MCP server.',
        stack: 'Bun · Elysia · React · Tailwind · SQLite' } },

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
    { id: 'securit-ts', label: 'TypeScript', kind: 'leaf', parent: 'securit' },
    { id: 'securit-react', label: 'React', kind: 'leaf', parent: 'securit' },
    { id: 'securit-pg', label: 'PostgreSQL', kind: 'leaf', parent: 'securit' },

    // Contact links
    { id: 'link-github', label: 'GitHub', kind: 'link', parent: 'contact', url: 'https://github.com/marcmassa' },
    { id: 'link-kofi', label: 'Ko-fi', kind: 'link', parent: 'contact', url: 'https://ko-fi.com/marcmassa' },
    { id: 'link-linkedin', label: 'LinkedIn', kind: 'link', parent: 'contact', url: 'https://www.linkedin.com/in/marc-massa-capo' }
  ],

  edges: [
    { source: 'hub', target: 'about' },
    { source: 'hub', target: 'experience' },
    { source: 'hub', target: 'projects' },
    { source: 'hub', target: 'skills' },
    { source: 'hub', target: 'contact' },

    { source: 'projects', target: 'securit' },
    { source: 'projects', target: 'hypermove' },
    { source: 'projects', target: 'harness' },
    { source: 'projects', target: 'kiro' },

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
    { source: 'securit', target: 'securit-ts' },
    { source: 'securit', target: 'securit-react' },
    { source: 'securit', target: 'securit-pg' },

    { source: 'contact', target: 'link-github' },
    { source: 'contact', target: 'link-kofi' },
    { source: 'contact', target: 'link-linkedin' }
  ]
};
