'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import { toast } from 'sonner'
import {
  Share2, Building2, DollarSign, ShieldCheck, FileText,
  Repeat2, Tag, Unlock, CheckCircle2, ChevronDown, ArrowRight,
} from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

// ─── AnimatedNumber ──────────────────────────────────────────────────────────
function AnimatedNumber({
  target, prefix = '', suffix = '', className = '',
}: { target: number; prefix?: string; suffix?: string; className?: string }) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false })
  const prev   = useRef(0)

  useEffect(() => {
    if (!ref.current) return
    const from = prev.current
    prev.current = target
    const ctrl = animate(from, target, {
      duration: 0.6,
      ease: EASE,
      onUpdate(v) {
        if (ref.current)
          ref.current.textContent =
            prefix +
            new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(v)) +
            suffix
      },
    })
    return () => ctrl.stop()
  }, [target, prefix, suffix])

  void inView
  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}

// ─── Data ────────────────────────────────────────────────────────────────────
const RATES = {
  comercial:   { setup: 0.10, mensual: 0.05, maxMeses: 6  },
  estrategico: { setup: 0.15, mensual: 0.10, maxMeses: 12 },
} as const

type Nivel = keyof typeof RATES

const NIVELES: { key: Nivel; label: string }[] = [
  { key: 'comercial',   label: 'Partner Comercial'  },
  { key: 'estrategico', label: 'Partner Estratégico'},
]

const TABLA_NIVELES = [
  { nivel: 'Referidor',          setup: '5%',          mensual: '—',           duracion: '—',           destacado: false },
  { nivel: 'Partner Comercial',  setup: '10%',          mensual: '5%',           duracion: '6 meses',     destacado: false },
  { nivel: 'Partner Estratégico',setup: '15%',          mensual: '10%',          duracion: '6–12 meses',  destacado: true  },
  { nivel: 'Asociado ZYVO',      setup: 'Por convenio', mensual: 'Por convenio', duracion: 'Según acuerdo', destacado: false},
]

const BENEFITS = [
  { icon: <DollarSign size={18} />, title: 'Monetiza tu red',             desc: 'Convierte cada recomendación en una fuente de ingreso real, no en un favor.' },
  { icon: <ShieldCheck size={18} />, title: 'Respaldo de marca técnica',   desc: 'Presentas a ZYVO como socio. La autoridad y la metodología ya están construidas.' },
  { icon: <FileText size={18} />,    title: 'Materiales para vender mejor',desc: 'Deck, one-pager y casos de uso listos para usar en tus conversaciones.' },
  { icon: <Repeat2  size={18} />,    title: 'Comisiones reales y recurrentes', desc: 'No es un pago único. Los niveles Comercial y Estratégico generan ingreso mes a mes.' },
  { icon: <Tag      size={18} />,    title: 'Descuento si también eres cliente', desc: 'Los partners que también son clientes ZYVO acceden a condiciones preferenciales en su fee mensual.' },
  { icon: <Unlock   size={18} />,    title: 'Sin cuota de entrada',        desc: 'No pagas nada por ser partner. El programa se sustenta en resultados, no en membresías.' },
]

const PASOS = [
  { numero: '01', titulo: 'Te registras',              desc: 'Completa el formulario y recibes tu ID de partner con acceso a los materiales.' },
  { numero: '02', titulo: 'Refieres o presentas',      desc: 'Conectas a ZYVO con la empresa correcta y registras el lead antes de la presentación.' },
  { numero: '03', titulo: 'ZYVO valida y activa',      desc: 'ZYVO califica el lead, cierra el proyecto, cobra y activa tu comisión o beneficio.' },
]

const REQUISITOS = [
  'Tener intención real de sumar valor, no solo de cobrar una comisión.',
  'Entender qué hace ZYVO y para qué tipo de empresa es la solución correcta.',
  'Respetar la marca y no prometer lo que ZYVO no ofrece.',
  'Registrar el lead antes de presentarlo — sin registro previo no hay atribución.',
  'Aceptar que la comisión depende del cierre y del primer cobro efectivo.',
  'No usar tácticas de venta agresivas o engañosas en nombre de ZYVO.',
]

const FAQS: { q: string; a: string }[] = [
  {
    q: '¿Cuándo se paga la comisión?',
    a: 'La comisión se activa cuando el lead ha sido registrado correctamente, pasa el filtro de calificación, el proyecto cierra y se genera el primer cobro al cliente. No se paga por leads que no cierran.',
  },
  {
    q: '¿Puedo registrar un lead que ya contactó a ZYVO?',
    a: 'No. El registro del lead debe hacerse antes de la presentación formal. Si el prospecto ya está en conversación con ZYVO sin atribución previa, no aplica comisión. El orden importa.',
  },
  {
    q: '¿Hay exclusividad territorial?',
    a: 'No. El programa de partners no tiene restricciones geográficas. Puedes referir empresas de cualquier estado o país donde ZYVO pueda operar.',
  },
  {
    q: '¿Qué diferencia a un Partner de un Asociado?',
    a: 'Un Partner refiere oportunidades y gana comisión por cada proyecto. Un Asociado integra a ZYVO dentro de su propia oferta o red comercial de forma estructurada — las condiciones se definen por convenio.',
  },
  {
    q: '¿Puedo ser partner y cliente al mismo tiempo?',
    a: 'Sí. De hecho, los mejores partners son quienes han experimentado ZYVO desde adentro. Ser cliente y partner al mismo tiempo da acceso a condiciones preferenciales en el fee mensual propio.',
  },
  {
    q: '¿Cómo sé que mi lead fue atribuido correctamente?',
    a: 'Al registrar el lead recibes una confirmación con el ID de atribución. Ese ID queda vinculado al contacto en el sistema de ZYVO. Si el proyecto cierra, se te notifica y se activa la comisión con transparencia total.',
  },
]

const PREFIJOS = [
  { code: '+52', label: '🇲🇽 +52' },
  { code: '+1',  label: '🇺🇸 +1'  },
  { code: '+57', label: '🇨🇴 +57' },
  { code: '+54', label: '🇦🇷 +54' },
  { code: '+34', label: '🇪🇸 +34' },
]

type PartnerForm = {
  nombre: string
  empresa: string
  email: string
  waPrefijo: string
  waNumero: string
  tipoInteres: 'Partner' | 'Asociado' | ''
  comoConocio: string
  contexto: string
}

const EMPTY_FORM: PartnerForm = {
  nombre: '', empresa: '', email: '',
  waPrefijo: '+52', waNumero: '',
  tipoInteres: '', comoConocio: '', contexto: '',
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="glass rounded-xl p-5 cursor-pointer select-none"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      onClick={() => setOpen(v => !v)}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-zyvo-white/80 leading-snug">{q}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 mt-0.5 text-zyvo-white/30 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          open ? 'mt-3 grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm text-zyvo-white/50 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Slider ──────────────────────────────────────────────────────────────────
function Slider({
  value, min, max, step = 1, onChange, label, format,
}: {
  value: number; min: number; max: number; step?: number
  onChange: (v: number) => void; label: string; format: (v: number) => string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zyvo-white/40">{label}</span>
        <span className="text-sm font-semibold text-zyvo-electric font-mono">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        onWheel={e => e.currentTarget.blur()}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00AAFF ${pct}%, rgba(255,255,255,0.08) ${pct}%)`,
        }}
      />
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #00AAFF;
          box-shadow: 0 0 8px rgba(0,170,255,0.6);
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #00AAFF;
          box-shadow: 0 0 8px rgba(0,170,255,0.6);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PartnersSection() {
  // Calculadora state
  const [setupUSD,   setSetupUSD]   = useState(2000)
  const [mensualUSD, setMensualUSD] = useState(500)
  const [nivel,      setNivel]      = useState<Nivel>('comercial')
  const [duracion,   setDuracion]   = useState<6 | 12>(6)

  // Calculadora derived (no useEffect — directo)
  const rate           = RATES[nivel]
  const comSetup       = setupUSD * rate.setup
  const comMensual     = mensualUSD * rate.mensual
  const mesesActivos   = Math.min(duracion, rate.maxMeses)
  const totalRecur     = comMensual * mesesActivos
  const totalGeneral   = comSetup + totalRecur

  // Form state
  const [form,    setForm]    = useState<PartnerForm>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)

  function set<K extends keyof PartnerForm>(key: K, val: PartnerForm[K]) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.tipoInteres) {
      toast.error('Nombre, email y tipo de interés son requeridos.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:      form.nombre,
          email:       form.email,
          empresa:     form.empresa || undefined,
          whatsapp:    form.waNumero.trim() ? `${form.waPrefijo}${form.waNumero.trim()}` : undefined,
          tipoInteres: form.tipoInteres,
          comoConocio: form.comoConocio || undefined,
          contexto:    form.contexto   || undefined,
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      toast.success('¡Registro recibido! Te contactamos en menos de 24 h.')
    } catch {
      toast.error('Error al enviar. Escríbenos a direccion@zyvo.com.mx')
    } finally {
      setLoading(false)
    }
  }

  const fmtUSD = (v: number) => `$${new Intl.NumberFormat('en-US').format(v)} USD`

  function scrollToForm() {
    document.getElementById('partners-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="partners" className="section-pad relative overflow-hidden">

      {/* Orbs decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -22, 0], opacity: [0.06, 0.13, 0.06] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 left-1/3 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,170,255,0.18) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
        <motion.div
          animate={{ y: [0, 18, 0], opacity: [0.05, 0.10, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-32 right-1/4 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)', filter: 'blur(44px)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* ── 1. Hero ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-20 space-y-6"
        >
          <span className="inline-block text-xs font-medium tracking-widest text-zyvo-gold/70 uppercase px-4 py-1.5 rounded-full border border-zyvo-gold/20 bg-zyvo-gold/5">
            Ecosistema de Partners
          </span>
          <h2 className="font-(family-name:--font-instrument-serif) text-4xl md:text-6xl font-normal text-zyvo-white leading-tight">
            Crece con ZYVO.<br className="hidden sm:block" />
            <span className="text-gradient-gold italic"> Gana con ZYVO.</span>
          </h2>
          <p className="text-zyvo-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            No es un programa de afiliados genérico. Es un ecosistema donde conectas empresas que necesitan
            infraestructura inteligente con quien sabe construirla — y generas ingreso real con cada proyecto que activas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 8px 40px rgba(255,94,247,0.45), 0 0 60px rgba(2,245,255,0.25)' }}
              whileTap={{ scale: 0.9, rotate: 3 }}
              onClick={scrollToForm}
              className="flex items-center gap-2 px-8 py-3.5 btn-glow cursor-hover"
            >
              Quiero ser Partner
              <ArrowRight size={15} />
            </motion.button>
            <motion.button
              whileHover={{ borderColor: 'rgba(0,170,255,0.35)', color: '#F5F5F5' }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToForm}
              className="flex items-center gap-2 px-8 py-3.5 border border-white/10 text-zyvo-white/55 text-sm rounded-full transition-all duration-200 cursor-hover"
            >
              Quiero ser Asociado
            </motion.button>
          </div>
        </motion.div>

        {/* ── 2. Dos caminos ──────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest mb-6"
          >
            Dos formas de colaborar
          </motion.p>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Partner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass rounded-2xl p-8 space-y-4"
              style={{ borderColor: 'rgba(0,170,255,0.18)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,170,255,0.1)', border: '1px solid rgba(0,170,255,0.25)', color: '#00AAFF' }}>
                <Share2 size={22} />
              </div>
              <div>
                <h3 className="font-(family-name:--font-instrument-serif) text-xl text-zyvo-white font-normal mb-2">
                  Partner ZYVO
                </h3>
                <p className="text-zyvo-white/45 text-sm leading-relaxed">
                  Personas o profesionales que refieren y conectan a ZYVO con empresas que necesitan infraestructura inteligente.
                  Ideal para consultores, directivos y profesionales que conocen el dolor operativo de sus clientes y quieren
                  sumarles una solución real.
                </p>
              </div>
              <div className="pt-4 border-t border-white/6">
                <span className="text-xs text-zyvo-gold/60 font-mono">Comisión por proyecto · Niveles progresivos</span>
              </div>
            </motion.div>

            {/* Asociado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass rounded-2xl p-8 space-y-4"
              style={{ borderColor: 'rgba(0,229,255,0.15)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: '#00E5FF' }}>
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="font-(family-name:--font-instrument-serif) text-xl text-zyvo-white font-normal mb-2">
                  Asociado ZYVO
                </h3>
                <p className="text-zyvo-white/45 text-sm leading-relaxed">
                  Aliados estratégicos: consultoras, despachos, integradores o empresas que incorporan la arquitectura
                  de sistemas inteligentes de ZYVO dentro de su propia oferta o red comercial. Las condiciones se
                  definen por convenio según el alcance de cada alianza.
                </p>
              </div>
              <div className="pt-4 border-t border-white/6">
                <span className="text-xs text-zyvo-electric/60 font-mono">Condiciones por convenio · Modelo personalizado</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── 3. Beneficios ───────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            className="mb-8 space-y-2"
          >
            <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">Qué obtienes</p>
            <h3 className="font-(family-name:--font-instrument-serif) text-2xl md:text-3xl text-zyvo-white font-normal">
              Beneficios concretos, sin relleno
            </h3>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                className="glass rounded-xl p-5 space-y-3"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <div className="text-zyvo-gold/70">{b.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-zyvo-white mb-1">{b.title}</p>
                  <p className="text-xs text-zyvo-white/40 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 4. Cómo funciona ────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            className="mb-10 space-y-2"
          >
            <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">El proceso</p>
            <h3 className="font-(family-name:--font-instrument-serif) text-2xl md:text-3xl text-zyvo-white font-normal">
              Tres pasos. Cero fricción.
            </h3>
          </motion.div>

          {/* Línea conectora */}
          <div className="hidden md:block relative h-px -mb-px mx-8" aria-hidden="true">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-zyvo-gold/20 to-transparent" />
            <motion.div
              animate={{ x: ['-10%', '110%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
              className="absolute top-0 w-16 h-px bg-zyvo-gold/60"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/4 rounded-2xl overflow-hidden border border-white/6">
            {PASOS.map((paso, i) => (
              <motion.div
                key={paso.numero}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: EASE }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(12,18,32,1)' }}
                className="bg-zyvo-dark p-8 flex flex-col gap-5 transition-colors duration-300"
              >
                <motion.span
                  animate={{ opacity: [0.45, 0.75, 0.45] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                  className="font-(family-name:--font-instrument-serif) text-5xl text-zyvo-gold/60 leading-none select-none"
                >
                  {paso.numero}
                </motion.span>
                <div className="space-y-2 flex-1">
                  <h4 className="text-zyvo-white font-semibold text-lg">{paso.titulo}</h4>
                  <p className="text-zyvo-white/45 text-sm leading-relaxed">{paso.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 5. Tabla de niveles ──────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            className="mb-8 space-y-2"
          >
            <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">Estructura de comisiones</p>
            <h3 className="font-(family-name:--font-instrument-serif) text-2xl md:text-3xl text-zyvo-white font-normal">
              Niveles y retribuciones
            </h3>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TABLA_NIVELES.map((t, i) => (
              <motion.div
                key={t.nivel}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                className={`glass rounded-xl p-6 flex flex-col gap-4 ${t.destacado ? 'ring-1 ring-zyvo-gold/40' : ''}`}
                style={{ borderColor: t.destacado ? 'rgba(0,170,255,0.35)' : 'rgba(255,255,255,0.07)' }}
              >
                {t.destacado && (
                  <span className="self-start text-xs px-2 py-0.5 rounded-full bg-zyvo-gold/15 text-zyvo-gold border border-zyvo-gold/30">
                    Popular
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-zyvo-white">{t.nivel}</p>
                </div>
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-xs text-zyvo-white/30 uppercase tracking-wider mb-0.5">Setup</p>
                    <p className="text-zyvo-electric font-bold text-lg">{t.setup}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zyvo-white/30 uppercase tracking-wider mb-0.5">Mensual</p>
                    <p className="text-zyvo-white/70 font-semibold">{t.mensual}</p>
                  </div>
                  <div className="pt-3 border-t border-white/6">
                    <p className="text-xs text-zyvo-white/25 font-mono">{t.duracion}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 6. Calculadora ───────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            className="mb-8 space-y-2"
          >
            <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">Simulador</p>
            <h3 className="font-(family-name:--font-instrument-serif) text-2xl md:text-3xl text-zyvo-white font-normal">
              Calcula tu comisión potencial
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
            className="glass rounded-2xl p-8 md:p-10 space-y-8"
            style={{ borderColor: 'rgba(0,229,255,0.12)' }}
          >
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                {/* Setup slider */}
                <Slider
                  value={setupUSD} min={800} max={5000} step={100}
                  onChange={setSetupUSD} label="Setup del proyecto (USD)"
                  format={fmtUSD}
                />
                {/* Mensual slider */}
                <Slider
                  value={mensualUSD} min={150} max={3000} step={50}
                  onChange={setMensualUSD} label="Fee mensual del cliente (USD)"
                  format={fmtUSD}
                />
              </div>

              <div className="space-y-6">
                {/* Nivel tabs */}
                <div>
                  <p className="text-xs text-zyvo-white/40 mb-3">Tu nivel de partner</p>
                  <div className="flex flex-wrap gap-2">
                    {NIVELES.map(n => (
                      <button
                        key={n.key}
                        onClick={() => setNivel(n.key)}
                        className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                          nivel === n.key
                            ? 'bg-zyvo-gold/15 border-zyvo-gold/40 text-zyvo-gold'
                            : 'border-white/8 text-zyvo-white/40 hover:border-white/20 hover:text-zyvo-white/60'
                        }`}
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duración toggle */}
                <div>
                  <p className="text-xs text-zyvo-white/40 mb-3">Duración del contrato mensual</p>
                  <div className="flex gap-2">
                    {([6, 12] as const).map(d => (
                      <button
                        key={d}
                        onClick={() => setDuracion(d)}
                        className={`flex-1 py-2 text-sm rounded-xl border transition-all duration-200 ${
                          duracion === d
                            ? 'bg-white/8 border-white/20 text-zyvo-white'
                            : 'border-white/6 text-zyvo-white/35 hover:border-white/14 hover:text-zyvo-white/50'
                        }`}
                      >
                        {d} meses
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

            {/* Outputs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Comisión setup */}
              <div className="glass rounded-xl p-5 text-center space-y-1" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <p className="text-xs text-zyvo-white/30 uppercase tracking-wider">Por setup</p>
                <AnimatedNumber
                  target={comSetup}
                  prefix="$"
                  suffix=" USD"
                  className="block text-xl font-bold text-zyvo-electric font-mono"
                />
              </div>

              {/* Comisión mensual */}
              <div
                className="glass rounded-xl p-5 text-center space-y-1"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <p className="text-xs text-zyvo-white/30 uppercase tracking-wider">Por mes</p>
                <AnimatedNumber
                  target={comMensual}
                  prefix="$"
                  suffix=" USD"
                  className="block text-xl font-bold text-zyvo-electric font-mono"
                />
              </div>

              {/* Total recurrencia */}
              <div
                className="glass rounded-xl p-5 text-center space-y-1"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <p className="text-xs text-zyvo-white/30 uppercase tracking-wider">Recurrencia total</p>
                <AnimatedNumber
                  target={totalRecur}
                  prefix="$"
                  suffix=" USD"
                  className="block text-xl font-bold text-zyvo-electric font-mono"
                />
              </div>

              {/* Total general */}
              <div className="glass rounded-xl p-5 text-center space-y-1" style={{ borderColor: 'rgba(0,170,255,0.2)' }}>
                <p className="text-xs text-zyvo-white/30 uppercase tracking-wider">Total general</p>
                <AnimatedNumber
                  target={totalGeneral}
                  prefix="$"
                  suffix=" USD"
                  className="block text-2xl font-bold text-zyvo-gold font-mono"
                />
              </div>
            </div>

            {/* Nota legal */}
            <p className="text-xs text-zyvo-white/22 text-center leading-relaxed">
              La comisión se activa únicamente cuando el lead está correctamente registrado, pasa el filtro de calificación, cierra el proyecto y genera el primer cobro. Los montos son estimados y pueden variar según el proyecto acordado.
            </p>
          </motion.div>
        </div>

        {/* ── 7. Requisitos ────────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            className="mb-8 space-y-2"
          >
            <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">Antes de aplicar</p>
            <h3 className="font-(family-name:--font-instrument-serif) text-2xl md:text-3xl text-zyvo-white font-normal">
              Requisitos para entrar al ecosistema
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
            className="glass rounded-2xl p-8 md:p-10"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <ul className="space-y-4">
              {REQUISITOS.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-zyvo-gold/60" />
                  <span className="text-sm text-zyvo-white/60 leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── 8. FAQ ───────────────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            className="mb-8 space-y-2"
          >
            <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">Dudas frecuentes</p>
            <h3 className="font-(family-name:--font-instrument-serif) text-2xl md:text-3xl text-zyvo-white font-normal">
              Preguntas de partners reales
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-3">
            {FAQS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
              >
                <FAQItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 9. Formulario ────────────────────────────────────────────── */}
        <motion.div
          id="partners-form"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: EASE }}
          className="glass rounded-2xl p-8 md:p-12"
          style={{ borderColor: 'rgba(0,170,255,0.15)' }}
        >
          {sent ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-zyvo-gold/10 border border-zyvo-gold/30 flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} className="text-zyvo-gold" />
              </div>
              <h3 className="font-(family-name:--font-instrument-serif) text-2xl text-zyvo-white font-normal">
                ¡Registro recibido!
              </h3>
              <p className="text-zyvo-white/45 text-sm">
                Te contactamos en menos de 24 horas para activar tu perfil de partner.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 space-y-2">
                <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">Aplicar ahora</p>
                <h3 className="font-(family-name:--font-instrument-serif) text-2xl md:text-3xl text-zyvo-white font-normal">
                  Regístrate como Partner o Asociado
                </h3>
                <p className="text-zyvo-white/40 text-sm">Sin cuota. Sin compromiso. Solo llena el formulario y te contactamos.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Tipo de interés */}
                <div className="space-y-2">
                  <label className="text-xs text-zyvo-white/40 uppercase tracking-wider">Tipo de interés *</label>
                  <div className="flex gap-3">
                    {(['Partner', 'Asociado'] as const).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set('tipoInteres', t)}
                        className={`flex-1 py-3 text-sm rounded-xl border transition-all duration-200 ${
                          form.tipoInteres === t
                            ? 'bg-zyvo-gold/15 border-zyvo-gold/40 text-zyvo-gold'
                            : 'border-white/8 text-zyvo-white/40 hover:border-white/20 hover:text-zyvo-white/60'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nombre + Empresa */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zyvo-white/40 uppercase tracking-wider">Nombre *</label>
                    <input
                      type="text" value={form.nombre}
                      onChange={e => set('nombre', e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-zyvo-white/80 placeholder-zyvo-white/20 outline-none focus:border-zyvo-gold/35 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-zyvo-white/40 uppercase tracking-wider">Empresa (opcional)</label>
                    <input
                      type="text" value={form.empresa}
                      onChange={e => set('empresa', e.target.value)}
                      placeholder="Nombre de tu empresa o despacho"
                      className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-zyvo-white/80 placeholder-zyvo-white/20 outline-none focus:border-zyvo-gold/35 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zyvo-white/40 uppercase tracking-wider">Correo electrónico *</label>
                  <input
                    type="email" value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-zyvo-white/80 placeholder-zyvo-white/20 outline-none focus:border-zyvo-gold/35 transition-colors"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zyvo-white/40 uppercase tracking-wider">WhatsApp (opcional)</label>
                  <div className="flex gap-2">
                    <select
                      value={form.waPrefijo}
                      onChange={e => set('waPrefijo', e.target.value)}
                      className="bg-white/3 border border-white/8 rounded-xl px-3 py-3 text-sm text-zyvo-white/70 outline-none focus:border-zyvo-gold/35 transition-colors shrink-0"
                    >
                      {PREFIJOS.map(p => (
                        <option key={p.code} value={p.code} className="bg-zyvo-dark">{p.label}</option>
                      ))}
                    </select>
                    <input
                      type="tel" value={form.waNumero}
                      onChange={e => set('waNumero', e.target.value)}
                      placeholder="Número sin código de país"
                      className="flex-1 bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-zyvo-white/80 placeholder-zyvo-white/20 outline-none focus:border-zyvo-gold/35 transition-colors"
                    />
                  </div>
                </div>

                {/* Cómo conoció */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zyvo-white/40 uppercase tracking-wider">¿Cómo conociste ZYVO?</label>
                  <select
                    value={form.comoConocio}
                    onChange={e => set('comoConocio', e.target.value)}
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-zyvo-white/70 outline-none focus:border-zyvo-gold/35 transition-colors"
                  >
                    <option value="" className="bg-zyvo-dark text-zyvo-white/50">Selecciona una opción</option>
                    <option value="Recomendación" className="bg-zyvo-dark">Recomendación de alguien</option>
                    <option value="LinkedIn"      className="bg-zyvo-dark">LinkedIn</option>
                    <option value="Google"        className="bg-zyvo-dark">Búsqueda en Google</option>
                    <option value="Redes sociales" className="bg-zyvo-dark">Redes sociales</option>
                    <option value="Otro"          className="bg-zyvo-dark">Otro</option>
                  </select>
                </div>

                {/* Contexto */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zyvo-white/40 uppercase tracking-wider">Cuéntanos tu red o contexto</label>
                  <textarea
                    rows={3}
                    value={form.contexto}
                    onChange={e => set('contexto', e.target.value)}
                    placeholder="¿Con qué tipo de empresas trabajas? ¿Qué te motivó a aplicar como partner?"
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-zyvo-white/80 placeholder-zyvo-white/20 outline-none focus:border-zyvo-gold/35 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.03, boxShadow: '0 8px 40px rgba(255,94,247,0.45), 0 0 60px rgba(2,245,255,0.25)' } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 btn-glow disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Enviando...' : form.tipoInteres === 'Asociado' ? 'Quiero ser Asociado' : 'Registrarme como Partner'}
                  {!loading && <ArrowRight size={15} />}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>

      </div>
    </section>
  )
}
