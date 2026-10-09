import { storeConfig } from '../config/store.js'
import { useMemo, useState } from 'react'
import ProductCard from './ProductCard.jsx'

const CATS = [
  {id:'todos',label:'Todos'},
  {id:'iphones',label:'iPhones'},
  {id:'novos',label:'Novos'},
  {id:'seminovos',label:'Seminovos'},
]

export default function ProductGrid({ products, onOpen }){
  const [cat,setCat]=useState('todos')
  const [q,setQ]=useState('')
  const filtered=useMemo(()=>{
    return products.filter(p=>{
      if(p.hidden) return false
      if(cat==='iphones' && p.category!=='iphones') return false
      if(cat==='novos' && p.condition!=='Novo') return false
      if(cat==='seminovos' && p.condition!=='Seminovo') return false
      if(q && !p.name.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  },[products,cat,q])

  return (
    <section id="produtos" className="products-apple-section">
      <div className="site-shell">
        <div className="reveal">
          <p className="section-kicker">Loja {storeConfig.name}</p>
          <h2 style={{fontSize:'clamp(1.8rem,3.2vw,2.7rem)',fontWeight:800,letterSpacing:'-.03em',marginTop:10}}>Escolha o seu próximo iPhone.</h2>
          <p style={{color:'#85858b',marginTop:8,maxWidth:'56ch',lineHeight:1.6}}>Modelos novos e seminovos revisados em bancada, com garantia e procedência.</p>
        </div>

        <div className="store-toolbar" style={{marginTop:18}}>
          <div className="category-pills">
            {CATS.map(c=> (
              <button key={c.id} onClick={()=>setCat(c.id)} className={`cat-pill ${cat===c.id?'is-active':''}`}>{c.label}</button>
            ))}
          </div>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar modelo..." style={{height:38,padding:'0 12px',borderRadius:999,border:'1px solid #ffffff14',background:'var(--site-panel-soft)',color:'#fff',minWidth:160}} />
        </div>

        <div className="product-grid">
          {filtered.map(p=> <ProductCard key={p.slug} product={p} onOpen={onOpen} />)}
        </div>
        {filtered.length===0 && <p style={{textAlign:'center',color:'#666',marginTop:18}}>Nenhum produto encontrado nesta categoria.</p>}
      </div>
    </section>
  )
}

