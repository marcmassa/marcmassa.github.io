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
      detail: { title: 'Skills', teaser: 'Stack across cloud, AI infra, and automation — plus how I actually work',
        body: 'Real hands-on tools, not just certifications — and how each one shows up in my day-to-day work.',
        hardSkillGroups: [
          { category: 'Cloud & AI Platforms', items: [
            { name: 'GCP', note: 'By far my primary cloud — Compute Engine, Cloud SQL, Load Balancing, Cloud Run, GKE, and IaC-managed infrastructure end to end' },
            { name: 'GKE', note: 'Operating production workloads on Google Kubernetes Engine' },
            { name: 'Gemini Enterprise Agent Platform', note: 'AI platform work — model serving & agent orchestration (Vertex AI\'s current branding post Cloud Next 2026)' },
            { name: 'Azure', note: 'Cloud infrastructure and services on Microsoft Azure' },
            { name: 'OpenShift', note: 'Enterprise Kubernetes — used at RIU Hotels to containerize critical services (+50% resilience)' }
          ] },
          { category: 'Automation & Agentic AI', items: [
            { name: 'n8n', note: 'Workflow automation, from deterministic pipelines to agent-assisted flows' },
            { name: 'MCP', note: 'Connecting agent workflows to real tools and data via the Model Context Protocol' }
          ] },
          { category: 'Container Orchestration & IaC', items: [
            { name: 'Kubernetes', note: 'Container orchestration across cloud and on-prem environments' },
            { name: 'Terraform', note: 'Infrastructure as code for reproducible cloud provisioning' },
            { name: 'Argo CD', note: 'GitOps continuous delivery for Kubernetes, paired with Terraform for declarative infra' },
            { name: 'GitOps', note: 'Git as the single source of truth for infra and config state' }
          ] },
          { category: 'CI/CD & Version Control', items: [
            { name: 'Jenkins', note: 'Pipeline automation — helped cut GCP Cloud Run costs 30% at Indra' },
            { name: 'GitLab CI', note: 'Pipeline automation across Indra projects, alongside Jenkins' },
            { name: 'GitHub Actions', note: 'CI/CD for open-source projects, including Harness Dashboard' },
            { name: 'Azure DevOps', note: 'Pipelines and work-item tracking on Microsoft\'s DevOps suite' }
          ] },
          { category: 'Languages', items: [
            { name: 'Python', note: 'SecurIT\'s backend and automation tooling' },
            { name: 'TypeScript', note: 'SecurIT frontend and the Harness Dashboard extension' },
            { name: 'Go', note: 'Hypermove\'s migration engine and backend services' }
          ] },
          { category: 'Ticketing & Task Management', items: [
            { name: 'Jira', note: 'Daily ticketing and workflow tracking across teams' },
            { name: 'EasyVista', note: 'ITSM ticketing for infrastructure and support requests' },
            { name: 'OpenProject', note: 'Project management and planning' },
            { name: 'ITIL', note: 'Working within ITIL-aligned service management practices' },
            { name: 'Agile / Kanban', note: 'Day-to-day delivery workflow across teams' }
          ] }
        ],
        softSkills: [
          { name: 'Ownership', note: 'Taking a project from architecture to production alone and owning the outcome (SecurIT, Hypermove)' },
          { name: 'Cross-team collaboration', note: 'Partnering across DevOps, business development, and client-facing teams to land shared wins' },
          { name: 'Build-vs-buy judgment', note: 'Evaluating market alternatives honestly before deciding to build in-house (SecurIT)' },
          { name: 'Technical documentation', note: 'Structuring collaboration between humans and AI agents (Harness SDD Framework)' }
        ] } },

    { id: 'certifications', label: 'Certifications', kind: 'primary', image: 'assets/icons/certifications.svg',
      detail: { title: 'Certifications', teaser: 'Google Skills (Gold League, both profiles) + infrastructure & AI foundations',
        body: 'Education: Sys. Admin and Networking (ASIR), Sant Josep Obrer. Every badge below is real and dated — pulled directly from my two Google Skills profiles.',
        certGroups: [
          { category: 'Gemini Enterprise Agent Platform — Governance & Security (2026)', items: [
            'Govern Agent Access with Gemini Enterprise Agent Platform', 'Secure your Agents with Gemini Enterprise Agent Platform',
            'Govern agents with Agent Gateway, Agent Registry, and Policies', 'Model Armor: Securing AI Deployments',
            'Deploy Gemini Enterprise with Workspace Data Sources and Model Armor'
          ] },
          { category: 'Gemini Enterprise Agent Platform — Deployment & Search (2026)', items: [
            'Improve Agent Search Results on Agent Platform', 'Agent Search UI configurations on Agent Platform',
            'Deploy the Gemini Enterprise app to Transform Enterprises', 'Deploy Multi-Agent Systems with Gemini Enterprise Agent Platform',
            'Plan Change Management for Gemini Enterprise Deployments', 'Add Agents to Gemini Enterprise',
            'Accelerate Knowledge Exchange with Gemini Enterprise', 'Introduction to Gemini Enterprise',
            'Create Your First Gemini Enterprise Application', 'Enterprise Agents and Use Cases'
          ] },
          { category: 'Agent Development Kit (ADK) & Agent Fundamentals (2026)', items: [
            'Engineer AI Agents with Agent Development Kit (ADK)', 'Build Your First Agent with Agent Development Kit (ADK)',
            'Build Agents with Agent Development Kit (ADK)', 'Agent Fundamentals', 'Introduction to AI Agents',
            'Use a Third-Party Identity Provider with Workforce Identity Federation'
          ] },
          { category: 'Generative AI Foundations (2023)', items: [
            'Introduction to Generative AI', 'Introduction to Large Language Models', 'Introduction to Responsible AI',
            'Generative AI Fundamentals', 'Introduction to Vertex AI Studio', 'Introduction to Image Generation',
            'Create Image Captioning Models', 'Transformer Models and BERT Model', 'Attention Mechanism', 'Encoder-Decoder Architecture'
          ] },
          { category: 'Gen AI: Navigate & Transform series (2026)', items: [
            'Gen AI Agents: Transform Your Organization', 'Gen AI Apps: Transform Your Work',
            'Gen AI: Navigate the Landscape', 'Gen AI: Unlock Foundational Concepts', 'Gen AI: Beyond the Chatbot'
          ] },
          { category: 'Infrastructure & Networking', items: [
            'Implementing Cloud Load Balancing for Compute Engine', 'RHCSA (Red Hat Certified)', 'CCNA (Cisco Networking)',
            'K8s for IT Admin (LinkedIn)', 'Snyk Security for Devs', 'Security Monitoring'
          ] },
          { category: 'AI Foundations (external)', items: [
            'CS50 AI with Python — Harvard/edX (2026)', 'Orchestrating Workflows for GenAI — DeepLearning.AI',
            'Claude Code: Agentic Coding — DeepLearning.AI'
          ] }
        ],
        links: [
          { label: 'Google Skills — work profile (Gold League)', url: 'https://partner.skills.google/public_profiles/233d475a-59ee-4c93-946f-c3b893ae5375' },
          { label: 'Google Skills — personal profile (Gold League)', url: 'https://www.skills.google/public_profiles/38b79667-4fb6-4ebc-aa2c-49376698ba1a' }
        ] } },

    { id: 'books', label: 'Books', kind: 'primary', image: 'assets/icons/books.svg',
      detail: { title: 'Books', teaser: 'Currently reading — an ongoing list, not a finished one',
        body: 'What I\'m actively reading right now to go deeper — a short, honest, in-progress list, not padded out for show.',
        booksList: [
          { name: 'AI Engineering', author: 'Chip Huyen', note: 'Currently reading — practical foundations for building real AI/LLM applications' },
          { name: 'The Software Engineer\'s Guidebook', author: 'Gergely Orosz', note: 'Currently reading — navigating technical and career growth as a senior engineer' }
        ] } },

    { id: 'contact', label: 'Contact', kind: 'primary', image: 'assets/icons/contact.svg',
      detail: { title: 'Contact', teaser: 'GitHub, Ko-fi, LinkedIn', body: 'Connected nodes open directly — no detail panel for pure links.' } },

    // Projects (secondary tier, under "Projects")
    { id: 'securit', label: 'SecurIT', kind: 'secondary', flagship: true, image: 'assets/icons/securit.svg',
      detail: { title: 'SecurIT', teaser: 'Sole developer, end-to-end — adopted across 30+ teams at Indra',
        body: 'Kubernetes-native DevSecOps compliance platform centralizing every analysis and test result of a product — SonarQube, Trivy, SBOM (CycloneDX/SPDX), Dependency-Check — into a single place. AI-powered (Google ADK/Gemini) license mitigation.',
        stack: 'Python · TypeScript · React · PostgreSQL · Kubernetes', metric: 'Adopted across 30+ product teams at Indra — review cycles cut from days to hours' } },

    { id: 'hypermove', label: 'Hypermove', kind: 'secondary', image: 'assets/icons/hypermove.svg',
      detail: { title: 'Hypermove', teaser: 'Developer, Product Owner & architect — VMware Exit migration solution',
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

    { id: 'framework', label: 'Harness SDD Framework', kind: 'secondary', image: 'assets/icons/framework.svg',
      detail: { title: 'Harness SDD Framework', teaser: 'The methodology this very portfolio was built with — and this is a live example of it',
        body: 'An open-source template for structuring a repo so AI agents can work in it autonomously, traceably, and verifiably — combining four ideas: Harness Engineering (the repo IS the system — AGENTS.md, specs/, progress/ as shared memory instead of a person\'s head or a chat log), Spec-Driven Development (no code before requirements → design → tasks are written and approved), a Human-in-the-Loop gate (a human reviews and approves every spec before implementation starts — no exceptions, even when the agent disagrees), and Context Engineering (state lives on disk, not in the conversation — a new session reads one distilled file instead of re-deriving history from a growing transcript, which keeps inference cost flat instead of scaling with conversation length). It also standardizes on the emerging AGENTS.md convention for cross-CLI agent instructions, with subagents (harness/spec-author/implementer/reviewer), skills loaded via progressive disclosure, and lifecycle hooks — one manifest (`agentic.json`) rendered into whichever CLI is actually running (Claude Code, Gemini CLI, opencode). This site is a live example, not a demo: every round of feedback in this conversation became a spec update in `specs/portfolio-site/`, reviewed before I (the agent) touched the code — including a local/global steering pilot giving directories under parent, and `portfolio/` their own guardrails.',
        stack: 'Bash · JSON manifest · Python renderer',
        diagrams: [
          { src: 'assets/diagrams/harness-engineering.svg', caption: 'Harness Engineering — the four pillars' },
          { src: 'assets/diagrams/sdd-flow.svg', caption: 'Spec-Driven Development — the lifecycle' },
          { src: 'assets/diagrams/hitl-gate.svg', caption: 'Human-in-the-Loop — the approval gate in detail' },
          { src: 'assets/diagrams/context-engineering.svg', caption: 'Context engineering — why state lives on disk' },
          { src: 'assets/diagrams/agent-architecture.svg', caption: 'AI agent standards — AGENTS.md, subagents, hooks' }
        ],
        links: [
          { label: 'Harness Dashboard (companion VS Code extension)', url: 'https://open-vsx.org/extension/marcmassacapo/harness-dashboard-vscode' }
        ] } },

    { id: 'kiro', label: 'Kiro Task Manager', kind: 'secondary', image: 'assets/icons/kiro.svg',
      detail: { title: 'Kiro Task Manager', teaser: 'Built during an AWS-Spain Kiro workshop but went beyond',
        body: 'Kanban-style task management web app with a Spanish-language UI — three columns (Por Hacer / En Progreso / Completadas) plus a productivity analytics dashboard. Single-package monorepo (no separate bundler config); ships its own MCP server.',
        stack: 'Bun · Elysia · React · Tailwind · SQLite' } },

    // Skill leaves — hard skills
    { id: 'skill-gcp', label: 'GCP', kind: 'leaf', parent: 'skills' },
    { id: 'skill-gke', label: 'GKE', kind: 'leaf', parent: 'skills' },
    { id: 'skill-gemini', label: 'Gemini Enterprise Agent Platform', kind: 'leaf', parent: 'skills' },
    { id: 'skill-k8s', label: 'Kubernetes', kind: 'leaf', parent: 'skills' },
    { id: 'skill-tf', label: 'Terraform', kind: 'leaf', parent: 'skills' },
    { id: 'skill-argo', label: 'Argo CD', kind: 'leaf', parent: 'skills' },
    { id: 'skill-gitops', label: 'GitOps', kind: 'leaf', parent: 'skills' },
    { id: 'skill-azure', label: 'Azure', kind: 'leaf', parent: 'skills' },
    { id: 'skill-openshift', label: 'OpenShift', kind: 'leaf', parent: 'skills' },
    { id: 'skill-n8n', label: 'n8n', kind: 'leaf', parent: 'skills' },
    { id: 'skill-mcp', label: 'MCP', kind: 'leaf', parent: 'skills' },
    { id: 'skill-jenkins', label: 'Jenkins', kind: 'leaf', parent: 'skills' },
    { id: 'skill-githubactions', label: 'GitHub Actions', kind: 'leaf', parent: 'skills'},
    { id: 'skill-azuredevops', label: 'Azure DevOps', kind: 'leaf', parent: 'skills'},
    { id: 'skill-gitlabci', label: 'GitLab CI', kind: 'leaf', parent: 'skills' },
    { id: 'skill-jira', label: 'Jira', kind: 'leaf', parent: 'skills' },
    { id: 'skill-easyvista', label: 'EasyVista', kind: 'leaf', parent: 'skills' },
    { id: 'skill-openproject', label: 'OpenProject', kind: 'leaf', parent: 'skills' },
    { id: 'skill-itil', label: 'ITIL', kind: 'leaf', parent: 'skills' },
    { id: 'skill-agilekanban', label: 'Agile / Kanban', kind: 'leaf', parent: 'skills' },
    { id: 'skill-python', label: 'Python', kind: 'leaf', parent: 'skills' },
    { id: 'skill-typescript', label: 'TypeScript', kind: 'leaf', parent: 'skills' },
    { id: 'skill-go', label: 'Go', kind: 'leaf', parent: 'skills' },
    // Skill leaves — soft skills
    { id: 'soft-ownership', label: 'Ownership', kind: 'leaf', parent: 'skills' },
    { id: 'soft-collab', label: 'Cross-team collaboration', kind: 'leaf', parent: 'skills' },
    { id: 'soft-buildbuy', label: 'Build-vs-buy judgment', kind: 'leaf', parent: 'skills' },
    { id: 'soft-docs', label: 'Technical documentation', kind: 'leaf', parent: 'skills' },

    // Project stack leaves
    { id: 'securit-py', label: 'Python', kind: 'leaf', parent: 'securit' },
    { id: 'securit-ts', label: 'TypeScript', kind: 'leaf', parent: 'securit' },
    { id: 'securit-react', label: 'React', kind: 'leaf', parent: 'securit' },
    { id: 'securit-pg', label: 'PostgreSQL', kind: 'leaf', parent: 'securit' },

    // Contact links
    { id: 'link-github', label: 'GitHub', kind: 'link', parent: 'contact', image: 'assets/icons/github.svg', url: 'https://github.com/marcmassa' },
    { id: 'link-kofi', label: 'Ko-fi', kind: 'link', parent: 'contact', image: 'assets/icons/kofi.svg', url: 'https://ko-fi.com/marcmassa' },
    { id: 'link-linkedin', label: 'LinkedIn', kind: 'link', parent: 'contact', image: 'assets/icons/linkedin.svg', url: 'https://www.linkedin.com/in/marc-massa-capo' }
  ],

  edges: [
    { source: 'hub', target: 'about' },
    { source: 'hub', target: 'experience' },
    { source: 'hub', target: 'projects' },
    { source: 'hub', target: 'skills' },
    { source: 'hub', target: 'certifications' },
    { source: 'hub', target: 'books' },
    { source: 'hub', target: 'contact' },

    { source: 'projects', target: 'securit' },
    { source: 'projects', target: 'hypermove' },
    { source: 'projects', target: 'harness' },
    { source: 'projects', target: 'kiro' },
    { source: 'projects', target: 'framework' },

    { source: 'skills', target: 'skill-gcp' },
    { source: 'skills', target: 'skill-gke' },
    { source: 'skills', target: 'skill-gemini' },
    { source: 'skills', target: 'skill-k8s' },
    { source: 'skills', target: 'skill-tf' },
    { source: 'skills', target: 'skill-argo' },
    { source: 'skills', target: 'skill-gitops' },
    { source: 'skills', target: 'skill-azure' },
    { source: 'skills', target: 'skill-openshift' },
    { source: 'skills', target: 'skill-n8n' },
    { source: 'skills', target: 'skill-mcp' },
    { source: 'skills', target: 'skill-jenkins' },
    { source: 'skills', target: 'skill-githubactions' },
    { source: 'skills', target: 'skill-azuredevops' },
    { source: 'skills', target: 'skill-gitlabci' },
    { source: 'skills', target: 'skill-jira' },
    { source: 'skills', target: 'skill-easyvista' },
    { source: 'skills', target: 'skill-openproject' },
    { source: 'skills', target: 'skill-itil' },
    { source: 'skills', target: 'skill-agilekanban' },
    { source: 'skills', target: 'skill-python' },
    { source: 'skills', target: 'skill-typescript' },
    { source: 'skills', target: 'skill-go' },
    { source: 'skills', target: 'soft-ownership' },
    { source: 'skills', target: 'soft-collab' },
    { source: 'skills', target: 'soft-buildbuy' },
    { source: 'skills', target: 'soft-docs' },

    { source: 'securit', target: 'securit-py' },
    { source: 'securit', target: 'securit-ts' },
    { source: 'securit', target: 'securit-react' },
    { source: 'securit', target: 'securit-pg' },

    { source: 'contact', target: 'link-github' },
    { source: 'contact', target: 'link-kofi' },
    { source: 'contact', target: 'link-linkedin' }
  ]
};
