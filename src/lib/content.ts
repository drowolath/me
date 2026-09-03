export const profile = {
  name: "Thomas Ayih-Akakpo",
  role: "Software Engineer",
  subroles: [
    "Integration & Data Engineering Lead",
    "Custom API & ERP Solutions",
  ],
  summary:
    "Most data problems at fast-growing companies are actually integration problems. Webhooks silently drop, ERPs drift from storefronts, and pipelines choke under volume. I find where these systems are structurally weak, and rebuild them to scale.",
  detail:
    "With 16+ years designing distributed systems, I thrive on creating a single source of truth across a company's multiple domains and stabilizing architectures under real production load.",
  openTo: [
    "Data Engineer",
    "Lead Software Engineer",
    "Engineering Manager",
  ],
};

export const stack = [
  { group: "Languages & Frameworks", items: ["Python (FastAPI, DRF)", "TypeScript (NestJS)"] },
  { group: "Data", items: ["PostgreSQL", "Redis"] },
  { group: "Platform", items: ["Docker"] },
];

export const method = [
  {
    step: "01",
    title: "Diagnose",
    body: "Map the flows that actually run between systems in production — not what the architecture diagram says. That's where the breaking points hide.",
  },
  {
    step: "02",
    title: "Design",
    body: "Define a single source of truth per domain, with explicit contracts between services: idempotence, retries, observability — not a silent patch.",
  },
  {
    step: "03",
    title: "Stabilize",
    body: "Ship an architecture the team can evolve without me: documented, load-tested, with guardrails that replace manual vigilance.",
  },
];

type Project = {
  name: string;
  href: string | null;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "Paybriq",
    href: "https://paybriq.com/",
    description:
      "A Django-based payment processing API that sits as middleware in front of multiple mobile money payment providers , soon bank cards, and digital wallets. Handles customer management, API keys, real-time payment status via webhooks, and public payment status pages, with full audit logging across every transaction.",
    tags: ["Python", "Django", "Payments", "Webhooks"],
  },
  {
    name: "Cortex",
    href: "https://github.com/drowolath/cortex",
    description:
      "An intelligent agent orchestrator that coordinates agentic workflows across multiple MCP (Model Context Protocol) servers in a multi-tenant environment. Combines natural language routing with secure credential handling and a Docker-based deployment that scales the API independently from the MCP servers it manages.",
    tags: ["Python", "LiteLLM", "MCP", "Docker"],
  },
  {
    name: "llm-trace-proxy",
    href: "https://github.com/drowolath/llm-trace-proxy",
    description:
      "A zero-code, async HTTP reverse proxy that sits in front of commercial LLM providers (OpenAI, Anthropic) to track cost, latency, and token usage per tenant — without touching the calling application. Handles streaming responses and exports observability data asynchronously.",
    tags: ["Python", "Async", "Observability"],
  },
];

type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Head of IT",
    company: "Acipenser Madagascar",
    period: "2018 – 2026",
    description:
      "Owned data and systems end to end: simplified KPI tracking for data-driven decisions, built e-commerce platforms for luxury goods, designed internal tools to improve forecasting and productivity, and implemented an ERP to streamline logistics and distribution.",
  },
  {
    role: "Lead Software Engineer",
    company: "Blueline Entreprise",
    period: "2017 – 2018",
    description:
      "Owned architecture through deployment (testing, continuous integration, code reviews) to give the development team the environment to ship production-ready, enterprise-class applications.",
  },
  {
    role: "Research & Development Engineer",
    company: "Blueline Entreprise",
    period: "2010 – 2016",
    description:
      "Designed new solutions on pre-production projects: an API gateway interfacing internal services, a home-built GPS tracking system with KPIs on response and installation times, and a content delivery network for local DTV broadcasting on custom hardware.",
  },
  {
    role: "Software Developer, Intern",
    company: "Xone Technologies",
    period: "2010",
    description:
      "Built a Python adaptation layer used as the base for connectors on a mobile banking exchange platform in Dakar, Senegal.",
  },
];

export const contact = {
  email: "thomas@ayih-akakpo.org",
  linkedin: "https://www.linkedin.com/in/thomasayihakakpo/",
  github: "https://github.com/drowolath",
};
