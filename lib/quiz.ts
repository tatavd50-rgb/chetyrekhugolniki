export type QuizCategory = "definitions" | "properties" | "formulas";

export type QuizQuestion = {
  id: string;
  category: QuizCategory;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const quizCategoryLabels: Record<QuizCategory, string> = {
  definitions: "Определение",
  properties: "Свойство",
  formulas: "Формула",
};

export const quizCategoryPluralLabels: Record<QuizCategory, string> = {
  definitions: "Определения",
  properties: "Свойства",
  formulas: "Формулы",
};

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function buildQuizRound(): QuizQuestion[] {
  return shuffle(quizQuestions).map((question) => {
    const optionOrder = shuffle(question.options.map((_, index) => index));
    return {
      ...question,
      options: optionOrder.map((index) => question.options[index]),
      correctIndex: optionOrder.indexOf(question.correctIndex),
    };
  });
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "definition-parallelogram",
    category: "definitions",
    question: "Какой четырёхугольник называется параллелограммом?",
    options: [
      "Четырёхугольник, у которого противоположные стороны попарно параллельны",
      "Четырёхугольник, у которого все стороны равны",
      "Четырёхугольник, у которого все углы прямые",
      "Четырёхугольник, у которого две стороны параллельны, а две другие — нет",
    ],
    correctIndex: 0,
    explanation:
      "*Параллелограмм — это четырёхугольник, у которого противоположные стороны попарно параллельны*. Равные стороны — это про ромб, а прямые углы — про прямоугольник.",
  },
  {
    id: "definition-rhombus",
    category: "definitions",
    question: "Какая фигура называется ромбом?",
    options: [
      "Четырёхугольник, у которого диагонали равны",
      "Параллелограмм, у которого все стороны равны",
      "Прямоугольник, у которого диагонали перпендикулярны",
      "Четырёхугольник, у которого две стороны параллельны",
    ],
    correctIndex: 1,
    explanation:
      "*Ромб — это параллелограмм, у которого все стороны равны*. То, что диагонали ромба перпендикулярны и делят его углы пополам, — уже свойство, а не определение.",
  },
  {
    id: "definition-trapezoid-bases",
    category: "definitions",
    question: "Какие стороны трапеции называются основаниями?",
    options: [
      "Параллельные стороны трапеции",
      "Непараллельные стороны трапеции",
      "Диагонали трапеции",
      "Стороны, прилежащие к большему основанию",
    ],
    correctIndex: 0,
    explanation:
      "У трапеции *две стороны параллельны* — они называются основаниями. Две другие, непараллельные стороны, называются боковыми.",
  },
  {
    id: "definition-square",
    category: "definitions",
    question: "Какой четырёхугольник называется квадратом?",
    options: [
      "Ромб, у которого диагонали делятся пополам",
      "Параллелограмм, у которого диагонали перпендикулярны",
      "Прямоугольник, у которого все стороны равны",
      "Четырёхугольник, у которого две стороны параллельны",
    ],
    correctIndex: 2,
    explanation:
      "*Квадрат — это прямоугольник, у которого все стороны равны*. Можно сказать иначе: квадрат — это ромб, у которого все углы прямые.",
  },
  {
    id: "property-rectangle-diagonals",
    category: "properties",
    question: "Каким свойством обладают диагонали прямоугольника?",
    options: [
      "Диагонали прямоугольника перпендикулярны",
      "Диагонали прямоугольника равны",
      "Диагонали прямоугольника делят его углы пополам",
      "Диагонали прямоугольника параллельны",
    ],
    correctIndex: 1,
    explanation:
      "По свойству прямоугольника его *диагонали равны* и точкой пересечения делятся пополам. Перпендикулярны диагонали только у ромба и квадрата.",
  },
  {
    id: "property-rhombus-diagonals",
    category: "properties",
    question: "Каким свойством обладают диагонали ромба?",
    options: [
      "Они всегда равны",
      "Они параллельны сторонам ромба",
      "Они перпендикулярны и делят его углы пополам",
      "Они делятся точкой пересечения в отношении 2 : 1",
    ],
    correctIndex: 2,
    explanation:
      "У ромба *диагонали перпендикулярны* — пересекаются под прямым углом — и *являются биссектрисами его углов*. Равными диагонали бывают у прямоугольника и квадрата.",
  },
  {
    id: "property-parallelogram-angles",
    category: "properties",
    question:
      "Чему равна сумма углов параллелограмма, прилежащих к одной стороне?",
    options: ["90°", "180°", "270°", "360°"],
    correctIndex: 1,
    explanation:
      "Углы, прилежащие к одной стороне параллелограмма, — это *односторонние углы при параллельных прямых*, поэтому их сумма равна *180°*.",
  },
  {
    id: "property-trapezoid-midline",
    category: "properties",
    question: "Чему равна средняя линия трапеции?",
    options: [
      "Разности оснований",
      "Произведению оснований",
      "Высоте трапеции",
      "Полусумме оснований",
    ],
    correctIndex: 3,
    explanation:
      "Средняя линия трапеции параллельна основаниям и равна *их полусумме: m = \\frac{a + b}{2}*. Поэтому площадь трапеции можно найти как m · h.",
  },
  {
    id: "formula-rhombus-area",
    category: "formulas",
    question: "По какой формуле вычисляется площадь ромба?",
    options: [
      "S = a · b",
      "S = \\frac{d₁ · d₂}{2}",
      "S = \\frac{a + b}{2} · h",
      "S = 4 · a",
    ],
    correctIndex: 1,
    explanation:
      "Площадь ромба равна *половине произведения его диагоналей: S = \\frac{d₁ · d₂}{2}*. Ещё её можно найти как произведение стороны на высоту: S = a · h.",
  },
  {
    id: "formula-trapezoid-area",
    category: "formulas",
    question: "По какой формуле вычисляется площадь трапеции?",
    options: [
      "S = a · h",
      "S = a · b",
      "S = \\frac{a + b}{2} · h",
      "S = \\frac{d₁ · d₂}{2}",
    ],
    correctIndex: 2,
    explanation:
      "Площадь трапеции равна *полусумме оснований, умноженной на высоту: S = \\frac{a + b}{2} · h*. Здесь \\frac{a + b}{2} — длина средней линии.",
  },
  {
    id: "formula-square-perimeter",
    category: "formulas",
    question: "По какой формуле вычисляется периметр квадрата со стороной a?",
    options: ["P = 2 · (a + b)", "P = a²", "P = a + b", "P = 4 · a"],
    correctIndex: 3,
    explanation:
      "У квадрата *все четыре стороны равны*, поэтому его периметр равен *P = 4 · a*, где a — сторона квадрата.",
  },
  {
    id: "formula-rectangle-area",
    category: "formulas",
    question: "По какой формуле вычисляется площадь прямоугольника?",
    options: ["S = a²", "S = a · b", "S = \\frac{d₁ · d₂}{2}", "S = 4 · a"],
    correctIndex: 1,
    explanation:
      "Площадь прямоугольника равна *произведению двух соседних сторон: S = a · b*, где a — длина, а b — ширина прямоугольника.",
  },
];
