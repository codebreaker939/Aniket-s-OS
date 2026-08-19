/* ─── Resume Data Model ─────────────────────────────────── */

export type EducationItem = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
};

export type LeadershipItem = {
  role: string;
  organization: string;
  period?: string;
  description: string;
};

export type ProjectRef = {
  name: string;
  labId: string;
  summary: string;
  tech: string[];
};

export type SkillCategorySnapshot = {
  category: string;
  skills: string[];
};

export type CertificationItem = {
  title: string;
  issuer?: string;
  status: "active" | "in_progress" | "pending";
};

export type AchievementItem = {
  title: string;
  description: string;
  date?: string;
};

export type ResumeAssetConfig = {
  pdfUrl: string | null;
  filename: string;
  lastUpdated: string;
  isAvailable: boolean;
};

/* ─── Resume Config ─────────────────────────────────────── */

export const resumeConfig: ResumeAssetConfig = {
  pdfUrl: null, // Set to path string (e.g., "/resume.pdf") when file is uploaded
  filename: "Aniket_Rai_Resume.pdf",
  lastUpdated: "AUG 2026",
  isAvailable: false,
};

/* ─── Profile Content ───────────────────────────────────── */

export const profileData = {
  systemId: "PROFILE / ANIKET-001",
  name: "Aniket Rai",
  title: "B.Tech CSE Student",
  headline: "Full-Stack Developer · Exploring AI/ML",
  location: "Navi Mumbai, India",
  status: "Open to Internships & Software Engineering Opportunities",
  summary:
    "B.Tech Computer Science & Engineering student with a solid full-stack development foundation. Experienced in building structured web applications, RESTful services, and distributed primitives. Currently expanding technical depth into machine learning algorithms, model evaluation, and software system design.",
};

export const educationData: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "ITM Skills University",
    location: "Kharghar, Navi Mumbai",
    period: "2024 – 2028",
    details:
      "Core focus on Data Structures, Algorithms, Computer Systems, Networking, Database Management, and Applied Software Development.",
  },
];

export const leadershipData: LeadershipItem[] = [
  {
    role: "Core Sports Head",
    organization: "Student Council / Campus Activities",
    description:
      "Coordinated campus athletic events, managed event logistics, and fostered team dynamics across inter-departmental sports initiatives.",
  },
  {
    role: "Student Ambassador",
    organization: "ITM Skills University",
    description:
      "Represented the student body during institutional events, assisted in organizing technical workshops, and supported peer onboarding.",
  },
];

export const projectRefsData: ProjectRef[] = [
  {
    name: "ClaimFast",
    labId: "LAB-001",
    summary:
      "Insurance claim management and automation engine with document processing pipelines and role-based access control.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
  },
  {
    name: "LockSync",
    labId: "LAB-002",
    summary:
      "High-concurrency distributed locking service with TTL expiration, lock heartbeat extension, and safe release semantics.",
    tech: ["Python", "FastAPI", "MongoDB", "Threading"],
  },
  {
    name: "Vehicle Maintenance Predictor",
    labId: "LAB-003",
    summary:
      "Machine learning classification model exploring telemetry data to predict component failure windows and schedule preventive maintenance.",
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy"],
  },
  {
    name: "HelixAI",
    labId: "LAB-004",
    summary:
      "Cloud-native precision medicine architecture featuring microservice isolation, Kubernetes deployment, and Prometheus monitoring.",
    tech: ["FastAPI", "PostgreSQL", "Docker", "Kubernetes"],
  },
  {
    name: "DisasterAlert",
    labId: "LAB-005",
    summary:
      "Emergency response cloud platform with automated alert distribution, Nginx reverse proxy, and Grafana telemetry dashboards.",
    tech: ["FastAPI", "MySQL", "Nginx", "Grafana"],
  },
];

export const skillsSnapshotData: SkillCategorySnapshot[] = [
  { category: "LANGUAGES", skills: ["Python", "JavaScript", "TypeScript", "SQL", "Java"] },
  { category: "FRONTEND", skills: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"] },
  { category: "BACKEND", skills: ["Node.js", "Express.js", "FastAPI", "REST APIs"] },
  { category: "DATABASES", skills: ["MongoDB", "MySQL", "PostgreSQL"] },
  { category: "ENGINEERING", skills: ["Git", "GitHub", "Docker", "Kubernetes", "Linux", "VS Code"] },
  { category: "AI / ML", skills: ["Machine Learning Fundamentals", "Scikit-Learn", "Pandas", "NumPy"] },
];

export const certificationsData: CertificationItem[] = [
  {
    title: "Full-Stack Software Development Foundations",
    issuer: "Applied Coursework & Project Verification",
    status: "active",
  },
  {
    title: "Applied Machine Learning & AI Engineering Track",
    issuer: "Current Learning Pathway",
    status: "in_progress",
  },
];

export const achievementsData: AchievementItem[] = [
  {
    title: "Aniket OS Workstation & Engineering Lab",
    description:
      "Designed and engineered an OS-metaphor workstation portfolio integrating technical case studies, live state monitoring, and window management.",
  },
  {
    title: "University Technical & Sports Leadership",
    description:
      "Appointed Core Sports Head and Student Ambassador, leading campus initiatives and collaborative student activities.",
  },
];
