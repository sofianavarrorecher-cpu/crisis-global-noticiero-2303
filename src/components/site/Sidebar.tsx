import { Link } from "@tanstack/react-router";
import { mostRead, type TimelineItem } from "@/data/news";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="rule-top kicker mb-3 pt-2 text-breaking">
      {children}
    </h2>
  );
}

export function MostRead() {
  return (
    <section>
      <SectionTitle>Lo más leído</SectionTitle>
      <ol className="divide-y divide-border">
        {mostRead.map((a, i) => (
          <li key={a.slug} className="flex gap-3 py-3">
            <span className="font-headline text-2xl leading-none text-primary">{i + 1}</span>
            <Link
              to="/nota/$slug"
              params={{ slug: a.slug }}
              className="font-headline text-[15px] leading-snug font-bold hover:text-primary"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Timeline({
  items,
  title = "Cronología del conflicto",
}: {
  items: TimelineItem[];
  title?: string;
}) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <ol className="border-l-2 border-border pl-4">
        {items.map((t, i) => (
          <li key={i} className="relative pb-5 last:pb-0">
            <span className="absolute top-1.5 -left-[21px] size-2.5 rounded-full bg-primary" />
            <p className="font-ui text-[11px] font-bold tracking-wide text-primary uppercase">
              {t.date}
            </p>
            <p className="mt-1 text-sm leading-relaxed">{t.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
