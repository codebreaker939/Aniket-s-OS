import type { DesktopApp, DockApp, LabPreviewEntry } from "@/types";

export const desktopApps: DesktopApp[] = [
  {
    id: "about",
    title: "About",
    label: "ABOUT",
    href: "/about",
    description: "Profile context and current engineering direction.",
    icon: "about",
    systemLabel: "PROFILE",
    openMode: "route",
    status: "ready"
  },
  {
    id: "projects",
    title: "Projects",
    label: "PROJECTS",
    href: "/projects",
    description: "Verified project records and case studies will live here.",
    icon: "projects",
    systemLabel: "WORK",
    openMode: "route",
    status: "building"
  },
  {
    id: "engineering-lab",
    title: "Engineering Lab",
    label: "ENGINEERING LAB",
    href: "/engineering-lab",
    description: "A workbench for experiments, systems thinking, and implementation notes.",
    icon: "lab",
    systemLabel: "LAB",
    openMode: "window",
    status: "building"
  },
  {
    id: "journey",
    title: "Journey",
    label: "JOURNEY",
    href: "/journey",
    description: "Education, learning milestones, and direction.",
    icon: "journey",
    systemLabel: "PATH",
    openMode: "route",
    status: "ready"
  },
  {
    id: "toolbox",
    title: "Toolbox",
    label: "TOOLBOX",
    href: "/skills",
    description: "Full-stack foundation and AI/ML exploration areas.",
    icon: "toolbox",
    systemLabel: "STACK",
    openMode: "route",
    status: "ready"
  },
  {
    id: "github",
    title: "GitHub",
    label: "GITHUB",
    href: "/github",
    description: "A future home for GitHub API integration and repository signals.",
    icon: "github",
    systemLabel: "SOURCE",
    openMode: "route",
    status: "planned"
  },
  {
    id: "resume",
    title: "Resume",
    label: "RESUME",
    href: "/resume",
    description: "Resume, profile metadata, and downloadable documents.",
    icon: "resume",
    systemLabel: "CV",
    openMode: "route",
    status: "ready"
  },
  {
    id: "certifications",
    title: "Credentials",
    label: "CREDENTIALS",
    href: "/certifications",
    description: "Verified certifications, professional credentials, and academic tracks.",
    icon: "certifications",
    systemLabel: "VERIFIED",
    openMode: "route",
    status: "ready"
  },
  {
    id: "lab-notes",
    title: "Lab Notes",
    label: "LAB NOTES",
    href: "/lab-notes",
    description: "Short technical notes from ongoing learning and experiments.",
    icon: "notes",
    systemLabel: "NOTES",
    openMode: "route",
    status: "planned"
  },
  {
    id: "contact",
    title: "Contact",
    label: "CONTACT",
    href: "/contact",
    description: "A focused channel for internship and collaboration inquiries.",
    icon: "contact",
    systemLabel: "COMMS",
    openMode: "route",
    status: "ready"
  }
];

export const dockApps: DockApp[] = [
  { id: "about", label: "About", icon: "about", href: "/about", openMode: "route" },
  { id: "projects", label: "Projects", icon: "projects", href: "/projects", openMode: "route" },
  { id: "engineering-lab", label: "Engineering Lab", icon: "lab", href: "/engineering-lab", openMode: "window" },
  { id: "journey", label: "Journey", icon: "journey", href: "/journey", openMode: "route" },
  { id: "toolbox", label: "Toolbox", icon: "toolbox", href: "/skills", openMode: "route" },
  { id: "github", label: "GitHub", icon: "github", href: "/github", openMode: "route" },
  { id: "resume", label: "Resume", icon: "resume", href: "/resume", openMode: "route" },
  { id: "certifications", label: "Credentials", icon: "certifications", href: "/certifications", openMode: "route" },
  { id: "lab-notes", label: "Lab Notes", icon: "notes", href: "/lab-notes", openMode: "route" },
  { id: "terminal", label: "Terminal", icon: "terminal", openMode: "window" },
  { id: "settings", label: "Settings", icon: "settings", openMode: "window" }
];

export const labPreviewEntries: LabPreviewEntry[] = [
  { id: "LAB-001", title: "ClaimFast", status: "preview" },
  { id: "LAB-002", title: "LockSync", status: "preview" },
  { id: "LAB-003", title: "Vehicle Maintenance Predictor", status: "preview" },
  { id: "LAB-004", title: "HelixAI", status: "preview" }
];
