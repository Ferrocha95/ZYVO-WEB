import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import { BLOG_POSTS } from '@/data/blog-posts'
import BlogClient from '@/components/blog/BlogClient'
import BlogHeroOrbs from '@/components/blog/BlogHeroOrbs'

export const metadata: Metadata = {
  title: 'Blog — Ideas y sistemas para operar mejor | ZYVO',
  description:
    'Contenido pensado para empresas que necesitan menos fricción, más control y una operación más inteligente.',
}

export default function BlogPage() {
  return (
    <main className="relative min-h-screen">

      {/* Floating orbs */}
      <BlogHeroOrbs />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <div className="mb-14 space-y-5 max-w-3xl">
          <span className="inline-block text-xs font-medium tracking-widest text-zyvo-gold/70 uppercase px-4 py-1.5 rounded-full border border-zyvo-gold/20 bg-zyvo-gold/5">
            Insights
          </span>
          <h1 className="font-(family-name:--font-instrument-serif) text-4xl md:text-6xl font-normal text-zyvo-white leading-tight">
            Ideas y sistemas para<br className="hidden sm:block" /> operar mejor
          </h1>
          <p className="text-zyvo-white/50 text-base md:text-lg leading-relaxed max-w-2xl">
            Contenido pensado para empresas que necesitan menos fricción, más control y una operación más inteligente.
          </p>
        </div>

        {/* Client: search + filters + grid */}
        <BlogClient posts={BLOG_POSTS} />
      </div>
    </main>
  )
}
