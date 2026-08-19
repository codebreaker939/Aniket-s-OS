import type { Metadata } from "next";
import { ActivityApp } from "@/components/apps/activity-app";

export const metadata: Metadata = {
  title: "System Activity & Event Log — Aniket OS",
  description: "Real session event log, system audit, and state transitions across ANIKET OS workstation.",
};

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-[#060810] text-white p-6 max-w-5xl mx-auto">
      <ActivityApp />
    </main>
  );
}
