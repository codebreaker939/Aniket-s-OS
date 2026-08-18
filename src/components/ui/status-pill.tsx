import { cn } from "@/lib/utils";

type StatusPillProps = {
  children: React.ReactNode;
  tone?: "accent" | "muted";
  className?: string;
};

export function StatusPill({ children, tone = "muted", className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-normal",
        tone === "accent"
          ? "border-accent/[0.35] bg-accent/10 text-accent"
          : "border-border bg-surface text-muted-foreground",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "accent" ? "bg-accent" : "bg-muted-foreground"
        )}
      />
      {children}
    </span>
  );
}
