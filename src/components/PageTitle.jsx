import { storeConfig } from '../config/store.js'
import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { products, categories, departments } from '../data/catalog.js'

const TITLES = {
  '/': 'SUALOJAAQUI | Tecnologia e celulares',
  '/loja': 'Loja | SUALOJAAQUI',
  '/assistencia': 'Assistência | SUALOJAAQUI',
  '/contato': 'Contato e unidades | SUALOJAAQUI',
  '/politica-de-privacidade': 'Política de Privacidade | SUALOJAAQUI',
}

function getTitle(pathname){
  const p = pathname.replace(/\/+$/, '') || '/'
  if(TITLES[p]) return TITLES[p]
  if(p.startsWith('/loja/produto/')){
    const product=products.find(item=>item.slug===decodeURIComponent(p.split('/').at(-1))&&!item.hidden)
    if(product)return `${product.name} | SUALOJAAQUI`
  }
  if(p.startsWith('/loja/categoria/')){
    const category=[...departments,...categories].find(item=>item.slug===p.split('/').at(-1))
    if(category)return `${category.name} | SUALOJAAQUI`
  }
  return '404 | SUALOJAAQUI'
}

export default function PageTitle(){
  const { pathname } = useLocation()
  const title = getTitle(pathname)
  useLayoutEffect(()=>{
    document.title = title.replaceAll('SUALOJAAQUI',storeConfig.name)
  },[title])
  useEffect(()=>{
    document.title = title.replaceAll('SUALOJAAQUI',storeConfig.name)
  },[title])
  useEffect(()=>{document.documentElement.style.setProperty('--site-orange',storeConfig.primaryColor)},[])
  return null
}

