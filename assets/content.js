/*
 * Single source of truth for portfolio copy (R8 — editable without touching layout).
 * TODO markers below need Marc's input before the first deploy.
 */
const SITE_DATA = {
  name: "Marc Massa Capó",
  tagline: "DevOps Engineer → AI Platform & Agent Systems Architect",
  location: "Palma de Mallorca · Remote",
  intro: "Building the infrastructure that lets AI agents run in production, not just demos.",

  projects: [
    {
      name: "SecurIT",
      role: "Sole developer, end-to-end",
      description: "DevSecOps compliance platform that centralizes security, quality, and SDLC reports from every tool into a single dashboard. Built after evaluating market alternatives that were too expensive and bloated.",
      stack: "Python · React · PostgreSQL",
      metric: "Adopted across 30+ product teams at Indra — review time cut from days to hours",
      link: null
    },
    {
      name: "Hypermove",
      role: "Core contributor",
      description: "VMware Exit project — migrating infrastructure off VMware as part of a large-scale platform transition.",
      stack: "Kubernetes · Terraform",
      metric: null,
      link: null
    },
    {
      name: "Harness Dashboard",
      role: "Creator & maintainer",
      description: "VS Code/IDE extension for visualizing and developing AI architectures on a graphical whiteboard. Part of the Harness SDD Framework — a spec-driven development template combining harness engineering with agentic workflows.",
      stack: "TypeScript",
      metric: "2.3k+ installs on Open-VSX",
      link: "https://github.com/marcmassa/harness-manager"
    }
  ],

  skills: [
    "GKE", "Vertex AI", "Gemini Enterprise", "Kubernetes", "Terraform",
    "Azure", "OpenShift", "n8n", "MCP", "CI/CD", "Jira"
  ],

  links: {
    github: "https://github.com/marcmassa",
    kofi: "https://ko-fi.com/marcmassa",
    linkedin: "https://www.linkedin.com/in/marc-massa-capo",
    cv: null        // TODO(marc): add a link to a public-safe CV copy placed inside portfolio/ — never link directly to ../marc/
  }
};
