import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/data/blog-posts'

const BASE = 'https://zyvo.com.mx'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const rutas: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,           lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/auditoria`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/partners`,   lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacidad`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...rutas, ...posts]
}
