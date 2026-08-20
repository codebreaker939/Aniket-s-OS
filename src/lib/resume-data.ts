/* ─── Resume Data Model ─────────────────────────────────── */

import { personalProfile } from "@/lib/profile-content";

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
  pdfUrl: "/assets/Aniket_cv.pdf",
  filename: "Aniket_Rai_Resume.pdf",
  lastUpdated: "AUG 2026",
  isAvailable: true,
};

/* ─── Profile Content ───────────────────────────────────── */

export const profileData = {
  systemId: "PROFILE / ANIKET-001",
  name: personalProfile.name,
  title: `${personalProfile.education} Student`,
  headline: `${personalProfile.role} · ${personalProfile.focus}`,
  location: personalProfile.location,
  status: "Open to Internships & Software Roles",
  summary:
    "B.Tech CSE student at ITM Skills University with a full-stack development foundation. Builds web applications, REST APIs, and backend services. Currently learning machine learning fundamentals, model evaluation, and software system design.",
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
      "Coordinated campus sports events and managed event logistics across departments.",
  },
  {
    role: "Student Ambassador",
    organization: "ITM Skills University",
    description:
      "Represented students during university events, helped with technical workshops, and supported peer onboarding.",
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
      "Containerized backend prototype with FastAPI, PostgreSQL, Kubernetes, and Prometheus monitoring.",
    tech: ["FastAPI", "PostgreSQL", "Docker", "Kubernetes"],
  },
  {
    name: "DisasterAlert",
    labId: "LAB-005",
    summary:
      "Emergency alert backend with automated notifications, Nginx reverse proxying, and Grafana dashboards.",
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
    title: "Machine Learning Fundamentals Track",
    issuer: "Current Learning Path",
    status: "in_progress",
  },
];

export const achievementsData: AchievementItem[] = [
  {
    title: "Aniket OS and Engineering Lab",
    description:
      "Built an OS-style portfolio that connects projects, technical case studies, live session state, and window management.",
  },
  {
    title: "University Technical & Sports Leadership",
    description:
      "Appointed Core Sports Head and Student Ambassador, leading campus initiatives and collaborative student activities.",
  },
];
