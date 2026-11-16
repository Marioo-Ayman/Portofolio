// SINGLE SOURCE OF TRUTH: replace these example fields with your verified details.
// No imaginary employment dates, project URLs or contact details are supplied.

export const site = {
  url: "", // Canonical HTTPS origin, without a trailing slash.
  readyToIndex: false, // Enable after verifying all public content and setting url.
  name: "Mario Ayman",
  firstName: "Mario",
  role: "Full-Stack Developer",
  location: "Egypt · Open to remote collaboration",
  status: "Available for selected projects",
  email: "", // your real email, e.g. you@domain.com; enables contact button
  resumePath: "", // e.g. /resume.pdf after placing file under public/
  github: "", // e.g. https://github.com/your-handle
  linkedin: "", // e.g. https://www.linkedin.com/in/your-handle
  description:
    "I build thoughtful digital products, from responsive interfaces to the systems powering them.",
  tagline: "Between code & culture.",
  title: "Code meets culture.",
} as const;

export const navigation = [
  { number: "01", label: "Home", href: "#home" },
  { number: "02", label: "About", href: "#about" },
  { number: "03", label: "Arsenal", href: "#arsenal" },
  { number: "04", label: "Work", href: "#projects" },
  { number: "05", label: "Journey", href: "#journey" },
  { number: "06", label: "Contact", href: "#contact" },
] as const;

export const techGroups = [
  {
    index: "01",
    label: "Frontend",
    detail: "Interfaces worth interacting with",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Material UI",
      "Motion",
    ],
  },
  {
    index: "02",
    label: "Backend",
    detail: "Logic behind every interaction",
    technologies: [
      "PHP / Laravel",
      "ASP.NET Core",
      "REST APIs",
      "Laravel Sanctum",
      "Socket.IO",
    ],
  },
  {
    index: "03",
    label: "Databases",
    detail: "Structured data behind the experience",
    technologies: ["MySQL", "SQL Server"],
  },
  {
    index: "04",
    label: "Development Tools",
    detail: "Version control, testing and delivery",
    technologies: ["Git / GitHub", "Vercel", "Insomnia"],
  },
] as const;

export type ProjectArt = "support" | "investment" | "market";
export type Project = {
  verified?: boolean;
  screenshot?: { src: string; alt: string };
  slug: string;
  index: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  focus: string;
  stack: string[];
  features: string[];
  art: ProjectArt;
  liveUrl?: string;
  repoUrl?: string;
};

// Starter entries based on discussed work. Verify copy and add your actual links/screenshots.
export const projects: Project[] = [
  {
    slug: "live-support-system",
    index: "01",
    name: "Live Support System",
    category: "Full-stack / Realtime",
    year: "Selected work",
    summary:
      "Realtime customer support, agent workflows and ticket management.",
    description:
      "A live-support platform connecting customer conversations to an agent dashboard, with a Laravel API, authentication, realtime messaging and ticket workflows.",
    focus:
      "Bringing conversations, agents and operations into one connected system.",
    stack: ["Laravel", "React", "TypeScript", "Socket.IO", "MySQL"],
    features: [
      "Agent and administrator workflows",
      "Realtime chat and status",
      "Ticket-based follow-up",
      "Authenticated API",
    ],
    art: "support",
  },
  {
    slug: "investment-experience",
    index: "02",
    name: "Investment Web Experience",
    category: "Frontend / Product",
    year: "Selected work",
    summary:
      "A bilingual investment experience designed for English and Arabic visitors.",
    description:
      "A responsive investment-company interface featuring language switching, right-to-left support, investment packages and application flows.",
    focus:
      "Making complex information feel structured, accessible and approachable.",
    stack: ["React", "TypeScript", "Tailwind CSS", "MUI", "i18next"],
    features: [
      "English / Arabic localization",
      "RTL-aware responsive UI",
      "Dynamic investment packages",
      "Validated application flows",
    ],
    art: "investment",
  },
  {
    slug: "stock-market-simulator",
    index: "03",
    name: "Market Simulator",
    category: "Full-stack / Simulation",
    year: "Selected work",
    summary:
      "A virtual trading environment with moving prices and portfolio analytics.",
    description:
      "An educational stock-trading simulator with automatic price changes, buy-and-sell operations and portfolio profit/loss calculations.",
    focus:
      "Designing understandable trading interactions around reliable business rules.",
    stack: ["Laravel", "React", "Redux Toolkit", "MySQL"],
    features: [
      "Simulated changing market prices",
      "Balance-aware trade validation",
      "Portfolio position tracking",
      "Profit / loss analytics",
    ],
    art: "market",
  },
];

export const journey = [
  {
    index: "01",
    title: "Building real products",
    eyebrow: "Independent / Project work",
    description:
      "Working across frontend interfaces, backend APIs and product delivery, with an emphasis on usable, maintainable software.",
    stack: "Full-stack · React · Laravel · .NET",
  },
  {
    index: "02",
    title: "Frontend collaboration",
    eyebrow: "Development internship",
    description:
      "Collaborated in a cross-functional team on interactive, responsive web applications and component-based interfaces.",
    stack: "React · TypeScript · Tailwind CSS",
  },
  {
    index: "03",
    title: "Exploring business systems",
    eyebrow: "Odoo development internship",
    description:
      "Worked on invoice-related applications and strengthened practical understanding of business workflows.",
    stack: "Odoo · Business applications",
  },
] as const;

// These starter entries have not been confirmed by the portfolio owner.
export const journeyVerified = false;
