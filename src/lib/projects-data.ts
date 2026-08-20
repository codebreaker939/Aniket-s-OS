/* ─── Projects Domain Model & Data Store ─────────────────── */

export type ProjectCategory =
  | "ALL"
  | "FULL STACK"
  | "BACKEND"
  | "AI / ML"
  | "SYSTEMS"
  | "CLOUD / DEVOPS";

export type ProjectStatus = "COMPLETED" | "IN PROGRESS" | "PROJECT" | "EXPERIMENTAL";

export type Project = {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  summary: string;
  domain: string;
  categories: ProjectCategory[];
  technologies: string[];
  status?: ProjectStatus;
  experimentId?: string; // Links to Engineering Lab (e.g. LAB-001)
  githubUrl?: string;
  githubRepoName?: string;
  liveUrl?: string;
  year: string;
  featured: boolean;
};

export const projectsData: Project[] = [
  {
    id: "PRJ-001",
    name: "ClaimFast",
    slug: "claimfast",
    subtitle: "Insurance Claim Management App",
    summary:
      "Full-stack app for claim submission, document checks, and admin review workflows.",
    domain: "FULL STACK",
    categories: ["FULL STACK", "BACKEND"],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Tailwind CSS"],
    status: "COMPLETED",
    experimentId: "LAB-001",
    githubUrl: "https://github.com/codebreaker939/claimfast",
    githubRepoName: "claimfast",
    year: "2024",
    featured: true,
  },
  {
    id: "PRJ-002",
    name: "LockSync",
    slug: "locksync",
    subtitle: "Distributed Locking Service",
    summary:
      "Distributed lock service built with FastAPI and MongoDB, with TTL expiry, lock renewal, and safe release handling.",
    domain: "DISTRIBUTED SYSTEMS",
    categories: ["BACKEND", "SYSTEMS"],
    technologies: ["Python 3.12", "FastAPI", "MongoDB", "PyMongo", "Uvicorn", "UUID"],
    status: "COMPLETED",
    experimentId: "LAB-002",
    githubUrl: "https://github.com/codebreaker939/LOcksync_sd",
    githubRepoName: "LOcksync_sd",
    year: "2024",
    featured: true,
  },
  {
    id: "PRJ-003",
    name: "Vehicle Maintenance Predictor",
    slug: "v-pred",
    subtitle: "Vehicle Maintenance Predictor",
    summary:
      "Machine learning pipeline and API for predicting maintenance risk from vehicle telemetry data.",
    domain: "MACHINE LEARNING",
    categories: ["AI / ML", "BACKEND"],
    technologies: ["Python", "Scikit-Learn", "FastAPI", "Pandas", "React", "Chart.js"],
    status: "COMPLETED",
    experimentId: "LAB-003",
    githubUrl: "https://github.com/codebreaker939/V-pred",
    githubRepoName: "V-pred",
    year: "2024",
    featured: true,
  },
  {
    id: "PRJ-004",
    name: "HelixAI",
    slug: "helixai",
    subtitle: "Genomic Sequence Analysis Prototype",
    summary:
      "Genomics-focused prototype using Python, PyTorch, and FastAPI to explore DNA sequence variation analysis.",
    domain: "BIOINFORMATICS / AI",
    categories: ["AI / ML", "SYSTEMS"],
    technologies: ["Python", "PyTorch", "FastAPI", "Next.js", "Biopython", "TypeScript"],
    status: "IN PROGRESS",
    experimentId: "LAB-004",
    githubUrl: "https://github.com/codebreaker939/helixai",
    githubRepoName: "helixai",
    year: "2024",
    featured: false,
  },
  {
    id: "PRJ-005",
    name: "DisasterAlert Cloud",
    slug: "disasteralert-cloud",
    subtitle: "Emergency Alert and Telemetry System",
    summary:
      "Event-streaming system for collecting sensor alerts and routing emergency updates.",
    domain: "CLOUD & REALTIME",
    categories: ["CLOUD / DEVOPS", "SYSTEMS", "BACKEND"],
    technologies: ["Node.js", "WebSockets", "Redis", "PostgreSQL", "React", "Leaflet.js"],
    status: "COMPLETED",
    experimentId: "LAB-005",
    githubUrl: "https://github.com/codebreaker939/Disastermanagement_automated",
    githubRepoName: "Disastermanagement_automated",
    year: "2024",
    featured: false,
  },
];
