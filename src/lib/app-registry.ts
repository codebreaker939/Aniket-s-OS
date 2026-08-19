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
    title: "ABOUT",
    label: "ABOUT",
    icon: "about",
    category: "PROFILE",
    description: "Aniket Rai / Developer Profile & Engineering Focus.",
    href: "/about",
    defaultPosition: { top: "4.5rem", left: "16rem" },
    defaultSize: { width: "46rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  projects: {
    id: "projects",
    title: "PROJECTS",
    label: "PROJECTS",
    icon: "projects",
    category: "WORK",
    description: "Selected Builds & Software Project Archive — ClaimFast, LockSync, V-pred, HelixAI, DisasterAlert.",
    href: "/projects",
    defaultPosition: { top: "4.5rem", left: "14rem" },
    defaultSize: { width: "54rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  "engineering-lab": {
    id: "engineering-lab",
    title: "ENGINEERING LAB",
    label: "ENGINEERING LAB",
    icon: "lab",
    category: "LAB",
    description: "Workbench for experiments, system architecture, and technical notes.",
    href: "/engineering-lab",
    defaultPosition: { top: "4.5rem", right: "2rem" },
    defaultSize: { width: "54rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  journey: {
    id: "journey",
    title: "SYSTEM EVOLUTION",
    label: "JOURNEY",
    icon: "journey",
    category: "PATH",
    description: "Aniket Rai — Engineering Journey & Technical Growth Trajectory.",
    href: "/journey",
    defaultPosition: { top: "4.5rem", left: "12rem" },
    defaultSize: { width: "48rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  toolbox: {
    id: "toolbox",
    title: "TOOLBOX",
    label: "TOOLBOX",
    icon: "toolbox",
    category: "STACK",
    description: "Technical Stack / Working Knowledge — Developer tool inventory.",
    href: "/skills",
    defaultPosition: { top: "4.5rem", left: "15rem" },
    defaultSize: { width: "46rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  github: {
    id: "github",
    title: "SOURCE CONTROL",
    label: "GITHUB",
    icon: "github",
    category: "SOURCE",
    description: "GitHub / Repositories / Development Activity.",
    href: "/github",
    defaultPosition: { top: "4.5rem", right: "2rem" },
    defaultSize: { width: "48rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  resume: {
    id: "resume",
    title: "SYSTEM PROFILE",
    label: "RESUME",
    icon: "resume",
    category: "CV",
    description: "Aniket Rai — Professional Profile & Verified Credentials.",
    href: "/resume",
    defaultPosition: { top: "4.5rem", left: "16rem" },
    defaultSize: { width: "48rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  certifications: {
    id: "certifications",
    title: "CREDENTIALS",
    label: "CREDENTIALS",
    icon: "certifications",
    category: "VERIFIED",
    description: "Certifications / Verified Learning — Technical credential archive.",
    href: "/certifications",
    defaultPosition: { top: "4.5rem", left: "14rem" },
    defaultSize: { width: "48rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  achievements: {
    id: "achievements",
    title: "MILESTONES",
    label: "MILESTONES",
    icon: "achievements",
    category: "PROGRESS",
    description: "Achievements / Competitions / Leadership — Engineering milestone log.",
    href: "/achievements",
    defaultPosition: { top: "4.5rem", left: "12rem" },
    defaultSize: { width: "48rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  contact: {
    id: "contact",
    title: "CONTACT",
    label: "CONTACT",
    icon: "contact",
    category: "COMMS",
    description: "Open a Connection — Communication console & inquiries.",
    href: "/contact",
    defaultPosition: { top: "4.5rem", left: "14rem" },
    defaultSize: { width: "50rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  },
  terminal: {
    id: "terminal",
    title: "TERMINAL CONSOLE",
    label: "TERMINAL",
    icon: "terminal",
    category: "SYSTEM",
    description: "Command-line interface for system status and environment parameters.",
    defaultPosition: { top: "6.5rem", right: "8rem" },
    defaultSize: { width: "34rem", maxHeight: "calc(100dvh - 12rem)" }
  },
  settings: {
    id: "settings",
    title: "SYSTEM SETTINGS",
    label: "SETTINGS",
    icon: "settings",
    category: "CONFIG",
    description: "Aniket OS environment configuration and workstation controls.",
    defaultPosition: { top: "8.5rem", right: "10rem" },
    defaultSize: { width: "30rem", maxHeight: "calc(100dvh - 14rem)" }
  },
  activity: {
    id: "activity",
    title: "SYSTEM ACTIVITY",
    label: "ACTIVITY",
    icon: "terminal",
    category: "SYSTEM",
    description: "Real session event log, system audit, and state transitions.",
    href: "/activity",
    defaultPosition: { top: "4.5rem", left: "16rem" },
    defaultSize: { width: "42rem", height: "calc(100dvh - 10.5rem)", maxWidth: "calc(100vw - 4rem)" }
  }
};
