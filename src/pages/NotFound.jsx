import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <main style={{paddingTop:'var(--mobile-header-height)', minHeight:'calc(100vh - 200px)', display:'grid', placeItems:'center', background:'var(--site-bg)'}}>
      <section className="site-shell" style={{width:'100%', padding:'clamp(56px,10vh,96px) 0 clamp(48px,8vh,80px)', textAlign:'center'}}>
        <div style={{maxWidth:640, margin:'0 auto', position:'relative'}}>
          <p aria-hidden="true" style={{
            fontSize:'clamp(84px, 22vw, 200px)',
            fontWeight:900,
            lineHeight:0.85,
            letterSpacing:'-0.06em',
            margin:0,
            background:'linear-gradient(180deg, color-mix(in srgb, var(--site-orange) 22%, transparent) 0%, transparent 70%)',
            WebkitBackgroundClip:'text',
            backgroundClip:'text',
            color:'transparent',
            WebkitTextStroke:'1px color-mix(in srgb, var(--site-orange) 18%, transparent)',
            opacity:0.9,
            userSelect:'none',
          }}>404</p>

          <div style={{marginTop:'-12px', position:'relative'}}>
            <p className="section-kicker" style={{justifyContent:'center', display:'flex'}}>ERRO 404</p>
            <h1 style={{fontSize:'clamp(28px, 5vw, 42px)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1, color:'var(--site-text)', marginTop:12}}>Página não encontrada.</h1>
            <p style={{fontSize:16, lineHeight:1.6, color:'var(--site-muted)', maxWidth:'42ch', margin:'16px auto 0'}}>A página que você tentou acessar não existe ou pode ter sido movida.</p>

            <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginTop:28}}>
              <Link to="/" className="btn-primary" style={{textDecoration:'none', height:44, padding:'0 22px', fontSize:14}}>Voltar para o início</Link>
              <Link to="/loja" className="btn-ghost" style={{textDecoration:'none', height:44, padding:'0 22px', fontSize:14, background:'var(--site-panel)', border:'1px solid var(--site-border)'}}>Ir para a loja</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
