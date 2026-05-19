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
          className="w-1.5 h-1.5 rounded-full bg-zyvo-gold/60 block"
        />
      ))}
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
      className="fixed bottom-24 right-4 md:right-6 z-99990 w-[calc(100vw-2rem)] max-w-sm flex flex-col"
      style={{
        background: 'linear-gradient(135deg, rgba(39,39,42,0.88) 0%, rgba(24,24,27,0.96) 100%)',
        border: '1px solid rgba(161,161,170,0.35)',
        borderRadius: '20px',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(212,175,55,0.06)',
        maxHeight: 'min(75vh, 560px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zyvo-gold/15 border border-zyvo-gold/30 flex items-center justify-center">
            <Bot size={15} className="text-zyvo-gold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-zyvo-white text-sm font-semibold leading-none">Rome · Asesor ZYVO</p>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zyvo-gold/10 text-zyvo-gold/70 border border-zyvo-gold/20 leading-none">
                GPT-4o
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
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
                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-zyvo-gold/15 text-zyvo-white border border-zyvo-gold/20 rounded-br-sm'
                    : 'bg-zinc-700/40 text-zyvo-white/85 border border-zinc-600/30 rounded-bl-sm'
                }`}
              >
                {msg.content}
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
                className="px-3 py-1.5 text-xs text-zyvo-white/55 border border-zinc-600/40 rounded-full hover:border-zyvo-gold/30 hover:text-zyvo-gold transition-colors duration-200 whitespace-nowrap"
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
                background: input.trim() && !loading ? 'rgba(212,175,55,0.9)' : 'transparent',
                color: input.trim() && !loading ? '#080C14' : 'rgba(255,255,255,0.3)',
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
