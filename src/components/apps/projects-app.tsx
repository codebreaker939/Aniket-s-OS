"use client";

import { useState, useMemo } from "react";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import { projectsData, type ProjectCategory } from "@/lib/projects-data";
import type { DesktopAppId } from "@/types";
import {
  FolderGit2,
  Search,
  ExternalLink,
  FlaskConical,
  Github,
  Wrench,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const categoryFilters: { id: ProjectCategory; label: string }[] = [
  { id: "ALL", label: "All Builds" },
  { id: "FULL STACK", label: "Full Stack" },
  { id: "BACKEND", label: "Backend" },
  { id: "AI / ML", label: "AI / ML" },
  { id: "SYSTEMS", label: "Systems" },
  { id: "CLOUD / DEVOPS", label: "Cloud / DevOps" },
];

export function ProjectsApp() {
  const windowManager = useOptionalWindowManager();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("ALL");
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>(
    projectsData[0]?.slug || "claimfast"
  );
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return projectsData.filter((prj) => {
      const matchesCategory =
        selectedCategory === "ALL" || prj.categories.includes(selectedCategory);

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = prj.name.toLowerCase().includes(q);
      const summaryMatch = prj.summary.toLowerCase().includes(q);
      const domainMatch = prj.domain.toLowerCase().includes(q);
      const techMatch = prj.technologies.some((t) => t.toLowerCase().includes(q));

      return nameMatch || summaryMatch || domainMatch || techMatch;
    });
  }, [searchQuery, selectedCategory]);

  // Selected project object
  const activeProject = useMemo(() => {
    return (
      projectsData.find((p) => p.slug === selectedProjectSlug) ||
      filteredProjects[0] ||
      projectsData[0]
    );
  }, [selectedProjectSlug, filteredProjects]);

  const handleSelectProject = (slug: string) => {
    setSelectedProjectSlug(slug);
    setIsMobileDetailOpen(true);
  };

  const handleInspectExperiment = (experimentId?: string) => {
    if (!experimentId) return;
    if (windowManager) {
      windowManager.openApp("engineering-lab");
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("os:select-lab-experiment", { detail: { labId: experimentId } })
      );
    }
  };

  const handleOpenSourceControl = (githubUrl?: string) => {
    if (githubUrl) {
      window.open(githubUrl, "_blank", "noopener,noreferrer");
    } else if (windowManager) {
      windowManager.openApp("github");
    }
  };

  const handleOpenToolbox = () => {
    if (windowManager) {
      windowManager.openApp("toolbox" as DesktopAppId);
    }
  };

  return (
    <div className="flex flex-col h-full text-white select-none font-sans overflow-hidden space-y-3">
      {/* Top Header & Search Bar */}
      <div className="shrink-0 space-y-3 pb-3 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-accent" />
            <div>
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span>PROJECTS</span>
                <span className="text-[0.6rem] px-1.5 py-0.5 rounded border border-accent/30 bg-accent/10 text-accent font-normal">
                  {projectsData.length} BUILDS
                </span>
              </h2>
              <p className="text-[0.68rem] text-white/60">
                Selected Builds & Software Project Archive
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/12 bg-white/5 pl-8 pr-3 py-1.5 font-mono text-xs text-white placeholder-white/40 focus:border-accent/60 focus:bg-white/10 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-md border px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-wider transition-all whitespace-nowrap
                ${
                  selectedCategory === cat.id
                    ? "border-accent/40 bg-accent/15 text-accent"
                    : "border-white/8 bg-white/[0.02] text-white/40 hover:text-white/70 hover:border-white/15"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Master-Detail Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden">
        {/* Left Column: Project List */}
        <div
          className={`lg:col-span-5 flex flex-col space-y-2 overflow-y-auto pr-1 custom-scrollbar ${
            isMobileDetailOpen ? "hidden lg:flex" : "flex"
          }`}
        >
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[14rem] rounded-xl border border-dashed border-white/10 p-6 text-center">
              <FolderGit2 className="h-6 w-6 text-white/20 mb-2" />
              <p className="font-mono text-xs text-white/40">
                No projects match your search filter.
              </p>
            </div>
          ) : (
            filteredProjects.map((prj) => {
              const isSelected = activeProject?.slug === prj.slug;
              return (
                <button
                  key={prj.id}
                  type="button"
                  onClick={() => handleSelectProject(prj.slug)}
                  className={`w-full text-left rounded-xl border p-3.5 space-y-2 transition-all group ${
                    isSelected
                      ? "border-accent/50 bg-accent/10 shadow-lg shadow-accent/5"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.62rem] font-bold text-accent">
                        {prj.id}
                      </span>
                      <h3 className="font-mono text-xs font-bold text-white group-hover:text-accent transition-colors">
                        {prj.name}
                      </h3>
                    </div>

                    {prj.status && (
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                          prj.status === "COMPLETED"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        <span className="h-1 w-1 rounded-full bg-current" />
                        <span>{prj.status}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-[0.72rem] text-white/70 leading-snug font-sans line-clamp-2">
                    {prj.summary}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-[0.58rem]">
                    <span className="text-white/40 uppercase">{prj.domain}</span>
                    {prj.experimentId && (
                      <span className="text-accent font-semibold flex items-center gap-0.5">
                        <span>{prj.experimentId}</span>
                        <ChevronRight className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Project Detail View */}
        <div
          className={`lg:col-span-7 flex flex-col rounded-xl border border-white/12 bg-white/[0.02] p-5 space-y-4 overflow-y-auto custom-scrollbar ${
            isMobileDetailOpen ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Mobile Back Button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileDetailOpen(false)}
              className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Projects List</span>
            </button>
          </div>

          {activeProject ? (
            <>
              {/* Project Title Header */}
              <div className="space-y-1 border-b border-white/10 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-accent">
                      {activeProject.id}
                    </span>
                    <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 font-mono text-[0.6rem] text-white/50 uppercase">
                      {activeProject.domain}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-white/40">
                    YEAR: {activeProject.year}
                  </span>
                </div>

                <h3 className="font-mono text-xl font-extrabold tracking-tight text-white">
                  {activeProject.name}
                </h3>
                <p className="text-xs text-white/60 font-sans">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <h4 className="font-mono text-[0.62rem] font-bold text-white/50 uppercase tracking-widest">
                  SUMMARY & PURPOSE
                </h4>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {activeProject.summary}
                </p>
              </div>

              {/* Technology Stack */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-[0.62rem] font-bold text-white/50 uppercase tracking-widest">
                    TECHNOLOGY STACK
                  </h4>
                  <button
                    type="button"
                    onClick={handleOpenToolbox}
                    className="inline-flex items-center gap-1 font-mono text-[0.58rem] text-accent hover:underline uppercase"
                  >
                    <Wrench className="h-3 w-3" />
                    <span>View in Toolbox</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      onClick={handleOpenToolbox}
                      className="cursor-pointer rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[0.62rem] text-white/80 hover:border-accent/40 hover:text-accent transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Integration & Connections */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <h4 className="font-mono text-[0.62rem] font-bold text-white/50 uppercase tracking-widest">
                  SYSTEM CONNECTIONS & LINKS
                </h4>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 font-mono text-xs">
                  {activeProject.experimentId && (
                    <button
                      type="button"
                      onClick={() => handleInspectExperiment(activeProject.experimentId)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-3.5 py-2 font-semibold text-accent hover:bg-accent hover:text-slate-950 transition-colors"
                    >
                      <FlaskConical className="h-3.5 w-3.5" />
                      <span>INSPECT EXPERIMENT ({activeProject.experimentId})</span>
                    </button>
                  )}

                  {activeProject.githubUrl && (
                    <button
                      type="button"
                      onClick={() => handleOpenSourceControl(activeProject.githubUrl)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 font-semibold text-white hover:bg-white/10 hover:border-white/30 transition-colors"
                    >
                      <Github className="h-3.5 w-3.5 text-white/70" />
                      <span>SOURCE CONTROL</span>
                      <ExternalLink className="h-3 w-3 text-white/40" />
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <FolderGit2 className="h-8 w-8 text-white/20 mb-2" />
              <p className="font-mono text-xs text-white/40">Select a project to inspect details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
