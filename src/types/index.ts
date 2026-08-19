export type NavigationItem = {
  title: string;
  href: string;
  description?: string;
};

export type DesktopAppIcon =
  | "about"
  | "lab"
  | "projects"
  | "journey"
  | "toolbox"
  | "github"
  | "resume"
  | "certifications"
  | "achievements"
  | "contact"
  | "terminal"
  | "settings";

export type DesktopAppId =
  | "about"
  | "projects"
  | "engineering-lab"
  | "journey"
  | "toolbox"
  | "github"
  | "resume"
  | "certifications"
  | "achievements"
  | "contact"
  | "terminal"
  | "settings"
  | "activity";

export type DesktopApp = NavigationItem & {
  id: DesktopAppId;
  label: string;
  icon: DesktopAppIcon;
  systemLabel: string;
  openMode: "route" | "window";
  status: "ready" | "building" | "planned";
};

export type DockApp = {
  id: DesktopAppId;
  label: string;
  icon: DesktopAppIcon;
  href?: string;
  openMode: "route" | "window";
  active?: boolean;
};

export type SystemStatusItem = {
  label: string;
  value: string;
};

export type LabPreviewEntry = {
  id: string;
  title: string;
  status: "preview" | "planned";
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  stage: "foundation" | "building" | "planned" | "published";
  tags: string[];
  href?: string;
  placeholder?: boolean;
};

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  status: "completed" | "exploring" | "planned";
  items: string[];
};

export type JourneyEntry = {
  id: string;
  title: string;
  timeframe: string;
  description: string;
  status: "current" | "completed" | "planned";
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issuedAt?: string;
  credentialUrl?: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  date?: string;
};
