import type { Section } from "@/lib/data";

export function SectionStub({ section }: { section: Section }) {
  const Icon = section.icon;
  return (
    <section id={section.id} className="scroll-mt-24">
      <div className="notebook-margin flex flex-col gap-5 rounded-r-2xl border-y border-r border-border/70 bg-white/75 px-6 py-8 backdrop-blur-sm sm:px-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-primary/10">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <h2 className="font-hand text-3xl leading-tight text-foreground">
            {section.title}
          </h2>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            Раздел пока в разработке — скоро здесь появятся материалы. А пока
            вернись наверх и выбери другой раздел.
          </p>
        </div>
      </div>
    </section>
  );
}
