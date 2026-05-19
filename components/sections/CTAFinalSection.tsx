'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type Form = {
  nombre: string
  email: string
  empresa: string
  facturacion: string
}

const RANGOS = [
  '$100K – $500K MXN/mes',
  '$500K – $2M MXN/mes',
  '$2M – $10M MXN/mes',
  '+$10M MXN/mes',
]

export default function CTAFinalSection() {
  const [form, setForm]       = useState<Form>({ nombre: '', email: '', empresa: '', facturacion: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.email) { toast.error('Nombre y email son requeridos.'); return }
    setLoading(true)
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tipo: 'auditoria' }),
      })
      const d = await r.json()
      if (d.success) { setSent(true); toast.success('¡Recibido! Te contactamos en menos de 24 h.') }
      else throw new Error(d.error)
    } catch {
      toast.error('Error al enviar. Escríbenos a contacto@zyvo.ai')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="cta" className="section-pad relative overflow-hidden">
      {/* Línea dorada superior */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zyvo-gold/35 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />

      {/* Decoraciones flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Orbe dorado grande detrás del formulario */}
        <motion.div
          animate={{ opacity: [0.06, 0.14, 0.06], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 right-[10%] -translate-y-1/2 w-80 h-80 rounded-full bg-zyvo-gold/8 blur-3xl"
        />
        {/* Partículas flotantes */}
        <motion.div
          animate={{ y: [0, -22, 0], opacity: [0.10, 0.22, 0.10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-zyvo-gold/40"
        />
        <motion.div
          animate={{ y: [0, 18, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute top-[60%] left-[8%] w-1.5 h-1.5 rounded-full bg-zyvo-gold/30"
        />
        <motion.div
          animate={{ y: [0, -16, 0], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute bottom-[25%] right-[20%] w-1 h-1 rounded-full bg-zyvo-white/20"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Texto izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">
                El primer paso
              </p>
              <h2 className="font-(family-name:--font-instrument-serif) text-3xl md:text-5xl font-normal text-zyvo-white leading-snug">
                Descubre cuánto dinero está perdiendo tu empresa{' '}
                <span className="text-gradient-gold italic">hoy</span>
              </h2>
              <p className="text-zyvo-white/60 text-sm leading-relaxed">
                Una auditoría de fricción operativa revela en 48 horas los
                principales puntos donde tu empresa pierde tiempo y dinero —
                y qué se puede automatizar primero.
              </p>
            </div>

            {/* Puntos de valor */}
            <ul className="space-y-3">
              {[
                'Diagnóstico de procesos en 1–3 días',
                'Roadmap de automatización priorizado por ROI',
                'Sin compromiso de implementación',
                'ROI mínimo 3x garantizado en proyectos',
              ].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={15} className="text-zyvo-gold shrink-0" />
                  <span className="text-zyvo-white/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>

          </motion.div>

          {/* Formulario derecho */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {sent ? (
              <div className="glass rounded-2xl p-10 text-center space-y-4">
                <CheckCircle2 size={40} className="text-zyvo-gold mx-auto" />
                <h3 className="text-zyvo-white font-semibold text-xl">¡Solicitud recibida!</h3>
                <p className="text-zyvo-white/60 text-sm">
                  Te contactamos en menos de 24 horas hábiles para coordinar la auditoría.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="glass rounded-2xl p-7 space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'nombre', label: 'Nombre *', placeholder: 'Tu nombre' },
                    { name: 'empresa', label: 'Empresa', placeholder: 'Nombre de empresa' },
                  ].map(f => (
                    <div key={f.name} className="space-y-1.5">
                      <label className="text-zyvo-white/35 text-xs uppercase tracking-wider">
                        {f.label}
                      </label>
                      <input
                        type="text"
                        name={f.name}
                        value={form[f.name as keyof Form]}
                        onChange={set}
                        placeholder={f.placeholder}
                        required={f.name === 'nombre'}
                        className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-2.5 text-zyvo-white text-sm placeholder-zyvo-white/20 focus:outline-none focus:border-zyvo-gold/35 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-zyvo-white/35 text-xs uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={set}
                    placeholder="tu@empresa.com"
                    required
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-2.5 text-zyvo-white text-sm placeholder-zyvo-white/20 focus:outline-none focus:border-zyvo-gold/35 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zyvo-white/35 text-xs uppercase tracking-wider">
                    Facturación mensual
                  </label>
                  <select
                    name="facturacion"
                    value={form.facturacion}
                    onChange={set}
                    className="w-full bg-zyvo-dark border border-white/8 rounded-xl px-4 py-2.5 text-zyvo-white text-sm focus:outline-none focus:border-zyvo-gold/35 transition-colors"
                  >
                    <option value="" disabled>Selecciona un rango</option>
                    {RANGOS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-zyvo-gold text-zyvo-dark font-semibold text-sm rounded-xl hover:bg-[#E8C547] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={15} className="animate-spin" /> Enviando...</>
                  ) : (
                    <>Solicitar auditoría <ArrowRight size={15} /></>
                  )}
                </button>

                <p className="text-center text-zyvo-white/20 text-xs">
                  Sin compromiso. Sin pitch agresivo.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
