import type { Metadata } from "next";
import { GithubApp } from "@/components/apps/github-app";

export const metadata: Metadata = {
  title: "Source Control - Aniket OS",
  description: "GitHub repositories, development activity, and source-control signals for Aniket Rai.",
};

export default function GithubPage() {
  return (
    <main className="min-h-screen bg-[#060810] text-white p-6 max-w-6xl mx-auto">
      <GithubApp />
    </main>
  );
}
