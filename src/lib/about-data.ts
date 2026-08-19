/* ─── About Profile Data Model ───────────────────────────── */

export type ProfileImageConfig = {
  url: string | null;
  alt: string;
  fallbackInitials: string;
};

export type AboutProfile = {
  systemId: string;
  name: string;
  title: string;
  role: string;
  location: string;
  availability: string;
  profileImage: ProfileImageConfig;
  intro: string;
  whoIAm: string;
  whatIBuild: string;
  whatIExplore: string;
  whatILookFor: string[];
  workStyle: string;
  nowStatus: {
    learning: string;
    building: string;
    lookingFor: string;
  };
};

export const aboutProfileData: AboutProfile = {
  systemId: "PROFILE / ANIKET-001",
  name: "Aniket Rai",
  title: "B.Tech CSE Student",
  role: "Full-Stack Developer · Exploring AI/ML",
  location: "Navi Mumbai, India",
  availability: "Open for Internships & Engineering Roles",
  profileImage: {
    url: null, // Centralized asset URL. Set to e.g. "/assets/aniket.jpg" when real file is provided.
    alt: "Aniket Rai Developer Profile",
    fallbackInitials: "AR",
  },
  intro:
    "I'm a Computer Science & Engineering student who started by learning how to build complete web applications and gradually became more interested in what happens underneath them — APIs, systems, data flows, and now AI/ML algorithms.",
  whoIAm:
    "Currently pursuing my B.Tech in Computer Science and Engineering (2024–2028). I approach software engineering with disciplined curiosity, focusing on understanding core principles, software architecture, and system reliability.",
  whatIBuild:
    "I build full-stack web applications, REST APIs, and backend architectures designed to handle real data flows. Rather than focusing only on visual widgets, I enjoy designing schema contracts, state management pipelines, and distributed service primitives.",
  whatIExplore:
    "Currently expanding my technical depth into machine learning fundamentals — working with Python, Scikit-Learn, Pandas, and NumPy. My goal is to build a rigorous foundation to transition from full-stack software development toward AI/ML engineering.",
  whatILookFor: [
    "Software Engineering Internships",
    "Full-Stack Web Developer Roles",
    "AI / Machine Learning Trainee Positions",
    "Applied Systems & Open-Source Collaborations",
  ],
  workStyle:
    "I like understanding why something works, not only making it work once.",
  nowStatus: {
    learning: "Machine Learning & AI Foundations",
    building: "Aniket OS Workstation & Engineering Lab",
    lookingFor: "Software Engineering & AI Internships",
  },
};
