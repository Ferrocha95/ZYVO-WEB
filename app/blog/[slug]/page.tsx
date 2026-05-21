import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { BLOG_POSTS } from '@/data/blog-posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | ZYVO`,
    description: post.summary,
  }
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="font-(family-name:--font-instrument-serif) text-xl text-zyvo-white mt-8 mb-3 font-normal"
        >
          {trimmed.slice(4)}
        </h3>
      )
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="font-(family-name:--font-instrument-serif) text-2xl text-zyvo-white mt-10 mb-4 font-normal"
        >
          {trimmed.slice(3)}
        </h2>
      )
    } else {
      elements.push(
        <p key={key++} className="text-zyvo-white/65 leading-relaxed">
          {trimmed}
        </p>
      )
    }
  }

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-zyvo-white/35 hover:text-zyvo-white/70 transition-colors mb-10"
        >
          <ArrowLeft size={13} />
          Volver al blog
        </Link>

        {/* Category badge */}
        <span className="inline-block text-xs px-2.5 py-1 rounded-full border border-zyvo-gold/20 bg-zyvo-gold/5 text-zyvo-gold/70 mb-5">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="font-(family-name:--font-instrument-serif) text-3xl md:text-5xl font-normal text-zyvo-white leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-zyvo-white/30 mb-8">
          <span>
            {new Date(post.date).toLocaleDateString('es-MX', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="w-px h-3 bg-white/15" />
          <span className="flex items-center gap-1.5">
            <Clock size={11} />
            {post.readTime} de lectura
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-zyvo-gold/20 to-transparent mb-10" />

        {/* Article content */}
        <div className="space-y-5">
          {renderContent(post.content)}
        </div>

        {/* CTA card */}
        <div
          className="mt-16 glass rounded-2xl p-8 text-center"
          style={{ borderColor: 'rgba(0,170,255,0.15)' }}
        >
          <p className="text-xs text-zyvo-white/30 uppercase tracking-widest mb-3">Siguiente paso</p>
          <h3 className="font-(family-name:--font-instrument-serif) text-xl md:text-2xl text-zyvo-white font-normal mb-2">
            ¿Quieres aplicar esto en tu empresa?
          </h3>
          <p className="text-zyvo-white/45 text-sm mb-6">
            En una auditoría de 1 a 3 días identificamos exactamente dónde está tu fuga operativa y cuánto cuesta.
          </p>
          <Link
            href="/auditoria"
            className="inline-flex items-center gap-2 px-7 py-3 btn-glow text-sm"
          >
            Solicitar Auditoría de Fricción
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Footer back link */}
        <div className="mt-12 pt-8 border-t border-white/6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-zyvo-white/35 hover:text-zyvo-white/70 transition-colors"
          >
            <ArrowLeft size={13} />
            Volver al blog
          </Link>
        </div>
      </div>
    </main>
  )
}
