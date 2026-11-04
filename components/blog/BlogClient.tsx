'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import type { BlogPost, BlogCategory } from '@/data/blog-posts'
import { CATEGORIES } from '@/data/blog-posts'
import PostCard from './PostCard'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

interface BlogClientProps {
  posts: BlogPost[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'Todos'>('Todos')
  const [query, setQuery] = useState('')

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory
    const matchQ =
      query === '' ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.summary.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="space-y-10">

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
        className="relative max-w-lg"
      >
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/25 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-white/3 border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-ink/80 placeholder-ink/25 outline-none focus:border-cyan/35 transition-colors duration-200"
        />
      </motion.div>

      {/* Category pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
        className="flex flex-wrap gap-2"
      >
        {(['Todos', ...CATEGORIES] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-cyan/15 border-cyan/40 text-cyan'
                : 'border-white/8 text-ink/40 hover:border-white/20 hover:text-ink/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Article grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((post, i) => (
              <PostCard
                key={post.slug}
                post={post}
                featured={post.featured && i === 0 && activeCategory === 'Todos' && query === ''}
                index={i}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-center py-20"
          >
            <p className="text-ink/30 text-sm">No hay artículos para esta búsqueda.</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('Todos') }}
              className="mt-4 text-xs text-cyan/60 hover:text-cyan transition-colors"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA final */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
        className="mt-20 glass rounded-2xl p-10 text-center"
        style={{ borderColor: 'rgba(0,229,255,0.15)' }}
      >
        <p className="text-xs text-ink/30 uppercase tracking-widest mb-3">¿Listo para actuar?</p>
        <h3 className="font-display text-2xl md:text-3xl text-ink mb-5 font-normal">
          ¿Listo para eliminar la fricción<br className="hidden sm:block" /> de tu operación?
        </h3>
        <Link
          href="/auditoria"
          className="inline-flex items-center gap-2 px-8 py-3.5 btn-primary text-sm"
        >
          Agenda una Auditoría de Fricción Operativa
          <ArrowRight size={15} />
        </Link>
      </motion.div>
    </div>
  )
}
