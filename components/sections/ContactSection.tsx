'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2, Mail, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { SITE_CONFIG } from '@/config/site'

type FormData = {
  nombre: string
  email: string
  whatsapp: string
  empresa: string
  facturacion: string
  mensaje: string
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    nombre: '', email: '', whatsapp: '', empresa: '', facturacion: '', mensaje: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.mensaje) {
      toast.error('Nombre, email y mensaje son requeridos.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tipo: 'contacto' }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        toast.success('Mensaje enviado. Te respondemos en < 24 horas.')
      } else {
        throw new Error(data.error)
      }
    } catch {
      toast.error('Error al enviar. Escríbenos directamente a direccion@zyvo.com.mx')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_50%,rgba(10,36,99,0.1)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Columna izquierda */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] mb-2"
              >
                <span className="text-xs text-zyvo-white/40 font-medium tracking-widest uppercase">
                  Hablemos
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-5xl font-normal text-zyvo-white"
              >
                ¿Listo para dejar de{' '}
                <span className="italic text-gradient-gold">perder dinero?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-zyvo-white/45 text-base leading-relaxed"
              >
                Cuéntanos tu situación. Sin compromisos, sin pitch agresivo.
                Solo una conversación honesta sobre si podemos ayudarte.
              </motion.p>
            </div>

            {/* Contacto directo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-4"
            >
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-4 p-4 glass rounded-xl hover:border-zyvo-gold/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg glass-gold flex items-center justify-center">
                  <Mail size={16} className="text-zyvo-gold" />
                </div>
                <div>
                  <p className="text-zyvo-white/30 text-xs uppercase tracking-widest">Email</p>
                  <p className="text-zyvo-white font-medium text-sm group-hover:text-zyvo-gold transition-colors">
                    {SITE_CONFIG.email}
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/525500000000`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass rounded-xl hover:border-zyvo-gold/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <MessageCircle size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="text-zyvo-white/30 text-xs uppercase tracking-widest">WhatsApp</p>
                  <p className="text-zyvo-white font-medium text-sm group-hover:text-green-400 transition-colors">
                    {SITE_CONFIG.whatsapp}
                  </p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Columna derecha — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {sent ? (
              <div className="glass-gold rounded-2xl p-12 text-center space-y-4">
                <CheckCircle2 size={48} className="text-zyvo-gold mx-auto" />
                <h3 className="text-zyvo-white font-semibold text-xl">¡Mensaje enviado!</h3>
                <p className="text-zyvo-white/50 text-sm">
                  Revisamos y respondemos en menos de 24 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'nombre', label: 'Nombre *', type: 'text', placeholder: 'Tu nombre' },
                    { name: 'empresa', label: 'Empresa', type: 'text', placeholder: 'Nombre de empresa' },
                  ].map(field => (
                    <div key={field.name} className="space-y-1.5">
                      <label className="text-zyvo-white/40 text-xs uppercase tracking-wider">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name as keyof FormData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.name === 'nombre'}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-zyvo-white text-sm placeholder-zyvo-white/20 focus:outline-none focus:border-zyvo-gold/40 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'email', label: 'Email *', type: 'email', placeholder: 'tu@empresa.com' },
                    { name: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '+52 55 0000 0000' },
                  ].map(field => (
                    <div key={field.name} className="space-y-1.5">
                      <label className="text-zyvo-white/40 text-xs uppercase tracking-wider">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name as keyof FormData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.name === 'email'}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-zyvo-white text-sm placeholder-zyvo-white/20 focus:outline-none focus:border-zyvo-gold/40 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-zyvo-white/40 text-xs uppercase tracking-wider">
                    ¿Cuál es tu mayor dolor operativo? *
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Describe brevemente qué procesos te están costando más tiempo y dinero..."
                    required
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-zyvo-white text-sm placeholder-zyvo-white/20 focus:outline-none focus:border-zyvo-gold/40 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(212,175,55,0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-zyvo-gold text-zyvo-dark font-semibold text-sm rounded-xl transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                  ) : (
                    <>Enviar mensaje <ArrowRight size={16} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
