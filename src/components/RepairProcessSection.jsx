import { useEffect, useRef, useState } from 'react'
import {
  ClipboardCheck,
  Microscope,
  Wrench,
  ShieldCheck,
  Check,
} from 'lucide-react'

const repairSteps = [
  {
    number: '01',
    title: 'A gente escuta.',
    description: 'Você conta o que aconteceu, quando o defeito começou e como o aparelho está se comportando. Sem chute e sem pular etapas.',
    detail: 'Contexto do problema',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'A gente diagnostica.',
    description: 'Testamos as funções relacionadas ao problema para localizar a causa real antes de indicar qualquer troca de peça.',
    detail: 'Causa identificada',
    icon: Microscope,
  },
  {
    number: '03',
    title: 'A gente resolve.',
    description: 'Depois da sua aprovação, o reparo é executado com componentes compatíveis, processo limpo e comunicação clara.',
    detail: 'Reparo autorizado',
    icon: Wrench,
  },
  {
    number: '04',
    title: 'A gente testa.',
    description: 'Repetimos os testes, revisamos o aparelho e explicamos o serviço realizado antes da entrega com garantia.',
    detail: 'Teste final aprovado',
    icon: ShieldCheck,
  },
]

export default function RepairProcessSection(){
  const wrapRef = useRef(null)
  const scanRef = useRef(null)
  const progressRef = useRef(null)
  const [active,setActive]=useState(0)
  const activeRef = useRef(0)
  const rafRef = useRef(0)
  const lastScrollRef = useRef(0)

  useEffect(()=>{
    const el = wrapRef.current
    if(!el) return

    const update = () => {
      rafRef.current = 0
      const h = Math.max(1, el.offsetHeight - window.innerHeight)
      const top = -el.getBoundingClientRect().top
      const p = Math.min(1, Math.max(0, top / h))

      // Atualiza elementos visuais contínuos SEM rerender React (evita jitter iOS)
      if (scanRef.current) {
        const scan = 12 + p * 76
        scanRef.current.style.top = scan.toFixed(2) + '%'
      }
      if (progressRef.current) {
        const scale = 0.04 + p * 0.96
        progressRef.current.style.transform = `translate3d(0,0,0) scaleX(${scale})`
      }

      const idx = Math.min(repairSteps.length - 1, Math.floor(p * repairSteps.length))
      if (idx !== activeRef.current) {
        activeRef.current = idx
        setActive(idx)
      }
      lastScrollRef.current = Date.now()
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(update)
    }

    const onResize = () => {
      // Safari iOS: barra de endereço expandindo/recolhendo dispara resize durante scroll -> ignorar para não tremer
      if (Date.now() - lastScrollRef.current < 500) return
      onScroll()
    }

    // Inicial
    update()
    window.addEventListener('scroll', onScroll, {passive:true})
    window.addEventListener('resize', onResize)
    window.addEventListener('load', update)

    return ()=>{
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', update)
      if(rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  },[])

  const step = repairSteps[active]

  return (
    <section className="services-process" ref={wrapRef}>
      <div className="services-process-sticky site-shell">
        <div className="services-process-heading">
          <p className="section-kicker">Como funciona o reparo</p>
          <h2>Do problema ao aparelho pronto.</h2>
        </div>

        <div className="services-process-layout">
          <div className="services-stage-list" aria-label="Etapas do atendimento técnico">
            {repairSteps.map((s,i)=> (
              <article key={s.number} className={`services-stage ${i===active?'is-active':''}`}>
                <span className="services-stage-number">{s.number}</span>
                <h3>{s.title}</h3>
              </article>
            ))}
          </div>

          <div className="services-device-stage" aria-live="polite">
            <div className="services-device">
              <div className="services-device-speaker" aria-hidden="true" />
              <div ref={scanRef} className="services-device-scan" aria-hidden="true" style={{top:'12%'}} />
              <div className="services-device-content" key={step.number}>
                {(() => { const Icon = step.icon; return <Icon aria-hidden="true" strokeWidth={2} className="services-device-icon" /> })()}
                <span>Etapa {step.number}</span>
                <strong>{step.detail}</strong>
                <small><Check aria-hidden="true" strokeWidth={2} className="services-device-check" /> Processo registrado</small>
              </div>
            </div>
            <div className="services-device-progress" aria-hidden="true"><span ref={progressRef} style={{transform:'translate3d(0,0,0) scaleX(0.04)'}} /></div>
            <p>{step.number} / 04</p>
          </div>
        </div>

        <div style={{marginTop:14, display:'none'}} className="repair-mobile-detail">
          <p style={{fontWeight:800,fontSize:15}}>{step.title}</p>
          <p style={{color:'#85858b',fontSize:13,marginTop:6,lineHeight:1.6}}>{step.description}</p>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .services-stage-list{display:none !important}
          .services-process{height:360svh !important}
          .services-process-sticky{flex-direction:column !important; justify-content:center !important; align-items:center !important; height:100svh !important; min-height:100svh !important; padding-top:5.5rem !important; padding-bottom:1.25rem !important; display:flex !important; position:sticky !important; top:0 !important; overflow:hidden !important}
          .services-process-heading{max-width:620px !important; margin-bottom:1.25rem !important; text-align:center !important}
          .services-process-heading h2{margin-top:.65rem !important; font-size:clamp(2.15rem,7vw,3rem) !important; text-align:center !important}
          .services-process-heading > p:last-child{max-width:52ch !important; font-size:var(--fs-sm) !important; margin-top:.9rem !important; line-height:1.5 !important}
          .services-process-layout{flex:1 !important; justify-content:center !important; align-items:center !important; min-height:0 !important; display:flex !important; width:100% !important; max-width:100% !important}
          .services-device-stage{width:min(230px,42vw,28svh) !important; max-width:min(230px,42vw,28svh) !important; margin-inline:auto !important; left:auto !important; right:auto !important; align-items:center !important; display:flex !important; flex-direction:column !important; justify-content:center !important}
          .services-device{width:100% !important; max-width:100% !important; margin-inline:auto !important; left:auto !important; right:auto !important; transform:translate3d(0,0,0); backface-visibility:hidden}
          .services-device-progress, .services-device-stage>p{width:100% !important; max-width:100% !important; margin-inline:auto !important}
          .services-device-stage>p{ text-align:center !important }
          .services-device-icon{width:46px !important; height:46px !important}
          .services-device-content strong{font-size:19px !important; max-width:13ch !important}
          .services-device-content small{bottom:1.8rem !important}
          .repair-mobile-detail{display:block !important; max-width:520px; text-align:center; width:100%; margin-inline:auto; padding:0 8px}
        }
        @media(max-width:640px){
          .services-process-sticky{padding-top:5rem !important; padding-bottom:1rem !important}
          .services-process-heading h2{font-size:clamp(2rem,9.5vw,2.65rem) !important}
          .services-device-stage{width:min(210px,54vw,27svh) !important; max-width:min(210px,54vw,27svh) !important}
        }
      `}</style>
    </section>
  )
}
