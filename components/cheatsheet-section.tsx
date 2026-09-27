import { Sigma } from "lucide-react";
import { propertyGroups } from "@/lib/formulas";
import { PropertyTable } from "./property-table";
import { SignTable } from "./sign-table";
import { AreaFormulas } from "./area-formulas";

const quickLinks = [
  { id: "cheat-properties", label: "Сводные свойства" },
  { id: "cheat-signs", label: "Признаки" },
  { id: "cheat-area", label: "Формулы площадей" },
  { id: "cheat-notation", label: "Обозначения" },
];

export function CheatSheetSection() {
  return (
    <section id="formulas" className="scroll-mt-24">
      <div className="notebook-margin flex flex-col gap-8 rounded-r-2xl border-y border-r border-border/70 bg-white/75 px-6 py-8 backdrop-blur-sm sm:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-primary/10">
              <Sigma className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-hand text-3xl leading-tight text-foreground">
                Свойства и формулы
              </h2>
              <p className="font-hand text-lg text-muted-foreground">
                шпаргалка перед контрольной
              </p>
            </div>
          </div>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            Всё самое важное в одном месте: сводные таблицы свойств и признаков
            всех пяти четырёхугольников и формулы площадей с пояснением
            обозначений. Быстро повтори — и вперёд на контрольную!
          </p>
        </div>

        <nav
          aria-label="Навигация по шпаргалке"
          className="flex flex-wrap gap-2"
        >
          {quickLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white/80 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-secondary hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div id="cheat-properties" className="scroll-mt-24 flex flex-col gap-8">
          {propertyGroups.map((group) => (
            <PropertyTable key={group.id} group={group} />
          ))}
        </div>

        <div id="cheat-signs" className="scroll-mt-24">
          <SignTable />
        </div>

        <div id="cheat-area" className="scroll-mt-24">
          <AreaFormulas />
        </div>
      </div>
    </section>
  );
}
