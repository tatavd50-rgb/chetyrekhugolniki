import { Fragment } from "react";
import { cn } from "@/lib/utils";

const FRACTION_RE = /\\frac\{([^{}]*)\}\{([^{}]*)\}/g;

function Fraction({
  numerator,
  denominator,
}: {
  numerator: string;
  denominator: string;
}) {
  return (
    <span className="inline-flex flex-col items-center justify-center self-center align-middle leading-none">
      <span className="px-1">{numerator}</span>
      <span
        aria-hidden
        className="my-[0.18em] h-[2px] w-full min-w-[1.5em] rounded-full bg-current"
      />
      <span className="px-1">{denominator}</span>
    </span>
  );
}

function renderFormula(part: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  FRACTION_RE.lastIndex = 0;
  while ((match = FRACTION_RE.exec(part)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(part.slice(lastIndex, match.index));
    }
    nodes.push(
      <Fraction
        key={nodes.length}
        numerator={match[1]}
        denominator={match[2]}
      />
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < part.length) {
    nodes.push(part.slice(lastIndex));
  }
  return nodes;
}

export function FormulaText({
  text,
  accent,
}: {
  text: string;
  accent?: string;
}) {
  const parts = text.split(/\*(.+?)\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span
        key={index}
        className={cn("marker", accent, "font-medium text-foreground")}
      >
        {renderFormula(part)}
      </span>
    ) : (
      <Fragment key={index}>{renderFormula(part)}</Fragment>
    )
  );
}
