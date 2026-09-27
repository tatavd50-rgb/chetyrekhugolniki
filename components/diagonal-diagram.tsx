import { Minus, MoveDiagonal, type LucideIcon } from "lucide-react";
import type { ShapeKind } from "@/lib/figures";
import type { ShapeTheory, ShapeDiagram, DiagramVariant } from "@/lib/theory";
import { FormulaText } from "./formula-text";

type Point = { x: number; y: number };

const sub = (a: Point, b: Point): Point => ({ x: a.x - b.x, y: a.y - b.y });
const add = (a: Point, b: Point): Point => ({ x: a.x + b.x, y: a.y + b.y });
const scale = (v: Point, s: number): Point => ({ x: v.x * s, y: v.y * s });

const len = (v: Point) => Math.hypot(v.x, v.y);

const norm = (v: Point): Point => {
  const l = len(v);
  return l > 1e-6 ? scale(v, 1 / l) : { x: 0, y: 0 };
};

const unit = (a: Point, b: Point): Point => norm(sub(b, a));

const mid = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;

function ShapeOutline({
  vertices,
  color,
  soft,
}: {
  vertices: Point[];
  color: string;
  soft: string;
}) {
  return (
    <polygon
      points={vertices.map((p) => `${p.x},${p.y}`).join(" ")}
      fill={soft}
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  );
}

function Segment({
  from,
  to,
  color,
}: {
  from: Point;
  to: Point;
  color: string;
}) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  );
}

function PointDot({
  point,
  color,
  r = 3,
}: {
  point: Point;
  color: string;
  r?: number;
}) {
  return <circle cx={point.x} cy={point.y} r={r} fill={color} />;
}

function VertexLabels({
  items,
  color,
}: {
  items: { label: string; point: Point }[];
  color: string;
}) {
  const centroid = items.reduce(
    (acc, item) => ({
      x: acc.x + item.point.x / items.length,
      y: acc.y + item.point.y / items.length,
    }),
    { x: 0, y: 0 }
  );
  return (
    <>
      {items.map((item) => {
        const pos = add(item.point, scale(norm(sub(item.point, centroid)), 13));
        return (
          <text
            key={item.label}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={13}
            fontWeight={700}
            fill={color}
          >
            {item.label}
          </text>
        );
      })}
    </>
  );
}

function PointLabel({
  point,
  text,
  offset,
  color,
}: {
  point: Point;
  text: string;
  offset: { x: number; y: number };
  color: string;
}) {
  return (
    <text
      x={point.x + offset.x}
      y={point.y + offset.y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={700}
      fill={color}
    >
      {text}
    </text>
  );
}

function TextLabel({
  x,
  y,
  children,
  color,
}: {
  x: number;
  y: number;
  children: string;
  color: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={600}
      fontStyle="italic"
      fill={color}
    >
      {children}
    </text>
  );
}

function Ticks({
  from,
  to,
  count,
  color,
}: {
  from: Point;
  to: Point;
  count: number;
  color: string;
}) {
  const dir = unit(from, to);
  const perp = { x: -dir.y, y: dir.x };
  const center = mid(from, to);
  const halfLen = 3.6;
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const offset = (index - (count - 1) / 2) * 4;
        const c = add(center, scale(perp, offset));
        return (
          <line
            key={index}
            x1={c.x - perp.x * halfLen}
            y1={c.y - perp.y * halfLen}
            x2={c.x + perp.x * halfLen}
            y2={c.y + perp.y * halfLen}
            stroke={color}
            strokeWidth={1.7}
            strokeLinecap="round"
          />
        );
      })}
    </>
  );
}

function RightAngleMark({
  corner,
  p1,
  p2,
  color,
  size = 9,
}: {
  corner: Point;
  p1: Point;
  p2: Point;
  color: string;
  size?: number;
}) {
  const u = unit(corner, p1);
  const v = unit(corner, p2);
  const a = add(corner, scale(u, size));
  const b = add(add(corner, scale(u, size)), scale(v, size));
  const c = add(corner, scale(v, size));
  return (
    <path
      d={`M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`}
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function AngleArc({
  vertex,
  to1,
  to2,
  radius,
  color,
}: {
  vertex: Point;
  to1: Point;
  to2: Point;
  radius: number;
  color: string;
}) {
  const u1 = unit(vertex, to1);
  const u2 = unit(vertex, to2);
  const start = add(vertex, scale(u1, radius));
  const end = add(vertex, scale(u2, radius));
  const sweep = cross(u1, u2) >= 0 ? 1 : 0;
  return (
    <path
      d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 0 ${sweep} ${end.x} ${end.y}`}
      fill="none"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  );
}

function BisectArcs({
  vertex,
  p1,
  p2,
  diag,
  radius,
  color,
}: {
  vertex: Point;
  p1: Point;
  p2: Point;
  diag: Point;
  radius: number;
  color: string;
}) {
  return (
    <>
      <AngleArc
        vertex={vertex}
        to1={p1}
        to2={diag}
        radius={radius}
        color={color}
      />
      <AngleArc
        vertex={vertex}
        to1={diag}
        to2={p2}
        radius={radius}
        color={color}
      />
    </>
  );
}

function renderParallelogram(color: string, soft: string) {
  const A = { x: 40, y: 84 };
  const B = { x: 150, y: 84 };
  const C = { x: 126, y: 30 };
  const D = { x: 16, y: 30 };
  const O = mid(A, C);
  return (
    <>
      <ShapeOutline vertices={[A, B, C, D]} color={color} soft={soft} />
      <Segment from={A} to={C} color={color} />
      <Segment from={B} to={D} color={color} />
      <Ticks from={A} to={O} count={1} color={color} />
      <Ticks from={O} to={C} count={1} color={color} />
      <Ticks from={B} to={O} count={2} color={color} />
      <Ticks from={O} to={D} count={2} color={color} />
      <PointDot point={O} color={color} />
      <PointLabel point={O} text="O" offset={{ x: 9, y: 4 }} color={color} />
      <VertexLabels
        items={[
          { label: "A", point: A },
          { label: "B", point: B },
          { label: "C", point: C },
          { label: "D", point: D },
        ]}
        color={color}
      />
    </>
  );
}

function renderRectangle(color: string, soft: string) {
  const A = { x: 26, y: 84 };
  const B = { x: 144, y: 84 };
  const C = { x: 144, y: 22 };
  const D = { x: 26, y: 22 };
  const O = mid(A, C);
  return (
    <>
      <ShapeOutline vertices={[A, B, C, D]} color={color} soft={soft} />
      <Segment from={A} to={C} color={color} />
      <Segment from={B} to={D} color={color} />
      <Ticks from={O} to={C} count={1} color={color} />
      <Ticks from={O} to={D} count={1} color={color} />
      <PointDot point={O} color={color} />
      <PointLabel point={O} text="O" offset={{ x: 9, y: 4 }} color={color} />
      <VertexLabels
        items={[
          { label: "A", point: A },
          { label: "B", point: B },
          { label: "C", point: C },
          { label: "D", point: D },
        ]}
        color={color}
      />
    </>
  );
}

function renderRhombus(color: string, soft: string) {
  const A = { x: 86, y: 16 };
  const B = { x: 152, y: 52 };
  const C = { x: 86, y: 88 };
  const D = { x: 20, y: 52 };
  const O = mid(A, C);
  return (
    <>
      <ShapeOutline vertices={[A, B, C, D]} color={color} soft={soft} />
      <Segment from={A} to={C} color={color} />
      <Segment from={B} to={D} color={color} />
      <RightAngleMark corner={O} p1={A} p2={B} color={color} />
      <Ticks from={A} to={O} count={1} color={color} />
      <Ticks from={O} to={C} count={1} color={color} />
      <Ticks from={B} to={O} count={2} color={color} />
      <Ticks from={O} to={D} count={2} color={color} />
      <BisectArcs vertex={A} p1={B} p2={D} diag={O} radius={11} color={color} />
      <BisectArcs vertex={B} p1={C} p2={A} diag={O} radius={11} color={color} />
      <BisectArcs vertex={C} p1={D} p2={B} diag={O} radius={11} color={color} />
      <BisectArcs vertex={D} p1={A} p2={C} diag={O} radius={11} color={color} />
      <PointDot point={O} color={color} />
      <PointLabel point={O} text="O" offset={{ x: -8, y: 7 }} color={color} />
      <VertexLabels
        items={[
          { label: "A", point: A },
          { label: "B", point: B },
          { label: "C", point: C },
          { label: "D", point: D },
        ]}
        color={color}
      />
    </>
  );
}

function renderSquare(color: string, soft: string) {
  const A = { x: 86, y: 16 };
  const B = { x: 126, y: 52 };
  const C = { x: 86, y: 88 };
  const D = { x: 46, y: 52 };
  const O = mid(A, C);
  return (
    <>
      <ShapeOutline vertices={[A, B, C, D]} color={color} soft={soft} />
      <Segment from={A} to={C} color={color} />
      <Segment from={B} to={D} color={color} />
      <RightAngleMark corner={O} p1={A} p2={B} color={color} />
      <Ticks from={O} to={A} count={1} color={color} />
      <Ticks from={O} to={B} count={1} color={color} />
      <PointDot point={O} color={color} />
      <PointLabel point={O} text="O" offset={{ x: -8, y: 7 }} color={color} />
      <VertexLabels
        items={[
          { label: "A", point: A },
          { label: "B", point: B },
          { label: "C", point: C },
          { label: "D", point: D },
        ]}
        color={color}
      />
    </>
  );
}

function renderTrapezoid(color: string, soft: string) {
  const A = { x: 20, y: 84 };
  const B = { x: 150, y: 84 };
  const C = { x: 116, y: 26 };
  const D = { x: 52, y: 26 };
  const M = mid(A, D);
  const N = mid(B, C);
  return (
    <>
      <ShapeOutline vertices={[A, B, C, D]} color={color} soft={soft} />
      <line
        x1={M.x}
        y1={M.y}
        x2={N.x}
        y2={N.y}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <PointDot point={M} color={color} r={2.5} />
      <PointDot point={N} color={color} r={2.5} />
      <TextLabel x={85} y={98} color={color}>
        a
      </TextLabel>
      <TextLabel x={84} y={14} color={color}>
        b
      </TextLabel>
      <TextLabel x={84.5} y={68} color={color}>
        m
      </TextLabel>
    </>
  );
}

function renderIsoscelesTrapezoid(color: string, soft: string) {
  const A = { x: 30, y: 86 };
  const B = { x: 140, y: 86 };
  const C = { x: 118, y: 28 };
  const D = { x: 52, y: 28 };
  return (
    <>
      <ShapeOutline vertices={[A, B, C, D]} color={color} soft={soft} />
      <Ticks from={A} to={D} count={1} color={color} />
      <Ticks from={B} to={C} count={1} color={color} />
      <AngleArc vertex={A} to1={B} to2={D} radius={10} color={color} />
      <AngleArc vertex={B} to1={C} to2={A} radius={10} color={color} />
      <VertexLabels
        items={[
          { label: "A", point: A },
          { label: "B", point: B },
          { label: "C", point: C },
          { label: "D", point: D },
        ]}
        color={color}
      />
    </>
  );
}

function renderRightTrapezoid(color: string, soft: string) {
  const A = { x: 26, y: 86 };
  const B = { x: 144, y: 86 };
  const C = { x: 118, y: 28 };
  const D = { x: 26, y: 28 };
  return (
    <>
      <ShapeOutline vertices={[A, B, C, D]} color={color} soft={soft} />
      <RightAngleMark corner={A} p1={B} p2={D} color={color} />
      <RightAngleMark corner={D} p1={C} p2={A} color={color} />
      <VertexLabels
        items={[
          { label: "A", point: A },
          { label: "B", point: B },
          { label: "C", point: C },
          { label: "D", point: D },
        ]}
        color={color}
      />
    </>
  );
}

function renderDiagram(kind: ShapeKind, color: string, soft: string) {
  switch (kind) {
    case "parallelogram":
      return renderParallelogram(color, soft);
    case "rectangle":
      return renderRectangle(color, soft);
    case "rhombus":
      return renderRhombus(color, soft);
    case "square":
      return renderSquare(color, soft);
    case "trapezoid":
      return renderTrapezoid(color, soft);
  }
}

function renderVariantDiagram(
  variant: DiagramVariant,
  color: string,
  soft: string
) {
  switch (variant) {
    case "isosceles-trapezoid":
      return renderIsoscelesTrapezoid(color, soft);
    case "right-trapezoid":
      return renderRightTrapezoid(color, soft);
  }
}

function renderDiagramContent(
  shape: ShapeTheory,
  diagram: ShapeDiagram,
  color: string,
  soft: string
) {
  if (diagram.variant) {
    return renderVariantDiagram(diagram.variant, color, soft);
  }
  return renderDiagram(shape.id as ShapeKind, color, soft);
}

export function DiagonalDiagram({
  shape,
  color,
  soft,
}: {
  shape: ShapeTheory;
  color: string;
  soft: string;
}) {
  const isTrapezoid = shape.id === "trapezoid";
  const Icon: LucideIcon = isTrapezoid ? Minus : MoveDiagonal;
  const diagrams = [shape.diagram, ...(shape.extraDiagrams ?? [])];
  return (
    <section className="rounded-xl border border-primary/15 bg-secondary/20 p-4 sm:p-5">
      <h4 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <Icon className="h-4 w-4 shrink-0 text-primary" />
        {diagrams.length > 1 ? "Рисунки" : shape.diagram.title}
      </h4>
      <div className="mt-4 space-y-4">
        {diagrams.map((diagram) => (
          <div
            key={diagram.title}
            className="grid items-center gap-4 sm:grid-cols-[minmax(0,220px)_1fr]"
          >
            <div className="overflow-hidden rounded-xl border border-border/70 bg-white/85 shadow-sm">
              <svg
                viewBox="0 0 170 106"
                role="img"
                aria-label={`Рисунок «${diagram.title}» к фигуре «${shape.title}»`}
                className="block h-auto w-full"
              >
                {renderDiagramContent(shape, diagram, color, soft)}
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {diagram.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                <FormulaText text={diagram.note} accent={shape.accent} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
