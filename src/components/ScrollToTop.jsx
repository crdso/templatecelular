import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop(){
  const { pathname } = useLocation()
  const previous = useRef(pathname)
  useEffect(()=>{
    const catalogPath = path => path === '/loja' || path.startsWith('/loja/categoria/')
    const preserve = catalogPath(previous.current) && catalogPath(pathname)
    previous.current = pathname
    if (!preserve) window.scrollTo({ top:0, left:0, behavior:'instant' })
  },[pathname])
  return null
}
