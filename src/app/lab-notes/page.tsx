import type { Metadata } from "next";
import { LabNotesApp } from "@/components/apps/lab-notes-app";

export const metadata: Metadata = {
  title: "Lab Notes & Visitor Feedback — Aniket OS",
  description: "Shared notebook of visitor observations, feedback, and field notes for Aniket OS and the Engineering Lab.",
};

export default function LabNotesPage() {
  return (
    <main className="min-h-screen bg-[#060810] text-white p-6 max-w-6xl mx-auto">
      <LabNotesApp />
    </main>
  );
}
