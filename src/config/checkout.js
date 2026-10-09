import { products, makeCartItem, formatBRL } from '../data/catalog.js'
import { storeConfig, whatsappUrl } from './store.js'
export function checkoutUrl(items){
 if(!items.length)return null
 const valid=items.map(item=>{const product=products.find(p=>p.id===item.productId);const variant=item.variationId?product?.variants.find(v=>v.id===item.variationId):null;return makeCartItem(product,variant,item.quantity)})
 if(valid.some((item,i)=>!item||item.quantity!==items[i].quantity))return null
 const rows=valid.map((item,i)=>'PRODUTO '+(i+1)+'\n'+item.name+(item.variationId?'\n'+products.find(p=>p.id===item.productId).variants.find(v=>v.id===item.variationId).attributes.map(a=>(/mem[oó]ria|armazenamento/i.test(a.name)?'Armazenamento':a.name)+': '+a.value).join('\n'):'')+'\nQuantidade: '+item.quantity+'\nValor demonstrativo unitário: '+formatBRL(item.price)+'\nSubtotal demonstrativo: '+formatBRL(item.price*item.quantity))
 const total=valid.reduce((sum,item)=>sum+item.price*item.quantity,0)
 return whatsappUrl('Olá! Gostaria de solicitar um orçamento para os seguintes itens da '+storeConfig.name+':\n\n'+rows.join('\n\n')+'\n\nTOTAL DEMONSTRATIVO: '+formatBRL(total)+'\n\nPedido demonstrativo enviado pelo site.')
}
