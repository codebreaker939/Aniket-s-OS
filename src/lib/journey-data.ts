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
    title: "Learning to Think in Systems",
    narrative:
      "Started with the fundamentals of computer science — understanding how programs execute, how data is structured, and how machines communicate. This stage was about building the mental models that everything else depends on.",
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
      "Gained the foundational vocabulary to read and reason about software systems. Ready to move from theory to building real applications.",
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
      "Moved from academic exercises into building end-to-end web applications. Learned how frontends communicate with backends, how databases persist state, and how APIs connect everything together.",
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
      "Understood how full products are assembled from frontend, backend, and data layers. Started asking deeper questions about how systems scale and stay reliable.",
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
    title: "Beyond Applications — Into Systems",
    narrative:
      "Moved beyond building individual applications toward understanding how systems behave under real operational constraints. Started working with containers, monitoring, distributed coordination, and infrastructure automation.",
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
        name: "HelixAI — Precision Medicine Platform",
        labId: "LAB-004",
      },
      {
        name: "DisasterAlert — Emergency Response Cloud",
        labId: "LAB-005",
      },
    ],
    whatChanged:
      "Shifted perspective from 'how do I make it work' to 'how do I make it reliable, observable, and maintainable.' Infrastructure became a first-class concern.",
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
    title: "Exploring Intelligent Systems",
    narrative:
      "Currently exploring machine learning and AI systems — understanding how models learn from data, how to build data pipelines, and how to evaluate predictions. This is the active area of learning and experimentation.",
    whatLearned: [
      "Machine learning fundamentals",
      "Classification & regression workflows",
      "Data preprocessing & feature engineering",
      "Model evaluation and metrics",
      "Python data science ecosystem",
    ],
    whatBuilt: [
      {
        name: "Vehicle Maintenance Predictor",
        labId: "LAB-003",
      },
    ],
    whatChanged:
      "Beginning to understand how data-driven systems complement traditional software engineering. Exploring how ML can be integrated into backend architectures.",
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
    title: "Real-World Engineering Experience",
    narrative:
      "Looking to apply accumulated skills in professional environments. Seeking software engineering internships and opportunities where I can contribute to production systems, learn from experienced engineers, and continue growing.",
    whatLearned: [],
    whatBuilt: [],
    whatChanged: "",
    technologies: [],
    status: "next",
  },
];
