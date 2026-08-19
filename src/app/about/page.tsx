import type { Metadata } from "next";
import { AboutApp } from "@/components/apps/about-app";

export const metadata: Metadata = {
  title: "About Aniket Rai — Aniket OS",
  description: "Developer profile, engineering background, and technical direction for Aniket Rai.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#060810] text-white p-6 max-w-6xl mx-auto">
      <AboutApp />
    </main>
  );
}
