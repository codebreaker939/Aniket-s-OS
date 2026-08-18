import type { Metadata } from "next";

import { SectionPlaceholder } from "@/components/sections/section-placeholder";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <SectionPlaceholder
      eyebrow="System Profile"
      title="About Aniket Rai"
      description="A focused profile page for a B.Tech CSE student with a full-stack development foundation and a current AI/ML exploration track."
    />
  );
}
