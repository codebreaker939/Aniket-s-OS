import type { Metadata } from "next";

import { SectionPlaceholder } from "@/components/sections/section-placeholder";

export const metadata: Metadata = {
  title: "Resume"
};

export default function ResumePage() {
  return (
    <SectionPlaceholder
      eyebrow="System Profile"
      title="Resume"
      description="The resume route is wired for navigation now. A downloadable resume asset can be added when the final document is ready."
      status="Route online"
    />
  );
}
