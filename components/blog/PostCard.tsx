'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import type { BlogPost } from '@/data/blog-posts'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

interface PostCardProps {
  post: BlogPost
  featured?: boolean
  index?: number
}

export default function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: EASE }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group glass rounded-2xl p-6 flex flex-col gap-4 h-full hover:border-zyvo-gold/30 transition-all duration-200 block"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {/* Top row: category badge + date */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs px-2.5 py-1 rounded-full border border-zyvo-gold/20 bg-zyvo-gold/5 text-zyvo-gold/70 shrink-0">
            {post.category}
          </span>
          <span className="text-xs text-zyvo-white/25 font-mono shrink-0">
            {new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-(family-name:--font-instrument-serif) font-normal text-zyvo-white leading-snug flex-1 ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-zyvo-white/45 text-sm leading-relaxed line-clamp-3">
          {post.summary}
        </p>

        {/* Footer: read time + arrow */}
        <div className="flex items-center justify-between pt-4 border-t border-white/6 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-zyvo-white/30">
            <Clock size={12} />
            <span>{post.readTime} de lectura</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-zyvo-gold/60 group-hover:text-zyvo-gold transition-colors duration-200">
            Leer más
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
