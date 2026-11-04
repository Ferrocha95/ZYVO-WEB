import { Camera } from 'lucide-react'
import SectionHeading from './SectionHeading'

// Sin testimonios, logos ni cifras. Marcadores para capturas reales futuras.
export default function EvidenciaSection() {
  return (
    <section id="evidencia" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          n="06"
          eyebrow="Evidencia"
          title="Casos en construcción"
          intro="Estamos documentando los primeros casos. Aquí irán capturas reales de sistemas en operación — no promesas ni cifras inventadas."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="aspect-4/3 rounded-2xl border border-dashed border-white/12 bg-surface/30 flex flex-col items-center justify-center gap-3 p-6 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Camera size={18} className="text-muted" />
              </div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted">
                Caso en documentación
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
