'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function ZyvoHubBanner() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="glass rounded-2xl px-8 py-10 md:px-12 md:py-12 text-center space-y-5"
        >
          <h2 className="font-(family-name:--font-instrument-serif) text-3xl md:text-4xl text-zyvo-white leading-snug">
            Así se ve <span className="text-gradient-gold italic">por dentro</span>
          </h2>
          <p className="text-zyvo-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            ZYVO Hub es donde vive todo: tus agentes, tu operación, tus reportes, en un solo
            lugar. No es una promesa abstracta — es la plataforma que ya está operando para
            empresas como la tuya.
          </p>
          <div className="pt-2">
            <a
              href="https://hub.zyvo.com.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 btn-glow text-sm cursor-hover"
            >
              Ver ZYVO Hub <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
