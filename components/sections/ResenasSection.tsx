'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, CheckCircle, Zap, Target } from 'lucide-react'
import { TestimonialStack, type Testimonial } from '@/components/ui/glass-testimonial-swiper'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const testimonialesZyvo: Testimonial[] = [
  {
    id: 1,
    initials: 'RC',
    name: 'Roberto Cisneros',
    role: 'Director General · Grupo Logística Norteña',
    quote:
      'Implementamos el agente de documentos para procesar nuestras guías de embarque. Lo que antes tomaba 3 días con 2 personas, ahora ocurre en horas. No lo creímos hasta verlo.',
    tags: [
      { text: 'Logística', type: 'default' },
      { text: 'Verificado', type: 'featured' },
    ],
    stats: [
      { icon: TrendingUp, text: '3 días → horas' },
      { icon: Users, text: '2 operadores liberados' },
    ],
    avatarGradient: 'linear-gradient(135deg, #0A2463, #1D3557)',
  },
  {
    id: 2,
    initials: 'SR',
    name: 'Dra. Sofía Rangel',
    role: 'Directora Médica · Clínica MedVida',
    quote:
      'El agente de atención redujo las llamadas al 40% porque los pacientes ya encuentran lo que necesitan solos. Nuestro personal ahora se enfoca en lo que realmente importa.',
    tags: [
      { text: 'Salud', type: 'default' },
      { text: 'Verificado', type: 'featured' },
    ],
    stats: [
      { icon: TrendingUp, text: '40% menos llamadas' },
      { icon: Clock, text: 'Atención 24/7' },
    ],
    avatarGradient: 'linear-gradient(135deg, #264653, #2a9d8f)',
  },
  {
    id: 3,
    initials: 'CM',
    name: 'Ing. Carlos Mondragón',
    role: 'CEO · Constructora Tierra Firme',
    quote:
      'Teníamos un problema serio con el seguimiento de cotizaciones. El agente comercial de ZYVO convirtió ese caos en un proceso limpio. Cerramos 30% más en el primer trimestre.',
    tags: [
      { text: 'Construcción', type: 'default' },
      { text: 'Verificado', type: 'featured' },
    ],
    stats: [
      { icon: TrendingUp, text: '+30% cierres Q1' },
      { icon: Target, text: 'Pipeline limpio' },
    ],
    avatarGradient: 'linear-gradient(135deg, #0077CC, #00AAFF)',
  },
  {
    id: 4,
    initials: 'AV',
    name: 'Ana Villanueva',
    role: 'Gerente de Operaciones · Distribuidora El Roble',
    quote:
      'Lo que más me convenció fue que no nos vendieron tecnología, nos vendieron resultados. A los 45 días ya veíamos el impacto en números reales.',
    tags: [
      { text: 'Distribución', type: 'default' },
      { text: 'Verificado', type: 'featured' },
    ],
    stats: [
      { icon: CheckCircle, text: 'ROI en 45 días' },
      { icon: Zap, text: 'Resultados medibles' },
    ],
    avatarGradient: 'linear-gradient(135deg, #1D3557, #457b9d)',
  },
  {
    id: 5,
    initials: 'DF',
    name: 'Mtro. Diego Fuentes',
    role: 'Fundador · Academia Impulsa',
    quote:
      'El onboarding de nuevos alumnos era un dolor de cabeza constante. Hoy corre solo. Puedo escalar sin contratar más gente de soporte.',
    tags: [
      { text: 'Educación', type: 'default' },
      { text: 'Verificado', type: 'featured' },
    ],
    stats: [
      { icon: Zap, text: 'Onboarding automático' },
      { icon: Users, text: 'Escala sin nómina' },
    ],
    avatarGradient: 'linear-gradient(135deg, #0A2463, #3a86ff)',
  },
  {
    id: 6,
    initials: 'PS',
    name: 'Lic. Patricia Solís',
    role: 'Directora Comercial · Inmobiliaria Cima',
    quote:
      'Cada lead que llega ahora está calificado antes de llegar a mis asesores. Dejamos de perder tiempo con personas que solo estaban curioseando. Resultados desde la primera semana.',
    tags: [
      { text: 'Inmobiliaria', type: 'default' },
      { text: 'Verificado', type: 'featured' },
    ],
    stats: [
      { icon: Target, text: 'Leads precalificados' },
      { icon: TrendingUp, text: 'Resultados semana 1' },
    ],
    avatarGradient: 'linear-gradient(135deg, #00AAFF, #0A2463)',
  },
]

export default function ResenasSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      {/* Decoración de fondo */}
      <motion.div
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,170,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-medium tracking-widest text-zyvo-gold/70 uppercase mb-4 px-4 py-1.5 rounded-full border border-zyvo-gold/20 bg-zyvo-gold/5">
            Resultados reales
          </span>
          <h2 className="font-(family-name:--font-instrument-serif) text-3xl md:text-4xl font-normal text-zyvo-white">
            Lo que dicen quienes ya{' '}
            <span className="text-gradient-gold italic">operan diferente</span>
          </h2>
          <p className="text-zyvo-white/40 text-sm mt-3">
            Arrastra para explorar · {testimonialesZyvo.length} testimonios
          </p>
        </motion.div>

        {/* TestimonialStack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="relative h-115"
        >
          <TestimonialStack testimonials={testimonialesZyvo} visibleBehind={2} />
        </motion.div>
      </div>
    </section>
  )
}
