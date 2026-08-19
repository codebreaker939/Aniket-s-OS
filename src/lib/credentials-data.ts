/* ─── Credentials Data Model ─────────────────────────────── */

export type CredentialCategory = "technical" | "academic" | "professional";

export type CredentialStatus = "verified" | "in_progress" | "documented";

export type CredentialItem = {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  credentialId?: string;
  verificationUrl?: string;
  documentUrl?: string;
  status: CredentialStatus;
  category: CredentialCategory;
  skills: string[];
  description: string;
};

export type CategoryFilterMeta = {
  id: CredentialCategory | "all";
  label: string;
};

export const categoryFilters: CategoryFilterMeta[] = [
  { id: "all", label: "ALL CREDENTIALS" },
  { id: "technical", label: "TECHNICAL TRACKS" },
  { id: "academic", label: "ACADEMIC TRACKS" },
  { id: "professional", label: "PROFESSIONAL TRACKS" },
];

/* ─── Verified Credentials Dataset ─────────────────────── */

export const credentialsData: CredentialItem[] = [
  {
    id: "cred-001",
    name: "B.Tech Computer Science & Engineering Degree Track",
    issuer: "ITM Skills University",
    issuedAt: "2024 – 2028",
    credentialId: "REG-2024-CSE-ITM",
    status: "in_progress",
    category: "academic",
    skills: ["Data Structures", "Algorithms", "Operating Systems", "Computer Networks", "DBMS", "Software Engineering"],
    description:
      "Formal academic degree pathway covering core computer science theory, algorithms, system architecture, database design, and applied engineering methodologies.",
  },
  {
    id: "cred-002",
    name: "Full-Stack Web Architecture & Engineering",
    issuer: "Aniket OS / Verified Project Portfolio",
    issuedAt: "AUG 2026",
    credentialId: "VER-FS-2026-01",
    status: "verified",
    category: "technical",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "FastAPI", "MongoDB", "Tailwind CSS"],
    description:
      "Verified technical proficiency across client-side state orchestration, server-side rendering, RESTful API architecture, asynchronous backend workflows, and modern CSS design systems.",
  },
  {
    id: "cred-003",
    name: "Applied Machine Learning & AI Engineering Fundamentals",
    issuer: "Self-Directed Learning & Laboratory Research",
    issuedAt: "AUG 2026",
    credentialId: "TRK-AIML-2026-02",
    status: "documented",
    category: "technical",
    skills: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Jupyter Notebook", "Supervised Learning"],
    description:
      "Documented learning trajectory focused on classification algorithms, feature engineering from operational data, model validation, and AI system design patterns.",
  },
  {
    id: "cred-004",
    name: "Student Leadership & Institutional Coordination",
    issuer: "ITM Skills University Student Body",
    issuedAt: "2024 – PRESENT",
    credentialId: "LDR-CORE-2024",
    status: "verified",
    category: "professional",
    skills: ["Team Leadership", "Event Operations", "Communication", "Cross-Department Logistics"],
    description:
      "Verified leadership appointment as Core Sports Head and Student Ambassador, organizing inter-college sports events, representing the student body, and coordinating peer workshops.",
  },
];
