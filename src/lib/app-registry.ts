import type { DesktopAppIcon, DesktopAppId } from "@/types";

export type AppDefinition = {
  id: DesktopAppId;
  title: string;
  label: string;
  icon: DesktopAppIcon;
  category: string;
  description: string;
  href?: string;
  defaultPosition: {
    top: string;
    left?: string;
    right?: string;
  };
  defaultSize: {
    width: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
  };
};

export const appRegistry: Record<DesktopAppId, AppDefinition> = {
  about: {
    id: "about",
    title: "ABOUT ANIKET",
    label: "ABOUT",
    icon: "about",
    category: "PROFILE",
    description: "Profile, education context, and engineering direction.",
    href: "/about",
    defaultPosition: { top: "5.5rem", left: "18rem" },
    defaultSize: { width: "34rem", maxHeight: "calc(100svh - 12rem)" }
  },
  projects: {
    id: "projects",
    title: "PROJECT ARCHIVE",
    label: "PROJECTS",
    icon: "projects",
    category: "WORK",
    description: "Verified project records, case studies, and engineering builds.",
    href: "/projects",
    defaultPosition: { top: "6.5rem", left: "22rem" },
    defaultSize: { width: "38rem", maxHeight: "calc(100svh - 12rem)" }
  },
  "engineering-lab": {
    id: "engineering-lab",
    title: "ENGINEERING LAB",
    label: "ENGINEERING LAB",
    icon: "lab",
    category: "LAB",
    description: "Workbench for experiments, system architecture, and technical notes.",
    href: "/engineering-lab",
    defaultPosition: { top: "5rem", right: "2rem" },
    defaultSize: { width: "52rem", height: "calc(100svh - 10rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  journey: {
    id: "journey",
    title: "SYSTEM EVOLUTION",
    label: "JOURNEY",
    icon: "journey",
    category: "PATH",
    description: "Education, learning milestones, and career trajectory.",
    href: "/journey",
    defaultPosition: { top: "8rem", left: "20rem" },
    defaultSize: { width: "36rem", maxHeight: "calc(100svh - 12rem)" }
  },
  toolbox: {
    id: "toolbox",
    title: "TECH STACK & TOOLBOX",
    label: "TOOLBOX",
    icon: "toolbox",
    category: "STACK",
    description: "Full-stack technologies, frameworks, and AI/ML exploration stack.",
    href: "/skills",
    defaultPosition: { top: "7rem", left: "24rem" },
    defaultSize: { width: "36rem", maxHeight: "calc(100svh - 12rem)" }
  },
  github: {
    id: "github",
    title: "SOURCE CONTROL",
    label: "GITHUB",
    icon: "github",
    category: "SOURCE",
    description: "GitHub repositories, code commits, and open-source signals.",
    href: "/github",
    defaultPosition: { top: "9rem", right: "6rem" },
    defaultSize: { width: "34rem", maxHeight: "calc(100svh - 12rem)" }
  },
  resume: {
    id: "resume",
    title: "SYSTEM PROFILE & RESUME",
    label: "RESUME",
    icon: "resume",
    category: "CV",
    description: "Verified developer credentials, background, and downloadable resume.",
    href: "/resume",
    defaultPosition: { top: "6rem", right: "8rem" },
    defaultSize: { width: "34rem", maxHeight: "calc(100svh - 12rem)" }
  },
  "lab-notes": {
    id: "lab-notes",
    title: "VISITOR & LAB NOTES",
    label: "LAB NOTES",
    icon: "notes",
    category: "NOTES",
    description: "Short technical notes, visitor feedback, and research logs.",
    href: "/lab-notes",
    defaultPosition: { top: "8.5rem", right: "4rem" },
    defaultSize: { width: "34rem", maxHeight: "calc(100svh - 12rem)" }
  },
  contact: {
    id: "contact",
    title: "OPEN CONNECTION",
    label: "CONTACT",
    icon: "contact",
    category: "COMMS",
    description: "Direct channels for internship and software engineering inquiries.",
    href: "/contact",
    defaultPosition: { top: "9.5rem", left: "26rem" },
    defaultSize: { width: "32rem", maxHeight: "calc(100svh - 12rem)" }
  },
  terminal: {
    id: "terminal",
    title: "TERMINAL CONSOLE",
    label: "TERMINAL",
    icon: "terminal",
    category: "SYSTEM",
    description: "Command-line interface for system status and environment parameters.",
    defaultPosition: { top: "7.5rem", right: "10rem" },
    defaultSize: { width: "34rem", maxHeight: "calc(100svh - 12rem)" }
  },
  settings: {
    id: "settings",
    title: "SYSTEM SETTINGS",
    label: "SETTINGS",
    icon: "settings",
    category: "CONFIG",
    description: "Aniket OS environment configuration and workstation controls.",
    defaultPosition: { top: "10.5rem", right: "12rem" },
    defaultSize: { width: "30rem", maxHeight: "calc(100svh - 12rem)" }
  }
};
