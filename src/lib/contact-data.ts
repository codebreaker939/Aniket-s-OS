/* ─── Contact Configuration & Domain Model ───────────────── */

export type ContactConfig = {
  name: string;
  title: string;
  role: string;
  location: string;
  email: string | null;
  linkedin: string | null;
  github: string | null;
  status: string;
  opportunities: string[];
};

export const contactConfig: ContactConfig = {
  name: "Aniket Rai",
  title: "B.Tech CSE Student",
  role: "Full-Stack Developer · Exploring AI/ML",
  location: "Navi Mumbai, India",
  email: "aniketrai.dev@gmail.com",
  linkedin: "https://linkedin.com/in/aniketrai",
  github: "https://github.com/codebreaker939",
  status: "OPEN TO OPPORTUNITIES",
  opportunities: [
    "Software Engineering Internships",
    "Full-Stack Web Development Roles",
    "AI / Machine Learning Trainee Positions",
    "Applied Systems & Open-Source Collaborations",
  ],
};

export type ContactMessageForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
