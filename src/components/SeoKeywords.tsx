import { useEffect } from 'react'
import { useContent } from '../content/content-context'

/** Sincroniza keywords SEO desde hashtags de beats */
export function SeoKeywords() {
  const { content } = useContent()

  useEffect(() => {
    const tags = content.beats.flatMap((b) => b.tags ?? [])
    const unique = [...new Set(tags)].filter(Boolean)
    const keywords = ['Fritz', 'DJ Fritz', 'DJ Colombia', ...unique.map((t) => `#${t}`), ...unique].join(', ')

    let meta = document.querySelector('meta[name="keywords"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'keywords')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', keywords)
  }, [content.beats])

  return null
}
