'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Spotlight } from '@/components/ui/Spotlight'

type Form = {
  nombre: string
  email: string
  empresa: string
  facturacion: string
  waPrefijo: string
  waNumero: string
}

const RANGOS = [
  '$100K – $500K MXN/mes',
  '$500K – $2M MXN/mes',
  '$2M – $10M MXN/mes',
  '+$10M MXN/mes',
]

const PREFIJOS = [
  { code: '+52', label: '🇲🇽 +52' },
  { code: '+1',  label: '🇺🇸 +1'  },
  { code: '+57', label: '🇨🇴 +57' },
  { code: '+54', label: '🇦🇷 +54' },
  { code: '+34', label: '🇪🇸 +34' },
]

export default function CTAFinalSection() {
  const [form, setForm]       = useState<Form>({ nombre: '', email: '', empresa: '', facturacion: '', waPrefijo: '+52', waNumero: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.email) { toast.error('Nombre y email son requeridos.'); return }
    setLoading(true)
    const whatsapp = form.waNumero.trim() ? `${form.waPrefijo}${form.waNumero.trim()}` : undefined
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.nombre, email: form.email, empresa: form.empresa, facturacion: form.facturacion, whatsapp, tipo: 'auditoria' }),
      })
      const d = await r.json()
      if (d.success) { setSent(true); toast.success('¡Recibido! Te contactamos en menos de 24 h.') }
      else throw new Error(d.error)
    } catch {
      toast.error('Error al enviar. Escríbenos a direccion@zyvo.com.mx')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="cta" className="section-pad relative overflow-hidden">
      {/* Línea dorada superior */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zyvo-gold/35 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,170,255,0.05)_0%,transparent_70%)]" />


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
              <div className="flex items-center gap-3">
                <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">
                  El primer paso
                </p>
                <span className="text-xs font-medium text-zyvo-electric border border-zyvo-electric/25 bg-zyvo-electric/8 px-2.5 py-1 rounded-full">
                  Gratuita por tiempo de lanzamiento
                </span>
              </div>
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
                'Mapa de fricción operativa de tu empresa',
                'Roadmap priorizado por ROI',
                'Sin compromiso de implementación',
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
            className="relative"
          >
            <Spotlight size={220} />
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
                    WhatsApp <span className="normal-case text-zyvo-white/20">(opcional)</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="waPrefijo"
                      value={form.waPrefijo}
                      onChange={set}
                      className="bg-zyvo-dark border border-white/8 rounded-xl px-3 py-2.5 text-zyvo-white text-sm focus:outline-none focus:border-zyvo-gold/35 transition-colors shrink-0"
                    >
                      {PREFIJOS.map(p => (
                        <option key={p.code} value={p.code}>{p.label}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="waNumero"
                      value={form.waNumero}
                      onChange={set}
                      placeholder="55 1234 5678"
                      className="flex-1 min-w-0 bg-white/3 border border-white/8 rounded-xl px-4 py-2.5 text-zyvo-white text-sm placeholder-zyvo-white/20 focus:outline-none focus:border-zyvo-gold/35 transition-colors"
                    />
                  </div>
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
                  className="w-full flex items-center justify-center gap-2 py-3.5 btn-glow text-sm disabled:cursor-not-allowed"
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
