import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Section } from "@/lib/data";

export function SectionCard({ section }: { section: Section }) {
  const Icon = section.icon;
  return (
    <Link
      href={`#${section.id}`}
      className={cn(
        "card-hover group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-white/85 p-6 shadow-sm backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "sm:odd:rotate-[0.5deg] sm:even:-rotate-[0.5deg]"
      )}
    >
      <div
        aria-hidden
        className="absolute -top-2.5 left-1/2 h-5 w-24 -translate-x-1/2 rotate-[-2deg] rounded-sm bg-amber-300/50 ring-1 ring-amber-400/30"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-primary/10">
          <Icon className="h-6 w-6" />
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="font-hand text-2xl leading-tight text-foreground">
          {section.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {section.description}
        </p>
      </div>
    </Link>
  );
}
