import type { NavigationItem, SystemStatusItem } from "@/types";
import { personalProfile } from "@/lib/profile-content";

export const siteConfig = {
  name: personalProfile.osName,
  owner: personalProfile.name,
  role: personalProfile.education,
  description:
    "Aniket Rai's personal developer workspace for projects, notes, and learning.",
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
    description: "Who Aniket is and what he is working on."
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Verified project records and case studies."
  },
  {
    title: "Engineering Lab",
    href: "/engineering-lab",
    description: "Technical experiments, build notes, and decisions."
  },
  {
    title: "Journey",
    href: "/journey",
    description: "Education, learning milestones, and next steps."
  },
  {
    title: "Toolbox",
    href: "/skills",
    description: "Tools, languages, and current skill areas."
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
