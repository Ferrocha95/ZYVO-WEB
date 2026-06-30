'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number; y: number
  vx: number; vy: number
  r: number; gold: boolean
}

const NODE_COUNT      = 70
const CONNECT_DIST    = 130
const GOLD_CHANCE     = 0.12

export default function NodeBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const nodes: Node[] = []
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.8,
        gold: Math.random() < GOLD_CHANCE,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Update positions
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > CONNECT_DIST) continue

          const opacity = (1 - dist / CONNECT_DIST) * 0.18
          const isGold  = a.gold || b.gold

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = isGold
            ? `rgba(212,175,55,${opacity * 1.4})`
            : `rgba(74,127,212,${opacity})`
          ctx.lineWidth = isGold ? 0.7 : 0.5
          ctx.stroke()
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.gold ? 'rgba(212,175,55,0.75)' : 'rgba(74,127,212,0.55)'
        ctx.fill()

        // Halo sutil en nodos gold
        if (n.gold) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2)
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5)
          grad.addColorStop(0, 'rgba(212,175,55,0.12)')
          grad.addColorStop(1, 'rgba(212,175,55,0)')
          ctx.fillStyle = grad
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  )
}
