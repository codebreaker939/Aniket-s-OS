"use client";

import { useState, useEffect, useCallback } from "react";
import type { GitHubNormalizedData } from "@/lib/github/types";
import { profileData as fallbackProfile, repositoriesData as fallbackRepos } from "@/lib/github-data";
import { sourceControlSections, type SourceControlSection } from "@/lib/github-data";
import { SourceControlSidebar } from "./source-control/source-control-sidebar";
import { ProfileView } from "./source-control/profile-view";
import { RepositoriesView } from "./source-control/repositories-view";
import { ActivityView } from "./source-control/activity-view";
import { GitBranch, ArrowLeft, FolderGit2, RotateCcw, Loader2 } from "lucide-react";

export function GithubApp() {
  const [selectedSection, setSelectedSection] = useState<SourceControlSection>("repositories");
  const [showMobileContent, setShowMobileContent] = useState(false);

  // Live GitHub API State
  const [githubData, setGithubData] = useState<GitHubNormalizedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGitHubData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/github");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json: GitHubNormalizedData = await res.json();
      setGithubData(json);
      if (typeof window !== "undefined" && json.status === "CONNECTED") {
        window.dispatchEvent(
          new CustomEvent("os:github-synced", {
            detail: { count: json.repositories?.length || 0, status: "CONNECTED" },
          })
        );
      }
    } catch {
      setGithubData({
        status: "UNAVAILABLE",
        profile: null,
        repositories: [],
        recentActivity: [],
        error: "GitHub API temporarily unavailable.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  const handleSelectSection = (id: SourceControlSection) => {
    setSelectedSection(id);
    setShowMobileContent(true);
  };

  // Determine active profile and repositories (live data preferred, static fallback if unavailable)
  const isConnected = githubData?.status === "CONNECTED";
  const statusLabel =
    githubData?.status === "CONNECTED"
      ? "CONNECTED"
      : githubData?.status === "NOT_CONFIGURED"
      ? "NOT CONFIGURED"
      : "UNAVAILABLE";

  const activeProfile = githubData?.profile || (isConnected ? null : {
    name: fallbackProfile.name,
    username: fallbackProfile.username || "codebreaker939",
    avatarUrl: null,
    bio: fallbackProfile.bio,
    publicRepos: fallbackRepos.length,
    followers: 0,
    following: 0,
    profileUrl: fallbackProfile.profileUrl || "https://github.com/codebreaker939",
    location: "Navi Mumbai, India",
  });

  const activeRepositories = (githubData?.repositories && githubData.repositories.length > 0)
    ? githubData.repositories
    : fallbackRepos.map((r) => ({
        id: r.id,
        name: r.name,
        fullName: `codebreaker939/${r.name}`,
        description: r.description,
        htmlUrl: r.githubUrl || "https://github.com/codebreaker939",
        language: r.language,
        topics: r.technologies,
        updatedAt: new Date().toISOString(),
        createdAt: "2024-01-01T00:00:00Z",
        stars: 0,
        forks: 0,
        isFork: false,
        isArchived: false,
        labId: r.experimentId,
        category: r.experimentId ? ("experiment" as const) : ("project" as const),
      }));

  const activeActivity = (githubData?.recentActivity && githubData.recentActivity.length > 0)
    ? githubData.recentActivity
    : activeRepositories.slice(0, 5).map((r) => ({
        repoName: r.name,
        updatedAt: r.updatedAt,
        htmlUrl: r.htmlUrl,
        language: r.language,
        labId: r.labId,
      }));

  return (
    <div className="flex flex-col h-full space-y-4 text-white select-none font-sans overflow-y-auto pr-1 no-scrollbar">
      {/* Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-accent" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                SOURCE CONTROL
              </h2>
              {/* Honest Connection Status Badge */}
              <span
                className={`font-mono text-[0.55rem] px-2 py-0.5 rounded border font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                  statusLabel === "CONNECTED"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                    : statusLabel === "UNAVAILABLE"
                    ? "border-amber-400/30 bg-amber-400/10 text-amber-400"
                    : "border-white/15 bg-white/5 text-white/50"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    statusLabel === "CONNECTED"
                      ? "bg-emerald-400 animate-pulse"
                      : statusLabel === "UNAVAILABLE"
                      ? "bg-amber-400"
                      : "bg-white/40"
                  }`}
                />
                <span>● {statusLabel}</span>
              </span>
            </div>
            <p className="text-[0.68rem] text-white/60">
              GitHub Repositories / Live Development Activity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[0.62rem]">
          {statusLabel === "UNAVAILABLE" && (
            <button
              type="button"
              onClick={fetchGitHubData}
              disabled={isLoading}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-slate-950 transition-all font-semibold uppercase tracking-wider"
            >
              <RotateCcw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
              <span>Retry</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 text-white/40 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded">
            <FolderGit2 className="h-3 w-3 text-accent" />
            <span>{activeRepositories.length} REPOS</span>
          </div>
        </div>
      </div>

      {/* Loading Bar */}
      {isLoading && (
        <div className="rounded-lg border border-accent/20 bg-accent/[0.04] p-3 flex items-center justify-between text-xs font-mono text-accent">
          <div className="flex items-center gap-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Synchronizing public repository data from GitHub API...</span>
          </div>
        </div>
      )}

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
            repoCounts={activeRepositories.length}
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
            <ProfileView profile={activeProfile} />
          )}
          {selectedSection === "repositories" && (
            <RepositoriesView repositories={activeRepositories} />
          )}
          {selectedSection === "activity" && (
            <ActivityView recentActivity={activeActivity} />
          )}
        </div>
      </div>
    </div>
  );
}
