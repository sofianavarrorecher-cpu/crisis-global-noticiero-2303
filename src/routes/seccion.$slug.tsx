import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NewsCard } from "@/components/site/NewsCard";
import { MostRead, SectionTitle } from "@/components/site/Sidebar";
import { articlesBySection, getSection } from "@/data/news";

export const Route = createFileRoute("/seccion/$slug")({
  loader: ({ params }) => {
    const section = getSection(params.slug);
    if (!section) throw notFound();
    return { section, articles: articlesBySection(params.slug) };
  },
  component: SectionPage,
  head: ({ params, loaderData }) => {
    const s = loaderData?.section;
    const title = s ? `${s.name} — Crisis Global` : "Sección — Crisis Global";
    const description = s?.description ?? "Coberturas por sección en Crisis Global.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/seccion/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/seccion/${params.slug}` }],
    };
  },
});

function SectionPage() {
  const { section, articles } = Route.useLoaderData();
  const [lead, ...rest] = articles;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <header className="border-b-4 border-border-strong pb-4">
          <h1 className="text-4xl sm:text-5xl">{section.name}</h1>
          <p className="article-body mt-2 max-w-2xl text-muted-foreground">
            {section.description}
          </p>
        </header>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {lead && <NewsCard article={lead} variant="hero" />}
            {rest.map((a) => (
              <NewsCard key={a.slug} article={a} variant="secondary" />
            ))}
            {articles.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Todavía no hay notas publicadas en esta sección.
              </p>
            )}
          </div>
          <aside className="space-y-8">
            <MostRead />
            <section>
              <SectionTitle>Metodología</SectionTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Cada nota cierra con los organismos citados. Las cifras que cambian con
                frecuencia se señalan de forma explícita para que se verifiquen contra la
                fuente original.
              </p>
            </section>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
