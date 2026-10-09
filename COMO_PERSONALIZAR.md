# Como personalizar o template

1. Edite `src/config/store.js`: nome, WhatsApp internacional (somente dígitos), telefone visual, Instagram, contadores, descrição, horários e unidades. O nome inicial é **SUALOJAAQUI**.
2. Substitua a imagem em `public/branding/logo-exemplo.png` e o favicon em `public/branding/favicon.png`, ou ajuste os caminhos na configuração. Preserve os desenhos e proporções da identidade fornecida pelo cliente.
3. Troque as seis imagens em `public/instagram/post1.jpg` até `post6.jpg`. Também é possível mudar `instagramImages` na configuração. Elas são uma grade estática, sem conexão a contas ou tokens.
4. Edite as unidades em `storeConfig.units`. Os exemplos atuais são fictícios e não possuem mapas.
5. O catálogo independente está em `src/data/catalog-runtime.json`; suas imagens ficam em `public/images/catalog`. Preços são inteiros em centavos. Não altere preços, disponibilidade ou variações sem dados confirmados. Quatro registros preservados possuem opções incompletas e continuam bloqueados para compra.
6. Depois de editar: `npm run build`, `npm run test:catalog` e `npm run lint`. Para conferir no navegador: `npm run preview -- --host 127.0.0.1 --port 4174` e, em outro terminal, `npm run test:browser`. Se a porta mudar, ajuste a variável `QA_URL`.
7. Títulos e metadados do build são gerados a partir da configuração central. O título também acompanha a navegação. O número é compartilhado entre CTAs e checkout; a mensagem do carrinho é montada em `src/config/checkout.js`.

Mantenha os avisos demonstrativos durante a prospecção. `demoMode` identifica a configuração; mudar somente essa flag não transforma o site em uma operação comercial nem remove avisos. Para uma loja contratada, adapte conteúdos, práticas de privacidade e condições reais antes de publicar.

Publique somente o conteúdo de `dist`, após autorização. Não envie backups, referências, relatórios internos, dados de extração ou a raiz inteira do projeto para hospedagem.

O teste de preservação compara o catálogo com a referência sanitizada em `scripts/fixtures/catalog-baseline.json`, sem precisar do backup privado. Ao substituir deliberadamente o catálogo para outra loja, atualize também a referência de validação e as contagens esperadas em `scripts/validate-store.mjs`.

Na prova social, substitua `public/proof/imagem-cliente.png` por conteúdo próprio ou autorizado. As repetições se ajustam à largura para manter o loop. As avaliações em `src/components/ProofSection.jsx` são exemplos fictícios; mantenha essa identificação durante a demonstração. Execute também `npm run test:components` com a prévia local ativa.
