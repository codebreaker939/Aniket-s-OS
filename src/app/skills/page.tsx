import type { Metadata } from "next";

import { SectionPlaceholder } from "@/components/sections/section-placeholder";
import { StatusPill } from "@/components/ui/status-pill";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Toolbox"
};

export default function SkillsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Toolbox"
      title="Engineering Toolbox"
      description="A minimal skills structure that can later expand into tools, systems, frameworks, and AI/ML learning artifacts."
      status="Typed data ready"
    >
      <div className="grid gap-px border border-border bg-border md:grid-cols-2">
        {skillGroups.map((group) => (
          <article key={group.id} className="bg-surface p-4 sm:p-5">
            <StatusPill tone={group.status === "exploring" ? "accent" : "muted"}>{group.status}</StatusPill>
            <h2 className="mt-5 text-lg font-semibold text-foreground">{group.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.summary}</p>
          </article>
        ))}
      </div>
    </SectionPlaceholder>
  );
}
