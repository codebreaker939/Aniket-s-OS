import type { Metadata } from "next";
import { MilestonesApp } from "@/components/apps/milestones-app";

export const metadata: Metadata = {
  title: "Milestones & Achievements — Aniket OS",
  description: "Engineering milestone log, student leadership, competitions, and project achievements for Aniket Rai.",
};

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-[#060810] text-white p-6 max-w-6xl mx-auto">
      <MilestonesApp />
    </main>
  );
}
