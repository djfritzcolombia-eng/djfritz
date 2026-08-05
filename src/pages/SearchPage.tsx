import { useEffect, useMemo } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { CatalogView } from '../components/CatalogView'
import { searchProducts } from '../data/site'

export function SearchPage() {
  const [params] = useSearchParams()
  const { hash } = useLocation()
  const query = params.get('q')?.trim() ?? ''
  const results = useMemo(() => (query ? searchProducts(query) : []), [query])

  useEffect(() => {
    if (!hash) return
    const id = hash.replace(/^#/, '')
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
    return () => window.clearTimeout(t)
  }, [hash, results])

  if (!query) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="section__title">Búsqueda</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Escribe en la barra superior para buscar productos.{' '}
            <Link to="/">Volver al inicio</Link>
          </p>
        </div>
      </section>
    )
  }

  return (
    <CatalogView
      title={results.length ? `Resultados para “${query}”` : `Sin resultados para “${query}”`}
      subtitle="Usa la barra de búsqueda para probar otro término."
      products={results}
      crumbs={[
        { label: 'Inicio', to: '/' },
        { label: 'Búsqueda' },
      ]}
    />
  )
}
