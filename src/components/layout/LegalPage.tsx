import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalSection } from "@/content/legal";

/** Shared shell for the privacy policy, terms of use and SMS policy pages. */
export function LegalPage({
  title,
  sections,
  intro,
  image = "/img/site/energy05.jpg",
}: {
  title: string;
  sections: LegalSection[];
  intro?: string;
  image?: string;
}) {
  const headings = sections.filter((s) => s.heading);

  return (
    <>
      <PageHero eyebrow="Legal" title={title} image={image} crumbs={[{ label: title }]} size="sm" />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
            {headings.length > 1 && (
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-ink/40 uppercase">
                    On this page
                  </p>
                  <ul className="mt-5 flex flex-col gap-1">
                    {headings.map((s) => (
                      <li key={s.heading}>
                        <a
                          href={`#${slugify(s.heading!)}`}
                          className="block rounded-lg px-3 py-2 text-[0.8125rem] leading-snug text-ink/60 transition-colors hover:bg-leaf/10 hover:text-leaf-deep focus-ring"
                        >
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </aside>
            )}

            <div className="mx-auto w-full max-w-[46rem] lg:mx-0">
              {intro && (
                <Reveal>
                  <p className="border-l-2 border-leaf pl-6 font-serif text-[1.25rem] leading-[1.5] text-ink/85 italic">
                    {intro}
                  </p>
                </Reveal>
              )}

              <div className="prose-ac mt-8">
                {sections.map((s, i) => (
                  <div key={(s.heading ?? "") + i} className="scroll-mt-28" id={s.heading ? slugify(s.heading) : undefined}>
                    {s.heading && <h2>{s.heading}</h2>}
                    {s.paragraphs?.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                    {s.list && (
                      <ul>
                        {s.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
