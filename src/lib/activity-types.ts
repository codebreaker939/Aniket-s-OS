/* ─── System Activity Types & Event Models ───────────────── */

import type { DesktopAppId } from "@/types";

export type ActivityCategory =
  | "SYSTEM"
  | "APPLICATION"
  | "ENGINEERING"
  | "SOURCE_CONTROL"
  | "NETWORK";

export type SystemActivityEvent = {
  id: string;
  category: ActivityCategory;
  timestamp: string; // Formatted local time HH:MM:SS
  title: string;
  description: string;
  appId?: DesktopAppId;
  labId?: string;
};
