import { useEffect,useRef } from 'react'
import ProductDetails from './ProductDetails.jsx'

export default function ProductModal({product,onClose}){
  const panel=useRef(null)
  useEffect(()=>{
    const previous=document.activeElement
    const overflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    panel.current?.focus()
    const key=e=>{
      if(e.key==='Escape')onClose()
      if(e.key==='Tab'){
        const nodes=[...panel.current.querySelectorAll('a[href],button:not(:disabled),input,select,[tabindex="0"]')]
        const first=nodes[0],last=nodes.at(-1)
        if(e.shiftKey&&(document.activeElement===first||document.activeElement===panel.current)){e.preventDefault();last?.focus()}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}
      }
    }
    document.addEventListener('keydown',key)
    return ()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',key);previous?.focus()}
  },[onClose])
  if(!product)return null
  return <div className="modal-overlay" onClick={onClose}><div className="modal-dialog-shell" role="dialog" aria-modal="true" aria-label={product.name} ref={panel} tabIndex={-1} onClick={e=>e.stopPropagation()}><button type="button" className="modal-dismiss" onClick={onClose} aria-label="Fechar produto">✕</button><div className="modal-card"><ProductDetails product={product} onClose={onClose} key={product.id} /></div></div></div>
}
