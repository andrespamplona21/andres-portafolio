"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";

/**
 * Métrica con animación count-up. Separa el valor en prefijo + número + sufijo
 * (ej. "<1s" -> "<" / 1 / "s") y anima solo la parte numérica al entrar en
 * pantalla. Si el valor no tiene número, lo muestra tal cual.
 */
export function Metric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const started = useRef(false);

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

  const [display, setDisplay] = useState(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!inView || !parsed || started.current) return;
    started.current = true;
    const controls = animate(0, parsed.target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(`${parsed.prefix}${v.toFixed(parsed.decimals)}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, parsed]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="block font-mono text-xl font-medium leading-none tracking-tight tabular-nums">
        {parsed ? display : value}
      </span>
      <span className="mt-1 block whitespace-nowrap text-[10px] uppercase tracking-widest text-muted">
        {label}
      </span>
    </motion.div>
  );
}
