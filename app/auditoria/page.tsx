import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Search, CheckCircle2, Clock, FileText, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Auditoría de Fricción Operativa — ZYVO',
  alternates: { canonical: '/auditoria' },
  description:
    'Diagnóstico de los puntos donde tu empresa pierde tiempo y control. Entregable: un roadmap de automatización priorizado por impacto.',
}

const INCLUYE = [
  {
    icon: Search,
    titulo: 'Mapeo de procesos críticos',
    desc: 'Identificamos los flujos operativos que consumen más tiempo y tienen mayor impacto en el negocio.',
  },
  {
    icon: TrendingUp,
    titulo: 'Cuantificación financiera de la fuga',
    desc: 'Calculamos en pesos mexicanos cuánto le cuesta a tu empresa cada punto de fricción por mes.',
  },
  {
    icon: FileText,
    titulo: 'Roadmap de automatización',
    desc: 'Entregamos un plan priorizado por impacto: qué automatizar primero y por qué.',
  },
  {
    icon: Clock,
    titulo: 'Entrega ágil',
    desc: 'El diagnóstico con hallazgos y recomendaciones se entrega en pocos días hábiles.',
  },
]

const PASOS = [
  {
    numero: '01',
    titulo: 'Llamada de diagnóstico',
    desc: 'Una sesión de 45–60 minutos donde mapeamos tus procesos actuales: ventas, operaciones, soporte y administración.',
  },
  {
    numero: '02',
    titulo: 'Análisis y cuantificación',
    desc: 'Nuestro equipo analiza los datos, identifica las fugas operativas y calcula el impacto financiero de cada una.',
  },
  {
    numero: '03',
    titulo: 'Entrega del roadmap',
    desc: 'Recibes un documento con hallazgos, oportunidades de automatización ordenadas por impacto y pasos siguientes concretos.',
  },
]

export default function AuditoriaPage() {
  return (
    <div className="min-h-screen bg-base pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ink/40 text-sm hover:text-ink/70 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/20 mb-5">
            <Search size={12} className="text-cyan/60" />
            <span className="text-ink/40 text-xs uppercase tracking-widest font-medium">
              Servicio de arquitectura
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-tight mb-4">
            Auditoría de Fricción{' '}
            <span className="text-gradient italic">Operativa</span>
          </h1>
          <p className="text-ink/55 text-base md:text-lg leading-relaxed max-w-2xl">
            Diagnosticamos dónde pierde tiempo y control tu empresa. En pocos días hábiles
            tienes un mapa claro de tus fugas operativas y un roadmap priorizado por impacto para eliminarlas.
          </p>
          <div className="mt-6 h-px bg-linear-to-r from-cyan/30 via-cyan/10 to-transparent" />
        </div>

        {/* Qué incluye */}
        <div className="mb-16">
          <h2 className="font-display text-2xl text-ink mb-8">
            ¿Qué incluye?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INCLUYE.map(item => (
              <div key={item.titulo} className="glass rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan/8 border border-cyan/15 flex items-center justify-center shrink-0">
                    <item.icon size={15} className="text-cyan/70" />
                  </div>
                  <h3 className="text-ink/85 text-sm font-medium">{item.titulo}</h3>
                </div>
                <p className="text-ink/45 text-sm leading-relaxed pl-11">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso */}
        <div className="mb-16">
          <h2 className="font-display text-2xl text-ink mb-8">
            Cómo funciona
          </h2>
          <div className="space-y-4">
            {PASOS.map((paso, i) => (
              <div key={paso.numero} className="flex gap-5 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-9 h-9 rounded-full bg-base border border-cyan/25 flex items-center justify-center">
                    <span className="font-(family-name:--font-jetbrains-mono) text-cyan/70 text-xs font-medium">
                      {paso.numero}
                    </span>
                  </div>
                  {i < PASOS.length - 1 && (
                    <div className="w-px flex-1 bg-cyan/10 mt-2 mb-0" style={{ minHeight: '32px' }} />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="text-ink/85 font-medium text-sm mb-1">{paso.titulo}</h3>
                  <p className="text-ink/45 text-sm leading-relaxed">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Para quién */}
        <div className="mb-16 glass rounded-2xl p-7">
          <h2 className="font-display text-xl text-ink mb-5">
            ¿A quién está dirigida?
          </h2>
          <ul className="space-y-3">
            {[
              'PyMEs y negocios con una operación ya en marcha.',
              'Empresas con equipos de 3+ personas realizando trabajo repetitivo.',
              'Negocios donde la información está dispersa entre WhatsApp, Excel y email.',
              'Dueños que sienten que su equipo trabaja mucho pero los resultados no escalan.',
              'Organizaciones que quieren automatizar pero no saben por dónde empezar.',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={15} className="text-cyan shrink-0 mt-0.5" />
                <span className="text-ink/60 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-ink/40 text-sm">Sin compromiso. Sin pitch agresivo.</p>
          <Link
            href="/#cta"
            className="inline-flex items-center gap-2 btn-primary px-8 py-3.5 text-sm"
          >
            Solicitar mi auditoría <ArrowRight size={15} />
          </Link>
          <p className="text-ink/25 text-xs">
            Respuesta en menos de 24 horas hábiles.
          </p>
        </div>

      </div>
    </div>
  )
}
