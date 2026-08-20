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
      "Degree track covering data structures, algorithms, operating systems, networks, databases, and software engineering.",
  },
  {
    id: "cred-002",
    name: "Full-Stack Web Development",
    issuer: "Project Portfolio",
    issuedAt: "AUG 2026",
    credentialId: "VER-FS-2026-01",
    status: "verified",
    category: "technical",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "FastAPI", "MongoDB", "Tailwind CSS"],
    description:
      "Documented through projects using React, Next.js, REST APIs, backend services, databases, and modern CSS.",
  },
  {
    id: "cred-003",
    name: "Machine Learning Fundamentals",
    issuer: "Self-Directed Learning",
    issuedAt: "AUG 2026",
    credentialId: "TRK-AIML-2026-02",
    status: "documented",
    category: "technical",
    skills: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Jupyter Notebook", "Supervised Learning"],
    description:
      "Current learning track covering classification, feature engineering, model validation, and Python data tools.",
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
      "Core Sports Head and Student Ambassador work, including event coordination, student representation, and peer support.",
  },
];
