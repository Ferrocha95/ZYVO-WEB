'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { DATOS_FINANCIEROS } from '@/config/site'
import { toast } from 'sonner'

type FormData = {
  nombre: string
  email: string
  whatsapp: string
  facturacion: string
}

const FACTURACION_OPTIONS = [
  { value: '100k-500k', label: '$100K–$500K MXN/mes' },
  { value: '500k-2m', label: '$500K–$2M MXN/mes' },
  { value: '2m-10m', label: '$2M–$10M MXN/mes' },
  { value: '10m+', label: '+$10M MXN/mes' },
]

export default function AuditoriaSection() {
  const [form, setForm] = useState<FormData>({
    nombre: '', email: '', whatsapp: '', facturacion: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true, margin: '-80px' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.facturacion) {
      toast.error('Por favor completa los campos requeridos.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tipo: 'auditoria' }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        toast.success('¡Solicitud recibida! Te contactaremos en menos de 24 horas.')
      } else {
        throw new Error(data.error)
      }
    } catch {
      toast.error('Hubo un problema. Intenta de nuevo o escríbenos directamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="auditoria" className="section-padding relative overflow-hidden">
      {/* Fondo con gradiente dorado */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Línea dorada superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zyvo-gold/40 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-12 space-y-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zyvo-gold/25 bg-zyvo-gold/8 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zyvo-gold animate-pulse" />
            <span className="text-xs text-zyvo-gold/70 font-medium tracking-widest uppercase">
              Lead magnet principal
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-5xl lg:text-6xl font-normal text-zyvo-white leading-[1.1]"
          >
            Descubre cuánto dinero está{' '}
            <span className="text-gradient-gold italic">perdiendo</span>{' '}
            tu empresa hoy
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-zyvo-white/50 text-lg max-w-xl mx-auto"
          >
            Una auditoría de fricción operativa que se paga sola en el primer mes.
          </motion.p>

          {/* Precio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 glass-gold rounded-full"
          >
            <span className="text-zyvo-gold font-bold text-xl">
              Desde ${DATOS_FINANCIEROS.precioAuditoriaMin} USD
            </span>
            <span className="w-px h-4 bg-zyvo-gold/30" />
            <span className="text-zyvo-white/50 text-sm">Se paga sola en el primer mes</span>
          </motion.div>
        </div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-gold rounded-2xl p-12 text-center space-y-4"
            >
              <CheckCircle2 size={48} className="text-zyvo-gold mx-auto" />
              <h3 className="text-zyvo-white font-semibold text-2xl">¡Solicitud recibida!</h3>
              <p className="text-zyvo-white/50">
                Revisaremos tu caso y te contactaremos en menos de 24 horas hábiles para coordinar la auditoría.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-zyvo-white/50 text-xs font-medium uppercase tracking-wider">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-zyvo-white text-sm placeholder-zyvo-white/20 focus:outline-none focus:border-zyvo-gold/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zyvo-white/50 text-xs font-medium uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@empresa.com"
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-zyvo-white text-sm placeholder-zyvo-white/20 focus:outline-none focus:border-zyvo-gold/40 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-zyvo-white/50 text-xs font-medium uppercase tracking-wider">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="+52 55 0000 0000"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-zyvo-white text-sm placeholder-zyvo-white/20 focus:outline-none focus:border-zyvo-gold/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zyvo-white/50 text-xs font-medium uppercase tracking-wider">
                    Facturación mensual *
                  </label>
                  <select
                    name="facturacion"
                    value={form.facturacion}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#080C14] border border-white/[0.08] rounded-xl px-4 py-3 text-zyvo-white text-sm focus:outline-none focus:border-zyvo-gold/40 transition-colors"
                  >
                    <option value="" disabled>Selecciona un rango</option>
                    {FACTURACION_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-zyvo-gold text-zyvo-dark font-semibold text-sm rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Enviando solicitud...
                  </>
                ) : (
                  <>
                    Solicitar Auditoría de Fricción
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>

              <p className="text-center text-zyvo-white/25 text-xs">
                ROI mínimo 3x garantizado contractualmente — o te devolvemos la inversión
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
