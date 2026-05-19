'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

interface Resena {
  empresa: string
  persona: string
  cargo: string
  sector: string
  texto: string
}

const resenas: Resena[] = [
  {
    empresa: 'Grupo Logística Norteña',
    persona: 'Roberto Cisneros',
    cargo: 'Director General',
    sector: 'Logística',
    texto: 'Implementamos el agente de documentos para procesar nuestras guías de embarque. Lo que antes tomaba 3 días con 2 personas, ahora ocurre en horas. No lo creímos hasta verlo.',
  },
  {
    empresa: 'Clínica MedVida',
    persona: 'Dra. Sofía Rangel',
    cargo: 'Directora Médica',
    sector: 'Salud',
    texto: 'El agente de atención redujo las llamadas al 40% porque los pacientes ya encuentran lo que necesitan solos. Nuestro personal ahora se enfoca en lo que realmente importa.',
  },
  {
    empresa: 'Constructora Tierra Firme',
    persona: 'Ing. Carlos Mondragón',
    cargo: 'CEO',
    sector: 'Construcción',
    texto: 'Teníamos un problema serio con el seguimiento de cotizaciones. El agente comercial de ZYVO convirtió ese caos en un proceso limpio. Cerramos 30% más en el primer trimestre.',
  },
  {
    empresa: 'Distribuidora El Roble',
    persona: 'Ana Villanueva',
    cargo: 'Gerente de Operaciones',
    sector: 'Distribución',
    texto: 'Lo que más me convenció fue que no nos vendieron tecnología, nos vendieron resultados. A los 45 días ya veíamos el impacto en números reales.',
  },
  {
    empresa: 'Academia Impulsa',
    persona: 'Mtro. Diego Fuentes',
    cargo: 'Fundador',
    sector: 'Educación',
    texto: 'El onboarding de nuevos alumnos era un dolor de cabeza constante. Hoy corre solo. Puedo escalar sin contratar más gente de soporte.',
  },
  {
    empresa: 'Inmobiliaria Cima',
    persona: 'Lic. Patricia Solís',
    cargo: 'Directora Comercial',
    sector: 'Inmobiliaria',
    texto: 'Cada lead que llega ahora está calificado antes de llegar a mis asesores. Dejamos de perder tiempo con personas que solo estaban curioseando. Resultados desde la primera semana.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} fill="#D4AF37" stroke="none" />
      ))}
    </div>
  )
}

export default function ResenasSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      {/* Decoración */}
      <motion.div
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-medium tracking-widest text-zyvo-gold/70 uppercase mb-4 px-4 py-1.5 rounded-full border border-zyvo-gold/20 bg-zyvo-gold/5">
            Resultados reales
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zyvo-white" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
            Lo que dicen quienes ya{' '}
            <span className="text-gradient-gold">operan diferente</span>
          </h2>
        </motion.div>

        {/* Grid de reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resenas.map((r, i) => (
            <motion.div
              key={r.empresa}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="glass rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Estrellas y sector */}
              <div className="flex items-center justify-between">
                <Stars />
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(212,175,55,0.08)', color: 'rgba(212,175,55,0.6)', border: '1px solid rgba(212,175,55,0.15)' }}>
                  {r.sector}
                </span>
              </div>

              {/* Texto */}
              <p className="text-zyvo-white/60 text-sm leading-relaxed flex-1">
                &ldquo;{r.texto}&rdquo;
              </p>

              {/* Persona */}
              <div className="pt-3 border-t border-white/6">
                <p className="text-zyvo-white/90 text-sm font-semibold">{r.persona}</p>
                <p className="text-zyvo-white/35 text-xs mt-0.5">{r.cargo} · <span className="text-zyvo-gold/50">{r.empresa}</span></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
