import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problema from '@/components/Problema'
import Productos from '@/components/Productos'
import HubSpotlight from '@/components/HubSpotlight'
import EmpleadosDigitales from '@/components/EmpleadosDigitales'
import Calculadora from '@/components/Calculadora'
import Proceso from '@/components/Proceso'
import RomeSection from '@/components/RomeSection'
import Auditoria from '@/components/Auditoria'
import ParaQuienEs from '@/components/ParaQuienEs'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problema />
      <Productos />
      <HubSpotlight />
      <EmpleadosDigitales />
      <Calculadora />
      <Proceso />
      <RomeSection />
      <Auditoria />
      <ParaQuienEs />
      <Footer />
    </main>
  )
}
