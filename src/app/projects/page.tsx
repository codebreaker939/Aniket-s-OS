import type { Metadata } from "next";
import { ProjectsApp } from "@/components/apps/projects-app";

export const metadata: Metadata = {
  title: "Projects & Selected Builds — Aniket OS",
  description: "Selected software builds, architectural prototypes, and engineering project archive by Aniket Rai.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#060810] text-white p-6 max-w-6xl mx-auto">
      <ProjectsApp />
    </main>
  );
}
