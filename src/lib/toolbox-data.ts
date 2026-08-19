export type ToolProficiency = "CORE" | "WORKING WITH" | "FAMILIAR" | "EXPLORING";

export type ToolCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "engineering"
  | "ai-ml";

export type Tool = {
  id: string;
  name: string;
  category: ToolCategory;
  proficiency: ToolProficiency;
  summary: string;
  usedIn?: string[];
  relatedExperiments?: { labId: string; name: string }[];
};

export type ToolCategoryMeta = {
  id: ToolCategory;
  index: string;
  label: string;
  description: string;
};

export const toolCategories: ToolCategoryMeta[] = [
  {
    id: "languages",
    index: "01",
    label: "LANGUAGES",
    description: "Programming languages used across projects.",
  },
  {
    id: "frontend",
    index: "02",
    label: "FRONTEND",
    description: "Frontend frameworks, libraries, and interface technologies.",
  },
  {
    id: "backend",
    index: "03",
    label: "BACKEND",
    description: "Server-side frameworks, APIs, and runtime environments.",
  },
  {
    id: "database",
    index: "04",
    label: "DATABASE",
    description: "Database systems and data storage technologies.",
  },
  {
    id: "engineering",
    index: "05",
    label: "ENGINEERING & TOOLS",
    description: "DevOps, infrastructure, monitoring, and developer tooling.",
  },
  {
    id: "ai-ml",
    index: "06",
    label: "AI / ML — EXPLORING",
    description: "Current learning direction in machine learning and AI systems.",
  },
];

export const toolsData: Tool[] = [
  // ── Languages ──
  {
    id: "python",
    name: "Python",
    category: "languages",
    proficiency: "CORE",
    summary:
      "Primary language for backend systems, distributed services, automation, and AI/ML exploration.",
    usedIn: ["Backend systems", "Distributed services", "AI/ML learning"],
    relatedExperiments: [
      { labId: "LAB-002", name: "LockSync" },
      { labId: "LAB-003", name: "Vehicle Maintenance Predictor" },
      { labId: "LAB-004", name: "HelixAI" },
      { labId: "LAB-005", name: "DisasterAlert" },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    proficiency: "CORE",
    summary:
      "Used for full-stack web development across frontend and backend applications.",
    usedIn: ["Frontend applications", "Backend APIs"],
    relatedExperiments: [{ labId: "LAB-001", name: "ClaimFast" }],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    proficiency: "WORKING WITH",
    summary:
      "Type-safe JavaScript used in modern frontend and full-stack projects.",
    usedIn: ["Frontend development", "Full-stack applications"],
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    proficiency: "FAMILIAR",
    summary: "Learned through academic coursework in data structures and OOP.",
    usedIn: ["Academic coursework"],
  },
  {
    id: "sql",
    name: "SQL",
    category: "languages",
    proficiency: "WORKING WITH",
    summary:
      "Used for database queries, schema design, and data management across relational systems.",
    usedIn: ["Database management", "Backend systems"],
    relatedExperiments: [
      { labId: "LAB-004", name: "HelixAI" },
      { labId: "LAB-005", name: "DisasterAlert" },
    ],
  },

  // ── Frontend ──
  {
    id: "html",
    name: "HTML",
    category: "frontend",
    proficiency: "CORE",
    summary: "Semantic markup for web application structure and accessibility.",
    usedIn: ["All web projects"],
  },
  {
    id: "css",
    name: "CSS",
    category: "frontend",
    proficiency: "CORE",
    summary:
      "Styling and layout including responsive design, animations, and modern CSS features.",
    usedIn: ["All web projects"],
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    proficiency: "CORE",
    summary:
      "Component-based UI library used for building interactive single-page applications.",
    usedIn: ["Frontend applications", "Full-stack projects"],
    relatedExperiments: [{ labId: "LAB-001", name: "ClaimFast" }],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    proficiency: "WORKING WITH",
    summary:
      "React framework for server-rendered and statically generated web applications.",
    usedIn: ["Portfolio projects", "Full-stack applications"],
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: "WORKING WITH",
    summary: "Utility-first CSS framework for rapid UI development.",
    usedIn: ["Frontend styling"],
    relatedExperiments: [{ labId: "LAB-001", name: "ClaimFast" }],
  },

  // ── Backend ──
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    proficiency: "CORE",
    summary:
      "JavaScript runtime used for building backend APIs and server-side applications.",
    usedIn: ["Backend APIs", "Server applications"],
    relatedExperiments: [{ labId: "LAB-001", name: "ClaimFast" }],
  },
  {
    id: "expressjs",
    name: "Express.js",
    category: "backend",
    proficiency: "WORKING WITH",
    summary:
      "Minimal Node.js web framework for RESTful API route handling and middleware.",
    usedIn: ["REST API development"],
    relatedExperiments: [{ labId: "LAB-001", name: "ClaimFast" }],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    proficiency: "WORKING WITH",
    summary:
      "High-performance Python web framework for building async APIs with automatic validation.",
    usedIn: ["Backend services", "Distributed systems"],
    relatedExperiments: [
      { labId: "LAB-002", name: "LockSync" },
      { labId: "LAB-004", name: "HelixAI" },
      { labId: "LAB-005", name: "DisasterAlert" },
    ],
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "backend",
    proficiency: "CORE",
    summary:
      "Design and implementation of RESTful API architectures across multiple projects.",
    usedIn: ["All backend projects"],
  },

  // ── Database ──
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    proficiency: "WORKING WITH",
    summary:
      "NoSQL document database used for flexible data modeling and atomic operations.",
    usedIn: ["Document storage", "Lock state management"],
    relatedExperiments: [
      { labId: "LAB-001", name: "ClaimFast" },
      { labId: "LAB-002", name: "LockSync" },
    ],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    proficiency: "WORKING WITH",
    summary:
      "Relational database used for structured data storage in containerized applications.",
    usedIn: ["Relational data storage"],
    relatedExperiments: [{ labId: "LAB-005", name: "DisasterAlert" }],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    proficiency: "WORKING WITH",
    summary:
      "Advanced relational database used in cloud-native application architectures.",
    usedIn: ["Cloud-native backends"],
    relatedExperiments: [{ labId: "LAB-004", name: "HelixAI" }],
  },

  // ── Engineering & Tools ──
  {
    id: "git",
    name: "Git",
    category: "engineering",
    proficiency: "CORE",
    summary: "Version control for all projects and collaborative workflows.",
    usedIn: ["All projects"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "engineering",
    proficiency: "CORE",
    summary:
      "Source hosting, repository management, and collaboration platform.",
    usedIn: ["All projects"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "engineering",
    proficiency: "WORKING WITH",
    summary:
      "Containerization for application packaging, Docker Compose for multi-service orchestration.",
    usedIn: ["Container orchestration", "Service isolation"],
    relatedExperiments: [
      { labId: "LAB-004", name: "HelixAI" },
      { labId: "LAB-005", name: "DisasterAlert" },
    ],
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "engineering",
    proficiency: "FAMILIAR",
    summary:
      "Container orchestration for deploying and managing clustered services.",
    usedIn: ["Cluster deployment"],
    relatedExperiments: [{ labId: "LAB-004", name: "HelixAI" }],
  },
  {
    id: "jenkins",
    name: "Jenkins",
    category: "engineering",
    proficiency: "FAMILIAR",
    summary: "CI/CD pipeline automation for build, test, and deployment flows.",
    usedIn: ["CI/CD pipelines"],
    relatedExperiments: [{ labId: "LAB-004", name: "HelixAI" }],
  },
  {
    id: "nginx",
    name: "Nginx",
    category: "engineering",
    proficiency: "FAMILIAR",
    summary:
      "Reverse proxy and load balancer for containerized web service architectures.",
    usedIn: ["Reverse proxy", "Load balancing"],
    relatedExperiments: [{ labId: "LAB-005", name: "DisasterAlert" }],
  },
  {
    id: "prometheus",
    name: "Prometheus",
    category: "engineering",
    proficiency: "FAMILIAR",
    summary:
      "Metrics collection and monitoring for infrastructure observability.",
    usedIn: ["Infrastructure monitoring"],
    relatedExperiments: [
      { labId: "LAB-004", name: "HelixAI" },
      { labId: "LAB-005", name: "DisasterAlert" },
    ],
  },
  {
    id: "grafana",
    name: "Grafana",
    category: "engineering",
    proficiency: "FAMILIAR",
    summary:
      "Visualization dashboards for infrastructure metrics and telemetry data.",
    usedIn: ["Metrics dashboards"],
    relatedExperiments: [
      { labId: "LAB-004", name: "HelixAI" },
      { labId: "LAB-005", name: "DisasterAlert" },
    ],
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "engineering",
    proficiency: "CORE",
    summary: "Primary development environment for all projects.",
    usedIn: ["Daily development"],
  },
  {
    id: "postman",
    name: "Postman",
    category: "engineering",
    proficiency: "WORKING WITH",
    summary: "API testing and endpoint validation tool.",
    usedIn: ["API development"],
  },
  {
    id: "linux",
    name: "Linux",
    category: "engineering",
    proficiency: "WORKING WITH",
    summary:
      "Command-line environment for development, server management, and containerized systems.",
    usedIn: ["Server environments", "Container hosts"],
  },

  // ── AI / ML ──
  {
    id: "machine-learning",
    name: "Machine Learning",
    category: "ai-ml",
    proficiency: "EXPLORING",
    summary:
      "Learning classification, regression, model evaluation, and data pipeline workflows.",
    usedIn: ["Current learning direction"],
    relatedExperiments: [
      { labId: "LAB-003", name: "Vehicle Maintenance Predictor" },
    ],
  },
  {
    id: "scikit-learn",
    name: "Scikit-Learn",
    category: "ai-ml",
    proficiency: "EXPLORING",
    summary:
      "Machine learning library for classification algorithms and model evaluation.",
    usedIn: ["ML model training"],
    relatedExperiments: [
      { labId: "LAB-003", name: "Vehicle Maintenance Predictor" },
    ],
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "ai-ml",
    proficiency: "EXPLORING",
    summary:
      "Data manipulation and preprocessing for feature engineering and analysis.",
    usedIn: ["Data preprocessing"],
    relatedExperiments: [
      { labId: "LAB-003", name: "Vehicle Maintenance Predictor" },
    ],
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "ai-ml",
    proficiency: "EXPLORING",
    summary: "Numerical computing library for array operations and math.",
    usedIn: ["Numerical computations"],
    relatedExperiments: [
      { labId: "LAB-003", name: "Vehicle Maintenance Predictor" },
    ],
  },
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    category: "ai-ml",
    proficiency: "EXPLORING",
    summary:
      "Interactive computing environment for data exploration and ML experimentation.",
    usedIn: ["ML experimentation"],
    relatedExperiments: [
      { labId: "LAB-003", name: "Vehicle Maintenance Predictor" },
    ],
  },
];
