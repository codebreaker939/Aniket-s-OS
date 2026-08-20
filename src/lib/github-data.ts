/* ─── GitHub Data Types ─────────────────────────────────── */

export type RepositoryType = "project" | "experiment" | "library" | "config";

export type RepositoryStatus = "active" | "completed" | "archived";

export type RepositoryItem = {
  id: string;
  name: string;
  description: string;
  language: string;
  technologies: string[];
  githubUrl?: string;
  experimentId?: string;
  type: RepositoryType;
  status: RepositoryStatus;
};

export type GitHubProfile = {
  name: string;
  username?: string;
  bio: string;
  title: string;
  focus: string;
  profileUrl?: string;
};

export type GitHubActivity = {
  type: "commit" | "push" | "create";
  repo: string;
  message: string;
  date?: string;
};

/* ─── Configuration ─────────────────────────────────────── */

/**
 * GitHub username configuration.
 * Update this when the actual GitHub username is confirmed.
 */
export const GITHUB_USERNAME = "codebreaker939";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

/* ─── Profile Data ──────────────────────────────────────── */

export const profileData: GitHubProfile = {
  name: "Aniket Rai",
  username: GITHUB_USERNAME,
  bio: "B.Tech CSE student building web apps, backend services, and learning AI/ML fundamentals.",
  title: "Full-Stack Developer",
  focus: "AI / ML Exploration",
  profileUrl: GITHUB_PROFILE_URL,
};

/* ─── Repository Data ───────────────────────────────────── */

export const repositoriesData: RepositoryItem[] = [
  {
    id: "claimfast",
    name: "ClaimFast",
    description:
      "Full-stack MERN app with claim forms, status tracking, and role-based workflows.",
    language: "JavaScript",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: `${GITHUB_PROFILE_URL}/claimfast`,
    experimentId: "LAB-001",
    type: "project",
    status: "completed",
  },
  {
    id: "locksync",
    name: "LockSync",
    description:
      "Fault-tolerant distributed locking service with TTL expiration, heartbeat renewal, and safe release semantics.",
    language: "Python",
    technologies: ["Python 3.12", "FastAPI", "MongoDB", "Threading", "UUID"],
    githubUrl: `${GITHUB_PROFILE_URL}/locksync`,
    experimentId: "LAB-002",
    type: "experiment",
    status: "completed",
  },
  {
    id: "vehicle-maintenance-predictor",
    name: "Vehicle Maintenance Predictor",
    description:
      "Machine learning pipeline for maintenance-risk prediction from telemetry data.",
    language: "Python",
    technologies: ["Scikit-Learn", "Pandas", "NumPy", "Jupyter Notebook"],
    githubUrl: `${GITHUB_PROFILE_URL}/vehicle-maintenance-predictor`,
    experimentId: "LAB-003",
    type: "experiment",
    status: "completed",
  },
  {
    id: "helixai",
    name: "HelixAI",
    description:
      "Containerized backend prototype with FastAPI, PostgreSQL, Kubernetes, and observability tooling.",
    language: "Python",
    technologies: [
      "FastAPI",
      "PostgreSQL",
      "Docker Compose",
      "Kubernetes",
      "Jenkins",
      "Prometheus",
      "Grafana",
      "Vault",
    ],
    githubUrl: `${GITHUB_PROFILE_URL}/helixai`,
    experimentId: "LAB-004",
    type: "project",
    status: "completed",
  },
  {
    id: "disasteralert",
    name: "DisasterAlert",
    description:
      "Containerized emergency alert notification system with reverse proxy load distribution, MySQL storage, and infrastructure monitoring.",
    language: "Python",
    technologies: [
      "FastAPI",
      "MySQL",
      "Docker Compose",
      "Nginx",
      "Prometheus",
      "Grafana",
    ],
    githubUrl: `${GITHUB_PROFILE_URL}/disasteralert`,
    experimentId: "LAB-005",
    type: "project",
    status: "completed",
  },
  {
    id: "aniket-os",
    name: "Aniket OS",
    description:
      "Personal portfolio built as a desktop-style operating system interface.",
    language: "TypeScript",
    technologies: ["Next.js", "React", "Tailwind CSS", "Motion"],
    githubUrl: `${GITHUB_PROFILE_URL}/aniket-os`,
    type: "project",
    status: "active",
  },
];

/* ─── Source Control Sections ───────────────────────────── */

export type SourceControlSection = "profile" | "repositories" | "activity";

export const sourceControlSections: {
  id: SourceControlSection;
  label: string;
}[] = [
  { id: "profile", label: "PROFILE" },
  { id: "repositories", label: "REPOSITORIES" },
  { id: "activity", label: "ACTIVITY" },
];
