"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

// useLayoutEffect avisa en SSR; en el servidor cae a useEffect (no-op).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Métrica con animación count-up. Separa el valor en prefijo + número + sufijo
 * (ej. "<1s" -> "<" / 1 / "s") y anima solo la parte numérica al entrar en
 * pantalla. El valor REAL final es el contenido por defecto (SSR / sin JS /
 * reduce-motion); el count-up solo arranca en 0 en el cliente justo antes de
 * pintar, para que no haya parpadeo ni "0" en el HTML inicial.
 */
export function Metric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const started = useRef(false);
  const reduceMotion = useReducedMotion();

  const parsed = useMemo(() => {
    const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!m) return null;
    return {
      prefix: m[1],
      target: parseFloat(m[2]),
      suffix: m[3],
      decimals: m[2].includes(".") ? 1 : 0,
    };
  }, [value]);

  // Por defecto se muestra el valor REAL final (SSR, sin JS y con reduce-motion).
  const [display, setDisplay] = useState(value);

  // En cliente, justo antes de pintar: si vamos a animar, arranca en 0 para que
  // el count-up corra limpio. El HTML del servidor conserva el valor real.
  useIsoLayoutEffect(() => {
    if (parsed && !reduceMotion) {
      setDisplay(`${parsed.prefix}0${parsed.suffix}`);
    }
  }, [parsed, reduceMotion]);

  useEffect(() => {
    if (!inView || !parsed || reduceMotion || started.current) return;
    started.current = true;
    const controls = animate(0, parsed.target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(`${parsed.prefix}${v.toFixed(parsed.decimals)}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, parsed, reduceMotion]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="block font-mono text-xl font-medium leading-none tracking-tight tabular-nums">
        {display}
      </span>
      <span className="mt-1 block whitespace-nowrap text-[10px] uppercase tracking-widest text-muted">
        {label}
      </span>
    </motion.div>
  );
}
