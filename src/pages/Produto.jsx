import { Link,useParams } from 'react-router-dom'
import { products } from '../data/catalog.js'
import ProductDetails from '../components/ProductDetails.jsx'
import NotFound from './NotFound.jsx'

export default function Produto(){
  const {slug}=useParams()
  const product=products.find(p=>p.slug===slug&&!p.hidden)
  if(!product)return <NotFound />
  return <main className="product-page"><Link to="/loja">← Voltar à loja</Link><div className="product-page-card"><ProductDetails product={product} key={product.id} /></div></main>
}
