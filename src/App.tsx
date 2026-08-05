import { CartProvider } from './cart/CartContext'
import { ContentProvider } from './content/ContentProvider'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ShowsPage } from './pages/ShowsPage'
import { ListenPage } from './pages/ListenPage'
import { BeatsPage } from './pages/BeatsPage'
import { BioPage } from './pages/BioPage'
import { ContactPage } from './pages/ContactPage'
import { ShopPage } from './pages/ShopPage'
import { AdminPage } from './pages/AdminPage'

export default function App() {
  return (
    <ContentProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="shows" element={<ShowsPage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="escuchar" element={<ListenPage />} />
              <Route path="musica" element={<Navigate to="/escuchar" replace />} />
              <Route path="beats" element={<BeatsPage />} />
              <Route path="bio" element={<BioPage />} />
              <Route path="contacto" element={<ContactPage />} />
              <Route path="noticias" element={<Navigate to="/shows" replace />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ContentProvider>
  )
}
