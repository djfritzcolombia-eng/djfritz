import { createContext, useContext } from 'react'
import type { SiteContent } from '../data/site'

type ContentCtx = {
  content: SiteContent
  setContent: (next: SiteContent) => void
  resetContent: () => void
}

export const ContentContext = createContext<ContentCtx | null>(null)

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
