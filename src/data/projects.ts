export type Project = {
  slug: string;
  title: string;
  description: string;
  year: number;
  status: "live" | "wip" | "archived";
  tags: string[];
  // Métricas/resultados del proyecto. El valor puede llevar prefijo o sufijo
  // (ej. "30+", "100", "<1s") — la parte numérica se anima con count-up.
  metrics?: { value: string; label: string }[];
  image?: string;
  links: {
    demo?: string;
    repo?: string;
    caseStudy?: string;
  };
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    slug: "neurovivir",
    title: "NeuroVivir — clínica de neuropsicología",
    description:
      "Sitio para una clínica de neuropsicología y terapia. Astro con contenido bilingüe ES/EN, secciones de servicios, equipo y agendamiento. Enfocado en accesibilidad y carga rápida.",
    year: 2025,
    status: "live",
    tags: ["Astro", "React", "Tailwind", "i18n"],
    metrics: [
      { value: "30+", label: "servicios" },
      { value: "2", label: "idiomas" },
      { value: "100", label: "Lighthouse" },
    ],
    image: "/projects/neurovivir.jpg",
    links: {
      demo: "https://neurovivir.com",
    },
    highlight: true,
  },
  {
    slug: "renasci-medspa",
    title: "Renasci MedSpa — medical spa en Utah",
    description:
      "Web para un medical spa en Midvale, Utah (Botox, rellenos dérmicos y tratamientos estéticos). Astro + React con animaciones GSAP/Motion, smooth scroll con Lenis y soporte bilingüe.",
    year: 2025,
    status: "live",
    tags: ["Astro", "React", "GSAP", "Motion", "Tailwind"],
    metrics: [
      { value: "2", label: "idiomas" },
      { value: "60", label: "FPS" },
      { value: "100", label: "Lighthouse" },
    ],
    image: "/projects/renasci-medspa.jpg",
    links: {
      demo: "https://renascimedspa.com",
    },
    highlight: true,
  },
  {
    slug: "senor-de-las-casas",
    title: "Señor de las Casas — inmobiliaria e hipotecas",
    description:
      "Plataforma inmobiliaria con información hipotecaria, listados y contenido bilingüe. Astro + Supabase, tareas programadas con node-cron y logging con Winston, desplegado en Vercel.",
    year: 2025,
    status: "live",
    tags: ["Astro", "Supabase", "Vercel", "Tailwind"],
    metrics: [
      { value: "2", label: "idiomas" },
      { value: "100", label: "Lighthouse" },
      { value: "100%", label: "responsive" },
    ],
    image: "/projects/senor-de-las-casas.jpg",
    links: {
      demo: "https://senordelascasas.com",
    },
    highlight: true,
  },
  {
    slug: "broker-lenders",
    title: "Broker Lenders — créditos hipotecarios",
    description:
      "Landing para un broker de créditos hipotecarios (FHA, VA, convencional y jumbo). Astro con carruseles Swiper, formularios con envío por correo vía Nodemailer y diseño orientado a conversión.",
    year: 2026,
    status: "live",
    tags: ["Astro", "Swiper", "Nodemailer", "Tailwind"],
    metrics: [
      { value: "4", label: "créditos" },
      { value: "<1s", label: "carga" },
      { value: "100", label: "Lighthouse" },
    ],
    image: "/projects/broker-lenders.jpg",
    links: {
      demo: "https://brokerlenders.com",
    },
    highlight: true,
  },
];
