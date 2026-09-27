import {
  BadgeCheck,
  Lightbulb,
  ListChecks,
  NotebookPen,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShapeFormula, ShapeTheory } from "@/lib/theory";
import { figures } from "@/lib/figures";
import { FormulaText } from "./formula-text";
import { InteractiveFigure } from "./interactive-figure";
import { DiagonalDiagram } from "./diagonal-diagram";

const accentDots: Record<string, string> = {
  "marker-yellow": "bg-amber-400",
  "marker-pink": "bg-pink-400",
  "marker-blue": "bg-sky-400",
  "marker-green": "bg-emerald-400",
};

function BlockHeading({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <h4 className="flex items-center gap-2 text-base font-semibold text-foreground">
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      {children}
    </h4>
  );
}

function ItemList({
  title,
  icon,
  items,
  accent,
}: {
  title: string;
  icon: LucideIcon;
  items: string[];
  accent: string;
}) {
  return (
    <div>
      <BlockHeading icon={icon}>{title}</BlockHeading>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
          >
            <span
              aria-hidden
              className={cn(
                "mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full",
                accentDots[accent]
              )}
            />
            <span>
              <FormulaText text={item} accent={accent} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FactsBlock({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div className="rounded-xl border border-amber-200/70 bg-amber-50/70 p-4 sm:p-5">
      <BlockHeading icon={Lightbulb}>
        <span className="text-amber-700">Важные факты</span>
      </BlockHeading>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
          >
            <span aria-hidden className="mt-[0.35em] shrink-0 text-amber-500">
              ★
            </span>
            <span>
              <FormulaText text={item} accent={accent} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FormulaNotes({ formulas }: { formulas: ShapeFormula[] }) {
  return (
    <div className="rounded-xl border border-primary/15 bg-primary/[0.05] p-4 sm:p-5">
      <BlockHeading icon={NotebookPen}>Запиши в тетрадь</BlockHeading>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {formulas.map((formula) => (
          <div
            key={formula.name}
            className="notebook-margin rounded-r-lg border-y border-r border-border/60 bg-white/85 px-4 py-3 shadow-sm"
          >
            <p className="text-xs font-medium text-muted-foreground">
              {formula.name}
            </p>
            <p className="font-hand mt-1 text-2xl leading-snug text-foreground">
              <FormulaText text={formula.formula} />
            </p>
            {formula.note ? (
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {formula.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShapeTheoryCard({ shape }: { shape: ShapeTheory }) {
  const figure = figures.find((item) => item.id === shape.id);
  return (
    <article
      id={shape.id}
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
            <polygon points={shape.points} />
          </svg>
        </div>
        <div>
          <h3 className="font-hand text-3xl leading-none text-foreground">
            {shape.title}
          </h3>
          <p className="font-hand mt-1.5 text-base text-muted-foreground">
            {shape.tagline}
          </p>
        </div>
      </header>

      {figure ? (
        <div className="mt-6">
          <InteractiveFigure figure={figure} />
        </div>
      ) : null}

      <div className="mt-6 space-y-6">
        <div>
          <BlockHeading icon={Quote}>Определение</BlockHeading>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
            <FormulaText text={shape.definition} accent={shape.accent} />
          </p>
        </div>

        <ItemList
          title="Свойства"
          icon={ListChecks}
          items={shape.properties}
          accent={shape.accent}
        />
        {figure ? (
          <DiagonalDiagram
            shape={shape}
            color={figure.color}
            soft={figure.soft}
          />
        ) : null}
        <ItemList
          title="Признаки"
          icon={BadgeCheck}
          items={shape.signs}
          accent={shape.accent}
        />
        <FactsBlock items={shape.facts} accent={shape.accent} />
        <FormulaNotes formulas={shape.formulas} />
      </div>
    </article>
  );
}
