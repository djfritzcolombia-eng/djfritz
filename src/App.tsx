import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ShowsPage } from './pages/ShowsPage'
import { MusicPage } from './pages/MusicPage'
import { NewsPage } from './pages/NewsPage'
import { BioPage } from './pages/BioPage'
import { ContactPage } from './pages/ContactPage'
import { ShopPage } from './pages/ShopPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shows" element={<ShowsPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="musica" element={<MusicPage />} />
          <Route path="noticias" element={<NewsPage />} />
          <Route path="bio" element={<BioPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
