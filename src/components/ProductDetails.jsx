import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { canAddProduct, departments, formatBRL } from '../data/catalog.js'
import './ProductDetails.css'
import './ProductCard.css'

const formatOption = value => value.replace(/(\d+)\s*(gb|tb)/ig, (_, number, unit) => number+' '+unit.toUpperCase()).replace(/^./, character => character.toUpperCase())

export default function ProductDetails({product,onClose}){
  const {addItem}=useCart()
  const [selection,setSelection]=useState({})
  const [image,setImage]=useState(product.images[0])
  const [qty,setQty]=useState(1)
  const variant=product.variants.find(v=>v.attributes.length>0&&v.attributes.every(a=>selection[a.name]===a.value))
  const groups=[...new Set(product.variants.flatMap(v=>v.attributes.map(a=>a.name)))]
  const price=variant?variant.price:product.price
  const compare=0
  const hasPrice=!product.priceNeedsReview&&Number.isFinite(price)&&price>0
  const discount=hasPrice&&compare>price?Math.round((1-price/compare)*100):0
  const enabled=canAddProduct(product,variant)
  const max=variant?.stock??product.stock??99
  const images=[...new Set([...product.images,...product.variants.map(v=>v.image).filter(Boolean)])]
  const current=images.indexOf(image)
  const metadata=product.media?.find(m=>m.src===image)
  const department=departments.find(d=>d.slug===product.department)
  const imageRatio=(metadata?.width||800)/(metadata?.height||800)
  function choose(name,value){
    const next={...selection,[name]:value}
    setSelection(next)
    const match=product.variants.find(v=>v.attributes.every(a=>next[a.name]===a.value))
    setImage(match?.image??product.images[0]);setQty(1)
  }
  return <>
    <div className="modal-media">
      <div className="product-gallery">
        <div className="product-gallery-stage" style={{'--gallery-ratio':Math.max(.75,Math.min(1.8,imageRatio))}}>
          <img key={image} className="product-gallery-main" src={image} alt={product.name+' — imagem '+(current+1)} width={metadata?.width||800} height={metadata?.height||800} decoding="async" />
          {images.length>1&&<><button type="button" className="gallery-arrow is-prev" aria-label="Imagem anterior" onClick={()=>setImage(images[(current-1+images.length)%images.length])}><ChevronLeft size={20} /></button><button type="button" className="gallery-arrow is-next" aria-label="Próxima imagem" onClick={()=>setImage(images[(current+1)%images.length])}><ChevronRight size={20} /></button><span className="gallery-counter">{current+1} / {images.length}</span></>}
        </div>
        {images.length>1&&<div className="product-thumbnails" aria-label="Galeria do produto">{images.map((src,index)=>{const m=product.media?.find(item=>item.src===src);return <button type="button" key={src} className={image===src?'is-selected':''} onClick={()=>setImage(src)} aria-label={'Ver imagem '+(index+1)} aria-pressed={image===src}><img src={m?.thumbnail||src} alt="" width="72" height="72" loading="lazy" decoding="async" /></button>})}</div>}
        <p className="gallery-caption">Confira a cor e os detalhes da unidade com a equipe.</p>
      </div>
    </div>
    <div className="product-detail-copy">
      <div className="product-detail-heading">
        <div><p className="product-detail-eyebrow">{product.marca||department?.name}{product.condition?' · '+product.condition:''}</p><h1>{product.name}</h1></div>
      </div>
      {onClose&&<Link to={'/loja/produto/'+product.slug} onClick={onClose} className="product-detail-link">Abrir página completa →</Link>}
      <p className="product-text product-summary">{product.short}</p>
      <div className="product-buy-box">
        <div className="product-detail-price">
          {discount>0&&<div className="product-detail-old-price"><del>{formatBRL(compare)}</del><span className="product-discount">{discount}% OFF</span></div>}
          {product.requiresOptions&&!variant&&<small>A partir de</small>}
          <small>Valor demonstrativo</small><strong>{hasPrice?formatBRL(price):'Consultar preço'}</strong>
        </div>
        {groups.map(name=><fieldset className="product-options" key={name}><legend>{name}{selection[name]&&<span>: {formatOption(selection[name])}</span>}</legend><div>{[...new Set(product.variants.flatMap(v=>v.attributes.filter(a=>a.name===name).map(a=>a.value)))].map(value=>{
          const possible=product.variants.some(v=>v.available!==false&&v.attributes.some(a=>a.name===name&&a.value===value)&&v.attributes.every(a=>a.name===name||!selection[a.name]||selection[a.name]===a.value))
          return <button key={value} type="button" disabled={!possible} aria-pressed={selection[name]===value} className={selection[name]===value?'is-selected':''} onClick={()=>choose(name,value)}>{formatOption(value)}</button>
        })}</div></fieldset>)}
        {product.variationsIncomplete&&<p className="product-option-notice">As opções e a disponibilidade precisam ser confirmadas com a equipe.</p>}
        {product.available===false||variant?.available===false?<p className="product-option-notice">Indisponível no catálogo de origem.</p>:null}
        <div className="product-quantity"><span>Quantidade</span><div className="cart-qty"><button type="button" aria-label="Diminuir quantidade" disabled={qty<=1} onClick={()=>setQty(n=>Math.max(1,n-1))}>−</button><span aria-live="polite">{qty}</span><button type="button" aria-label="Aumentar quantidade" disabled={qty>=Math.min(max,99)} onClick={()=>setQty(n=>Math.min(max,99,n+1))}>＋</button></div></div>
        <div className="product-purchase-actions"><button type="button" className="btn-primary" disabled={!enabled} onClick={()=>{if(addItem(product,variant,qty))onClose?.()}}><ShoppingBag size={18} /> Comprar</button><button type="button" className="product-add-secondary" disabled={!enabled} onClick={()=>{if(addItem(product,variant,qty))onClose?.()}}><ShoppingCart size={16} /> Adicionar ao carrinho</button></div>
        {product.requiresOptions&&!product.variationsIncomplete&&!variant&&<p className="product-option-notice">Selecione cor e armazenamento para confirmar o valor.</p>}
        {!hasPrice&&<p className="product-option-notice">Preço pendente de confirmação. Compra indisponível por enquanto.</p>}
      </div>
      {product.highlights?.length>0&&<section className="product-information"><h2>Destaques</h2><ul className="product-highlights">{product.highlights.map(item=><li key={item}>{item}</li>)}</ul></section>}
      {product.specs?.length>0&&<section className="product-information"><h2>Características principais</h2><dl className="product-specs">{product.specs.map(s=><div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl><p className="product-spec-caption">Dados do modelo; informações marcadas como “anunciadas” vêm do catálogo da loja.</p></section>}
      {product.notes?.length>0&&<section className="product-information product-notes"><h2>O que você precisa saber</h2>{product.notes.map(note=><p className="product-text" key={note}>{note}</p>)}</section>}
      {product.sku&&<p className="product-spec-caption">SKU: {product.sku}</p>}
    </div>
  </>
}
