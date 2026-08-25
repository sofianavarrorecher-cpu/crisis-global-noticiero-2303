import { Link } from "@tanstack/react-router";
import { formatDate, type Article } from "@/data/news";

export function CategoryTag({
  children,
  tone = "primary",
}: {
  children: React.ReactNode;
  tone?: "primary" | "breaking";
}) {
  return (
    <span
      className={`kicker inline-block px-1.5 py-0.5 ${
        tone === "breaking"
          ? "bg-breaking text-breaking-foreground"
          : "bg-primary text-primary-foreground"
      }`}
    >
      {children}
    </span>
  );
}

type Variant = "hero" | "secondary" | "card" | "compact";

export function NewsCard({ article, variant = "card" }: { article: Article; variant?: Variant }) {
  const meta = (
    <p className="font-ui mt-2 text-[11px] text-muted-foreground">
      {article.author} · {formatDate(article.date)}
    </p>
  );

  if (variant === "compact") {
    return (
      <article className="border-b border-border py-3 last:border-0">
        <Link to="/nota/$slug" params={{ slug: article.slug }} className="group block">
          <CategoryTag>{article.category}</CategoryTag>
          <h3 className="mt-2 text-base group-hover:text-primary">{article.title}</h3>
        </Link>
      </article>
    );
  }

  if (variant === "hero") {
    return (
      <article className="bg-surface">
        <Link to="/nota/$slug" params={{ slug: article.slug }} className="group block">
          <img
            src={article.image}
            alt={article.imageAlt}
            width={1280}
            height={720}
            className="aspect-video w-full object-cover"
          />
          <div className="p-4 sm:p-6">
            <CategoryTag tone="breaking">{article.category}</CategoryTag>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl group-hover:text-primary">
              {article.title}
            </h2>
            <p className="article-body mt-3 max-w-3xl text-muted-foreground">{article.copete}</p>
            {meta}
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "secondary") {
    return (
      <article className="bg-surface">
        <Link
          to="/nota/$slug"
          params={{ slug: article.slug }}
          className="group grid gap-4 sm:grid-cols-[200px_1fr]"
        >
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            width={1280}
            height={720}
            className="aspect-video w-full object-cover"
          />
          <div className="px-1 sm:px-0">
            <CategoryTag>{article.category}</CategoryTag>
            <h3 className="mt-2 text-xl sm:text-2xl group-hover:text-primary">{article.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.copete}</p>
            {meta}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="flex flex-col bg-surface">
      <Link to="/nota/$slug" params={{ slug: article.slug }} className="group flex flex-1 flex-col">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          width={1280}
          height={720}
          className="aspect-video w-full object-cover"
        />
        <div className="flex flex-1 flex-col pt-3">
          <CategoryTag>{article.category}</CategoryTag>
          <h3 className="mt-2 text-lg group-hover:text-primary">{article.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {article.copete}
          </p>
          <div className="mt-auto">{meta}</div>
        </div>
      </Link>
    </article>
  );
}
