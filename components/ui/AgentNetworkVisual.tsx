'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'

// ── Coordenadas del SVG ────────────────────────────────────────────────────
const W   = 500
const H   = 560
const CX  = 250   // centro X
const CY  = 272   // centro Y (ligeramente arriba del centro para equilibrio visual)
const R   = 142   // radio de órbita de satélites

// ── Nodos satélite ─────────────────────────────────────────────────────────
const AGENTS = [
  { label: 'Ventas IA',    angle: -90  },   // arriba
  { label: 'Atención',     angle: -30  },   // arriba-derecha
  { label: 'Marketing',    angle: 30   },   // abajo-derecha
  { label: 'Operaciones',  angle: 90   },   // abajo
  { label: 'RRHH',         angle: 150  },   // abajo-izquierda
  { label: 'Logística',    angle: -150 },   // arriba-izquierda
]

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

const NODES = AGENTS.map((a) => ({ ...a, ...polar(a.angle, R) }))

// Anchor de texto por cuadrante: evita que labels se salgan del SVG
function textAnchor(angle: number): 'middle' | 'start' | 'end' {
  if (angle > -45 && angle < 45)   return 'start'
  if (angle > 135 || angle < -135) return 'end'
  return 'middle'
}
function labelDy(angle: number): number {
  if (angle <= -60 && angle >= -120) return -22   // arriba del nodo
  if (angle >= 60  && angle <= 120)  return 28    // abajo del nodo
  return 5                                          // centrado vertical
}
function labelDx(angle: number): number {
  if (angle > -45 && angle < 45)   return 22
  if (angle > 135 || angle < -135) return -22
  return 0
}

// Colores del sistema ZYVO (paleta azul/cian/magenta del globals.css activo)
const C_ELECTRIC = '#00E5FF'
const C_GOLD     = '#00AAFF'
const C_MAGENTA  = 'rgba(255,94,247,0.85)'
const C_DARK     = '#080C14'

export default function AgentNetworkVisual({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '')

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      {/* Float suave del conjunto completo */}
      <motion.svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        aria-hidden="true"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          {/* Gradiente central node */}
          <radialGradient id={`cGrad-${uid}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%"   stopColor={C_ELECTRIC} stopOpacity="0.22" />
            <stop offset="100%" stopColor={C_DARK}      stopOpacity="0.95" />
          </radialGradient>

          {/* Gradiente nodo satélite */}
          <radialGradient id={`sGrad-${uid}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%"   stopColor={C_GOLD}  stopOpacity="0.18" />
            <stop offset="100%" stopColor={C_DARK}   stopOpacity="0.95" />
          </radialGradient>

          {/* Glow filter — central */}
          <filter id={`glowC-${uid}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Glow filter — satélites */}
          <filter id={`glowS-${uid}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Clip para anillos decorativos (contener dentro del SVG) */}
          <clipPath id={`clip-${uid}`}>
            <rect x="0" y="0" width={W} height={H} />
          </clipPath>
        </defs>

        {/* ── Anillos decorativos de fondo ─────────────────────────────── */}
        <g clipPath={`url(#clip-${uid})`} opacity="0.12">
          {[200, 290, 380].map((r, i) => (
            <motion.circle
              key={r}
              cx={CX} cy={CY} r={r}
              fill="none"
              stroke={i % 2 === 0 ? C_GOLD : C_ELECTRIC}
              strokeWidth={0.6}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}
        </g>

        {/* ── Líneas de conexión (dashed con animación de flujo) ───────── */}
        {NODES.map((node, i) => {
          const len = Math.hypot(node.x - CX, node.y - CY)
          return (
            <path
              key={`edge-${i}`}
              d={`M ${CX} ${CY} L ${node.x} ${node.y}`}
              stroke={C_GOLD}
              strokeWidth={1}
              strokeOpacity={0.2}
              fill="none"
              strokeDasharray="5 5"
              style={{
                animation: `zyvoEdge 2.4s linear ${(i * 0.38).toFixed(2)}s infinite`,
                strokeDashoffset: len,
              }}
            />
          )
        })}

        {/* Keyframes inyectados en el SVG */}
        <style>{`
          @keyframes zyvoEdge {
            from { stroke-dashoffset: 60; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>

        {/* ── Pulsos viajando de centro → satélite ─────────────────────── */}
        {NODES.map((node, i) => {
          const dx = node.x - CX
          const dy = node.y - CY
          return (
            <motion.circle
              key={`pulse-${i}`}
              r={2.5}
              cx={CX}
              cy={CY}
              fill={i % 2 === 0 ? C_ELECTRIC : C_GOLD}
              animate={{
                x: [0, dx * 0.92, 0],
                y: [0, dy * 0.92, 0],
                opacity: [0, 0.9, 0.9, 0],
                scale:   [0.6, 1, 0.8, 0.5],
              }}
              transition={{
                duration: 2 + i * 0.28,
                repeat: Infinity,
                delay: i * 0.48,
                ease: 'easeInOut',
                times: [0, 0.45, 0.75, 1],
              }}
            />
          )
        })}

        {/* ── Nodos satélite ────────────────────────────────────────────── */}
        {NODES.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Glow */}
            <motion.circle
              cx={node.x} cy={node.y} r={18}
              fill={C_GOLD}
              opacity={0.07}
              filter={`url(#glowS-${uid})`}
              animate={{ opacity: [0.05, 0.14, 0.05] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            />
            {/* Anillo exterior */}
            <motion.circle
              cx={node.x} cy={node.y} r={15}
              fill="none"
              stroke={C_GOLD}
              strokeWidth={1}
              strokeOpacity={0.35}
              animate={{ strokeOpacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            />
            {/* Relleno interior */}
            <circle
              cx={node.x} cy={node.y} r={12}
              fill={`url(#sGrad-${uid})`}
              stroke={C_GOLD}
              strokeWidth={0.8}
              strokeOpacity={0.5}
            />
            {/* Punto central del nodo */}
            <motion.circle
              cx={node.x} cy={node.y} r={3.5}
              fill={C_GOLD}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
            />
            {/* Label */}
            <text
              x={node.x + labelDx(node.angle)}
              y={node.y + labelDy(node.angle)}
              textAnchor={textAnchor(node.angle)}
              dominantBaseline="middle"
              fontSize={10.5}
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.06em"
              fill={C_ELECTRIC}
              opacity={0.7}
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* ── Nodo central ──────────────────────────────────────────────── */}
        <g>
          {/* Halo exterior pulsante */}
          <motion.circle
            cx={CX} cy={CY} r={46}
            fill="none"
            stroke={C_MAGENTA}
            strokeWidth={0.8}
            strokeOpacity={0.15}
            animate={{ r: [42, 50, 42], strokeOpacity: [0.08, 0.22, 0.08] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Glow de fondo */}
          <motion.circle
            cx={CX} cy={CY} r={34}
            fill={C_ELECTRIC}
            opacity={0.06}
            filter={`url(#glowC-${uid})`}
            animate={{ opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Anillo principal */}
          <motion.circle
            cx={CX} cy={CY} r={30}
            fill="none"
            stroke={C_ELECTRIC}
            strokeWidth={1.2}
            strokeOpacity={0.5}
            animate={{ strokeOpacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Cuerpo del nodo */}
          <circle
            cx={CX} cy={CY} r={26}
            fill={`url(#cGrad-${uid})`}
            stroke={C_ELECTRIC}
            strokeWidth={1}
            strokeOpacity={0.6}
          />
          {/* Label: "IA" */}
          <text
            x={CX} y={CY - 4}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={13}
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="500"
            letterSpacing="0.12em"
            fill={C_ELECTRIC}
            opacity={0.9}
          >
            IA
          </text>
          <text
            x={CX} y={CY + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={7.5}
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.14em"
            fill={C_ELECTRIC}
            opacity={0.45}
          >
            NÚCLEO
          </text>
        </g>

        {/* ── Partículas de ambiente ────────────────────────────────────── */}
        {[
          { cx: 80,  cy: 90,  r: 1.2, delay: 0    },
          { cx: 420, cy: 130, r: 1.0, delay: 1.1  },
          { cx: 60,  cy: 440, r: 1.4, delay: 2.3  },
          { cx: 445, cy: 410, r: 1.1, delay: 0.7  },
          { cx: 170, cy: 60,  r: 0.9, delay: 1.8  },
          { cx: 350, cy: 490, r: 1.3, delay: 3.0  },
        ].map((p, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={p.cx} cy={p.cy} r={p.r}
            fill={C_ELECTRIC}
            animate={{ opacity: [0, 0.5, 0], y: [0, -12, 0] }}
            transition={{ duration: 4 + p.delay, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </motion.svg>
    </div>
  )
}
