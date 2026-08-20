import { Server, Cpu, Gauge, CheckCircle2, Terminal as TerminalIcon } from "lucide-react";

import { AppHeader, Metric, Panel, StatusBadge } from "@/components/ui/os-primitives";

export function TerminalApp() {
  const rows = [
    ["status --focus", "AI/ML exploration active"],
    ["stack --primary", "Next.js 15, TypeScript, Tailwind CSS, Python"],
    ["workspace --mode", "Aniket OS"],
    ["opportunities --looking-for", "Internships / Software Engineering"]
  ];

  return (
    <div className="flex h-full flex-col gap-4 text-white">
      <AppHeader
        icon={TerminalIcon}
        eyebrow="SYSTEM UTILITY"
        title="Terminal Console"
        description="A compact readout for focus, stack, environment, and availability."
        variant="technical"
        status={<StatusBadge tone="ready" pulse>Shell Ready</StatusBadge>}
      />

      <Panel
        variant="technical"
        className="bg-black/[0.38] p-3.5 font-mono text-xs leading-6 text-white/80 shadow-inner"
      >
        {rows.map(([command, output]) => (
          <div key={command} className="mb-2 last:mb-0">
            <div>
              <span className="font-bold text-accent-mint">aniket@os</span>
              <span className="text-white/40"> $ </span>
              <span className="text-white/90">{command}</span>
            </div>
            <div className="pl-4 text-accent-mint/80 text-[0.72rem]">{output}</div>
          </div>
        ))}
      </Panel>

      <div className="grid gap-2 sm:grid-cols-2">
        {[
          { label: "Runtime", value: "Next 15", icon: Server },
          { label: "Language", value: "TypeScript", icon: Cpu },
          { label: "Interface", value: "Aniket OS", icon: Gauge },
          { label: "Signal", value: "Verified data only", icon: CheckCircle2 }
        ].map((item) => (
          <Metric
            key={item.label}
            label={
              <span className="inline-flex items-center gap-1.5">
                <item.icon aria-hidden="true" className="h-3.5 w-3.5" />
                {item.label}
              </span>
            }
            value={item.value}
            tone="neutral"
          />
        ))}
      </div>
    </div>
  );
}
