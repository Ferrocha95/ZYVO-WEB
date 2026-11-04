import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://zyvo.com.mx/sitemap.xml',
    host: 'https://zyvo.com.mx',
  }
}
