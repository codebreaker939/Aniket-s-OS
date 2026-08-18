import Link from "next/link";
import { ExternalLink, Github, GitBranch, GitCommit } from "lucide-react";

export function GithubApp() {
  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <Github className="h-3.5 w-3.5" />
          <span>Source Control & Repositories</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white">GITHUB WORKBENCH</h2>
        <p className="mt-1 text-xs text-white/70">
          Source control activity, active branches, and code repository commits.
        </p>
      </div>

      <div className="rounded-xl border border-white/12 bg-black/40 p-3.5 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-accent font-semibold border-b border-white/10 pb-2">
          <span className="flex items-center gap-1.5">
            <GitBranch className="h-3.5 w-3.5" />
            <span>main</span>
          </span>
          <span className="text-[0.6rem] uppercase text-white/40">Status: Active</span>
        </div>
        <div className="space-y-2 pt-1 text-white/80">
          <div className="flex items-start gap-2">
            <GitCommit className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white/90">aniket-os: Core desktop environment & window manager</div>
              <div className="text-[0.62rem] text-white/45">Refactored interaction model & app registry</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <GitCommit className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white/90">claimfast: Claims automation engine prototype</div>
              <div className="text-[0.62rem] text-white/45">Added initial rule parser and Next 15 setup</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/github"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2.5 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
        >
          <span>Open GitHub Signal Route</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
