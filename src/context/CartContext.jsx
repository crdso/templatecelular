import { createContext,useContext,useEffect,useMemo,useState } from 'react'
import { products, makeCartItem } from '../data/catalog.js'

const KEY='store_cart_v2'
const Ctx=createContext(null)
function load(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||'[]')
    if(!Array.isArray(saved))return []
    return saved.map(item=>{
      const product=products.find(p=>p.id===item.productId)
      const variant=item.variationId?product?.variants.find(v=>v.id===item.variationId):null
      if(item.variationId&&!variant)return null
      return makeCartItem(product,variant,item.quantity)
    }).filter(Boolean)
  }catch{return []}
}
export function CartProvider({children}){
  const [items,setItems]=useState(load)
  const [open,setOpen]=useState(false)
  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(items))}catch{}},[items])
  const value=useMemo(()=>({
    items,open,count:items.reduce((sum,i)=>sum+i.quantity,0),subtotal:items.reduce((sum,i)=>sum+i.price*i.quantity,0),
    openCart:()=>setOpen(true),closeCart:()=>setOpen(false),
    addItem:(product,variant,qty=1)=>{
      const item=makeCartItem(product,variant,qty)
      if(!item)return false
      setItems(prev=>prev.some(i=>i.variantId===item.variantId)?prev.map(i=>i.variantId===item.variantId?{...item,quantity:Math.min(item.maxQuantity,i.quantity+item.quantity)}:i):[...prev,item])
      setOpen(true);return true
    },
    updateQty:(id,qty)=>{if(qty<=0)setItems(prev=>prev.filter(i=>i.variantId!==id));else setItems(prev=>prev.map(i=>i.variantId===id?{...i,quantity:Math.max(1,Math.min(i.maxQuantity,Math.floor(qty)))}:i))},
    removeItem:id=>setItems(prev=>prev.filter(i=>i.variantId!==id)),clear:()=>setItems([]),
  }),[items,open])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export function useCart(){const value=useContext(Ctx);if(!value)throw Error('useCart missing provider');return value}
