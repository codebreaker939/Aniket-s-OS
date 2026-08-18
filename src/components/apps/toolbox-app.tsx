import Link from "next/link";
import { ExternalLink, Wrench, Layers } from "lucide-react";

const stackGroups = [
  { category: "Frontend & Interface", items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Motion"] },
  { category: "Backend & Systems", items: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Redis"] },
  { category: "AI / ML Stack", items: ["Python", "PyTorch", "Scikit-Learn", "FastAPI", "NumPy / Pandas"] },
  { category: "Tooling & Environment", items: ["Git / GitHub", "VS Code", "Vercel", "Docker Basics", "macOS Terminal"] }
];

export function ToolboxApp() {
  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <Wrench className="h-3.5 w-3.5" />
          <span>Tech Stack & Environment</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white">TOOLBOX</h2>
        <p className="mt-1 text-xs text-white/70">
          Core technologies, frameworks, libraries, and developer tools.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {stackGroups.map((group) => (
          <div key={group.category} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center gap-2 font-mono text-[0.62rem] font-semibold text-accent uppercase tracking-wider">
              <Layers className="h-3 w-3" />
              <span>{group.category}</span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-1 font-mono text-xs text-white/90">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Link
          href="/skills"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2.5 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
        >
          <span>Inspect Toolbox Route</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
