import { Outlet } from 'react-router-dom'
import { CartProvider } from '../cart/CartContext'
import { FavoritesProvider } from '../favorites/FavoritesContext'
import { PageLoader } from './PageLoader'
import { Topbar } from './Topbar'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartDrawer } from './CartDrawer'
import { FavoritesDrawer } from './FavoritesDrawer'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <PageLoader />
        <ScrollToTop />
        <Topbar />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <FavoritesDrawer />
      </CartProvider>
    </FavoritesProvider>
  )
}
