import Link from "next/link";
import { ExternalLink, Mail, CheckCircle2 } from "lucide-react";


export function ContactApp() {
  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <Mail className="h-3.5 w-3.5" />
          <span>Open Connection</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white">CONTACT</h2>
        <p className="mt-1 text-xs text-white/70">
          Professional inquiry channels for software engineering roles and collaborations.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
          <CheckCircle2 className="h-4 w-4" />
          <span>Status: Open to Engineering Opportunities</span>
        </div>

        <div className="space-y-2 text-xs text-white/80 border-t border-white/8 pt-2.5">
          <div className="flex justify-between items-center">
            <span className="font-mono text-white/45 uppercase text-[0.62rem]">Primary Email</span>
            <span className="font-mono text-accent">Aniket Rai</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-white/45 uppercase text-[0.62rem]">Location</span>
            <span className="text-white/90">India</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-white/45 uppercase text-[0.62rem]">Opportunities</span>
            <span className="text-white/90">Internships / Full-Time SWE</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/contact"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2.5 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
        >
          <span>Open Contact Route Page</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
