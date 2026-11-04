'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  id: string
}

const QUICK_CHIPS = [
  '¿Qué hace ZYVO?',
  '¿Qué servicios ofrecen?',
  '¿Mi empresa califica?',
  'Quiero dejar mis datos',
  'Hablar por WhatsApp',
]

const EASE = [0.25, 0.46, 0.45, 0.94] as const
const MAX_CHARS = 500

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 rounded-full bg-cyan/60 block"
        />
      ))}
    </div>
  )
}

// Renderiza **negritas** sin dangerouslySetInnerHTML
function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-zyvo-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

// Texto con estructura: saltos de línea, viñetas y negritas
function RichText({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (line.trim() === '') return <div key={i} className="h-1.5" />
        const t = line.trimStart()
        const bullet = /^[-•*]\s+/.test(t)
        return (
          <div key={i} className={bullet ? 'flex gap-2' : ''}>
            {bullet && <span className="mt-[7px] w-1 h-1 rounded-full bg-cyan shrink-0" />}
            <span>{renderInline(bullet ? t.replace(/^[-•*]\s+/, '') : line)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function RomeChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      id: 'welcome',
      content: 'Hola, soy Rome — el asesor de ZYVO. Cuéntame, ¿cómo se llama tu empresa y en qué sector opera?',
    },
  ])
  const [input, setInput]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [chipsShown, setChipsShown] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function send(text: string) {
    if (!text.trim() || loading) return
    setChipsShown(false)

    const userMsg: Message = { role: 'user', content: text.trim(), id: crypto.randomUUID() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
      const res  = await fetch('/api/rome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      const reply: Message = {
        role: 'assistant',
        id: crypto.randomUUID(),
        content: data.text || 'Hubo un problema. Intenta de nuevo.',
      }
      setMessages(prev => [...prev, reply])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', id: crypto.randomUUID(), content: 'Sin conexión. Por favor intenta más tarde.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  const remaining = MAX_CHARS - input.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.93 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed bottom-24 right-4 md:right-6 z-99990 w-[calc(100vw-2rem)] max-w-md flex flex-col"
      style={{
        background: 'linear-gradient(150deg, rgba(23,24,28,0.82) 0%, rgba(10,10,11,0.92) 100%)',
        border: '1px solid rgba(0,229,255,0.16)',
        borderRadius: '26px',
        backdropFilter: 'blur(30px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(30px) saturate(1.3)',
        boxShadow:
          '0 40px 100px -24px rgba(0,0,0,0.82), 0 0 70px -24px rgba(0,229,255,0.28), inset 0 1px 0 rgba(255,255,255,0.05)',
        maxHeight: 'min(84vh, 680px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan/15 border border-cyan/30 flex items-center justify-center">
            <Bot size={15} className="text-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-zyvo-white text-sm font-semibold leading-none">Rome · Asesor ZYVO</p>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan/10 text-cyan/70 border border-cyan/20 leading-none">
                Claude
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-zyvo-white/35 text-xs">En línea</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-zyvo-white/30 hover:text-zyvo-white/70 hover:bg-white/5 transition-colors duration-200"
        >
          <X size={15} />
        </button>
      </div>

      {/* Messages — data-lenis-prevent evita que Lenis capture el wheel sobre este contenedor */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        data-lenis-prevent=""
        style={{ overscrollBehavior: 'contain' }}
      >
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[86%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cyan/15 text-zyvo-white border border-cyan/25 rounded-br-md'
                    : 'bg-white/5 text-zyvo-white/90 border border-white/8 rounded-bl-md'
                }`}
              >
                {msg.role === 'assistant' ? <RichText text={msg.content} /> : msg.content}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-zinc-700/40 border border-zinc-600/30 rounded-2xl rounded-bl-sm">
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick chips */}
      <AnimatePresence>
        {chipsShown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-3 flex flex-wrap gap-2 overflow-hidden shrink-0"
          >
            {QUICK_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => send(chip)}
                className="px-3 py-1.5 text-xs text-zyvo-white/55 border border-zinc-600/40 rounded-full hover:border-cyan/30 hover:text-cyan transition-colors duration-200 whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Textarea input area */}
      <div className="px-4 pb-4 pt-2 border-t border-zinc-700/40 shrink-0">
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(161,161,170,0.20)' }}
        >
          <textarea
            ref={inputRef}
            rows={3}
            value={input}
            onChange={e => setInput(e.target.value.slice(0, MAX_CHARS))}
            onKeyDown={handleKey}
            placeholder="Escribe tu mensaje…"
            disabled={loading}
            className="w-full bg-transparent text-sm text-zyvo-white placeholder:text-zyvo-white/25 outline-none resize-none disabled:opacity-50 leading-relaxed"
          />
          <div className="flex items-center justify-between mt-2">
            <span className={`text-[10px] font-mono ${remaining < 50 ? 'text-red-400/70' : 'text-zyvo-white/20'}`}>
              {remaining}/{MAX_CHARS}
            </span>
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30"
              style={{
                background: input.trim() && !loading
                  ? 'radial-gradient(circle farthest-corner at 10% 20%, rgba(0,229,255,0.95) 17.8%, rgba(47,107,255,0.95) 100.2%)'
                  : 'transparent',
                color: input.trim() && !loading ? '#F5F5F5' : 'rgba(255,255,255,0.3)',
              }}
            >
              <Send size={13} />
            </button>
          </div>
        </div>
        <p className="text-center text-zyvo-white/15 text-[10px] mt-2">
          Shift+Enter para nueva línea · Sistemas activos
        </p>
      </div>
    </motion.div>
  )
}
