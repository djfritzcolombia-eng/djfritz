import type { Product } from '../data/site'
import { ProductCard } from './ProductCard'
import './SearchResults.css'

type Props = {
  query: string
  results: Product[]
  onClear: () => void
  mode?: 'search' | 'brand' | 'category'
}

export function SearchResults({ query, results, onClear, mode = 'search' }: Props) {
  if (!query.trim()) return null

  const title =
    mode === 'brand'
      ? results.length > 0
        ? `${results.length} producto${results.length === 1 ? '' : 's'} de ${query.trim()}`
        : `Sin productos de ${query.trim()}`
      : mode === 'category'
        ? results.length > 0
          ? `${results.length} producto${results.length === 1 ? '' : 's'} en ${query.trim()}`
          : `Sin productos en ${query.trim()}`
        : results.length > 0
          ? `Encontramos ${results.length} resultado${results.length === 1 ? '' : 's'} para “${query.trim()}”`
          : `Sin resultados para “${query.trim()}”`

  const clearLabel =
    mode === 'brand'
      ? 'Quitar filtro de marca'
      : mode === 'category'
        ? 'Quitar filtro de categoría'
        : 'Limpiar búsqueda'

  return (
    <section className="section search-page" id="busqueda">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">{title}</h2>
          <button type="button" className="section__link search-page__clear" onClick={onClear}>
            {clearLabel}
          </button>
        </div>
        {results.length > 0 ? (
          <div className="product-grid">
            {results.map((product) => (
              <ProductCard key={`search-${product.id}`} product={product} />
            ))}
          </div>
        ) : (
          <p className="search-page__hint">
            Prueba otra marca o busca por producto en la barra superior.
          </p>
        )}
      </div>
    </section>
  )
}
