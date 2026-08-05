import type { Product } from '../data/site'
import { formatPrice } from '../data/site'
import { useCart } from '../cart/CartContext'
import { useFavorites } from '../favorites/FavoritesContext'
import { assetUrl } from '../utils/assetUrl'
import './ProductCard.css'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const liked = isFavorite(product.id)
  const available = product.inStock !== false
  const discount =
    product.oldPrice != null
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null
  const imageSrc = assetUrl(product.image)

  return (
    <article
      className={`product-card ${available ? '' : 'is-oos'}`.trim()}
      id={`producto-${product.id}`}
    >
      <div className="product-card__media">
        {discount != null && discount > 0 && available && (
          <span className="ribbon ribbon--sale">-{discount}%</span>
        )}
        {product.badge === 'nuevo' && available && (
          <span className="ribbon ribbon--new">Nuevo</span>
        )}
        {!available && <span className="ribbon ribbon--oos">Agotado</span>}
        <button
          type="button"
          className={`product-card__fav ${liked ? 'is-active' : ''}`}
          aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={liked}
          onClick={() => toggleFavorite(product)}
        >
          ♥
        </button>
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const el = e.currentTarget
            el.onerror = null
            el.src = assetUrl('/logo-loader.png')
            el.classList.add('is-fallback')
          }}
        />
      </div>
      <div className="product-card__body">
        <p className="product-card__brand">Marca: {product.brand}</p>
        <h3 className="product-card__title">{product.name}</h3>
        {product.description && (
          <p className="product-card__desc">{product.description}</p>
        )}
        {product.rating != null && (
          <p className="product-card__rating">
            {'★'.repeat(Math.round(product.rating))}
            <span>
              {product.rating.toFixed(2)}
              {product.reviews != null ? ` · ${String(product.reviews).padStart(2, '0')}` : ''}
            </span>
          </p>
        )}
        <p className="product-card__stock">
          {available ? 'Disponible' : 'Sin stock'}
        </p>
        <p className="product-card__price">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice != null && <s>{formatPrice(product.oldPrice)}</s>}
        </p>
        <button
          type="button"
          className="product-card__btn"
          disabled={!available}
          onClick={() => {
            if (!available) return
            addItem(product)
          }}
        >
          {available ? 'Agregar al carrito' : 'No disponible'}
        </button>
      </div>
    </article>
  )
}
