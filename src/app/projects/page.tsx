import type { Metadata } from "next";

import { ProjectPreviewGrid } from "@/components/projects/project-preview-grid";
import { SectionPlaceholder } from "@/components/sections/section-placeholder";

export const metadata: Metadata = {
  title: "Projects"
};

export default function ProjectsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Projects"
      title="Project Records"
      description="This area is prepared for verified project case studies. For now, it only shows the portfolio foundation record."
      status="Data model ready"
    >
      <ProjectPreviewGrid />
    </SectionPlaceholder>
  );
}
