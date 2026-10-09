import { storeConfig } from '../config/store.js'
import { whatsappUrl, defaultWhatsappMessage } from '../config/store.js'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Header({ onCartOpen, cartCount }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const m = window.matchMedia('(min-width: 1024px)')
    const h = () => m.matches && setMenuOpen(false)
    m.addEventListener('change', h)
    return () => m.removeEventListener('change', h)
  }, [])

  // close menu on route change
  useEffect(()=>{ setMenuOpen(false) },[location.pathname])

  const nav = [
    { label: 'Início', to: '/' },
    { label: 'Loja', to: '/loja' },
    { label: 'Assistência', to: '/assistencia' },
    { label: 'Contato', to: '/contato' },
  ]

  const handleInicio = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
    setMenuOpen(false)
  }

  const logo = storeConfig.logo
  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''} ${menuOpen ? 'site-header-menu-open' : ''}`}>
      <div className="site-header-inner">
        <a href="/" onClick={handleInicio} className="nav-brand">
          <img src={logo} alt={storeConfig.name} className="nav-brand-logo" />
          <span>{storeConfig.name}</span>
        </a>

        <nav className="site-nav-center hidden lg:flex" aria-label="Navegação principal">
          <ul className="nav-segmented" style={{listStyle:'none', margin:0, padding:'3px'}}>
            {nav.map(i => {
              const isInicio = i.to === '/'
              if (isInicio) {
                const active = location.pathname === '/'
                return (
                  <li key={i.label} style={{listStyle:'none'}}>
                    <a href="/" onClick={handleInicio} className={`nav-segment ${active?'is-active':''}`}>{i.label}</a>
                  </li>
                )
              }
              return (
                <li key={i.label} style={{listStyle:'none'}}>
                  <NavLink to={i.to} className={({isActive})=> `nav-segment ${isActive?'is-active':''}`}>{i.label}</NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="site-nav-actions hidden lg:flex">
          <button type="button" onClick={onCartOpen} className="nav-icon-btn" aria-label="Abrir carrinho">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6h15l-1.5 9h-12z" /><path d="M6 6L5 2H2" /><circle cx="9" cy="20" r="1.6" /><circle cx="18" cy="20" r="1.6" /></svg>
            {cartCount > 0 && <span style={{position:'absolute',top:-6,right:-6,minWidth:18,height:18,padding:'0 5px',borderRadius:99,background:'#ff6a00',color:'#fff',fontSize:11,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center'}}>{cartCount}</span>}
          </button>
          <button type="button" onClick={toggle} className="nav-icon-btn" aria-label={theme==='dark'?'Ativar modo claro':'Ativar modo escuro'}>
            {theme==='dark' ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
          </button>
          <a href={whatsappUrl(defaultWhatsappMessage())} target="_blank" rel="noopener noreferrer" className="nav-store-cta nav-store-cta--whatsapp desktop-only" aria-label={"WhatsApp "+storeConfig.name+""}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.06 0 11.29c0 2.07.6 4.03 1.66 5.74L0 24l7.2-1.6A12.3 12.3 0 0 0 12 22.58c6.63 0 12-5.06 12-11.29S18.63 0 12 0Zm0 20.52a10.3 10.3 0 0 1-5.25-1.42l-.38-.22-4.27.95.91-3.93-.26-.42A10.2 10.2 0 0 1 1.9 11.29C1.9 6.08 6.48 1.8 12 1.8S22.1 6.08 22.1 11.29 17.52 20.52 12 20.52Zm5.8-7.68c-.32-.15-1.9-.93-2.2-1.04-.29-.11-.5-.15-.71.15-.21.3-.82 1.04-1.01 1.25-.19.21-.38.24-.7.08-.32-.15-1.35-.49-2.57-1.56-.95-.83-1.59-1.86-1.78-2.17-.19-.31-.02-.48.14-.63.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.54-.08-.15-.71-1.69-.97-2.31-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.54.08-.82.39-.29.31-1.09 1.05-1.09 2.56s1.12 2.97 1.27 3.18c.15.21 2.2 3.32 5.33 4.66.75.32 1.33.51 1.78.65.75.23 1.43.2 1.97.12.6-.09 1.9-.77 2.17-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.36Z"/></svg>
            WhatsApp
          </a>
        </div>

        <button type="button" className="mobile-toggle" aria-label="Abrir menu" onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div style={{pointerEvents:'auto',position:'absolute',top:'100%',left:0,right:0,background:'var(--site-panel)',borderTop:'1px solid var(--site-hairline)',padding:'12px 16px 16px',display:'grid',gap:10}} className="lg:hidden">
          {nav.map(i => {
            if(i.to==='/') return <a key={i.label} href="/" onClick={handleInicio} style={{padding:'12px 14px',borderRadius:12,background: location.pathname==='/'?'#ff6a00':'var(--site-panel-soft)',color: location.pathname==='/'?'#fff':'var(--site-text)',border:'1px solid var(--site-border)',fontWeight:700,textAlign:'center'}}>{i.label}</a>
            return <NavLink key={i.label} to={i.to} style={({isActive})=>({padding:'12px 14px',borderRadius:12,background:isActive?'#ff6a00':'var(--site-panel-soft)',border:'1px solid var(--site-border)',fontWeight:700,textAlign:'center',color:isActive?'#fff':'var(--site-text)',display:'block',textDecoration:'none'})}>{i.label}</NavLink>
          })}
          <div style={{display:'flex',gap:10}}>
            <button onClick={toggle} style={{flex:1,padding:'12px 14px',borderRadius:12,background:'var(--site-panel-soft)',border:'1px solid var(--site-border)',color:'var(--site-text)',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>{theme==='dark' ? <Sun size={16}/> : <Moon size={16}/>} {theme==='dark' ? 'Modo claro' : 'Modo escuro'}</button>
            <button onClick={() => { setMenuOpen(false); onCartOpen() }} style={{flex:1,padding:'12px 14px',borderRadius:12,background:'var(--site-panel-soft)',border:'1px solid var(--site-border)',color:'var(--site-text)',fontWeight:700}}>Carrinho {cartCount>0?`(${cartCount})`:''}</button>
          </div>
          <a href={whatsappUrl(defaultWhatsappMessage())} target="_blank" rel="noopener noreferrer" style={{padding:'12px 14px',borderRadius:999,textAlign:'center',background:'#25D366',color:'#fff',fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.06 0 11.29c0 2.07.6 4.03 1.66 5.74L0 24l7.2-1.6A12.3 12.3 0 0 0 12 22.58c6.63 0 12-5.06 12-11.29S18.63 0 12 0Zm5.8 7.68c-.32-.15-1.9-.93-2.2-1.04-.29-.11-.5-.15-.71.15-.21.3-.82 1.04-1.01 1.25-.19.21-.38.24-.7.08-.32-.15-1.35-.49-2.57-1.56-.95-.83-1.59-1.86-1.78-2.17-.19-.31-.02-.48.14-.63.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.54-.08-.15-.71-1.69-.97-2.31-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.54.08-.82.39-.29.31-1.09 1.05-1.09 2.56s1.12 2.97 1.27 3.18c.15.21 2.2 3.32 5.33 4.66.75.32 1.33.51 1.78.65.75.23 1.43.2 1.97.12.6-.09 1.9-.77 2.17-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.36Z"/></svg> WhatsApp</a>
        </div>
      )}
    </header>
  )
}
