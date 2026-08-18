import type { Metadata } from "next";

import { SectionPlaceholder } from "@/components/sections/section-placeholder";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <SectionPlaceholder
      eyebrow="Comms"
      title="Contact"
      description="A focused contact route for future internship, collaboration, and software or AI engineering opportunities."
      status="Route online"
    />
  );
}
