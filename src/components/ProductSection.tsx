import { Link } from 'react-router-dom'
import type { Product } from '../data/site'
import { ProductCard } from './ProductCard'

type Props = {
  id: string
  title: string
  to: string
  products: Product[]
  /** En home: muestra preview y enlaza a la página completa */
  preview?: boolean
  initialCount?: number
}

export function ProductSection({
  id,
  title,
  to,
  products,
  preview = false,
  initialCount = 8,
}: Props) {
  const visible = preview ? products.slice(0, initialCount) : products
  const remaining = products.length - visible.length

  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">
            {title}{' '}
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75em', fontWeight: 600 }}>
              ({products.length})
            </span>
          </h2>
          <Link className="section__link" to={to}>
            Ver todos ({products.length})
          </Link>
        </div>
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {preview && remaining > 0 && (
          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <Link
              to={to}
              style={{
                display: 'inline-block',
                border: '1px solid var(--primary)',
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: 800,
                padding: '0.7rem 1.25rem',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              Ir a la página · {remaining} productos más
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
