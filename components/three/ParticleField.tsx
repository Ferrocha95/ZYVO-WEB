'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 120
const CONNECTION_DISTANCE = 0.8

function Particles() {
  const pointsRef  = useRef<THREE.Points>(null)
  const linesRef   = useRef<THREE.LineSegments>(null)
  const timeRef    = useRef(0)

  // Posiciones iniciales aleatorias en esfera
  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 1.8 + Math.random() * 1.2
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  // Velocidades de movimiento
  const velocities = useMemo(() => {
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      vel[i] = (Math.random() - 0.5) * 0.003
    }
    return vel
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current || !linesRef.current) return
    timeRef.current += delta

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr     = posAttr.array as Float32Array

    // Mover partículas
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3]     += velocities[i * 3]
      arr[i * 3 + 1] += velocities[i * 3 + 1]
      arr[i * 3 + 2] += velocities[i * 3 + 2]

      // Contener en esfera
      const x = arr[i * 3], y = arr[i * 3 + 1], z = arr[i * 3 + 2]
      const dist = Math.sqrt(x*x + y*y + z*z)
      if (dist > 3.2) {
        arr[i * 3]     *= 0.98
        arr[i * 3 + 1] *= 0.98
        arr[i * 3 + 2] *= 0.98
        velocities[i * 3]     *= -1
        velocities[i * 3 + 1] *= -1
        velocities[i * 3 + 2] *= -1
      }
    }
    posAttr.needsUpdate = true

    // Calcular conexiones entre partículas cercanas
    const linePositions: number[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = arr[i*3]   - arr[j*3]
        const dy = arr[i*3+1] - arr[j*3+1]
        const dz = arr[i*3+2] - arr[j*3+2]
        const d  = Math.sqrt(dx*dx + dy*dy + dz*dz)
        if (d < CONNECTION_DISTANCE) {
          linePositions.push(
            arr[i*3], arr[i*3+1], arr[i*3+2],
            arr[j*3], arr[j*3+1], arr[j*3+2],
          )
        }
      }
    }

    const lineGeo = linesRef.current.geometry
    const linePosAttr = lineGeo.attributes.position as THREE.BufferAttribute
    const lineArr = linePosAttr.array as Float32Array
    const len     = Math.min(linePositions.length, lineArr.length)
    for (let k = 0; k < len; k++) lineArr[k] = linePositions[k]
    lineGeo.setDrawRange(0, len / 3)
    linePosAttr.needsUpdate = true

    // Rotación suave del grupo
    if (pointsRef.current.parent) {
      pointsRef.current.parent.rotation.y = timeRef.current * 0.05
    }
  })

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const buf = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
    geo.setAttribute('position', new THREE.BufferAttribute(buf, 3))
    geo.setDrawRange(0, 0)
    return geo
  }, [])

  return (
    <group>
      {/* Partículas */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#4A7FD4"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Conexiones */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#0A2463"
          transparent
          opacity={0.35}
        />
      </lineSegments>
    </group>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <Particles />
    </Canvas>
  )
}
