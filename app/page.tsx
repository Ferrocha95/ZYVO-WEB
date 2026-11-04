import HeroSection        from '@/components/sections/HeroSection'
import FriccionSection    from '@/components/sections/FriccionSection'
import ConsultoriaSection from '@/components/sections/ConsultoriaSection'
import SistemasSection    from '@/components/sections/SistemasSection'
import SectionPlaceholder from '@/components/sections/SectionPlaceholder'

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
      <SectionPlaceholder id="proceso"     n="04" eyebrow="Cómo trabajamos"        title="Siete pasos, de la ConsultorIA a la continuidad" />
      <SectionPlaceholder id="control"     n="05" eyebrow="Control y seguridad"    title="Human in the loop, trazabilidad y tus datos son tuyos" />
      <SectionPlaceholder id="evidencia"   n="06" eyebrow="Evidencia"              title="Casos en construcción" />
      <SectionPlaceholder id="rutas"       n="07" eyebrow="Rutas laterales"        title="EscuderIA y Fuelle Studio" />
      <SectionPlaceholder id="estimador"   n="08" eyebrow="Estimador de fricción"  title="El costo mensual de operar a mano" />
      <SectionPlaceholder id="faq"         n="09" eyebrow="FAQ"                     title="Preguntas frecuentes" />
      <SectionPlaceholder id="contacto"    n="10" eyebrow="Contacto"               title="Hablemos de tu operación" />
    </>
  )
}
