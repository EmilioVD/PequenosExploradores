import type { ReactNode, SVGProps } from 'react';

/**
 * Piezas compartidas por las ilustraciones SVG. Imitan el estilo de los PNG del diseño:
 * contorno grueso color tinta, colores planos, caritas sencillas, rayos amarillos y matas de pasto.
 */

export const C = {
  tinta: '#0F2E22',
  hoja: '#5BB46B',
  hojaOscura: '#3E9A55',
  pasto: '#3E9A55',
  pastoClaro: '#5DB872',
  sol: '#FFCD33',
  tierra: '#7A4B2A',
  tierraClara: '#9A6235',
  coral: '#F07A5C',
  coralSuave: '#F59A7E',
  maceta: '#E07F5F',
  macetaBorde: '#EB9171',
  agua: '#4892C4',
  aguaClara: '#8EC5EA',
  crema: '#FFFCF7',
  mejilla: '#F59A8A',
  gris: '#B9C4C0',
} as const;

/** Atributos de contorno estándar. */
export const T = {
  stroke: C.tinta,
  strokeWidth: 5,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
} as const satisfies SVGProps<SVGElement>;

export type Gesto = 'feliz' | 'contenta' | 'sed' | 'mareada' | 'dormida' | 'acalorada' | 'triste' | 'apenada';

/** Carita centrada en (x, y). Mide ~36 px de ancho con s = 1. */
export function Carita({ x, y, s = 1, gesto = 'feliz', r = 0 }: { x: number; y: number; s?: number; gesto?: Gesto; r?: number }) {
  const linea = { stroke: C.tinta, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;
  const ojos = (() => {
    switch (gesto) {
      case 'contenta':
        return (
          <>
            <path d="M-14 -1 Q-10 -8 -6 -1" {...linea} />
            <path d="M6 -1 Q10 -8 14 -1" {...linea} />
          </>
        );
      case 'dormida':
        return (
          <>
            <path d="M-14 -4 Q-10 1 -6 -4" {...linea} />
            <path d="M6 -4 Q10 1 14 -4" {...linea} />
          </>
        );
      case 'acalorada':
      case 'apenada':
        return (
          <>
            <path d="M-14 -7 L-7 -3 L-14 1" {...linea} />
            <path d="M14 -7 L7 -3 L14 1" {...linea} />
          </>
        );
      case 'mareada':
        return (
          <>
            <path d="M-10 -3 m-4.5 0 a4.5 4.5 0 1 1 4.5 4.5 a2.6 2.6 0 1 1 -2.6 -2.6" {...linea} strokeWidth={2.4} />
            <path d="M10 -3 m-4.5 0 a4.5 4.5 0 1 1 4.5 4.5 a2.6 2.6 0 1 1 -2.6 -2.6" {...linea} strokeWidth={2.4} />
          </>
        );
      case 'sed':
        return (
          <>
            <path d="M-15 -6 L-5 -6" {...linea} />
            <path d="M5 -6 L15 -6" {...linea} />
            <circle cx={-10} cy={-2} r={2.8} fill={C.tinta} />
            <circle cx={10} cy={-2} r={2.8} fill={C.tinta} />
          </>
        );
      case 'triste':
        return (
          <>
            <path d="M-15 -9 L-6 -11" {...linea} strokeWidth={2.4} />
            <path d="M15 -9 L6 -11" {...linea} strokeWidth={2.4} />
            <circle cx={-10} cy={-3} r={3.2} fill={C.tinta} />
            <circle cx={10} cy={-3} r={3.2} fill={C.tinta} />
          </>
        );
      default:
        return (
          <>
            <circle cx={-10} cy={-3} r={3.4} fill={C.tinta} />
            <circle cx={10} cy={-3} r={3.4} fill={C.tinta} />
          </>
        );
    }
  })();
  const boca = (() => {
    switch (gesto) {
      case 'contenta':
        return <path d="M-7 4 Q0 15 7 4 Z" fill="#B8513A" stroke={C.tinta} strokeWidth={2.6} strokeLinejoin="round" />;
      case 'sed':
      case 'acalorada':
        return (
          <>
            <ellipse cx={0} cy={8} rx={5} ry={5.5} fill="#B8513A" stroke={C.tinta} strokeWidth={2.6} />
            <path d="M-3 10 Q0 15 3 10" fill={C.coralSuave} />
          </>
        );
      case 'dormida':
        return <circle cx={0} cy={7} r={2.8} fill="none" stroke={C.tinta} strokeWidth={2.6} />;
      case 'mareada':
      case 'apenada':
        return <path d="M-8 7 q2 -3 4 0 t4 0 t4 0 t4 0" {...linea} strokeWidth={2.6} />;
      case 'triste':
        return <path d="M-6 9 Q0 3 6 9" {...linea} />;
      default:
        return <path d="M-6 4 Q0 10 6 4" {...linea} />;
    }
  })();
  const mejillas = gesto === 'acalorada' || gesto === 'apenada' ? 0.95 : 0.7;
  const rx = gesto === 'acalorada' || gesto === 'apenada' ? 5.5 : 4.2;
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {gesto !== 'sed' && gesto !== 'mareada' && (
        <>
          <ellipse cx={-17} cy={4} rx={rx} ry={2.8} fill={C.mejilla} opacity={mejillas} />
          <ellipse cx={17} cy={4} rx={rx} ry={2.8} fill={C.mejilla} opacity={mejillas} />
        </>
      )}
      {ojos}
      {boca}
    </g>
  );
}

/** Tres trazos amarillos (como rays.svg). Apuntan a la izquierda; con flip, a la derecha. */
export function Rayos({ x, y, s = 1, flip = false, r = 0 }: { x: number; y: number; s?: number; flip?: boolean; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${flip ? -s : s} ${s})`} stroke={C.sol} strokeWidth={8} strokeLinecap="round">
      <path d="M-6 -22 L-20 -36" />
      <path d="M-10 0 L-30 0" />
      <path d="M-6 22 L-20 36" />
    </g>
  );
}

/** Mata de pasto sin contorno, dos tonos de verde. (x, y) = base. */
export function Mata({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-4 0 C-22 -6 -26 -22 -24 -34 C-14 -26 -6 -16 -4 0 Z" fill={C.pastoClaro} />
      <path d="M4 0 C22 -6 26 -20 26 -30 C14 -24 6 -14 4 0 Z" fill={C.pastoClaro} />
      <path d="M-6 0 C-10 -18 -6 -38 2 -48 C8 -34 10 -16 6 0 Z" fill={C.pasto} />
    </g>
  );
}

/** Forma de hoja que apunta hacia +x desde el origen. */
export function hojaPath(L: number, w: number) {
  return `M0 0 C${L * 0.22} ${-w} ${L * 0.72} ${-w} ${L} 0 C${L * 0.72} ${w * 0.78} ${L * 0.22} ${w * 0.78} 0 0 Z`;
}

/** Brotecito estilo mascota: montón de tierra, tallo y dos hojas con carita. (x, y) = base de la tierra. */
export function Brotecito({ x, y, s = 1, gesto = 'feliz', tierra = true }: { x: number; y: number; s?: number; gesto?: Gesto; tierra?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -8 C-2 -40 2 -60 0 -78" fill="none" stroke={C.tinta} strokeWidth={15} strokeLinecap="round" />
      <path d="M0 -8 C-2 -40 2 -60 0 -78" fill="none" stroke={C.hoja} strokeWidth={7} strokeLinecap="round" />
      <g transform="translate(0 -76) rotate(-28)">
        <path d={hojaPath(76, 34)} fill={C.hoja} {...T} />
        <Carita x={42} y={-3} s={0.75} gesto={gesto} r={28} />
      </g>
      <g transform="translate(0 -76) scale(-1 1) rotate(-28)">
        <path d={hojaPath(76, 34)} fill={C.hoja} {...T} />
        <Carita x={42} y={-3} s={0.75} gesto={gesto} r={28} />
      </g>
      {tierra && <path d="M-58 0 C-50 -22 -20 -26 0 -24 C24 -26 52 -20 58 0 Z" fill={C.tierra} {...T} />}
    </g>
  );
}

/** Signo de interrogación grande en verde, como en game-quiz.png. */
export function Pregunta({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill="none" strokeLinecap="round">
      <path d="M-14 -22 C-14 -44 18 -46 18 -24 C18 -10 2 -8 2 6" stroke={C.tinta} strokeWidth={18} />
      <path d="M-14 -22 C-14 -44 18 -46 18 -24 C18 -10 2 -8 2 6" stroke={C.hojaOscura} strokeWidth={10} />
      <circle cx={2} cy={26} r={8} fill={C.hojaOscura} stroke={C.tinta} strokeWidth={4} />
    </g>
  );
}

/** Corazón centrado en (x, y). */
export function Corazon({ x, y, s = 1, fill = C.coral, r = 0 }: { x: number; y: number; s?: number; fill?: string; r?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}
      d="M0 8 C-14 -2 -14 -14 -6 -14 C-3 -14 -1 -12 0 -9 C1 -12 3 -14 6 -14 C14 -14 14 -2 0 8 Z"
      fill={fill}
      stroke={C.tinta}
      strokeWidth={3}
      strokeLinejoin="round"
    />
  );
}

/** Destello de 4 puntas. */
export function Destello({ x, y, s = 1, fill = C.sol }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -14 Q2 -2 14 0 Q2 2 0 14 Q-2 2 -14 0 Q-2 -2 0 -14 Z"
      fill={fill}
      stroke={C.tinta}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
  );
}

/** Gota de agua con punta hacia arriba. (x, y) = centro de la parte redonda. */
export function Gota({ x, y, s = 1, fill = C.agua, contorno = true }: { x: number; y: number; s?: number; fill?: string; contorno?: boolean }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -22 C6 -12 12 -6 12 2 C12 9 6 13 0 13 C-6 13 -12 9 -12 2 C-12 -6 -6 -12 0 -22 Z"
      fill={fill}
      {...(contorno ? { stroke: C.tinta, strokeWidth: 3.5, strokeLinejoin: 'round' as const } : {})}
    />
  );
}

/** Nube con contorno. (x, y) = centro de la base. */
export function Nube({ x, y, s = 1, fill = C.crema }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M-44 0 C-58 0 -58 -22 -42 -22 C-42 -40 -18 -44 -10 -30 C-4 -46 26 -46 28 -26 C46 -28 50 0 36 0 Z"
      fill={fill}
      {...T}
      strokeWidth={4}
    />
  );
}

/** Contenedor SVG accesible. */
export function Lienzo({
  viewBox,
  titulo,
  className,
  children,
}: {
  viewBox: string;
  titulo: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={titulo} className={className} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}
