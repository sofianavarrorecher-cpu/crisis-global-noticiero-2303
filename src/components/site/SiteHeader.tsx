import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { sections, breakingHeadlines } from "@/data/news";

function NowStamp() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("es-AR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-ui text-[11px] text-muted-foreground">{now}</span>;
}

function SearchBox({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/buscar", search: { q } });
        onDone?.();
      }}
      className="flex items-center border border-border bg-surface"
      role="search"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar notas..."
        aria-label="Buscar notas"
        className="font-ui w-full min-w-0 bg-transparent px-2 py-1.5 text-xs outline-none placeholder:text-muted-foreground"
      />
      <button type="submit" aria-label="Buscar" className="px-2 py-1.5 text-primary">
        <Search className="size-4" />
      </button>
    </form>
  );
}

function Ticker() {
  const items = [...breakingHeadlines, ...breakingHeadlines];
  return (
    <div className="flex items-stretch overflow-hidden border-b border-border bg-foreground">
      <span className="kicker flex shrink-0 items-center bg-breaking px-3 py-2 text-breaking-foreground">
        Última hora
      </span>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-ticker flex w-max items-center gap-10 py-2 pl-6">
          {items.map((h, i) => (
            <span key={i} className="font-ui text-xs whitespace-nowrap text-background/90">
              <span className="mr-2 text-breaking">•</span>
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link to="/" className="flex shrink-0 items-baseline gap-1.5">
            <span className="font-headline text-2xl leading-none font-bold tracking-tight uppercase sm:text-3xl">
              Crisis
            </span>
            <span className="font-headline bg-primary px-1.5 text-2xl leading-none font-bold tracking-tight text-primary-foreground uppercase sm:text-3xl">
              Global
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden sm:block">
              <NowStamp />
            </div>
            <div className="hidden w-56 md:block">
              <SearchBox />
            </div>
          </div>
        </div>
      </div>

      <nav className="border-b border-border-strong bg-surface" aria-label="Secciones">
        <div className="mx-auto hidden max-w-6xl items-center gap-5 px-4 py-2 lg:flex">
          <Link
            to="/"
            className="kicker text-foreground transition-colors hover:text-primary"
            activeProps={{ className: "kicker text-primary" }}
            activeOptions={{ exact: true }}
          >
            Portada
          </Link>
          {sections.map((s) => (
            <Link
              key={s.slug}
              to="/seccion/$slug"
              params={{ slug: s.slug }}
              className="kicker text-foreground transition-colors hover:text-primary"
              activeProps={{ className: "kicker text-primary" }}
            >
              {s.name}
            </Link>
          ))}
          <Link
            to="/cronologia"
            className="kicker text-foreground transition-colors hover:text-primary"
            activeProps={{ className: "kicker text-primary" }}
          >
            Cronología
          </Link>
          <Link
            to="/sobre-este-proyecto"
            className="kicker ml-auto text-muted-foreground transition-colors hover:text-primary"
            activeProps={{ className: "kicker ml-auto text-primary" }}
          >
            Sobre este proyecto
          </Link>
        </div>

        {open && (
          <div className="lg:hidden">
            <div className="px-4 py-3">
              <SearchBox onDone={() => setOpen(false)} />
            </div>
            <ul className="border-t border-border">
              <li className="border-b border-border">
                <Link to="/" onClick={() => setOpen(false)} className="kicker block px-4 py-3">
                  Portada
                </Link>
              </li>
              {sections.map((s) => (
                <li key={s.slug} className="border-b border-border">
                  <Link
                    to="/seccion/$slug"
                    params={{ slug: s.slug }}
                    onClick={() => setOpen(false)}
                    className="kicker block px-4 py-3"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li className="border-b border-border">
                <Link
                  to="/cronologia"
                  onClick={() => setOpen(false)}
                  className="kicker block px-4 py-3"
                >
                  Cronología
                </Link>
              </li>
              <li className="border-b border-border">
                <Link
                  to="/sobre-este-proyecto"
                  onClick={() => setOpen(false)}
                  className="kicker block px-4 py-3"
                >
                  Sobre este proyecto
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <Ticker />
    </header>
  );
}
