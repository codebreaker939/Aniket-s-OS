"use client";

import { useState, useEffect, useCallback } from "react";
import type { GitHubNormalizedData } from "@/lib/github/types";
import { profileData as fallbackProfile, repositoriesData as fallbackRepos } from "@/lib/github-data";
import { sourceControlSections, type SourceControlSection } from "@/lib/github-data";
import { GITHUB_USERNAME } from "@/lib/github/config";
import {
  normalizeGitHubData,
  type RawGitHubRepoItem,
  type RawGitHubUserResponse,
} from "@/lib/github/mapper";
import { SourceControlSidebar } from "./source-control/source-control-sidebar";
import { ProfileView } from "./source-control/profile-view";
import { RepositoriesView } from "./source-control/repositories-view";
import { ActivityView } from "./source-control/activity-view";
import { AppHeader, StatusBadge } from "@/components/ui/os-primitives";
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
      if (!GITHUB_USERNAME) {
        setGithubData({
          status: "NOT_CONFIGURED",
          profile: null,
          repositories: [],
          recentActivity: [],
          error: "GitHub username is not configured.",
        });
        return;
      }

      const headers = { Accept: "application/vnd.github.v3+json" };
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, { headers }),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        throw new Error(`GitHub API error: ${userRes.status} / ${reposRes.status}`);
      }

      const userJson = (await userRes.json()) as RawGitHubUserResponse;
      const reposJson = (await reposRes.json()) as RawGitHubRepoItem[];
      const normalized = normalizeGitHubData(userJson, reposJson);

      setGithubData(normalized);
      if (typeof window !== "undefined" && normalized.status === "CONNECTED") {
        window.dispatchEvent(
          new CustomEvent("os:github-synced", {
            detail: { count: normalized.repositories?.length || 0, status: "CONNECTED" },
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
      <AppHeader
        icon={GitBranch}
        title="Source Control"
        eyebrow="Developer Activity"
        description="GitHub repositories, public activity, and live source metadata."
        variant="data"
        status={
          <StatusBadge
            tone={statusLabel === "CONNECTED" ? "ready" : statusLabel === "UNAVAILABLE" ? "attention" : "neutral"}
            pulse={statusLabel === "CONNECTED"}
          >
            {statusLabel}
          </StatusBadge>
        }
        meta={
          <div className="flex items-center gap-2 font-mono text-[0.62rem]">
            {statusLabel === "UNAVAILABLE" && (
              <button
                type="button"
                onClick={fetchGitHubData}
                disabled={isLoading}
                className="inline-flex items-center gap-1 rounded border border-semantic-attention/30 bg-semantic-attention/10 px-2.5 py-1 font-semibold uppercase tracking-wider text-semantic-attention transition-all hover:bg-semantic-attention hover:text-slate-950"
              >
                <RotateCcw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
                <span>Retry</span>
              </button>
            )}
            <span className="hidden items-center gap-1.5 rounded border border-white/10 px-2.5 py-1 uppercase tracking-widest text-white/40 sm:flex">
              <FolderGit2 className="h-3 w-3 text-semantic-info" />
              {activeRepositories.length} Repos
            </span>
          </div>
        }
      />

      {/* Loading Bar */}
      {isLoading && (
        <div className="flex items-center justify-between rounded-lg border border-semantic-info/20 bg-semantic-info/[0.045] p-3 font-mono text-xs text-semantic-info">
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
          className={`md:block rounded-xl border border-semantic-info/[0.12] bg-white/[0.018] p-3 md:border-r md:border-white/10 md:bg-transparent md:p-0 md:pr-4 ${
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
          className={`os-panel os-panel-data flex flex-col min-h-0 overflow-y-auto rounded-xl p-4 pr-3 no-scrollbar ${
            showMobileContent ? "block" : "hidden md:block"
          }`}
        >
          {/* Mobile Back */}
          {showMobileContent && (
            <div className="md:hidden mb-3 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowMobileContent(false)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-semantic-info hover:text-white transition-colors"
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
