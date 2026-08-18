import Link from "next/link";
import { ExternalLink, Map } from "lucide-react";


const milestones = [
  { era: "2022 - Present", title: "B.Tech Computer Science & Engineering", status: "Active", desc: "Core computer science foundation: Data Structures, Algorithms, OS, Networking, and Database Systems." },
  { era: "2023 - 2024", title: "Full-Stack Development Focus", status: "Completed", desc: "Building scalable web architectures with Next.js, TypeScript, REST APIs, and modern CSS systems." },
  { era: "Current", title: "AI / ML Exploration", status: "In Progress", desc: "Deepening knowledge in machine learning algorithms, Neural Networks, PyTorch, and AI system design." }
];

export function JourneyApp() {
  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <Map className="h-3.5 w-3.5" />
          <span>System Evolution</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white">JOURNEY</h2>
        <p className="mt-1 text-xs text-white/70">
          Education, learning milestones, and technical growth trajectory.
        </p>
      </div>

      <div className="relative border-l-2 border-accent/40 pl-4 space-y-4">
        {milestones.map((m) => (
          <div key={m.title} className="relative group">
            <span className="absolute -left-[1.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-slate-950" />
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 transition-colors group-hover:border-white/20">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[0.62rem] font-semibold text-accent uppercase tracking-wider">{m.era}</span>
                <span className="font-mono text-[0.6rem] text-white/50">{m.status}</span>
              </div>
              <h3 className="mt-1 text-xs font-semibold text-white/95">{m.title}</h3>
              <p className="mt-1 text-xs text-white/70 leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Link
          href="/journey"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2.5 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
        >
          <span>View Full Journey Route</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
