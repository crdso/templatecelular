import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import FloatingWhatsapp from './components/FloatingWhatsapp.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import PageTitle from './components/PageTitle.jsx'
import { useCart } from './context/CartContext.jsx'
const Home = lazy(() => import('./pages/Home.jsx'))
const Loja = lazy(() => import('./pages/Loja.jsx'))
const Produto = lazy(() => import('./pages/Produto.jsx'))
const Assistencia = lazy(() => import('./pages/Assistencia.jsx'))
const Contato = lazy(() => import('./pages/Contato.jsx'))
const PoliticaPrivacidade = lazy(() => import('./pages/PoliticaPrivacidade.jsx'))
import NotFound from './pages/NotFound.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import { SITE_INACTIVE } from './config/site.js'
import Inactive from './pages/Inactive.jsx'

export default function App(){
  const { count, openCart } = useCart()

  if(SITE_INACTIVE){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Inactive />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTitle />
      <Header cartCount={count} onCartOpen={openCart} />
      <Suspense fallback={<main style={{minHeight:'65vh',padding:'calc(var(--mobile-header-height) + 40px) 24px'}} role="status">Carregando…</main>}><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/loja/categoria/:categorySlug" element={<Loja />} />
        <Route path="/loja/produto/:slug" element={<Produto />} />
        <Route path="/assistencia" element={<Assistencia />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="*" element={<NotFound />} />
      </Routes></Suspense>
      <Footer />
      <CartDrawer />
      <FloatingWhatsapp />
      <CookieBanner />
    </BrowserRouter>
  )
}
