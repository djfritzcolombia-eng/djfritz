import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'
import { BrandsPage } from './pages/BrandsPage'
import { BrandPage } from './pages/BrandPage'
import { SearchPage } from './pages/SearchPage'
import { BlogPage } from './pages/BlogPage'
import { ContactPage } from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="categoria/:section" element={<CategoryPage />} />
          <Route path="categoria/:section/:sub" element={<CategoryPage />} />
          <Route path="marcas" element={<BrandsPage />} />
          <Route path="marca/:slug" element={<BrandPage />} />
          <Route path="buscar" element={<SearchPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
