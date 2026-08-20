/* ─── About Profile Data Model ───────────────────────────── */

import { personalProfile } from "@/lib/profile-content";

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
  name: personalProfile.name,
  title: `${personalProfile.education} · ${personalProfile.university}`,
  role: `${personalProfile.role} · ${personalProfile.focus}`,
  location: personalProfile.location,
  availability: "Open for Internships & Engineering Roles",
  profileImage: {
    url: "/assets/aniket.jpeg",
    alt: "Aniket Rai profile",
    fallbackInitials: "AR",
  },
  intro:
    personalProfile.profileSummary,
  whoIAm:
    "I'm currently pursuing Computer Science and Engineering. I like breaking a feature down into the parts that make it work: data, API design, state, and deployment.",
  whatIBuild:
    "I build full-stack web applications, REST APIs, and backend services. Projects like LockSync helped me spend more time with concurrency, validation, and service behavior.",
  whatIExplore:
    "I'm learning machine learning fundamentals with Python, Scikit-Learn, Pandas, and NumPy. Right now the goal is a solid foundation, not exaggerated claims.",
  whatILookFor: [
    "Software Engineering Internships",
    "Full-Stack Web Developer Roles",
    "AI / Machine Learning Trainee Positions",
    "Technical Collaborations",
  ],
  workStyle:
    "I like understanding why something works, not only making it work once.",
  nowStatus: {
    learning: "Machine Learning & AI Foundations",
    building: "Aniket OS and project documentation",
    lookingFor: "Software Engineering & AI Internships",
  },
};
