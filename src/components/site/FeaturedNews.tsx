import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { getArgentinaNews, getFeaturedNews } from "@/lib/featured-news.functions";
import { SectionTitle } from "@/components/site/Sidebar";
import { CategoryTag } from "@/components/site/NewsCard";
import { relativeTime } from "@/components/site/LiveFeed";

const FEEDS = {
  world: {
    title: "Lo último en el mundo",
    note: "Actualizado a diario · fotos con licencia libre (Wikimedia Commons / Openverse)",
    empty:
      "Todavía no hay noticias frescas de crisis relevantes en las fuentes consultadas. Volvé a revisar más tarde.",
    error: "No se pudieron cargar las noticias de última hora.",
  },
  argentina: {
    title: "Argentina",
    note: "Fuentes confiables · actualizado a diario · fotos con licencia libre",
    empty:
      "Todavía no hay noticias frescas de Argentina en las fuentes consultadas. Volvé a revisar más tarde.",
    error: "No se pudieron cargar las noticias de Argentina.",
  },
} as const;

export function FeaturedNews({ feed = "world" }: { feed?: keyof typeof FEEDS }) {
  const config = FEEDS[feed];
  const fetchFeed = useServerFn(feed === "argentina" ? getArgentinaNews : getFeaturedNews);
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["featured-news", feed],
    queryFn: () => fetchFeed(),
    staleTime: 30 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });

  const items = data ?? [];

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionTitle>{config.title}</SectionTitle>
        <p className="font-ui mb-3 text-[11px] text-muted-foreground">{config.note}</p>
      </div>

      {isPending && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-video w-full animate-pulse bg-muted" />
              <div className="h-4 w-24 animate-pulse bg-muted" />
              <div className="h-5 w-full animate-pulse bg-muted" />
              <div className="h-5 w-3/4 animate-pulse bg-muted" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="border border-border bg-muted p-4">
          <p className="font-ui text-xs">{config.error}</p>
          <button
            onClick={() => refetch()}
            className="font-ui mt-2 bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            Reintentar
          </button>
        </div>
      )}

      {!isPending && !isError && items.length === 0 && (
        <p className="font-ui border border-border bg-muted p-4 text-xs text-muted-foreground">
          {config.empty}
        </p>
      )}

      {!isPending && !isError && items.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="flex flex-col bg-surface">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 flex-col"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="aspect-video w-full object-cover"
                  />
                )}
                <p className="font-ui mt-1 text-[10px] leading-tight text-muted-foreground">
                  {item.imageCredit}
                </p>
                <div className="flex flex-1 flex-col pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CategoryTag>{item.category}</CategoryTag>
                    <span className="font-ui text-[10px] text-muted-foreground">{item.topic}</span>
                  </div>
                  <h3 className="mt-2 break-words text-lg leading-snug group-hover:text-primary">
                    {item.title}
                    <ExternalLink className="ml-1 inline size-3.5 shrink-0 text-muted-foreground" />
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {item.copete}
                  </p>
                  <p className="font-ui mt-auto pt-2 text-[11px] text-muted-foreground">
                    {item.trusted && (
                      <ShieldCheck className="mr-1 inline size-3.5 text-primary" aria-hidden />
                    )}
                    {item.source} · {relativeTime(item.publishedAt)}
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
