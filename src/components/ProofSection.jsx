import { useState } from 'react'
import { Camera, MessageSquareText, Star } from 'lucide-react'

const GALLERY = [
  "/proof/celular-em-uso.jpg",
  "/proof/celular-em-uso.jpg",
  "/proof/celular-em-uso.jpg",
  "/proof/celular-em-uso.jpg",
  "/proof/celular-em-uso.jpg",
  "/proof/celular-em-uso.jpg",
  "/proof/celular-em-uso.jpg",
  "/proof/celular-em-uso.jpg"
]

const REVIEWS = [
  {
    "name": "Bruno T.",
    "initial": "B",
    "text": "Atendimento atencioso e escolha do aparelho sem complicação.",
    "stars": 5
  },
  {
    "name": "Camila R.",
    "initial": "C",
    "text": "Consegui comparar os modelos com facilidade.",
    "stars": 5
  },
  {
    "name": "Diego L.",
    "initial": "D",
    "text": "As informações do site ajudaram muito na minha decisão.",
    "stars": 5
  },
  {
    "name": "Lara F.",
    "initial": "L",
    "text": "Gostei da organização e da atenção em cada detalhe.",
    "stars": 5
  },
  {
    "name": "Pedro C.",
    "initial": "P",
    "text": "A equipe explicou as opções de forma clara.",
    "stars": 5
  },
  {
    "name": "Beatriz N.",
    "initial": "B",
    "text": "Foi fácil encontrar o iPhone que eu procurava.",
    "stars": 5
  },
  {
    "name": "Lucas V.",
    "initial": "L",
    "text": "Tirei minhas dúvidas pelo WhatsApp de maneira prática.",
    "stars": 5
  },
  {
    "name": "Sofia D.",
    "initial": "S",
    "text": "Uma experiência simples do começo ao fim.",
    "stars": 5
  },
  {
    "name": "Gabriel A.",
    "initial": "G",
    "text": "O catálogo é bonito e fácil de navegar.",
    "stars": 5
  }
]

export default function ProofSection(){
  const [tab,setTab]=useState('photos')
  const photos = [...GALLERY, ...GALLERY]
  const reviews = [...REVIEWS, ...REVIEWS]
  return (
    <section id="prova-social" className="customer-proof-section">
      <div className="site-shell">
        <div className="customer-proof-head reveal">
          <div className="customer-proof-copy">
            <p className="customer-proof-kicker">Experiências ilustrativas</p>
            <h2>Resultados vistos.{' '}<br/>Atendimento lembrado.</h2>
            <p>Conteúdo ilustrativo para demonstração. Fotos ilustrativas e avaliações com nomes e relatos fictícios.</p>
          </div>
        </div>

        <div className="customer-proof-tabs-wrap reveal">
          <div className="customer-proof-tabs" role="tablist" aria-label="Provas de clientes">
            <button type="button" role="tab" aria-selected={tab==='photos'} onClick={()=>setTab('photos')} className={tab==='photos'?'is-active':''}><Camera aria-hidden="true" />Fotos de clientes</button>
            <button type="button" role="tab" aria-selected={tab==='reviews'} onClick={()=>setTab('reviews')} className={tab==='reviews'?'is-active':''}><MessageSquareText aria-hidden="true" />Avaliações</button>
          </div>
        </div>
      </div>

      <div className="customer-proof-panel" id="customer-proof-panel" role="tabpanel">
        {tab==='photos' ? (
          <div className="marquee" aria-label="Fotos de clientes">
            <div className="marquee__track">
              {photos.map((src,i)=> (
                <div key={src+i} aria-hidden={i>=GALLERY.length?true:undefined} className="marquee__item marquee__item--photo"><img src={src} alt="Fotografia ilustrativa de celular em uso; não representa cliente da loja" loading="lazy"  /></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="marquee" aria-label="Avaliações de clientes">
            <div className="marquee__track">
              {reviews.map((r,i)=> (
                <div key={r.name+i} aria-hidden={i>=REVIEWS.length?true:undefined} className="marquee__item marquee__item--review">
                  <div style={{display:'flex', gap:2, marginBottom:20, color:'var(--site-orange)'}}>
                    {Array.from({length:r.stars}).map((_,idx)=><Star key={idx} size={14} fill="currentColor" stroke="currentColor" />)}
                  </div>
                  <p style={{fontSize:15, lineHeight:1.6, color:'var(--site-muted)', flexGrow:1, marginBottom:24, textAlign:'left'}}>“{r.text}”</p>
                  <div style={{borderTop:'1px solid var(--site-hairline)', paddingTop:20, display:'flex', alignItems:'center', gap:12}}>
                    <span style={{width:32,height:32,borderRadius:999,background:'color-mix(in srgb, var(--site-orange) 12%, transparent)',border:'1px solid color-mix(in srgb, var(--site-orange) 18%, transparent)',display:'grid',placeItems:'center',fontWeight:800,fontSize:12,color:'var(--site-orange)', flexShrink:0}}>{r.initial}</span>
                    <span style={{fontWeight:500,fontSize:14,color:'var(--site-muted)'}}>{r.name}<small style={{display:'block',fontSize:11,marginTop:4}}>Exemplo fictício</small></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
