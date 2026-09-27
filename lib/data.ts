import {
  BookOpen,
  ClipboardCheck,
  PencilLine,
  Sigma,
  type LucideIcon,
} from "lucide-react";

export type Section = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

export const sections: Section[] = [
  {
    id: "theory",
    title: "Теория и определения",
    shortTitle: "Теория",
    description:
      "Определения, свойства и признаки параллелограмма, прямоугольника, ромба, квадрата и трапеции — простым языком.",
    icon: BookOpen,
    accent: "marker-yellow",
  },
  {
    id: "formulas",
    title: "Свойства и формулы",
    shortTitle: "Формулы",
    description:
      "Шпаргалка со сводными таблицами свойств и формулами площадей всех пяти фигур.",
    icon: Sigma,
    accent: "marker-pink",
  },
  {
    id: "examples",
    title: "Примеры и задачи",
    shortTitle: "Задачи",
    description:
      "Типовые задачи с пошаговым решением и пояснением каждого шага — от условия до ответа.",
    icon: PencilLine,
    accent: "marker-green",
  },
  {
    id: "test",
    title: "Тест для самопроверки",
    shortTitle: "Тест",
    description:
      "Вопросы по определениям, свойствам и формулам с мгновенной проверкой и итоговым результатом.",
    icon: ClipboardCheck,
    accent: "marker-blue",
  },
];
