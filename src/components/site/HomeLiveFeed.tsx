import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { getDailyUpdates } from "@/lib/live-news.functions";
import { relativeTime } from "@/components/site/LiveFeed";
import type { LiveItem } from "@/lib/live-news.server";

/** Temas que integran la portada de actualizaciones diarias. */
export const HOME_TOPICS = [
  "congo",
  "israel-palestina",
  "iran-eeuu",
  "afganistan",
  "cuerno-de-africa",
  "crisis-humanitarias",
  "crisis-ambientales",
  "nestle-agua",
  "voto-por-hogar",
  "accion-climatica",
  "derechos-animales",
  "onu",
] as const;

function HomeItem({ item }: { item: LiveItem }) {
  return (
    <li className="border-b border-border py-2.5 last:border-b-0">
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
        <p className="font-ui flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] text-muted-foreground">
          {item.trusted && <ShieldCheck className="size-3 shrink-0 text-primary" />}
          <span className={item.trusted ? "font-semibold text-primary" : ""}>{item.source}</span>
          <span>· {relativeTime(item.publishedAt)}</span>
        </p>
        <h3 className="font-headline mt-1 break-words text-[14px] leading-snug font-bold line-clamp-2 group-hover:text-primary">
          {item.title}
          <ExternalLink className="ml-1 inline size-3 shrink-0 text-muted-foreground" />
        </h3>
      </a>
    </li>
  );
}

export function HomeLiveFeed() {
  const fetchDaily = useServerFn(getDailyUpdates);
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["home-daily-updates"],
    queryFn: () => fetchDaily({ data: { ids: [...HOME_TOPICS] as string[] } }),
    staleTime: 15 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
  });

  const topics = data ?? [];

  return (
    <section className="mt-14 border-y-4 border-border-strong bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-border pb-4">
          <div>
            <p className="kicker flex items-center gap-2 text-breaking">
              <span className="inline-block size-2 animate-pulse rounded-full bg-breaking" />
              En vivo · fuentes verificadas
            </p>
            <h2 className="mt-1 font-headline text-2xl font-bold sm:text-3xl">
              Actualizaciones diarias
            </h2>
          </div>
          <Link
            to="/en-vivo"
            className="font-ui mb-1 inline-flex items-center gap-1 text-xs font-semibold text-primary underline underline-offset-4"
          >
            Ver todas en la sección En vivo <ArrowRight className="size-3.5" />
          </Link>
        </header>

        {isPending && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 w-2/3 animate-pulse bg-muted" />
                {Array.from({ length: 3 }).map((__, j) => (
                  <div key={j} className="h-4 w-full animate-pulse bg-muted" />
                ))}
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="mt-6 border border-border bg-background p-4">
            <p className="font-ui text-xs">No se pudieron cargar las actualizaciones en vivo.</p>
            <button
              onClick={() => refetch()}
              className="font-ui mt-2 bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              Reintentar
            </button>
          </div>
        )}

        {!isPending && !isError && topics.length === 0 && (
          <p className="font-ui mt-6 border border-border bg-background p-4 text-xs text-muted-foreground">
            Las fuentes consultadas no tienen noticias recientes en este momento. Volvé a revisar
            más tarde.
          </p>
        )}

        {!isPending && !isError && topics.length > 0 && (
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((group) => (
              <article key={group.slug} className="flex min-w-0 flex-col bg-surface p-4">
                <header className="flex items-baseline justify-between gap-2 border-b-2 border-border-strong pb-2">
                  <h3 className="kicker text-primary">{group.topic}</h3>
                  <span className="font-ui flex shrink-0 items-center gap-1 text-[10px] font-semibold text-breaking">
                    <span className="inline-block size-1.5 rounded-full bg-breaking" />
                    {group.items.length}
                  </span>
                </header>
                <ul className="mt-1 min-w-0 flex-1">
                  {group.items.map((it) => (
                    <HomeItem key={it.url} item={it} />
                  ))}
                </ul>
                <Link
                  to="/en-vivo"
                  search={{ t: group.slug }}
                  className="font-ui mt-2 inline-flex items-center gap-1 self-start text-[11px] font-semibold text-primary underline underline-offset-4"
                >
                  {group.topic.toLowerCase()} <ArrowRight className="size-3" />
                </Link>
              </article>
            ))}
          </div>
        )}

        <p className="font-ui mt-4 flex items-start gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
          <span>
            Noticias automáticas de Noticias ONU, HRW, Amnistía Internacional, ReliefWeb (OCHA),
            PNUMA y el agregador público de Google News. El escudo marca organismos o agencias
            verificadas; los enlaces abren la nota original.
          </span>
        </p>
      </div>
    </section>
  );
}
