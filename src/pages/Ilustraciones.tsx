import { bancoQuiz } from '../data/quiz';
import { residuos } from '../data/residuos';
import { ResiduoIlustracion } from '../ilustraciones/residuos';
import { Planta, type Animo, type Etapa } from '../ilustraciones/Planta';
import { QuizIlustracion } from '../ilustraciones/quiz';

const ANIMOS: Animo[] = ['feliz', 'celebra', 'sed', 'ahogada', 'sinSol', 'calor', 'triste', 'mimada'];
const ETAPAS: Etapa[] = [0, 1, 2, 3];

/** Galería de ilustraciones (solo en desarrollo): /dev/ilustraciones */
export default function Ilustraciones() {
  return (
    <div className="px-5 pb-40 lg:px-u56">
      <h1 className="text-5xl">PLANTA (CULTIVA)</h1>
      <div className="mt-4 grid grid-cols-[auto_repeat(4,1fr)] items-center gap-2">
        <span />
        {ETAPAS.map((e) => (
          <span key={e} className="text-center font-display">
            ETAPA {e}
          </span>
        ))}
        {ANIMOS.map((a) => (
          <div key={a} className="contents">
            <span className="font-display">{a.toUpperCase()}</span>
            {ETAPAS.map((e) => (
              <div key={e} className="rounded-card border-3 border-hoja bg-hoja-suave">
                <Planta etapa={e} animo={a} className="block w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <h1 className="mt-12 text-5xl">RESIDUOS</h1>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {residuos.map((r) => (
          <figure key={r.id} className="rounded-[18px] border-3 border-tinta bg-campo p-[10px] text-center">
            <ResiduoIlustracion id={r.id} className="block h-24 w-full" />
            <figcaption className="mt-2 font-display text-[15px] leading-[17px]">{r.nombre}</figcaption>
          </figure>
        ))}
      </div>

      <h1 className="mt-12 text-5xl">QUIZ</h1>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {bancoQuiz.map((p) => (
          <figure key={p.id} className="rounded-card border-3 border-coral bg-coral-suave2 p-3">
            <QuizIlustracion id={p.id} className="block w-full" />
            <figcaption className="mt-2 text-sm leading-5">{p.pregunta}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
