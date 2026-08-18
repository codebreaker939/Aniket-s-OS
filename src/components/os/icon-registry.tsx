import {
  BookOpen,
  FileText,
  FlaskConical,
  Folder,
  Github,
  Mail,
  Map,
  Settings,
  Terminal,
  User,
  Wrench,
  type LucideIcon
} from "lucide-react";

import type { DesktopAppIcon } from "@/types";

export const desktopIconMap: Record<DesktopAppIcon, LucideIcon> = {
  about: User,
  lab: FlaskConical,
  projects: Folder,
  journey: Map,
  toolbox: Wrench,
  github: Github,
  resume: FileText,
  notes: BookOpen,
  contact: Mail,
  terminal: Terminal,
  settings: Settings
};
