import type { Localized } from "@/data/projects";

export type Level = "daily" | "comfortable" | "exploring";

export type Tech = {
  name: string;
  note: Localized;
  level: Level;
};

export type StackGroup = {
  category: Localized;
  items: Tech[];
};

export const stack: StackGroup[] = [
  {
    category: { es: "Frontend", en: "Frontend" },
    items: [
      { name: "Astro", note: { es: "Sitios rápidos con islas interactivas.", en: "Fast sites with interactive islands." }, level: "daily" },
      { name: "Next.js", note: { es: "App Router, server components, routing.", en: "App Router, server components, routing." }, level: "daily" },
      { name: "React", note: { es: "Hooks, composición, manejo de estado.", en: "Hooks, composition, state management." }, level: "daily" },
      { name: "TypeScript", note: { es: "Tipado estricto en todo lo nuevo.", en: "Strict typing on everything new." }, level: "comfortable" },
      { name: "Tailwind", note: { es: "Utility-first sin pelearle al CSS.", en: "Utility-first without fighting CSS." }, level: "daily" },
      { name: "Motion", note: { es: "Animaciones declarativas en React.", en: "Declarative animations in React." }, level: "comfortable" },
      { name: "CSS moderno", note: { es: "Grid, container queries, custom properties.", en: "Grid, container queries, custom properties." }, level: "daily" },
    ],
  },
  {
    category: { es: "Backend", en: "Backend" },
    items: [
      { name: "Java + Spring", note: { es: "APIs REST, JPA, validaciones.", en: "REST APIs, JPA, validation." }, level: "comfortable" },
      { name: "Node.js", note: { es: "Endpoints sencillos y scripts.", en: "Simple endpoints and scripts." }, level: "comfortable" },
      { name: "PostgreSQL", note: { es: "Schemas, joins, queries decentes.", en: "Schemas, joins, decent queries." }, level: "comfortable" },
      { name: "Supabase", note: { es: "Auth, RLS, realtime, storage.", en: "Auth, RLS, realtime, storage." }, level: "comfortable" },
    ],
  },
  {
    category: { es: "Herramientas", en: "Tools" },
    items: [
      { name: "Git", note: { es: "Flujo con ramas y PRs.", en: "Branch and PR workflow." }, level: "daily" },
      { name: "Vercel", note: { es: "Deploy y previews automáticos.", en: "Automatic deploys and previews." }, level: "daily" },
      { name: "Figma", note: { es: "Leer diseños y traducirlos a código.", en: "Reading designs and turning them into code." }, level: "comfortable" },
      { name: "Docker", note: { es: "Contenerizar lo que hago.", en: "Containerizing what I build." }, level: "exploring" },
    ],
  },
  {
    category: { es: "SEO & crecimiento", en: "SEO & growth" },
    items: [
      { name: "SEO técnico", note: { es: "Optimización para Google y Bing.", en: "Optimization for Google and Bing." }, level: "daily" },
      { name: "Search Console (GSC)", note: { es: "Indexación y rendimiento en búsqueda.", en: "Indexing and search performance." }, level: "daily" },
      { name: "Google Analytics", note: { es: "Medición y eventos del sitio.", en: "Site measurement and events." }, level: "daily" },
      { name: "Google APIs", note: { es: "Places, Maps y reseñas en vivo (Place ID).", en: "Places, Maps, and live reviews (Place ID)." }, level: "comfortable" },
      { name: "Google Ads / Business", note: { es: "Campañas y perfil de negocio.", en: "Campaigns and business profile." }, level: "comfortable" },
    ],
  },
  {
    category: { es: "Automatización & IA", en: "Automation & AI" },
    items: [
      { name: "GoHighLevel", note: { es: "Captación y CRM de clientes.", en: "Lead capture and client CRM." }, level: "comfortable" },
      { name: "Make / Zapier", note: { es: "Flujos entre apps sin fricción.", en: "Friction-free flows between apps." }, level: "comfortable" },
      { name: "Claude / ChatGPT", note: { es: "Para acelerar el desarrollo.", en: "To speed up development." }, level: "exploring" },
    ],
  },
];
