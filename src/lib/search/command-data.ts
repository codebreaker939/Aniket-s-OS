import type { DesktopAppId, DesktopAppIcon } from "@/types";
import { appRegistry } from "@/lib/app-registry";
import { experimentsData } from "@/lib/experiments-data";
import { contactConfig } from "@/lib/contact-data";

export type CommandItemType =
  | "application"
  | "experiment"
  | "technology"
  | "action"
  | "external";

export type CommandItem = {
  id: string;
  type: CommandItemType;
  title: string;
  subtitle: string;
  category: "Applications" | "Engineering Lab" | "Toolbox / Stack" | "Quick Actions" | "External Links";
  keywords: string[];
  iconName: DesktopAppIcon;
  appId?: DesktopAppId;
  labId?: string;
  externalUrl?: string;
};

/**
 * Builds normalized search index across Applications, Lab Experiments, Stack, and Links.
 */
export function buildSearchIndex(): CommandItem[] {
  const items: CommandItem[] = [];

  // 1. Applications from App Registry
  (Object.keys(appRegistry) as DesktopAppId[]).forEach((appId) => {
    const app = appRegistry[appId];
    items.push({
      id: `app-${appId}`,
      type: "application",
      title: app.title,
      subtitle: app.description,
      category: "Applications",
      keywords: [app.title.toLowerCase(), app.label.toLowerCase(), appId, app.category.toLowerCase()],
      iconName: app.icon,
      appId,
    });
  });

  // 2. Engineering Lab Experiments
  experimentsData.forEach((exp) => {
    items.push({
      id: `exp-${exp.id}`,
      type: "experiment",
      title: `${exp.id} — ${exp.name}`,
      subtitle: `${exp.subtitle} (${exp.domain})`,
      category: "Engineering Lab",
      keywords: [
        exp.id.toLowerCase(),
        exp.name.toLowerCase(),
        exp.slug.toLowerCase(),
        exp.domain.toLowerCase(),
        ...exp.technologies.map((t) => t.toLowerCase()),
      ],
      iconName: "lab",
      appId: "engineering-lab",
      labId: exp.id,
    });
  });

  // 3. Toolbox Technologies
  const techItems: { name: string; category: string; keywords: string[] }[] = [
    { name: "Python", category: "Languages & Machine Learning", keywords: ["python", "py", "ml", "ai", "backend"] },
    { name: "TypeScript / JavaScript", category: "Languages & Web Logic", keywords: ["typescript", "javascript", "ts", "js", "web"] },
    { name: "React & Next.js", category: "Frontend Frameworks", keywords: ["react", "next.js", "nextjs", "frontend", "ui"] },
    { name: "FastAPI & Node.js", category: "Backend Services & REST APIs", keywords: ["fastapi", "node.js", "nodejs", "express", "backend", "api"] },
    { name: "MongoDB & PostgreSQL", category: "Databases & Persistence", keywords: ["mongodb", "postgresql", "mysql", "sql", "database"] },
    { name: "Docker & Kubernetes", category: "Containers & Orchestration", keywords: ["docker", "kubernetes", "k8s", "devops", "cloud"] },
    { name: "Scikit-Learn & Pandas", category: "Machine Learning & Data Pipelines", keywords: ["scikit-learn", "pandas", "numpy", "ml", "ai", "data"] },
  ];

  techItems.forEach((tech, idx) => {
    items.push({
      id: `tech-${idx}`,
      type: "technology",
      title: tech.name,
      subtitle: `Toolbox · ${tech.category}`,
      category: "Toolbox / Stack",
      keywords: tech.keywords,
      iconName: "toolbox",
      appId: "toolbox",
    });
  });

  // 4. Quick Actions & External Links
  if (contactConfig.github) {
    items.push({
      id: "ext-github",
      type: "external",
      title: "Open GitHub Profile",
      subtitle: `External Link · ${contactConfig.github}`,
      category: "External Links",
      keywords: ["github", "source", "code", "repositories", "profile"],
      iconName: "github",
      externalUrl: contactConfig.github,
    });
  }

  if (contactConfig.linkedin) {
    items.push({
      id: "ext-linkedin",
      type: "external",
      title: "Open LinkedIn Profile",
      subtitle: `External Link · ${contactConfig.linkedin}`,
      category: "External Links",
      keywords: ["linkedin", "network", "profile", "connect"],
      iconName: "contact",
      externalUrl: contactConfig.linkedin,
    });
  }

  items.push({
    id: "act-resume",
    type: "action",
    title: "View System Profile & Resume",
    subtitle: "Dossier · Verified credentials and downloadable resume",
    category: "Quick Actions",
    keywords: ["resume", "cv", "profile", "download", "pdf"],
    iconName: "resume",
    appId: "resume",
  });

  return items;
}
