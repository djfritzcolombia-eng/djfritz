import { useMemo, useState } from 'react'
import { useCart } from '../cart/CartContext'
import { useContent } from '../content/content-context'
import { formatPrice, shopCategoryLabels, type ShopCategory } from '../data/site'

export function ShopPage() {
  const { content } = useContent()
  const { addItem } = useCart()
  const [cat, setCat] = useState<ShopCategory | 'all'>('all')

  const items = useMemo(
    () => (cat === 'all' ? content.shop : content.shop.filter((p) => p.category === cat)),
    [cat, content.shop],
  )

  return (
    <div className="page">
      <p className="page__eyebrow">Merch</p>
      <h1 className="page__title">Shop</h1>
      <p className="page__lead">Camisas oversize, gorras, chaquetas y hoodies.</p>

      <div className="tabs" role="tablist">
        <button type="button" className={cat === 'all' ? 'is-active' : ''} onClick={() => setCat('all')}>
          Todo
        </button>
        {(Object.keys(shopCategoryLabels) as ShopCategory[]).map((key) => (
          <button
            key={key}
            type="button"
            className={cat === key ? 'is-active' : ''}
            onClick={() => setCat(key)}
          >
            {shopCategoryLabels[key]}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {items.map((product) => (
          <article key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-card__body">
              <strong>{product.name}</strong>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                {shopCategoryLabels[product.category]}
              </span>
              <span className="price">{formatPrice(product.price)}</span>
              <button
                type="button"
                className="btn btn--accent"
                disabled={!product.inStock}
                onClick={() =>
                  addItem({
                    id: product.id,
                    kind: 'merch',
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  })
                }
              >
                {product.inStock ? 'Agregar' : 'Agotado'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
