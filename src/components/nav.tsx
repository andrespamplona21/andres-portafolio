"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { AnimatePresence, motion } from "motion/react";
import { stripLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

export function Nav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: dict.nav.inicio },
    { href: "/trabajo", label: dict.nav.trabajo },
    { href: "/sobre-mi", label: dict.nav.sobreMi },
    { href: "/stack", label: dict.nav.stack },
    { href: "/blog", label: dict.nav.blog },
    { href: "/contacto", label: dict.nav.contacto },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const current = stripLocale(pathname);
  const isActive = (href: string) =>
    current === href || (href !== "/" && current.startsWith(href));

  const localized = (href: string) =>
    href === "/" ? `/${lang}` : `/${lang}${href}`;

  const other: Locale = lang === "es" ? "en" : "es";
  const switchHref = `/${other}${stripLocale(pathname) === "/" ? "" : stripLocale(pathname)}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-lg">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-6">
        <Link
          href={`/${lang}`}
          className="font-mono text-sm font-medium tracking-tight"
        >
          andres pamplona<span className="text-accent-strong">.dev</span>
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden gap-1 sm:flex">
          {links.slice(1).map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={localized(l.href)}
                className="relative px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative ${active ? "text-fg" : ""}`}>
                  {l.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={switchHref}
            aria-label={dict.langSwitch[other]}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            {other}
          </Link>

          <button
            onClick={toggle}
            aria-label="Cambiar tema"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          {/* Botón hamburguesa — solo móvil */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-fg sm:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border/60 bg-bg/95 backdrop-blur-lg sm:hidden"
          >
            <ul className="mx-auto flex w-full max-w-3xl flex-col px-6 py-2">
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={localized(l.href)}
                      className={`block rounded-md px-3 py-3 text-sm transition-colors hover:bg-surface ${
                        active ? "text-fg" : "text-muted"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
