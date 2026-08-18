import type { NavigationItem, SystemStatusItem } from "@/types";

export const siteConfig = {
  name: "Aniket OS",
  owner: "Aniket Rai",
  role: "B.Tech CSE Student",
  description:
    "A personal developer workstation and engineering lab for a full-stack developer exploring AI/ML.",
  version: "foundation-0.1"
} as const;

export const systemStatus: SystemStatusItem[] = [
  { label: "CURRENT FOCUS", value: "AI / ML" },
  { label: "PRIMARY STACK", value: "Full Stack" },
  { label: "STATUS", value: "Building" },
  { label: "LOOKING FOR", value: "Internships" }
];

export const primaryNavigation: NavigationItem[] = [
  {
    title: "About",
    href: "/about",
    description: "Profile context and current engineering direction."
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Verified project records and case studies."
  },
  {
    title: "Engineering Lab",
    href: "/engineering-lab",
    description: "Experiments, build notes, and systems thinking."
  },
  {
    title: "Journey",
    href: "/journey",
    description: "Education, learning milestones, and direction."
  },
  {
    title: "Toolbox",
    href: "/skills",
    description: "Full-stack foundation and AI/ML exploration areas."
  },
  {
    title: "Resume",
    href: "/resume",
    description: "Resume and profile metadata."
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Internship and collaboration inquiries."
  }
];
