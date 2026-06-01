import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type ProjectDetail = {
  overview: Localized;
  purpose: Localized;
  built: LocalizedList;
  stack: string[];
  gallery?: string[];
};

export type Project = {
  slug: string;
  title: Localized;
  description: Localized;
  year: number;
  status: "live" | "wip" | "archived";
  tags: string[];
  metrics?: { value: string; label: Localized }[];
  image?: string;
  links: {
    demo?: string;
    repo?: string;
    caseStudy?: string;
  };
  highlight?: boolean;
  detail: ProjectDetail;
};

export const projects: Project[] = [
  // --- Destacados (aparecen en la home) ---
  {
    slug: "renasci-medspa",
    title: {
      es: "Renasci MedSpa — medical spa en Utah",
      en: "Renasci MedSpa — medical spa in Utah",
    },
    description: {
      es: "Web para un medical spa en Midvale, Utah (Botox, rellenos dérmicos y tratamientos estéticos). Astro + React con animaciones GSAP/Motion, smooth scroll con Lenis y soporte bilingüe.",
      en: "Website for a medical spa in Midvale, Utah (Botox, dermal fillers, and aesthetic treatments). Astro + React with GSAP/Motion animations, Lenis smooth scroll, and bilingual support.",
    },
    year: 2025,
    status: "live",
    tags: ["Astro", "React", "GSAP", "Motion", "Tailwind"],
    metrics: [
      { value: "2", label: { es: "idiomas", en: "languages" } },
      { value: "60", label: { es: "FPS", en: "FPS" } },
      { value: "100", label: { es: "Lighthouse", en: "Lighthouse" } },
    ],
    image: "/projects/renasci-medspa.jpg",
    links: { demo: "https://renascimedspa.com" },
    highlight: true,
    detail: {
      overview: {
        es: "Web para un medical spa en Midvale, Utah, especializado en Botox, rellenos dérmicos y tratamientos estéticos. Astro + React con un fuerte trabajo de animación y soporte bilingüe.",
        en: "Website for a medical spa in Midvale, Utah, specializing in Botox, dermal fillers, and aesthetic treatments. Astro + React with heavy animation work and bilingual support.",
      },
      purpose: {
        es: "Dar una sensación premium acorde a una marca de estética de gama alta y convertir las visitas en citas agendadas.",
        en: "Deliver a premium feel matching a high-end aesthetics brand and turn visits into booked appointments.",
      },
      built: {
        es: [
          "Animaciones con GSAP y Motion, con smooth scroll vía Lenis para una sensación premium.",
          "Astro + React, usando islas solo donde la interactividad lo pedía.",
          "Soporte bilingüe ES/EN.",
          "60 FPS y Lighthouse 100 cuidando el rendimiento a pesar de las animaciones.",
        ],
        en: [
          "Animations with GSAP and Motion, with Lenis smooth scroll for a premium feel.",
          "Astro + React, using islands only where interactivity required it.",
          "Bilingual ES/EN support.",
          "60 FPS and a 100 Lighthouse score while keeping the animations smooth.",
        ],
      },
      stack: ["Astro", "React", "GSAP", "Motion", "Lenis", "Tailwind"],
      gallery: ["/projects/renasci-medspa/full.jpg"],
    },
  },
  {
    slug: "car-injury-clinics",
    title: {
      es: "Car Injury Clinics — atención tras accidente",
      en: "Car Injury Clinics — post-accident care",
    },
    description: {
      es: "Sitio para una red de clínicas de atención médica y legal tras accidentes automovilísticos en EE. UU. Astro con contenido bilingüe ES/EN, reseñas en vivo vía Google Places y diseño orientado a captar pacientes.",
      en: "Site for a network of medical and legal clinics for post-car-accident care in the US. Astro with bilingual ES/EN content, live Google Places reviews, and a patient-acquisition focused design.",
    },
    year: 2025,
    status: "live",
    tags: ["Astro", "Tailwind", "Google Places", "i18n"],
    metrics: [
      { value: "2", label: { es: "idiomas", en: "languages" } },
      { value: "100", label: { es: "Lighthouse", en: "Lighthouse" } },
      { value: "100%", label: { es: "responsive", en: "responsive" } },
    ],
    image: "/projects/carinjuryclinics.png",
    links: { demo: "https://carinjuryclinics.com" },
    highlight: true,
    detail: {
      overview: {
        es: "Sitio para una red de clínicas de atención médica y legal tras accidentes automovilísticos en EE. UU. Astro con contenido bilingüe y reseñas en vivo de Google.",
        en: "Site for a network of medical and legal clinics for post-car-accident care in the US. Astro with bilingual content and live Google reviews.",
      },
      purpose: {
        es: "Captar pacientes tras un accidente con información clara y confiable, reforzada con prueba social en tiempo real.",
        en: "Acquire patients after an accident with clear, trustworthy information backed by real-time social proof.",
      },
      built: {
        es: [
          "Integración de reseñas en vivo con la API de Google Places (Place ID).",
          "Contenido bilingüe ES/EN con rutas por idioma.",
          "APIs REST con Node.js y TypeScript para envío automatizado de correos.",
          "Diseño orientado a la captación de pacientes.",
        ],
        en: [
          "Live reviews integration with the Google Places API (Place ID).",
          "Bilingual ES/EN content with per-language routes.",
          "REST APIs with Node.js and TypeScript for automated email delivery.",
          "Patient-acquisition focused design.",
        ],
      },
      stack: ["Astro", "Tailwind", "Google Places API", "Node.js", "i18n"],
      gallery: ["/projects/car-injury-clinics/full.jpg"],
    },
  },
  {
    slug: "senor-de-las-casas",
    title: {
      es: "Señor de las Casas — inmobiliaria e hipotecas",
      en: "Señor de las Casas — real estate & mortgages",
    },
    description: {
      es: "Plataforma inmobiliaria con información hipotecaria, listados y contenido bilingüe. Astro + Supabase, tareas programadas con node-cron y logging con Winston, desplegado en Vercel.",
      en: "Real estate platform with mortgage information, listings, and bilingual content. Astro + Supabase, scheduled jobs with node-cron and Winston logging, deployed on Vercel.",
    },
    year: 2025,
    status: "live",
    tags: ["Astro", "Supabase", "Vercel", "Tailwind"],
    metrics: [
      { value: "2", label: { es: "idiomas", en: "languages" } },
      { value: "100", label: { es: "Lighthouse", en: "Lighthouse" } },
      { value: "100%", label: { es: "responsive", en: "responsive" } },
    ],
    image: "/projects/senor-de-las-casas.jpg",
    links: { demo: "https://senordelascasas.com" },
    highlight: true,
    detail: {
      overview: {
        es: "Plataforma inmobiliaria con listados, información hipotecaria y contenido bilingüe. Astro en el frontend y Supabase en el backend, con tareas programadas para mantener los datos al día.",
        en: "Real estate platform with listings, mortgage information, and bilingual content. Astro on the frontend and Supabase on the backend, with scheduled jobs to keep data current.",
      },
      purpose: {
        es: "Centralizar listados e información hipotecaria para una audiencia bilingüe, manteniendo la información actualizada de forma automática.",
        en: "Centralize listings and mortgage information for a bilingual audience, keeping the data updated automatically.",
      },
      built: {
        es: [
          "Backend con Supabase para listados y datos.",
          "Tareas programadas con node-cron para refrescar información sin intervención manual.",
          "Logging con Winston para observar y depurar el sistema.",
          "Contenido bilingüe y despliegue continuo en Vercel.",
        ],
        en: [
          "Supabase backend for listings and data.",
          "Scheduled jobs with node-cron to refresh information without manual work.",
          "Winston logging to observe and debug the system.",
          "Bilingual content and continuous deployment on Vercel.",
        ],
      },
      stack: ["Astro", "Supabase", "node-cron", "Winston", "Vercel", "Tailwind"],
      gallery: ["/projects/senor-de-las-casas/full.jpg"],
    },
  },

  // --- Resto (solo en /trabajo) ---
  {
    slug: "neurovivir",
    title: {
      es: "NeuroVivir — clínica de neuropsicología",
      en: "NeuroVivir — neuropsychology clinic",
    },
    description: {
      es: "Sitio para una clínica de neuropsicología y terapia. Astro con contenido bilingüe ES/EN, secciones de servicios, equipo y agendamiento. Enfocado en accesibilidad y carga rápida.",
      en: "Site for a neuropsychology and therapy clinic. Astro with bilingual ES/EN content, sections for services, team, and booking. Focused on accessibility and fast loads.",
    },
    year: 2025,
    status: "live",
    tags: ["Astro", "React", "Tailwind", "i18n"],
    metrics: [
      { value: "30+", label: { es: "servicios", en: "services" } },
      { value: "2", label: { es: "idiomas", en: "languages" } },
      { value: "100", label: { es: "Lighthouse", en: "Lighthouse" } },
    ],
    image: "/projects/neurovivir.jpg",
    links: { demo: "https://neurovivir.com" },
    detail: {
      overview: {
        es: "Sitio web para una clínica de neuropsicología y terapia enfocada en niños y familias. Lo construí en Astro con contenido bilingüe ES/EN y una estructura clara de servicios, equipo y agendamiento.",
        en: "Website for a neuropsychology and therapy clinic focused on children and families. Built in Astro with bilingual ES/EN content and a clear structure for services, team, and booking.",
      },
      purpose: {
        es: "Transmitir confianza y calidez a familias que buscan atención, con una navegación directa hacia los servicios y un camino simple para agendar una cita.",
        en: "Convey trust and warmth to families seeking care, with direct navigation to services and a simple path to book an appointment.",
      },
      built: {
        es: [
          "Arquitectura en Astro con islas interactivas para mantener el JavaScript al mínimo.",
          "Contenido bilingüe ES/EN con rutas separadas por idioma.",
          "Secciones de servicios, cómo funciona, equipo profesional y testimonios.",
          "Cuidado de la accesibilidad y un Lighthouse de 100.",
        ],
        en: [
          "Astro architecture with interactive islands to keep JavaScript to a minimum.",
          "Bilingual ES/EN content with separate routes per language.",
          "Sections for services, how it works, professional team, and testimonials.",
          "Attention to accessibility and a 100 Lighthouse score.",
        ],
      },
      stack: ["Astro", "React", "Tailwind", "i18n"],
      gallery: ["/projects/neurovivir/full.jpg"],
    },
  },
  {
    slug: "broker-lenders",
    title: {
      es: "Broker Lenders — créditos hipotecarios",
      en: "Broker Lenders — mortgage loans",
    },
    description: {
      es: "Landing para un broker de créditos hipotecarios (FHA, VA, convencional y jumbo). Astro con carruseles Swiper, formularios con envío por correo vía Nodemailer y diseño orientado a conversión.",
      en: "Landing page for a mortgage loan broker (FHA, VA, conventional, and jumbo). Astro with Swiper carousels, email forms via Nodemailer, and conversion-focused design.",
    },
    year: 2026,
    status: "live",
    tags: ["Astro", "Swiper", "Nodemailer", "Tailwind"],
    metrics: [
      { value: "4", label: { es: "créditos", en: "loan types" } },
      { value: "<1s", label: { es: "carga", en: "load" } },
      { value: "100", label: { es: "Lighthouse", en: "Lighthouse" } },
    ],
    image: "/projects/broker-lenders.jpg",
    links: { demo: "https://brokerlenders.com" },
    detail: {
      overview: {
        es: "Landing para un broker de créditos hipotecarios que ofrece préstamos FHA, VA, convencionales y jumbo. Construida en Astro con foco en velocidad y conversión.",
        en: "Landing page for a mortgage loan broker offering FHA, VA, conventional, and jumbo loans. Built in Astro with a focus on speed and conversion.",
      },
      purpose: {
        es: "Una landing rápida y orientada a conversión que explique los tipos de crédito y capte prospectos sin fricción.",
        en: "A fast, conversion-oriented landing that explains the loan types and captures leads without friction.",
      },
      built: {
        es: [
          "Carruseles con Swiper para presentar los tipos de crédito.",
          "Formularios con envío por correo vía Nodemailer.",
          "Diseño orientado a conversión con CTAs claros.",
          "Carga por debajo de 1s y Lighthouse 100.",
        ],
        en: [
          "Swiper carousels to present the loan types.",
          "Email-sending forms via Nodemailer.",
          "Conversion-oriented design with clear CTAs.",
          "Sub-1s load and a 100 Lighthouse score.",
        ],
      },
      stack: ["Astro", "Swiper", "Nodemailer", "Tailwind"],
      gallery: ["/projects/broker-lenders/full.jpg"],
    },
  },
  {
    slug: "accidenter",
    title: {
      es: "Accidenter — urgencias tras accidente",
      en: "Accidenter — accident urgent care",
    },
    description: {
      es: "Sitio para una clínica de atención médica de urgencia enfocada en lesiones por accidentes: colisiones, incidentes laborales y deportivos. Pensado para captar pacientes con agendamiento rápido.",
      en: "Site for an urgent care clinic focused on accident injuries: collisions, workplace incidents, and sports injuries. Built to acquire patients with fast scheduling.",
    },
    year: 2025,
    status: "live",
    tags: ["Astro", "Tailwind", "SEO"],
    image: "/projects/accidenter.png",
    links: { demo: "https://accidenter.com" },
    detail: {
      overview: {
        es: "Sitio para una clínica de atención de urgencias enfocada en lesiones tras accidentes de auto, laborales y deportivos en EE. UU. Construido con foco en captación de pacientes.",
        en: "Site for an urgent care clinic focused on injuries after car, workplace, and sports accidents in the US. Built with a patient-acquisition focus.",
      },
      purpose: {
        es: "Que un paciente recién accidentado encuentre rápido cómo recibir atención, con agendamiento directo y mensajes claros de confianza.",
        en: "Help a just-injured patient quickly find how to get care, with direct scheduling and clear, reassuring messaging.",
      },
      built: {
        es: [
          "Frontend en Astro y Tailwind, responsive mobile-first.",
          "Flujo de agendamiento y llamada con CTAs visibles.",
          "SEO técnico y analítica orientados a captación.",
          "Integración de chat para atención inmediata.",
        ],
        en: [
          "Astro and Tailwind frontend, mobile-first responsive.",
          "Scheduling and call flow with prominent CTAs.",
          "Technical SEO and analytics geared toward acquisition.",
          "Chat integration for immediate support.",
        ],
      },
      stack: ["Astro", "Tailwind", "SEO", "Vercel"],
      gallery: ["/projects/accidenter/full.jpg"],
    },
  },
  {
    slug: "painmanagementpi",
    title: {
      es: "Pain Management PI — manejo del dolor",
      en: "Pain Management PI — pain management",
    },
    description: {
      es: "Sitio para una clínica de manejo del dolor y lesiones por accidente (personal injury). Diagnóstico rápido, plan personalizado y seguimiento, con foco en agendar y convertir.",
      en: "Site for a pain management and personal-injury clinic. Fast diagnosis, personalized plan, and follow-up, focused on booking and conversion.",
    },
    year: 2025,
    status: "live",
    tags: ["Astro", "Tailwind", "SEO"],
    image: "/projects/painmanagementpi.png",
    links: { demo: "https://painmanagementpi.com" },
    detail: {
      overview: {
        es: "Sitio para una clínica de manejo del dolor orientada a pacientes de personal injury. Mensaje claro de diagnóstico rápido, plan personalizado y seguimiento.",
        en: "Site for a pain management clinic aimed at personal-injury patients. Clear messaging around fast diagnosis, a personalized plan, and follow-up.",
      },
      purpose: {
        es: "Convertir visitas en citas, comunicando rapidez y cercanía a pacientes con dolor tras un accidente.",
        en: "Turn visits into appointments by communicating speed and care to patients in pain after an accident.",
      },
      built: {
        es: [
          "Frontend en Astro y Tailwind, responsive mobile-first.",
          "Secciones de servicios y carruseles.",
          "Formularios de agendamiento y llamada directa.",
          "SEO técnico y analítica.",
        ],
        en: [
          "Astro and Tailwind frontend, mobile-first responsive.",
          "Services sections and carousels.",
          "Scheduling forms and direct call.",
          "Technical SEO and analytics.",
        ],
      },
      stack: ["Astro", "Tailwind", "SEO", "Vercel"],
      gallery: ["/projects/painmanagementpi/full.jpg"],
    },
  },
  {
    slug: "gestor-suscripciones",
    title: {
      es: "Gestor de suscripciones — app iOS",
      en: "Subscription manager — iOS app",
    },
    description: {
      es: "App para iPhone que ayuda a administrar tus suscripciones, llevar el balance de gastos y ver los próximos cobros en un calendario. Proyecto personal en desarrollo.",
      en: "iPhone app to manage your subscriptions, track spending, and see upcoming charges on a calendar. Personal project, in development.",
    },
    year: 2026,
    status: "wip",
    tags: ["iOS", "Swift"],
    links: {},
    detail: {
      overview: {
        es: "App para iPhone que ayuda a administrar tus suscripciones, llevar el balance de gastos y ver los próximos cobros en un calendario. Es un proyecto personal en desarrollo activo.",
        en: "iPhone app that helps you manage your subscriptions, track spending, and see upcoming charges on a calendar. A personal project in active development.",
      },
      purpose: {
        es: "Ayudar a la gente a ver con claridad qué está pagando y evitar cobros sorpresa.",
        en: "Help people clearly see what they're paying for and avoid surprise charges.",
      },
      built: {
        es: [
          "Gestión de suscripciones con balance de gastos.",
          "Calendario con los próximos cobros.",
          "Proyecto personal, en desarrollo activo.",
        ],
        en: [
          "Subscription management with a spending balance.",
          "Calendar with upcoming charges.",
          "Personal project, in active development.",
        ],
      },
      stack: ["iOS", "Swift"],
    },
  },
];
