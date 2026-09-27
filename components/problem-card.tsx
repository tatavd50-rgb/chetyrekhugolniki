import { CheckCircle2, ScrollText, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Problem } from "@/lib/examples";
import { FormulaText } from "./formula-text";

const accentBadge: Record<string, string> = {
  "marker-yellow": "bg-amber-400/80",
  "marker-pink": "bg-pink-400/80",
  "marker-blue": "bg-sky-400/80",
  "marker-green": "bg-emerald-400/80",
};

function BlockHeading({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <h4 className="flex items-center gap-2 text-base font-semibold text-foreground">
      <span className="shrink-0 text-primary">{icon}</span>
      {children}
    </h4>
  );
}

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <article
      id={problem.id}
      className="scroll-mt-24 rounded-2xl border border-border/70 bg-white/85 p-6 shadow-sm backdrop-blur-sm sm:p-8"
    >
      <header className="flex items-center gap-4">
        <div
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary/80 text-primary ring-1 ring-primary/10 sm:h-16 sm:w-16"
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-7 w-7 sm:h-8 sm:w-8"
          >
            <polygon points={problem.points} />
          </svg>
        </div>
        <div>
          <h3 className="font-hand text-3xl leading-none text-foreground">
            {problem.title}
          </h3>
          <p className="font-hand mt-1.5 text-base text-muted-foreground">
            {problem.tagline}
          </p>
        </div>
      </header>

      <div className="mt-6 space-y-6">
        <div className="rounded-xl border border-primary/15 bg-primary/[0.05] p-4 sm:p-5">
          <BlockHeading icon={<ScrollText className="h-4 w-4" />}>
            Условие задачи
          </BlockHeading>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
            <FormulaText text={problem.condition} accent={problem.accent} />
          </p>
        </div>

        <div>
          <BlockHeading icon={<Shuffle className="h-4 w-4" />}>
            Пошаговое решение
          </BlockHeading>
          <ol className="mt-4 space-y-4">
            {problem.steps.map((step, index) => (
              <li key={index} className="flex gap-3.5">
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm",
                    accentBadge[problem.accent]
                  )}
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    <FormulaText
                      text={step.explanation}
                      accent={problem.accent}
                    />
                  </p>
                  {step.formula ? (
                    <div className="notebook-margin mt-2 inline-block rounded-r-lg border-y border-r border-border/60 bg-white/90 px-3 py-1.5">
                      <p className="font-hand text-2xl leading-snug text-foreground">
                        <FormulaText text={step.formula} />
                      </p>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/70 p-4 sm:p-5">
          <BlockHeading icon={<CheckCircle2 className="h-4 w-4" />}>
            <span className="text-emerald-700">Ответ</span>
          </BlockHeading>
          <p className="font-hand mt-2 text-2xl leading-snug text-foreground">
            <FormulaText text={problem.answer} accent={problem.accent} />
          </p>
        </div>
      </div>
    </article>
  );
}
