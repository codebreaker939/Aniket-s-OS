import Link from "next/link";
import { ExternalLink, FileText, CheckCircle2 } from "lucide-react";


export function ResumeApp() {
  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <FileText className="h-3.5 w-3.5" />
          <span>System Profile</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white">RESUME & CREDENTIALS</h2>
        <p className="mt-1 text-xs text-white/70">
          Verified academic profile, skill matrix, and professional summary.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="font-semibold text-sm text-white">Aniket Rai</h3>
            <p className="text-xs text-white/60">B.Tech Computer Science & Engineering</p>
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-emerald-400 font-semibold uppercase tracking-wider">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Verified</span>
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-white/80">
          <p><span className="font-mono text-white/45 uppercase text-[0.62rem]">Role:</span> Full-Stack Developer / AI-ML Trajectory</p>
          <p><span className="font-mono text-white/45 uppercase text-[0.62rem]">Focus:</span> Software Systems, Web Architecture, Machine Learning</p>
          <p><span className="font-mono text-white/45 uppercase text-[0.62rem]">Status:</span> Open to Internships & Software Engineering Opportunities</p>
        </div>
      </div>

      <div className="pt-2 flex gap-2">
        <Link
          href="/resume"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2.5 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
        >
          <span>View Resume Page</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
