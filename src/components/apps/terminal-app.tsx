import { Server, Cpu, Gauge, CheckCircle2, Terminal as TerminalIcon } from "lucide-react";

export function TerminalApp() {
  const rows = [
    ["status --focus", "AI/ML exploration active"],
    ["stack --primary", "Next.js 15, TypeScript, Tailwind CSS, Python"],
    ["workspace --mode", "Aniket OS Workstation Environment"],
    ["opportunities --looking-for", "Internships / Software Engineering"]
  ];

  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <TerminalIcon className="h-3.5 w-3.5" />
          <span>Workstation Console</span>
        </div>
        <h2 className="mt-1 text-lg font-bold tracking-tight text-white">TERMINAL</h2>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/50 p-3.5 font-mono text-xs leading-6 text-white/80 shadow-inner">
        {rows.map(([command, output]) => (
          <div key={command} className="mb-2 last:mb-0">
            <div>
              <span className="text-accent font-bold">aniket@os</span>
              <span className="text-white/40"> $ </span>
              <span className="text-white/90">{command}</span>
            </div>
            <div className="pl-4 text-accent/80 text-[0.72rem]">{output}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {[
          { label: "Runtime", value: "Next 15", icon: Server },
          { label: "Language", value: "TypeScript", icon: Cpu },
          { label: "Interface", value: "Aniket OS", icon: Gauge },
          { label: "Signal", value: "Verified data only", icon: CheckCircle2 }
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
            <div className="flex items-center gap-2 text-white/50">
              <item.icon aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
              <span className="font-mono text-[0.6rem] uppercase tracking-wider">{item.label}</span>
            </div>
            <div className="mt-1 text-xs font-semibold text-white/90">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
