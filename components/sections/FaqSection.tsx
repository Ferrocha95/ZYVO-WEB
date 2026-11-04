import { Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'

const FAQS = [
  {
    q: '¿Qué hace exactamente ZYVO?',
    a: 'Diseñamos e implementamos sistemas inteligentes a la medida de tu operación: agentes que ejecutan procesos, sistemas comerciales y apps propias. Siempre empezamos por una ConsultorIA para entender qué necesitas.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende del sistema y su alcance, que se definen en la ConsultorIA y la propuesta. No hay un precio de catálogo porque no es software genérico: se cotiza según tu operación.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Trabajamos por fases y en la propuesta ves los tiempos de cada una. No ponemos plazos antes de entender tu operación.',
  },
  {
    q: '¿Pierdo el control de mi operación?',
    a: 'No. Todo se diseña con human in the loop: el sistema propone y tú apruebas lo que importa. Cada acción queda registrada y es auditable.',
  },
  {
    q: '¿Mis datos están seguros?',
    a: 'Tu información vive en tu infraestructura y bajo tu control, con permisos por rol y registro de accesos. Tú decides quién puede hacer qué.',
  },
  {
    q: '¿Y si solo necesito un sitio web?',
    a: 'Entonces quizá ZYVO no es tu caso: para sitios y landing pages tenemos Fuelle Studio, nuestro estudio dedicado a eso.',
  },
]

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <SectionHeading n="09" eyebrow="FAQ" title="Preguntas frecuentes" />

        <div className="mt-10 divide-y divide-white/8 border-y border-white/8">
          {FAQS.map(item => (
            <details key={item.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <span className="font-display text-base md:text-lg font-medium text-ink">{item.q}</span>
                <Plus
                  size={18}
                  className="shrink-0 text-cyan transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
