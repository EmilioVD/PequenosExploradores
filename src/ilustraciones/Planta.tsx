import { C, Carita, Corazon, Destello, Gota, Lienzo, Mata, Nube, Rayos, T, hojaPath, type Gesto } from './partes';

/** 0 = semilla, 1 = brote, 2 = planta, 3 = flor (mismo orden que ETAPAS en cultivaLogic). */
export type Etapa = 0 | 1 | 2 | 3;

/** Cómo se siente la planta: depende del medidor más desbalanceado. */
export type Animo =
  | 'feliz' // todo en rango
  | 'celebra' // acaba de crecer o floreció
  | 'sed' // poca agua
  | 'ahogada' // demasiada agua
  | 'sinSol' // poco sol
  | 'calor' // demasiado sol
  | 'triste' // poco cariño
  | 'mimada'; // demasiado cariño

type Estilo = {
  hoja: string;
  hojaBaja: string;
  petalo: string;
  /** Grados que se doblan las hojas hacia abajo. */
  caida: number;
  /** Desplazamiento horizontal de la punta del tallo. */
  inclina: number;
  gesto: Gesto;
  tierra: string;
};

const ESTILO: Record<Animo, Estilo> = {
  feliz: { hoja: C.hoja, hojaBaja: C.hojaOscura, petalo: C.coralSuave, caida: 0, inclina: 0, gesto: 'feliz', tierra: C.tierra },
  celebra: { hoja: C.hoja, hojaBaja: C.hojaOscura, petalo: C.coralSuave, caida: -8, inclina: 0, gesto: 'contenta', tierra: C.tierra },
  sed: { hoja: '#B7BF5A', hojaBaja: '#9DA548', petalo: '#E9B9A5', caida: 62, inclina: 26, gesto: 'sed', tierra: '#C49A6C' },
  ahogada: { hoja: '#86A963', hojaBaja: '#6C8E4E', petalo: '#D9A08E', caida: 52, inclina: -16, gesto: 'mareada', tierra: '#4A2E1C' },
  sinSol: { hoja: '#C9D98A', hojaBaja: '#AFC172', petalo: '#EFD2C4', caida: 26, inclina: -34, gesto: 'dormida', tierra: C.tierra },
  calor: { hoja: '#9DB84E', hojaBaja: '#86A03F', petalo: '#E39A6E', caida: 40, inclina: 14, gesto: 'acalorada', tierra: '#B08458' },
  triste: { hoja: '#6FAE73', hojaBaja: '#53935A', petalo: '#E8A893', caida: 30, inclina: 0, gesto: 'triste', tierra: C.tierra },
  mimada: { hoja: C.hoja, hojaBaja: C.hojaOscura, petalo: C.coralSuave, caida: 4, inclina: 0, gesto: 'apenada', tierra: C.tierra },
};

const ETIQUETA_ETAPA = ['semilla', 'brote', 'planta', 'flor'];
const ETIQUETA_ANIMO: Record<Animo, string> = {
  feliz: 'contenta',
  celebra: 'celebrando',
  sed: 'con sed',
  ahogada: 'con demasiada agua',
  sinSol: 'sin suficiente sol',
  calor: 'con demasiado sol',
  triste: 'triste, quiere cariño',
  mimada: 'con demasiados apapachos',
};

export function descripcionPlanta(etapa: Etapa, animo: Animo) {
  return `Tu planta en etapa ${ETIQUETA_ETAPA[etapa]}, ${ETIQUETA_ANIMO[animo]}`;
}

// Geometría (viewBox 0 0 400 400). La base del tallo queda dentro de la tierra de la maceta.
const BASE = { x: 200, y: 292 };
const ALTURA = [0, 92, 158, 196];
const rad = (g: number) => (g * Math.PI) / 180;

/** Punto del tallo (curva cuadrática) en t ∈ [0, 1]. */
function puntoTallo(t: number, top: { x: number; y: number }, ctrl: { x: number; y: number }) {
  const u = 1 - t;
  return {
    x: u * u * BASE.x + 2 * u * t * ctrl.x + t * t * top.x,
    y: u * u * BASE.y + 2 * u * t * ctrl.y + t * t * top.y,
  };
}

/** Par de hojas simétricas en (x, y). `angulo` < 0 apunta hacia arriba. */
function ParHojas({
  x,
  y,
  L,
  w,
  angulo,
  fill,
  gesto,
  nervio,
}: {
  x: number;
  y: number;
  L: number;
  w: number;
  angulo: number;
  fill: string;
  gesto?: Gesto;
  nervio?: boolean;
}) {
  const hoja = (
    <>
      <path d={hojaPath(L, w)} fill={fill} {...T} />
      {nervio && <path d={`M8 0 Q${L * 0.5} ${-w * 0.12} ${L * 0.78} 0`} fill="none" stroke={C.tinta} strokeWidth={2.5} strokeLinecap="round" opacity={0.55} />}
      {gesto && <Carita x={L * 0.56} y={-2} s={0.8} gesto={gesto} r={-angulo} />}
    </>
  );
  return (
    <>
      <g transform={`translate(${x} ${y}) rotate(${angulo})`}>{hoja}</g>
      <g transform={`translate(${x} ${y}) scale(-1 1) rotate(${angulo})`}>{hoja}</g>
    </>
  );
}

function Flor({ x, y, giro, petalo, gesto, abierta }: { x: number; y: number; giro: number; petalo: string; gesto: Gesto; abierta: number }) {
  const petalos = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <g transform={`translate(${x} ${y}) rotate(${giro})`}>
      {petalos.map((a) => (
        <ellipse
          key={a}
          cx={0}
          cy={-38 * abierta}
          rx={17 * abierta}
          ry={26 * abierta}
          transform={`rotate(${a})`}
          fill={petalo}
          {...T}
          strokeWidth={4.5}
        />
      ))}
      <circle r={31} fill={C.sol} {...T} />
      <Carita x={0} y={2} s={1.05} gesto={gesto} r={-giro} />
    </g>
  );
}

function Maceta({ tierra, seca, mojada }: { tierra: string; seca: boolean; mojada: boolean }) {
  return (
    <>
      {/* tierra (cubre la base del tallo) */}
      <path d="M118 300 C126 276 170 270 200 272 C232 270 274 276 282 300 Z" fill={tierra} {...T} />
      {seca && (
        <g fill="none" stroke={C.tinta} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.6}>
          <path d="M150 292 l8 -7 l6 5 l7 -6" />
          <path d="M226 290 l6 -6 l7 4 l5 -5" />
        </g>
      )}
      {mojada && (
        <path d="M120 300 C150 288 250 288 280 300 Z" fill={C.aguaClara} stroke={C.tinta} strokeWidth={4} strokeLinejoin="round" />
      )}
      {/* maceta */}
      <path d="M126 318 L142 384 Q144 392 152 392 L248 392 Q256 392 258 384 L274 318 Z" fill={C.maceta} {...T} />
      <rect x={110} y={294} width={180} height={30} rx={10} fill={C.macetaBorde} {...T} />
      <Corazon x={200} y={358} s={1.1} fill={C.crema} />
      {mojada && (
        <g>
          <path d="M114 304 C108 318 116 330 110 346" fill="none" stroke={C.tinta} strokeWidth={13} strokeLinecap="round" />
          <path d="M114 304 C108 318 116 330 110 346" fill="none" stroke={C.aguaClara} strokeWidth={6} strokeLinecap="round" />
          <path d="M286 304 C292 318 284 334 290 352" fill="none" stroke={C.tinta} strokeWidth={13} strokeLinecap="round" />
          <path d="M286 304 C292 318 284 334 290 352" fill="none" stroke={C.aguaClara} strokeWidth={6} strokeLinecap="round" />
        </g>
      )}
    </>
  );
}

/**
 * La plantita del juego Cultiva. Crece por etapas (semilla → brote → planta → flor) y su aspecto
 * cambia según su ánimo: se marchita con sed, se empapa con mucha agua, palidece sin sol, etc.
 */
export function Planta({ etapa, animo, className }: { etapa: Etapa; animo: Animo; className?: string }) {
  const e = ESTILO[animo];
  const alto = ALTURA[etapa];
  // Al doblarse, la punta del tallo baja un poco.
  const top = { x: BASE.x + e.inclina, y: BASE.y - alto + Math.max(0, e.caida) * (etapa / 3) * 0.5 };
  const ctrl = { x: BASE.x - e.inclina * 0.15, y: BASE.y - alto * 0.55 };
  const tallo = `M${BASE.x} ${BASE.y} Q${ctrl.x} ${ctrl.y} ${top.x} ${top.y}`;

  // Posición de la carita principal (para lágrimas, sudor, burbujas, "zzz").
  let cara = { x: 204, y: 246 };
  if (etapa === 1 || etapa === 2) {
    const a = rad(-28 + e.caida);
    const L = etapa === 1 ? 92 : 80;
    cara = { x: top.x + Math.cos(a) * L * 0.56, y: top.y + Math.sin(a) * L * 0.56 };
  } else if (etapa === 3) {
    cara = top;
  }
  // Punto de referencia para efectos que flotan arriba de la cara, sin salirse del lienzo.
  const arriba = { x: Math.min(cara.x, 280), y: Math.max(cara.y, 112) };

  const fondo = (() => {
    switch (animo) {
      case 'feliz':
        return (
          <>
            <Rayos x={92} y={170} s={1.1} />
            <Rayos x={308} y={170} s={1.1} flip />
          </>
        );
      case 'celebra':
        return (
          <>
            <Rayos x={92} y={150} s={1.2} />
            <Rayos x={308} y={150} s={1.2} flip />
            <Destello x={70} y={70} s={1.2} />
            <Destello x={334} y={92} s={0.9} />
            <Destello x={300} y={250} s={0.7} />
            <Corazon x={96} y={250} s={1.1} />
            <Corazon x={330} y={40} s={0.9} r={14} />
          </>
        );
      case 'calor':
        return (
          <g>
            <g stroke={C.sol} strokeWidth={8} strokeLinecap="round">
              {Array.from({ length: 8 }, (_, i) => (
                <path key={i} d="M0 -50 L0 -64" transform={`translate(330 66) rotate(${i * 45})`} />
              ))}
            </g>
            <circle cx={330} cy={66} r={38} fill={C.sol} {...T} />
            <g fill="none" stroke={C.coral} strokeWidth={4} strokeLinecap="round">
              <path d="M54 120 q8 -10 0 -20 t0 -20" />
              <path d="M78 140 q8 -10 0 -20 t0 -20" />
              <path d="M336 170 q8 -10 0 -20 t0 -20" />
            </g>
          </g>
        );
      case 'sinSol':
        return (
          <>
            <Nube x={300} y={80} s={1.1} fill={C.gris} />
            <Nube x={110} y={56} s={0.8} fill={C.gris} />
            {/* el solecito se asoma lejos; la planta se estira hacia él */}
            <g stroke={C.sol} strokeWidth={6} strokeLinecap="round" opacity={0.9}>
              <path d="M22 150 L36 150" />
              <path d="M26 128 L38 136" />
              <path d="M26 172 L38 164" />
            </g>
          </>
        );
      case 'ahogada':
        return <ellipse cx={200} cy={390} rx={160} ry={12} fill={C.aguaClara} stroke={C.tinta} strokeWidth={4} />;
      case 'sed':
        return (
          <g opacity={0.9}>
            <Gota x={66} y={110} s={1.1} fill="none" />
            <path d="M52 128 L80 92" stroke={C.coral} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      default:
        return null;
    }
  })();

  const frente = (() => {
    switch (animo) {
      case 'triste':
        return (
          <>
            <Gota x={cara.x + 13} y={cara.y + 18} s={0.42} fill={C.aguaClara} />
            <g transform="translate(320 120)">
              <Corazon x={-5} y={0} s={1.1} fill={C.gris} r={-12} />
              <path d="M-4 -12 l4 7 l-5 5 l4 8" fill="none" stroke={C.tinta} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </>
        );
      case 'calor':
        return <Gota x={cara.x - 24} y={cara.y - 14} s={0.48} fill={C.aguaClara} />;
      case 'sinSol':
        return (
          <g fill={C.tinta} fontFamily='"Lilita One", sans-serif'>
            <text x={arriba.x + 30} y={arriba.y - 22} fontSize={22}>
              z
            </text>
            <text x={arriba.x + 46} y={arriba.y - 42} fontSize={28}>
              z
            </text>
          </g>
        );
      case 'ahogada':
        return (
          <g fill={C.aguaClara} stroke={C.tinta} strokeWidth={3}>
            <circle cx={arriba.x + 40} cy={arriba.y - 20} r={7} />
            <circle cx={arriba.x + 56} cy={arriba.y - 46} r={10} />
            <circle cx={arriba.x + 40} cy={arriba.y - 70} r={5} />
          </g>
        );
      case 'mimada':
        return (
          <>
            <Corazon x={arriba.x - 70} y={arriba.y - 40} s={1} r={-14} />
            <Corazon x={arriba.x + 70} y={arriba.y - 52} s={1.2} r={12} />
            <Corazon x={arriba.x + 84} y={arriba.y + 4} s={0.8} r={20} />
            <Corazon x={arriba.x - 86} y={arriba.y + 10} s={0.8} r={-20} />
          </>
        );
      default:
        return null;
    }
  })();

  return (
    <Lienzo viewBox="0 0 400 400" titulo={descripcionPlanta(etapa, animo)} className={className}>
      {fondo}
      <Mata x={44} y={394} s={1.1} />
      <Mata x={358} y={394} s={0.9} />

      {etapa === 0 && (
        <g transform={`rotate(${e.caida * 0.3} 200 250)`}>
          <path d="M200 214 C198 196 208 184 222 180" fill="none" stroke={C.tinta} strokeWidth={13} strokeLinecap="round" />
          <path d="M200 214 C198 196 208 184 222 180" fill="none" stroke={e.hoja} strokeWidth={6} strokeLinecap="round" />
          <g transform={`translate(220 180) rotate(${-40 + e.caida})`}>
            <path d={hojaPath(38, 16)} fill={e.hoja} {...T} strokeWidth={4.5} />
          </g>
          <ellipse cx={200} cy={248} rx={38} ry={42} fill={C.tierraClara} {...T} />
          <path d="M180 222 Q174 242 182 262" fill="none" stroke="#C48A55" strokeWidth={6} strokeLinecap="round" />
          <Carita x={204} y={246} s={1.1} gesto={e.gesto} />
        </g>
      )}

      {etapa > 0 && (
        <>
          <path d={tallo} fill="none" stroke={C.tinta} strokeWidth={17} strokeLinecap="round" />
          <path d={tallo} fill="none" stroke={e.hoja} strokeWidth={8} strokeLinecap="round" />
        </>
      )}

      {etapa === 1 && <ParHojas x={top.x} y={top.y} L={92} w={40} angulo={-28 + e.caida} fill={e.hoja} gesto={e.gesto} />}

      {etapa === 2 && (
        <>
          {(() => {
            const p = puntoTallo(0.42, top, ctrl);
            return <ParHojas x={p.x} y={p.y} L={66} w={26} angulo={-8 + e.caida * 0.8} fill={e.hojaBaja} nervio />;
          })()}
          <ParHojas x={top.x} y={top.y} L={80} w={36} angulo={-28 + e.caida} fill={e.hoja} gesto={e.gesto} />
        </>
      )}

      {etapa === 3 && (
        <>
          {(() => {
            const p = puntoTallo(0.2, top, ctrl);
            return <ParHojas x={p.x} y={p.y} L={70} w={28} angulo={-6 + e.caida * 0.8} fill={e.hojaBaja} nervio />;
          })()}
          {(() => {
            const p = puntoTallo(0.48, top, ctrl);
            return <ParHojas x={p.x} y={p.y} L={60} w={24} angulo={-24 + e.caida} fill={e.hoja} nervio />;
          })()}
          <Flor
            x={top.x}
            y={top.y}
            giro={e.caida * 0.75 + e.inclina * 0.4}
            petalo={e.petalo}
            gesto={e.gesto}
            abierta={animo === 'sinSol' ? 0.82 : animo === 'celebra' ? 1.08 : 1}
          />
        </>
      )}

      <Maceta tierra={e.tierra} seca={animo === 'sed' || animo === 'calor'} mojada={animo === 'ahogada'} />
      {frente}
    </Lienzo>
  );
}
