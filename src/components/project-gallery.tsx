import Image from "next/image";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Lee el ancho/alto reales de un JPEG (marcador SOF) sin dependencias, para
 * pasarlos a next/image y evitar layout shift. Corre en build (páginas SSG).
 */
function jpegSize(publicPath: string): { width: number; height: number } {
  const fallback = { width: 1280, height: 2400 };
  try {
    const buf = readFileSync(path.join(process.cwd(), "public", publicPath));
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      const isSOF =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;
      if (isSOF) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  } catch {
    /* usa el fallback */
  }
  return fallback;
}

/**
 * Galería de capturas: cada screenshot de página completa va dentro de una
 * "ventana" de navegador con scroll interno. Así se ve el sitio entero sin
 * ocupar media pantalla, y se siente como un mini-navegador embebido.
 */
export function ProjectGallery({
  items,
  label,
}: {
  items: { src: string; url?: string }[];
  label: string;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const host = item.url
          ? item.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
          : null;
        const { width, height } = jpegSize(item.src);
        return (
          <figure key={item.src} className="frame overflow-hidden border border-border">
            <div className="flex items-center gap-2 border-b border-border bg-bg/60 px-3 py-2">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
              </span>
              {host && (
                <span className="ml-1 flex-1 truncate rounded-md bg-surface px-2.5 py-0.5 text-center font-mono text-[10px] text-muted">
                  {host}
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {label}
              </span>
            </div>
            <div className="h-[460px] overflow-y-auto overscroll-contain">
              <Image
                src={item.src}
                alt={host ?? label}
                width={width}
                height={height}
                sizes="(max-width: 768px) 100vw, 720px"
                className="block h-auto w-full"
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}
