"use client";

import { useState } from "react";
import type { GitHubRepoData } from "@/lib/github/types";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import {
  Search,
  ExternalLink,
  FlaskConical,
  Circle,
  Star,
  GitFork,
  Calendar,
  Code2,
} from "lucide-react";

type RepositoriesViewProps = {
  repositories: GitHubRepoData[];
};

type RepoCategoryFilter = "all" | "project" | "experiment" | "other";
type SortOption = "updated" | "name" | "stars";

const categoryFilters: { id: RepoCategoryFilter; label: string }[] = [
  { id: "all", label: "All Repos" },
  { id: "project", label: "Projects" },
  { id: "experiment", label: "Lab Experiments" },
  { id: "other", label: "Other" },
];

const languageColors: Record<string, string> = {
  Python: "text-blue-400",
  JavaScript: "text-yellow-400",
  TypeScript: "text-blue-500",
  HTML: "text-orange-500",
  CSS: "text-purple-400",
  Shell: "text-emerald-400",
  Jupyter: "text-amber-500",
};

function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return isoString;
  }
}

export function RepositoriesView({ repositories }: RepositoriesViewProps) {
  const windowManager = useOptionalWindowManager();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<RepoCategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("updated");
  const [selectedRepoId, setSelectedRepoId] = useState<number | string | null>(null);

  // Filter
  const filtered = repositories.filter((r) => {
    const matchesCategory = activeCategory === "all" || r.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.language.toLowerCase().includes(q) ||
      r.topics.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "stars") {
      return b.stars - a.stars;
    }
    // Default: updated
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const handleOpenLab = (labId: string) => {
    if (windowManager) {
      windowManager.openApp("engineering-lab");
      window.dispatchEvent(
        new CustomEvent("os:select-lab-experiment", { detail: { labId } })
      );
    }
  };

  return (
    <div className="space-y-4 select-none font-sans">
      {/* Search, Filter & Sort Bar */}
      <div className="space-y-2.5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30 pointer-events-none" />
          <input
            type="text"
            placeholder="Search public repositories by name, stack, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 py-2 font-mono text-xs text-white placeholder:text-white/25 outline-none transition-colors focus:border-accent/50 focus:bg-white/[0.05]"
            aria-label="Search repositories"
          />
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 pb-2">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categoryFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveCategory(f.id)}
                className={`rounded-md border px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-wider transition-all whitespace-nowrap
                  ${
                    activeCategory === f.id
                      ? "border-accent/40 bg-accent/15 text-accent"
                      : "border-white/8 bg-white/[0.02] text-white/40 hover:text-white/70 hover:border-white/15"
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 font-mono text-[0.6rem] text-white/40">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-950 border border-white/10 rounded px-2 py-0.5 text-white text-[0.62rem] font-semibold outline-none focus:border-accent"
            >
              <option value="updated">Recently Updated</option>
              <option value="name">Repository Name</option>
              <option value="stars">Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Repository List */}
      <div className="space-y-2">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[10rem] rounded-xl border border-dashed border-white/10 p-6 text-center">
            <p className="font-mono text-xs text-white/40">
              No repositories match the current filter or search criteria.
            </p>
          </div>
        ) : (
          sorted.map((repo) => {
            const isSelected = selectedRepoId === repo.id;
            return (
              <div
                key={repo.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden
                  ${
                    isSelected
                      ? "border-accent/40 bg-white/[0.04] shadow-md"
                      : "border-white/10 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03]"
                  }
                `}
              >
                {/* Repo Row Click Header */}
                <button
                  type="button"
                  onClick={() => setSelectedRepoId(isSelected ? null : repo.id)}
                  className="w-full text-left p-3.5 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Circle
                        className={`h-2.5 w-2.5 shrink-0 fill-current ${
                          languageColors[repo.language] || "text-emerald-400"
                        }`}
                      />
                      <span className="font-mono text-sm font-bold text-white tracking-tight truncate">
                        {repo.name}
                      </span>

                      {repo.labId && (
                        <span className="font-mono text-[0.55rem] font-bold text-accent px-1.5 py-0.5 rounded border border-accent/30 bg-accent/10 shrink-0">
                          {repo.labId}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[0.62rem] text-white/40 shrink-0">
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                          {repo.stars}
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3 text-white/40" />
                          {repo.forks}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.62rem] text-white/40 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-white/60">
                        <Code2 className="h-3 w-3 text-accent" />
                        {repo.language}
                      </span>
                    </div>

                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-white/30" />
                      Updated: {formatDate(repo.updatedAt)}
                    </span>
                  </div>
                </button>

                {/* Expanded Action Bar */}
                {isSelected && (
                  <div className="px-3.5 py-2.5 border-t border-white/8 bg-white/[0.02] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {repo.labId && (
                        <button
                          type="button"
                          onClick={() => handleOpenLab(repo.labId!)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[0.65rem] font-bold text-accent hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-wider"
                        >
                          <FlaskConical className="h-3.5 w-3.5" />
                          <span>Open in Lab ({repo.labId})</span>
                        </button>
                      )}
                    </div>

                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[0.65rem] font-semibold text-white hover:bg-white/15 transition-all uppercase tracking-wider"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>View on GitHub</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
