import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'store_cookie_consent'

export default function CookieBanner(){
  const [visible,setVisible]=useState(false)

  useEffect(()=>{
    try{
      const v = localStorage.getItem(KEY)
      if(v !== 'accepted' && v !== 'rejected'){
        // small delay to avoid flicker
        const t = setTimeout(()=> setVisible(true), 400)
        return ()=> clearTimeout(t)
      }
    }catch{}
  },[])

  const choose = (value)=>{
    try{ localStorage.setItem(KEY, value) }catch{}
    setVisible(false)
  }

  if(!visible) return null

  return (
    <div style={{
      position:'fixed',
      left:16,
      bottom:16,
      zIndex:70,
      maxWidth:360,
      width:'calc(100% - 32px)',
      background:'var(--site-panel)',
      border:'1px solid var(--site-border)',
      borderRadius:16,
      padding:16,
      boxShadow:'0 12px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.08)',
      display:'grid',
      gap:12
    }}>
      <p style={{fontSize:13, lineHeight:1.5, color:'var(--site-text)'}}>
        Salvamos neste navegador as preferências de tema e o carrinho demonstrativo. Não usamos rastreamento ou publicidade.
        {' '}<Link to="/politica-de-privacidade" style={{color:'var(--site-orange)', fontWeight:700, textDecoration:'underline', textUnderlineOffset:2}}>Política de Privacidade</Link>
      </p>
      <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
        <button onClick={()=>choose('accepted')} style={{
          flex:'1 1 140px',
          height:38,
          borderRadius:999,
          border:'none',
          background:'var(--site-orange)',
          color:'#fff',
          fontWeight:700,
          fontSize:13,
          cursor:'pointer',
          transition:'background .18s, transform .18s'
        }} onMouseEnter={e=>e.currentTarget.style.background='var(--site-orange-hover)'} onMouseLeave={e=>e.currentTarget.style.background='var(--site-orange)'}>
          Concordo
        </button>
        <button onClick={()=>choose('rejected')} style={{
          flex:'1 1 140px',
          height:38,
          borderRadius:999,
          border:'1px solid var(--site-border)',
          background:'var(--site-panel-soft)',
          color:'var(--site-text)',
          fontWeight:600,
          fontSize:13,
          cursor:'pointer'
        }}>
          Recusar não essenciais
        </button>
      </div>
    </div>
  )
}

