import type { Metadata } from "next";
import { CertificationsApp } from "@/components/apps/certifications-app";

export const metadata: Metadata = {
  title: "Credentials & Certifications — Aniket OS",
  description: "Verified academic tracks, technical credentials, and professional certification records for Aniket Rai.",
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#060810] text-white p-6 max-w-6xl mx-auto">
      <CertificationsApp />
    </main>
  );
}
