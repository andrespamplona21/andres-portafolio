import Image from "next/image";

/**
 * Monta un screenshot en una "ventana" de navegador: barra superior con
 * semáforo y la URL real del proyecto, y la captura debajo. La profundidad
 * (sombra en capas) y el reveal al hover viven en .frame (globals.css);
 * aquí solo el transform de la imagen, que sí es seguro animar.
 */
export function BrowserFrame({
  src,
  alt,
  url,
}: {
  src: string;
  alt: string;
  url?: string;
}) {
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : null;

  return (
    <div className="frame overflow-hidden border border-border">
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
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 460px"
          className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}
