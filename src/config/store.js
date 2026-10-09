export const storeConfig = {
 name: 'SUALOJAAQUI', whatsapp: '5563991399775', phoneDisplay: '(63) 99139-9775',
 instagramUrl: 'https://instagram.com/xxxxxxxxxxx', instagramHandle: '@SEUINSTAGRAM',
 instagramPosts: '500', instagramFollowers: '50,1 mil', instagramFollowing: '100',
 instagramImages: Array.from({length:6}, (_,i)=>'/instagram/post'+(i+1)+'.jpg'),
 logo: '/branding/logo-exemplo.png', favicon: '/branding/favicon.png', demoMode: true,
 hours: 'Segunda a sexta, 9h às 18h; sábado, 9h às 13h (horário ilustrativo).',
 emailLabel: 'E-mail de atendimento: a configurar',
 description: 'Tecnologia, iPhones e assistência técnica. Demonstração personalizável para sua loja.',
 seoDescription: 'Explore modelos de iPhone e serviços de assistência. Catálogo, preços e informações demonstrativos.',
 primaryColor: '#f97316',
 units: [
 {name:'Unidade exemplo 01',address:'Rua Exemplo, 123 — Centro',city:'Cidade Exemplo — UF'},
 {name:'Unidade exemplo 02',address:'Avenida Modelo, 456 — Bairro Exemplo',city:'Cidade Modelo — UF'}
 ]
}
export const whatsappUrl = message => 'https://wa.me/'+storeConfig.whatsapp+(message?'?text='+encodeURIComponent(message):'')
export const defaultWhatsappMessage = () => 'Olá! Gostaria de saber mais sobre a '+storeConfig.name+'. Contato pelo site demonstrativo.'
