import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { getTopicNews, getUnHeadlines } from "@/lib/live-news.functions";
import { SectionTitle } from "@/components/site/Sidebar";
import type { LiveItem } from "@/lib/live-news.server";

export function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60_000);
  if (m < 60) return `hace ${Math.max(m, 1)} min`;
  const h = Math.round(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  return d === 1 ? "ayer" : `hace ${d} días`;
}

export function LiveItemRow({ item }: { item: LiveItem }) {
  return (
    <li className="py-3">
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
        <p className="font-ui flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          <span className={item.trusted ? "font-semibold text-primary" : ""}>
            {item.trusted && <ShieldCheck className="mr-1 inline size-3" />}
            {item.source}
          </span>
          <span>· {relativeTime(item.publishedAt)}</span>
        </p>
        <h3 className="mt-1 text-lg leading-snug group-hover:text-primary">
          {item.title}
          <ExternalLink className="ml-1 inline size-3.5 text-muted-foreground" />
        </h3>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        )}
      </a>
    </li>
  );
}

export function TopicFeed({ topic }: { topic: string }) {
  const fetchNews = useServerFn(getTopicNews);
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["live-news", topic],
    queryFn: () => fetchNews({ data: { topic } }),
    staleTime: 15 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
  });

  if (isPending) {
    return (
      <ul className="divide-y divide-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="py-3">
            <div className="h-3 w-32 animate-pulse bg-muted" />
            <div className="mt-2 h-5 w-full animate-pulse bg-muted" />
            <div className="mt-1 h-5 w-3/4 animate-pulse bg-muted" />
          </li>
        ))}
      </ul>
    );
  }

  if (isError) {
    return (
      <div className="border border-border bg-muted p-4">
        <p className="font-ui text-xs">No se pudieron cargar las noticias en vivo.</p>
        <button
          onClick={() => refetch()}
          className="font-ui mt-2 bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <p className="font-ui border border-border bg-muted p-4 text-xs text-muted-foreground">
        No hay noticias recientes para este tema en las fuentes consultadas. Volvé a revisar más
        tarde.
      </p>
    );
  }

  return (
    <div>
      <p className="font-ui mb-1 text-[11px] text-muted-foreground">
        {data.items.length} noticias · actualizado {relativeTime(data.fetchedAt)} ·{" "}
        <ShieldCheck className="inline size-3 text-primary" /> = organismo o agencia verificada
      </p>
      <ul className="divide-y divide-border">
        {data.items.map((it) => (
          <LiveItemRow key={it.url} item={it} />
        ))}
      </ul>
    </div>
  );
}

export function UnHeadlines() {
  const fetchUn = useServerFn(getUnHeadlines);
  const { data } = useQuery({
    queryKey: ["un-headlines"],
    queryFn: () => fetchUn(),
    staleTime: 15 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
  });

  return (
    <section>
      <SectionTitle>Último de Noticias ONU</SectionTitle>
      {!data ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full animate-pulse bg-muted" />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {data.map((it) => (
            <li key={it.url} className="py-2.5">
              <a
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-headline block text-[15px] leading-snug font-bold hover:text-primary"
              >
                {it.title}
              </a>
              <p className="font-ui mt-0.5 text-[11px] text-muted-foreground">
                {relativeTime(it.publishedAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/en-vivo"
        search={{ t: "onu" }}
        className="font-ui mt-3 inline-block text-xs font-semibold text-primary underline underline-offset-4"
      >
        Ver todas las actualizaciones en vivo →
      </Link>
    </section>
  );
}
