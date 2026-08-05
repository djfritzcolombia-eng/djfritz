import { useCallback, useEffect, useState, type ReactNode } from 'react'
import {
  CONTENT_KEY,
  seedContent,
  type SiteContent,
} from '../data/site'
import { ContentContext } from './content-context'

function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(CONTENT_KEY)
    if (!raw) return structuredClone(seedContent)
    return { ...structuredClone(seedContent), ...JSON.parse(raw) }
  } catch {
    return structuredClone(seedContent)
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() =>
    typeof window === 'undefined' ? structuredClone(seedContent) : loadContent(),
  )

  useEffect(() => {
    setContentState(loadContent())
  }, [])

  const setContent = useCallback((next: SiteContent) => {
    setContentState(next)
    localStorage.setItem(CONTENT_KEY, JSON.stringify(next))
  }, [])

  const resetContent = useCallback(() => {
    const fresh = structuredClone(seedContent)
    setContentState(fresh)
    localStorage.removeItem(CONTENT_KEY)
  }, [])

  return (
    <ContentContext.Provider value={{ content, setContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  )
}
