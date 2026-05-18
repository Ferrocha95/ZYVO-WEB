# ZYVO Web — Instrucciones para Claude Code

## Identidad del Proyecto
ZYVO es una boutique de Arquitectura de IA y Automatización para PyMEs mexicanas.
NO es agencia de marketing. Es firma de ingeniería de eficiencia operativa.
Cliente ideal: dueño de "Boring Business" mexicano atrapado en la pinza financiera 2026.

## Stack Tecnológico
- Next.js 16 App Router — NO Pages Router, NO Three.js
- TypeScript strict mode — sin `any`, sin atajos
- Tailwind CSS v4 — config vía `@theme inline` en globals.css (NO tailwind.config.ts)
- Framer Motion v12 — todas las animaciones UI
- Canvas 2D API — animación de nodos en GlobalBackground y NodeBackground
- Lenis v1.3.x — smooth scroll vía LenisProvider
- Supabase — leads en tabla `leads` y `rome_leads`
- Lucide React — iconografía

## Tailwind v4 — Clases canónicas (OBLIGATORIO)
- `bg-linear-to-r` NO `bg-gradient-to-r`
- `bg-white/4` NO `bg-white/[0.04]`
- `border-white/6` NO `border-white/[0.06]`
- `z-99998` NO `z-[99998]`
- `font-(family-name:--font-instrument-serif)` NO `font-[family-name:...]`
- Arrays de ease en Framer Motion SIEMPRE con `as const`

## Identidad Visual (NO negociar)
- Fondo base: #080C14 — NUNCA #000000
- Oro élite: #D4AF37 | Azul corp: #0A2463 | Midnight: #1D3557 | Blanco: #F5F5F5
- Tipografía headlines: Instrument Serif | body: Plus Jakarta Sans | datos: JetBrains Mono
- Estética: Glassmorphism + Dark Mode + nodos Canvas + grain overlay sutil
- Motion: suave y deliberado. Ease estándar: `[0.25, 0.46, 0.45, 0.94] as const`
- Glass: `backdrop-blur-18px`, borde `rgba(255,255,255,0.08)`, clase `.glass`

## Estructura de Archivos Clave
- `app/layout.tsx` — Server Component, 3 fuentes Google, GlobalBackground + GrainOverlay + CustomCursor + LenisProvider + FloatingContactButtons
- `app/page.tsx` — 7 secciones en orden
- `app/api/contact/route.ts` — POST leads a Supabase tabla `leads`
- `app/api/rome/route.ts` — POST agente Rome → OpenAI GPT-4o-mini → Supabase `rome_leads` + n8n webhook
- `components/ui/GlobalBackground.tsx` — Canvas 2D fijo z=-1, 90 nodos (gold/blue/white), fondo de toda la landing
- `components/ui/CustomCursor.tsx` — anillo w-5 h-5, punto w-1 h-1, spring physics
- `components/ui/GrainOverlay.tsx` — SVG fractalNoise fixed z-9999, opacity 0.038
- `components/ui/FloatingContactButtons.tsx` — botones flotantes WhatsApp + Rome
- `components/ui/RomeChatWidget.tsx` — chat panel Rome IA, quick chips, lead capture
- `components/providers/LenisProvider.tsx` — smooth scroll client component
- `components/layout/Navbar.tsx` — 4 links + CTA, glass en scroll, menú móvil
- `components/layout/Footer.tsx` — social icons (IG/FB/TK/LI), LFPDPPP, uptime

## Secciones de la Landing (orden en page.tsx)
1. **HeroSection** — headline + badge + 2 CTAs + social proof stats (sin NodeBackground propio, usa GlobalBackground)
2. **ProblemaValorSection** — 2 cols: problema (lista stagger) + solución (glass card métricas)
3. **ServiciosSection** — 3 cards glassmorphism: Automatización de Procesos / Agentes IA / Sistemas Agénticos. SIN precios.
4. **CalculadoraSection** — slider 1-20 empleados, fuga operativa MXN. Columna derecha: ahorro potencial 50-60% (NO ROI fijo, NO desglose ZYVO)
5. **AgentesSimpleSection** — 3 agentes: SDR / Onboarding / Contabilidad
6. **ProcesoSection** — 3 pasos: Diagnóstico / Diseño / Estabilización
7. **CTAFinalSection** — formulario auditoría 4 campos → /api/contact

## Calculadora — Lógica Financiera
- Salario mínimo MX 2026: $315.04/día × 30 días = $9,451 MXN base
- Carga social: 48% → costo real/empleado: ~$13,988 MXN/mes
- Fuga operativa: 40% del tiempo improductivo
- Ahorro con ZYVO: **50%–60% de la fuga operativa** (varía por implementación)
- NO mostrar precio fijo de implementación — precio varía según agentes/complejidad

## Agente Rome
- Personalidad: asesor comercial clínico, NO chatbot genérico
- Backend: `app/api/rome/route.ts` llama OpenAI GPT-4o-mini con system prompt de calificación
- Lead capturado cuando Rome detecta: nombre + empresa + contacto → bloque `LEAD_CAPTURE:{...}`
- Payload n8n: `{nombre, empresa, whatsapp, email, facturacion, problema, resumen, intencion, timestamp, source:"landing_zyvo_rome"}`
- Quick chips: "¿Qué hace ZYVO?" / "¿Qué servicios ofrecen?" / "¿Mi empresa califica?" / "Quiero dejar mis datos" / "Hablar por WhatsApp"

## Variables de Entorno (.env.local)
- `OPENAI_API_KEY` — Rome agent
- `SUPABASE_URL` + `SUPABASE_ANON_KEY` — leads storage
- `N8N_WEBHOOK_URL` — notificaciones Rome leads
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — formato: 5215512345678

## Reglas de Código
- `'use client'` SOLO para hooks/eventos/animaciones — Server Components por defecto
- API routes: try/catch, retornan `{ success, data?, error? }`
- Variables de entorno: NUNCA exponer en cliente (usar NEXT_PUBLIC_ solo si es necesario)
- Comentarios en español. PascalCase para componentes, camelCase para hooks/utils.
- Easing arrays siempre `as const`. Sin `any`.

## Filosofía de Diseño
- Autoridad clínica + pragmatismo financiero + estética futurista sobria
- Cada sección: infraestructura, no marketing
- Fondo vivo: GlobalBackground canvas siempre activo en z=-1
- Decoraciones por sección: floating orbs (motion.div blur gradients) en loop infinito
- Cursor personalizado pequeño (w-5 anillo, w-1 punto) con spring physics

## Lo que ZYVO NO es
- No agencia digital | No chatbots baratos | No promete "rápido y fácil"
- No buzzwords vacíos | No neón ni gradientes púrpura genéricos
