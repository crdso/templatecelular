import { storeConfig } from '../config/store.js'
import { whatsappUrl, defaultWhatsappMessage } from '../config/store.js'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import CineHero from '../components/CineHero.jsx'
import RepairProcessSection from '../components/RepairProcessSection.jsx'
import Services from '../components/Services.jsx'
import ProofSection from '../components/ProofSection.jsx'
import InstagramSection from '../components/InstagramSection.jsx'
import Units from '../components/Units.jsx'
import FAQ from '../components/FAQ.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { filterProducts, isIPhone } from '../data/catalog.js'

function FeaturedHomeProducts(){
  const section=useRef(null)
  useEffect(()=>{
    const node=section.current
    const observer=new IntersectionObserver(([entry])=>node.classList.toggle('products-in-view',entry.isIntersecting))
    observer.observe(node)
    return ()=>observer.disconnect()
  },[])
  const featured = filterProducts().filter(isIPhone).slice(0,4)
  return (
    <section id="produtos" ref={section} className="products-apple-section">
      <div className="site-shell">
        <div className="home-products-heading">
          <div>
            <p className="section-kicker">LOJA {storeConfig.name}</p>
            <h2>iPhones e serviços para você.</h2>
          </div>
          <Link to="/loja" className="home-products-link">Abrir loja completa →</Link>
        </div>
        <div className="product-grid">
          {featured.map(p=> <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  )
}

export default function Home(){
  return (
    <main className="home-page">
      <CineHero />
      <div className="home-content-after-cinema">
        <ProofSection />
        <FeaturedHomeProducts />
        <RepairProcessSection />
        <Services />
        <InstagramSection />
        <Units />
        <FAQ />
        <section className="cta-section">
          <div className="site-shell" style={{textAlign:'center', padding:'clamp(2.5rem,6vw,4rem) 0'}}>
            <p style={{fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--site-muted)',fontWeight:700}}>Fale com a {storeConfig.name}</p>
            <h2 style={{fontSize:'clamp(1.8rem,3.2vw,2.8rem)',fontWeight:800,letterSpacing:'-.03em',marginTop:8}}>Seu celular está com<br/>problema?</h2>
            <p style={{color:'var(--site-muted)',marginTop:10,maxWidth:'56ch',marginInline:'auto',lineHeight:1.6}}>Antes de trocar de aparelho, fale com a {storeConfig.name}. Nossa equipe avalia e indica a melhor solução — economizando seu dinheiro.</p>
            <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:18,flexWrap:'wrap'}}>
              <a href={whatsappUrl(defaultWhatsappMessage())} target="_blank" rel="noopener" className="btn-primary" style={{background:'#25D366'}}>Falar no WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
