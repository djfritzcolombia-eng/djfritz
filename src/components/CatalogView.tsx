import { Link } from 'react-router-dom'
import type { Product } from '../data/site'
import { ProductCard } from './ProductCard'
import './CatalogView.css'

type Props = {
  title: string
  subtitle?: string
  products: Product[]
  crumbs?: { label: string; to?: string }[]
  filters?: { label: string; to: string; active?: boolean }[]
}

export function CatalogView({ title, subtitle, products, crumbs, filters }: Props) {
  return (
    <section className="section catalog-view">
      <div className="container">
        {crumbs && crumbs.length > 0 && (
          <nav className="catalog-view__crumbs" aria-label="Miga de pan">
            {crumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`}>
                {i > 0 && <span className="catalog-view__sep">/</span>}
                {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              </span>
            ))}
          </nav>
        )}

        <div className="section__head">
          <h1 className="section__title catalog-view__title">
            {title}{' '}
            <span className="catalog-view__count">({products.length})</span>
          </h1>
          {subtitle && <p className="catalog-view__subtitle">{subtitle}</p>}
        </div>

        {filters && filters.length > 0 && (
          <div className="catalog-view__filters" role="navigation" aria-label="Subcategorías">
            {filters.map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className={`catalog-view__chip ${f.active ? 'is-active' : ''}`}
              >
                {f.label}
              </Link>
            ))}
          </div>
        )}

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="catalog-view__empty">
            No hay productos en esta categoría por ahora.{' '}
            <Link to="/">Volver al inicio</Link>
          </p>
        )}
      </div>
    </section>
  )
}
