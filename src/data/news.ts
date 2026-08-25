import afganistan from "@/assets/afganistan.jpg";
import gaza from "@/assets/gaza.jpg";
import congo from "@/assets/congo.jpg";
import iran from "@/assets/iran.jpg";
import eeuu from "@/assets/eeuu.jpg";
import venezuela from "@/assets/venezuela.jpg";
import cuernoAfrica from "@/assets/cuerno-africa.jpg";
import agua from "@/assets/agua.jpg";

export type Block =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string };

export type Source = { name: string; url: string };
export type TimelineItem = { date: string; text: string };

export type Section = {
  slug: string;
  name: string;
  description: string;
};

export type Article = {
  slug: string;
  section: string;
  category: string;
  title: string;
  copete: string;
  image: string;
  imageAlt: string;
  author: string;
  date: string;
  updated: string;
  reads: number;
  body: Block[];
  timeline: TimelineItem[];
  sources: Source[];
};

export const sections: Section[] = [
  {
    slug: "medio-oriente",
    name: "Medio Oriente",
    description:
      "Israel y Palestina, la Franja de Gaza y la escalada entre Irán y Estados Unidos.",
  },
  {
    slug: "africa",
    name: "África",
    description:
      "El este de la República Democrática del Congo y la inestabilidad en el Cuerno de África.",
  },
  {
    slug: "asia",
    name: "Asia",
    description: "Afganistán bajo el régimen talibán y los derechos de mujeres y niñas.",
  },
  {
    slug: "america",
    name: "América",
    description:
      "Los terremotos de 2026 en Venezuela y el debate por el llamado “voto por hogar” en Estados Unidos.",
  },
  {
    slug: "medio-ambiente",
    name: "Medio Ambiente",
    description: "La crisis mundial del agua dulce y los conflictos por recursos naturales.",
  },
];

const VERIFY =
  "Las cifras de este apartado cambian con frecuencia: deben verificarse contra el último informe disponible de la fuente citada al momento de la lectura.";

export const articles: Article[] = [
  {
    slug: "afganistan-apartheid-de-genero",
    section: "asia",
    category: "Derechos Humanos",
    title:
      "Afganistán, el único país del mundo que prohíbe a las niñas estudiar después de 6.º grado",
    copete:
      "A casi cinco años de la vuelta del régimen talibán, la ONU habla de “apartheid de género”. Cerca de 21,9 millones de personas —el 45% de la población— necesitan asistencia humanitaria.",
    image: afganistan,
    imageAlt:
      "Calle polvorienta de una ciudad afgana con un patio escolar vacío y montañas al fondo",
    author: "Redacción Crisis Global",
    date: "2026-08-20",
    updated: "2026-08-25",
    reads: 9840,
    body: [
      {
        type: "p",
        text: "Los talibanes retomaron el poder en Kabul el 15 de agosto de 2021. Desde entonces, el país se convirtió en el único del mundo donde a las niñas se les prohíbe la educación formal más allá de sexto grado, una restricción que organismos de Naciones Unidas describen como sin precedentes en el derecho internacional contemporáneo.",
      },
      { type: "h", text: "Un sistema de tutelaje sobre la vida cotidiana" },
      {
        type: "p",
        text: "Las mujeres deben circular acompañadas de un “mahram”, un tutor varón. Sin esa compañía se les niega en la práctica el acceso al trabajo, a la atención de salud y a comercios. La llamada “Ley de Propagación de la Virtud y Prevención del Vicio” profundizó ese esquema al restringir su participación económica y social, con redadas de la “policía de la moral” en lugares de trabajo y detenciones por incumplir códigos de vestimenta.",
      },
      {
        type: "list",
        items: [
          "Desde septiembre de 2025 se prohíbe a mujeres —incluidas empleadas de la ONU— ingresar a instalaciones de Naciones Unidas en el país.",
          "En mayo de 2026 se aprobó el “Decreto N.º 18”, que reconoce matrimonios infantiles concertados y refuerza el control de tutores varones sobre las decisiones matrimoniales.",
          "El Grupo de Trabajo de la ONU sobre la discriminación contra mujeres y niñas y el Consejo de Derechos Humanos califican la situación como una forma de “apartheid de género”.",
        ],
      },
      { type: "h", text: "Represión de las protestas" },
      {
        type: "p",
        text: "Human Rights Watch, Amnistía Internacional y la Misión de Asistencia de la ONU en Afganistán (UNAMA) documentaron detenciones arbitrarias, golpizas y desapariciones de mujeres que participaron en manifestaciones. Este medio no publica una cifra de muertes: cualquier número debe tomarse y citarse directamente del último informe disponible de HRW, Amnistía Internacional o UNAMA.",
      },
      { type: "note", text: VERIFY },
      { type: "h", text: "Una emergencia humanitaria de fondo" },
      {
        type: "p",
        text: "Alrededor del 45% de la población —unos 21,9 millones de personas— necesita asistencia humanitaria. La sequía prolongada, la caída del empleo femenino y los recortes de financiamiento internacional agravan el cuadro, en un país donde el acceso al agua potable se volvió también un factor de desplazamiento interno.",
      },
    ],
    timeline: [
      { date: "15 de agosto de 2021", text: "Los talibanes retoman el poder en Kabul." },
      {
        date: "2022",
        text: "Se consolida la prohibición de la educación secundaria para niñas y luego la universitaria.",
      },
      {
        date: "Septiembre de 2025",
        text: "Se prohíbe el ingreso de mujeres, incluidas empleadas de la ONU, a instalaciones de Naciones Unidas.",
      },
      {
        date: "Mayo de 2026",
        text: "Se aprueba el “Decreto N.º 18”, que reconoce matrimonios infantiles concertados.",
      },
    ],
    sources: [
      { name: "Human Rights Watch", url: "https://www.hrw.org" },
      { name: "Amnistía Internacional", url: "https://www.amnesty.org" },
      { name: "OHCHR — Naciones Unidas", url: "https://www.ohchr.org" },
      { name: "UNAMA", url: "https://unama.unmissions.org" },
    ],
  },
  {
    slug: "gaza-crisis-humanitaria",
    section: "medio-oriente",
    category: "Conflicto Armado",
    title:
      "Gaza: crisis humanitaria, operaciones militares y negociaciones de alto el fuego en suspenso",
    copete:
      "Un conflicto de larga data que escaló desde octubre de 2023. Los organismos humanitarios describen desplazamiento masivo y escasez de alimentos, agua y atención médica; el gobierno israelí sostiene que sus operaciones responden a su seguridad nacional.",
    image: gaza,
    imageAlt: "Edificios destruidos y escombros en una ciudad de Medio Oriente",
    author: "Redacción Crisis Global",
    date: "2026-08-22",
    updated: "2026-08-25",
    reads: 12750,
    body: [
      {
        type: "p",
        text: "El conflicto entre Israel y Palestina tiene raíces de décadas, pero atravesó su mayor escalada reciente desde octubre de 2023. Desde entonces, la Franja de Gaza es escenario de operaciones militares israelíes sostenidas y de restricciones de acceso y bloqueo que condicionan la entrada de bienes esenciales.",
      },
      { type: "h", text: "Lo que reportan los organismos humanitarios" },
      {
        type: "p",
        text: "OCHA, el Comité Internacional de la Cruz Roja y Human Rights Watch describen desplazamiento interno masivo, destrucción de infraestructura civil, escasez de alimentos y agua potable y un sistema sanitario que opera muy por debajo de su capacidad. Las agencias insisten en la necesidad de corredores humanitarios estables y de acceso sin obstáculos para el personal médico.",
      },
      { type: "h", text: "La posición israelí" },
      {
        type: "p",
        text: "El gobierno de Israel sostiene que las operaciones militares y los controles de acceso responden a la necesidad de desarticular la capacidad militar de Hamas tras los ataques de octubre de 2023, y afirma que adopta medidas de aviso previo a la población civil. Distintos organismos de derechos humanos cuestionan la proporcionalidad de esas operaciones; el debate sobre su encuadre jurídico permanece abierto.",
      },
      { type: "h", text: "Negociaciones" },
      {
        type: "p",
        text: "Las conversaciones de alto el fuego, el intercambio de detenidos y la discusión sobre el desarme de Hamas avanzaron de manera intermitente, con mediaciones regionales. El estado exacto de esas negociaciones cambia semana a semana y debe seguirse en el reporte más reciente de agencias como Reuters o AP.",
      },
      { type: "note", text: VERIFY },
    ],
    timeline: [
      { date: "Octubre de 2023", text: "Mayor escalada del conflicto y comienzo de la ofensiva en Gaza." },
      { date: "2024", text: "Desplazamiento interno masivo y alertas humanitarias sucesivas de la ONU." },
      { date: "2025", text: "Rondas intermitentes de negociación de alto el fuego con mediación regional." },
      { date: "2026", text: "Continúan las restricciones de acceso y la discusión sobre el desarme de Hamas." },
    ],
    sources: [
      { name: "ONU — OCHA", url: "https://www.unocha.org" },
      { name: "Human Rights Watch", url: "https://www.hrw.org" },
      { name: "Comité Internacional de la Cruz Roja", url: "https://www.icrc.org" },
      { name: "Reuters", url: "https://www.reuters.com" },
      { name: "Associated Press", url: "https://apnews.com" },
    ],
  },
  {
    slug: "iran-estados-unidos-ormuz",
    section: "medio-oriente",
    category: "Geopolítica",
    title: "Irán y Estados Unidos: conflicto abierto y el Estrecho de Ormuz bajo presión",
    copete:
      "Desde fines de febrero de 2026 hay hostilidades abiertas tras ataques estadounidenses e israelíes contra instalaciones iraníes. El bloqueo de facto de Ormuz altera el comercio energético mundial.",
    image: iran,
    imageAlt: "Buques petroleros navegando en un estrecho al atardecer",
    author: "Redacción Crisis Global",
    date: "2026-08-23",
    updated: "2026-08-25",
    reads: 11320,
    body: [
      {
        type: "p",
        text: "El conflicto armado entre Irán y Estados Unidos quedó abierto a fines de febrero de 2026, después de ataques estadounidenses e israelíes contra instalaciones iraníes. La administración de EE.UU. plantea como objetivo central impedir que Teherán desarrolle armamento nuclear.",
      },
      { type: "h", text: "Ormuz, el nudo del comercio petrolero" },
      {
        type: "p",
        text: "Estados Unidos mantiene un bloqueo de facto sobre el Estrecho de Ormuz, ruta clave del transporte mundial de petróleo. La medida encareció fletes y seguros marítimos y se trasladó a los precios internacionales del crudo y a los mercados financieros.",
      },
      { type: "h", text: "Negociaciones estancadas" },
      {
        type: "list",
        items: [
          "Hubo rondas intermitentes con Omán como mediador.",
          "En junio de 2026 se firmó un memorando de entendimiento.",
          "En agosto de 2026 las conversaciones volvieron a suspenderse.",
          "China continúa comprando la mayor parte del petróleo iraní pese a las sanciones estadounidenses.",
        ],
      },
      {
        type: "p",
        text: "El estado del programa nuclear iraní y el nivel de acceso de los inspectores deben verificarse en los informes del Organismo Internacional de Energía Atómica (OIEA).",
      },
      { type: "note", text: VERIFY },
    ],
    timeline: [
      { date: "Febrero de 2026", text: "Ataques de EE.UU. e Israel contra instalaciones iraníes; comienzan las hostilidades abiertas." },
      { date: "Marzo de 2026", text: "Bloqueo de facto del Estrecho de Ormuz y suba de los precios del crudo." },
      { date: "Junio de 2026", text: "Memorando de entendimiento firmado con mediación de Omán." },
      { date: "Agosto de 2026", text: "Las conversaciones se suspenden nuevamente." },
    ],
    sources: [
      { name: "Naciones Unidas", url: "https://www.un.org" },
      { name: "OIEA", url: "https://www.iaea.org" },
      { name: "Reuters", url: "https://www.reuters.com" },
      { name: "Associated Press", url: "https://apnews.com" },
    ],
  },
  {
    slug: "congo-m23-coltan",
    section: "africa",
    category: "Conflicto Armado",
    title: "El este del Congo, entre el avance del M23 y el negocio del coltán",
    copete:
      "El grupo armado tomó Goma en enero de 2025 y luego Bukavu. La ONU señala apoyo de fuerzas ruandesas —Kigali lo niega— y los combates siguen pese al Acuerdo Marco de Doha.",
    image: congo,
    imageAlt: "Mina artesanal de coltán en el este del Congo, tierra roja y colinas verdes",
    author: "Redacción Crisis Global",
    date: "2026-08-21",
    updated: "2026-08-25",
    reads: 8760,
    body: [
      {
        type: "p",
        text: "El Movimiento 23 de Marzo (M23) tomó Goma, capital de Kivu del Norte, en enero de 2025, y semanas más tarde Bukavu, capital de Kivu del Sur. Desde entonces administra esas zonas de forma paralela al gobierno congoleño.",
      },
      { type: "h", text: "Violaciones documentadas" },
      {
        type: "p",
        text: "Human Rights Watch documentó ejecuciones sumarias en el barrio de Kasika, en Goma, en febrero de 2025, con al menos 21 civiles asesinados. El gobierno congoleño estimó más de 770 muertos durante la toma inicial de la ciudad. Naciones Unidas señala que el M23 recibe apoyo de fuerzas armadas de Ruanda, algo que Kigali niega. Estados Unidos sancionó a comandantes del M23 y de las FDLR.",
      },
      { type: "h", text: "Acuerdos que no detienen los combates" },
      {
        type: "list",
        items: [
          "Noviembre de 2025: se firma el “Acuerdo Marco de Doha” entre el gobierno congoleño y el M23.",
          "Febrero de 2026: se acuerda un mecanismo de monitoreo del cese el fuego, facilitado por Catar.",
          "Pese a ambos hitos, los enfrentamientos continúan en varias zonas de los Kivus.",
        ],
      },
      { type: "h", text: "Coltán: el mineral detrás del control territorial" },
      {
        type: "p",
        text: "El este de la RDC concentra buena parte de las reservas mundiales de coltán, usado en celulares, computadoras y baterías. El control territorial de grupos armados sobre las minas permite el contrabando de este y otros minerales —oro, casiterita, wolframio— hacia países vecinos, principalmente Ruanda, desde donde se exportan a mercados internacionales bajo cadenas de suministro poco trazables. El Grupo de Expertos de la ONU sobre la RDC y Global Witness documentaron ese circuito comercial.",
      },
      { type: "h", text: "Violencia sexual y femicidios" },
      {
        type: "p",
        text: "El femicidio es el asesinato de una mujer o una niña por razón de su género, generalmente en un contexto de violencia machista, desigualdad estructural y discriminación. Se distingue del homicidio común porque responde a patrones de dominación y control dirigidos específicamente contra las mujeres por serlo. ONU Mujeres y la CEPAL lo reconocen como una categoría real y medible de violencia, con marcos legales específicos en varios países de América Latina.",
      },
      {
        type: "p",
        text: "En el este congoleño, SOFEPADI (Solidarité Féminine pour la Paix et le Développement Intégral) es una organización de mujeres que brinda asistencia legal, médica y psicosocial a sobrevivientes de violencia sexual. El ginecólogo congoleño Denis Mukwege, fundador del Hospital Panzi en Bukavu, es reconocido internacionalmente por haber atendido a decenas de miles de sobrevivientes y recibió el Premio Nobel de la Paz en 2018, compartido con Nadia Murad, por documentar y visibilizar la violencia sexual como arma de guerra.",
      },
      { type: "note", text: VERIFY },
    ],
    timeline: [
      { date: "Enero de 2025", text: "El M23 toma Goma, capital de Kivu del Norte." },
      { date: "Febrero de 2025", text: "Toma de Bukavu y ejecuciones sumarias documentadas en el barrio de Kasika." },
      { date: "Noviembre de 2025", text: "Firma del Acuerdo Marco de Doha." },
      { date: "Febrero de 2026", text: "Mecanismo de monitoreo del cese el fuego facilitado por Catar." },
    ],
    sources: [
      { name: "Human Rights Watch", url: "https://www.hrw.org" },
      { name: "MONUSCO", url: "https://monusco.unmissions.org" },
      { name: "Grupo de Expertos de la ONU sobre la RDC", url: "https://www.un.org/securitycouncil/sanctions/1533/panel-of-experts" },
      { name: "Global Witness", url: "https://www.globalwitness.org" },
      { name: "Fundación Panzi", url: "https://panzifoundation.org" },
    ],
  },
  {
    slug: "cuerno-de-africa-etiopia-somalia",
    section: "africa",
    category: "Crisis Humanitaria",
    title: "Cuerno de África: inestabilidad en Etiopía y Somalia, con la sequía como telón de fondo",
    copete:
      "La crisis en Tigray y Amhara y la actividad de Al Shabaab se combinan con desplazamiento, hambruna y sequía en una de las regiones más frágiles del continente.",
    image: cuernoAfrica,
    imageAlt: "Suelo agrietado por la sequía con campamento de desplazados al fondo",
    author: "Redacción Crisis Global",
    date: "2026-08-18",
    updated: "2026-08-25",
    reads: 5410,
    body: [
      {
        type: "p",
        text: "El Cuerno de África concentra varias crisis superpuestas. En Etiopía, las secuelas del conflicto en Tigray y las tensiones armadas en Amhara mantienen zonas con acceso humanitario limitado. En Somalia, la actividad de grupos armados como Al Shabaab sostiene un cuadro de inseguridad crónica.",
      },
      { type: "h", text: "Impacto humanitario" },
      {
        type: "p",
        text: "El resultado combinado es desplazamiento forzado, inseguridad alimentaria severa y episodios de hambruna localizada, agravados por ciclos de sequía cada vez más intensos y por la interrupción de servicios básicos de salud y educación.",
      },
      {
        type: "note",
        text: "Los datos numéricos específicos —desplazados, muertos y nivel de inseguridad alimentaria— cambian con frecuencia y deben verificarse contra el último reporte de OCHA o del ACNUR al momento de la lectura.",
      },
    ],
    timeline: [
      { date: "2020-2022", text: "Conflicto armado en la región etíope de Tigray." },
      { date: "2023-2025", text: "Escalada de tensiones en Amhara y ciclos de sequía sucesivos." },
      { date: "2026", text: "Persisten los ataques de Al Shabaab en Somalia y el desplazamiento regional." },
    ],
    sources: [
      { name: "ACNUR", url: "https://www.unhcr.org" },
      { name: "OCHA", url: "https://www.unocha.org" },
      { name: "Programa Mundial de Alimentos", url: "https://es.wfp.org" },
    ],
  },
  {
    slug: "venezuela-terremotos-2026",
    section: "america",
    category: "Desastres",
    title: "Venezuela: el “doblete sísmico” del 24 de junio dejó miles de víctimas",
    copete:
      "Un sismo de magnitud 7,2 seguido segundos después por otro de 7,5, con epicentro en Yaracuy, golpeó La Guaira, Caracas y el Distrito Capital.",
    image: venezuela,
    imageAlt: "Edificios dañados por un terremoto con carpas de asistencia en el frente",
    author: "Redacción Crisis Global",
    date: "2026-08-19",
    updated: "2026-08-25",
    reads: 10230,
    body: [
      {
        type: "p",
        text: "El 24 de junio de 2026, Venezuela sufrió un “doblete sísmico”: un terremoto de magnitud 7,2 seguido segundos después por otro de 7,5, con epicentro en el estado de Yaracuy. Las zonas más afectadas fueron La Guaira, Caracas y el Distrito Capital.",
      },
      { type: "h", text: "Un saldo que creció con las semanas" },
      {
        type: "p",
        text: "Los reportes oficiales y de agencias internacionales describieron miles de muertos, miles de desaparecidos y decenas de miles de heridos, con cifras que fueron actualizándose durante semanas. Este medio no fija un número: la cifra final debe tomarse del último reporte disponible de la Cruz Roja, la OPS/OMS o agencias como EFE y AP.",
      },
      { type: "h", text: "Vivienda y asistencia internacional" },
      {
        type: "p",
        text: "Miles de viviendas quedaron destruidas o en riesgo de derrumbe, con evacuaciones preventivas y refugios temporales. Hubo asistencia internacional de varios países de la región —Brasil, Chile, Dominica y Granada— y de España.",
      },
      { type: "note", text: VERIFY },
    ],
    timeline: [
      { date: "24 de junio de 2026", text: "Sismos de magnitud 7,2 y 7,5 con epicentro en Yaracuy." },
      { date: "Fines de junio de 2026", text: "Llegada de asistencia internacional de la región y de España." },
      { date: "Julio-agosto de 2026", text: "Actualización sucesiva del saldo de víctimas y del relevamiento de viviendas." },
    ],
    sources: [
      { name: "OPS/OMS", url: "https://www.paho.org" },
      { name: "ReliefWeb", url: "https://reliefweb.int" },
      { name: "Cruz Roja", url: "https://www.ifrc.org" },
    ],
  },
  {
    slug: "estados-unidos-voto-por-hogar",
    section: "america",
    category: "Derechos Civiles",
    title:
      "“Voto por hogar”: la idea que se debatió en una cumbre conservadora en Texas y por qué preocupa",
    copete:
      "No es una ley ni un proyecto legislativo. Es una propuesta impulsada por sectores del conservadurismo y el nacionalismo cristiano estadounidense. El voto femenino sigue plenamente vigente y protegido por la 19.ª Enmienda.",
    image: eeuu,
    imageAlt: "Cabinas de votación vacías en un centro electoral de Estados Unidos",
    author: "Redacción Crisis Global",
    date: "2026-08-24",
    updated: "2026-08-25",
    reads: 14980,
    body: [
      {
        type: "p",
        text: "En junio de 2026, Turning Point USA —organización fundada por Charlie Kirk y hoy liderada por su viuda, Erika Kirk— organizó la “Cumbre de Liderazgo Femenino 2026” en San Antonio, Texas, con cerca de 3.000 asistentes.",
      },
      { type: "h", text: "Qué se planteó exactamente" },
      {
        type: "p",
        text: "Durante el evento, varias oradoras y asistentes —no necesariamente Erika Kirk en persona— defendieron públicamente la idea del “voto por hogar”: que el sufragio deje de ser individual y pase a estar representado por un solo voto por núcleo familiar, ejercido por el “jefe de familia”, que en la propuesta es el hombre. Las mujeres solteras quedarían representadas por un padre o un hermano.",
      },
      {
        type: "note",
        text: "No se trata de una ley ni de una propuesta legislativa formal. El derecho al voto de las mujeres sigue plenamente vigente y protegido por la 19.ª Enmienda de la Constitución de Estados Unidos.",
      },
      { type: "h", text: "El argumento de sus impulsoras" },
      {
        type: "p",
        text: "Quienes defienden la idea la enmarcan como una defensa de “valores familiares tradicionales” y sostienen que la unidad de decisión política debería ser el hogar y no el individuo.",
      },
      { type: "h", text: "Por qué preocupa a especialistas en derechos civiles" },
      {
        type: "list",
        items: [
          "Implicaría un retroceso sobre un derecho conquistado históricamente por el movimiento sufragista.",
          "Subordinaría la voz política de las mujeres —incluidas las que no comparten las decisiones de su pareja— a la de un tercero.",
          "Se inscribe en una tendencia internacional de discursos que buscan limitar derechos políticos y reproductivos de las mujeres.",
        ],
      },
      {
        type: "p",
        text: "Organizaciones de derechos civiles como la ACLU recuerdan que cualquier modificación de este tipo choca con el marco constitucional vigente y con décadas de jurisprudencia sobre igualdad ante la ley.",
      },
    ],
    timeline: [
      { date: "1920", text: "La 19.ª Enmienda garantiza el derecho al voto de las mujeres en EE.UU." },
      { date: "Junio de 2026", text: "Cumbre de Liderazgo Femenino de Turning Point USA en San Antonio, Texas." },
      { date: "Julio de 2026", text: "El debate se amplifica en medios internacionales y organizaciones de derechos civiles responden." },
    ],
    sources: [
      { name: "ACLU", url: "https://www.aclu.org" },
      { name: "El Tiempo", url: "https://www.eltiempo.com" },
      { name: "Página 12", url: "https://www.pagina12.com.ar" },
      { name: "El Informador", url: "https://www.informador.mx" },
    ],
  },
  {
    slug: "crisis-mundial-agua-dulce",
    section: "medio-ambiente",
    category: "Medio Ambiente",
    title: "Menos del 1% del agua del planeta es dulce y accesible: el mapa del estrés hídrico",
    copete:
      "Cambio climático, sobreexplotación de acuíferos y crecimiento poblacional reducen la disponibilidad por habitante en Medio Oriente, el norte de África, el sur de Asia y partes de América Latina.",
    image: agua,
    imageAlt: "Embalse casi seco con suelo agrietado y colinas al fondo",
    author: "Redacción Crisis Global",
    date: "2026-08-17",
    updated: "2026-08-25",
    reads: 6180,
    body: [
      {
        type: "p",
        text: "Menos del 1% del agua del planeta es dulce y accesible para el consumo humano. Sobre ese margen estrecho presionan tres tendencias simultáneas: el cambio climático, que altera los regímenes de lluvia; la sobreexplotación de acuíferos, que extrae agua más rápido de lo que se recarga; y el crecimiento poblacional.",
      },
      { type: "h", text: "Regiones bajo presión" },
      {
        type: "p",
        text: "El Instituto de Recursos Mundiales (WRI) ubica los niveles más altos de estrés hídrico en Medio Oriente y el norte de África, con focos crecientes en el sur de Asia y en zonas de América Latina. La disponibilidad per cápita cae incluso en países que no perciben todavía escasez absoluta.",
      },
      { type: "h", text: "Agua y conflicto" },
      {
        type: "p",
        text: "La sequía prolongada en Afganistán y los ciclos secos del Cuerno de África muestran cómo la escasez hídrica se entrelaza con el desplazamiento forzado y con disputas por el control de recursos. UNICEF advierte además sobre el impacto directo del agua insegura en la mortalidad infantil.",
      },
      { type: "note", text: VERIFY },
    ],
    timeline: [
      { date: "2023", text: "El WRI advierte que un cuarto de la población mundial vive con estrés hídrico extremadamente alto." },
      { date: "2025", text: "Nuevas alertas de ONU-Agua sobre la caída de la disponibilidad per cápita." },
      { date: "2026", text: "La sequía se consolida como factor de desplazamiento en Asia Central y el Cuerno de África." },
    ],
    sources: [
      { name: "ONU-Agua", url: "https://www.unwater.org" },
      { name: "UNICEF", url: "https://www.unicef.org" },
      { name: "Instituto de Recursos Mundiales (WRI)", url: "https://www.wri.org" },
    ],
  },
];

export const trustedSources: Source[] = [
  { name: "Human Rights Watch", url: "https://www.hrw.org" },
  { name: "Naciones Unidas", url: "https://www.un.org" },
  { name: "MONUSCO", url: "https://monusco.unmissions.org" },
  { name: "Amnistía Internacional", url: "https://www.amnesty.org" },
  { name: "OPS/OMS", url: "https://www.paho.org" },
  { name: "ACNUR", url: "https://www.unhcr.org" },
  { name: "OCHA", url: "https://www.unocha.org" },
];

export const breakingHeadlines = [
  "Irán-EE.UU.: las conversaciones vuelven a suspenderse en agosto de 2026",
  "Congo: siguen los combates pese al mecanismo de monitoreo acordado en Catar",
  "Afganistán: el 45% de la población necesita asistencia humanitaria",
  "Venezuela: continúa el relevamiento de viviendas tras el doblete sísmico",
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getSection = (slug: string) => sections.find((s) => s.slug === slug);
export const articlesBySection = (slug: string) =>
  articles.filter((a) => a.section === slug);
export const sectionName = (slug: string) => getSection(slug)?.name ?? slug;

export const mostRead = [...articles].sort((a, b) => b.reads - a.reads).slice(0, 5);

const monthNames = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${monthNames[(m ?? 1) - 1]} de ${y}`;
}

export const globalTimeline = articles
  .flatMap((a) =>
    a.timeline.map((t) => ({ ...t, article: a.title, slug: a.slug, category: a.category })),
  )
  .sort((a, b) => sortKey(a.date) - sortKey(b.date));

function sortKey(date: string) {
  const year = Number(date.match(/\d{4}/g)?.slice(-1)[0] ?? 0);
  const monthIndex = monthNames.findIndex((m) => date.toLowerCase().includes(m));
  const day = Number(date.match(/^\d{1,2}/)?.[0] ?? 1);
  return year * 10000 + (monthIndex + 1) * 100 + day;
}
