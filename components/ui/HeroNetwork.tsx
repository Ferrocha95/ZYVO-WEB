'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Red de nodos 3D interactiva: nodos que flotan y se conectan por cercanía,
// con parallax al cursor. Cian→azul, fondo transparente. Respeta prefers-reduced-motion.
export default function HeroNetwork() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = el.clientWidth || 480
    let h = el.clientHeight || 480

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)
    el.appendChild(renderer.domElement)

    // Textura de punto con glow (gradiente radial)
    const makeDot = () => {
      const s = 64
      const c = document.createElement('canvas')
      c.width = c.height = s
      const ctx = c.getContext('2d')!
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(0.25, 'rgba(0,229,255,0.9)')
      g.addColorStop(1, 'rgba(0,229,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, s, s)
      return new THREE.CanvasTexture(c)
    }
    const dotTex = makeDot()

    const N = 68
    const RX = 7, RY = 4.2, RZ = 3.5
    const positions = new Float32Array(N * 3)
    const vel = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * RX
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * RY
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * RZ
      vel[i * 3] = (Math.random() * 2 - 1) * 0.004
      vel[i * 3 + 1] = (Math.random() * 2 - 1) * 0.004
      vel[i * 3 + 2] = (Math.random() * 2 - 1) * 0.004
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({
      map: dotTex,
      size: 0.64,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(pGeo, pMat)

    const linePos = new Float32Array(N * N * 6)
    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
    const lMat = new THREE.LineBasicMaterial({
      color: 0x2f6bff,
      transparent: true,
      opacity: 0.26,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(lGeo, lMat)

    const group = new THREE.Group()
    group.add(lines)
    group.add(points)
    scene.add(group)

    const DIST = 3.4
    const updateLines = () => {
      const pos = pGeo.attributes.position.array as Float32Array
      let idx = 0
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pos[i * 3] - pos[j * 3]
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
          if (dx * dx + dy * dy + dz * dz < DIST * DIST) {
            linePos[idx++] = pos[i * 3]; linePos[idx++] = pos[i * 3 + 1]; linePos[idx++] = pos[i * 3 + 2]
            linePos[idx++] = pos[j * 3]; linePos[idx++] = pos[j * 3 + 1]; linePos[idx++] = pos[j * 3 + 2]
          }
        }
      }
      lGeo.setDrawRange(0, idx / 3)
      lGeo.attributes.position.needsUpdate = true
    }
    updateLines()

    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width) * 2 - 1
      my = ((e.clientY - r.top) / r.height) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)

    let frame = 0
    let last = 0
    const animate = (t: number) => {
      frame = requestAnimationFrame(animate)
      if (t - last < 33) return // ~30fps
      last = t

      if (!reduced) {
        const pos = pGeo.attributes.position.array as Float32Array
        for (let i = 0; i < N; i++) {
          pos[i * 3] += vel[i * 3]
          pos[i * 3 + 1] += vel[i * 3 + 1]
          pos[i * 3 + 2] += vel[i * 3 + 2]
          if (Math.abs(pos[i * 3]) > RX) vel[i * 3] *= -1
          if (Math.abs(pos[i * 3 + 1]) > RY) vel[i * 3 + 1] *= -1
          if (Math.abs(pos[i * 3 + 2]) > RZ) vel[i * 3 + 2] *= -1
        }
        pGeo.attributes.position.needsUpdate = true
        updateLines()

        ry += (mx * 0.35 - ry) * 0.05
        rx += (my * 0.22 - rx) * 0.05
        group.rotation.y = ry + t * 0.00004
        group.rotation.x = rx
      }
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(animate)

    const onResize = () => {
      w = el.clientWidth || w
      h = el.clientHeight || h
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(frame)
      else frame = requestAnimationFrame(animate)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      pGeo.dispose(); pMat.dispose(); lGeo.dispose(); lMat.dispose()
      dotTex.dispose(); renderer.dispose()
    }
  }, [])

  return <div ref={ref} className="w-full aspect-square max-w-lg mx-auto" aria-hidden="true" />
}
