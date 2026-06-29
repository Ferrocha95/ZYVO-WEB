# ZYVO Website — Guía para Claude Code

## Proyecto
Landing page de conversión para ZYVO IA — estudio de arquitectura de sistemas inteligentes para empresas en México y LATAM.

## Stack
Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis

## Instalar si faltan
npm install framer-motion gsap @studio-freight/lenis

## Design tokens
bg: #050508
surface: #0D0D14
surface-2: #0A0A12
accent-violet: #6C5CE7
accent-cyan: #00D4FF
accent-purple: #A855F7
text-primary: #F0F0FF
text-secondary: #8888A8
border: rgba(108,92,231,0.2)

## Tipografía
Display/Headings: Space Grotesk
Body: Inter
Mono: JetBrains Mono

## Clases globales en globals.css
.gradient-text — texto gradient violeta a cian
.glass-card — card glassmorphism con hover
.btn-primary — botón gradient rounded-full
.btn-ghost — botón outline rounded-full
.pill — badge pequeño violeta
.section-label — label mono uppercase
.dot-grid-bg — fondo con puntos

## Animaciones en lib/animations.ts
fadeUp, fadeIn, stagger, staggerFast, scaleIn, slideInRight, viewportOnce

## Reglas absolutas
- Dark mode absoluto. Nunca light mode.
- Framer Motion con whileInView + viewport once en todas las secciones
- Lenis en components/SmoothScroll.tsx como client component separado
- Solo Tailwind + inline style para tokens. Sin CSS modules.
- NUNCA mostrar precios en ninguna parte del sitio
- NUNCA mencionar cifras de productos en componentes

## Orden de secciones en page.tsx
Nav → Hero → Problema → Productos → HubSpotlight → EmpleadosDigitales → Calculadora → Proceso → RomeSection → Auditoria → ParaQuienEs → Footer

## RomeWidget
Global en layout.tsx, fixed bottom-6 right-6 z-50
ID del botón: rome-widget-btn
El widget usa app/api/rome para conectar

## Formulario de auditoría
Usa el endpoint existente en app/api/contact — conservarlo intacto

## Datos en lib/constants.ts y lib/animations.ts
Siempre importar de ahí. Nunca hardcodear en componentes salvo Productos.tsx

## Archivos que NO tocar nunca
- app/api/ — todos los endpoints se conservan intactos
- app/blog/ — se conserva
- app/partners/ — se conserva
- app/auditoria/ — se conserva
- app/privacidad/ — se conserva
- data/blog-posts.ts — se conserva
- config/site.ts — se conserva
- lib/utils.ts — se conserva

## Lo que se elimina
- Componentes viejos que queden huérfanos tras el rebuild
- Robot 3D o Three.js del hero — reemplazado por AgentNetworkSVG
- Testimonios ficticios — eliminados
- FAQ genérico — eliminado
- Cualquier mención de precios en componentes

## Productos ZYVO (para copy, sin precios)
1. ZYVO Hub — SaaS entrada, Asistente Directiva IA + Marketplace agentes
2. CRM Inteligente — pipeline comercial con IA (no mencionar AIDA en el sitio)
3. ERP Agéntico — operación completa en autopiloto, construido a medida

## URLs
Hub: https://hub.zyvo.com.mx
Email: direccion@zyvo.com.mx
Instagram: https://www.instagram.com/zyvo_ai/
Facebook: https://www.facebook.com/share/1Cqb4Qrti7/
TikTok: https://tiktok.com/@zyvo.ai
LinkedIn: https://linkedin.com/company/zyvo-ai
