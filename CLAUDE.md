# ZYVO Web — Instrucciones para Claude Code

## Identidad del Proyecto
ZYVO es una boutique de Arquitectura de IA y Automatización para PyMEs mexicanas.
NO es agencia de marketing. Es firma de ingeniería de eficiencia operativa.
Cliente ideal: dueño de "Boring Business" mexicano atrapado en la pinza financiera 2026.

## Stack Tecnológico
- Next.js 16 App Router — NO Pages Router
- TypeScript strict mode — sin `any`, sin atajos
- Tailwind CSS v4 — config vía `@theme inline` en globals.css (NO tailwind.config.ts)
- Framer Motion v12 — todas las animaciones UI
- Three.js — shader WebGL aurora en GlobalBackground (throttled ~36fps, pausa en tab oculto)
- Spline — modelos 3D lazy-loaded vía `@splinetool/react-spline` en SplineScene.tsx
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
- Acento principal: #00AAFF (sky blue) — reemplaza oro; token `zyvo-gold` apunta a este color
- Eléctrico texto: #00E5FF — token `zyvo-electric`; usar en highlights, métricas, stats
- Azul corp: #0A2463 | Midnight: #1D3557 | Blanco: #F5F5F5
- NO usar #D4AF37 ni amarillo en ningún elemento nuevo
- Tipografía headlines: Instrument Serif | body: Plus Jakarta Sans | datos: JetBrains Mono
- Estética: Glassmorphism + Dark Mode + aurora WebGL + grain overlay sutil
- Motion: suave y deliberado. Ease estándar: `[0.25, 0.46, 0.45, 0.94] as const`
- Glass: `backdrop-blur`, borde `rgba(255,255,255,0.08)`, clase `.glass`

## Sistema de Botones CTA
- `.btn-glow` — `isolation: isolate` + `::after` blur glow pink→cyan exterior. Usar en secciones.
- `.btn-glow-nav` — gradiente directo sin `::after` (para contenedores con `overflow:hidden`).
- `whileHover: boxShadow '0 8px 40px rgba(255,94,247,0.45), 0 0 60px rgba(2,245,255,0.25)'`
- `whileTap: { scale: 0.9, rotate: 3 }`

## Estructura de Archivos Clave
- `app/layout.tsx` — Server Component, 3 fuentes Google, GlobalBackground + GrainOverlay + CustomCursor + LenisProvider + FloatingContactButtons
- `app/page.tsx` — 8 secciones en orden
- `app/api/contact/route.ts` — POST leads a Supabase tabla `leads`
- `app/api/rome/route.ts` — POST agente Rome → OpenAI GPT-4o-mini → Supabase `rome_leads` + n8n webhook
- `components/ui/GlobalBackground.tsx` — Three.js WebGL shader aurora fijo z=-1, ~36fps throttle
- `components/ui/SplineScene.tsx` — Spline 3D lazy-loaded con React.lazy + Suspense
- `components/ui/CustomCursor.tsx` — crosshair eléctrico `#00E5FF`, 4 brazos + dot + outer ring en hover; retorna null en touch devices
- `components/ui/GrainOverlay.tsx` — SVG fractalNoise fixed z-9999, opacity 0.038
- `components/ui/FloatingContactButtons.tsx` — botón Rome IA (glow pink→cyan, animate-ping, Bot↔X)
- `components/ui/RomeChatWidget.tsx` — chat panel zinc/glass, textarea rows=3, Shift+Enter=newline, contador /500
- `components/providers/LenisProvider.tsx` — smooth scroll client component
- `components/layout/Navbar.tsx` — AnimatedNavFramer pill centrada; colapsa a círculo scroll>150px; mobile: hamburger fullscreen
- `components/layout/Footer.tsx` — grid xl:grid-cols-3, AnimatedSection whileInView, 4 secciones de links

## Secciones de la Landing (orden en page.tsx)
1. **HeroSection** — headline + badge + 2 CTAs + social proof stats (usa GlobalBackground)
2. **ProblemaValorSection** — 2 cols: problema (lista stagger) + solución (glass card métricas)
3. **ServiciosSection** — 3 cards glassmorphism: Automatización / Agentes IA / Sistemas Agénticos. SIN precios.
4. **CalculadoraSection** — slider 1-20 empleados, fuga operativa MXN. Ahorro potencial 50-60%.
5. **AgentesSimpleSection** — carrusel 5 agentes, auto-avance 4s, pause on hover
6. **ProcesoSection** — 3 pasos: Diagnóstico / Diseño / Estabilización
7. **ResenasSection** — testimonios de clientes con animación stagger
8. **CTAFinalSection** — formulario auditoría 4 campos → /api/contact

## Calculadora — Lógica Financiera
- Salario mínimo MX 2026: $315.04/día × 30 días = $9,451 MXN base
- Carga social: 48% → costo real/empleado: ~$13,988 MXN/mes
- Fuga operativa: 40% del tiempo improductivo
- Ahorro con ZYVO: **50%–60% de la fuga operativa** (varía por implementación)
- NO mostrar precio fijo de implementación

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
- Fondo vivo: GlobalBackground Three.js shader siempre activo en z=-1
- Decoraciones por sección: floating orbs (motion.div blur gradients) en loop infinito
- Cursor: crosshair eléctrico premium; retorna null en dispositivos touch

## Lo que ZYVO NO es
- No agencia digital | No chatbots baratos | No promete "rápido y fácil"
- No buzzwords vacíos | No neón ni gradientes púrpura genéricos | No amarillo
