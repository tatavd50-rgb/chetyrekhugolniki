import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { signs } from "@/lib/formulas";

const accentDots: Record<string, string> = {
  "marker-yellow": "bg-amber-400",
  "marker-pink": "bg-pink-400",
  "marker-blue": "bg-sky-400",
  "marker-green": "bg-emerald-400",
};

export function SignTable() {
  return (
    <div>
      <div className="flex flex-col gap-0.5">
        <h3 className="font-hand text-2xl leading-none text-foreground">
          Признаки — «как узнать фигуру»
        </h3>
        <p className="font-hand text-base text-muted-foreground">
          по одному признаку сразу определяем, что за фигура перед нами
        </p>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border/70 bg-white/85 shadow-sm">
        <ul className="divide-y divide-border/60">
          {signs.map((sign, index) => (
            <li
              key={`${sign.subject}-${sign.condition}`}
              className="flex flex-col gap-2 px-4 py-3 odd:bg-white even:bg-secondary/15 sm:flex-row sm:items-center sm:gap-4"
            >
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <span>
                  Если у {sign.subject}{" "}
                  <span className="font-medium text-foreground">
                    {sign.condition}
                  </span>
                </span>
              </p>
              <div className="flex items-center gap-2 sm:w-72 sm:shrink-0">
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white/80 px-3 py-1 text-sm font-medium text-foreground shadow-sm">
                  <span
                    aria-hidden
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      accentDots[sign.result.accent]
                    )}
                  />
                  <svg
                    aria-hidden
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3.5 w-3.5 shrink-0 text-primary/70"
                  >
                    <polygon points={sign.result.points} />
                  </svg>
                  {sign.result.title}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
