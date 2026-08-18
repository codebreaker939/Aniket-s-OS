import type { ExperimentArchitecture } from "@/lib/experiments-data";
import { ArrowRight, Server, Database, Activity, Shield, Cpu } from "lucide-react";

export function ArchitectureDiagram({ architecture }: { architecture: ExperimentArchitecture }) {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "client":
        return <Cpu className="h-3.5 w-3.5 text-accent" />;
      case "gateway":
        return <Shield className="h-3.5 w-3.5 text-amber-400" />;
      case "service":
        return <Server className="h-3.5 w-3.5 text-teal-400" />;
      case "db":
        return <Database className="h-3.5 w-3.5 text-violet-400" />;
      case "monitor":
        return <Activity className="h-3.5 w-3.5 text-emerald-400" />;
      default:
        return <Server className="h-3.5 w-3.5 text-accent" />;
    }
  };

  return (
    <div className="rounded-xl border border-white/12 bg-black/40 p-4 space-y-4 font-mono select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[0.62rem] uppercase tracking-wider text-white/50">
        <span>System Architecture Visual</span>
        <span className="text-accent">{architecture.nodes.length} Nodes Configured</span>
      </div>

      {/* Visual Flow Nodes */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
        {architecture.nodes.map((node, index) => (
          <div key={node.label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] p-3 text-center transition-all hover:border-accent/40 hover:bg-white/10 min-w-[7.5rem] sm:min-w-[9rem]">
              <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-slate-950/60">
                {getNodeIcon(node.type)}
              </div>
              <span className="text-xs font-bold tracking-tight text-white">{node.label}</span>
              {node.subtext && (
                <span className="mt-0.5 text-[0.6rem] text-white/55 font-normal tracking-tight max-w-[8rem] truncate">
                  {node.subtext}
                </span>
              )}
            </div>

            {index < architecture.nodes.length - 1 && (
              <div className="flex items-center justify-center text-accent/60">
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Flow Summary Line */}
      <div className="rounded border border-white/8 bg-white/[0.03] px-3 py-2 text-[0.65rem] text-white/70 flex items-center gap-2">
        <span className="text-accent font-semibold uppercase tracking-wider shrink-0">Pipeline:</span>
        <span className="truncate">{architecture.flow}</span>
      </div>
    </div>
  );
}
