'use client'

import { useEffect, useRef } from 'react'

type NT = 'gold' | 'blue' | 'white'

interface Node {
  x: number; y: number; vx: number; vy: number
  r: number; type: NT; pulse: number; pulseSpeed: number
}

interface Pkt { from: number; to: number; t: number; gold: boolean }

const GOLD  = '212,175,55'
const BLUE  = '74,144,226'
const WHITE = '210,225,255'

export default function GlobalBackground() {
  const cvRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!

    const N  = 100   // nodos
    const CD = 200   // distancia de conexión

    let W = 0, H = 0, raf = 0, frame = 0
    const nodes: Node[] = []
    const pkts:  Pkt[]  = []
    let conns: { i: number; j: number }[] = []

    function resize() {
      W = cv.width  = window.innerWidth
      H = cv.height = window.innerHeight
    }

    function init() {
      nodes.length = 0
      for (let i = 0; i < N; i++) {
        const roll = Math.random()
        const t: NT = roll < 0.20 ? 'gold' : roll < 0.48 ? 'blue' : 'white'
        const sp    = 0.18 + Math.random() * 0.28
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * sp, vy: (Math.random() - 0.5) * sp,
          r:  t === 'gold' ? 4 + Math.random() * 2
            : t === 'blue' ? 3 + Math.random() * 2
            :                2 + Math.random() * 2,
          type: t, pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.018 + Math.random() * 0.022,
        })
      }
      for (let p = 0; p < 8; p++) {
        const f = ~~(Math.random() * N)
        let t   = ~~(Math.random() * N)
        while (t === f) t = ~~(Math.random() * N)
        pkts.push({ from: f, to: t, t: Math.random(),
          gold: nodes[f].type === 'gold' || nodes[t].type === 'gold' })
      }
    }

    function radGrad(x: number, y: number, r: number, col: string, a: number) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0,    `rgba(${col},${a})`)
      g.addColorStop(0.35, `rgba(${col},${(a * 0.5).toFixed(2)})`)
      g.addColorStop(1,    `rgba(${col},0)`)
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
    }

    function draw() {
      /* clear each frame completely */
      ctx.clearRect(0, 0, W, H)

      /* dark base */
      ctx.fillStyle = '#080C14'
      ctx.fillRect(0, 0, W, H)

      /* ambient glow zones */
      radGrad(W * 0.75, H * 0.20, W * 0.50, BLUE,  0.18)
      radGrad(W * 0.20, H * 0.80, W * 0.45, GOLD,  0.10)
      radGrad(W * 0.50, H * 0.50, W * 0.60, BLUE,  0.06)

      frame++
      const mx = mouse.current.x, my = mouse.current.y

      /* move */
      for (const n of nodes) {
        const dx = n.x - mx, dy = n.y - my, dm = Math.hypot(dx, dy)
        if (dm < 130 && dm > 0) {
          n.vx += dx / dm * 0.018; n.vy += dy / dm * 0.018
          const sp = Math.hypot(n.vx, n.vy)
          if (sp > 0.8) { n.vx = n.vx / sp * 0.8; n.vy = n.vy / sp * 0.8 }
        }
        n.x += n.vx; n.y += n.vy; n.pulse += n.pulseSpeed
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      }

      /* connections */
      conns = []
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.hypot(dx, dy)
          if (d < CD) {
            const t    = 1 - d / CD
            const gold = nodes[i].type === 'gold' || nodes[j].type === 'gold'
            const blue = !gold && (nodes[i].type === 'blue' || nodes[j].type === 'blue')
            ctx.lineWidth = gold ? 1.4 : blue ? 0.9 : 0.7
            ctx.strokeStyle = gold
              ? `rgba(${GOLD},${(t * 0.70).toFixed(2)})`
              : blue
              ? `rgba(${BLUE},${(t * 0.50).toFixed(2)})`
              : `rgba(${WHITE},${(t * 0.28).toFixed(2)})`
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
            if (d < 130) conns.push({ i, j })
          }
        }
      }

      /* packets */
      for (const p of pkts) {
        p.t += 0.013
        if (p.t >= 1) {
          if (conns.length) {
            const c = conns[~~(Math.random() * conns.length)]
            p.from = c.i; p.to = c.j
            p.gold = nodes[p.from].type === 'gold' || nodes[p.to].type === 'gold'
          }
          p.t = 0; continue
        }
        const px = nodes[p.from].x + (nodes[p.to].x - nodes[p.from].x) * p.t
        const py = nodes[p.from].y + (nodes[p.to].y - nodes[p.from].y) * p.t
        const col = p.gold ? GOLD : BLUE
        radGrad(px, py, p.gold ? 12 : 9, col, 0.85)
        ctx.beginPath(); ctx.arc(px, py, p.gold ? 3 : 2.5, 0, Math.PI * 2)
        ctx.fillStyle = p.gold ? `rgb(${GOLD})` : `rgb(${BLUE})`; ctx.fill()
      }

      /* ripple */
      if (frame % 220 === 110) {
        const gs = nodes.filter(n => n.type === 'gold')
        if (gs.length) {
          const src = gs[~~(Math.random() * gs.length)]
          let f = 0
          const ripple = () => {
            if (f > 80) return
            radGrad(src.x, src.y, (f / 80) * 120, GOLD, 0.5 * (1 - f / 80))
            f++; requestAnimationFrame(ripple)
          }
          ripple()
        }
      }

      /* draw nodes */
      for (const n of nodes) {
        const g = 0.55 + 0.45 * Math.sin(n.pulse)

        if (n.type === 'gold') {
          /* outer halo — 100px */
          radGrad(n.x, n.y, 100, GOLD, 0.55 * g)
          /* mid glow — 40px */
          radGrad(n.x, n.y, 40,  GOLD, 0.85 * g)
          /* core — big */
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgb(${GOLD})`; ctx.fill()
          /* hot spot */
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 0.7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,245,170,${g})`; ctx.fill()

        } else if (n.type === 'blue') {
          radGrad(n.x, n.y, 65, BLUE, 0.45 * g)
          radGrad(n.x, n.y, 24, BLUE, 0.80 * g)
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${BLUE},1)`; ctx.fill()

        } else {
          radGrad(n.x, n.y, 28, WHITE, 0.35 * g)
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 1.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${WHITE},0.80)`; ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize',    () => resize())
    window.addEventListener('mousemove', (e) => { mouse.current = { x: e.clientX, y: e.clientY } })

    resize(); init(); draw()
    return () => { cancelAnimationFrame(raf) }
  }, [])

  return (
    <canvas
      ref={cvRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}
