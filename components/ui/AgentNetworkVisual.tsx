'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'

const W   = 500
const H   = 560
const CX  = 250
const CY  = 272
const R   = 142   // radio órbita satélites principales
const RM  = 52    // radio mini-nodos desde su satélite padre

const AGENTS = [
  { label: 'Asistente Directiva', angle: -90,  miniNodes: ['Agenda', 'Correos', 'Contexto'] },
  { label: 'Ventas',              angle: -30,  miniNodes: ['Calificación', 'Seguimiento', 'Pipeline'] },
  { label: 'Atención',            angle: 30,   miniNodes: ['Multicanal', 'Resolución', 'Escalamiento'] },
  { label: 'Marketing',           angle: 90,   miniNodes: ['Contenido', 'Programación', 'Reportes'] },
  { label: 'Recepcionista',       angle: 150,  miniNodes: ['Filtrado', 'Enrutamiento', 'Disponibilidad'] },
  { label: 'RRHH',                angle: -150, miniNodes: ['Onboarding', 'Políticas', 'Procesos'] },
] as const

function polar(angleDeg: number, radius: number, ox = CX, oy = CY) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: ox + radius * Math.cos(rad), y: oy + radius * Math.sin(rad) }
}

const NODES = AGENTS.map((a) => ({ ...a, ...polar(a.angle, R) }))

function textAnchor(angle: number): 'middle' | 'start' | 'end' {
  if (angle > -45 && angle < 45)   return 'start'
  if (angle > 135 || angle < -135) return 'end'
  return 'middle'
}
function labelDy(angle: number): number {
  if (angle <= -60 && angle >= -120) return -22
  if (angle >= 60  && angle <= 120)  return 28
  return 5
}
function labelDx(angle: number): number {
  if (angle > -45 && angle < 45)   return 22
  if (angle > 135 || angle < -135) return -22
  return 0
}

// Mini-nodo text placement
function miniAnchor(mx: number): 'middle' | 'start' | 'end' {
  if (mx > 275) return 'start'
  if (mx < 225) return 'end'
  return 'middle'
}
function miniDy(my: number): number {
  if (my < 185) return -11
  if (my > 375) return 11
  return 0
}
function miniDx(mx: number): number {
  if (mx > 275) return 9
  if (mx < 225) return -9
  return 0
}

const C_ELECTRIC = '#00E5FF'
const C_GOLD     = '#00AAFF'
const C_MAGENTA  = 'rgba(255,94,247,0.85)'
const C_DARK     = '#080C14'

// Spread de ángulos para los 3 mini-nodos de cada satélite
const MINI_SPREADS = [-28, 0, 28]

export default function AgentNetworkVisual({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '')

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <motion.svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        aria-hidden="true"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <radialGradient id={`cGrad-${uid}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%"   stopColor={C_ELECTRIC} stopOpacity="0.22" />
            <stop offset="100%" stopColor={C_DARK}      stopOpacity="0.95" />
          </radialGradient>
          <radialGradient id={`sGrad-${uid}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%"   stopColor={C_GOLD}  stopOpacity="0.18" />
            <stop offset="100%" stopColor={C_DARK}   stopOpacity="0.95" />
          </radialGradient>
          <radialGradient id={`mGrad-${uid}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%"   stopColor={C_GOLD}  stopOpacity="0.12" />
            <stop offset="100%" stopColor={C_DARK}   stopOpacity="0.9" />
          </radialGradient>
          <filter id={`glowC-${uid}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id={`glowS-${uid}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id={`glowM-${uid}`} x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <clipPath id={`clip-${uid}`}>
            <rect x="0" y="0" width={W} height={H} />
          </clipPath>
        </defs>

        {/* Anillos decorativos de fondo */}
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

        {/* Líneas principales: centro → satélite */}
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

        <style>{`
          @keyframes zyvoEdge {
            from { stroke-dashoffset: 60; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>

        {/* Pulsos centro → satélite */}
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

        {/* Mini-nodos (ocultos en mobile, visibles en lg+) */}
        <g className="hidden lg:block">
          {NODES.map((node, ni) => {
            const miniPositions = MINI_SPREADS.map((spread) =>
              polar(node.angle + spread, RM, node.x, node.y)
            )
            return (
              <g key={`mini-group-${ni}`}>
                {/* Líneas satélite → mini-nodo */}
                {miniPositions.map((mp, mi) => (
                  <line
                    key={`mini-edge-${ni}-${mi}`}
                    x1={node.x} y1={node.y}
                    x2={mp.x}   y2={mp.y}
                    stroke={C_GOLD}
                    strokeWidth={0.5}
                    strokeOpacity={0.12}
                    strokeDasharray="3 3"
                  />
                ))}
                {/* Mini-nodos */}
                {miniPositions.map((mp, mi) => (
                  <g key={`mini-node-${ni}-${mi}`}>
                    {/* Glow sutil */}
                    <motion.circle
                      cx={mp.x} cy={mp.y} r={8}
                      fill={C_GOLD}
                      opacity={0.04}
                      filter={`url(#glowM-${uid})`}
                      animate={{ opacity: [0.02, 0.07, 0.02] }}
                      transition={{ duration: 3.5, repeat: Infinity, delay: ni * 0.3 + mi * 0.15, ease: 'easeInOut' }}
                    />
                    {/* Cuerpo */}
                    <motion.circle
                      cx={mp.x} cy={mp.y} r={6}
                      fill={`url(#mGrad-${uid})`}
                      stroke={C_GOLD}
                      strokeWidth={0.5}
                      strokeOpacity={0.25}
                      animate={{ strokeOpacity: [0.12, 0.3, 0.12] }}
                      transition={{ duration: 3, repeat: Infinity, delay: ni * 0.4 + mi * 0.2, ease: 'easeInOut' }}
                    />
                    {/* Punto central */}
                    <motion.circle
                      cx={mp.x} cy={mp.y} r={1.8}
                      fill={C_GOLD}
                      animate={{ opacity: [0.3, 0.65, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: ni * 0.35 + mi * 0.18 }}
                    />
                    {/* Label mini-nodo */}
                    <text
                      x={mp.x + miniDx(mp.x)}
                      y={mp.y + miniDy(mp.y)}
                      textAnchor={miniAnchor(mp.x)}
                      dominantBaseline="middle"
                      fontSize={7.5}
                      fontFamily="'JetBrains Mono', monospace"
                      letterSpacing="0.05em"
                      fill={C_GOLD}
                      opacity={0.45}
                    >
                      {node.miniNodes[mi]}
                    </text>
                  </g>
                ))}
              </g>
            )
          })}
        </g>

        {/* Nodos satélite principales */}
        {NODES.map((node, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={node.x} cy={node.y} r={18}
              fill={C_GOLD}
              opacity={0.07}
              filter={`url(#glowS-${uid})`}
              animate={{ opacity: [0.05, 0.14, 0.05] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={node.x} cy={node.y} r={15}
              fill="none"
              stroke={C_GOLD}
              strokeWidth={1}
              strokeOpacity={0.35}
              animate={{ strokeOpacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            />
            <circle
              cx={node.x} cy={node.y} r={12}
              fill={`url(#sGrad-${uid})`}
              stroke={C_GOLD}
              strokeWidth={0.8}
              strokeOpacity={0.5}
            />
            <motion.circle
              cx={node.x} cy={node.y} r={3.5}
              fill={C_GOLD}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
            />
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

        {/* Nodo central */}
        <g>
          <motion.circle
            cx={CX} cy={CY} r={46}
            fill="none"
            stroke={C_MAGENTA}
            strokeWidth={0.8}
            strokeOpacity={0.15}
            animate={{ r: [42, 50, 42], strokeOpacity: [0.08, 0.22, 0.08] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={CX} cy={CY} r={34}
            fill={C_ELECTRIC}
            opacity={0.06}
            filter={`url(#glowC-${uid})`}
            animate={{ opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={CX} cy={CY} r={30}
            fill="none"
            stroke={C_ELECTRIC}
            strokeWidth={1.2}
            strokeOpacity={0.5}
            animate={{ strokeOpacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle
            cx={CX} cy={CY} r={26}
            fill={`url(#cGrad-${uid})`}
            stroke={C_ELECTRIC}
            strokeWidth={1}
            strokeOpacity={0.6}
          />
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

        {/* Partículas de ambiente */}
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
