'use client'
import { useEffect } from 'react'
export default function SmoothScroll() {
  useEffect(() => {
    let lenis: any
    const init = async () => {
      const M = await import('@studio-freight/lenis')
      lenis = new M.default({ duration:1.2, easing:(t:number)=>Math.min(1,1.001-Math.pow(2,-10*t)) })
      const raf = (time:number) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }
    init()
    return () => { if(lenis) lenis.destroy() }
  }, [])
  return null
}
