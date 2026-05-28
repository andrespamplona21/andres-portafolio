"use client";

import Link from "next/link";
import { motion } from "motion/react";

type Variant = "primary" | "ghost" | "gradient";

const styles: Record<Variant, string> = {
  // primary lleva el barrido de brillo (.btn-shine)
  primary:
    "btn-shine bg-fg text-bg hover:opacity-90",
  ghost:
    "border border-border bg-surface hover:bg-bg",
  // gradient lleva el borde con gradiente animado (.btn-gradient-border)
  gradient:
    "btn-gradient-border text-fg hover:bg-bg",
};

const spring = { type: "spring" as const, stiffness: 400, damping: 22 };

/**
 * Botón/enlace con micro-interacción: se eleva al pasar el cursor y se
 * "hunde" al hacer click. Sirve para enlaces internos, externos o descargas.
 */
export function MotionButton({
  href,
  children,
  variant = "primary",
  external,
  download,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
}) {
  const className = `group inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm transition-colors ${styles[variant]}`;

  const content = (
    <motion.span
      className={className}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.97 }}
      transition={spring}
    >
      {children}
    </motion.span>
  );

  if (external || download) {
    return (
      <a
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block">
      {content}
    </Link>
  );
}
