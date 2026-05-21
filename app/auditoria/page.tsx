import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Search, CheckCircle2, Clock, FileText, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Auditoría de Fricción Operativa — ZYVO',
  description:
    'Diagnóstico financiero de los puntos donde tu empresa pierde tiempo y dinero. Entregable: roadmap de automatización priorizado por ROI en 48 horas.',
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
    desc: 'Entregamos un plan priorizado por ROI: qué automatizar primero, por qué y cuánto se ahorra.',
  },
  {
    icon: Clock,
    titulo: 'Entrega en 48 horas',
    desc: 'El diagnóstico completo con hallazgos y recomendaciones está listo en menos de dos días hábiles.',
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
    desc: 'Recibes un documento con hallazgos, oportunidades de automatización ordenadas por ROI y pasos siguientes concretos.',
  },
]

export default function AuditoriaPage() {
  return (
    <div className="min-h-screen bg-zyvo-dark pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zyvo-white/40 text-sm hover:text-zyvo-white/70 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zyvo-gold/20 mb-5">
            <Search size={12} className="text-zyvo-gold/60" />
            <span className="text-zyvo-white/40 text-xs uppercase tracking-widest font-medium">
              Servicio de arquitectura
            </span>
          </div>
          <h1 className="font-(family-name:--font-instrument-serif) text-4xl md:text-6xl text-zyvo-white leading-tight mb-4">
            Auditoría de Fricción{' '}
            <span className="text-gradient-gold italic">Operativa</span>
          </h1>
          <p className="text-zyvo-white/55 text-base md:text-lg leading-relaxed max-w-2xl">
            Diagnosticamos dónde pierde tiempo y dinero tu empresa. En 48 horas tienes un
            mapa claro de tus fugas operativas y un roadmap priorizado para eliminarlas.
          </p>
          <div className="mt-6 h-px bg-linear-to-r from-zyvo-gold/30 via-zyvo-gold/10 to-transparent" />
        </div>

        {/* Qué incluye */}
        <div className="mb-16">
          <h2 className="font-(family-name:--font-instrument-serif) text-2xl text-zyvo-white mb-8">
            ¿Qué incluye?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INCLUYE.map(item => (
              <div key={item.titulo} className="glass rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zyvo-gold/8 border border-zyvo-gold/15 flex items-center justify-center shrink-0">
                    <item.icon size={15} className="text-zyvo-gold/70" />
                  </div>
                  <h3 className="text-zyvo-white/85 text-sm font-medium">{item.titulo}</h3>
                </div>
                <p className="text-zyvo-white/45 text-sm leading-relaxed pl-11">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso */}
        <div className="mb-16">
          <h2 className="font-(family-name:--font-instrument-serif) text-2xl text-zyvo-white mb-8">
            Cómo funciona
          </h2>
          <div className="space-y-4">
            {PASOS.map((paso, i) => (
              <div key={paso.numero} className="flex gap-5 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-9 h-9 rounded-full bg-zyvo-dark border border-zyvo-gold/25 flex items-center justify-center">
                    <span className="font-(family-name:--font-jetbrains-mono) text-zyvo-gold/70 text-xs font-medium">
                      {paso.numero}
                    </span>
                  </div>
                  {i < PASOS.length - 1 && (
                    <div className="w-px flex-1 bg-zyvo-gold/10 mt-2 mb-0" style={{ minHeight: '32px' }} />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="text-zyvo-white/85 font-medium text-sm mb-1">{paso.titulo}</h3>
                  <p className="text-zyvo-white/45 text-sm leading-relaxed">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Para quién */}
        <div className="mb-16 glass rounded-2xl p-7">
          <h2 className="font-(family-name:--font-instrument-serif) text-xl text-zyvo-white mb-5">
            ¿A quién está dirigida?
          </h2>
          <ul className="space-y-3">
            {[
              'PyMEs mexicanas con facturación mensual de $100K MXN o más.',
              'Empresas con equipos de 3+ personas realizando trabajo repetitivo.',
              'Negocios donde la información está dispersa entre WhatsApp, Excel y email.',
              'Dueños que sienten que su equipo trabaja mucho pero los resultados no escalan.',
              'Organizaciones que quieren automatizar pero no saben por dónde empezar.',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={15} className="text-zyvo-gold shrink-0 mt-0.5" />
                <span className="text-zyvo-white/60 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-zyvo-white/40 text-sm">Sin compromiso. Sin pitch agresivo.</p>
          <Link
            href="/#cta"
            className="inline-flex items-center gap-2 btn-glow px-8 py-3.5 text-sm"
          >
            Solicitar mi auditoría <ArrowRight size={15} />
          </Link>
          <p className="text-zyvo-white/25 text-xs">
            Respuesta en menos de 24 horas hábiles.
          </p>
        </div>

      </div>
    </div>
  )
}
