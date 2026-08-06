import { useState } from 'react'
import { formatPrice } from '../data/site'
import { useCart } from '../cart/CartContext'
import { ClientForm } from './ClientForm'
import './CartDrawer.css'

export function CartDrawer() {
  const { items, total, open, setOpen, removeItem, setQty, clear } = useCart()
  const [checkout, setCheckout] = useState(false)

  if (!open) return null

  const cartLines = items.map((i) => ({
    name: i.name,
    qty: i.qty,
    priceLabel: formatPrice(i.price * i.qty),
    kind: i.kind,
  }))

  const lockedIntent =
    items.every((i) => i.kind === 'beat')
      ? ('beats' as const)
      : items.every((i) => i.kind === 'merch')
        ? ('merch' as const)
        : ('merch' as const)

  return (
    <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrito">
      <button
        className="cart-drawer__backdrop"
        type="button"
        aria-label="Cerrar"
        onClick={() => {
          setCheckout(false)
          setOpen(false)
        }}
      />
      <aside className="cart-drawer__panel">
        <header>
          <h2>{checkout ? 'Registro de compra' : 'Carrito'}</h2>
          <button
            type="button"
            onClick={() => {
              setCheckout(false)
              setOpen(false)
            }}
          >
            Cerrar
          </button>
        </header>

        {checkout ? (
          <div className="cart-drawer__checkout">
            <button type="button" className="linkish" onClick={() => setCheckout(false)}>
              ← Volver al carrito
            </button>
            <ClientForm
              lockedIntent={lockedIntent}
              cartLines={cartLines}
              cartTotalLabel={formatPrice(total)}
              submitLabel="Confirmar por WhatsApp"
              onSuccess={() => {
                clear()
                setCheckout(false)
                setOpen(false)
              }}
            />
          </div>
        ) : items.length === 0 ? (
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

        {!checkout && (
          <footer>
            <p>
              Total <strong>{formatPrice(total)}</strong>
            </p>
            <button
              type="button"
              className="btn btn--accent"
              disabled={!items.length}
              onClick={() => setCheckout(true)}
            >
              Continuar registro
            </button>
            <button type="button" className="btn btn--ghost" disabled={!items.length} onClick={clear}>
              Vaciar
            </button>
            <p className="cart-drawer__note">
              Beats se envían por correo. Merch pide dirección de envío. Cierras por WhatsApp.
            </p>
          </footer>
        )}
      </aside>
    </div>
  )
}
