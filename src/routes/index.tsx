import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NewsCard } from "@/components/site/NewsCard";
import { MostRead, SectionTitle, Timeline } from "@/components/site/Sidebar";
import { articles, globalTimeline, sections } from "@/data/news";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Crisis Global — Noticias de conflictos y derechos humanos" },
      {
        name: "description",
        content:
          "Portal informativo sobre conflictos armados, derechos humanos y crisis globales poco cubiertas: Gaza, Congo, Afganistán, Irán, Venezuela y agua dulce.",
      },
      { property: "og:title", content: "Crisis Global — Conflictos y derechos humanos" },
      {
        property: "og:description",
        content:
          "Coberturas verificables sobre Gaza, el este del Congo, Afganistán, Irán-EE.UU., Venezuela y la crisis del agua dulce.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [hero, ...rest] = articles;
  const secondary = rest.slice(0, 2);
  const grid = rest.slice(2);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="sr-only">Crisis Global — portada de noticias internacionales</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            {hero && <NewsCard article={hero} variant="hero" />}

            <div className="mt-8 space-y-6 border-t border-border-strong pt-6">
              {secondary.map((a) => (
                <NewsCard key={a.slug} article={a} variant="secondary" />
              ))}
            </div>
          </div>

          <aside className="space-y-8">
            <MostRead />
            {hero && <Timeline items={hero.timeline} title="Cronología del conflicto" />}
            <section>
              <SectionTitle>Secciones</SectionTitle>
              <ul className="divide-y divide-border">
                {sections.map((s) => (
                  <li key={s.slug} className="py-2">
                    <Link
                      to="/seccion/$slug"
                      params={{ slug: s.slug }}
                      className="font-ui text-xs font-semibold hover:text-primary"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <section className="mt-12">
          <SectionTitle>Todas las coberturas</SectionTitle>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionTitle>Cronología general</SectionTitle>
          <Timeline items={globalTimeline.slice(-6)} title="Últimos hechos registrados" />
          <Link
            to="/cronologia"
            className="font-ui mt-4 inline-block bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            Ver cronología completa
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
