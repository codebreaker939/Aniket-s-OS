import type { Metadata } from "next";

import { SectionPlaceholder } from "@/components/sections/section-placeholder";
import { journeyEntries } from "@/data/journey";

export const metadata: Metadata = {
  title: "Journey"
};

export default function JourneyPage() {
  return (
    <SectionPlaceholder
      eyebrow="Journey"
      title="Learning Path"
      description="A structured timeline for education, full-stack foundations, and the current AI/ML direction."
      status="Timeline seeded"
    >
      <div className="grid gap-px border border-border bg-border">
        {journeyEntries.map((entry) => (
          <article key={entry.id} className="grid gap-3 bg-surface p-4 sm:grid-cols-[10rem_1fr] sm:p-5">
            <div className="font-mono text-xs uppercase tracking-normal text-muted-foreground">{entry.timeframe}</div>
            <div>
              <h2 className="text-base font-semibold text-foreground">{entry.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.description}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionPlaceholder>
  );
}
