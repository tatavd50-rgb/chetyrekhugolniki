import { PencilLine } from "lucide-react";
import { problems } from "@/lib/examples";
import { ProblemCard } from "./problem-card";

export function ExamplesSection() {
  return (
    <section id="examples" className="scroll-mt-24">
      <div className="notebook-margin flex flex-col gap-8 rounded-r-2xl border-y border-r border-border/70 bg-white/75 px-6 py-8 backdrop-blur-sm sm:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-primary/10">
              <PencilLine className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-hand text-3xl leading-tight text-foreground">
                Примеры и разбор задач
              </h2>
              <p className="font-hand text-lg text-muted-foreground">
                решаем вместе, шаг за шагом
              </p>
            </div>
          </div>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            Пять типовых задач по теме — от углов параллелограмма до площади
            трапеции. В каждой задаче есть краткое условие, решение с пояснением
            каждого шага и итоговый ответ. Сначала попробуй решить сам, а потом
            сверься с разбором.
          </p>
        </div>

        <nav aria-label="Навигация по задачам" className="flex flex-wrap gap-2">
          {problems.map((problem) => (
            <a
              key={problem.id}
              href={`#${problem.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white/80 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-secondary hover:text-primary"
            >
              <svg
                aria-hidden
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-3.5 w-3.5"
              >
                <polygon points={problem.points} />
              </svg>
              {problem.title}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-8">
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </div>
    </section>
  );
}
