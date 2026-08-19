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
    subtitle: "Insurance Claim Management & Processing Engine",
    summary:
      "Full-stack web application designed to streamline insurance claim submissions, document verification, and workflow tracking across claimant and admin roles.",
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
    subtitle: "High-Concurrency Distributed Locking Service",
    summary:
      "Fault-tolerant distributed mutex lock manager built with FastAPI and MongoDB supporting automated TTL expiration, lock renewals, and safe release semantics.",
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
    subtitle: "Predictive Fleet Analytics & Sensor Fault Detector",
    summary:
      "Machine learning pipeline and API that evaluates vehicle telemetry sensor data to predict component failure risks and schedule preventative maintenance.",
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
    subtitle: "Genomic Sequence Analyzer & Variant Explorer",
    summary:
      "Deep learning genomic platform using PyTorch transformers to analyze DNA sequence variations and identify functional mutation impacts.",
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
    subtitle: "Real-Time Emergency Incident Response & Telemetry",
    summary:
      "Real-time event streaming telemetry platform designed to aggregate sensor alerts during natural disasters and route emergency updates.",
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
