import type { ReactNode } from 'react';
import { C, Carita, T, hojaPath } from './partes';

/**
 * Una ilustración por residuo del juego "Separa los residuos" (viewBox 200×120, más ancho que alto
 * para el hueco de la tarjeta arrastrable). La clave es el `id` de data/residuos.ts.
 */

const t = { ...T, strokeWidth: 4 } as const;
const fina = { stroke: C.tinta, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

const ROJO = '#E0584A';
const CARTON = '#D9A46A';
const CARTON_OSCURO = '#B9844C';
const METAL = '#CFD8DC';
const METAL_OSCURO = '#9EAEB5';

const dibujos: Record<string, ReactNode> = {
  platano: (
    <g transform="translate(100 112)">
      <path d="M-44 0 C-56 -22 -38 -48 -8 -54 C-24 -32 -22 -14 -16 0 Z" fill={C.sol} {...t} />
      <path d="M44 0 C56 -20 42 -50 10 -56 C26 -34 24 -16 18 0 Z" fill={C.sol} {...t} />
      <path d="M-20 0 C-26 -38 -14 -80 4 -100 C24 -78 30 -38 22 0 Z" fill="#FFE07A" {...t} />
      <path d="M-2 -98 L4 -110 L12 -107 L8 -96" fill={C.tierraClara} {...t} strokeWidth={3.5} />
      <circle cx={-6} cy={-18} r={2.5} fill={C.tierraClara} />
      <circle cx={12} cy={-70} r={2.5} fill={C.tierraClara} />
      <Carita x={2} y={-44} s={0.7} />
    </g>
  ),
  hojas: (
    <>
      <g transform="translate(46 84) rotate(-28)">
        <path d={hojaPath(92, 36)} fill="#D98C4A" {...t} />
        <path d="M6 0 L80 0 M30 0 L42 -16 M52 0 L64 -14 M30 0 L42 13 M52 0 L64 11" {...fina} />
      </g>
      <g transform="translate(92 98) rotate(-58)">
        <path d={hojaPath(80, 30)} fill="#C9A24A" {...t} />
        <path d="M6 0 L70 0 M26 0 L36 -13 M46 0 L56 -11 M26 0 L36 11 M46 0 L56 9" {...fina} />
      </g>
      <path d="M40 88 L28 100" {...fina} strokeWidth={4} />
    </>
  ),
  manzana: (
    <g transform="translate(100 62)">
      <path d="M-30 -38 C-46 -38 -46 -20 -30 -20 L30 -20 C46 -20 46 -38 30 -38 C18 -46 6 -42 0 -38 C-6 -42 -18 -46 -30 -38 Z" fill={ROJO} {...t} />
      <path d="M-24 -20 C-12 -6 -12 10 -24 24 L24 24 C12 10 12 -6 24 -20 Z" fill="#FFF3DE" {...t} />
      <path d="M-30 24 C-44 24 -42 44 -26 46 C-10 52 10 52 26 46 C42 44 44 24 30 24 Z" fill={ROJO} {...t} />
      <path d="M0 -40 C0 -48 4 -54 8 -56" {...fina} strokeWidth={4} />
      <g transform="translate(6 -50) rotate(-30)">
        <path d={hojaPath(20, 9)} fill={C.hoja} {...t} strokeWidth={3} />
      </g>
      <ellipse cx={-5} cy={4} rx={3} ry={4.5} fill={C.tierra} />
      <ellipse cx={5} cy={4} rx={3} ry={4.5} fill={C.tierra} />
    </g>
  ),
  huevo: (
    <>
      <g transform="translate(70 70) rotate(-12)">
        <path d="M-30 6 C-30 -18 -16 -42 0 -42 C16 -42 30 -18 30 6 L20 -4 L10 8 L0 -6 L-10 8 L-20 -4 Z" fill="#FFF3DE" {...t} />
        <Carita x={0} y={-16} s={0.55} />
      </g>
      <g transform="translate(138 84) rotate(10)">
        <path d="M-32 -10 L-22 0 L-12 -12 L-2 0 L8 -12 L18 0 L28 -10 C30 14 16 26 -2 26 C-20 26 -34 14 -32 -10 Z" fill="#FFF3DE" {...t} />
        <path d="M-24 4 C-22 14 -14 20 -4 20" {...fina} stroke="#E9C99A" strokeWidth={4} />
      </g>
    </>
  ),
  periodico: (
    <g transform="translate(100 62) rotate(-6)">
      <path d="M-62 -40 L56 -40 L62 -34 L62 40 L-62 40 Z" fill="#F3EEE4" {...t} />
      <path d="M-62 -40 L-48 -48 L68 -48 L62 -40" fill="#E2DACB" {...t} />
      <rect x={-50} y={-30} width={100} height={12} rx={2} fill={C.tinta} />
      <rect x={-50} y={-10} width={40} height={30} rx={3} fill={C.aguaClara} {...t} strokeWidth={3} />
      <path d="M-2 -8 L50 -8 M-2 2 L50 2 M-2 12 L40 12 M-50 30 L50 30" {...fina} />
    </g>
  ),
  caja: (
    <g transform="translate(100 66)">
      <path d="M-58 -16 L0 -38 L58 -16 L58 30 L0 52 L-58 30 Z" fill={CARTON} {...t} />
      <path d="M-58 -16 L0 6 L58 -16 M0 6 L0 52" fill="none" {...t} />
      <path d="M0 6 L58 -16 L58 30 L0 52 Z" fill={CARTON_OSCURO} {...t} />
      <path d="M-30 -27 L28 -5" stroke="#F3D9A8" strokeWidth={9} strokeLinecap="round" />
      <path d="M-58 -16 L0 -38 L58 -16 L0 6 Z" fill="none" {...t} />
      <Carita x={-28} y={18} s={0.7} r={20} />
    </g>
  ),
  cuaderno: (
    <g transform="translate(100 60) rotate(-6)">
      <rect x={-52} y={-44} width={104} height={88} rx={8} fill={C.agua} {...t} />
      <rect x={-22} y={-20} width={56} height={26} rx={4} fill={C.crema} {...t} strokeWidth={3} />
      <path d="M-14 -10 L26 -10 M-14 -2 L16 -2" {...fina} />
      {[-30, -14, 2, 18, 34].map((y) => (
        <path key={y} d={`M-60 ${y} C-66 ${y - 4} -66 ${y + 6} -60 ${y + 4} L-44 ${y + 4}`} fill="none" stroke={C.tinta} strokeWidth={3.5} strokeLinecap="round" />
      ))}
      <path d="M34 28 L52 28 L52 44 Z" fill="#E7EEF2" {...t} strokeWidth={3} />
    </g>
  ),
  botella: (
    <g transform="translate(100 64) rotate(-14)">
      <path d="M-66 -22 C-66 -26 -62 -28 -58 -28 L30 -28 C46 -28 50 -12 64 -12 L64 12 C50 12 46 28 30 28 L-58 28 C-62 28 -66 26 -66 22 Z" fill={C.aguaClara} {...t} />
      <rect x={62} y={-15} width={18} height={30} rx={4} fill={C.agua} {...t} />
      <rect x={-34} y={-28} width={40} height={56} fill={C.crema} {...t} />
      <path d="M-56 -16 L-48 -16" stroke={C.crema} strokeWidth={5} strokeLinecap="round" />
      <Carita x={-14} y={0} s={0.62} />
    </g>
  ),
  lata: (
    <g transform="translate(100 62) rotate(8)">
      <path d="M-28 -40 L28 -40 L28 40 L-28 40 Z" fill={ROJO} {...t} />
      <ellipse cx={0} cy={-40} rx={28} ry={8} fill={METAL} {...t} />
      <ellipse cx={4} cy={-41} rx={7} ry={3} fill={METAL_OSCURO} />
      <path d="M-28 40 C-28 52 28 52 28 40" fill={METAL} {...t} />
      <path d="M-28 -24 C-10 -18 10 -30 28 -24" fill="none" stroke={C.crema} strokeWidth={6} />
      <Carita x={0} y={10} s={0.7} />
      <path d="M-20 -14 L-20 24" stroke="#F4A3A0" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
  yogur: (
    <g transform="translate(100 60)">
      <path d="M-38 -36 L-28 42 Q-27 48 -20 48 L20 48 Q27 48 28 42 L38 -36 Z" fill={C.crema} {...t} />
      <path d="M-35 -10 L35 -10 L32 18 L-32 18 Z" fill="#F4A3A0" {...t} strokeWidth={3} />
      <circle cx={-14} cy={4} r={5} fill={ROJO} stroke={C.tinta} strokeWidth={2} />
      <path d="M-46 -38 C-46 -46 46 -46 46 -38 C46 -32 -46 -32 -46 -38 Z" fill={METAL} {...t} />
      <path d="M40 -40 C54 -46 60 -36 54 -28" fill={METAL} {...t} strokeWidth={3.5} />
      <Carita x={8} y={34} s={0.55} />
    </g>
  ),
  naranja: (
    <>
      {/* tira de cáscara en espiral */}
      <path d="M96 80 C112 96 140 98 150 80 C160 62 140 44 124 54 C112 62 122 78 136 72" fill="none" stroke={C.tinta} strokeWidth={17} strokeLinecap="round" />
      <path d="M96 80 C112 96 140 98 150 80 C160 62 140 44 124 54 C112 62 122 78 136 72" fill="none" stroke="#F5A13A" strokeWidth={9} strokeLinecap="round" />
      {/* naranja a medio pelar */}
      <circle cx={74} cy={62} r={38} fill="#F5A13A" {...t} />
      <path d="M44 84 C58 66 92 66 106 84 C96 98 54 98 44 84 Z" fill="#FFD9A0" {...t} strokeWidth={3.5} />
      <path d="M60 80 L62 92 M75 78 L75 96 M90 80 L88 92" {...fina} stroke="#E8913A" />
      <path d="M70 24 C70 18 74 14 78 13" {...fina} strokeWidth={4} />
      <g transform="translate(77 16) rotate(-20)">
        <path d={hojaPath(20, 9)} fill={C.hoja} {...t} strokeWidth={3} />
      </g>
      <circle cx={56} cy={40} r={2} fill="#C97A1E" />
      <circle cx={92} cy={46} r={2} fill="#C97A1E" />
      <Carita x={74} y={54} s={0.62} />
    </>
  ),
  pasto: (
    <g transform="translate(100 108)">
      {[-56, -38, -20, -2, 16, 34, 52].map((x, i) => (
        <path key={x} d={`M${x} -20 C${x + (i % 2 ? 4 : -4)} -42 ${x + (i % 2 ? 10 : -10)} -56 ${x + (i % 2 ? 14 : -14)} -64`} stroke={C.tinta} strokeWidth={11} strokeLinecap="round" fill="none" />
      ))}
      {[-56, -38, -20, -2, 16, 34, 52].map((x, i) => (
        <path key={x} d={`M${x} -20 C${x + (i % 2 ? 4 : -4)} -42 ${x + (i % 2 ? 10 : -10)} -56 ${x + (i % 2 ? 14 : -14)} -64`} stroke={i % 2 ? C.pasto : C.pastoClaro} strokeWidth={5} strokeLinecap="round" fill="none" />
      ))}
      <path d="M-72 0 C-66 -30 -34 -42 0 -42 C34 -42 66 -30 72 0 Z" fill={C.pastoClaro} {...t} />
      <path d="M-44 -10 l-6 -10 M34 -12 l6 -10 M-14 -28 l2 -10 M14 -26 l4 -10" stroke={C.pasto} strokeWidth={4} strokeLinecap="round" />
      <Carita x={0} y={-14} s={0.62} />
    </g>
  ),
  'hoja-papel': (
    <g transform="translate(100 60) rotate(5)">
      <path d="M-40 -48 L22 -48 L40 -30 L40 48 L-40 48 Z" fill={C.crema} {...t} />
      <path d="M22 -48 L22 -30 L40 -30" fill="#E7EEF2" {...t} strokeWidth={3} />
      <path d="M-28 -30 L-28 40" stroke="#F4A3A0" strokeWidth={2.5} />
      <g stroke={C.aguaClara} strokeWidth={2.5}>
        <path d="M-36 -18 L36 -18 M-36 -4 L36 -4 M-36 10 L36 10 M-36 24 L36 24 M-36 38 L36 38" />
      </g>
      <Carita x={6} y={8} s={0.62} />
    </g>
  ),
  tubo: (
    <g transform="translate(100 62) rotate(-10)">
      <path d="M-52 -26 L44 -26 L44 26 L-52 26 Z" fill={CARTON} {...t} />
      <path d="M-40 -26 L-10 26 M-6 -26 L24 26" stroke={CARTON_OSCURO} strokeWidth={3} />
      <path d="M-52 -26 L44 -26 M-52 26 L44 26" {...t} />
      <ellipse cx={44} cy={0} rx={12} ry={26} fill={CARTON_OSCURO} {...t} />
      <ellipse cx={44} cy={0} rx={6} ry={18} fill={C.tierra} />
      <ellipse cx={-52} cy={0} rx={12} ry={26} fill={CARTON} {...t} />
      <Carita x={-4} y={0} s={0.6} />
    </g>
  ),
  'lata-atun': (
    <g transform="translate(100 66)">
      <path d="M-50 -18 L-50 18 C-50 34 50 34 50 18 L50 -18 Z" fill={C.agua} {...t} />
      <path d="M-50 -6 C-50 8 50 8 50 -6 L50 10 C50 24 -50 24 -50 10 Z" fill={C.crema} stroke={C.tinta} strokeWidth={2.5} />
      <ellipse cx={0} cy={-18} rx={50} ry={16} fill={METAL} {...t} />
      <ellipse cx={0} cy={-18} rx={38} ry={10} fill="none" stroke={METAL_OSCURO} strokeWidth={3} />
      <path d="M26 -24 C30 -36 46 -38 50 -30 C52 -26 44 -22 38 -24" fill={METAL} {...t} strokeWidth={3.5} />
      {/* pescadito */}
      <g transform="translate(0 7)">
        <path d="M-14 0 C-8 -7 6 -7 12 0 C6 7 -8 7 -14 0 Z M12 0 L20 -6 L20 6 Z" fill={C.agua} stroke={C.tinta} strokeWidth={2} strokeLinejoin="round" />
        <circle cx={-6} cy={-1} r={1.5} fill={C.tinta} />
      </g>
    </g>
  ),
  tapa: (
    <g transform="translate(100 62)">
      <path d="M-44 -10 L-44 14 C-44 34 44 34 44 14 L44 -10 Z" fill={C.agua} {...t} />
      <g stroke={C.tinta} strokeWidth={2.5} strokeLinecap="round">
        {[-34, -22, -10, 2, 14, 26, 36].map((x) => (
          <path key={x} d={`M${x} ${2 + Math.abs(x) * 0.12} L${x} ${20 + Math.abs(x) * 0.05 - (Math.abs(x) > 30 ? 4 : 0)}`} />
        ))}
      </g>
      <ellipse cx={0} cy={-10} rx={44} ry={20} fill={C.aguaClara} {...t} />
      <path d="M-26 -18 C-18 -24 -6 -26 4 -26" stroke={C.crema} strokeWidth={5} strokeLinecap="round" fill="none" />
      <Carita x={0} y={-8} s={0.6} />
    </g>
  ),
};

/**
 * Ilustración de un residuo. Es decorativa (el nombre ya va escrito debajo en la tarjeta).
 * Devuelve null si el id no tiene dibujo, para que la tarjeta use un placeholder.
 */
export function ResiduoIlustracion({ id, className }: { id: string; className?: string }) {
  const d = dibujos[id];
  if (!d) return null;
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      {d}
    </svg>
  );
}

export const residuosConIlustracion = Object.keys(dibujos);
