export type Tech = {
  name: string;
  note: string;
  level: "diario" | "cómodo" | "explorando";
};

export type StackGroup = {
  category: string;
  items: Tech[];
};

export const stack: StackGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "Astro", note: "Sitios rápidos con islas interactivas.", level: "diario" },
      { name: "Next.js", note: "App Router, server components, routing.", level: "diario" },
      { name: "React", note: "Hooks, composición, manejo de estado.", level: "diario" },
      { name: "TypeScript", note: "Tipado estricto en todo lo nuevo.", level: "cómodo" },
      { name: "Tailwind", note: "Utility-first sin pelearle al CSS.", level: "diario" },
      { name: "Motion", note: "Animaciones declarativas en React.", level: "cómodo" },
      { name: "CSS moderno", note: "Grid, container queries, custom properties.", level: "diario" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Java + Spring", note: "APIs REST, JPA, validaciones.", level: "cómodo" },
      { name: "Node.js", note: "Endpoints sencillos y scripts.", level: "cómodo" },
      { name: "PostgreSQL", note: "Schemas, joins, queries decentes.", level: "cómodo" },
      { name: "Supabase", note: "Auth, RLS, realtime, storage.", level: "cómodo" },
    ],
  },
  {
    category: "Herramientas",
    items: [
      { name: "Git", note: "Flujo con ramas y PRs.", level: "diario" },
      { name: "Vercel", note: "Deploy y previews automáticos.", level: "diario" },
      { name: "Figma", note: "Leer diseños y traducirlos a código.", level: "cómodo" },
      { name: "Docker", note: "Contenerizar lo que hago.", level: "explorando" },
    ],
  },
];
