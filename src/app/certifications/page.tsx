import type { Metadata } from "next";

import { SectionPlaceholder } from "@/components/sections/section-placeholder";

export const metadata: Metadata = {
  title: "Certifications"
};

export default function CertificationsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Certifications"
      title="Credential Records"
      description="A prepared route for verified certifications. No placeholder credentials are shown until real data is available."
      status="Awaiting content"
    />
  );
}
