import { formatPrice } from '../data/site'
import { useCart } from '../cart/CartContext'
import { assetUrl } from '../utils/assetUrl'
import './CartDrawer.css'

export function CartDrawer() {
  const { items, count, total, isOpen, closeCart, setQty, removeItem, clear } = useCart()

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'is-open' : ''}`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <aside
        className={`cart-drawer ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        aria-label="Carrito de compras"
      >
        <div className="cart-drawer__head">
          <h2>Carrito ({count})</h2>
          <button type="button" className="cart-drawer__close" onClick={closeCart} aria-label="Cerrar">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Tu carrito está vacío.</p>
            <button type="button" onClick={closeCart}>
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="cart-drawer__item">
                  <img src={assetUrl(product.image)} alt="" width={64} height={64} />
                  <div className="cart-drawer__info">
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                    <div className="cart-drawer__qty">
                      <button
                        type="button"
                        aria-label="Quitar uno"
                        onClick={() => setQty(product.id, qty - 1)}
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        type="button"
                        aria-label="Agregar uno"
                        onClick={() => setQty(product.id, qty + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="cart-drawer__remove"
                        onClick={() => removeItem(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <strong className="cart-drawer__line">
                    {formatPrice(product.price * qty)}
                  </strong>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__foot">
              <div className="cart-drawer__total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button type="button" className="cart-drawer__checkout">
                Finalizar compra
              </button>
              <button type="button" className="cart-drawer__clear" onClick={clear}>
                Vaciar carrito
              </button>
              <a
                className="cart-drawer__whatsapp"
                href={`https://wa.me/573126433069?text=${encodeURIComponent(
                  `Hola, quiero comprar:\n${items
                    .map((i) => `• ${i.product.name} x${i.qty}`)
                    .join('\n')}\nTotal: ${formatPrice(total)}`,
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
