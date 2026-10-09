import { useState, useEffect, useRef } from 'react'
import { Camera, MessageSquareText, Star } from 'lucide-react'

const GALLERY = ['/proof/imagem-cliente.png']

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
  const photoMarquee = useRef(null)
  const [photoCopies, setPhotoCopies] = useState(4)
  useEffect(()=>{
    if(tab !== 'photos' || !photoMarquee.current) return
    const element = photoMarquee.current
    const update = ()=>{
      const card = element.querySelector('.marquee__item--photo')
      if(card) setPhotoCopies(Math.max(2, Math.ceil(element.clientWidth / (card.getBoundingClientRect().width + 12))))
    }
    const observer = new ResizeObserver(update)
    observer.observe(element)
    update()
    return ()=>observer.disconnect()
  }, [tab])
  const photoGroup = Array.from({length:photoCopies},(_,i)=>GALLERY[i % GALLERY.length])
  const photos = [...photoGroup, ...photoGroup]
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
          <div className="marquee" ref={photoMarquee} aria-label="Fotos de clientes">
            <div className="marquee__track">
              {photos.map((src,i)=> (
                <div key={src+i} aria-hidden={i>=photoGroup.length?true:undefined} className="marquee__item marquee__item--photo"><img src={src} alt="Imagem ilustrativa fornecida para a seção de clientes" loading="lazy"  /></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="marquee" aria-label="Avaliações de clientes">
            <div className="marquee__track">
              {reviews.map((r,i)=> (
                <div key={r.name+i} aria-hidden={i>=REVIEWS.length?true:undefined} className="marquee__item marquee__item--review">
                  <div className="proof-review-stars">
                    {Array.from({length:r.stars}).map((_,idx)=><Star key={idx} size={14} fill="currentColor" stroke="currentColor" />)}
                  </div>
                  <p className="proof-review-text">“{r.text}”</p>
                  <div className="proof-review-author">
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
