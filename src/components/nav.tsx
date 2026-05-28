"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "/", label: "inicio" },
  { href: "/trabajo", label: "trabajo" },
  { href: "/stack", label: "stack" },
  { href: "/blog", label: "blog" },
  { href: "/contacto", label: "contacto" },
];

export function Nav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-lg">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight">
          andres pamplona<span className="text-muted">.dev</span>
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden gap-1 sm:flex">
          {links.slice(1).map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-surface"
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
          <button
            onClick={toggle}
            aria-label="Cambiar tema"
            className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-fg"
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
            className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-fg sm:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-bg/95 backdrop-blur-lg sm:hidden"
          >
            <ul className="mx-auto flex w-full max-w-3xl flex-col px-6 py-2">
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
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
