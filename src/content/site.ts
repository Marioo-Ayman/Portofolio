// Professional facts: Mario_Ayman_CV_Updated.docx supplied by the owner.
// Interests: the owner's portfolio brief. No private phone/address data is stored here.
export const site = {
  url: "https://portofolio-gamma-gilt.vercel.app",
  readyToIndex: false, // TODO: resolve the content review items below before enabling.
  name: "Mario Ayman Mofeed",
  displayName: "Mario Ayman",
  firstName: "Mario",
  role: "Full-Stack Developer",
  location: "Alexandria, Egypt",
  status: "Building business systems at Dot Net",
  email: "mario.ayman098@gmail.com",
  resumePath: "/Mario-Ayman-CV.pdf",
  github: "https://github.com/Marioo-Ayman",
  linkedin: "https://www.linkedin.com/in/mario-ayman-4822522a3",
  description: "Full-stack developer in Alexandria building React interfaces, Laravel and .NET APIs, and business systems for POS, CRM and ERP workflows.",
  heroDescription: "From React interfaces to Laravel and .NET systems, I build complete applications: real-time support, AI-assisted workflows, and the software businesses run on.",
  heroLines: ["CODE.", "SYSTEMS.", "CRAFT."],
  tagline: "Engineering complete applications. Inspired by code and culture.",
  title: "Code. Systems. Craft.",
  portrait: null as { src: string; alt: string; position?: string } | null,
} as const;

export const about = {
  heading: "From the interface to the systems behind it.",
  paragraphs: [
    "I'm Mario, a full-stack developer based in Alexandria and a Computer Science graduate of Assiut University. My work spans React and TypeScript interfaces, PHP and Laravel applications, and .NET business systems.",
    "At Dot Net, I develop POS, CRM and ERP workflows, including invoicing, inventory, reporting and access control. Alongside that work, I've built freelance applications and contributed to healthcare and travel platforms in a cross-functional team.",
    "Japanese culture, anime storytelling and games shape my eye for atmosphere and detail. I bring that attention to the interface while keeping the underlying application clear, reliable and maintainable.",
  ],
  languages: ["Arabic — native", "English — very good"],
};

export const navigation = [
  { number: "01", label: "Home", href: "#home" },
  { number: "02", label: "About", href: "#about" },
  { number: "03", label: "Arsenal", href: "#arsenal" },
  { number: "04", label: "Work", href: "#projects" },
  { number: "05", label: "Journey", href: "#journey" },
  { number: "06", label: "Contact", href: "#contact" },
] as const;

export const techGroups = [
  { index: "01", label: "Frontend", detail: "Responsive interfaces and application state",
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "HTML / CSS", "Tailwind CSS", "Redux", "Material UI"] },
  { index: "02", label: "Backend", detail: "APIs, business rules and connected systems",
    technologies: ["PHP / Laravel", "C# / ASP.NET Core", "Node.js / NestJS", "Python", "REST APIs", "Socket.IO / WebSocket", "JWT", "Windows Forms", "Odoo"] },
  { index: "03", label: "Databases", detail: "Relational data, queries and application models",
    technologies: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Entity Framework", "Prisma ORM", "LINQ"] },
  { index: "04", label: "Development Tools", detail: "Version control, integration and development workflow",
    technologies: ["Git / GitHub", "Linux / Unix", "Vite", "Axios"] },
] as const;

export type ProjectArt = "support" | "investment" | "market" | "tasks" | "travel" | "healthcare" | "quiz";
export type Project = {
  verified?: boolean;
  featured?: boolean;
  screenshot?: { src: string; alt: string };
  slug: string;
  index: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  focus: string;
  role?: string;
  frontend?: string[];
  backend?: string[];
  architecture?: string[];
  challenges?: string[];
  outcome?: string;
  stack: string[];
  features: string[];
  art: ProjectArt;
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "live-support-system", index: "01", name: "Live Support System",
    verified: true, featured: true, category: "Full-stack / Realtime", year: "2025 · Freelance",
    summary: "Real-time customer support with an embeddable widget, priority routing and multi-role staff workflows.",
    description: "A customer support platform built solo in three weeks, connecting live conversations, chat history and staff operations. The platform includes a restricted iframe widget and subscription-based access control.",
    focus: "Give customers a direct support channel while helping teams route conversations, manage tickets and handle enquiries outside working hours.",
    role: "Solo full-stack developer responsible for the support platform, live messaging, widget integration and staff workflows.",
    frontend: ["React"], backend: ["PHP", "Laravel", "Node.js", "Socket.IO", "WebSocket", "JWT"],
    stack: ["React", "Laravel", "Node.js", "Socket.IO", "JWT"],
    features: ["Live chat, file upload and searchable conversation history", "Embeddable iframe widget with domain restrictions and bot protection", "Subscription-based access control", "AI-powered queue management and priority routing", "Automated responses for off-hours tickets", "Support agent, technical specialist, team leader and administrator roles"],
    architecture: ["WebSocket / Socket.IO for real-time messaging.", "An iframe widget with domain restrictions for embedding the support channel.", "JWT and subscription-based controls around authenticated access."],
    outcome: "Delivered solo in three weeks, as documented in the CV.",
    art: "support", repoUrl: "https://github.com/Marioo-Ayman/live_support",
  },
  {
    // Keep the existing public route when replacing the generic investment entry.
    slug: "investment-experience", index: "02", name: "Honest EGY",
    verified: true, featured: true, category: "Full-stack / Business", year: "Jan 2026 · Freelance",
    summary: "A business investment platform delivered from requirements to deployment, with a React frontend and .NET API.",
    description: "A full-platform website for a business investment company, combining a responsive React and TypeScript interface with an ASP.NET Core REST backend and SQL Server.",
    focus: "Bring the company's web experience and protected business workflows into a single platform with role-based access.",
    role: "Full-stack freelance developer, covering requirements, frontend delivery, backend implementation and deployment.",
    frontend: ["React", "TypeScript", "Tailwind CSS", "Redux", "Material UI"],
    backend: ["ASP.NET Core", "JWT", "SQL Server", "Entity Framework"],
    stack: ["React", "TypeScript", "ASP.NET Core", "SQL Server", "Entity Framework"],
    features: ["JWT authentication with role-based access control", "RESTful .NET backend", "Entity Framework Code-First data model", "Responsive interface built with React, Tailwind CSS and Material UI", "Application state managed with Redux"],
    architecture: ["React frontend consuming a RESTful .NET API.", "Entity Framework Code-First modeling backed by SQL Server.", "JWT-based authentication and role-based authorization."],
    outcome: "Delivered from requirements through deployment.",
    art: "investment",
  },
  {
    slug: "ai-task-management", index: "03", name: "AI-Powered Task Management",
    verified: true, featured: true, category: "Full-stack / AI Workflows", year: "Project work",
    summary: "Turn email screenshots into structured tasks, then support assignment through organizational roles and workload.",
    description: "A full-stack task management platform using OCR and AI integration to process email screenshots, extract tasks and recommend employees. Assignment workflows account for organizational hierarchy, job roles, team membership and workload.",
    focus: "Reduce the manual work of interpreting email screenshots and connect extracted tasks to the right people and communication workflow.",
    role: "Full-stack developer of the task platform, screenshot-processing workflow and secure task assignment features.",
    frontend: ["Next.js", "React", "TypeScript"],
    backend: ["NestJS", "Python", "Prisma ORM", "SQL Server", "OCR", "AI integration"],
    stack: ["Next.js", "NestJS", "Python", "Prisma ORM", "SQL Server"],
    features: ["AI-powered email screenshot processing", "OCR-assisted task extraction", "Employee recommendations", "Assignment rules based on hierarchy, roles, teams and workload", "Email draft and dispatch tracking"],
    architecture: ["Next.js / React interface with NestJS and Python in the application stack.", "Prisma ORM and SQL Server for application data.", "OCR and AI integration for processing email screenshots."],
    art: "tasks",
  },
  {
    slug: "safarni", index: "04", name: "Safarni",
    verified: true, category: "Frontend / Team Project", year: "2025 · Team project",
    summary: "A travel booking interface for train tickets, hotels, car rentals and tourism tours.",
    description: "A team-built travel platform with train seat selection and booking experiences across several travel services. The frontend uses React and TypeScript with Redux state management and Axios API integration.",
    focus: "Organize different travel booking journeys into a responsive, connected interface.",
    role: "Frontend contributor working with a cross-functional team on the React application.",
    frontend: ["React", "TypeScript", "Tailwind CSS", "Redux", "Axios", "Vite"],
    stack: ["React", "TypeScript", "Redux", "Axios", "Vite"],
    features: ["Train booking with seat selection", "Hotel and car rental booking interfaces", "Tourism tour discovery", "Redux state management", "REST API integration with Axios"],
    architecture: ["React and TypeScript frontend built with Vite.", "Redux for application state and Axios for REST API integration."],
    art: "travel", repoUrl: "https://github.com/Huma-volve/R8_react1_safarni",
  },
  {
    slug: "cure-app", index: "05", name: "Cure App",
    verified: true, category: "Frontend / Team Project", year: "2025 · Team project",
    summary: "Healthcare booking with doctor search, location-based discovery and profile management.",
    description: "A team-built healthcare platform that lets people discover doctors by location, book sessions and manage their profiles. Leaflet maps support location-based discovery across a responsive React interface.",
    focus: "Help users find doctors and move from location-based discovery to booking a session.",
    role: "Frontend contributor to the healthcare booking platform in a cross-functional team.",
    frontend: ["React", "TypeScript", "Tailwind CSS", "Redux", "Axios", "Leaflet"],
    stack: ["React", "TypeScript", "Redux", "Axios", "Leaflet"],
    features: ["Doctor-session booking", "Profile management", "Location-based doctor search", "Leaflet map integration", "Responsive layouts"],
    architecture: ["React / TypeScript interface with Redux state and Axios integration.", "Leaflet maps for geolocation-based doctor discovery."],
    art: "healthcare", repoUrl: "https://github.com/Huma-volve/R8-React-Cure-1",
  },
  {
    slug: "online-quiz-platform", index: "06", name: "Online Quiz Platform",
    verified: true, category: "Full-stack / Education", year: "2024 · Freelance",
    summary: "A quiz management platform for teachers to create and schedule timed assessments for students.",
    description: "A PHP and Laravel application covering quiz creation, scheduling and timed student assessments, with authentication, CRUD operations and responsive UI.",
    focus: "Give teachers a structured way to manage quizzes and provide students with scheduled, timed assessments.",
    role: "Full-stack freelance developer of the quiz management application.",
    frontend: ["Tailwind CSS"], backend: ["PHP", "Laravel", "MySQL"],
    stack: ["PHP", "Laravel", "Tailwind CSS", "MySQL"],
    features: ["Teacher quiz creation and scheduling", "Timed quizzes for students", "Authentication", "Full CRUD operations", "Responsive interface"],
    architecture: ["PHP / Laravel application backed by MySQL.", "Tailwind CSS for the responsive interface."],
    art: "quiz", repoUrl: "https://github.com/Marioo-Ayman/Online-Quizzer",
  },
  {
    // Preserved from the starter, but not corroborated by the supplied CV.
    slug: "stock-market-simulator", index: "07", name: "Market Simulator",
    verified: false, category: "Full-stack / Simulation", year: "Unverified portfolio draft",
    summary: "A virtual trading environment with moving prices and portfolio analytics.",
    description: "An educational stock-trading simulator with automatic price changes, buy-and-sell operations and portfolio profit/loss calculations.",
    focus: "Designing understandable trading interactions around reliable business rules.",
    stack: ["Laravel", "React", "Redux Toolkit", "MySQL"],
    features: ["Simulated changing market prices", "Balance-aware trade validation", "Portfolio position tracking", "Profit / loss analytics"],
    art: "market",
  },
];

export const journey = [
  {
    index: "01", title: "Junior .NET Developer", organization: "Dot Net",
    dates: "Oct 2025 — Present", location: "Onsite · Alexandria",
    description: "Developing a multi-module SaaS platform for POS, CRM and ERP workflows.",
    responsibilities: [
      "Built and maintained invoice generation, printing and status tracking.",
      "Implemented inventory tracking and reorder logic.",
      "Created sales reporting dashboards using LINQ and SQL Server queries.",
      "Implemented roles, permissions and entity-definition pages; collaborated on schema design and code-first data modeling for a multi-tenant architecture.",
    ],
    stack: "C# · .NET · Windows Forms · LINQ · SQL Server",
  },
  {
    index: "02", title: "Front-End Intern", organization: "Huma-Volve",
    dates: "2024", location: "Remote",
    description: "Worked in a cross-functional agile team on two production web applications, from design to deployment.",
    responsibilities: ["Contributed to Cure App: doctor search, maps and profile management.", "Contributed to Safarni: train seat selection, hotel booking and car rentals."],
    stack: "React · TypeScript · Tailwind CSS · Redux · Axios",
  },
  {
    index: "03", title: "Odoo Development Intern", organization: "",
    dates: "2024", location: "Remote",
    description: "Developed and customized invoice-related Odoo modules, gaining practical experience with ERP and business workflows.",
    responsibilities: [],
    stack: "Odoo · Python · ERP",
  },
] as const;

export const education = {
  degree: "B.Sc. Computer Science",
  organization: "Assiut University",
  department: "Department of Computer Science",
  dates: "2020 — 2024",
};

export const training = [
  { title: "React Basics", provider: "Meta / Coursera", date: "Oct 2025", format: "Online" },
  { title: ".NET Full Stack Foundation", provider: "Board Infinity", date: "Sep 2025", format: "Online" },
  { title: "Full Stack Developer (PHP & Laravel)", provider: "Digital Egypt Pioneers Initiative (DEPI)", date: "Jun 2024", format: "Offline" },
  { title: "Building Web Applications with PHP & MySQL", provider: "", date: "Sep 2023", format: "Online" },
  { title: "Software Engineering", provider: "ALX Africa", date: "Feb 2023", format: "Online" },
  { title: "Introduction to Network Security", provider: "ITI", date: "Jun 2022", format: "Online" },
  { title: "Computer Network Fundamentals", provider: "ITI", date: "Jun 2022", format: "Online" },
] as const;

// Editorial review queue, not rendered as public career claims.
export const contentTodos = [
  "TODO: provide a portrait and authentic project screenshots.",
  "TODO: confirm why Huma-Volve experience is dated 2024 but Cure/Safarni projects are dated 2025.",
  "TODO: provide the Odoo internship organization and the PHP/MySQL training provider.",
  "TODO: provide the AI task-management project date and any public project links.",
  "TODO: provide Honest EGY public links; confirm whether prior bilingual/RTL portfolio notes refer to this project.",
  "TODO: verify the CV's live widget destination (https://platform.tkdsservers.com/events) before enabling a demo link.",
  "TODO: confirm whether the retained Market Simulator draft is real work before featuring it.",
  "TODO: provide documented technical challenges if deeper case-study retrospectives are desired.",
  "TODO: review the public-safe CV PDF and production content before enabling indexing.",
] as const;
