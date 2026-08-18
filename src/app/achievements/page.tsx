import type { Metadata } from "next";

import { SectionPlaceholder } from "@/components/sections/section-placeholder";

export const metadata: Metadata = {
  title: "Achievements"
};

export default function AchievementsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Milestones"
      title="Achievement Log"
      description="A reserved space for verified achievements and milestones without inventing stats or experience."
      status="Awaiting content"
    />
  );
}
