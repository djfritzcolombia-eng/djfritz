import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/site'

type FavoritesContextValue = {
  items: Product[]
  count: number
  isOpen: boolean
  openFavorites: () => void
  closeFavorites: () => void
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: string) => boolean
  removeFavorite: (productId: string) => void
  clear: () => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openFavorites = useCallback(() => setIsOpen(true), [])
  const closeFavorites = useCallback(() => setIsOpen(false), [])

  const toggleFavorite = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) return prev.filter((p) => p.id !== product.id)
      return [...prev, product]
    })
  }, [])

  const removeFavorite = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const isFavorite = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isOpen,
      openFavorites,
      closeFavorites,
      toggleFavorite,
      isFavorite,
      removeFavorite,
      clear,
    }),
    [
      items,
      isOpen,
      openFavorites,
      closeFavorites,
      toggleFavorite,
      isFavorite,
      removeFavorite,
      clear,
    ],
  )

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
