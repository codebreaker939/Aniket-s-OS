import { systemStatus } from "@/lib/constants";

export function StatusPanel() {
  return (
    <aside aria-label="System status" className="border border-border bg-surface/[0.82] p-4 shadow-thin-inset">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-normal text-foreground">
          System Status
        </h2>
        <span className="font-mono text-[0.68rem] uppercase tracking-normal text-accent">Online</span>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {systemStatus.map((item) => (
          <div key={item.label} className="border-t border-border/70 pt-3">
            <dt className="font-mono text-[0.68rem] uppercase tracking-normal text-muted-foreground">
              {item.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
