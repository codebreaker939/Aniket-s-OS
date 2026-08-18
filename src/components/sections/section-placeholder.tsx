import Link from "next/link";

import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";

type SectionPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  children?: React.ReactNode;
};

export function SectionPlaceholder({
  eyebrow,
  title,
  description,
  status = "Foundation ready",
  children
}: SectionPlaceholderProps) {
  return (
    <section className="grid min-h-[calc(100svh-5.5rem)] content-center gap-6 py-8">
      <div className="border border-border bg-surface/80 p-5 shadow-shell sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-normal text-accent">{eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              {title}
            </h1>
          </div>
          <StatusPill>{status}</StatusPill>
        </div>

        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>

        {children ? <div className="mt-8">{children}</div> : null}

        <div className="mt-10">
          <Button asChild variant="secondary">
            <Link href="/">Return to Workspace</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
