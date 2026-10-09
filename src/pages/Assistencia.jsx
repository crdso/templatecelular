import { storeConfig } from '../config/store.js'
import { whatsappUrl, defaultWhatsappMessage } from '../config/store.js'
import { Link } from 'react-router-dom'
import './Assistencia.css'

const CHECKS = [
  'Falhas de tela, vidro ou toque',
  'Problemas de bateria e carregamento',
  'Quedas, umidade e danos físicos',
  'Lentidão, travamentos ou falhas de software',
]

const FAQS = [
  { q: `A ${storeConfig.name} conserta diferentes modelos de celular?`, a: 'Sim. Atendemos diversos modelos com diagnóstico em bancada e peças compatíveis de qualidade.' },
  { q: 'O orçamento é informado antes do reparo?', a: 'Sim. Você recebe o diagnóstico e o orçamento antes de autorizar qualquer troca de peça.' },
  { q: 'Como pedir uma avaliação?', a: 'Traga o aparelho na loja ou chame no WhatsApp para triagem rápida. Prazos e valores dependem do modelo e do diagnóstico.' },
]

export default function Assistencia(){
  return (
    <main className="assist-page" style={{ paddingTop: 'var(--mobile-header-height)' }}>
      <section className="assist-hero">
        <div className="site-shell assist-hero-grid">
          <div className="assist-hero-copy">
            <p className="section-kicker">Assistência {storeConfig.name}</p>
            <h1>Assistência técnica para seu celular</h1>
            <p className="assist-lead">Seu aparelho é avaliado antes de qualquer troca de peça. Você entende o problema, recebe a orientação adequada e decide com clareza.</p>
            <div className="assist-actions">
              <a href={whatsappUrl(defaultWhatsappMessage())} target="_blank" rel="noopener noreferrer" className="assist-btn assist-btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.06 0 11.29c0 2.07.6 4.03 1.66 5.74L0 24l7.2-1.6A12.3 12.3 0 0 0 12 22.58c6.63 0 12-5.06 12-11.29S18.63 0 12 0Zm5.8 7.68c-.32-.15-1.9-.93-2.2-1.04-.29-.11-.5-.15-.71.15-.21.3-.82 1.04-1.01 1.25-.19.21-.38.24-.7.08-.32-.15-1.35-.49-2.57-1.56-.95-.83-1.59-1.86-1.78-2.17-.19-.31-.02-.48.14-.63.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.54-.08-.15-.71-1.69-.97-2.31-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.54.08-.82.39-.29.31-1.09 1.05-1.09 2.56s1.12 2.97 1.27 3.18c.15.21 2.2 3.32 5.33 4.66.75.32 1.33.51 1.78.65.75.23 1.43.2 1.97.12.6-.09 1.9-.77 2.17-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.36Z" /></svg>
                Pedir diagnóstico pelo WhatsApp
              </a>
              <Link to="/contato" className="assist-btn assist-btn-secondary">Ver contatos</Link>
            </div>
          </div>
          <figure className="assist-hero-media">
            <div className="demo-repair-visual"><span aria-hidden="true">✦</span><h2>Cuidado em cada detalhe.</h2><p>Diagnóstico, reparo e atenção ao seu aparelho.</p><small>Serviços demonstrativos · consulte condições</small></div>
          </figure>
        </div>
      </section>

      <section className="assist-body site-shell">
        <div className="assist-article">
          <section className="assist-content-section">
            <h2>Quando procurar uma assistência técnica</h2>
            <p>Tela quebrada, toque falhando, bateria descarregando rápido, aparelho aquecendo ou dificuldade para carregar são sinais que merecem uma avaliação técnica.</p>
            <ul className="assist-check-list" aria-label="Sinais para procurar assistência">
              {CHECKS.map((t) => (
                <li key={t}>
                  <svg className="assist-check-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="assist-content-section">
            <h2>Como funciona o atendimento</h2>
            <p>A equipe recebe o aparelho, registra o relato e faz o diagnóstico. A recomendação considera o defeito encontrado e a viabilidade do reparo.</p>
            <p>Prazos, garantia e valores dependem do modelo e do diagnóstico. A confirmação é feita antes da execução do serviço.</p>
          </section>

          <section className="assist-content-section">
            <p className="section-kicker">Dúvidas frequentes</p>
            <h2>Perguntas sobre assistência técnica de celulares</h2>
            <div className="assist-faq-list">
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q} <span>+</span></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="assist-related" aria-label="Próximos passos">
          <p className="section-kicker">Continue explorando</p>
          <h2>Próximos passos</h2>
          <div className="assist-related-links">
            <Link to={`/contato?assunto=${encodeURIComponent('Troca de tela de iPhone')}&mensagem=${encodeURIComponent('Olá! Quero um orçamento para troca de tela de iPhone. Meu aparelho está com problema na tela/vidro. Podem me orientar?')}`} className="assist-related-card">Troca de tela de iPhone<span>→</span></Link>
            <Link to={`/contato?assunto=${encodeURIComponent('Troca de bateria de iPhone')}&mensagem=${encodeURIComponent('Olá! Quero um orçamento para troca de bateria de iPhone. A bateria do meu aparelho está descarregando rápido. Podem me orientar?')}`} className="assist-related-card">Troca de bateria de iPhone<span>→</span></Link>
            <Link to={`/contato?assunto=${encodeURIComponent('Falha no carregamento')}&mensagem=${encodeURIComponent('Olá! Preciso de ajuda com falha no carregamento do meu iPhone. O aparelho não está carregando corretamente. Podem me orientar?')}`} className="assist-related-card">Falha no carregamento<span>→</span></Link>
          </div>
        </aside>
      </section>
    </main>
  )
}
