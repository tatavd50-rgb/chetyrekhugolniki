import { BookOpen } from "lucide-react";
import { shapes } from "@/lib/theory";
import { ShapeTheoryCard } from "./shape-theory-card";

export function TheorySection() {
  return (
    <section id="theory" className="scroll-mt-24">
      <div className="notebook-margin flex flex-col gap-8 rounded-r-2xl border-y border-r border-border/70 bg-white/75 px-6 py-8 backdrop-blur-sm sm:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-primary/10">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-hand text-3xl leading-tight text-foreground">
                Теория и определения
              </h2>
              <p className="font-hand text-lg text-muted-foreground">
                разбираемся по порядку
              </p>
            </div>
          </div>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            Знакомимся с пятью главными четырёхугольниками. У каждого — своя
            интерактивная модель: берись за любую вершину и перетаскивай её
            мышью, пальцем или стрелками на клавиатуре — рядом будут меняться
            длины сторон и углы. А ниже разберём определение, свойства, признаки
            и важные факты — простым языком и с примерами из жизни.
          </p>
        </div>

        <nav aria-label="Подразделы теории" className="flex flex-wrap gap-2">
          {shapes.map((shape) => (
            <a
              key={shape.id}
              href={`#${shape.id}`}
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
                <polygon points={shape.points} />
              </svg>
              {shape.title}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-8">
          {shapes.map((shape) => (
            <ShapeTheoryCard key={shape.id} shape={shape} />
          ))}
        </div>
      </div>
    </section>
  );
}
