"use client";

import { useState } from "react";
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Lightbulb,
  RotateCcw,
  X,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildQuizRound,
  quizCategoryLabels,
  quizCategoryPluralLabels,
  quizQuestions,
  type QuizCategory,
  type QuizQuestion,
} from "@/lib/quiz";
import { Button } from "@/components/ui/button";
import { FormulaText } from "./formula-text";

const optionLetters = ["А", "Б", "В", "Г"];

const categoryOrder: QuizCategory[] = ["definitions", "properties", "formulas"];

const categoryBadge: Record<QuizCategory, string> = {
  definitions: "border-amber-300/70 bg-amber-50 text-amber-800",
  properties: "border-pink-300/70 bg-pink-50 text-pink-800",
  formulas: "border-sky-300/70 bg-sky-50 text-sky-800",
};

const categoryText: Record<QuizCategory, string> = {
  definitions: "text-amber-700",
  properties: "text-pink-700",
  formulas: "text-sky-700",
};

const markerAccent: Record<QuizCategory, string> = {
  definitions: "marker-yellow",
  properties: "marker-pink",
  formulas: "marker-blue",
};

function resultMessage(percent: number): string {
  if (percent === 100) {
    return "Блестяще! Все ответы верны — ты отлично знаешь тему четырёхугольников.";
  }
  if (percent >= 80) {
    return "Молодец! Теория почти без пробелов. Ошибки были в паре вопросов — загляни в разделы выше, чтобы закрепить.";
  }
  if (percent >= 60) {
    return "Неплохо, но есть над чем поработать. Повтори определения, свойства и формулы — и попробуй снова.";
  }
  return "Стоит повторить теорию. Вернись к разделам «Теория» и «Шпаргалка», а потом пройди тест ещё раз.";
}

export function QuizSection() {
  const total = quizQuestions.length;
  const [round, setRound] = useState<QuizQuestion[]>(quizQuestions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>(() =>
    Array(total).fill(null)
  );
  const [finished, setFinished] = useState(false);

  const question = round[current];
  const answer = selected[current];
  const answeredCount = selected.filter((value) => value !== null).length;

  const correctCount = selected.reduce<number>(
    (acc, value, index) => acc + (value === round[index].correctIndex ? 1 : 0),
    0
  );
  const percent = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  const handleSelect = (optionIndex: number) => {
    if (answer !== null) return;
    setSelected((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setRound(buildQuizRound());
    setCurrent(0);
    setSelected(Array(total).fill(null));
    setFinished(false);
  };

  return (
    <section id="test" className="scroll-mt-24">
      <div className="notebook-margin flex flex-col gap-8 rounded-r-2xl border-y border-r border-border/70 bg-white/75 px-6 py-8 backdrop-blur-sm sm:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-primary/10">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-hand text-3xl leading-tight text-foreground">
                Тест для самопроверки
              </h2>
              <p className="font-hand text-lg text-muted-foreground">
                проверь себя после изучения темы
              </p>
            </div>
          </div>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            {total} вопросов по определениям, свойствам и формулам. Выбери
            вариант ответа — сразу увидишь, верно ли решено, и почему. В конце
            тебя ждёт итоговый результат.
          </p>
        </div>

        {finished ? (
          <div className="animate-in fade-in rounded-2xl border border-border/70 bg-white/85 p-6 text-center shadow-sm backdrop-blur-sm duration-500 sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
              <Award className="h-10 w-10" />
            </div>
            <h3 className="font-hand mt-5 text-5xl leading-none text-foreground">
              {correctCount} из {total}
            </h3>
            <p className="font-hand mt-2 text-2xl text-muted-foreground">
              {percent}% правильных ответов
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {resultMessage(percent)}
            </p>

            <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              {categoryOrder.map((category) => {
                let categoryTotal = 0;
                let categoryCorrect = 0;
                round.forEach((item, index) => {
                  if (item.category === category) {
                    categoryTotal += 1;
                    if (selected[index] === item.correctIndex) {
                      categoryCorrect += 1;
                    }
                  }
                });
                return (
                  <div
                    key={category}
                    className="rounded-xl border border-border/70 bg-white/80 px-3 py-4"
                  >
                    <p
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wide",
                        categoryText[category]
                      )}
                    >
                      {quizCategoryPluralLabels[category]}
                    </p>
                    <p className="mt-1 font-hand text-3xl leading-none text-foreground">
                      {categoryCorrect}
                      <span className="text-lg text-muted-foreground">
                        {" "}
                        / {categoryTotal}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex justify-center">
              <Button variant="outline" onClick={handleRestart}>
                <RotateCcw />
                Пройти ещё раз
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/70 bg-white/85 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                  categoryBadge[question.category]
                )}
              >
                {quizCategoryLabels[question.category]}
              </span>
              <span className="text-sm text-muted-foreground">
                Вопрос {current + 1} из {total}
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={answeredCount}
              className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(answeredCount / total) * 100}%` }}
              />
            </div>

            <h3 className="mt-6 text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
              {question.question}
            </h3>

            <div
              role="group"
              aria-label="Варианты ответа"
              className="mt-5 space-y-3"
            >
              {question.options.map((option, index) => {
                const isCorrect = index === question.correctIndex;
                const isSelected = answer === index;
                const showFeedback = answer !== null;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(index)}
                    disabled={showFeedback}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm leading-relaxed transition-all",
                      !showFeedback &&
                        "border-border/70 bg-white/90 hover:border-primary/40 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      showFeedback &&
                        isCorrect &&
                        "border-emerald-500/60 bg-emerald-50 text-emerald-900",
                      showFeedback &&
                        isSelected &&
                        !isCorrect &&
                        "border-red-400/60 bg-red-50 text-red-900",
                      showFeedback &&
                        !isCorrect &&
                        !isSelected &&
                        "border-border/50 bg-white/50 text-muted-foreground opacity-60"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                        !showFeedback &&
                          "border-border/70 bg-secondary/60 text-foreground",
                        showFeedback &&
                          isCorrect &&
                          "border-emerald-500 bg-emerald-500 text-white",
                        showFeedback &&
                          isSelected &&
                          !isCorrect &&
                          "border-red-400 bg-red-400 text-white",
                        showFeedback &&
                          !isCorrect &&
                          !isSelected &&
                          "border-border/50 bg-white text-muted-foreground"
                      )}
                    >
                      {showFeedback && isCorrect ? (
                        <Check className="h-4 w-4" />
                      ) : showFeedback && isSelected && !isCorrect ? (
                        <X className="h-4 w-4" />
                      ) : (
                        optionLetters[index]
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <FormulaText text={option} />
                    </span>
                  </button>
                );
              })}
            </div>

            {answer !== null ? (
              <div
                className={cn(
                  "animate-in fade-in slide-in-from-bottom-2 mt-6 rounded-xl border p-4 duration-300 sm:p-5",
                  answer === question.correctIndex
                    ? "border-emerald-200/70 bg-emerald-50/70"
                    : "border-red-200/70 bg-red-50/70"
                )}
              >
                <div className="flex items-center gap-2">
                  {answer === question.correctIndex ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      answer === question.correctIndex
                        ? "text-emerald-700"
                        : "text-red-700"
                    )}
                  >
                    {answer === question.correctIndex
                      ? "Верно!"
                      : "Не совсем так."}
                  </p>
                </div>

                {answer !== question.correctIndex ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Правильный ответ:{" "}
                    <span className="font-medium text-foreground">
                      «
                      <FormulaText
                        text={question.options[question.correctIndex]}
                      />
                      ».
                    </span>
                  </p>
                ) : null}

                <div className="mt-3 flex gap-2.5">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <FormulaText
                      text={question.explanation}
                      accent={markerAccent[question.category]}
                    />
                  </p>
                </div>

                <div className="mt-5 flex justify-end">
                  <Button onClick={handleNext}>
                    {current < total - 1 ? (
                      <>
                        Дальше
                        <ArrowRight />
                      </>
                    ) : (
                      <>
                        Показать результат
                        <Award />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
