import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { storeConfig } from './src/config/store.js'
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
export default defineConfig({plugins:[react(),{
 name:'store-metadata',
 transformIndexHtml(html){
  return html.replace(/<title>.*?<\/title>/,'<title>'+escape(storeConfig.name)+' | Tecnologia e celulares</title>')
   .replace(/(<meta name="description" content=")[^"]*/,'$1'+escape(storeConfig.seoDescription))
   .replace(/(<link rel="icon" type="image\/png" href=")[^"]*/,'$1'+escape(storeConfig.favicon))
   .replace('</head>','<meta property="og:title" content="'+escape(storeConfig.name)+' | Tecnologia e celulares"/><meta property="og:description" content="'+escape(storeConfig.seoDescription)+'"/><meta property="og:image" content="'+escape(storeConfig.logo)+'"/></head>')
 }
}]})
