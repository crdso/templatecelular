import { storeConfig, whatsappUrl } from '../config/store.js'
import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'

export default function Footer(){
  const logo = storeConfig.logo
  const scrollToUnits = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault()
      document.getElementById('unidades')?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-grid">
          {/* MARCA */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <img src={logo} alt={storeConfig.name} />
              <span>{storeConfig.name}</span>
            </a>
            <p>{storeConfig.description}</p>
            <div className="footer-social">
              <a href={storeConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={"Instagram "+storeConfig.name+""}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          {/* NAVEGAÇÃO */}
          <div className="footer-col">
            <h5>Navegação</h5>
            <div className="footer-nav-grid">
              <Link to="/">Início</Link>
              <Link to="/loja">Loja</Link>
              <a href="/#unidades" onClick={scrollToUnits}>Unidade exemplo 01</a>
              <Link to="/assistencia">Assistência</Link>
              <a href="/#unidades" onClick={scrollToUnits}>Unidade exemplo 02</a>
              <Link to="/contato">Contato</Link>
            </div>
          </div>
          {/* CONTATO */}
          <div className="footer-col">
            <h5>Contato</h5>
            <div className="footer-contact-list">
              <a href={whatsappUrl()}><Phone size={16} />{storeConfig.phoneDisplay}</a>
              
              
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {storeConfig.name} · Demonstração</span>
          <Link to="/politica-de-privacidade">Política de Privacidade</Link>
        </div>
      </div>
      <style>{`
        .footer-logo{display:inline-flex;align-items:center;gap:12px;margin-bottom:16px;text-decoration:none;color:var(--site-text)}
        .footer-logo img{width:40px;height:40px;object-fit:contain;border-radius:8px}
        .footer-logo span{font-weight:800;font-size:16px}
        .footer-social{display:flex;gap:10px;margin-top:16px}
        .footer-social a{width:36px;height:36px;border-radius:999px;border:1px solid var(--site-border);display:grid;place-items:center;background:color-mix(in srgb,var(--site-panel) 80%, transparent);color:var(--site-muted);transition:color .18s,border-color .18s}
        .footer-social a:hover{color:var(--site-text);border-color:var(--site-hairline)}
        .footer-contact-list a{display:flex;align-items:center;gap:10px}
        .footer-contact-list svg{color:var(--site-orange);flex-shrink:0}
        @media(max-width:860px){ .footer-grid{grid-template-columns:1fr 1fr !important} }
        @media(max-width:560px){ .footer-grid{grid-template-columns:1fr !important;text-align:center !important} .footer-grid > div{text-align:center !important;display:grid;justify-items:center} .footer-brand p{margin-inline:auto} .footer-nav-grid{justify-items:center} .footer-contact-list{justify-items:center} }
      `}</style>
    </footer>
  )
}
