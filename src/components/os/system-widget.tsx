import { systemStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SystemWidgetProps = {
  className?: string;
  onOpenApp?: (id: "engineering-lab" | "terminal") => void;
};

export function SystemWidget({ className, onOpenApp }: SystemWidgetProps) {
  return (
    <div className={cn("flex flex-col gap-3 w-64 select-none", className)}>
      {/* Current System Widget */}
      <aside
        aria-label="Current system status"
        className="rounded-xl border border-white/10 bg-slate-950/25 p-3.5 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:border-white/20 hover:bg-slate-950/35"
      >
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <h2 className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent/90">
            Current System
          </h2>
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(154,209,196,0.8)]" />
        </div>
        <dl className="space-y-1.5 text-xs">
          {systemStatus.map((item) => (
            <div key={item.label} className="flex items-center justify-between border-b border-white/[0.06] pb-1 last:border-b-0 last:pb-0">
              <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-white/45">{item.label}</dt>
              <dd className="font-mono text-[0.7rem] font-medium text-white/85">{item.value}</dd>
            </div>
          ))}
        </dl>
      </aside>

      {/* Engineering Lab Widget */}
      <aside
        aria-label="Engineering lab overview"
        className="rounded-xl border border-white/10 bg-slate-950/25 p-3.5 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:border-white/20 hover:bg-slate-950/35 cursor-pointer"
        onClick={() => onOpenApp?.("engineering-lab")}
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/60">
              Engineering Lab
            </h2>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold text-white">04</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-wider text-accent/80">Active Experiments</span>
            </div>
          </div>
          <span className="rounded bg-accent/15 px-2 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-accent border border-accent/30">
            Preview
          </span>
        </div>
      </aside>
    </div>
  );
}

