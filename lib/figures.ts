export type Point = { x: number; y: number };

export type ShapeKind =
  "parallelogram" | "rectangle" | "rhombus" | "square" | "trapezoid";

export type ShapeState = {
  kind: ShapeKind;
  A?: Point;
  B?: Point;
  C?: Point;
  D?: Point;
  O?: Point;
  u?: Point;
  v?: Point;
  k?: number;
};

export type Vertex = { label: string; point: Point };

export type Side = { from: string; to: string; length: number };

export type Angle = { vertex: string; value: number };

export type FigureGeometry = {
  vertices: Vertex[];
  sides: Side[];
  angles: Angle[];
};

export type FigureDef = {
  id: ShapeKind;
  title: string;
  hint: string;
  color: string;
  soft: string;
};

export const VIEW_WIDTH = 280;
export const VIEW_HEIGHT = 160;
export const LABEL_SCALE = 10;

const PAD = 14;
const MIN_DIST = 22;
const MIN_AREA = 450;
const MIN_HALF = 16;
const MIN_HEIGHT = 18;
const RATIO_MIN = 0.15;
const RATIO_MAX = 1.8;

const clampNumber = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

const inBounds = (p: Point) =>
  p.x >= PAD &&
  p.x <= VIEW_WIDTH - PAD &&
  p.y >= PAD &&
  p.y <= VIEW_HEIGHT - PAD;

const clampPoint = (p: Point): Point => ({
  x: clampNumber(p.x, PAD, VIEW_WIDTH - PAD),
  y: clampNumber(p.y, PAD, VIEW_HEIGHT - PAD),
});

const dist = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);

export const sub = (a: Point, b: Point): Point => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

export const add = (a: Point, b: Point): Point => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const scale = (v: Point, s: number): Point => ({
  x: v.x * s,
  y: v.y * s,
});

export const rotCCW = (v: Point): Point => ({ x: -v.y, y: v.x });

const rotCW = (v: Point): Point => ({ x: v.y, y: -v.x });

export const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;

const dot = (a: Point, b: Point) => a.x * b.x + a.y * b.y;

const len = (v: Point) => Math.hypot(v.x, v.y);

export const norm = (v: Point): Point => {
  const l = len(v);
  return l > 1e-6 ? scale(v, 1 / l) : { x: 0, y: 0 };
};

export function initialShapeState(kind: ShapeKind): ShapeState {
  switch (kind) {
    case "parallelogram":
      return {
        kind,
        A: { x: 66, y: 114 },
        B: { x: 240, y: 114 },
        C: { x: 194, y: 54 },
      };
    case "rectangle":
      return { kind, A: { x: 56, y: 52 }, C: { x: 228, y: 110 } };
    case "rhombus":
      return {
        kind,
        O: { x: 140, y: 82 },
        u: { x: 48, y: -36 },
        v: { x: 30, y: 40 },
      };
    case "square":
      return { kind, O: { x: 140, y: 82 }, u: { x: 40, y: -40 } };
    case "trapezoid":
      return {
        kind,
        A: { x: 52, y: 116 },
        B: { x: 236, y: 116 },
        D: { x: 92, y: 54 },
        k: 0.62,
      };
  }
}

export function orderVertices(state: ShapeState): Vertex[] {
  const { kind } = state;
  if (kind === "parallelogram") {
    const A = state.A!;
    const B = state.B!;
    const C = state.C!;
    const D = add(sub(A, B), C);
    return [
      { label: "A", point: A },
      { label: "B", point: B },
      { label: "C", point: C },
      { label: "D", point: D },
    ];
  }
  if (kind === "rectangle") {
    const A = state.A!;
    const C = state.C!;
    const B = { x: C.x, y: A.y };
    const D = { x: A.x, y: C.y };
    return [
      { label: "A", point: A },
      { label: "B", point: B },
      { label: "C", point: C },
      { label: "D", point: D },
    ];
  }
  if (kind === "rhombus") {
    const O = state.O!;
    const u = state.u!;
    const v = state.v ?? rotCCW(u);
    return [
      { label: "A", point: add(O, u) },
      { label: "B", point: add(O, v) },
      { label: "C", point: sub(O, u) },
      { label: "D", point: sub(O, v) },
    ];
  }
  if (kind === "square") {
    const O = state.O!;
    const u = state.u!;
    const q = rotCCW(u);
    return [
      { label: "A", point: add(O, u) },
      { label: "B", point: add(O, q) },
      { label: "C", point: sub(O, u) },
      { label: "D", point: sub(O, q) },
    ];
  }
  const A = state.A!;
  const B = state.B!;
  const D = state.D!;
  const k = state.k ?? 0.62;
  const C = add(D, scale(sub(B, A), k));
  return [
    { label: "A", point: A },
    { label: "B", point: B },
    { label: "C", point: C },
    { label: "D", point: D },
  ];
}

function interiorAngle(p: Point, prev: Point, next: Point): number {
  const v1 = sub(prev, p);
  const v2 = sub(next, p);
  const d = dot(v1, v2) / (len(v1) * len(v2) || 1);
  return (Math.acos(clampNumber(d, -1, 1)) * 180) / Math.PI;
}

export function getFigureGeometry(state: ShapeState): FigureGeometry {
  const vertices = orderVertices(state);
  const n = vertices.length;
  const sides: Side[] = vertices.map((v, i) => {
    const next = vertices[(i + 1) % n];
    return { from: v.label, to: next.label, length: dist(v.point, next.point) };
  });
  const angles: Angle[] = vertices.map((v, i) => {
    const prev = vertices[(i - 1 + n) % n];
    const next = vertices[(i + 1) % n];
    return {
      vertex: v.label,
      value: interiorAngle(v.point, prev.point, next.point),
    };
  });
  return { vertices, sides, angles };
}

function validParallelogram(s: ShapeState): boolean {
  const A = s.A!;
  const B = s.B!;
  const C = s.C!;
  const D = add(sub(A, B), C);
  if (!inBounds(A) || !inBounds(B) || !inBounds(C) || !inBounds(D)) {
    return false;
  }
  if (dist(A, B) < MIN_DIST || dist(B, C) < MIN_DIST) {
    return false;
  }
  return Math.abs(cross(sub(B, A), sub(C, A))) >= MIN_AREA;
}

function dragParallelogram(
  state: ShapeState,
  label: string,
  raw: Point
): ShapeState | null {
  const A = state.A!;
  const B = state.B!;
  const C = state.C!;
  const D = add(sub(A, B), C);
  const p = clampPoint(raw);
  const candidate: ShapeState = { kind: state.kind, A, B, C };
  if (label === "A") {
    candidate.A = p;
  } else if (label === "B") {
    candidate.B = p;
  } else if (label === "C") {
    candidate.C = p;
  } else if (label === "D") {
    const delta = sub(p, D);
    candidate.A = add(A, delta);
    candidate.B = add(B, delta);
    candidate.C = add(C, delta);
  } else {
    return null;
  }
  return validParallelogram(candidate) ? candidate : null;
}

function dragRectangle(
  state: ShapeState,
  label: string,
  raw: Point
): ShapeState | null {
  const A = state.A!;
  const C = state.C!;
  const p = clampPoint(raw);
  const candidate: ShapeState = { kind: state.kind, A, C };
  if (label === "A") {
    candidate.A = p;
  } else if (label === "B") {
    candidate.C = { x: p.x, y: C.y };
  } else if (label === "C") {
    candidate.C = p;
  } else if (label === "D") {
    candidate.C = { x: C.x, y: p.y };
  } else {
    return null;
  }
  const nA = candidate.A!;
  const nC = candidate.C!;
  if (nC.x - nA.x < MIN_DIST || nC.y - nA.y < MIN_DIST) {
    return null;
  }
  if (orderVertices(candidate).some((v) => !inBounds(v.point))) {
    return null;
  }
  return candidate;
}

function perpKeep(w: Point, ref: Point): Point {
  const base = norm(rotCCW(w));
  const sign = dot(base, ref) >= 0 ? 1 : -1;
  return scale(scale(base, sign), len(ref));
}

function dragRhombus(
  state: ShapeState,
  label: string,
  raw: Point
): ShapeState | null {
  const O = state.O!;
  const u = state.u!;
  const v = state.v ?? rotCCW(u);
  const p = clampPoint(raw);
  let nu = u;
  let nv = v;
  let nO = O;
  if (label === "O") {
    nO = p;
  } else if (label === "A") {
    const target = sub(p, O);
    if (len(target) < MIN_HALF) return null;
    nu = target;
    nv = perpKeep(nu, v);
  } else if (label === "C") {
    const target = sub(O, p);
    if (len(target) < MIN_HALF) return null;
    nu = target;
    nv = perpKeep(nu, v);
  } else if (label === "B") {
    const target = sub(p, O);
    if (len(target) < MIN_HALF) return null;
    nv = target;
    nu = perpKeep(nv, u);
  } else if (label === "D") {
    const target = sub(O, p);
    if (len(target) < MIN_HALF) return null;
    nv = target;
    nu = perpKeep(nv, u);
  } else {
    return null;
  }
  if (len(nu) < MIN_HALF || len(nv) < MIN_HALF) {
    return null;
  }
  const candidate: ShapeState = { kind: state.kind, O: nO, u: nu, v: nv };
  if (orderVertices(candidate).some((vertex) => !inBounds(vertex.point))) {
    return null;
  }
  return candidate;
}

function dragSquare(
  state: ShapeState,
  label: string,
  raw: Point
): ShapeState | null {
  const O = state.O!;
  const u = state.u!;
  const p = clampPoint(raw);
  let nu = u;
  let nO = O;
  if (label === "O") {
    nO = p;
  } else if (label === "A") {
    nu = sub(p, O);
  } else if (label === "B") {
    nu = rotCW(sub(p, O));
  } else if (label === "C") {
    nu = sub(O, p);
  } else if (label === "D") {
    nu = rotCW(sub(O, p));
  } else {
    return null;
  }
  if (len(nu) < MIN_HALF) {
    return null;
  }
  const candidate: ShapeState = { kind: state.kind, O: nO, u: nu };
  if (orderVertices(candidate).some((vertex) => !inBounds(vertex.point))) {
    return null;
  }
  return candidate;
}

function validTrapezoid(s: ShapeState): boolean {
  const A = s.A!;
  const B = s.B!;
  const D = s.D!;
  const base = dist(A, B);
  if (base < MIN_DIST) {
    return false;
  }
  const height = Math.abs(cross(sub(B, A), sub(D, A))) / base;
  if (height < MIN_HEIGHT) {
    return false;
  }
  return orderVertices(s).every((v) => inBounds(v.point));
}

function dragTrapezoid(
  state: ShapeState,
  label: string,
  raw: Point
): ShapeState | null {
  const A = state.A!;
  const B = state.B!;
  const D = state.D!;
  const k = state.k ?? 0.62;
  const p = clampPoint(raw);
  const candidate: ShapeState = { kind: state.kind, A, B, D, k };
  if (label === "A") {
    candidate.A = p;
  } else if (label === "B") {
    candidate.B = p;
  } else if (label === "D") {
    candidate.D = p;
  } else if (label === "C") {
    const dir = norm(sub(B, A));
    const base = len(sub(B, A));
    const t = dot(sub(p, D), dir);
    candidate.k = clampNumber(t / (base || 1), RATIO_MIN, RATIO_MAX);
  } else {
    return null;
  }
  return validTrapezoid(candidate) ? candidate : null;
}

export function dragShape(
  state: ShapeState,
  label: string,
  raw: Point
): ShapeState | null {
  switch (state.kind) {
    case "parallelogram":
      return dragParallelogram(state, label, raw);
    case "rectangle":
      return dragRectangle(state, label, raw);
    case "rhombus":
      return dragRhombus(state, label, raw);
    case "square":
      return dragSquare(state, label, raw);
    case "trapezoid":
      return dragTrapezoid(state, label, raw);
  }
}

export function equalSideGroups(
  geometry: FigureGeometry
): Record<string, number> {
  const groups: Array<{ key: string; length: number }[]> = [];
  const result: Record<string, number> = {};
  for (const side of geometry.sides) {
    const key = `${side.from}${side.to}`;
    const rounded = Math.round(side.length * 10) / 10;
    const group = groups.find((g) => Math.abs(g[0].length - rounded) < 0.05);
    if (group) {
      group.push({ key, length: rounded });
      result[key] = groups.indexOf(group);
    } else {
      groups.push([{ key, length: rounded }]);
      result[key] = groups.length - 1;
    }
  }
  return result;
}

export const figures: FigureDef[] = [
  {
    id: "parallelogram",
    title: "Параллелограмм",
    hint: "Тяни любую вершину — противоположные стороны всегда остаются параллельными и равными.",
    color: "#d97706",
    soft: "rgba(251, 191, 36, 0.16)",
  },
  {
    id: "rectangle",
    title: "Прямоугольник",
    hint: "Меняй длину и ширину — все углы всегда остаются по 90°.",
    color: "#e11d48",
    soft: "rgba(251, 113, 133, 0.16)",
  },
  {
    id: "rhombus",
    title: "Ромб",
    hint: "Двигай вершины — стороны всегда остаются равными, как у настоящего ромба.",
    color: "#0284c7",
    soft: "rgba(56, 189, 248, 0.16)",
  },
  {
    id: "square",
    title: "Квадрат",
    hint: "Как ни тяни вершины, квадрат всегда остаётся квадратом.",
    color: "#059669",
    soft: "rgba(52, 211, 153, 0.16)",
  },
  {
    id: "trapezoid",
    title: "Трапеция",
    hint: "Меняй основания и высоту — основания всегда остаются параллельными.",
    color: "#7c3aed",
    soft: "rgba(167, 139, 250, 0.16)",
  },
];
