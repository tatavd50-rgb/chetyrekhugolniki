import { GraduationCap } from "lucide-react";
import { sections } from "@/lib/data";
import { SectionCard } from "@/components/section-card";
import { SectionStub } from "@/components/section-stub";
import { TheorySection } from "@/components/theory-section";
import { CheatSheetSection } from "@/components/cheatsheet-section";
import { ExamplesSection } from "@/components/examples-section";
import { QuizSection } from "@/components/quiz-section";

const heroFigures = [
  { key: "square", points: "4,4 28,4 28,28 4,28" },
  { key: "rectangle", points: "2,9 30,9 30,23 2,23" },
  { key: "rhombus", points: "16,2 30,16 16,30 2,16" },
  { key: "parallelogram", points: "6,9 30,9 22,23 0,23" },
  { key: "trapezoid", points: "9,9 23,9 28,23 4,23" },
] as const;

export default function HomePage() {
  return (
    <div className="notebook-grid min-h-[calc(100vh-3.5rem)]">
      <main className="container mx-auto px-4">
        <section className="mx-auto max-w-3xl pb-12 pt-14 text-center sm:pt-20">
          <div className="inline-flex animate-in fade-in slide-in-from-bottom-4 items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary duration-500">
            <GraduationCap className="h-3.5 w-3.5" />
            Геометрия · 8 класс
          </div>

          <h1 className="font-hand mt-6 text-6xl leading-none tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-500 sm:text-7xl">
            Четырёхугольники
          </h1>
          <p className="font-hand -mt-1 rotate-[-1.5deg] text-xl text-primary sm:text-2xl">
            моя тетрадь по геометрии
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Разбираемся в{" "}
            <span className="marker marker-yellow font-medium text-foreground">
              параллелограммах
            </span>
            ,{" "}
            <span className="marker marker-pink font-medium text-foreground">
              прямоугольниках
            </span>
            ,{" "}
            <span className="marker marker-blue font-medium text-foreground">
              ромбах
            </span>
            ,{" "}
            <span className="marker marker-green font-medium text-foreground">
              квадратах
            </span>{" "}
            и{" "}
            <span className="marker marker-yellow font-medium text-foreground">
              трапециях
            </span>{" "}
            — от определений до задач.
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Привет! Здесь ты найдёшь теорию с интерактивными моделями фигур,
            шпаргалку с формулами, примеры задач и тест для самопроверки.
            Выбирай раздел — и вперёд!
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            {heroFigures.map((figure) => (
              <div
                key={figure.key}
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-primary/70 ring-1 ring-primary/10 sm:h-12 sm:w-12"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <polygon points={figure.points} />
                </svg>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <h2 className="font-hand text-center text-3xl text-foreground sm:text-4xl">
            Разделы курса
          </h2>
          <p className="font-hand mt-1 text-center text-lg text-muted-foreground">
            начни с того, что интереснее
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        </section>

        <section className="space-y-10 pb-24">
          <TheorySection />
          <CheatSheetSection />
          <ExamplesSection />
          <QuizSection />
          {sections
            .filter(
              (section) =>
                section.id !== "theory" &&
                section.id !== "formulas" &&
                section.id !== "examples" &&
                section.id !== "test"
            )
            .map((section) => (
              <SectionStub key={section.id} section={section} />
            ))}
        </section>
      </main>
    </div>
  );
}
