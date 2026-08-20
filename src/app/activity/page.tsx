import type { Metadata } from "next";
import { ActivityApp } from "@/components/apps/activity-app";

export const metadata: Metadata = {
  title: "System Activity & Event Log — Aniket OS",
  description: "Session event log for app, network, lab, and GitHub activity in Aniket OS.",
};

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-[#060810] text-white p-6 max-w-5xl mx-auto">
      <ActivityApp />
    </main>
  );
}
