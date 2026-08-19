"use client";

import { useState } from "react";
import {
  profileData,
  repositoriesData,
  sourceControlSections,
  type SourceControlSection,
} from "@/lib/github-data";
import { SourceControlSidebar } from "./source-control/source-control-sidebar";
import { ProfileView } from "./source-control/profile-view";
import { RepositoriesView } from "./source-control/repositories-view";
import { ActivityView } from "./source-control/activity-view";
import { GitBranch, ArrowLeft, FolderGit2 } from "lucide-react";

export function GithubApp() {
  const [selectedSection, setSelectedSection] =
    useState<SourceControlSection>("repositories");
  const [showMobileContent, setShowMobileContent] = useState(false);

  const handleSelectSection = (id: SourceControlSection) => {
    setSelectedSection(id);
    setShowMobileContent(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4 text-white">
      {/* Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-accent" />
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              SOURCE CONTROL
            </h2>
            <p className="text-[0.68rem] text-white/60">
              GitHub / Repositories / Development Activity
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[0.62rem] text-white/40 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded">
          <FolderGit2 className="h-3 w-3 text-accent" />
          <span>{repositoriesData.length} REPOS</span>
        </div>
      </div>

      {/* Two-Panel Body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[13rem_1fr] lg:grid-cols-[14.5rem_1fr] gap-4 min-h-[28rem]">
        {/* Left: Sidebar */}
        <div
          className={`md:block border-r border-white/10 pr-0 md:pr-4 ${
            showMobileContent ? "hidden md:block" : "block"
          }`}
        >
          <SourceControlSidebar
            sections={sourceControlSections}
            selectedId={selectedSection}
            repoCounts={repositoriesData.length}
            onSelectSection={handleSelectSection}
          />
        </div>

        {/* Right: Content */}
        <div
          className={`flex flex-col min-h-0 overflow-y-auto pr-1 no-scrollbar ${
            showMobileContent ? "block" : "hidden md:block"
          }`}
        >
          {/* Mobile Back */}
          {showMobileContent && (
            <div className="md:hidden mb-3 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowMobileContent(false)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Navigation</span>
              </button>
            </div>
          )}

          {/* Section content */}
          {selectedSection === "profile" && (
            <ProfileView profile={profileData} />
          )}
          {selectedSection === "repositories" && (
            <RepositoriesView repositories={repositoriesData} />
          )}
          {selectedSection === "activity" && <ActivityView />}
        </div>
      </div>
    </div>
  );
}
