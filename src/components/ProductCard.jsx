import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { canAddProduct, formatBRL } from '../data/catalog.js'
import './ProductCard.css'

export default function ProductCard({product}){
  const {addItem}=useCart()
  const href='/loja/produto/'+product.slug
  const hasPrice=!product.priceNeedsReview&&Number.isFinite(product.price)&&product.price>0
  const compare=null
  const discount=compare?Math.round((1-product.price/compare)*100):0
  const media=product.media?.[0]
  const details=product.requiresOptions||!hasPrice
  return <article className="product-card">
    <div className="product-card-media"><img src={media?.thumbnail||product.images[0]} alt={product.name} width={media?.thumbWidth||480} height={media?.thumbHeight||480} loading="lazy" decoding="async" /></div>
    <div className="product-card-body">
      <div className="product-card-eyebrow">{product.marca&&<span>{product.marca}</span>}{product.marca&&product.condition&&<span aria-hidden="true">·</span>}{product.condition&&<span>{product.condition}</span>}</div>
      <h3 className="product-card-title"><Link to={href} className="product-card-link"><span>{product.name}</span></Link></h3>
      <div className="product-card-price">
        <div className="product-price-before">{compare&&<del className="price-compare">{formatBRL(compare)}</del>}{discount>0&&<span className="product-discount">{discount}% OFF</span>}</div>
        <span className="product-price-prefix">{product.requiresOptions&&hasPrice?'Valor demonstrativo · a partir de':'Valor demonstrativo'}</span>
        <strong className={hasPrice?'price-main':'price-main is-unconfirmed'}>{hasPrice?formatBRL(product.price):'Consultar preço'}</strong>
      </div>
      {details?<Link to={href} className="store-add-button">{product.variationsIncomplete||!hasPrice?'Ver detalhes':'Escolher opções'}</Link>:<button type="button" className="store-add-button" disabled={!canAddProduct(product)} onClick={()=>addItem(product,null,1)}><ShoppingCart size={15} aria-hidden="true" /><span>{canAddProduct(product)?'Adicionar ao carrinho':'Indisponível'}</span></button>}
    </div>
  </article>
}

