export type Org = { name: string; url: string; what: string };

export type LiveTopic = {
  id: string;
  name: string;
  short: string;
  /** Búsqueda en el agregador público de noticias (Google News RSS, español). */
  query: string;
  /** Palabras clave para filtrar los feeds de organismos (ONU, HRW, Amnistía, ReliefWeb). */
  keywords: string[];
  /** Ventana temporal para la búsqueda: 1d, 3d, 7d, 30d. */
  window: "1d" | "3d" | "7d" | "30d";
  /** Posición editorial de Crisis Global, separada de las noticias de agencias. */
  editorial: string[];
  actions: string[];
  orgs: Org[];
};

export const liveTopics: LiveTopic[] = [
  {
    id: "congo",
    name: "República Democrática del Congo",
    short: "RDC / M23",
    query: "(Congo OR RDC OR Goma OR Bukavu OR Kivu) (M23 OR MONUSCO OR coltán OR Ruanda)",
    keywords: ["congo", "m23", "goma", "bukavu", "kivu", "monusco", "coltán", "coltan", "rdc"],
    window: "7d",
    editorial: [
      "El este de la RDC vive una de las crisis de desplazamiento más grandes del mundo. El M23, con apoyo de Ruanda según la ONU, controla Goma y Bukavu desde 2025 y los combates continúan pese al Acuerdo Marco de Doha.",
      "La violencia sexual se usa como arma de guerra y el comercio opaco de coltán, oro y casiterita financia a los grupos armados. Cada celular con minerales sin trazabilidad forma parte de esa cadena.",
    ],
    actions: [
      "Compartí coberturas de fuentes verificadas (MONUSCO, HRW, Grupo de Expertos de la ONU) y no de cuentas anónimas.",
      "Preguntá a las marcas de tecnología por la trazabilidad de sus minerales (iniciativas como RMI o Fairphone).",
      "Apoyá a organizaciones congoleñas que atienden a sobrevivientes en el terreno.",
    ],
    orgs: [
      {
        name: "Fundación Panzi (Dr. Denis Mukwege)",
        url: "https://panzifoundation.org",
        what: "Atención médica, legal y psicosocial a sobrevivientes de violencia sexual en Bukavu.",
      },
      {
        name: "Médicos Sin Fronteras – RDC",
        url: "https://www.msf.org/democratic-republic-congo",
        what: "Atención sanitaria de emergencia en Kivu del Norte y del Sur.",
      },
      {
        name: "ACNUR – Emergencia RDC",
        url: "https://www.unhcr.org/emergencies/dr-congo-emergency",
        what: "Asistencia a personas desplazadas y refugiadas.",
      },
      {
        name: "Global Witness",
        url: "https://www.globalwitness.org",
        what: "Investiga el comercio de minerales de conflicto.",
      },
    ],
  },
  {
    id: "voto-por-hogar",
    name: "Estados Unidos: el “voto por hogar”",
    short: "Voto femenino",
    query: "(\"Erika Kirk\" OR \"Turning Point\") (voto OR sufragio OR mujeres OR \"voto por hogar\" OR \"household voting\")",
    keywords: ["erika kirk", "turning point", "voto por hogar", "household vot", "sufragio femenino"],
    window: "30d",
    editorial: [
      "Posición de Crisis Global: la idea del “voto por hogar”, promovida desde el entorno de Turning Point USA y su presidenta Erika Kirk, implica quitarles a las mujeres un derecho político individual conquistado en 1920 con la 19.ª Enmienda. Este medio la rechaza de manera explícita.",
      "Aclaración necesaria: no es una ley ni un proyecto legislativo formal. El voto de las mujeres sigue plenamente vigente. Justamente por eso importa seguir el debate: los retrocesos empiezan como ideas “de conversación”.",
    ],
    actions: [
      "Difundí información precisa: qué se dijo, quién lo dijo y qué protege hoy la Constitución.",
      "Si vivís en EE.UU., registrate para votar y verificá tu padrón en vote.gov.",
      "Apoyá a organizaciones que defienden el derecho al voto igualitario.",
    ],
    orgs: [
      {
        name: "League of Women Voters",
        url: "https://www.lwv.org",
        what: "Organización fundada en 1920 que defiende el derecho al voto de las mujeres.",
      },
      {
        name: "ACLU – Voting Rights",
        url: "https://www.aclu.org/issues/voting-rights",
        what: "Litigio y defensa legal del derecho al voto.",
      },
      {
        name: "Brennan Center for Justice",
        url: "https://www.brennancenter.org",
        what: "Investigación independiente sobre democracia y derechos electorales.",
      },
    ],
  },
  {
    id: "crisis-ambientales",
    name: "Crisis medioambientales",
    short: "Ambiente",
    query: "(incendios OR sequía OR inundaciones OR deforestación OR \"ola de calor\" OR derrame OR huracán) (récord OR emergencia OR catástrofe OR ONU)",
    keywords: ["sequía", "inundaci", "incendio", "deforestaci", "ola de calor", "clima", "huracán", "ciclón", "contaminaci", "pnuma"],
    window: "3d",
    editorial: [
      "Incendios, sequías, inundaciones y olas de calor cada vez más frecuentes e intensas: el PNUMA y la Organización Meteorológica Mundial coinciden en que el calentamiento global multiplica los eventos extremos.",
    ],
    actions: [
      "Verificá las cifras contra el PNUMA, la OMM o Copernicus antes de compartir.",
      "Exigí a gobiernos y empresas metas de reducción de emisiones con plazos verificables.",
    ],
    orgs: [
      { name: "PNUMA", url: "https://www.unep.org/es", what: "Programa de la ONU para el Medio Ambiente." },
      { name: "WWF", url: "https://www.wwf.org", what: "Conservación de ecosistemas y biodiversidad." },
      { name: "Greenpeace", url: "https://www.greenpeace.org", what: "Campañas ambientales independientes." },
    ],
  },
  {
    id: "nestle-agua",
    name: "Nestlé y el agua como derecho humano",
    short: "Nestlé",
    query: "Nestlé (agua OR Perrier OR Vittel OR contaminación OR plástico OR acuífero OR multa)",
    keywords: ["nestlé", "nestle", "perrier", "vittel", "agua embotellada"],
    window: "30d",
    editorial: [
      "El origen de la polémica: en el documental “We Feed the World” (2005), el entonces CEO y luego presidente de Nestlé, Peter Brabeck-Letmathe, calificó de “extrema” la postura de que el agua es un derecho humano y sostuvo que debía tener “un valor de mercado”. Años después matizó que el agua para necesidades básicas sí es un derecho. La ONU reconoció el acceso al agua y al saneamiento como derecho humano en 2010 (Resolución 64/292).",
      "Posición de Crisis Global: el agua no es una mercancía. El historial de la empresa da razones para la desconfianza y así lo señalan investigaciones públicas:",
      "• Plásticos: las auditorías de marca de Break Free From Plastic ubicaron a Nestlé entre los tres mayores contaminadores plásticos del mundo durante cinco años consecutivos (2018-2022).",
      "• Extracción de agua: en Michigan (EE.UU.) la empresa bombeó cientos de galones por minuto pagando una tasa administrativa de unos 200 dólares al año; en California el Estado ordenó en 2021 y 2023 frenar la extracción en el bosque nacional de San Bernardino por carecer de derechos válidos (la operación pasó en 2021 a BlueTriton).",
      "• Francia: en 2024 Nestlé Waters reconoció haber aplicado tratamientos prohibidos a aguas minerales (Perrier, Vittel, Hépar) y aceptó una multa de 2 millones de euros; el Senado francés investigó el caso en 2025. En los Vosgos, el acuífero de Vittel está sobreexplotado según la Agencia del Agua Rhin-Mosa.",
      "• Otros frentes documentados: deforestación vinculada a su cadena de aceite de palma (Greenpeace, 2018) y denuncias de trabajo infantil en la cadena del cacao (litigios en EE.UU.).",
    ],
    actions: [
      "Reducí el consumo de agua embotellada y exigí agua segura de red: es más barata y genera menos residuos.",
      "Contrastá las declaraciones de la empresa con las investigaciones citadas y difundí las fuentes, no capturas de pantalla.",
      "Apoyá a organizaciones que defienden el acceso público al agua.",
    ],
    orgs: [
      {
        name: "Food & Water Watch",
        url: "https://www.foodandwaterwatch.org",
        what: "Campañas contra la privatización del agua en EE.UU.",
      },
      {
        name: "Break Free From Plastic",
        url: "https://www.breakfreefromplastic.org",
        what: "Auditorías de marca sobre contaminación plástica.",
      },
      { name: "Water.org", url: "https://water.org", what: "Acceso a agua segura y saneamiento." },
      { name: "charity: water", url: "https://www.charitywater.org", what: "Proyectos de agua potable en comunidades." },
    ],
  },
  {
    id: "iran-eeuu",
    name: "Irán y Estados Unidos",
    short: "Irán-EE.UU.",
    query: "Irán (\"Estados Unidos\" OR EEUU OR Ormuz OR OIEA OR nuclear OR Omán)",
    keywords: ["irán", "iran", "ormuz", "oiea", "teherán"],
    window: "3d",
    editorial: [
      "Conflicto armado abierto desde fines de febrero de 2026. EE.UU. mantiene un bloqueo de facto del Estrecho de Ormuz; las negociaciones con mediación de Omán se suspendieron en agosto. Los datos sobre el programa nuclear deben tomarse del OIEA.",
    ],
    actions: [
      "Desconfiá de videos virales sin fecha ni lugar verificables: en este conflicto abunda la desinformación.",
      "Seguí los comunicados del OIEA y de la ONU antes que declaraciones de partes en conflicto.",
    ],
    orgs: [
      { name: "OIEA", url: "https://www.iaea.org", what: "Verificación del programa nuclear iraní." },
      { name: "CICR – Irán", url: "https://www.icrc.org/es", what: "Asistencia humanitaria neutral." },
    ],
  },
  {
    id: "israel-palestina",
    name: "Israel y Palestina",
    short: "Gaza",
    query: "(Gaza OR Palestina OR Cisjordania) (Israel OR OCHA OR \"alto el fuego\" OR UNRWA OR humanitaria)",
    keywords: ["gaza", "palestin", "israel", "cisjordania", "unrwa", "rafah"],
    window: "3d",
    editorial: [
      "Este medio publica los reportes de OCHA, UNRWA, el CICR y HRW sobre el impacto en la población civil, y también las posiciones de seguridad del gobierno israelí. Las cifras de víctimas deben contrastarse con la última actualización de OCHA.",
    ],
    actions: [
      "Compartí datos de organismos humanitarios con fecha y enlace.",
      "Apoyá a las agencias que operan dentro de Gaza con acceso verificado.",
    ],
    orgs: [
      { name: "UNRWA", url: "https://www.unrwa.org/es", what: "Agencia de la ONU para refugiados palestinos." },
      { name: "OCHA – Territorio Palestino Ocupado", url: "https://www.ochaopt.org", what: "Datos humanitarios actualizados." },
      { name: "Médicos Sin Fronteras", url: "https://www.msf.org/palestine", what: "Atención médica en Gaza y Cisjordania." },
      { name: "CICR", url: "https://www.icrc.org/es", what: "Derecho internacional humanitario y asistencia." },
    ],
  },
  {
    id: "afganistan",
    name: "Afganistán: mujeres bajo el régimen talibán",
    short: "Afganistán",
    query: "Afganistán (mujeres OR niñas OR talibán OR talibanes OR UNAMA OR \"apartheid de género\")",
    keywords: ["afganist", "talib", "unama", "kabul"],
    window: "7d",
    editorial: [
      "Derechos que hoy no tienen las mujeres afganas: estudiar después de 6.º grado, ir a la universidad, trabajar en la mayoría de los empleos y en ONG, circular sin un tutor varón (mahram), entrar a parques, gimnasios o baños públicos, hablar en voz alta en público según la ley de “virtud y vicio”, y acceder a instalaciones de la ONU desde septiembre de 2025.",
      "La ONU lo describe como “apartheid de género”. Posición de Crisis Global: se trata de la persecución sistemática de la mitad de la población de un país.",
    ],
    actions: [
      "Amplificá las voces de periodistas y activistas afganas en el exilio.",
      "Exigí que la ayuda internacional llegue a través de organizaciones que emplean a mujeres.",
    ],
    orgs: [
      { name: "Women for Afghan Women", url: "https://womenforafghanwomen.org", what: "Refugio y asistencia a mujeres afganas." },
      { name: "Amnistía Internacional", url: "https://www.amnesty.org/es", what: "Documentación e incidencia sobre derechos humanos." },
      { name: "ACNUR – Afganistán", url: "https://www.unhcr.org/afghanistan-emergency", what: "Asistencia a personas desplazadas y refugiadas." },
    ],
  },
  {
    id: "cuerno-de-africa",
    name: "Somalia y Etiopía",
    short: "Cuerno de África",
    query: "(Somalia OR Etiopía OR Tigray OR Amhara OR \"Al Shabaab\") (ONU OR humanitaria OR sequía OR desplazados OR combates)",
    keywords: ["somalia", "etiop", "tigray", "amhara", "shabaab", "cuerno de áfrica"],
    window: "7d",
    editorial: [
      "Sequía, hambre y conflicto se superponen en el Cuerno de África: la violencia en Amhara y Tigray, la actividad de Al Shabaab en Somalia y los recortes de ayuda internacional. Las cifras de desplazamiento e inseguridad alimentaria deben verificarse contra OCHA y ACNUR.",
    ],
    actions: ["Apoyá programas de alimentación y agua en la región."],
    orgs: [
      { name: "Programa Mundial de Alimentos", url: "https://es.wfp.org", what: "Asistencia alimentaria de emergencia." },
      { name: "ACNUR", url: "https://www.acnur.org", what: "Protección a personas refugiadas y desplazadas." },
      { name: "UNICEF", url: "https://www.unicef.org/es", what: "Nutrición, agua y protección de la infancia." },
    ],
  },
  {
    id: "crisis-humanitarias",
    name: "Crisis humanitarias en el mundo",
    short: "Humanitario",
    query: "(\"crisis humanitaria\" OR hambruna OR desplazados OR refugiados) (ONU OR OCHA OR ACNUR OR \"Cruz Roja\" OR MSF)",
    keywords: ["humanitari", "hambruna", "desplazad", "refugiad", "ocha", "acnur", "sudán", "haití", "myanmar", "yemen"],
    window: "3d",
    editorial: [
      "Sudán, Gaza, la RDC, Haití, Myanmar, Yemen y el Sahel concentran las emergencias con menos financiamiento. OCHA estima cada año la cantidad de personas que necesitan asistencia; el plan humanitario global suele recibir menos de la mitad de los fondos requeridos.",
    ],
    actions: [
      "Informate y compartí: la falta de cobertura es parte del problema.",
      "Doná a organizaciones auditadas. Verificá su registro en Charity Navigator, GiveWell o el sitio oficial del organismo.",
      "Evitá donaciones a cuentas personales o campañas virales sin respaldo institucional.",
    ],
    orgs: [
      { name: "ACNUR", url: "https://donate.unhcr.org", what: "Agencia de la ONU para los refugiados." },
      { name: "UNICEF", url: "https://www.unicef.org/es", what: "Infancia en emergencias." },
      { name: "Médicos Sin Fronteras", url: "https://www.msf.org", what: "Atención médica independiente." },
      { name: "Comité Internacional de la Cruz Roja", url: "https://www.icrc.org/es", what: "Asistencia en conflictos armados." },
      { name: "Programa Mundial de Alimentos", url: "https://es.wfp.org", what: "Asistencia alimentaria." },
    ],
  },
  {
    id: "accion-climatica",
    name: "Cambio climático: qué hacer",
    short: "Acción climática",
    query: "(\"cambio climático\" OR \"calentamiento global\" OR emisiones OR IPCC OR COP31) (informe OR récord OR acuerdo OR ONU)",
    keywords: ["cambio climático", "calentamiento", "emisiones", "ipcc", "cop31", "carbono", "omm"],
    window: "3d",
    editorial: [
      "El IPCC es claro: cada décima de grado importa. Las emisiones deben caer casi a la mitad antes de 2030 para mantener el objetivo de 1,5 °C. La contaminación del aire, además, causa millones de muertes prematuras al año según la OMS.",
    ],
    actions: [
      "Reducí el consumo de carne vacuna y los vuelos; priorizá transporte público, bicicleta y energía renovable.",
      "Votá y presioná: las decisiones de gobiernos y grandes empresas pesan más que cualquier gesto individual.",
      "Doná a organizaciones con impacto medido (Giving Green y Founders Pledge publican evaluaciones independientes).",
    ],
    orgs: [
      { name: "Clean Air Task Force", url: "https://www.catf.us", what: "Políticas públicas de descarbonización; recomendada por Giving Green." },
      { name: "350.org", url: "https://350.org/es", what: "Movimiento ciudadano por el clima." },
      { name: "Rainforest Alliance", url: "https://www.rainforest-alliance.org", what: "Bosques y agricultura sostenible." },
      { name: "Cool Earth", url: "https://www.coolearth.org", what: "Protección de selvas junto a comunidades indígenas." },
      { name: "WWF", url: "https://www.wwf.org", what: "Conservación y clima." },
    ],
  },
  {
    id: "derechos-animales",
    name: "Derechos de los animales",
    short: "Animales",
    query: "(\"derechos de los animales\" OR \"bienestar animal\" OR \"maltrato animal\" OR \"tráfico de fauna\" OR \"especies en peligro\")",
    keywords: ["animal", "fauna", "especie", "biodiversidad", "caza"],
    window: "7d",
    editorial: [
      "El tráfico de fauna, la ganadería industrial y la pérdida de hábitat son las principales amenazas. Más de 47.000 especies figuran en la Lista Roja de la UICN con algún grado de amenaza.",
    ],
    actions: [
      "No compres animales silvestres ni productos derivados (marfil, pieles exóticas).",
      "Elegí productos con certificación de bienestar animal y reducí el consumo de origen industrial.",
    ],
    orgs: [
      { name: "Humane World for Animals", url: "https://www.humaneworld.org", what: "Antes Humane Society International." },
      { name: "The Humane League", url: "https://thehumaneleague.org", what: "Bienestar de animales de granja; muy bien evaluada por Animal Charity Evaluators." },
      { name: "Animal Equality", url: "https://animalequality.org", what: "Investigaciones y campañas." },
      { name: "WWF", url: "https://www.wwf.org", what: "Especies y hábitats." },
      { name: "Sea Shepherd", url: "https://www.seashepherdglobal.org", what: "Defensa de la vida marina." },
    ],
  },
  {
    id: "onu",
    name: "Naciones Unidas: debates y resoluciones",
    short: "ONU",
    query: "(\"Consejo de Seguridad\" OR \"Asamblea General\" OR \"Consejo de Derechos Humanos\") ONU (resolución OR votación OR sesión OR debate)",
    keywords: ["consejo de seguridad", "asamblea general", "consejo de derechos humanos", "resolución", "guterres", "secretario general"],
    window: "3d",
    editorial: [
      "Qué se debate y qué se vota en Nueva York y Ginebra: resoluciones del Consejo de Seguridad, sesiones de la Asamblea General y del Consejo de Derechos Humanos, y las respuestas de las agencias de la ONU a las crisis que cubre este medio. Las actas oficiales están en press.un.org y documents.un.org.",
    ],
    actions: ["Seguí las sesiones en vivo en webtv.un.org y leé las resoluciones completas antes de opinar."],
    orgs: [
      { name: "Noticias ONU", url: "https://news.un.org/es", what: "Cobertura oficial en español." },
      { name: "UN Press", url: "https://press.un.org", what: "Comunicados de reuniones y votaciones." },
      { name: "ONU Web TV", url: "https://webtv.un.org", what: "Sesiones en vivo." },
    ],
  },
];

export const getLiveTopic = (id: string) => liveTopics.find((t) => t.id === id);
