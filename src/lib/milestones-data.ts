/* ─── Milestones Data Model ───────────────────────────────── */

export type MilestoneCategory =
  | "leadership"
  | "projects"
  | "competitions"
  | "hackathons"
  | "academic"
  | "other";

export type MilestoneItem = {
  id: string;
  title: string;
  category: MilestoneCategory;
  period: string;
  summary: string;
  role?: string;
  organization?: string;
  context?: string;
  outcome?: string;
  result?: string;
  team?: string;
  relatedExperiment?: { labId: string; name: string };
  skills?: string[];
  link?: string;
};

export type CategoryFilterMeta = {
  id: MilestoneCategory | "all";
  label: string;
};

export const milestoneCategoryFilters: CategoryFilterMeta[] = [
  { id: "all", label: "ALL MILESTONES" },
  { id: "leadership", label: "LEADERSHIP" },
  { id: "projects", label: "PROJECTS" },
  { id: "academic", label: "ACADEMIC" },
  { id: "competitions", label: "COMPETITIONS" },
  { id: "hackathons", label: "HACKATHONS" },
];

/* ─── Milestones Dataset ─────────────────────────────────── */

export const milestonesData: MilestoneItem[] = [
  {
    id: "M-001",
    title: "Core Sports Head — Campus Athletic Leadership",
    category: "leadership",
    period: "2024 – PRESENT",
    role: "Core Sports Head",
    organization: "Student Council / ITM Skills University",
    summary:
      "Coordinated campus sports activities, managed tournament logistics, and led team operations for inter-departmental athletic events.",
    context:
      "Selected to direct sports logistics, manage student teams, and foster competitive engagement across university departments.",
    outcome:
      "Successfully scheduled multi-sport tournaments, managed referee logistics, and coordinated participant onboarding across events.",
    skills: ["Team Leadership", "Event Operations", "Logistics", "Communication"],
  },
  {
    id: "M-002",
    title: "Student Ambassador Appointment",
    category: "leadership",
    period: "2024 – PRESENT",
    role: "Student Ambassador",
    organization: "ITM Skills University",
    summary:
      "Represented the university student body during institutional programs, technical workshops, and peer orientation sessions.",
    context:
      "Served as primary student liaison for campus visitors, technical workshop coordination, and new student guidance.",
    outcome:
      "Supported campus tours, workshop setups, and departmental student activities throughout the academic term.",
    skills: ["Public Presentation", "Student Engagement", "Event Operations"],
  },
  {
    id: "M-003",
    title: "Aniket OS Developer Workstation Architecture",
    category: "projects",
    period: "AUG 2026",
    role: "Lead Systems Developer",
    organization: "Independent Engineering",
    summary:
      "Architected and implemented a personal developer workstation operating system interface featuring interactive window management, desktop icons, dock, and live system monitoring.",
    context:
      "Designed as a developer workstation metaphor to showcase full-stack projects, architecture diagrams, and system state.",
    outcome:
      "Deployed responsive Next.js 15 application with multi-window Z-index ordering, custom wallpaper system, and live session uptime timers.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    id: "M-004",
    title: "LockSync Distributed Mutex Service",
    category: "projects",
    period: "AUG 2026",
    role: "Distributed Systems Developer",
    organization: "Engineering Lab",
    summary:
      "Built a fault-tolerant distributed locking service with TTL expiration, periodic lock heartbeat extension threads, and safe release semantics.",
    context:
      "Prevented race conditions across concurrent microservice workloads contending for shared critical data resources.",
    outcome:
      "Implemented FastAPI core handlers, MongoDB atomic lock indices, and automated background renewal threads.",
    relatedExperiment: { labId: "LAB-002", name: "LockSync" },
    skills: ["Python", "FastAPI", "MongoDB", "Threading", "Distributed Systems"],
  },
  {
    id: "M-005",
    title: "HelixAI Precision Medicine Infrastructure",
    category: "projects",
    period: "2026",
    role: "Cloud-Native Systems Developer",
    organization: "Engineering Lab",
    summary:
      "Designed microservice infrastructure for genomic query processing with PostgreSQL, Docker Compose, Kubernetes manifests, and Prometheus/Grafana monitoring.",
    context:
      "Containerized distributed services with continuous observability and fault-tolerant routing rules.",
    outcome:
      "Configured deployment manifests, health probes, and live telemetry dashboards.",
    relatedExperiment: { labId: "LAB-004", name: "HelixAI" },
    skills: ["FastAPI", "PostgreSQL", "Docker", "Kubernetes", "Jenkins", "Prometheus", "Grafana"],
  },
  {
    id: "M-006",
    title: "Applied ML Vehicle Breakdown Risk Classifier",
    category: "academic",
    period: "2026",
    role: "ML Student Developer",
    organization: "Applied Research",
    summary:
      "Developed machine learning classification workflow exploring sensor telemetry data to predict component failure windows prior to mechanical breakdown.",
    context:
      "Addressed class imbalance between nominal operating hours and rare failure events in operational sensor data.",
    outcome:
      "Trained Scikit-Learn models evaluating precision-recall curves and feature engineering pipeline metrics.",
    relatedExperiment: { labId: "LAB-003", name: "Vehicle Maintenance Predictor" },
    skills: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Jupyter Notebook"],
  },
];
