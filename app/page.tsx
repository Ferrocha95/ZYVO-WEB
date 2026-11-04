import HeroSection        from '@/components/sections/HeroSection'
import SectionPlaceholder from '@/components/sections/SectionPlaceholder'

// Estructura de la home — identidad 2026.
// El Hero ya es real; el resto son placeholders que se construyen por fase.
// Los anclas (id) coinciden con el navbar y el CTA (#contacto).
export default function HomePage() {
  return (
    <>
      <HeroSection />

      <SectionPlaceholder id="friccion"    n="01" eyebrow="Fricción operativa"    title="Las señales de que tu operación depende de ti" />
      <SectionPlaceholder id="consultoria" n="02" eyebrow="ConsultorIA 1a1"        title="60 minutos para ver tu operación con claridad" />
      <SectionPlaceholder id="sistemas"    n="03" eyebrow="Sistemas"               title="Operativo agéntico, comercial inteligente y apps a medida" />
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
