/* ─── Contact Configuration & Domain Model ───────────────── */

import { personalProfile } from "@/lib/profile-content";

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
  name: personalProfile.name,
  title: `${personalProfile.education} Student`,
  role: `${personalProfile.role} · ${personalProfile.focus}`,
  location: personalProfile.location,
  email: personalProfile.email,
  linkedin: personalProfile.linkedin,
  github: personalProfile.github,
  status: "OPEN TO OPPORTUNITIES",
  opportunities: [
    "Software Engineering Internships",
    "Full-Stack Web Development Roles",
    "AI / Machine Learning Trainee Positions",
    "Technical Collaborations",
  ],
};

export type ContactMessageForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
