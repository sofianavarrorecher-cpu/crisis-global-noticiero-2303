import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NewsCard } from "@/components/site/NewsCard";
import { articles, sectionName } from "@/data/news";

type SearchParams = { q?: string };

export const Route = createFileRoute("/buscar")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
  head: () => ({
    meta: [
      { title: "Buscar notas — Crisis Global" },
      {
        name: "description",
        content:
          "Buscador de coberturas de Crisis Global sobre conflictos armados, derechos humanos y crisis humanitarias.",
      },
      { property: "og:title", content: "Buscar notas — Crisis Global" },
      {
        property: "og:description",
        content: "Encontrá coberturas por conflicto, país o tema.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/buscar" },
    ],
    links: [{ rel: "canonical", href: "/buscar" }],
  }),
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const term = q.trim().toLowerCase();
  const results = term
    ? articles.filter((a) =>
        [a.title, a.copete, a.category, sectionName(a.section)]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
    : [];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl sm:text-4xl">
          {term ? `Resultados para “${q}”` : "Buscar notas"}
        </h1>
        <p className="font-ui mt-2 text-xs text-muted-foreground">
          {term
            ? `${results.length} nota${results.length === 1 ? "" : "s"} encontrada${results.length === 1 ? "" : "s"}`
            : "Usá el buscador del encabezado para encontrar coberturas por país, conflicto o tema."}
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
