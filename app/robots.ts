import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/orden'],
      disallow: ['/activacion/', '/administracion/', '/display/', '/r/'],
    },
    sitemap: 'https://altariaa.com',
  }
}