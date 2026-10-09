import products from './catalog-runtime.json' with { type: 'json' }

export { products }
export const departments = [{slug:'smartphones',name:'iPhones'}]

export const visibleProducts = products.filter(p => !p.hidden)
export const isIPhone = product => /^iphone\b/i.test(product.name)
function featuredRank(product){
  if(isIPhone(product))return 0
  if(product.department==='smartphones')return 1
  if(product.department==='wearables')return 2
  if(['audio','informatica','games','casa'].includes(product.department))return 3
  return 4
}
export function compareFeatured(a,b){
  const rank=featuredRank(a)-featuredRank(b)
  if(rank)return rank
  if(isIPhone(a)&&isIPhone(b)){
    const model=p=>Number(p.name.match(/iphone\s*(\d+)/i)?.[1]||0)
    const tier=p=>/pro max/i.test(p.name)?2:/pro\b/i.test(p.name)?1:0
    const generation=model(b)-model(a)||tier(b)-tier(a)
    if(generation)return generation
  }
  return Number(!b.priceNeedsReview&&b.compareAt>b.price)-Number(!a.priceNeedsReview&&a.compareAt>a.price)
}
export const categories = [...new Map(visibleProducts.flatMap(p=>p.categories).map(c=>[c.slug,c])).values()]
export const normalizeSearch = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/(\d)\s+(gb|tb)\b/g,'$1$2').replace(/[^\p{L}\p{N}]+/gu,' ').trim()
export function searchProducts(list, query){
  const terms=normalizeSearch(query).split(' ').filter(Boolean)
  return list.filter(p=>{
    const searchable=normalizeSearch([p.name,p.originalName,p.marca,p.sku,...p.categories.map(c=>c.name),...p.attributes.flatMap(a=>a.terms?.map(t=>t.name)??[]),...p.variants.map(v=>v.label),...p.specs.flatMap(s=>[s.label,s.value])].filter(Boolean).join(' '))
    return terms.every(t=>searchable.includes(t))
  })
}
export function filterProducts({query='',category='todos',sort='relevancia',availability='todos'}={}){
  let list=searchProducts(visibleProducts,query)
  if(category!=='todos')list=list.filter(p=>departments.some(d=>d.slug===category)?p.department===category:p.categories.some(c=>c.slug===category))
  if(availability==='disponiveis')list=list.filter(p=>p.available===true)
  if(availability==='promocao')list=list.filter(p=>!p.priceNeedsReview&&p.compareAt>p.price)
  if(sort==='relevancia')list=[...list].sort(compareFeatured)
  if(sort==='nome')list=[...list].sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'))
  if(sort==='menor'||sort==='maior')list=[...list].sort((a,b)=>a.priceNeedsReview||a.price<=0||a.price==null?(b.priceNeedsReview||b.price<=0||b.price==null?0:1):b.priceNeedsReview||b.price<=0||b.price==null?-1:(sort==='menor'?a.price-b.price:b.price-a.price))
  return list
}
export const formatBRL = cents => Number.isFinite(cents) ? (cents/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) : 'Consultar preço'
export function canAddProduct(product,variant){
  if(!product||!products.some(p=>p.id===product.id)||!isIPhone(product)||product.hidden||product.priceNeedsReview||product.available===false||product.purchasable===false)return false
  if(product.variationsIncomplete)return false
  if(product.requiresOptions&&(!variant||product.variationsIncomplete))return false
  if(variant&&!product.variants.some(v=>v.id===variant.id))return false
  if(variant?.available===false)return false
  const price=variant?variant.price:product.price
  const stock=variant?.stock??product.stock
  return Number.isInteger(price)&&price>0&&(stock==null||stock>0)
}
export function makeCartItem(product,variant,quantity=1){
  if(!canAddProduct(product,variant))return null
  const limit=variant?.stock??product.stock??99
  return {productId:product.id,variationId:variant?.id??null,variantId:`${product.id}:${variant?.id??'simple'}`,productSlug:product.slug,name:product.name,variantLabel:variant?.label??'',image:variant?.image??product.images[0],price:variant?variant.price:product.price,quantity:Math.max(1,Math.min(limit,99,Math.floor(Number(quantity)||1))),maxQuantity:Math.min(limit,99)}
}
