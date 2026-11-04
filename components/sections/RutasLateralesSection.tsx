'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function RutasLateralesSection() {
  return (
    <section id="rutas" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          n="07"
          eyebrow="Rutas laterales"
          title="¿No es exactamente tu caso?"
          intro="Si lo que buscas es otra cosa, quizá una de estas rutas encaja mejor."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* EscuderIA — estilo ZYVO, solo texto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex flex-col rounded-2xl glass-card p-7"
          >
            <div className="flex items-center gap-3">
              <h3 className="font-display text-xl font-semibold text-ink">EscuderIA</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-cyan/25 text-cyan">
                En desarrollo
              </span>
            </div>
            <p className="mt-1 text-sm text-cyan/80">Tu negocio, con más equipo.</p>
            <p className="mt-4 text-sm text-muted leading-relaxed grow">
              Para emprendedores y micronegocios: un ecosistema de agentes de IA especializados,
              listo para usar. Delega tareas repetitivas y potencia a tu equipo, tú al mando.
            </p>
            <button
              onClick={() => scrollTo('contacto')}
              className="mt-6 inline-flex items-center gap-2 self-start px-6 py-3 btn-ghost text-sm"
            >
              Conocer EscuderIA
              <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Fuelle Studio — enlace a su página en vivo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
            className="flex flex-col rounded-2xl glass-card p-7"
          >
            <h3 className="font-display text-xl font-semibold text-ink">Fuelle Studio</h3>
            <p className="mt-1 text-sm text-cyan/80">Sitios web y landing pages</p>
            <p className="mt-4 text-sm text-muted leading-relaxed grow">
              ¿Solo necesitas un sitio web o una landing que se vea bien y convierta?
              Fuelle Studio es nuestro estudio para eso.
            </p>
            <a
              href="https://fuellestudio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 self-start px-6 py-3 btn-primary text-sm"
            >
              Hablar con Fuelle Studio
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
