import { useEffect, useRef, useState } from 'react'
import { Wrench, Search, RefreshCw, ShieldCheck, Smartphone, Recycle } from 'lucide-react'

const items = [
  { title: 'Conserto de Celulares', desc: 'Manutenção e reparo para diferentes modelos com garantia de serviço.', Icon: Wrench },
  { title: 'Diagnóstico Técnico', desc: 'Análise completa antes de qualquer troca de peça.', Icon: Search },
  { title: 'Troca de Peças', desc: 'Componentes compatíveis, testados e aplicados com segurança.', Icon: RefreshCw },
  { title: 'Cuidados com seu iPhone', desc: 'Orientações para conservar e proteger seu aparelho.', Icon: ShieldCheck },
  { title: 'Novos e Seminovos', desc: 'Atendimento personalizado, garantia e suporte na compra.', Icon: Smartphone },
  { title: 'Reciclagem de Eletrônicos', desc: 'Descarte responsável de baterias e lixo eletrônico.', Icon: Recycle },
]

export default function Services(){
  const gridRef = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(()=>{
    const el = gridRef.current
    if(!el) return
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){ setVisible(true); return }
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true) },{threshold:0.2})
    io.observe(el)
    return ()=> io.disconnect()
  },[])
  return (
    <section id="servicos" className="services-apple-section">
      <div className="site-shell">
        <div className="services-editorial-heading reveal">
          <p className="section-kicker">ATENDIMENTO COMPLETO</p>
          <h2>Assistência, proteção e <br/>tecnologia em um só lugar.</h2>
        </div>

        <div className="services-editorial-spacer" aria-hidden="true" />

        <div ref={gridRef} className="services-editorial-grid">
          {items.map((it) => {
            const Icon = it.Icon
            return (
              <div key={it.title} className="service-cell">
                <Icon className="service-cell-icon" aria-hidden="true" />
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </div>
            )
          })}
          <div className="grid-lines" aria-hidden="true">
            <div className={`grid-line grid-line--v ${visible?'is-visible':''}`} style={{left:'33.333%'}}><span className="grid-glint" /></div>
            <div className={`grid-line grid-line--v ${visible?'is-visible':''}`} style={{left:'66.666%'}}><span className="grid-glint" /></div>
            <div className={`grid-line grid-line--h ${visible?'is-visible':''}`} style={{top:'50%'}}><span className="grid-glint" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
