export type CellValue = "yes" | "no" | number;

export type PropertyColumn = {
  id: string;
  label: string;
};

export type ShapePropertyRow = {
  id: string;
  title: string;
  points: string;
  cells: CellValue[];
};

export type PropertyGroup = {
  id: string;
  title: string;
  tagline: string;
  columns: PropertyColumn[];
  rows: ShapePropertyRow[];
  notes: string[];
};

export const propertyGroups: PropertyGroup[] = [
  {
    id: "sides-angles",
    title: "Стороны и углы",
    tagline: "что можно сказать про стороны и углы каждой фигуры",
    columns: [
      { id: "opp-parallel", label: "Противоположные стороны параллельны" },
      { id: "opp-equal", label: "Противоположные стороны равны" },
      { id: "all-equal", label: "Все стороны равны" },
      { id: "opp-angles", label: "Противоположные углы равны" },
      { id: "right-angles", label: "Все углы прямые" },
    ],
    rows: [
      {
        id: "parallelogram",
        title: "Параллелограмм",
        points: "6,9 30,9 22,23 0,23",
        cells: ["yes", "yes", "no", "yes", "no"],
      },
      {
        id: "rectangle",
        title: "Прямоугольник",
        points: "2,9 30,9 30,23 2,23",
        cells: ["yes", "yes", "no", "yes", "yes"],
      },
      {
        id: "rhombus",
        title: "Ромб",
        points: "16,2 30,16 16,30 2,16",
        cells: ["yes", "yes", "yes", "yes", "no"],
      },
      {
        id: "square",
        title: "Квадрат",
        points: "4,4 28,4 28,28 4,28",
        cells: ["yes", "yes", "yes", "yes", "yes"],
      },
      {
        id: "trapezoid",
        title: "Трапеция",
        points: "9,9 23,9 28,23 4,23",
        cells: [1, "no", "no", "no", 2],
      },
    ],
    notes: [
      "У трапеции параллельны только основания — одна пара сторон.",
      "У прямоугольной трапеции прямые только два угла.",
    ],
  },
  {
    id: "diagonals",
    title: "Диагонали",
    tagline: "чем диагонали одной фигуры отличаются от других",
    columns: [
      { id: "bisect", label: "Делятся точкой пересечения пополам" },
      { id: "equal", label: "Равны" },
      { id: "perpendicular", label: "Перпендикулярны" },
      { id: "bisector", label: "Делят углы пополам" },
    ],
    rows: [
      {
        id: "parallelogram",
        title: "Параллелограмм",
        points: "6,9 30,9 22,23 0,23",
        cells: ["yes", "no", "no", "no"],
      },
      {
        id: "rectangle",
        title: "Прямоугольник",
        points: "2,9 30,9 30,23 2,23",
        cells: ["yes", "yes", "no", "no"],
      },
      {
        id: "rhombus",
        title: "Ромб",
        points: "16,2 30,16 16,30 2,16",
        cells: ["yes", "no", "yes", "yes"],
      },
      {
        id: "square",
        title: "Квадрат",
        points: "4,4 28,4 28,28 4,28",
        cells: ["yes", "yes", "yes", "yes"],
      },
      {
        id: "trapezoid",
        title: "Трапеция",
        points: "9,9 23,9 28,23 4,23",
        cells: ["no", 1, "no", "no"],
      },
    ],
    notes: ["У трапеции равны диагонали только у равнобедренной."],
  },
];

export type SignRow = {
  subject: string;
  condition: string;
  result: {
    title: string;
    points: string;
    accent: string;
  };
};

export const signs: SignRow[] = [
  {
    subject: "четырёхугольника",
    condition: "противоположные стороны попарно параллельны",
    result: {
      title: "Параллелограмм",
      points: "6,9 30,9 22,23 0,23",
      accent: "marker-yellow",
    },
  },
  {
    subject: "четырёхугольника",
    condition: "противоположные стороны попарно равны",
    result: {
      title: "Параллелограмм",
      points: "6,9 30,9 22,23 0,23",
      accent: "marker-yellow",
    },
  },
  {
    subject: "четырёхугольника",
    condition: "две стороны равны и параллельны",
    result: {
      title: "Параллелограмм",
      points: "6,9 30,9 22,23 0,23",
      accent: "marker-yellow",
    },
  },
  {
    subject: "четырёхугольника",
    condition: "диагонали точкой пересечения делятся пополам",
    result: {
      title: "Параллелограмм",
      points: "6,9 30,9 22,23 0,23",
      accent: "marker-yellow",
    },
  },
  {
    subject: "четырёхугольника",
    condition: "все углы прямые",
    result: {
      title: "Прямоугольник",
      points: "2,9 30,9 30,23 2,23",
      accent: "marker-pink",
    },
  },
  {
    subject: "параллелограмма",
    condition: "диагонали равны",
    result: {
      title: "Прямоугольник",
      points: "2,9 30,9 30,23 2,23",
      accent: "marker-pink",
    },
  },
  {
    subject: "четырёхугольника",
    condition: "все стороны равны",
    result: {
      title: "Ромб",
      points: "16,2 30,16 16,30 2,16",
      accent: "marker-blue",
    },
  },
  {
    subject: "параллелограмма",
    condition: "диагонали перпендикулярны",
    result: {
      title: "Ромб",
      points: "16,2 30,16 16,30 2,16",
      accent: "marker-blue",
    },
  },
  {
    subject: "параллелограмма",
    condition: "диагональ делит его угол пополам",
    result: {
      title: "Ромб",
      points: "16,2 30,16 16,30 2,16",
      accent: "marker-blue",
    },
  },
  {
    subject: "прямоугольника",
    condition: "все стороны равны",
    result: {
      title: "Квадрат",
      points: "4,4 28,4 28,28 4,28",
      accent: "marker-green",
    },
  },
  {
    subject: "ромба",
    condition: "есть прямой угол",
    result: {
      title: "Квадрат",
      points: "4,4 28,4 28,28 4,28",
      accent: "marker-green",
    },
  },
  {
    subject: "четырёхугольника",
    condition: "диагонали равны, перпендикулярны и делятся пополам",
    result: {
      title: "Квадрат",
      points: "4,4 28,4 28,28 4,28",
      accent: "marker-green",
    },
  },
  {
    subject: "трапеции",
    condition: "углы при одном основании равны",
    result: {
      title: "Равнобедренная трапеция",
      points: "9,9 23,9 28,23 4,23",
      accent: "marker-yellow",
    },
  },
  {
    subject: "трапеции",
    condition: "диагонали равны",
    result: {
      title: "Равнобедренная трапеция",
      points: "9,9 23,9 28,23 4,23",
      accent: "marker-yellow",
    },
  },
];

export type FormulaLine = {
  name: string;
  formula: string;
  note?: string;
};

export type AreaFormula = {
  id: string;
  title: string;
  tagline: string;
  points: string;
  accent: string;
  formulas: FormulaLine[];
  notation: { symbol: string; meaning: string }[];
};

export const areaFormulas: AreaFormula[] = [
  {
    id: "parallelogram-area",
    title: "Параллелограмм",
    tagline: "сторона на высоту",
    points: "6,9 30,9 22,23 0,23",
    accent: "marker-yellow",
    formulas: [
      { name: "Через основание и высоту", formula: "S = a · h" },
      {
        name: "Через две стороны и угол",
        formula: "S = a · b · sin α",
      },
    ],
    notation: [
      { symbol: "a", meaning: "основание (сторона)" },
      { symbol: "h", meaning: "высота, проведённая к основанию" },
      { symbol: "b", meaning: "соседняя сторона" },
      { symbol: "α", meaning: "угол между сторонами a и b" },
    ],
  },
  {
    id: "rectangle-area",
    title: "Прямоугольник",
    tagline: "длина на ширину",
    points: "2,9 30,9 30,23 2,23",
    accent: "marker-pink",
    formulas: [{ name: "Через соседние стороны", formula: "S = a · b" }],
    notation: [
      { symbol: "a", meaning: "длина прямоугольника" },
      { symbol: "b", meaning: "ширина прямоугольника" },
    ],
  },
  {
    id: "rhombus-area",
    title: "Ромб",
    tagline: "через диагонали или высоту",
    points: "16,2 30,16 16,30 2,16",
    accent: "marker-blue",
    formulas: [
      { name: "Через диагонали", formula: "S = \\frac{d₁ · d₂}{2}" },
      { name: "Через сторону и высоту", formula: "S = a · h" },
    ],
    notation: [
      { symbol: "d₁, d₂", meaning: "диагонали ромба" },
      { symbol: "a", meaning: "сторона ромба" },
      { symbol: "h", meaning: "высота ромба" },
    ],
  },
  {
    id: "square-area",
    title: "Квадрат",
    tagline: "сторона в квадрате",
    points: "4,4 28,4 28,28 4,28",
    accent: "marker-green",
    formulas: [{ name: "Через сторону", formula: "S = a²" }],
    notation: [{ symbol: "a", meaning: "сторона квадрата" }],
  },
  {
    id: "trapezoid-area",
    title: "Трапеция",
    tagline: "полусумма оснований на высоту",
    points: "9,9 23,9 28,23 4,23",
    accent: "marker-yellow",
    formulas: [
      {
        name: "Через основания и высоту",
        formula: "S = \\frac{a + b}{2} · h",
      },
      { name: "Через среднюю линию", formula: "S = m · h" },
    ],
    notation: [
      { symbol: "a, b", meaning: "основания трапеции" },
      { symbol: "h", meaning: "высота трапеции" },
      { symbol: "m", meaning: "средняя линия (m = \\frac{a + b}{2})" },
    ],
  },
];

export const notationLegend: { symbol: string; meaning: string }[] = [
  { symbol: "a, b", meaning: "стороны; у трапеции — основания" },
  { symbol: "h", meaning: "высота, проведённая к стороне или основанию" },
  { symbol: "d₁, d₂", meaning: "диагонали" },
  { symbol: "m", meaning: "средняя линия" },
  { symbol: "α", meaning: "угол между сторонами" },
];
