export type ExperimentStatus = "COMPLETED" | "IN PROGRESS" | "PROJECT";

export type ExperimentArchitecture = {
  diagramType: "locksync" | "helixai" | "disasteralert" | "claimfast" | "ml-pipeline" | "generic";
  flow: string;
  nodes: { label: string; subtext?: string; type: "client" | "gateway" | "service" | "db" | "monitor" }[];
};

export type EngineeringExperiment = {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  domain: string;
  status: ExperimentStatus;
  year: string;
  summary: string;
  objective: string;
  problem: string;
  approach: string;
  technologies: string[];
  architecture: ExperimentArchitecture;
  engineeringDecisions: string[];
  challenges: string[];
  outcome: string;
  githubUrl?: string;
  liveUrl?: string;
};

export const experimentsData: EngineeringExperiment[] = [
  {
    id: "LAB-001",
    name: "CLAIMFAST",
    slug: "claimfast",
    subtitle: "Insurance Claim Management & Processing Engine",
    domain: "FULL STACK",
    status: "COMPLETED",
    year: "2024",
    summary: "Full-stack web application designed to streamline insurance claim submissions, document verification, and workflow management.",
    objective: "Build a responsive web application to reduce claim processing delays and standardize claim document submissions.",
    problem: "Traditional claim intake workflows suffer from disjointed data submission, lack of real-time status updates, and manual document verification bottlenecks.",
    approach: "Designed a centralized MERN-stack application featuring structured claim forms, real-time status tracking, role-based admin workflows, and secure document storage.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Tailwind CSS"],
    architecture: {
      diagramType: "claimfast",
      flow: "Client Portal → Express REST API → Auth / Validation Middleware → MongoDB Storage",
      nodes: [
        { label: "Client Portal", subtext: "React Single-Page App", type: "client" },
        { label: "Express API", subtext: "REST Endpoints & Controllers", type: "service" },
        { label: "MongoDB", subtext: "Claim & User Documents", type: "db" }
      ]
    },
    engineeringDecisions: [
      "Structured MongoDB schemas with index optimization for fast claim lookup by policy ID.",
      "Implemented JWT authentication with role-based permissions (Claimant vs. Administrator).",
      "Created modular RESTful route handlers to separate claim validation from document processing."
    ],
    challenges: [
      "Handling asynchronous file uploads while maintaining responsive form UI states.",
      "Validating complex multi-step claim payloads across client and server validation layers."
    ],
    outcome: "Delivered a operational MERN-stack claim management portal enabling structured claim filing and real-time status tracking.",
    githubUrl: "https://github.com/codebreaker939"
  },
  {
    id: "LAB-002",
    name: "LOCKSYNC",
    slug: "locksync",
    subtitle: "High-Concurrency Distributed Locking Service",
    domain: "DISTRIBUTED SYSTEMS",
    status: "COMPLETED",
    year: "2024",
    summary: "Fault-tolerant distributed locking service built with Python 3.12, FastAPI, and MongoDB supporting TTL expiration, lock renewal, and safe release semantics.",
    objective: "Provide a reliable distributed mutex primitive preventing race conditions across concurrent microservice workloads without deadlocks.",
    problem: "When multiple distributed worker nodes contend for shared critical resources, network partitions or process crashes can cause resource corruption or lock starvation if locks lack auto-expiration and heartbeat renewals.",
    approach: "Engineered a distributed lock manager using FastAPI and MongoDB atomically handling lock acquire, heartbeat renewal (TTL extension), lock release, and automatic expiration handling for crashed nodes.",
    technologies: ["Python 3.12", "FastAPI", "Uvicorn", "MongoDB", "PyMongo", "UUID", "Threading"],
    architecture: {
      diagramType: "locksync",
      flow: "Client Node → FastAPI Lock Manager → Threading / Heartbeat Monitor → MongoDB Atomic Collection",
      nodes: [
        { label: "Worker Node", subtext: "Concurrent Client", type: "client" },
        { label: "FastAPI Manager", subtext: "Lock Acquire / Release API", type: "service" },
        { label: "Heartbeat Worker", subtext: "TTL Renewal & Expiration Monitor", type: "monitor" },
        { label: "MongoDB", subtext: "Atomic Lock Document Index", type: "db" }
      ]
    },
    engineeringDecisions: [
      "Utilized MongoDB unique indexes and atomic updates (`find_one_and_update`) to guarantee single-winner lock acquisition under race conditions.",
      "Implemented background heartbeat renewal threads using Python threading to periodically extend TTL for active tasks.",
      "Embedded unique UUID lock tokens ensuring only the lock holder process can release or renew an active lock."
    ],
    challenges: [
      "Preventing split-brain lock release scenarios when network latency causes lock renewal heartbeat delays.",
      "Managing thread safety during concurrent lock heartbeat updates and process shutdown signals."
    ],
    outcome: "Built a verified distributed locking implementation with automated TTL expiry handling process failures gracefully.",
    githubUrl: "https://github.com/codebreaker939"
  },
  {
    id: "LAB-003",
    name: "VEHICLE MAINTENANCE PREDICTOR",
    slug: "vehicle-maintenance-predictor",
    subtitle: "Predictive Analytics & Maintenance Classification",
    domain: "MACHINE LEARNING",
    status: "PROJECT",
    year: "2024",
    summary: "Machine learning model exploring sensor telemetry data to predict component failure windows and schedule preventive vehicle servicing.",
    objective: "Develop a machine learning classification workflow for predicting equipment breakdown risks prior to catastrophic mechanical failure.",
    problem: "Unscheduled vehicle breakdowns cause expensive operational downtime and unsafe operating conditions when routine maintenance schedules fail to account for usage intensity.",
    approach: "Constructed data preprocessing pipelines and evaluated decision-tree and ensemble classification algorithms on vehicle sensor metrics.",
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Jupyter Notebook"],
    architecture: {
      diagramType: "ml-pipeline",
      flow: "Sensor Data Input → Data Cleaning & Feature Extraction → Model Classifier → Maintenance Signal Output",
      nodes: [
        { label: "Telemetry Stream", subtext: "Sensor Features", type: "client" },
        { label: "Feature Pipeline", subtext: "Pandas Scaling & Encoding", type: "service" },
        { label: "Classifier Model", subtext: "Machine Learning Predictor", type: "service" }
      ]
    },
    engineeringDecisions: [
      "Feature engineering focused on operational variance metrics rather than raw instantaneous readings.",
      "Evaluated precision vs. recall metrics to prioritize reducing false negative predictions (unidentified failure risk)."
    ],
    challenges: [
      "Handling class imbalance between nominal operating hours and rare failure event records.",
      "Documentation in progress."
    ],
    outcome: "Constructed a prototype predictive classification pipeline for telemetry-based maintenance risk scoring."
  },
  {
    id: "LAB-004",
    name: "HELIXAI",
    slug: "helixai",
    subtitle: "Precision Medicine & Genomic Data Platform",
    domain: "AI / PRECISION MEDICINE",
    status: "PROJECT",
    year: "2024",
    summary: "Cloud-native precision medicine platform utilizing FastAPI, PostgreSQL, Kubernetes, and continuous observability pipelines.",
    objective: "Architect a scalable backend containerized infrastructure for analyzing precision genomic datasets with continuous integration and real-time observability.",
    problem: "Genomic workflows handle high-dimensional dataset operations demanding robust service isolation, secrets security, and continuous cluster metrics monitoring.",
    approach: "Designed a microservice stack containerized with Docker Compose, deployed to Kubernetes, integrated with Jenkins CI/CD pipelines, and monitored via Prometheus and Grafana.",
    technologies: ["FastAPI", "Python", "PostgreSQL", "Docker Compose", "Kubernetes", "Jenkins", "Prometheus", "Grafana", "Vault"],
    architecture: {
      diagramType: "helixai",
      flow: "Client / API Request → K8s Cluster (FastAPI Service) → Vault Secrets & PostgreSQL DB (Metrics: Prometheus + Grafana)",
      nodes: [
        { label: "API Client", subtext: "REST / HTTPS Request", type: "client" },
        { label: "K8s Cluster", subtext: "FastAPI Microservices", type: "service" },
        { label: "Vault & Postgres", subtext: "Secrets & Relational Storage", type: "db" },
        { label: "Prometheus & Grafana", subtext: "Metrics & Telemetry Dashboard", type: "monitor" }
      ]
    },
    engineeringDecisions: [
      "Used HashiCorp Vault for secure centralized secret injection into Kubernetes pods.",
      "Configured Prometheus exporters and Grafana dashboards for cluster-wide CPU, memory, and API request latency visibility.",
      "Automated build and container scanning steps within Jenkins CI/CD pipeline definitions."
    ],
    challenges: [
      "Managing database migration scripts across automated Jenkins deployment stages.",
      "Configuring cluster ingress routing rules and resource requests for compute pods."
    ],
    outcome: "Built an infrastructure-ready containerized precision medicine backend platform."
  },
  {
    id: "LAB-005",
    name: "DISASTERALERT",
    slug: "disasteralert",
    subtitle: "Emergency Response Cloud Infrastructure",
    domain: "EMERGENCY RESPONSE CLOUD",
    status: "PROJECT",
    year: "2024",
    summary: "Containerized emergency alert notification system utilizing FastAPI, MySQL, Nginx reverse proxy, and Prometheus/Grafana infrastructure monitoring.",
    objective: "Construct a high-availability cloud architecture for broadcasting critical emergency notifications and managing responder dispatch records.",
    problem: "Emergency alert systems experience sudden spikes in traffic during crisis events, requiring proxy caching, database indexing, and strict infrastructure telemetry.",
    approach: "Engineered a containerized multi-container service orchestrated via Docker Compose with Nginx reverse proxy load distribution, MySQL database storage, phpMyAdmin management, and Prometheus metrics monitoring.",
    technologies: ["FastAPI", "Python", "MySQL", "Docker Compose", "Nginx", "Prometheus", "Grafana", "phpMyAdmin"],
    architecture: {
      diagramType: "disasteralert",
      flow: "Client Requests → Nginx Reverse Proxy → FastAPI Services → MySQL DB & phpMyAdmin (Telemetry: Prometheus & Grafana)",
      nodes: [
        { label: "Client Ingress", subtext: "Public Traffic", type: "client" },
        { label: "Nginx Gateway", subtext: "Reverse Proxy & Load Balancing", type: "gateway" },
        { label: "FastAPI Core", subtext: "Alert Dispatch Services", type: "service" },
        { label: "MySQL & phpMyAdmin", subtext: "Database & Admin Interface", type: "db" },
        { label: "Prometheus / Grafana", subtext: "Telemetry Monitoring Stack", type: "monitor" }
      ]
    },
    engineeringDecisions: [
      "Used Nginx as a reverse proxy for request throttling and static asset caching.",
      "Decoupled backend notification workers from public API endpoints via Docker Compose service networking.",
      "Integrated Prometheus metrics endpoints inside FastAPI to track system alert delivery latencies."
    ],
    challenges: [
      "Configuring cross-container network aliases and health-check dependencies in Docker Compose.",
      "Optimizing MySQL connection pool limits during surge load simulations."
    ],
    outcome: "Deployed a containerized emergency response cloud system architecture."
  }
];
