import { checkoutUrl } from '../config/checkout.js'
import { useEffect, useEffectEvent, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatBRL } from '../data/catalog.js'
import './CartDrawer.css'

export default function CartDrawer(){
  const {items,count,subtotal,open,closeCart,updateQty,removeItem}=useCart()
  const checkout=checkoutUrl(items)
  const panel=useRef(null)
  const closeFromKeyboard=useEffectEvent(closeCart)
  useEffect(()=>{
    if(!open)return
    const previous=document.activeElement
    const previousOverflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    panel.current?.querySelector('button')?.focus()
    const onKey=e=>{
      if(e.key==='Escape'){e.preventDefault();closeFromKeyboard()}
      if(e.key!=='Tab')return
      const nodes=[...panel.current.querySelectorAll('button:not(:disabled),a[href]')]
      const first=nodes[0],last=nodes.at(-1)
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}
      if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}
    }
    document.addEventListener('keydown',onKey)
    return ()=>{document.body.style.overflow=previousOverflow;document.removeEventListener('keydown',onKey);previous?.focus()}
  },[open])
  if(!open)return null
  return <div className="cart-overlay is-open" onClick={closeCart}>
    <div className="cart-panel" ref={panel} role="dialog" aria-modal="true" aria-label="Carrinho" onClick={e=>e.stopPropagation()}>
      <div className="cart-head"><div><p className="cart-kicker">Seu pedido</p><h3>Carrinho{count>0?' • '+count:''}</h3></div><button type="button" className="cart-close" onClick={closeCart} aria-label="Fechar carrinho">✕</button></div>
      <div className="cart-contents">
        {items.length===0?<div className="cart-empty"><p>Seu carrinho está vazio.</p><span>Explore a loja para escolher seus produtos.</span><Link to="/loja" onClick={closeCart} className="btn-primary">Ver loja</Link></div>:items.map(i=><div key={i.variantId} className="cart-item">
          <div className="cart-item-media"><img src={i.image} alt={i.name} decoding="async" /></div>
          <div className="cart-item-copy"><p className="cart-item-name">{i.name}</p>{i.variantLabel&&<p className="cart-item-variant">{i.variantLabel}</p>}<strong className="cart-item-price">{formatBRL(i.price)}</strong>
            <div className="cart-item-controls"><div className="cart-qty"><button type="button" onClick={()=>updateQty(i.variantId,i.quantity-1)} aria-label="Diminuir quantidade do item">−</button><span>{i.quantity}</span><button type="button" disabled={i.quantity>=i.maxQuantity} onClick={()=>updateQty(i.variantId,i.quantity+1)} aria-label="Aumentar quantidade do item">＋</button></div><button type="button" onClick={()=>removeItem(i.variantId)} className="cart-remove">Remover</button></div>
          </div>
        </div>)}
      </div>
      <div className="cart-review"><div className="cart-subtotal"><span>Total demonstrativo</span><strong>{formatBRL(subtotal)}</strong></div>{checkout?<a className="btn-primary cart-checkout" href={checkout} target="_blank" rel="noopener noreferrer">Finalizar pedido</a>:<button type="button" disabled className="cart-checkout-pending">Finalizar pedido</button>}<p>Orçamento pelo WhatsApp. Valores demonstrativos.</p><small>Revise seus itens. Nenhum pedido ou pagamento foi realizado.</small></div>
    </div>
  </div>
}
