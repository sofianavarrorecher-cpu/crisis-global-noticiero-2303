import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { sections, trustedSources } from "@/data/news";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-4 border-border-strong bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-headline text-2xl font-bold uppercase">Crisis Global</p>
          <p className="font-ui mt-3 text-xs leading-relaxed text-background/70">
            Portal de noticias internacionales dedicado a conflictos armados, derechos humanos
            y crisis globales con poca cobertura en los grandes medios.
          </p>
          <div className="mt-4 flex gap-3 text-background/70">
            <span aria-label="Facebook (ficticio)"><Facebook className="size-4" /></span>
            <span aria-label="Instagram (ficticio)"><Instagram className="size-4" /></span>
            <span aria-label="X (ficticio)"><Twitter className="size-4" /></span>
            <span aria-label="YouTube (ficticio)"><Youtube className="size-4" /></span>
          </div>
          <p className="font-ui mt-2 text-[10px] text-background/50">
            Perfiles de redes sociales ficticios, con fines ilustrativos.
          </p>
        </div>

        <div>
          <h2 className="kicker text-breaking">Secciones</h2>
          <ul className="font-ui mt-3 space-y-2 text-xs">
            {sections.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/seccion/$slug"
                  params={{ slug: s.slug }}
                  className="text-background/80 hover:text-background"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cronologia" className="text-background/80 hover:text-background">
                Cronología general
              </Link>
            </li>
            <li>
              <Link
                to="/sobre-este-proyecto"
                className="text-background/80 hover:text-background"
              >
                Sobre este proyecto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="kicker text-breaking">Fuentes confiables</h2>
          <ul className="font-ui mt-3 space-y-2 text-xs">
            {trustedSources.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/80 underline decoration-background/30 underline-offset-4 hover:text-background"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <p className="font-ui mx-auto max-w-6xl px-4 py-6 text-[11px] leading-relaxed text-background/60">
          <strong className="text-background/80">Aclaración editorial:</strong> Crisis Global es
          un proyecto informativo y educativo, sin fines comerciales. Los autores firmantes son
          ficticios y las imágenes son ilustrativas. Los datos provienen de organismos públicos
          y organizaciones de derechos humanos citados al pie de cada nota; las cifras deben
          verificarse contra el último informe disponible de cada fuente.
        </p>
      </div>
    </footer>
  );
}
