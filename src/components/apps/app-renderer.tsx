import type { DesktopAppId } from "@/types";
import { AboutApp } from "./about-app";
import { ProjectsApp } from "./projects-app";
import { EngineeringLabApp } from "./engineering-lab-app";
import { JourneyApp } from "./journey-app";
import { ToolboxApp } from "./toolbox-app";
import { GithubApp } from "./github-app";
import { ResumeApp } from "./resume-app";
import { LabNotesApp } from "./lab-notes-app";
import { ContactApp } from "./contact-app";
import { TerminalApp } from "./terminal-app";
import { SettingsApp } from "./settings-app";

export function AppRenderer({ id }: { id: DesktopAppId }) {
  switch (id) {
    case "about":
      return <AboutApp />;
    case "projects":
      return <ProjectsApp />;
    case "engineering-lab":
      return <EngineeringLabApp />;
    case "journey":
      return <JourneyApp />;
    case "toolbox":
      return <ToolboxApp />;
    case "github":
      return <GithubApp />;
    case "resume":
      return <ResumeApp />;
    case "lab-notes":
      return <LabNotesApp />;
    case "contact":
      return <ContactApp />;
    case "terminal":
      return <TerminalApp />;
    case "settings":
      return <SettingsApp />;
    default:
      return null;
  }
}
