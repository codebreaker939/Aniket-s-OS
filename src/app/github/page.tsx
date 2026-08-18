import type { Metadata } from "next";

import { SectionPlaceholder } from "@/components/sections/section-placeholder";

export const metadata: Metadata = {
  title: "Source Control"
};

export default function GitHubPage() {
  return (
    <SectionPlaceholder
      eyebrow="Source Control"
      title="GitHub Integration Placeholder"
      description="This route is reserved for future GitHub API integration, repository highlights, and contribution signals."
      status="Integration pending"
    />
  );
}
