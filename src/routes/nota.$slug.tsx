import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CategoryTag, NewsCard } from "@/components/site/NewsCard";
import { MostRead, SectionTitle, Timeline } from "@/components/site/Sidebar";
import { articles, formatDate, getArticle, sectionName } from "@/data/news";

export const Route = createFileRoute("/nota/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  component: ArticlePage,
  head: ({ params, loaderData }) => {
    const a = loaderData?.article;
    const title = a ? `${a.title} — Crisis Global` : "Nota — Crisis Global";
    const description = a?.copete ?? "Cobertura de Crisis Global.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/nota/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/nota/${params.slug}` }],
      scripts: a
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: a.title,
                description: a.copete,
                datePublished: a.date,
                dateModified: a.updated,
                author: { "@type": "Organization", name: a.author },
                publisher: { "@type": "Organization", name: "Crisis Global" },
              }),
            },
          ]
        : [],
    };
  },
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <nav className="font-ui mb-4 text-[11px] text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Portada
          </Link>
          {" / "}
          <Link
            to="/seccion/$slug"
            params={{ slug: article.section }}
            className="hover:text-primary"
          >
            {sectionName(article.section)}
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article>
            <CategoryTag tone="breaking">{article.category}</CategoryTag>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl">{article.title}</h1>
            <p className="article-body mt-4 border-l-4 border-primary pl-4 text-muted-foreground">
              {article.copete}
            </p>
            <p className="font-ui mt-4 border-y border-border py-2 text-[11px] text-muted-foreground">
              Por <strong className="text-foreground">{article.author}</strong> ·{" "}
              {formatDate(article.date)} · Última actualización:{" "}
              {formatDate(article.updated)}
            </p>

            <img
              src={article.image}
              alt={article.imageAlt}
              width={1280}
              height={720}
              className="mt-5 aspect-video w-full object-cover"
            />
            <p className="font-ui mt-2 text-[11px] text-muted-foreground">
              {article.imageAlt}. Imagen ilustrativa.
            </p>

            <div className="article-body mt-6 space-y-5">
              {article.body.map((b, i) => {
                if (b.type === "h")
                  return (
                    <h2 key={i} className="pt-3 text-2xl">
                      {b.text}
                    </h2>
                  );
                if (b.type === "list")
                  return (
                    <ul key={i} className="list-disc space-y-2 pl-6">
                      {b.items.map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ul>
                  );
                if (b.type === "note")
                  return (
                    <p
                      key={i}
                      className="font-ui border-l-4 border-breaking bg-muted p-4 text-xs leading-relaxed"
                    >
                      {b.text}
                    </p>
                  );
                return <p key={i}>{b.text}</p>;
              })}
            </div>

            <section className="mt-10 border-2 border-border-strong bg-surface p-5">
              <h2 className="kicker text-breaking">Fuentes</h2>
              <ul className="font-ui mt-3 space-y-2 text-sm">
                {article.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-4"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="font-ui mt-4 text-[11px] text-muted-foreground">
                Las cifras citadas deben verificarse contra el último informe publicado por
                cada organismo.
              </p>
            </section>
          </article>

          <aside className="space-y-8">
            <Timeline items={article.timeline} />
            <MostRead />
          </aside>
        </div>

        <section className="mt-12">
          <SectionTitle>Otras coberturas</SectionTitle>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
