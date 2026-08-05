import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Al cambiar de página, vuelve arriba (evita heredar scroll de la vista anterior). */
export function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return null
}
