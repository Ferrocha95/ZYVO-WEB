import type { Metadata } from 'next'
import PartnersSection from '@/components/sections/PartnersSection'

export const metadata: Metadata = {
  title: 'Partners & Asociados | ZYVO',
  description:
    'Únete al ecosistema de colaboración comercial de ZYVO. Monetiza tu red como Partner o integra ZYVO en tu oferta como Asociado estratégico.',
}

export default function PartnersPage() {
  return (
    <main className="min-h-screen">
      <PartnersSection />
    </main>
  )
}
