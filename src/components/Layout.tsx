import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'
import { CartDrawer } from './CartDrawer'
import { SeoKeywords } from './SeoKeywords'

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <SeoKeywords />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
