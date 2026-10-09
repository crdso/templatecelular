import { storeConfig, whatsappUrl, defaultWhatsappMessage } from '../config/store.js'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MapPin, Phone, Send } from 'lucide-react'

const ASSUNTOS = [
  'Assistência técnica',
  'Compra de celular',
  'Troca de tela de iPhone',
  'Troca de bateria de iPhone',
  'Falha no carregamento',
  'Outro',
]

export default function Contato(){
  const [form,setForm]=useState({nome:'', telefone:'', assunto:'', mensagem:''})
  const [searchParams] = useSearchParams()

  useEffect(()=>{
    const assunto = ASSUNTOS.includes(searchParams.get('assunto')) ? searchParams.get('assunto') : ''
    const mensagem = searchParams.get('mensagem')
    if(assunto || mensagem){
      setForm(f=> ({
        ...f,
        assunto: assunto || f.assunto,
        mensagem: mensagem || f.mensagem,
      }))
    }
  }, [searchParams])

  const send = (e)=>{
    e.preventDefault()
    const msg = `Olá, ${storeConfig.name}!\n\n*Nome:* ${form.nome}\n*Telefone:* ${form.telefone}\n*Assunto:* ${form.assunto || 'Outro'}\n\n*Mensagem:* ${form.mensagem}`
    window.open(whatsappUrl(msg+'\n\nContato demonstrativo enviado pelo site.'),'_blank','noopener,noreferrer')
  }

  return (
    <main className="contact-page" style={{paddingTop:96, minHeight:'100vh', background:'var(--site-bg)'}}>
      <section style={{padding:'48px 0'}}>
        <div className="contato-shell" style={{maxWidth:1200, margin:'0 auto', padding:'0 16px'}}>
          <div style={{marginBottom:48}}>
            <p style={{fontSize:12, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--site-muted)', marginBottom:16}}>Contato</p>
            <h1 style={{fontSize:40, overflowWrap:'anywhere', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.05, color:'var(--site-text)', marginBottom:16}}>Fale com a {storeConfig.name}.</h1>
            <p style={{fontSize:18, color:'var(--site-muted)', lineHeight:1.6, maxWidth:'60ch'}}>Estamos prontos para ajudar com assistência, vendas ou tirar suas dúvidas. Converse pelo WhatsApp. Dados de unidades e horários demonstrativos.</p>
          </div>

          <div className="contato-main-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center'}}>
            {/* FORM */}
            <div className="contato-form-card" style={{background:'var(--site-panel)', border:'1px solid var(--site-border)', borderRadius:16, padding:24}}>
              <form onSubmit={send} style={{display:'grid', gap:20}}>
                <label style={{display:'grid', gap:8}}>
                  <span style={{fontSize:12, fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase', color:'var(--site-muted)'}}>Seu Nome</span>
                  <input required value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} placeholder="Como podemos te chamar?" style={{height:48, padding:'0 16px', borderRadius:12, border:'1px solid var(--site-border)', background:'var(--site-panel-soft)', color:'var(--site-text)', fontSize:14, outline:'none', width:'100%'}} onFocus={e=>e.currentTarget.style.borderColor='var(--site-orange)'} onBlur={e=>e.currentTarget.style.borderColor='var(--site-border)'} />
                </label>
                <label style={{display:'grid', gap:8}}>
                  <span style={{fontSize:12, fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase', color:'var(--site-muted)'}}>Telefone / WhatsApp</span>
                  <input required value={form.telefone} onChange={e=>setForm({...form, telefone:e.target.value})} placeholder="(63) 9 9999-9999" style={{height:48, padding:'0 16px', borderRadius:12, border:'1px solid var(--site-border)', background:'var(--site-panel-soft)', color:'var(--site-text)', fontSize:14, outline:'none', width:'100%'}} onFocus={e=>e.currentTarget.style.borderColor='var(--site-orange)'} onBlur={e=>e.currentTarget.style.borderColor='var(--site-border)'} />
                </label>
                <label style={{display:'grid', gap:8}}>
                  <span style={{fontSize:12, fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase', color:'var(--site-muted)'}}>Assunto</span>
                  <select value={form.assunto} onChange={e=>setForm({...form, assunto:e.target.value})} required style={{height:48, padding:'0 16px', borderRadius:12, border:'1px solid var(--site-border)', background:'var(--site-panel-soft)', color:'var(--site-text)', fontSize:14, outline:'none', width:'100%'}} onFocus={e=>e.currentTarget.style.borderColor='var(--site-orange)'} onBlur={e=>e.currentTarget.style.borderColor='var(--site-border)'}>
                    <option value="" disabled>Selecione o assunto</option>
                    {ASSUNTOS.map(a=> <option key={a} value={a}>{a}</option>)}
                  </select>
                </label>
                <label style={{display:'grid', gap:8}}>
                  <span style={{fontSize:12, fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase', color:'var(--site-muted)'}}>Mensagem</span>
                  <textarea required value={form.mensagem} onChange={e=>setForm({...form, mensagem:e.target.value})} placeholder="Conte como podemos ajudar..." style={{height:112, padding:'12px 16px', borderRadius:12, border:'1px solid var(--site-border)', background:'var(--site-panel-soft)', color:'var(--site-text)', fontSize:14, outline:'none', resize:'vertical', width:'100%'}} onFocus={e=>e.currentTarget.style.borderColor='var(--site-orange)'} onBlur={e=>e.currentTarget.style.borderColor='var(--site-border)'} />
                </label>
                <button type="submit" style={{height:48, width:'100%', borderRadius:12, border:'none', background:'#25D366', color:'#fff', fontWeight:600, fontSize:15, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer', transition:'background .18s'}}>
                  <Send size={16} /> Enviar pelo WhatsApp
                </button>
                <p style={{fontSize:12,color:'var(--site-muted)',lineHeight:1.6}}>Ao continuar, você abre o WhatsApp com os dados preenchidos. Este formulário não envia nem armazena informações em servidor.</p>
              </form>
            </div>

            {/* DIREITA */}
            <div style={{display:'grid', gap:32, alignContent:'center'}}>
              {/* NOSSAS UNIDADES */}
              <div>
                <h3 style={{fontSize:13, fontWeight:700, display:'flex', alignItems:'center', gap:8, color:'var(--site-text)', marginBottom:12}}>
                  <MapPin size={16} style={{color:'var(--site-orange)'}} /> Nossas Unidades
                </h3>
                <div style={{display:'grid', gap:12}}>
                  {storeConfig.units.map(unit=><div key={unit.name} style={{display:'grid',gap:6,padding:16,borderRadius:12,border:'1px solid var(--site-border)',background:'var(--site-panel)',color:'var(--site-text)',fontSize:14}}><strong>{unit.name}</strong><span>{unit.address}</span><span>{unit.city}</span><small style={{color:'var(--site-muted)'}}>Endereço fictício para demonstração</small></div>)}
                </div>
              </div>

              <p style={{color:'var(--site-muted)',fontSize:13,lineHeight:1.6}}>{storeConfig.hours}<br/>{storeConfig.emailLabel}</p>
              {/* CONTATOS DIRETOS */}
              <div style={{borderTop:'1px solid var(--site-border)', paddingTop:24}}>
                <h3 style={{fontSize:13, fontWeight:700, display:'flex', alignItems:'center', gap:8, color:'var(--site-text)', marginBottom:12}}>
                  <Phone size={16} style={{color:'var(--site-orange)'}} /> Contatos Diretos
                </h3>
                <div className="contato-direct-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, minWidth:0}}>
                  <a href={whatsappUrl(defaultWhatsappMessage())} target="_blank" rel="noopener" style={{display:'flex', alignItems:'center', gap:10, padding:'0 16px', height:48, borderRadius:12, border:'1px solid var(--site-border)', background:'var(--site-panel)', textDecoration:'none', flex:1}}>
                    <span style={{width:32, height:32, borderRadius:999, background:'#25D366', display:'grid', placeItems:'center', flexShrink:0, color:'#fff'}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.06 0 11.29c0 2.07.6 4.03 1.66 5.74L0 24l7.2-1.6A12.3 12.3 0 0 0 12 22.58c6.63 0 12-5.06 12-11.29S18.63 0 12 0Zm5.8 7.68c-.32-.15-1.9-.93-2.2-1.04-.29-.11-.5-.15-.71.15-.21.3-.82 1.04-1.01 1.25-.19.21-.38.24-.7.08-.32-.15-1.35-.49-2.57-1.56-.95-.83-1.59-1.86-1.78-2.17-.19-.31-.02-.48.14-.63.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.54-.08-.15-.71-1.69-.97-2.31-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.54.08-.82.39-.29.31-1.09 1.05-1.09 2.56s1.12 2.97 1.27 3.18c.15.21 2.2 3.32 5.33 4.66.75.32 1.33.51 1.78.65.75.23 1.43.2 1.97.12.6-.09 1.9-.77 2.17-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.36Z"/></svg>
                    </span>
                    <span style={{fontSize:13, fontWeight:700, color:'var(--site-text)'}}>{storeConfig.phoneDisplay}</span>
                  </a>
                  <a href={storeConfig.instagramUrl} target="_blank" rel="noopener" style={{display:'flex', alignItems:'center', gap:10, padding:'0 16px', height:48, borderRadius:12, border:'1px solid var(--site-border)', background:'var(--site-panel)', textDecoration:'none', flex:1}}>
                    <span style={{width:32, height:32, borderRadius:999, background:'var(--site-panel-soft)', border:'1px solid var(--site-border)', display:'grid', placeItems:'center', flexShrink:0, color:'var(--site-text)'}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </span>
                    <span style={{fontSize:13, fontWeight:700, color:'var(--site-text)'}}>{storeConfig.instagramHandle}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media(min-width:768px){
          .contact-page section{padding:80px 0 !important}
          .contact-page h1{font-size:52px !important}
        }
        @media(min-width:640px){
          .contact-page .contato-shell{padding:0 24px !important}
          .contato-form-card{padding:32px !important}
        }
        @media(min-width:1024px){
          .contact-page .contato-main-grid{gap:64px !important}
        }
        @media(max-width:1023px){
          .contato-main-grid{grid-template-columns:1fr !important; gap:40px !important}
        }
        @media(max-width:640px){
          .contato-direct-grid{grid-template-columns:1fr !important}
        }
      `}</style>
    </main>
  )
}
