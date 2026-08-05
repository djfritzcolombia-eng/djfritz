import { useMemo, useState } from 'react'
import { products } from '../data/site'
import { catalogProducts } from '../data/catalog'
import { ProductCard } from './ProductCard'
import './Featured.css'

export function Featured() {
  const tabs = useMemo(
    () =>
      [
        {
          id: 'nuevos',
          label: 'Más nuevos',
          items: catalogProducts.filter((p) => p.badge === 'nuevo').slice(0, 12),
        },
        {
          id: 'vendidos',
          label: 'Más vendidos',
          items: [...products.dj, ...products.sonido].slice(0, 12),
        },
        {
          id: 'oferta',
          label: 'En oferta',
          items: catalogProducts.filter((p) => p.oldPrice).slice(0, 12),
        },
      ] as const,
    [],
  )

  const [active, setActive] = useState<(typeof tabs)[number]['id']>('nuevos')
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <section className="section featured" id="destacados">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Destacados online</h2>
          <div className="featured__tabs" role="tablist" aria-label="Filtros destacados">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                className={active === tab.id ? 'is-active' : ''}
                onClick={() => setActive(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid">
          {current.items.map((product) => (
            <ProductCard key={`${active}-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
