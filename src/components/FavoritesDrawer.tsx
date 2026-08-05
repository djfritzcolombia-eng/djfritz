import { formatPrice } from '../data/site'
import { useFavorites } from '../favorites/FavoritesContext'
import { useCart } from '../cart/CartContext'
import { assetUrl } from '../utils/assetUrl'
import './FavoritesDrawer.css'

export function FavoritesDrawer() {
  const { items, count, isOpen, closeFavorites, removeFavorite, clear } = useFavorites()
  const { addItem } = useCart()

  return (
    <>
      <div
        className={`fav-overlay ${isOpen ? 'is-open' : ''}`}
        onClick={closeFavorites}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fav-drawer ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        aria-label="Favoritos"
      >
        <div className="fav-drawer__head">
          <h2>Favoritos ({count})</h2>
          <button
            type="button"
            className="fav-drawer__close"
            onClick={closeFavorites}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="fav-drawer__empty">
            <p>Aún no tienes favoritos.</p>
            <button type="button" onClick={closeFavorites}>
              Explorar productos
            </button>
          </div>
        ) : (
          <>
            <ul className="fav-drawer__list">
              {items.map((product) => (
                <li key={product.id} className="fav-drawer__item">
                  <img src={assetUrl(product.image)} alt="" width={64} height={64} />
                  <div className="fav-drawer__info">
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                    <div className="fav-drawer__actions">
                      <button
                        type="button"
                        disabled={product.inStock === false}
                        onClick={() => {
                          if (product.inStock === false) return
                          addItem(product)
                          closeFavorites()
                        }}
                      >
                        {product.inStock === false ? 'Agotado' : 'Al carrito'}
                      </button>
                      <button
                        type="button"
                        className="fav-drawer__remove"
                        onClick={() => removeFavorite(product.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="fav-drawer__foot">
              <button type="button" className="fav-drawer__clear" onClick={clear}>
                Vaciar favoritos
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
