import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { trustedSources } from "@/data/news";

export const Route = createFileRoute("/sobre-este-proyecto")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Sobre este proyecto — Crisis Global" },
      {
        name: "description",
        content:
          "Crisis Global es un proyecto informativo y educativo. Metodología de fuentes, criterios editoriales y aclaraciones sobre autores e imágenes.",
      },
      { property: "og:title", content: "Sobre este proyecto — Crisis Global" },
      {
        property: "og:description",
        content: "Metodología de fuentes y criterios editoriales de Crisis Global.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sobre-este-proyecto" },
    ],
    links: [{ rel: "canonical", href: "/sobre-este-proyecto" }],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-4xl sm:text-5xl">Sobre este proyecto</h1>
        <div className="article-body mt-6 space-y-5">
          <p>
            <strong>Crisis Global</strong> es un proyecto informativo y educativo, sin fines
            comerciales, dedicado a conflictos armados, derechos humanos y crisis globales que
            reciben poca cobertura en los grandes medios.
          </p>
          <h2 className="pt-3 text-2xl">Metodología de fuentes</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Cada nota se apoya en informes de organismos multilaterales, misiones de
              Naciones Unidas y organizaciones de derechos humanos, citados al pie.
            </li>
            <li>
              Cuando una cifra cambia con frecuencia —víctimas, desplazados, inseguridad
              alimentaria— no se fija un número: se indica que debe tomarse del último informe
              disponible de la fuente citada.
            </li>
            <li>
              En temas con posiciones encontradas se presentan los distintos puntos de vista
              antes de explicar por qué generan preocupación en organismos de derechos humanos.
            </li>
            <li>Todas las notas incluyen la fecha de su última actualización.</li>
          </ul>
          <h2 className="pt-3 text-2xl">Aclaraciones</h2>
          <p>
            Las firmas de autor y los perfiles de redes sociales son ficticios y cumplen una
            función ilustrativa dentro del proyecto. Las imágenes son ilustrativas y temáticas
            (mapas, paisajes, infraestructura, escenarios) y no retratan personas reales
            identificables.
          </p>
          <h2 className="pt-3 text-2xl">Tono editorial</h2>
          <p>
            El registro es informativo y sobrio. Aun tratando temas graves, se evita el
            sensacionalismo, la adjetivación innecesaria y las cifras sin respaldo verificable.
          </p>
          <h2 className="pt-3 text-2xl">Organismos consultados</h2>
          <ul className="list-disc space-y-2 pl-6">
            {trustedSources.map((s) => (
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
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
