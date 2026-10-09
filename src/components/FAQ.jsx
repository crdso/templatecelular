import { storeConfig } from '../config/store.js'
import { Link } from 'react-router-dom'
const FAQS=[
  {q:`Quais serviços a ${storeConfig.name} oferece?`,a:'iPhones e assistência técnica de celulares. Serviços e condições serão configurados para cada loja.'},
  {q:'Como pedir orçamento?',a:'Envie o modelo e o defeito pelo WhatsApp. A confirmação depende do diagnóstico em bancada.'},
  {q:'Vocês vendem seminovos?',a:'O catálogo demonstra modelos novos e seminovos. Confirme disponibilidade e condições com a loja.'},
  {q:'Onde ficam as lojas?',a:'Os endereços da seção Unidades são exemplos fictícios, personalizáveis para cada loja.'},
  {q:'Há garantia?',a:'Garantia informada conforme o serviço ou produto escolhido.'},
]
export default function FAQ(){
  return (
    <section className="home-faq-section">
      <div className="site-shell home-faq-grid">
        <div className="reveal">
          <p className="section-kicker">Dúvidas frequentes</p>
          <h2 style={{fontSize:'clamp(1.6rem,2.6vw,2.4rem)',fontWeight:800,letterSpacing:'-.03em',marginTop:8}}>Antes de visitar ou chamar.</h2>
          <p style={{color:'var(--site-muted)',marginTop:8}}>Respostas rápidas para entender como a {storeConfig.name} pode ajudar.</p>
          <Link to="/loja" style={{display:'inline-flex',marginTop:12,fontWeight:700,color:'#ff6a00', textDecoration:'none'}}>Ver produtos →</Link>
        </div>
        <div className="home-faq-list reveal">
          {FAQS.map(f=> (
            <details key={f.q}><summary>{f.q} <span>＋</span></summary><p>{f.a}</p></details>
          ))}
        </div>
      </div>
    </section>
  )
}
