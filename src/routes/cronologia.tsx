import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CategoryTag } from "@/components/site/NewsCard";
import { globalTimeline } from "@/data/news";

export const Route = createFileRoute("/cronologia")({
  component: CronologiaPage,
  head: () => ({
    meta: [
      { title: "Cronología global de conflictos — Crisis Global" },
      {
        name: "description",
        content:
          "Línea de tiempo con los hechos clave de los conflictos cubiertos: Afganistán, Gaza, Congo, Irán-EE.UU., Venezuela, Cuerno de África y crisis del agua.",
      },
      { property: "og:title", content: "Cronología global de conflictos — Crisis Global" },
      {
        property: "og:description",
        content: "Los hechos más importantes de todos los conflictos, ordenados cronológicamente.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/cronologia" },
    ],
    links: [{ rel: "canonical", href: "/cronologia" }],
  }),
});

function CronologiaPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <header className="border-b-4 border-border-strong pb-4">
          <h1 className="text-4xl sm:text-5xl">Cronología general</h1>
          <p className="article-body mt-2 text-muted-foreground">
            Los hechos más importantes de todos los conflictos cubiertos por este medio,
            ordenados de forma cronológica.
          </p>
        </header>

        <ol className="mt-8 border-l-2 border-border pl-6">
          {globalTimeline.map((t, i) => (
            <li key={i} className="relative pb-8 last:pb-0">
              <span className="absolute top-2 -left-[29px] size-3 rounded-full bg-primary" />
              <p className="font-ui text-xs font-bold tracking-wide text-primary uppercase">
                {t.date}
              </p>
              <p className="article-body mt-1">{t.text}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <CategoryTag>{t.category}</CategoryTag>
                <Link
                  to="/nota/$slug"
                  params={{ slug: t.slug }}
                  className="font-ui text-[11px] text-muted-foreground underline underline-offset-4 hover:text-primary"
                >
                  {t.article}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </div>
  );
}
