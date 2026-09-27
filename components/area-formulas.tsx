import { NotebookPen, Sigma } from "lucide-react";
import { areaFormulas, notationLegend } from "@/lib/formulas";
import { FormulaText } from "./formula-text";

function ShapeGlyph({ points }: { points: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-7 w-7"
    >
      <polygon points={points} />
    </svg>
  );
}

export function AreaFormulas() {
  return (
    <div>
      <div className="flex flex-col gap-0.5">
        <h3 className="font-hand text-2xl leading-none text-foreground">
          Формулы площадей
        </h3>
        <p className="font-hand text-base text-muted-foreground">
          все пять формул в одном месте — выбирай нужную фигуру
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areaFormulas.map((formula) => (
          <article
            key={formula.id}
            className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-white/85 p-5 shadow-sm"
          >
            <header className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/80 text-primary ring-1 ring-primary/10">
                <ShapeGlyph points={formula.points} />
              </div>
              <div>
                <h4 className="font-hand text-2xl leading-none text-foreground">
                  {formula.title}
                </h4>
                <p className="font-hand mt-1 text-sm text-muted-foreground">
                  {formula.tagline}
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-3">
              {formula.formulas.map((line) => (
                <div
                  key={line.name}
                  className="notebook-margin rounded-r-lg border-y border-r border-border/60 bg-white/90 px-3 py-2.5"
                >
                  <p className="text-xs font-medium text-muted-foreground">
                    {line.name}
                  </p>
                  <p className="font-hand mt-0.5 text-2xl leading-snug text-foreground">
                    <FormulaText text={line.formula} />
                  </p>
                  {line.note ? (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {line.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-auto rounded-xl bg-secondary/25 p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <NotebookPen className="h-3.5 w-3.5 text-primary" />
                Обозначения
              </p>
              <ul className="mt-2 space-y-1">
                {formula.notation.map((item) => (
                  <li
                    key={`${formula.id}-${item.symbol}`}
                    className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <span className="shrink-0 rounded bg-white/80 px-1.5 py-0.5 font-semibold text-primary shadow-sm ring-1 ring-border/50">
                      <FormulaText text={item.symbol} />
                    </span>
                    <span>{item.meaning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div
        id="cheat-notation"
        className="mt-6 scroll-mt-24 rounded-xl border border-primary/15 bg-primary/[0.05] p-4 sm:p-5"
      >
        <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Sigma className="h-4 w-4 text-primary" />
          Общие обозначения для всех формул
        </p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {notationLegend.map((item) => (
            <span
              key={item.symbol}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/80 px-3 py-1.5 text-xs text-muted-foreground shadow-sm"
            >
              <span className="font-semibold text-primary">{item.symbol}</span>
              {item.meaning}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
