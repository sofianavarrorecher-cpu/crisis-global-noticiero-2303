export type FeaturedItem = {
  id: string;
  title: string;
  copete: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
  topic: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  trusted?: boolean;
};

type FeaturedTopic = {
  id: string;
  query: string;
  imageQuery: string;
  topicLabel: string;
  category: string;
  positiveTerms: string[];
  mkt?: string;
  engine?: "google";
};

/** Temas de crisis relevantes a nivel mundial. */
const TOPICS: FeaturedTopic[] = [
  {
    id: "congo",
    query: "Congo M23 crisis",
    imageQuery: "Goma North Kivu city",
    topicLabel: "República Democrática del Congo",
    category: "Conflicto Armado",
    positiveTerms: ["goma", "kivu", "congo", "city", "vista"],
  },
  {
    id: "gaza",
    query: "Gaza Cisjordania",
    imageQuery: "Gaza City view",
    topicLabel: "Israel y Palestina",
    category: "Conflicto Armado",
    positiveTerms: ["gaza", "city", "skyline", "beach", "view"],
  },
  {
    id: "iran",
    query: "Irán Estados Unidos",
    imageQuery: "Strait of Hormuz",
    topicLabel: "Irán y Estados Unidos",
    category: "Geopolítica",
    positiveTerms: ["hormuz", "strait", "ship", "tanker", "gulf"],
  },
  {
    id: "afganistan",
    query: "Afganistán talibán",
    imageQuery: "Kabul city Afghanistan",
    topicLabel: "Afganistán",
    category: "Derechos Humanos",
    positiveTerms: ["kabul", "city", "street", "view"],
  },
  {
    id: "sudan",
    query: "Sudán conflicto",
    imageQuery: "Khartoum Sudan city",
    topicLabel: "Sudán",
    category: "Crisis Humanitaria",
    positiveTerms: ["khartoum", "city", "nile", "market"],
  },
  {
    id: "cuerno",
    query: "Somalia Etiopía",
    imageQuery: "Mogadishu Somalia",
    topicLabel: "Cuerno de África",
    category: "Crisis Humanitaria",
    positiveTerms: ["mogadishu", "city", "coast", "view"],
  },
  {
    id: "venezuela",
    query: "Venezuela crisis",
    imageQuery: "Caracas Venezuela cityscape",
    topicLabel: "Venezuela",
    category: "América",
    positiveTerms: ["caracas", "city", "skyline", "avila"],
  },
  {
    id: "clima",
    query: "crisis climática desastre natural",
    imageQuery: "flooded street town",
    topicLabel: "Crisis climática",
    category: "Medio Ambiente",
    positiveTerms: ["flood", "water", "street", "town", "river"],
  },
  {
    id: "agua",
    query: "escasez de agua sequía",
    imageQuery: "drought cracked lake bed",
    topicLabel: "Crisis del agua",
    category: "Medio Ambiente",
    positiveTerms: ["drought", "dry", "lake", "reservoir", "cracked"],
  },
];

/** Medios argentinos confiables: priorizan los resultados de la sección Argentina. */
const ARG_TRUSTED = [
  "argentina.gob.ar",
  "telam.com.ar",
  "infobae.com",
  "clarin.com",
  "lanacion.com.ar",
  "ambito.com",
  "cronista.com",
  "pagina12.com.ar",
  "cadenaser.com",
  "perf.com.ar",
  "iprofesional.com",
  "tn.com.ar",
  "chequeado.com",
];

/** Temas de actualidad argentina (API pública de Bing News, mercado es-ar). */
const ARG_TOPICS: FeaturedTopic[] = [
  {
    id: "ar-politica",
    query: "Argentina gobierno política",
    mkt: "es-ar",
    imageQuery: "Casa Rosada Buenos Aires",
    topicLabel: "Argentina",
    category: "Política",
    positiveTerms: ["casa", "rosada", "congreso", "palacio"],
  },
  {
    id: "ar-economia",
    query: "economía Argentina empleo inflación comercio",
    mkt: "es-ar",
    imageQuery: "Obelisco Buenos Aires",
    topicLabel: "Argentina",
    category: "Economía",
    positiveTerms: ["obelisco", "buenos", "aires", "avenida"],
  },
  {
    id: "ar-ambiente",
    query: "lluvias inundaciones sequía Argentina",
    mkt: "es-ar",
    imageQuery: "Andes Mendoza mountains",
    topicLabel: "Argentina",
    category: "Clima y Ambiente",
    positiveTerms: ["andes", "mendoza", "mountain", "sierra"],
  },
  {
    id: "ar-energia",
    query: "energía Argentina gas electricidad YPF",
    mkt: "es-ar",
    imageQuery: "Patagonia Argentina landscape",
    topicLabel: "Argentina",
    category: "Energía",
    positiveTerms: ["patagonia", "lake", "landscape", "bariloche"],
  },
  {
    id: "ar-sociedad",
    query: "salud educación seguridad Argentina",
    mkt: "es-ar",
    imageQuery: "Buenos Aires street",
    topicLabel: "Argentina",
    category: "Sociedad",
    positiveTerms: ["buenos", "street", "avenida", "calle"],
  },
  {
    id: "ar-oficial",
    query: "site:argentina.gob.ar",
    engine: "google",
    imageQuery: "Buenos Aires monument flag",
    topicLabel: "Argentina",
    category: "Gobierno",
    positiveTerms: ["bandera", "monument", "flag", "rosario"],
  },
];

const NEWS_TTL_MS = 60 * 60 * 1000;
const IMAGE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const UA = "CrisisGlobal/1.0 (+proyecto informativo educativo)";

const newsCache = new Map<string, { at: number; items: FeaturedItem[] }>();
const textCache = new Map<string, { at: number; text: string }>();
const imagePoolCache = new Map<string, { at: number; pool: ImageCandidate[] }>();

type ImageCandidate = { url: string; alt: string; credit: string };

/** Palabras que indican imágenes demasiado sensibles o gráficas. */
const SENSITIVE =
  /(massacre|ejecuc|asesin|cad[aá]ver|balas|bombardeo|herid[oa]|sangre|muert[oa]s? |killed|dead body|bodies|funeral|wounded|tortur|starv|refugee camp child|Graphic)/i;

async function fetchText(url: string): Promise<string> {
  const hit = textCache.get(url);
  if (hit && Date.now() - hit.at < NEWS_TTL_MS) return hit.text;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": UA, accept: "application/rss+xml, application/xml, text/xml, */*" },
    });
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    const text = await res.text();
    textCache.set(url, { at: Date.now(), text });
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

/** Bing News envía el enlace real en el parámetro "url" del redirect. */
function resolveNewsUrl(link: string): string {
  try {
    const u = new URL(link);
    const inner = u.searchParams.get("url");
    if (inner && /^https?:\/\//i.test(inner)) return inner;
  } catch {
    /* link no es URL válida */
  }
  return link;
}

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Medio";
  }
}

function fallbackCopete(topic: FeaturedTopic, source: string) {
  return `Nuevas señales sobre ${topic.topicLabel.toLowerCase()}. La información se republica desde ${source} y se actualiza a diario en Crisis Global.`;
}

type RawNews = { title: string; copete: string; url: string; source: string; publishedAt: string };

function parseNewsRss(xml: string, topic: FeaturedTopic, fallbackSource: string): RawNews[] {
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  const out: RawNews[] = [];
  for (const b of blocks) {
    const rawTitle = decode(tag(b, "title"));
    const rawLink = decode(tag(b, "link"));
    if (!rawTitle || !rawLink) continue;
    const url = resolveNewsUrl(rawLink);
    const srcTag = decode(tag(b, "source"));
    const source = srcTag || fallbackSource || hostnameOf(url);
    const description = decode(tag(b, "description"));
    const pub = decode(tag(b, "pubDate") || tag(b, "dc:date") || tag(b, "updated"));
    const date = new Date(pub);
    const publishedAt = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
    const copete =
      description && description.toLowerCase() !== rawTitle.toLowerCase()
        ? description.slice(0, 240)
        : fallbackCopete(topic, source);
    out.push({ title: rawTitle, copete, url, source, publishedAt });
  }
  return out;
}

function bingNewsUrl(query: string, mkt?: string) {
  return (
    `https://www.bing.com/news/search?q=${encodeURIComponent(query)}` +
    `&format=rss&setlang=es${mkt ? `&setmkt=${encodeURIComponent(mkt)}` : ""}`
  );
}

function googleNewsUrl(query: string) {
  return `https://news.google.com/rss/search?q=${encodeURIComponent(`${query} when:3d`)}&hl=es-419&gl=AR&ceid=AR:es-419`;
}

function normalizeKey(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-záéíóúñ0-9]/g, "")
    .slice(0, 70);
}

const ALLOWED_LICENSE = /^(CC0|CC BY|CC BY-SA|Public domain|PDM|No restrictions)/i;

async function commonsPool(query: string): Promise<ImageCandidate[]> {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*" +
    `&generator=search&gsrsearch=${encodeURIComponent(`filemime:image/jpeg ${query}`)}` +
    "&gsrnamespace=6&gsrlimit=14&prop=imageinfo&iiprop=url%7Csize%7Cextmetadata&iiurlwidth=1280";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": UA, accept: "application/json" },
    });
    if (!res.ok) throw new Error(`commons -> ${res.status}`);
    const json = (await res.json()) as {
      query?: { pages?: Record<string, PageInfo> };
    };
    const pages = Object.values(json.query?.pages ?? {});
    const pool: (ImageCandidate & { score: number })[] = [];
    for (const p of pages) {
      const info = p.imageinfo?.[0];
      if (!info?.thumburl || !info.width || info.width < 900 || info.width <= info.height * 0.9)
        continue;
      const meta = info.extmetadata ?? {};
      const license = (meta.LicenseShortName?.value ?? "").trim();
      if (!ALLOWED_LICENSE.test(license)) continue;
      const title = p.title.replace(/^File:/, "");
      if (SENSITIVE.test(title)) continue;
      const artist = decode(meta.Artist?.value ?? "")
        .replace(/\s+/g, " ")
        .slice(0, 60);
      const thumb = info.thumburl.split("?")[0]!;
      const lower = title.toLowerCase();
      const score = query
        .toLowerCase()
        .split(/\s+/)
        .reduce((acc, w) => acc + (lower.includes(w) ? 2 : 0), 0);
      pool.push({
        url: thumb,
        alt: title.replace(/\.[a-z]{3,4}$/i, "").replace(/_/g, " "),
        credit: `Foto: ${artist || "Wikimedia Commons"} · Wikimedia Commons · ${license}`,
        score,
      });
    }
    return pool.sort((a, b) => b.score - a.score).slice(0, 4);
  } finally {
    clearTimeout(timer);
  }
}

type PageInfo = {
  title: string;
  imageinfo?: {
    thumburl?: string;
    width?: number;
    height?: number;
    extmetadata?: Record<string, { value?: string }>;
  }[];
};

async function openversePool(query: string): Promise<ImageCandidate[]> {
  const url =
    `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}` +
    "&page_size=10&license=cc0,pdm,by,by-sa&extension=jpg&category=photograph";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": UA, accept: "application/json" },
    });
    if (!res.ok) throw new Error(`openverse -> ${res.status}`);
    const json = (await res.json()) as {
      results?: {
        url?: string;
        title?: string;
        creator?: string;
        license?: string;
        license_version?: string;
      }[];
    };
    return (json.results ?? [])
      .filter((r) => r.url && r.title && !SENSITIVE.test(r.title))
      .slice(0, 4)
      .map((r) => ({
        url: r.url!,
        alt: r.title!,
        credit:
          `Foto: ${r.creator || "Openverse"} · Openverse · ${r.license} ${r.license_version ?? ""}`.trim(),
      }));
  } finally {
    clearTimeout(timer);
  }
}

async function getPool(topic: FeaturedTopic): Promise<ImageCandidate[]> {
  const hit = imagePoolCache.get(topic.id);
  if (hit && Date.now() - hit.at < IMAGE_TTL_MS) return hit.pool;
  let pool: ImageCandidate[] = [];
  try {
    pool = await commonsPool(topic.imageQuery);
  } catch {
    pool = [];
  }
  if (pool.length === 0) {
    try {
      pool = await openversePool(topic.imageQuery);
    } catch {
      pool = [];
    }
  }
  imagePoolCache.set(topic.id, { at: Date.now(), pool });
  return pool;
}

async function fetchTopicRaw(topic: FeaturedTopic): Promise<RawNews[]> {
  if (topic.engine === "google") {
    try {
      return parseNewsRss(await fetchText(googleNewsUrl(topic.query)), topic, "Agencias");
    } catch {
      return [];
    }
  }
  let raw: RawNews[] = [];
  try {
    raw = parseNewsRss(await fetchText(bingNewsUrl(topic.query, topic.mkt)), topic, "Bing News");
  } catch {
    raw = [];
  }
  if (raw.length < 2) {
    try {
      const google = parseNewsRss(await fetchText(googleNewsUrl(topic.query)), topic, "Agencias");
      raw = [...raw, ...google];
    } catch {
      /* sin respaldo */
    }
  }
  return raw;
}

function isArgTrusted(url: string, source?: string) {
  const haystack = `${url} ${source ?? ""}`.toLowerCase();
  return ARG_TRUSTED.some((d) => haystack.includes(d));
}

async function collectFeatured(
  topics: FeaturedTopic[],
  cacheKey: string,
  limit: number,
  preferTrusted = false,
): Promise<FeaturedItem[]> {
  const hit = newsCache.get(cacheKey);
  if (hit && Date.now() - hit.at < NEWS_TTL_MS) return hit.items;

  const settled = await Promise.allSettled(topics.map(fetchTopicRaw));

  const maxAge = Date.now() - 3 * 24 * 60 * 60 * 1000;
  const seen = new Set<string>();
  const candidates: { topic: FeaturedTopic; news: RawNews; trusted: boolean }[] = [];
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i]!;
    const res = settled[i];
    if (res.status !== "fulfilled") continue;
    const fresh = res.value
      .filter((n) => new Date(n.publishedAt).getTime() >= maxAge)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3);
    for (const news of fresh) {
      const key = normalizeKey(news.title);
      if (seen.has(key)) continue;
      seen.add(key);
      candidates.push({ topic, news, trusted: isArgTrusted(news.url, news.source) });
    }
  }

  candidates.sort((a, b) => {
    if (preferTrusted && a.trusted !== b.trusted) return a.trusted ? -1 : 1;
    return new Date(b.news.publishedAt).getTime() - new Date(a.news.publishedAt).getTime();
  });

  const perTopic = new Map<string, number>();
  const picked: { topic: FeaturedTopic; news: RawNews; trusted: boolean }[] = [];
  for (const c of candidates) {
    if (picked.length >= limit) break;
    const n = perTopic.get(c.topic.id) ?? 0;
    if (n >= 2) continue;
    perTopic.set(c.topic.id, n + 1);
    picked.push(c);
  }

  const pools = new Map<string, ImageCandidate[]>();
  await Promise.all(
    [...new Set(picked.map((p) => p.topic.id))].map(async (id) => {
      const topic = topics.find((t) => t.id === id)!;
      pools.set(id, await getPool(topic));
    }),
  );

  const poolIndex = new Map<string, number>();
  const items: FeaturedItem[] = picked.map(({ topic, news, trusted }) => {
    const pool = pools.get(topic.id) ?? [];
    const idx = poolIndex.get(topic.id) ?? 0;
    poolIndex.set(topic.id, idx + 1);
    const img = pool[pool.length > 0 ? idx % pool.length : 0];
    return {
      id: `${topic.id}-${normalizeKey(news.title).slice(0, 40)}`,
      title: news.title,
      copete: news.copete,
      url: news.url,
      source: news.source,
      publishedAt: news.publishedAt,
      category: topic.category,
      topic: topic.topicLabel,
      image: img?.url ?? "",
      imageAlt: img?.alt ?? topic.topicLabel,
      imageCredit: img?.credit ?? "Sin imagen disponible",
      ...(preferTrusted ? { trusted } : {}),
    };
  });

  if (items.length > 0) newsCache.set(cacheKey, { at: Date.now(), items });
  return items;
}

/**
 * Trae noticias de crisis relevantes desde la API pública de Bing News
 * (con Google News como respaldo), con fotos reales de licencia libre
 * de Wikimedia Commons u Openverse. Caché de 1 hora.
 */
export async function fetchFeaturedNews(limit = 9): Promise<FeaturedItem[]> {
  return collectFeatured(TOPICS, "__featured", limit);
}

/**
 * Noticias de actualidad argentina desde la misma API pública, con
 * mercado es-ar, prioridad para medios confiables (argentina.gob.ar,
 * Telam, Infobae, Clarín, La Nación, Ámbito, entre otros) y un feed
 * directo de site:argentina.gob.ar. Caché de 1 hora.
 */
export async function fetchArgentinaNews(limit = 6): Promise<FeaturedItem[]> {
  return collectFeatured(ARG_TOPICS, "__featured_ar", limit, true);
}
