'use client'
export default function AgentNetworkSVG() {
  const nodes = [
    { x:50, y:50, r:22, label:'IA', primary:true },
    { x:18, y:20, r:14, label:'CRM', primary:false },
    { x:82, y:22, r:14, label:'ERP', primary:false },
    { x:15, y:72, r:13, label:'MKT', primary:false },
    { x:85, y:70, r:13, label:'OPS', primary:false },
    { x:50, y:88, r:12, label:'HR', primary:false },
    { x:30, y:48, r:10, label:'', primary:false },
    { x:70, y:46, r:10, label:'', primary:false },
  ]
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,6],[2,7],[6,3],[7,4],[3,5],[4,5]]
  return (
    <div style={{ width:'100%', maxWidth:'480px', margin:'0 auto', aspectRatio:'1', animation:'float 5s ease-in-out infinite' }}>
      <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%', overflow:'visible' }}>
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#6C5CE7" stopOpacity="0.08"/><stop offset="100%" stopColor="#050508" stopOpacity="0"/></radialGradient>
          <radialGradient id="ng1" cx="30%" cy="30%" r="70%"><stop offset="0%" stopColor="#A855F7"/><stop offset="100%" stopColor="#6C5CE7"/></radialGradient>
          <radialGradient id="ng2" cx="30%" cy="30%" r="70%"><stop offset="0%" stopColor="#00D4FF" stopOpacity="0.9"/><stop offset="100%" stopColor="#6C5CE7" stopOpacity="0.7"/></radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glowS"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#bg)"/>
        {edges.map(([a,b],i) => {
          const na=nodes[a], nb=nodes[b], delay=(i*0.3)%3
          return (
            <g key={i}>
              <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(108,92,231,0.15)" strokeWidth="0.4"/>
              <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="url(#ng2)" strokeWidth="0.6" strokeLinecap="round" style={{ strokeDasharray:'3 20', animation:`dash-flow 3s linear ${delay}s infinite`, opacity:0.6 }}/>
            </g>
          )
        })}
        {nodes.map((n,i) => (
          <g key={i} filter={n.primary?'url(#glowS)':'url(#glow)'} style={{ animation:`node-pulse 4s ease-in-out ${i*0.5}s infinite` }}>
            <circle cx={n.x} cy={n.y} r={n.r+3} fill={n.primary?'rgba(108,92,231,0.15)':'rgba(108,92,231,0.07)'}/>
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.primary?'url(#ng1)':'url(#ng2)'} opacity={n.primary?1:0.75}/>
            <circle cx={n.x} cy={n.y} r={n.r} fill="none" stroke={n.primary?'#A855F7':'#00D4FF'} strokeWidth="0.5" opacity="0.6"/>
            {n.label && <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={n.primary?'5':'3.5'} fontWeight="600" fontFamily="Space Grotesk, sans-serif" opacity="0.95">{n.label}</text>}
          </g>
        ))}
      </svg>
    </div>
  )
}
