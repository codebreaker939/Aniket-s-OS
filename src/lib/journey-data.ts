export type JourneyStage = {
  id: string;
  version: string;
  period: string;
  label: string;
  title: string;
  narrative: string;
  whatLearned: string[];
  whatBuilt: {
    name: string;
    labId?: string; // links to Engineering Lab experiment
  }[];
  whatChanged: string;
  technologies: string[];
  status: "completed" | "active" | "next";
};

export const journeyStages: JourneyStage[] = [
  {
    id: "foundation",
    version: "v0.1",
    period: "B.Tech CSE — Early Semesters",
    label: "FOUNDATION",
    title: "Computer Science Foundation",
    narrative:
      "Started with computer science basics: how programs run, how data is organized, and how machines communicate.",
    whatLearned: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Operating Systems fundamentals",
      "Computer Networking basics",
      "Database Management Systems",
      "C / C++ / Python basics",
    ],
    whatBuilt: [],
    whatChanged:
      "Built enough foundation to move from small exercises into full applications.",
    technologies: ["C", "C++", "Python", "SQL", "Git"],
    status: "completed",
  },
  {
    id: "full-stack",
    version: "v0.5",
    period: "Self-Directed Learning",
    label: "FULL STACK",
    title: "Building Complete Applications",
    narrative:
      "Moved from academic exercises into end-to-end web applications. Learned how frontends, APIs, and databases fit together.",
    whatLearned: [
      "Frontend development with React",
      "Backend API design with Node.js & Express",
      "Database modeling with MongoDB",
      "RESTful API architecture",
      "Authentication & authorization patterns",
      "Responsive UI development",
    ],
    whatBuilt: [
      {
        name: "ClaimFast — Insurance Claim Management Portal",
        labId: "LAB-001",
      },
    ],
    whatChanged:
      "Started thinking beyond screens and forms: data flow, API boundaries, auth, and reliability became more important.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS",
      "REST APIs",
    ],
    status: "completed",
  },
  {
    id: "engineering",
    version: "v0.8",
    period: "Project-Based Exploration",
    label: "ENGINEERING",
    title: "Systems and Infrastructure",
    narrative:
      "Started working with containers, monitoring, distributed coordination, and deployment details around backend services.",
    whatLearned: [
      "Docker & container orchestration",
      "Distributed systems coordination",
      "Infrastructure monitoring with Prometheus & Grafana",
      "Reverse proxy & load balancing with Nginx",
      "CI/CD pipelines with Jenkins",
      "Secret management with Vault",
      "Kubernetes cluster operations",
    ],
    whatBuilt: [
      {
        name: "LockSync — Distributed Locking Service",
        labId: "LAB-002",
      },
      {
        name: "HelixAI — Genomic Backend Prototype",
        labId: "LAB-004",
      },
      {
        name: "DisasterAlert — Emergency Alert Backend",
        labId: "LAB-005",
      },
    ],
    whatChanged:
      "Reliability, observability, and deployment became part of how I evaluate a project.",
    technologies: [
      "Python",
      "FastAPI",
      "Docker Compose",
      "Kubernetes",
      "Nginx",
      "Prometheus",
      "Grafana",
      "Jenkins",
      "Vault",
      "PostgreSQL",
      "MySQL",
    ],
    status: "completed",
  },
  {
    id: "ai-ml",
    version: "v1.0",
    period: "Current Direction",
    label: "AI / ML",
    title: "AI / ML Fundamentals",
    narrative:
      "Currently learning how machine learning models use data, how to prepare datasets, and how to evaluate predictions.",
    whatLearned: [
      "Machine learning fundamentals",
      "Classification & regression workflows",
      "Data preprocessing & feature engineering",
      "Model evaluation and metrics",
      "Python data tools",
    ],
    whatBuilt: [
      {
        name: "Vehicle Maintenance Predictor",
        labId: "LAB-003",
      },
    ],
    whatChanged:
      "Learning where ML fits with regular software systems, especially APIs and backend workflows.",
    technologies: [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Jupyter Notebook",
    ],
    status: "active",
  },
  {
    id: "next",
    version: "NEXT",
    period: "Career Objective",
    label: "SOFTWARE ENGINEERING",
    title: "Internship Experience",
    narrative:
      "Seeking software engineering internships where I can contribute, learn from experienced engineers, and improve through real project work.",
    whatLearned: [],
    whatBuilt: [],
    whatChanged: "",
    technologies: [],
    status: "next",
  },
];
