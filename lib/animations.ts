const e = [0.22,1,0.36,1] as const
export const fadeUp = { hidden:{opacity:0,y:32}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:e}} }
export const fadeIn = { hidden:{opacity:0}, visible:{opacity:1,transition:{duration:0.5}} }
export const stagger = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }
export const staggerFast = { hidden:{}, visible:{transition:{staggerChildren:0.06}} }
export const scaleIn = { hidden:{opacity:0,scale:0.92}, visible:{opacity:1,scale:1,transition:{duration:0.5,ease:e}} }
export const slideInRight = { hidden:{opacity:0,x:40}, visible:{opacity:1,x:0,transition:{duration:0.6,ease:e}} }
export const viewportOnce = { once:true, amount:0.15 }
