import Link from "next/link";
import { ExternalLink, FolderGit2, CheckCircle2 } from "lucide-react";

const projectRecords = [
  { id: "PRJ-01", title: "ClaimFast", tags: ["Next.js", "TypeScript", "Tailwind"], desc: "Insurance claims processing automation prototype." },
  { id: "PRJ-02", title: "LockSync", tags: ["Node.js", "Redis", "Distributed"], desc: "High-concurrency distributed lock coordination pattern." },
  { id: "PRJ-03", title: "Vehicle Maintenance Predictor", tags: ["Python", "Scikit-Learn", "FastAPI"], desc: "Predictive maintenance model based on usage metrics." },
  { id: "PRJ-04", title: "HelixAI", tags: ["React", "Python", "LLM Pipelines"], desc: "Workflow orchestration engine for AI agent tasks." }
];

export function ProjectsApp() {
  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <FolderGit2 className="h-3.5 w-3.5" />
          <span>Project Archive</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white">PROJECTS</h2>
        <p className="mt-1 text-xs text-white/70">
          Case studies, architectural prototypes, and software builds.
        </p>
      </div>

      <div className="space-y-2.5">
        {projectRecords.map((prj) => (
          <div key={prj.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-white/20 hover:bg-white/[0.07]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-accent">{prj.id}</span>
                <span className="text-sm font-semibold text-white/95">{prj.title}</span>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified</span>
              </span>
            </div>
            <p className="mt-1 text-xs text-white/70 leading-relaxed">{prj.desc}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {prj.tags.map((tag) => (
                <span key={tag} className="rounded bg-white/10 px-2 py-0.5 font-mono text-[0.6rem] text-white/75">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Link
          href="/projects"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2.5 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
        >
          <span>Explore Projects Route</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
