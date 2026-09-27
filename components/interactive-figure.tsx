"use client";

import { useRef, useState } from "react";
import { MousePointerClick, RotateCw, Ruler } from "lucide-react";
import {
  LABEL_SCALE,
  VIEW_HEIGHT,
  VIEW_WIDTH,
  add,
  cross,
  dragShape,
  equalSideGroups,
  getFigureGeometry,
  initialShapeState,
  norm,
  rotCCW,
  scale,
  sub,
  type FigureDef,
  type Point,
} from "@/lib/figures";

const ARC_RADIUS = 15;
const KEYBOARD_STEP = 4;

const formatLength = (value: number) => (value / LABEL_SCALE).toFixed(1);

function EqualTicks({
  endpoints,
  center,
  count,
  color,
}: {
  endpoints: { p1: Point; p2: Point };
  center: Point;
  count: number;
  color: string;
}) {
  const along = sub(endpoints.p2, endpoints.p1);
  const dir = norm(along);
  const perp = rotCCW(dir);
  const base = add(endpoints.p1, scale(along, 0.28));
  const outward = norm(sub(base, center));
  const pos = add(base, scale(outward, 3));
  const offsets = count === 1 ? [0] : [-2.4, 2.4];
  return (
    <>
      {offsets.map((o) => (
        <line
          key={o}
          x1={pos.x - perp.x * 3.5 + perp.x * o}
          y1={pos.y - perp.y * 3.5 + perp.y * o}
          x2={pos.x + perp.x * 3.5 + perp.x * o}
          y2={pos.y + perp.y * 3.5 + perp.y * o}
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

function SideLength({
  endpoints,
  center,
  label,
}: {
  endpoints: { p1: Point; p2: Point };
  center: Point;
  label: string;
}) {
  const along = sub(endpoints.p2, endpoints.p1);
  const mid = add(endpoints.p1, scale(along, 0.62));
  const outward = norm(sub(mid, center));
  const pos = add(mid, scale(outward, 11));
  return (
    <text
      x={pos.x}
      y={pos.y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="11"
      fill="currentColor"
      className="text-muted-foreground"
    >
      {label}
    </text>
  );
}

function AngleMark({
  vertex,
  prev,
  next,
  label,
  color,
}: {
  vertex: Point;
  prev: Point;
  next: Point;
  label: string;
  color: string;
}) {
  const u1 = norm(sub(prev, vertex));
  const u2 = norm(sub(next, vertex));
  const cr = cross(u1, u2);
  if (Math.abs(cr) < 1e-6) return null;
  const sweep = cr > 0 ? 1 : 0;
  const r = ARC_RADIUS;
  const e1 = add(vertex, scale(u1, r));
  const e2 = add(vertex, scale(u2, r));
  const bis = norm(add(u1, u2));
  const labelPos = add(vertex, scale(bis, r + 16));
  return (
    <g>
      <path
        d={`M ${e1.x} ${e1.y} A ${r} ${r} 0 0 ${sweep} ${e2.x} ${e2.y}`}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <text
        x={labelPos.x}
        y={labelPos.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fill="currentColor"
        className="text-muted-foreground"
      >
        {label}
      </text>
    </g>
  );
}

function VertexHandle({
  label,
  point,
  center,
  color,
  figureTitle,
  onPointerDown,
  onKeyDown,
}: {
  label: string;
  point: Point;
  center: Point;
  color: string;
  figureTitle: string;
  onPointerDown: (label: string, e: React.PointerEvent<SVGGElement>) => void;
  onKeyDown: (label: string, e: React.KeyboardEvent<SVGGElement>) => void;
}) {
  const away = norm(sub(point, center));
  const letterPos = add(point, scale(away, 14));
  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={`Вершина ${label} фигуры «${figureTitle}»: перемещай стрелками на клавиатуре или мышью`}
      onPointerDown={(e) => onPointerDown(label, e)}
      onKeyDown={(e) => onKeyDown(label, e)}
      className="cursor-grab outline-none focus-visible:[&>circle:first-of-type]:opacity-100 active:cursor-grabbing"
    >
      <circle
        cx={point.x}
        cy={point.y}
        r={12}
        fill="transparent"
        stroke={color}
        strokeWidth={6}
        opacity={0}
      />
      <circle
        cx={point.x}
        cy={point.y}
        r={7}
        fill="#ffffff"
        stroke={color}
        strokeWidth={2}
      />
      <text
        x={letterPos.x}
        y={letterPos.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight={700}
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

function CenterHandle({
  point,
  color,
  figureTitle,
  onPointerDown,
  onKeyDown,
}: {
  point: Point;
  color: string;
  figureTitle: string;
  onPointerDown: (label: string, e: React.PointerEvent<SVGGElement>) => void;
  onKeyDown: (label: string, e: React.KeyboardEvent<SVGGElement>) => void;
}) {
  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={`Центр фигуры «${figureTitle}»: перемещай стрелками на клавиатуре или мышью`}
      onPointerDown={(e) => onPointerDown("O", e)}
      onKeyDown={(e) => onKeyDown("O", e)}
      className="cursor-grab outline-none active:cursor-grabbing"
    >
      <circle
        cx={point.x}
        cy={point.y}
        r={12}
        fill="transparent"
        stroke={color}
        strokeWidth={6}
        opacity={0}
      />
      <circle
        cx={point.x}
        cy={point.y}
        r={6}
        fill="#ffffff"
        stroke={color}
        strokeWidth={2}
        strokeDasharray="3 2"
      />
      <text
        x={point.x + 11}
        y={point.y + 4}
        fontSize={12}
        fontWeight={700}
        fill={color}
      >
        O
      </text>
    </g>
  );
}

function TickGlyph({ count, color }: { count: number; color: string }) {
  return (
    <span aria-hidden className="inline-flex h-3.5 items-center gap-[2px]">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="inline-block h-full w-px rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}

export function InteractiveFigure({ figure }: { figure: FigureDef }) {
  const [state, setState] = useState(() => initialShapeState(figure.id));
  const [dragLabel, setDragLabel] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const geometry = getFigureGeometry(state);
  const vertices = geometry.vertices;
  const sides = geometry.sides;
  const angles = geometry.angles;
  const groups = equalSideGroups(geometry);

  const pointMap = new Map(vertices.map((v) => [v.label, v.point]));
  const sideEndpoints = new Map(
    sides.map((s) => [
      `${s.from}${s.to}`,
      { p1: pointMap.get(s.from)!, p2: pointMap.get(s.to)! },
    ])
  );

  const center = vertices.reduce(
    (acc, v) => ({
      x: acc.x + v.point.x / vertices.length,
      y: acc.y + v.point.y / vertices.length,
    }),
    { x: 0, y: 0 }
  );

  const pointsString = vertices
    .map((v) => `${v.point.x},${v.point.y}`)
    .join(" ");
  const angleSum = angles.reduce((acc, a) => acc + a.value, 0);

  function toSvgPoint(e: React.PointerEvent<SVGSVGElement>): Point {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    return {
      x: ((e.clientX - rect.left) / rect.width) * vb.width,
      y: ((e.clientY - rect.top) / rect.height) * vb.height,
    };
  }

  function handleVertexPointerDown(
    label: string,
    e: React.PointerEvent<SVGGElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragLabel(label);
  }

  function handleSvgPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!dragLabel) return;
    const p = toSvgPoint(e);
    setState((prev) => dragShape(prev, dragLabel, p) ?? prev);
  }

  function handleDragEnd() {
    setDragLabel(null);
  }

  function handleVertexKeyDown(
    label: string,
    e: React.KeyboardEvent<SVGGElement>
  ) {
    const vertex = vertices.find((v) => v.label === label);
    if (!vertex) return;
    let dx = 0;
    let dy = 0;
    switch (e.key) {
      case "ArrowLeft":
        dx = -KEYBOARD_STEP;
        break;
      case "ArrowRight":
        dx = KEYBOARD_STEP;
        break;
      case "ArrowUp":
        dy = -KEYBOARD_STEP;
        break;
      case "ArrowDown":
        dy = KEYBOARD_STEP;
        break;
      default:
        return;
    }
    e.preventDefault();
    setState(
      (prev) =>
        dragShape(prev, label, {
          x: vertex.point.x + dx,
          y: vertex.point.y + dy,
        }) ?? prev
    );
  }

  return (
    <article
      id={`figure-${figure.id}`}
      className="scroll-mt-24 rounded-2xl border border-primary/15 bg-secondary/20 p-4 sm:p-5"
    >
      <div className="overflow-hidden rounded-xl border border-border/70">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          role="img"
          aria-label={`Интерактивная модель «${figure.title}». Перемещай вершины мышью, пальцем или стрелками на клавиатуре.`}
          className="block h-auto w-full touch-none select-none"
          onPointerMove={handleSvgPointerMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
          onPointerLeave={handleDragEnd}
        >
          <defs>
            <pattern
              id={`grid-${figure.id}`}
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="1"
                cy="1"
                r="0.7"
                fill="oklch(0.87 0.02 270 / 0.55)"
              />
            </pattern>
          </defs>
          <rect
            width={VIEW_WIDTH}
            height={VIEW_HEIGHT}
            fill={`url(#grid-${figure.id})`}
          />

          <polygon
            points={pointsString}
            fill={figure.soft}
            stroke={figure.color}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {sides.map((side) => {
            const key = `${side.from}${side.to}`;
            const group = groups[key];
            const shared =
              group !== undefined &&
              Object.keys(groups).some((k) => k !== key && groups[k] === group);
            if (!shared) return null;
            return (
              <EqualTicks
                key={key}
                endpoints={sideEndpoints.get(key)!}
                center={center}
                count={(group % 2) + 1}
                color={figure.color}
              />
            );
          })}

          {sides.map((side) => (
            <SideLength
              key={`${side.from}${side.to}`}
              endpoints={sideEndpoints.get(`${side.from}${side.to}`)!}
              center={center}
              label={formatLength(side.length)}
            />
          ))}

          {vertices.map((v, i) => (
            <AngleMark
              key={v.label}
              vertex={v.point}
              prev={vertices[(i + 3) % 4].point}
              next={vertices[(i + 1) % 4].point}
              label={`${angles[i].value.toFixed(0)}°`}
              color={figure.color}
            />
          ))}

          {figure.id === "rhombus" || figure.id === "square" ? (
            <CenterHandle
              point={state.O!}
              color={figure.color}
              figureTitle={figure.title}
              onPointerDown={handleVertexPointerDown}
              onKeyDown={handleVertexKeyDown}
            />
          ) : null}

          {vertices.map((v) => (
            <VertexHandle
              key={v.label}
              label={v.label}
              point={v.point}
              center={center}
              color={figure.color}
              figureTitle={figure.title}
              onPointerDown={handleVertexPointerDown}
              onKeyDown={handleVertexKeyDown}
            />
          ))}
        </svg>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border/70 bg-white/70 p-4">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Ruler className="h-3.5 w-3.5 text-primary" />
            Длины сторон
          </h4>
          <ul className="mt-3 space-y-1.5">
            {sides.map((side) => {
              const key = `${side.from}${side.to}`;
              const group = groups[key];
              const shared =
                group !== undefined &&
                Object.keys(groups).some(
                  (k) => k !== key && groups[k] === group
                );
              return (
                <li
                  key={key}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{key}</span>
                    {shared ? (
                      <TickGlyph count={(group % 2) + 1} color={figure.color} />
                    ) : null}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    {formatLength(side.length)} ед.
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-xl border border-border/70 bg-white/70 p-4">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <RotateCw className="h-3.5 w-3.5 text-primary" />
            Углы
          </h4>
          <ul className="mt-3 space-y-1.5">
            {angles.map((angle) => (
              <li
                key={angle.vertex}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="font-medium text-foreground">
                  ∠{angle.vertex}
                </span>
                <span className="tabular-nums text-muted-foreground">
                  {angle.value.toFixed(1)}°
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-2 text-xs text-muted-foreground">
            <span>Сумма углов</span>
            <span className="tabular-nums font-medium text-emerald-600">
              {angleSum.toFixed(1)}°
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <MousePointerClick className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
        {figure.hint}
      </p>
    </article>
  );
}
