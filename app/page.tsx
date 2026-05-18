import HeroSection          from '@/components/sections/HeroSection'
import ProblemaValorSection  from '@/components/sections/ProblemaValorSection'
import ServiciosSection      from '@/components/sections/ServiciosSection'
import CalculadoraSection    from '@/components/sections/CalculadoraSection'
import AgentesSimpleSection  from '@/components/sections/AgentesSimpleSection'
import ProcesoSection        from '@/components/sections/ProcesoSection'
import CTAFinalSection       from '@/components/sections/CTAFinalSection'

type DividerVariant = 'gold' | 'blue' | 'subtle'

function Divider({ variant = 'gold' }: { variant?: DividerVariant }) {
  const via: Record<DividerVariant, string> = {
    gold:   'via-zyvo-gold/30',
    blue:   'via-zyvo-blue/50',
    subtle: 'via-white/8',
  }
  return (
    <div className="relative h-px max-w-6xl mx-auto px-6">
      <div className={`h-px bg-linear-to-r from-transparent ${via[variant]} to-transparent`} />
      {variant !== 'subtle' && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-zyvo-gold/60" />
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Divider variant="gold" />
      <ProblemaValorSection />
      <Divider variant="blue" />
      <ServiciosSection />
      <Divider variant="gold" />
      <CalculadoraSection />
      <Divider variant="subtle" />
      <AgentesSimpleSection />
      <Divider variant="blue" />
      <ProcesoSection />
      <Divider variant="gold" />
      <CTAFinalSection />
    </>
  )
}
