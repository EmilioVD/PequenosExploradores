import { fotosPlantas } from '../data/fotosPlantas';
import { asset } from '../lib/assets';
import { cx } from '../lib/cx';
import { Placeholder } from './Placeholder';

/** Foto real de una planta. Si no hay foto para ese slug, muestra el placeholder. */
export function FotoPlanta({
  slug,
  nombre,
  className,
  credito = false,
}: {
  slug: string;
  nombre: string;
  className?: string;
  /** Muestra el crédito del autor encima de la foto (requerido por la licencia). */
  credito?: boolean;
}) {
  const foto = fotosPlantas[slug];
  if (!foto) return <Placeholder label={slug} className={className} />;
  return (
    <figure className={cx('relative m-0 overflow-hidden', className)}>
      <img
        src={asset(`plantas/${slug}.jpg`)}
        alt={`Foto de ${nombre.toLowerCase()}`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      {credito && (
        <figcaption className="absolute bottom-0 right-0 rounded-tl-lg bg-tinta/60 px-2 py-0.5 text-[11px] leading-4 text-white">
          Foto:{' '}
          <a href={foto.fuente} target="_blank" rel="noreferrer" className="underline">
            {foto.autor}
          </a>{' '}
          · {foto.licencia}
        </figcaption>
      )}
    </figure>
  );
}
