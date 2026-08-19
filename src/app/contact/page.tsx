import type { Metadata } from "next";
import { ContactApp } from "@/components/apps/contact-app";

export const metadata: Metadata = {
  title: "Contact & Communication Console — Aniket OS",
  description: "Direct communication channels and inquiry console for Aniket Rai (software engineering internships, full-stack, and AI/ML opportunities).",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#060810] text-white p-6 max-w-6xl mx-auto">
      <ContactApp />
    </main>
  );
}
