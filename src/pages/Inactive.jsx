import { storeConfig } from '../config/store.js'
import { whatsappUrl, defaultWhatsappMessage } from '../config/store.js'
import './Inactive.css'

export default function Inactive(){
  return (
    <div className="store-inactive">
      <div className="store-inactive-bg" aria-hidden="true" />
      <div className="store-inactive-glow" aria-hidden="true" />

      <main className="store-inactive-main">
        <div className="store-inactive-brand ia-reveal ia-d1">
          <img src={storeConfig.logo} alt={""+storeConfig.name+""} width="44" height="44" />
          <span>{storeConfig.name}</span>
        </div>

        <h1 className="store-inactive-title ia-reveal ia-d2">Projeto demonstrativo</h1>

        <p className="store-inactive-subtitle ia-reveal ia-d3">
          Esta demonstração não está atualmente em&nbsp;operação.
        </p>

        <span className="store-inactive-divider ia-reveal ia-d3" aria-hidden="true" />

        <p className="store-inactive-note ia-reveal ia-d4">
          Desenvolvido como conceito de experiência digital para a SUALOJAAQUI.
        </p>

        <div className="store-inactive-contact ia-reveal ia-d5">
          <a
            href={whatsappUrl(defaultWhatsappMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="store-inactive-cta"
            aria-label="Entrar em contato via WhatsApp com o desenvolvedor do projeto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.06 0 11.29c0 2.07.6 4.03 1.66 5.74L0 24l7.2-1.6A12.3 12.3 0 0 0 12 22.58c6.63 0 12-5.06 12-11.29S18.63 0 12 0Zm0 20.52a10.3 10.3 0 0 1-5.25-1.42l-.38-.22-4.27.95.91-3.93-.26-.42A10.2 10.2 0 0 1 1.9 11.29C1.9 6.08 6.48 1.8 12 1.8S22.1 6.08 22.1 11.29 17.52 20.52 12 20.52Zm5.8-7.68c-.32-.15-1.9-.93-2.2-1.04-.29-.11-.5-.15-.71.15-.21.3-.82 1.04-1.01 1.25-.19.21-.38.24-.7.08-.32-.15-1.35-.49-2.57-1.56-.95-.83-1.59-1.86-1.78-2.17-.19-.31-.02-.48.14-.63.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.54-.08-.15-.71-1.69-.97-2.31-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.54.08-.82.39-.29.31-1.09 1.05-1.09 2.56s1.12 2.97 1.27 3.18c.15.21 2.2 3.32 5.33 4.66.75.32 1.33.51 1.78.65.75.23 1.43.2 1.97.12.6-.09 1.9-.77 2.17-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.36Z" />
            </svg>
            Entrar em contato
          </a>
          <span className="store-inactive-cta-hint">Contato com o desenvolvedor do projeto</span>
        </div>
      </main>

      <footer className="store-inactive-footer ia-reveal ia-d6">
        Projeto demonstrativo • Site não operacional
      </footer>
    </div>
  )
}
