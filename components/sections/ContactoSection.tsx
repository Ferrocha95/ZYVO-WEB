'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Mail, MessageCircle, ArrowRight, Loader2 } from 'lucide-react'
import SectionHeading from './SectionHeading'

const WHATSAPP = 'https://wa.me/527291216435'
const EMAIL = 'direccion@zyvo.com.mx'

const TAMANOS = ['Solo yo', '2–5', '6–10', '11–25', '26 o más']
const FRICCIONES = [
  'Todo depende de mí',
  'Información dispersa',
  'Seguimiento por memoria',
  'Tareas repetitivas',
  'Poca visibilidad',
  'Se rompe con el volumen',
  'Otro',
]

export default function ContactoSection() {
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [correo, setCorreo] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [equipo, setEquipo] = useState(TAMANOS[0])
  const [friccion, setFriccion] = useState(FRICCIONES[0])
  const [enviando, setEnviando] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (enviando) return
    setEnviando(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // El endpoint existente no se toca: los campos nuevos se mapean a `mensaje`.
        body: JSON.stringify({
          nombre,
          email: correo,
          whatsapp,
          empresa,
          mensaje: `Tamaño de equipo: ${equipo}. Fricción principal: ${friccion}.`,
          tipo: 'contacto',
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(data.message ?? 'Solicitud recibida. Te contactamos pronto.')
        setNombre(''); setEmpresa(''); setCorreo(''); setWhatsapp('')
        setEquipo(TAMANOS[0]); setFriccion(FRICCIONES[0])
      } else {
        toast.error(data.error ?? 'No se pudo enviar. Intenta de nuevo.')
      }
    } catch {
      toast.error('No se pudo enviar. Revisa tu conexión e intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-surface/40 px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-cyan/50 focus:outline-none transition-colors'

  return (
    <section id="contacto" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">
        {/* Columna izquierda */}
        <div>
          <SectionHeading
            n="10"
            eyebrow="Contacto"
            title="Hablemos de tu operación"
            intro="Cuéntanos qué te tiene atascado y agendamos la ConsultorIA. Sin costo, sin compromiso."
          />
          <div className="mt-8 space-y-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl glass-card p-4 hover:border-cyan/40 transition-colors"
            >
              <MessageCircle size={18} className="text-cyan shrink-0" />
              <span className="text-sm text-ink">WhatsApp directo</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 rounded-xl glass-card p-4 hover:border-cyan/40 transition-colors"
            >
              <Mail size={18} className="text-cyan shrink-0" />
              <span className="text-sm text-ink">{EMAIL}</span>
            </a>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={onSubmit} className="rounded-2xl glass-card p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nombre">
              <input className={inputClass} value={nombre} onChange={e => setNombre(e.target.value)} required placeholder="Tu nombre" />
            </Field>
            <Field label="Empresa">
              <input className={inputClass} value={empresa} onChange={e => setEmpresa(e.target.value)} required placeholder="Nombre de tu empresa" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Correo">
              <input type="email" className={inputClass} value={correo} onChange={e => setCorreo(e.target.value)} required placeholder="tu@correo.com" />
            </Field>
            <Field label="WhatsApp">
              <input type="tel" className={inputClass} value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="Opcional" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Tamaño de equipo">
              <select className={inputClass} value={equipo} onChange={e => setEquipo(e.target.value)}>
                {TAMANOS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Fricción principal">
              <select className={inputClass} value={friccion} onChange={e => setFriccion(e.target.value)}>
                {FRICCIONES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
          </div>

          <button type="submit" disabled={enviando} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 btn-primary disabled:opacity-60">
            {enviando ? <><Loader2 size={16} className="animate-spin" /> Enviando…</> : <>Agendar ConsultorIA <ArrowRight size={15} /></>}
          </button>
          <p className="text-xs text-muted text-center">Te contactamos en menos de 24 horas hábiles.</p>
        </form>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-muted mb-1.5">{label}</span>
      {children}
    </label>
  )
}
