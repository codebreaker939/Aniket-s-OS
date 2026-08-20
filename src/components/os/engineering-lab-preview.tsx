import { labPreviewEntries } from "@/data/desktop";

export function EngineeringLabPreview() {
  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span>Workbench / Systems Lab</span>
        </div>
        <h2 className="mt-1 text-lg font-bold tracking-tight text-white">Engineering Lab</h2>
        <p className="mt-1 text-xs leading-5 text-white/70">
          Technical experiments, architecture notes, implementation details, and results.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {["Objectives", "Architecture", "Implementation", "Results"].map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
            <div className="font-mono text-[0.58rem] uppercase tracking-wider text-white/40">Phase</div>
            <div className="mt-0.5 text-xs font-semibold text-white/90">{item}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/12 bg-slate-950/60 overflow-hidden shadow-inner">
        <div className="border-b border-white/10 bg-white/[0.04] px-3.5 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-widest text-white/50 flex justify-between">
          <span>Experiment Registry</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {labPreviewEntries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between px-3.5 py-2.5 hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.7rem] font-bold text-accent">{entry.id}</span>
                <span className="text-xs font-medium text-white/90">{entry.title}</span>
              </div>
              <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-emerald-400 font-semibold">
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="font-mono text-[0.62rem] text-white/40 text-center tracking-tight">
        Lab records update as projects and notes are refined.
      </p>
    </div>
  );
}
