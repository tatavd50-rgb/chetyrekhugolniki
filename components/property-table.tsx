import { Check, Minus } from "lucide-react";
import type { CellValue, PropertyGroup } from "@/lib/formulas";

function PropertyCell({ value }: { value: CellValue }) {
  if (value === "yes") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
        <Check className="h-4 w-4 text-emerald-600" strokeWidth={2.5} />
        <span className="sr-only">да</span>
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center">
        <Minus className="h-4 w-4 text-muted-foreground/40" strokeWidth={2.5} />
        <span className="sr-only">нет</span>
      </span>
    );
  }
  return (
    <span
      aria-label={`смотрите примечание ${value}`}
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
    >
      {value}
    </span>
  );
}

export function PropertyTable({ group }: { group: PropertyGroup }) {
  return (
    <div>
      <div className="flex flex-col gap-0.5">
        <h3 className="font-hand text-2xl leading-none text-foreground">
          {group.title}
        </h3>
        <p className="font-hand text-base text-muted-foreground">
          {group.tagline}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border/70 bg-white/85 shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-44 border-b border-border/70 bg-secondary/50 px-3 py-2.5 text-left font-semibold text-foreground"
              >
                Фигура
              </th>
              {group.columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="border-b border-l border-border/70 bg-secondary/50 px-3 py-2.5 text-center align-bottom font-medium leading-tight text-muted-foreground"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {group.rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border/50 last:border-b-0 odd:bg-white even:bg-secondary/15"
              >
                <th
                  scope="row"
                  className="px-3 py-2.5 text-left font-medium text-foreground"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg
                      aria-hidden
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 shrink-0 text-primary/70"
                    >
                      <polygon points={row.points} />
                    </svg>
                    {row.title}
                  </span>
                </th>
                {row.cells.map((cell, index) => (
                  <td
                    key={group.columns[index].id}
                    className="border-l border-border/50 px-2 py-2 text-center"
                  >
                    <PropertyCell value={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {group.notes.length > 0 && (
        <ol className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          {group.notes.map((note, index) => (
            <li key={note} className="flex gap-2">
              <span className="font-semibold text-primary">{index + 1}</span>
              <span>{note}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
