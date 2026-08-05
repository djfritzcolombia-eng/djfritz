import { site, formatPrice } from '../data/site'
import { useCart } from '../cart/CartContext'
import './CartDrawer.css'

export function CartDrawer() {
  const { items, total, open, setOpen, removeItem, setQty, clear } = useCart()

  if (!open) return null

  const checkoutWhatsApp = () => {
    const lines = items.map(
      (i) => `• ${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)} (${i.kind})`,
    )
    const text = encodeURIComponent(
      `Hola Fritz, quiero comprar:\n${lines.join('\n')}\nTotal: ${formatPrice(total)}`,
    )
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, '_blank')
  }

  return (
    <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrito">
      <button className="cart-drawer__backdrop" type="button" aria-label="Cerrar" onClick={() => setOpen(false)} />
      <aside className="cart-drawer__panel">
        <header>
          <h2>Carrito</h2>
          <button type="button" onClick={() => setOpen(false)}>
            Cerrar
          </button>
        </header>

        {items.length === 0 ? (
          <p className="cart-drawer__empty">Tu carrito está vacío.</p>
        ) : (
          <ul className="cart-drawer__list">
            {items.map((item) => (
              <li key={item.id}>
                {item.image && <img src={item.image} alt="" />}
                <div>
                  <strong>{item.name}</strong>
                  <span>{formatPrice(item.price)}</span>
                  <div className="cart-drawer__qty">
                    <button type="button" onClick={() => setQty(item.id, item.qty - 1)}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => setQty(item.id, item.qty + 1)}>
                      +
                    </button>
                    <button type="button" className="linkish" onClick={() => removeItem(item.id)}>
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer>
          <p>
            Total <strong>{formatPrice(total)}</strong>
          </p>
          <button type="button" className="btn btn--accent" disabled={!items.length} onClick={checkoutWhatsApp}>
            Comprar por WhatsApp
          </button>
          <button type="button" className="btn btn--ghost" disabled={!items.length} onClick={clear}>
            Vaciar
          </button>
          <p className="cart-drawer__note">
            Pagos online (Nequi / tarjeta) se conectan después. Por ahora cierras por WhatsApp o correo.
          </p>
        </footer>
      </aside>
    </div>
  )
}
