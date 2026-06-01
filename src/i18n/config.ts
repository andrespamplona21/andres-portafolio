export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Quita el prefijo de idioma de un pathname: /es/trabajo -> /trabajo */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}
