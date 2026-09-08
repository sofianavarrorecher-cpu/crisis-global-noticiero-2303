import { liveTopics, type LiveTopic } from "@/data/live-topics";

export type LiveItem = {
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO
  trusted: boolean;
  description?: string;
};

type Feed = { name: string; url: string; trusted: boolean; lang: "es" | "en" };

/** Feeds oficiales de organismos confiables. */
const ORG_FEEDS: Feed[] = [
  { name: "Noticias ONU", url: "https://news.un.org/feed/subscribe/es/news/all/rss.xml", trusted: true, lang: "es" },
  { name: "Human Rights Watch", url: "https://www.hrw.org/es/rss/news", trusted: true, lang: "es" },
  { name: "Amnistía Internacional", url: "https://www.amnesty.org/es/feed/", trusted: true, lang: "es" },
  { name: "ReliefWeb (OCHA)", url: "https://reliefweb.int/updates/rss.xml", trusted: true, lang: "en" },
  { name: "UN Press", url: "https://press.un.org/en/rss.xml", trusted: true, lang: "en" },
  { name: "PNUMA", url: "https://www.unep.org/rss.xml", trusted: true, lang: "en" },
];

const TRUSTED_DOMAINS = [
  "un.org",
  "hrw.org",
  "amnesty.org",
  "reliefweb.int",
  "unhcr.org",
  "acnur.org",
  "unicef.org",
  "who.int",
  "paho.org",
  "unocha.org",
  "ochaopt.org",
  "msf.org",
  "icrc.org",
  "wfp.org",
  "unep.org",
  "iaea.org",
  "unwomen.org",
  "reuters.com",
  "apnews.com",
  "efe.com",
  "bbc.com",
  "elpais.com",
  "dw.com",
  "france24.com",
  "aljazeera.com",
];

const CACHE_TTL_MS = 20 * 60 * 1000;
const cache = new Map<string, { at: number; items: LiveItem[] }>();
const feedCache = new Map<string, { at: number; text: string }>();

async function fetchText(url: string): Promise<string> {
  const hit = feedCache.get(url);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.text;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "CrisisGlobal/1.0 (+proyecto informativo)",
        accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    const text = await res.text();
    feedCache.set(url, { at: Date.now(), text });
    return text;
  } finally {
    clearTimeout(timer);
  }
}

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m?.[1] ?? "";
}

function parseRss(xml: string, fallbackSource: string, trusted: boolean): LiveItem[] {
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  const out: LiveItem[] = [];
  for (const b of blocks) {
    const rawTitle = decode(tag(b, "title"));
    const link = decode(tag(b, "link")) || (b.match(/<link[^>]*href="([^"]+)"/i)?.[1] ?? "");
    const pub = decode(tag(b, "pubDate") || tag(b, "dc:date") || tag(b, "updated"));
    const srcTag = decode(tag(b, "source"));
    const description = decode(tag(b, "description")).slice(0, 220);
    if (!rawTitle || !link) continue;

    // Google News: "Título - Medio"
    let title = rawTitle;
    let source = srcTag || fallbackSource;
    if (!srcTag) {
      const idx = rawTitle.lastIndexOf(" - ");
      if (idx > 20) {
        title = rawTitle.slice(0, idx);
        source = rawTitle.slice(idx + 3);
      }
    } else {
      const idx = rawTitle.lastIndexOf(` - ${srcTag}`);
      if (idx > 0) title = rawTitle.slice(0, idx);
    }

    const date = new Date(pub);
    const publishedAt = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
    const isTrusted =
      trusted ||
      TRUSTED_DOMAINS.some((d) => link.includes(d) || source.toLowerCase().includes(d.split(".")[0]!));
    out.push({ title, url: link, source, publishedAt, trusted: isTrusted, description: description || undefined });
  }
  return out;
}

function googleNewsUrl(topic: LiveTopic) {
  const q = `${topic.query} when:${topic.window}`;
  return `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=es-419&gl=AR&ceid=AR:es-419`;
}

function matches(item: LiveItem, topic: LiveTopic) {
  const hay = `${item.title} ${item.description ?? ""}`.toLowerCase();
  return topic.keywords.some((k) => hay.includes(k.toLowerCase()));
}

function dedupe(items: LiveItem[]) {
  const seen = new Set<string>();
  return items.filter((i) => {
    const key = i.title.toLowerCase().replace(/[^a-záéíóúñ0-9]/g, "").slice(0, 70);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function fetchTopicNews(topicId: string): Promise<{ items: LiveItem[]; fetchedAt: string }> {
  const topic = liveTopics.find((t) => t.id === topicId);
  if (!topic) throw new Error("Tema desconocido");

  const hit = cache.get(topicId);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
    return { items: hit.items, fetchedAt: new Date(hit.at).toISOString() };
  }

  const windowDays = Number(topic.window.replace("d", ""));
  const cutoff = Date.now() - Math.max(windowDays, 7) * 86_400_000;

  const [googleRes, ...orgRes] = await Promise.allSettled([
    fetchText(googleNewsUrl(topic)).then((x) => parseRss(x, "Agencias", false)),
    ...ORG_FEEDS.map((f) => fetchText(f.url).then((x) => parseRss(x, f.name, f.trusted))),
  ]);

  const google = googleRes.status === "fulfilled" ? googleRes.value : [];
  const orgs = orgRes
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((i) => matches(i, topic) && new Date(i.publishedAt).getTime() >= cutoff);

  const items = dedupe([...orgs, ...google])
    .sort((a, b) => {
      if (a.trusted !== b.trusted) return a.trusted ? -1 : 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 30);

  if (items.length > 0) cache.set(topicId, { at: Date.now(), items });
  return { items, fetchedAt: new Date().toISOString() };
}

/** Últimas noticias oficiales de Noticias ONU (para la portada). */
export async function fetchUnNews(limit = 6): Promise<LiveItem[]> {
  const key = `__un_${limit}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.items;
  const feed = ORG_FEEDS[0]!;
  const items = parseRss(await fetchText(feed.url), feed.name, true).slice(0, limit);
  if (items.length) cache.set(key, { at: Date.now(), items });
  return items;
}
