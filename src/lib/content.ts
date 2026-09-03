export const profile = {
  name: "Thomas Ayih-Akakpo",
  role: "Data & Backend Architect",
  subroles: [
    "Data Pipelines, Distributed Systems & Integrations",
    "Custom API & ERP Solutions",
  ],
  summary:
    "Most data problems at fast-growing companies are actually integration problems. Webhooks silently drop, ERPs drift from storefronts, and pipelines choke under volume. I find where these systems are structurally weak, and rebuild them to scale.",
  detail:
    "With 16+ years designing distributed systems, I specialize in complex data ingestion, integration middleware, and data modelling that turns raw data into actionable performance indicators for operational leadership.",
  openTo: [
    "Data Engineer",
    "Lead Software Engineer",
    "Engineering Manager",
  ],
  location: "Antananarivo, Madagascar (UTC+3)",
};

export const achievements = [
  {
    title: "IT leadership for a multi-activity group",
    body: "Technical lead for a team of 7, running cross-functional IT across caviar production and textile divisions.",
  },
  {
    title: "€500K+ in e-commerce revenue",
    body: "Generated over 4 years through 2 custom B2C stores, designed and delivered end to end.",
  },
  {
    title: "Vector search engine, v1.0",
    body: "FAISS/pgvector visual discovery tool for a company's embroidery library, cutting the time between client request and custom-design proposal.",
  },
  {
    title: "Full production-cycle software for a fish farm",
    body: "Feeding, hatchery, rearing ponds, environmental monitoring, and caviar processing — rebuilt from the ground up.",
  },
  {
    title: "50% shorter delivery lead time",
    body: "Redesigned the engineering workflow — branching strategy, CI, code review, onboarding.",
  },
];

export const stack = [
  {
    group: "Backend & Data",
    items: [
      "Python (Django, DRF, FastAPI, Flask)",
      "TypeScript (NestJS)",
      "Celery, RabbitMQ, Redis",
      "PostgreSQL",
      "Vector search (FAISS, pgvector)",
    ],
  },
  {
    group: "Platform & Operations",
    items: [
      "Docker, Docker Swarm, Traefik",
      "Cloudflare Tunnel",
      "Linux, AWS, on-premise & hybrid infra",
      "GitHub Actions (CI/CD)",
      "Keycloak, Azure API Management",
    ],
  },
  {
    group: "Architecture & Methods",
    items: [
      "Event-driven & API-first design",
      "Modular / targeted microservices",
      "End-to-end idempotence",
    ],
  },
  {
    group: "Testing & Quality",
    items: ["Playwright", "Vitest", "pytest"],
  },
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
      "A Django-based payment processing API that sits as middleware in front of multiple mobile money payment providers, soon bank cards and digital wallets. Handles customer management, API keys, real-time payment status via webhooks, and public payment status pages, with full audit logging across every transaction.",
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
  highlights?: string[];
  stack?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Head of IT — Distribution & IT Leadership",
    company: "Acipenser Madagascar (Acipenser / Akanjo group)",
    period: "Nov 2021 – Jun 2026",
    description:
      "Took over the group's IT leadership across caviar distribution and textile development, growing the team from 3 to 7 and building the integration backbone tying Odoo, Saleor and third-party APIs together.",
    highlights: [
      "Odoo integration for distribution: order and stock management between Acipenser and its distributors (Paris, Luxembourg, New York); structured the product catalogue and achieved French e-invoicing compliance (Peppol).",
      "Event-driven integration middleware consuming webhooks across Odoo, Saleor and third-party carrier APIs — the single source of truth for group-wide data.",
      "Designed and delivered 2 B2C e-commerce stores, generating €500K+ in revenue over 4 years, with KPI reporting to steer the business.",
      "Delivered a vector search engine (FAISS/pgvector) for the brand's embroidery library, at the direct request of group leadership.",
      "Self-hosted Debian / Docker Swarm infrastructure; led the Microsoft 365 overhaul (multi-domain governance, licensing, tenant migration).",
    ],
    stack: [
      "Python",
      "Django",
      "FastAPI",
      "Odoo",
      "Saleor",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "FAISS",
      "pgvector",
      "Docker",
      "Traefik",
      "GitHub Actions",
    ],
  },
  {
    role: "Head of IT — Fish Farm & Production",
    company: "Acipenser Madagascar (Acipenser / Akanjo group)",
    period: "Nov 2018 – Nov 2021",
    description:
      "On-site technical lead rebuilding the fish farm's management software end to end, driving the technical roadmap directly.",
    highlights: [
      "Rebuilt the farm management software: feed production and distribution to sturgeons, hatchery efficiency from fertilised egg intake to hatching, population tracking across rearing ponds, environmental monitoring, and processing tracking (slaughter, curing, caviar tinning).",
    ],
  },
  {
    role: "Lead Developer / R&D Engineer",
    company: "Blueline (Gulfsat)",
    period: "2010 – 2018",
    description:
      "Eight years spanning R&D engineering and technical leadership — from telecom data pipelines and digital TV middleware to leading a 3-engineer team through a modular architecture shift.",
    highlights: [
      "Lead Developer (2017–2018): technical lead for a 3-engineer team (DevOps, backend, full-stack); moved architecture toward a modular, near-microservices approach without fully committing to it given the system's scale.",
      "Cut average delivery lead time by 50% by redesigning the engineering workflow — branching strategy, CI pipelines, code review standards, structured onboarding.",
      "Regularly presented architecture decisions and trade-offs to a non-technical executive team.",
      "R&D Engineer (2010–2016): GPS fleet tracking with a geospatial PostgreSQL schema and GPX ingestion pipelines, used by Operations to track vehicles and scheduling.",
      "Digital TV: API-first middleware as the source of truth for subscriber management and EPG data across a 3-city network; built a multi-channel broadcast tool and high-throughput event-driven backends (RabbitMQ).",
    ],
    stack: ["Python", "C++", "Django", "Flask", "RabbitMQ", "Redis", "PostgreSQL"],
  },
  {
    role: "Software Developer, Intern",
    company: "Xone Technologies",
    period: "2010",
    description:
      "Solo development (Python) of the connectors for a mobile banking exchange point in Senegal, within a team of 4 developers working mainly in Java — deployed and used in production.",
  },
];

export const education = [
  {
    degree: "MSc, Telecommunications",
    school: "ESMT, Dakar, Senegal",
    period: "2008 – 2010",
  },
  {
    degree: "BSc, Engineering Sciences",
    school: "ESMT, Dakar, Senegal",
    period: "2005 – 2008",
  },
];

export const languages = ["French (native)", "English (fluent)", "Spanish (intermediate)"];

export const contact = {
  email: "thomas@ayih-akakpo.org",
  linkedin: "https://www.linkedin.com/in/thomasayihakakpo/",
  github: "https://github.com/drowolath",
};
