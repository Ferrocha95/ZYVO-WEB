import HeroSection        from '@/components/sections/HeroSection'
import FriccionSection    from '@/components/sections/FriccionSection'
import ConsultoriaSection from '@/components/sections/ConsultoriaSection'
import SistemasSection    from '@/components/sections/SistemasSection'
import ProcesoSection     from '@/components/sections/ProcesoSection'
import ControlSection     from '@/components/sections/ControlSection'
import EvidenciaSection   from '@/components/sections/EvidenciaSection'
import RutasLateralesSection from '@/components/sections/RutasLateralesSection'
import EstimadorSection   from '@/components/sections/EstimadorSection'
import FaqSection         from '@/components/sections/FaqSection'
import ContactoSection    from '@/components/sections/ContactoSection'

// Estructura de la home — identidad 2026.
// Hero + Fricción + ConsultorIA + Sistemas ya son reales; el resto son
// placeholders que se construyen por fase. Las anclas (id) coinciden con el
// navbar y el CTA (#contacto).
export default function HomePage() {
  return (
    <>
      <HeroSection />

      <FriccionSection />
      <ConsultoriaSection />
      <SistemasSection />
      <ProcesoSection />
      <ControlSection />
      <EvidenciaSection />
      <RutasLateralesSection />
      <EstimadorSection />
      <FaqSection />
      <ContactoSection />
    </>
  )
}
