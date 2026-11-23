import type { ReactNode } from 'react';
import { asset } from '../lib/assets';
import { Brotecito, C, Carita, Destello, Gota, Lienzo, Mata, Pregunta, Rayos, T, hojaPath } from './partes';

/**
 * Una ilustración por pregunta del quiz (viewBox 400×300). La clave es el `id` de la pregunta en
 * data/quiz.ts. Procuran no regalar la respuesta: muestran el tema, no la opción correcta.
 */

const Suelo = () => (
  <>
    <Mata x={34} y={292} s={0.9} />
    <Mata x={368} y={292} s={0.8} />
  </>
);

function Sol({ x, y, r = 44, cara = true }: { x: number; y: number; r?: number; cara?: boolean }) {
  return (
    <g>
      <g stroke={C.sol} strokeWidth={9} strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M0 ${-r - 12} L0 ${-r - 26}`} transform={`translate(${x} ${y}) rotate(${i * 45 + 22})`} />
        ))}
      </g>
      <circle cx={x} cy={y} r={r} fill={C.sol} {...T} />
      {cara && <Carita x={x} y={y + 4} s={r / 30} />}
    </g>
  );
}

function Maceta({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-40 -46 L-30 -4 Q-29 0 -24 0 L24 0 Q29 0 30 -4 L40 -46 Z" fill={C.maceta} {...T} />
      <rect x={-50} y={-62} width={100} height={20} rx={7} fill={C.macetaBorde} {...T} />
    </g>
  );
}

function Bote({ x, y, color, tapa, s = 1, children }: { x: number; y: number; color: string; tapa: string; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-34 -78 L-28 -4 Q-27 0 -22 0 L22 0 Q27 0 28 -4 L34 -78 Z" fill={color} {...T} />
      <rect x={-42} y={-94} width={84} height={18} rx={6} fill={tapa} {...T} />
      <rect x={-12} y={-104} width={24} height={12} rx={4} fill={tapa} {...T} strokeWidth={4} />
      {children}
    </g>
  );
}

const ilustraciones: Record<string, { titulo: string; dibujo: ReactNode }> = {
  alimento: {
    titulo: 'Un sol sonriente ilumina una plantita',
    dibujo: (
      <>
        <g stroke={C.sol} strokeWidth={5} strokeDasharray="2 14" strokeLinecap="round" opacity={0.9}>
          <path d="M240 120 L170 190" />
          <path d="M256 138 L200 204" />
          <path d="M222 110 L150 176" />
        </g>
        <Sol x={290} y={86} />
        <Brotecito x={150} y={284} s={1.25} />
        <Suelo />
      </>
    ),
  },
  raices: {
    titulo: 'Una plantita y sus raíces bajo la tierra, con gotas de agua',
    dibujo: (
      <>
        <rect x={40} y={150} width={320} height={136} rx={22} fill={C.tierra} {...T} />
        <path d="M40 166 Q40 150 62 150 L338 150 Q360 150 360 166 L360 172 L40 172 Z" fill={C.pastoClaro} {...T} />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M200 170 L200 246 M200 196 C186 210 170 214 158 232 M200 206 C214 220 232 222 244 240 M200 228 C192 240 182 248 178 262 M200 232 C210 246 220 252 222 266" stroke={C.tinta} strokeWidth={10} />
          <path d="M200 170 L200 246 M200 196 C186 210 170 214 158 232 M200 206 C214 220 232 222 244 240 M200 228 C192 240 182 248 178 262 M200 232 C210 246 220 252 222 266" stroke="#E9C99A" strokeWidth={4.5} />
        </g>
        <Gota x={100} y={210} s={0.9} />
        <Gota x={300} y={200} s={0.8} />
        <Gota x={286} y={256} s={0.65} />
        <Gota x={116} y={262} s={0.6} />
        <g fill="none" stroke={C.aguaClara} strokeWidth={4} strokeLinecap="round" strokeDasharray="3 9">
          <path d="M120 212 Q150 214 164 228" />
          <path d="M280 204 Q256 214 244 232" />
        </g>
        <Brotecito x={200} y={172} s={1.05} tierra={false} />
      </>
    ),
  },
  oxigeno: {
    titulo: 'Un árbol sonriente suelta burbujas de aire limpio',
    dibujo: (
      <>
        <path d="M128 286 L136 196 L164 196 L172 286 Z" fill={C.tierraClara} {...T} />
        <path
          d="M70 172 C40 160 46 110 82 108 C80 64 130 46 152 72 C172 36 236 48 230 96 C266 100 268 150 236 164 C232 196 180 206 160 188 C140 206 86 202 70 172 Z"
          fill={C.hoja}
          {...T}
        />
        <Carita x={152} y={138} s={1.4} />
        <g fill={C.crema} stroke={C.agua} strokeWidth={4}>
          <circle cx={282} cy={156} r={26} />
          <circle cx={330} cy={92} r={34} />
          <circle cx={270} cy={62} r={18} />
        </g>
        <g fill={C.agua} fontFamily='"Lilita One", sans-serif' textAnchor="middle">
          <text x={282} y={164} fontSize={22}>
            O<tspan fontSize={13.2} dy={4.4}>2</tspan>
          </text>
          <text x={330} y={102} fontSize={30}>
            O<tspan fontSize={18} dy={6}>2</tspan>
          </text>
          <text x={270} y={68} fontSize={15}>
            O<tspan fontSize={9} dy={3}>2</tspan>
          </text>
        </g>
        <Mata x={210} y={292} s={0.8} />
        <Mata x={60} y={292} s={0.7} />
        <Mata x={360} y={292} s={0.9} />
      </>
    ),
  },
  platano: {
    titulo: 'Una cáscara de plátano junto a tres botes de colores',
    dibujo: (
      <>
        <g transform="translate(112 276)">
          <path d="M-58 0 C-70 -30 -44 -64 -6 -70 C-30 -40 -28 -18 -20 0 Z" fill={C.sol} {...T} />
          <path d="M58 0 C72 -26 52 -64 12 -72 C34 -44 32 -20 22 0 Z" fill={C.sol} {...T} />
          <path d="M-26 0 C-34 -50 -18 -104 6 -132 C30 -100 38 -50 28 0 Z" fill="#FFE07A" {...T} />
          <path d="M-4 -132 L4 -150 L14 -146 L10 -128" fill={C.tierraClara} {...T} strokeWidth={4} />
          <circle cx={-8} cy={-24} r={3} fill={C.tierraClara} />
          <circle cx={16} cy={-90} r={3} fill={C.tierraClara} />
          <Carita x={2} y={-58} s={0.95} />
        </g>
        <Pregunta x={206} y={108} s={1.15} r={10} />
        <Bote x={250} y={286} s={0.62} color="#5DB872" tapa="#3E9A55" />
        <Bote x={306} y={286} s={0.62} color="#8CB8DB" tapa="#4A86B5" />
        <Bote x={362} y={286} s={0.62} color="#FFDA6B" tapa="#E5B21F" />
      </>
    ),
  },
  agua: {
    titulo: 'Una llave de agua gotea junto a una gotita sonriente y un cepillo de dientes',
    dibujo: (
      <>
        <path d="M30 70 L150 70 Q176 70 176 96 L176 116 L146 116 L146 100 L30 100 Z" fill="#CFD8DC" {...T} />
        <rect x={84} y={42} width={22} height={30} rx={4} fill="#CFD8DC" {...T} />
        <rect x={60} y={30} width={70} height={16} rx={8} fill={C.agua} {...T} />
        <rect x={140} y={114} width={42} height={12} rx={4} fill="#AEBBC0" {...T} strokeWidth={4} />
        <Gota x={161} y={150} s={0.7} />
        <Gota x={161} y={196} s={0.5} />
        <g transform="translate(276 196)">
          <path d="M0 -84 C26 -46 54 -22 54 14 C54 46 28 66 0 66 C-28 66 -54 46 -54 14 C-54 -22 -26 -46 0 -84 Z" fill={C.aguaClara} {...T} />
          <path d="M-30 -2 C-30 -18 -22 -30 -12 -38" fill="none" stroke={C.crema} strokeWidth={6} strokeLinecap="round" />
          <Carita x={0} y={18} s={1.3} />
        </g>
        <g transform="translate(90 258) rotate(-18)">
          <rect x={-60} y={-8} width={110} height={16} rx={8} fill={C.coral} {...T} strokeWidth={4} />
          <rect x={22} y={-26} width={30} height={20} rx={4} fill={C.crema} {...T} strokeWidth={4} />
          <g stroke={C.agua} strokeWidth={3}>
            <path d="M28 -24 L28 -10 M36 -24 L36 -10 M44 -24 L44 -10" />
          </g>
        </g>
        <Rayos x={220} y={110} s={0.6} r={30} />
      </>
    ),
  },
  composta: {
    titulo: 'Un cajón de madera con cáscaras, hojas secas y una lombriz sonriente',
    dibujo: (
      <>
        <path d="M100 180 C130 130 270 130 300 180 Z" fill={C.tierra} {...T} />
        <path d="M150 150 C140 128 158 118 170 136 C176 116 194 120 188 146 Z" fill={C.sol} {...T} strokeWidth={4} />
        <g transform="translate(238 140) rotate(30)">
          <path d={hojaPath(46, 20)} fill="#C9A24A" {...T} strokeWidth={4} />
        </g>
        <g transform="translate(130 156) rotate(-150)">
          <path d={hojaPath(40, 18)} fill="#D98C4A" {...T} strokeWidth={4} />
        </g>
        <path d="M206 150 C198 128 220 120 226 136 C234 120 252 132 238 150 Z" fill="#E0584A" {...T} strokeWidth={4} />
        <g {...T} strokeWidth={4.5} fill="#C48A55">
          <rect x={86} y={176} width={228} height={34} rx={6} />
          <rect x={86} y={212} width={228} height={34} rx={6} />
          <rect x={86} y={248} width={228} height={34} rx={6} />
        </g>
        <g fill="none" stroke={C.tinta} strokeWidth={3} strokeLinecap="round" opacity={0.45}>
          <path d="M110 193 L150 193 M220 229 L270 229 M130 265 L170 265" />
        </g>
        <g fill="none" strokeLinecap="round">
          <path d="M292 182 C310 160 296 140 318 122 C330 112 346 116 346 132" stroke={C.tinta} strokeWidth={26} />
          <path d="M292 182 C310 160 296 140 318 122 C330 112 346 116 346 132" stroke="#F4A3A0" strokeWidth={17} />
        </g>
        <g transform="translate(338 128) scale(0.55)">
          <Carita x={0} y={0} />
        </g>
        <Suelo />
      </>
    ),
  },
  fruto: {
    titulo: 'Una mata de jitomate con una flor amarilla y un jitomate sonriente',
    dibujo: (
      <>
        <path d="M200 290 C196 230 204 170 200 100" fill="none" stroke={C.tinta} strokeWidth={16} strokeLinecap="round" />
        <path d="M200 290 C196 230 204 170 200 100" fill="none" stroke={C.hoja} strokeWidth={8} strokeLinecap="round" />
        <g fill="none" strokeLinecap="round">
          <path d="M200 160 C170 150 140 140 116 118" stroke={C.tinta} strokeWidth={13} />
          <path d="M200 160 C170 150 140 140 116 118" stroke={C.hoja} strokeWidth={6} />
          <path d="M200 200 C230 194 262 180 280 160" stroke={C.tinta} strokeWidth={13} />
          <path d="M200 200 C230 194 262 180 280 160" stroke={C.hoja} strokeWidth={6} />
        </g>
        <g transform="translate(200 104) rotate(-60)">
          <path d={hojaPath(50, 22)} fill={C.hoja} {...T} strokeWidth={4.5} />
        </g>
        <g transform="translate(200 104) scale(-1 1) rotate(-60)">
          <path d={hojaPath(50, 22)} fill={C.hoja} {...T} strokeWidth={4.5} />
        </g>
        <g transform="translate(200 244) rotate(-20)">
          <path d={hojaPath(56, 22)} fill={C.hojaOscura} {...T} strokeWidth={4.5} />
        </g>
        <g transform="translate(198 236) scale(-1 1) rotate(-10)">
          <path d={hojaPath(56, 22)} fill={C.hojaOscura} {...T} strokeWidth={4.5} />
        </g>
        {/* flor */}
        <g transform="translate(112 112)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={0} cy={-18} rx={10} ry={16} transform={`rotate(${a})`} fill={C.sol} {...T} strokeWidth={4} />
          ))}
          <circle r={9} fill="#E5B21F" {...T} strokeWidth={4} />
        </g>
        {/* jitomate */}
        <g transform="translate(284 196)">
          <circle r={40} fill="#E0584A" {...T} />
          <path d="M-18 -36 L-6 -32 L0 -44 L6 -32 L18 -36 L10 -26 L0 -30 L-10 -26 Z" fill={C.hoja} {...T} strokeWidth={4} />
          <path d="M-24 -14 C-26 -22 -20 -28 -14 -30" fill="none" stroke="#F4A3A0" strokeWidth={5} strokeLinecap="round" />
          <Carita x={0} y={6} s={1} />
        </g>
        <Pregunta x={80} y={220} s={0.8} r={-10} />
        <Suelo />
      </>
    ),
  },
  abeja: {
    titulo: 'Una flor sonriente con polen y un caminito punteado de vuelo',
    dibujo: (
      <>
        <path d="M150 290 C146 250 154 220 150 186" fill="none" stroke={C.tinta} strokeWidth={16} strokeLinecap="round" />
        <path d="M150 290 C146 250 154 220 150 186" fill="none" stroke={C.hoja} strokeWidth={8} strokeLinecap="round" />
        <g transform="translate(150 252) rotate(-24)">
          <path d={hojaPath(58, 24)} fill={C.hoja} {...T} strokeWidth={4.5} />
        </g>
        <g transform="translate(148 232) scale(-1 1) rotate(-24)">
          <path d={hojaPath(50, 22)} fill={C.hojaOscura} {...T} strokeWidth={4.5} />
        </g>
        <g transform="translate(150 124)">
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx={0} cy={-46} rx={20} ry={30} transform={`rotate(${i * 45})`} fill={C.coralSuave} {...T} strokeWidth={4.5} />
          ))}
          <circle r={36} fill={C.sol} {...T} />
          <Carita x={0} y={4} s={1.15} />
        </g>
        <g fill="#E5B21F">
          <circle cx={92} cy={60} r={4} />
          <circle cx={80} cy={84} r={3} />
          <circle cx={206} cy={52} r={4} />
          <circle cx={222} cy={78} r={3} />
        </g>
        <path
          d="M210 120 C250 90 250 40 290 40 C340 40 340 110 300 110 C268 110 290 60 340 70"
          fill="none"
          stroke={C.tinta}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="2 12"
        />
        <Pregunta x={338} y={170} s={1.05} r={8} />
        <Suelo />
      </>
    ),
  },
  cactus: {
    titulo: 'Un desierto con dunas, un sol fuerte y una gota de agua vacía',
    dibujo: (
      <>
        <Sol x={84} y={76} r={36} />
        <path d="M0 230 C80 186 150 196 220 226 C280 196 350 190 400 214 L400 300 L0 300 Z" fill="#F2D58A" {...T} strokeWidth={0} />
        <path d="M0 230 C80 186 150 196 220 226 C280 196 350 190 400 214" fill="none" {...T} />
        <path d="M40 276 C120 250 200 254 280 278" fill="none" stroke="#C9A24A" strokeWidth={4} strokeLinecap="round" />
        <g transform="translate(268 112)">
          <path
            d="M0 -66 C36 -14 52 16 52 40 C52 70 28 90 0 90 C-28 90 -52 70 -52 40 C-52 16 -36 -14 0 -66 Z"
            fill={C.crema}
            stroke={C.agua}
            strokeWidth={5}
            strokeDasharray="12 10"
            strokeLinecap="round"
          />
          <Pregunta x={0} y={30} s={0.85} />
        </g>
        <g fill="none" stroke={C.coral} strokeWidth={4} strokeLinecap="round">
          <path d="M160 150 q8 -10 0 -20 t0 -20" />
          <path d="M182 168 q8 -10 0 -20 t0 -20" />
        </g>
      </>
    ),
  },
  bolsa: {
    titulo: 'Una tiendita con toldo de rayas y frutas en el aparador',
    dibujo: (
      <>
        <rect x={92} y={110} width={216} height={176} rx={8} fill={C.crema} {...T} />
        <path d="M80 112 L320 112 L330 70 L70 70 Z" fill={C.coral} {...T} />
        <g {...T} strokeWidth={4}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M${80 + i * 40} 112 q20 26 40 0`} fill={i % 2 ? C.crema : C.coral} />
          ))}
        </g>
        <g fill={C.crema} stroke={C.crema} strokeWidth={0}>
          <path d="M110 70 L104 112 L136 112 L138 70 Z" opacity={0.9} />
          <path d="M190 70 L188 112 L216 112 L216 70 Z" opacity={0.9} />
          <path d="M266 70 L270 112 L300 112 L294 70 Z" opacity={0.9} />
        </g>
        <path d="M80 112 L320 112 L330 70 L70 70 Z" fill="none" {...T} />
        <rect x={112} y={162} width={92} height={70} rx={6} fill={C.agua} fillOpacity={0.25} {...T} strokeWidth={4.5} />
        <circle cx={138} cy={210} r={14} fill="#E0584A" {...T} strokeWidth={3.5} />
        <circle cx={172} cy={212} r={13} fill={C.sol} {...T} strokeWidth={3.5} />
        <path d="M138 196 l4 -8" stroke={C.tinta} strokeWidth={3} strokeLinecap="round" />
        <rect x={230} y={162} width={56} height={124} rx={6} fill={C.tierraClara} {...T} strokeWidth={4.5} />
        <circle cx={274} cy={228} r={4} fill={C.tinta} />
        <Pregunta x={354} y={190} s={0.9} r={10} />
        <Mata x={60} y={292} s={0.8} />
      </>
    ),
  },
  reciclar: {
    titulo: 'Tres flechas verdes en círculo alrededor de una botella sonriente',
    dibujo: (
      <>
        {[0, 120, 240].map((a) => (
          <g key={a} transform={`translate(200 156) rotate(${a})`}>
            <path d="M-38 -98 A106 106 0 0 1 66 -82" fill="none" stroke={C.tinta} strokeWidth={24} strokeLinecap="round" />
            <path d="M-38 -98 A106 106 0 0 1 66 -82" fill="none" stroke={C.hoja} strokeWidth={14} strokeLinecap="round" />
            <path d="M58 -112 L104 -66 L46 -56 Z" fill={C.hoja} {...T} />
          </g>
        ))}
        <g transform="translate(200 162)">
          <path d="M-12 -58 L12 -58 L12 -44 C30 -36 34 -24 34 -10 L34 46 Q34 54 26 54 L-26 54 Q-34 54 -34 46 L-34 -10 C-34 -24 -30 -36 -12 -44 Z" fill={C.aguaClara} {...T} />
          <rect x={-15} y={-70} width={30} height={14} rx={4} fill={C.agua} {...T} strokeWidth={4} />
          <rect x={-34} y={0} width={68} height={22} fill={C.crema} {...T} strokeWidth={4} />
          <Carita x={0} y={-18} s={0.85} />
        </g>
      </>
    ),
  },
  arboles: {
    titulo: 'Un gran árbol sonriente con un pajarito y su sombra',
    dibujo: (
      <>
        <ellipse cx={200} cy={286} rx={140} ry={12} fill={C.hojaOscura} opacity={0.35} />
        <path d="M178 290 L184 176 L212 176 L218 290 Z" fill={C.tierraClara} {...T} />
        <path
          d="M90 160 C50 150 52 92 96 90 C92 44 150 22 180 50 C200 14 270 22 274 70 C320 70 336 128 300 150 C304 190 250 200 230 182 C200 204 150 200 140 180 C116 190 92 182 90 160 Z"
          fill={C.hoja}
          {...T}
        />
        <circle cx={120} cy={120} r={9} fill="#E0584A" {...T} strokeWidth={3.5} />
        <circle cx={276} cy={110} r={9} fill="#E0584A" {...T} strokeWidth={3.5} />
        <circle cx={234} cy={160} r={9} fill="#E0584A" {...T} strokeWidth={3.5} />
        <Carita x={196} y={116} s={1.5} />
        {/* pajarito */}
        <g transform="translate(322 214)">
          <path d="M-22 0 C-22 -22 18 -24 22 -4 L36 -8 L26 4 C20 18 -22 20 -22 0 Z" fill={C.agua} {...T} strokeWidth={4} />
          <path d="M-4 -4 C2 6 12 6 14 -2" fill={C.aguaClara} stroke={C.tinta} strokeWidth={3} strokeLinejoin="round" />
          <circle cx={-10} cy={-8} r={3} fill={C.tinta} />
          <path d="M-26 -6 L-36 -2 L-26 2 Z" fill={C.sol} stroke={C.tinta} strokeWidth={3} strokeLinejoin="round" />
          <path d="M-6 18 L-6 26 M6 18 L6 26" stroke={C.tinta} strokeWidth={3} strokeLinecap="round" />
        </g>
        <Mata x={46} y={292} s={0.9} />
        <Mata x={300} y={292} s={0.7} />
      </>
    ),
  },
  'sin-luz': {
    titulo: 'Una plantita pálida y triste en un cuarto oscuro',
    dibujo: (
      <>
        <rect x={60} y={18} width={280} height={264} rx={28} fill="#2F4A5C" {...T} />
        <path d="M290 54 A22 22 0 1 0 306 90 A18 18 0 1 1 290 54 Z" fill="#F6E7A8" {...T} strokeWidth={3.5} />
        <Destello x={110} y={60} s={0.55} fill="#F6E7A8" />
        <Destello x={170} y={44} s={0.4} fill="#F6E7A8" />
        <Destello x={250} y={120} s={0.45} fill="#F6E7A8" />
        <g transform="translate(200 258)">
          <path d="M0 -60 C-4 -90 14 -110 30 -118" fill="none" stroke={C.tinta} strokeWidth={14} strokeLinecap="round" />
          <path d="M0 -60 C-4 -90 14 -110 30 -118" fill="none" stroke="#C9D98A" strokeWidth={6} strokeLinecap="round" />
          <g transform="translate(28 -116) rotate(40)">
            <path d={hojaPath(56, 26)} fill="#D7E29B" {...T} strokeWidth={4.5} />
            <Carita x={31} y={-2} s={0.62} gesto="triste" r={-40} />
          </g>
          <g transform="translate(26 -116) scale(-1 1) rotate(70)">
            <path d={hojaPath(48, 22)} fill="#D7E29B" {...T} strokeWidth={4.5} />
          </g>
          <path d="M-44 -62 C-36 -74 36 -74 44 -62 Z" fill={C.tierra} {...T} strokeWidth={4} />
          <Maceta x={0} y={0} s={0.9} />
        </g>
      </>
    ),
  },
  pilas: {
    titulo: 'Dos pilas con carita y un rayo de energía',
    dibujo: (
      <>
        {[
          { x: 140, r: -8, color: C.agua, gesto: 'feliz' as const },
          { x: 262, r: 8, color: C.coral, gesto: 'apenada' as const },
        ].map((p) => (
          <g key={p.x} transform={`translate(${p.x} 196) rotate(${p.r})`}>
            <rect x={-14} y={-104} width={28} height={16} rx={4} fill="#CFD8DC" {...T} strokeWidth={4} />
            <rect x={-42} y={-92} width={84} height={180} rx={16} fill={p.color} {...T} />
            <rect x={-42} y={30} width={84} height={58} rx={0} fill={C.tinta} />
            <rect x={-42} y={-92} width={84} height={180} rx={16} fill="none" {...T} />
            <text x={0} y={70} textAnchor="middle" fill={C.crema} fontSize={30} fontFamily='"Lilita One", sans-serif'>
              +
            </text>
            <Carita x={0} y={-20} s={1.1} gesto={p.gesto} />
          </g>
        ))}
        <path d="M206 28 L178 92 L204 92 L188 150 L234 74 L206 74 L222 28 Z" fill={C.sol} {...T} strokeWidth={4.5} />
        <Rayos x={60} y={110} s={0.8} />
        <Rayos x={340} y={110} s={0.8} flip />
        <Suelo />
      </>
    ),
  },
  carton: {
    titulo: 'Un bote azul con un signo de interrogación y cuatro objetos alrededor',
    dibujo: (
      <>
        <Bote x={200} y={290} s={1.6} color="#8CB8DB" tapa="#4A86B5">
          <Pregunta x={0} y={-36} s={0.62} />
        </Bote>
        {/* caja */}
        <g transform="translate(70 92) rotate(-10)">
          <path d="M-30 -14 L0 -28 L30 -14 L30 22 L0 36 L-30 22 Z" fill="#D9A46A" {...T} strokeWidth={4} />
          <path d="M-30 -14 L0 0 L30 -14 M0 0 L0 36" fill="none" {...T} strokeWidth={4} />
        </g>
        {/* cáscara de huevo */}
        <g transform="translate(70 220) rotate(-6)">
          <path d="M-26 0 C-26 -20 -14 -40 0 -40 C14 -40 26 -20 26 0 L18 -8 L10 2 L2 -10 L-6 2 L-14 -8 Z" fill="#FFF3DE" {...T} strokeWidth={4} />
          <path d="M-26 4 C-24 22 24 22 26 4 Z" fill="#FFF3DE" {...T} strokeWidth={4} transform="translate(0 14)" />
        </g>
        {/* lata */}
        <g transform="translate(330 96) rotate(10)">
          <rect x={-20} y={-34} width={40} height={68} rx={8} fill="#E0584A" {...T} strokeWidth={4} />
          <path d="M-20 -22 L20 -22 M-20 22 L20 22" stroke={C.tinta} strokeWidth={3} />
          <rect x={-10} y={-8} width={20} height={16} rx={3} fill={C.crema} />
        </g>
        {/* botella */}
        <g transform="translate(330 222) rotate(14)">
          <path d="M-8 -44 L8 -44 L8 -32 C20 -26 22 -16 22 -6 L22 34 Q22 40 16 40 L-16 40 Q-22 40 -22 34 L-22 -6 C-22 -16 -20 -26 -8 -32 Z" fill={C.aguaClara} {...T} strokeWidth={4} />
          <rect x={-10} y={-52} width={20} height={10} rx={3} fill={C.agua} {...T} strokeWidth={3.5} />
        </g>
      </>
    ),
  },
};

/** Ilustración de la pregunta del quiz; si el id no tiene dibujo, muestra la imagen general del juego. */
export function QuizIlustracion({ id, className }: { id: string; className?: string }) {
  const il = ilustraciones[id];
  if (!il) return <img src={asset('game-quiz.png')} alt="" className={className} />;
  return (
    <Lienzo viewBox="0 0 400 300" titulo={il.titulo} className={className}>
      {il.dibujo}
    </Lienzo>
  );
}

export const idsConIlustracion = Object.keys(ilustraciones);
