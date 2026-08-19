"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { RepositoryItem, RepositoryType } from "@/lib/github-data";
import { useWindowManager } from "@/components/os/window-manager";
import {
  Search,
  ExternalLink,
  FlaskConical,
  Circle,
} from "lucide-react";

type RepositoriesViewProps = {
  repositories: RepositoryItem[];
};

const typeFilters: { id: RepositoryType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "project", label: "Projects" },
  { id: "experiment", label: "Experiments" },
];

const languageColors: Record<string, string> = {
  Python: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
};

export function RepositoriesView({ repositories }: RepositoriesViewProps) {
  const { openApp } = useWindowManager();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<RepositoryType | "all">(
    "all"
  );
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);

  const filtered = repositories.filter((r) => {
    const matchesType = activeFilter === "all" || r.type === activeFilter;
    const matchesSearch =
      !searchQuery ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.language.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const selectedRepo = filtered.find((r) => r.id === selectedRepoId) || null;

  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="space-y-2.5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30 pointer-events-none" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 py-2 font-mono text-[0.72rem] text-white/80 placeholder:text-white/25 outline-none transition-colors focus:border-accent/50 focus:bg-white/[0.05]"
            aria-label="Search repositories"
          />
        </div>

        {/* Type filters */}
        <div className="flex items-center gap-1.5">
          {typeFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`rounded-md border px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-wider transition-all
                ${
                  activeFilter === f.id
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-white/8 bg-white/[0.02] text-white/35 hover:text-white/50 hover:border-white/15"
                }
              `}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto font-mono text-[0.52rem] text-white/25">
            {filtered.length} {filtered.length === 1 ? "repo" : "repos"}
          </span>
        </div>
      </div>

      {/* Repository list */}
      <div className="space-y-1.5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[10rem] rounded-lg border border-dashed border-white/10 p-6 text-center">
            <p className="font-mono text-[0.68rem] text-white/40">
              No repositories match the current filter.
            </p>
          </div>
        ) : (
          filtered.map((repo) => (
            <button
              key={repo.id}
              type="button"
              onClick={() =>
                setSelectedRepoId(
                  selectedRepoId === repo.id ? null : repo.id
                )
              }
              aria-expanded={selectedRepoId === repo.id}
              className={`group w-full text-left rounded-lg border px-3.5 py-3 transition-all duration-200
                ${
                  selectedRepoId === repo.id
                    ? "border-white/15 bg-white/[0.04]"
                    : "border-white/8 bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.03]"
                }
              `}
            >
              {/* Row header */}
              <div className="flex items-center gap-2.5 mb-1">
                {/* Language dot */}
                <Circle
                  className={`h-2.5 w-2.5 shrink-0 fill-current ${
                    languageColors[repo.language]
                      ? languageColors[repo.language].replace("bg-", "text-")
                      : "text-gray-400"
                  }`}
                />
                {/* Name */}
                <span className="font-mono text-[0.76rem] font-semibold text-white/85 group-hover:text-white transition-colors">
                  {repo.name}
                </span>
                {/* Status */}
                <span
                  className={`ml-auto shrink-0 inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[0.48rem] font-bold uppercase tracking-[0.12em]
                    ${
                      repo.status === "active"
                        ? "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/[0.06]"
                        : "text-white/35 border-white/10 bg-white/[0.03]"
                    }
                  `}
                >
                  {repo.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-[0.68rem] text-white/50 leading-relaxed line-clamp-2 ml-5">
                {repo.description}
              </p>

              {/* Tech tags */}
              <div className="mt-2 ml-5 flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[0.54rem] text-white/30 uppercase tracking-wider">
                  {repo.language}
                </span>
                {repo.experimentId && (
                  <>
                    <span className="w-[1px] h-2.5 bg-white/10" />
                    <span className="font-mono text-[0.52rem] text-accent/50 uppercase tracking-wider">
                      {repo.experimentId}
                    </span>
                  </>
                )}
              </div>
            </button>
          ))
        )}
      </div>

      {/* Selected repo detail */}
      <AnimatePresence mode="wait">
        {selectedRepo && (
          <motion.div
            key={selectedRepo.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-white/12 bg-white/[0.03] p-4 space-y-3.5"
          >
            {/* Detail header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Circle
                  className={`h-2.5 w-2.5 shrink-0 fill-current ${
                    languageColors[selectedRepo.language]
                      ? languageColors[selectedRepo.language].replace(
                          "bg-",
                          "text-"
                        )
                      : "text-gray-400"
                  }`}
                />
                <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                  {selectedRepo.name}
                </h3>
              </div>
              <p className="text-[0.74rem] text-white/60 leading-relaxed mt-1">
                {selectedRepo.description}
              </p>
            </div>

            {/* Stack */}
            <div>
              <span className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-white/30 block mb-1.5">
                Stack
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedRepo.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded border border-accent/15 bg-accent/[0.05] px-2 py-0.5 font-mono text-[0.58rem] text-accent/70 tracking-wider uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {selectedRepo.experimentId && (
                <button
                  type="button"
                  onClick={() => openApp("engineering-lab")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.62rem] text-white/60 hover:border-accent/30 hover:text-accent transition-all"
                >
                  <FlaskConical className="h-3 w-3" />
                  <span>Open in Lab</span>
                  <span className="text-accent/50 font-bold">
                    {selectedRepo.experimentId}
                  </span>
                </button>
              )}
              {selectedRepo.githubUrl && (
                <a
                  href={selectedRepo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.62rem] text-white/60 hover:border-accent/30 hover:text-accent transition-all"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>View on GitHub</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
