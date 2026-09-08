import { createFileRoute, Link } from "@tanstack/react-router";
import { HandHeart, Megaphone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionTitle } from "@/components/site/Sidebar";
import { TopicFeed } from "@/components/site/LiveFeed";
import { WeatherWidget } from "@/components/site/WeatherWidget";
import { getLiveTopic, liveTopics } from "@/data/live-topics";

type SearchParams = { t?: string };

export const Route = createFileRoute("/en-vivo")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    t:
      typeof search["t"] === "string" && getLiveTopic(search["t"] as string)
        ? (search["t"] as string)
        : "crisis-humanitarias",
  }),
  component: LivePage,
  head: () => ({
    meta: [
      { title: "En vivo — Actualizaciones diarias | Crisis Global" },
      {
        name: "description",
        content:
          "Noticias en vivo de fuentes verificadas (ONU, HRW, Amnistía, OCHA) sobre el Congo, Gaza, Irán, Afganistán, crisis climáticas y humanitarias, con guías de acción y organizaciones a las que donar.",
      },
      { property: "og:title", content: "En vivo — Crisis Global" },
      {
        property: "og:description",
        content: "Actualizaciones diarias de conflictos y crisis globales con fuentes verificadas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/en-vivo" },
    ],
    links: [{ rel: "canonical", href: "/en-vivo" }],
  }),
});

function LivePage() {
  const { t = "crisis-humanitarias" } = Route.useSearch();
  const topic = getLiveTopic(t) ?? liveTopics[0]!;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <header className="border-b-4 border-border-strong pb-4">
          <p className="kicker text-breaking">
            <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-breaking align-middle" />
            En vivo · actualización automática
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl">Actualizaciones diarias</h1>
          <p className="article-body mt-2 max-w-3xl text-muted-foreground">
            Titulares que llegan de forma automática desde los feeds públicos de Noticias ONU,
            Human Rights Watch, Amnistía Internacional, ReliefWeb (OCHA), PNUMA y del agregador
            público de Google News en español. Los enlaces abren la nota original en el sitio del
            medio u organismo.
          </p>
        </header>

        <nav aria-label="Temas en vivo" className="-mx-4 mt-4 overflow-x-auto px-4">
          <ul className="flex w-max gap-2 border-b border-border pb-3 lg:w-full lg:flex-wrap">
            {liveTopics.map((tp) => (
              <li key={tp.id}>
                <Link
                  to="/en-vivo"
                  search={{ t: tp.id }}
                  className={`kicker inline-block border px-3 py-1.5 whitespace-nowrap transition-colors ${
                    tp.id === topic.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface hover:border-primary hover:text-primary"
                  }`}
                >
                  {tp.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-3xl sm:text-4xl">{topic.name}</h2>

            <section className="mt-4 border-l-4 border-breaking bg-muted p-4">
              <p className="kicker text-breaking">Contexto editorial de Crisis Global</p>
              <div className="mt-2 space-y-2 text-sm leading-relaxed">
                {topic.editorial.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <div className="mt-6">
              <SectionTitle>Últimas noticias</SectionTitle>
              <TopicFeed topic={topic.id} />
            </div>
          </div>

          <aside className="space-y-8">
            <WeatherWidget />

            <section>
              <SectionTitle>
                <Megaphone className="mr-1 inline size-3.5" /> Qué podés hacer
              </SectionTitle>
              <ul className="space-y-2 text-sm leading-relaxed">
                {topic.actions.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">▸</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionTitle>
                <HandHeart className="mr-1 inline size-3.5" /> Organizaciones confiables
              </SectionTitle>
              <ul className="divide-y divide-border">
                {topic.orgs.map((o) => (
                  <li key={o.url} className="py-2.5">
                    <a
                      href={o.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-headline text-[15px] font-bold hover:text-primary"
                    >
                      {o.name}
                    </a>
                    <p className="font-ui mt-0.5 text-[11px] text-muted-foreground">{o.what}</p>
                  </li>
                ))}
              </ul>
              <p className="font-ui mt-3 text-[11px] text-muted-foreground">
                Antes de donar, verificá el sitio oficial y su registro en evaluadores
                independientes (Charity Navigator, GiveWell, Animal Charity Evaluators).
              </p>
            </section>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
