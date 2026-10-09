import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const url=process.env.QA_URL||'http://127.0.0.1:4174'
const out='qa-artifacts/restored-components'
await fs.mkdir(out,{recursive:true})
const browser=await chromium.launch({channel:'chrome',headless:true})
const results=[]
try{
 for(const [width,height] of [[1440,900],[768,1024],[390,844],[320,568]])for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width,height}})
  await context.addInitScript(theme=>{localStorage.setItem('store_theme',theme);localStorage.setItem('store_cookie_consent','rejected')},theme)
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(url)&&r.status()>=400)errors.push(r.status()+' '+r.url())})
  await page.goto(url+'/contato',{waitUntil:'domcontentloaded'});await page.locator('form').waitFor()
  const grid=await page.locator('.contato-main-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)
  assert.equal(grid,width>=1024?2:1)
  assert.equal(await page.locator('a[href*="maps"]').count(),0)
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))
  await page.getByRole('button',{name:'Enviar pelo WhatsApp'}).click();assert.ok(await page.locator('input').first().evaluate(e=>!e.validity.valid))
  await page.getByLabel('Seu Nome').fill('Visitante de teste')
  await page.getByLabel('Telefone / WhatsApp').fill('11999990000')
  await page.getByRole('combobox').selectOption('Compra de celular')
  await page.getByRole('textbox',{name:/Mensagem/}).fill('Quero comparar opções de iPhone & cores.')
  assert.ok(!(await page.locator('select').innerText()).includes('Moto'))
  await context.route('https://wa.me/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<title>Contato verificado</title>'}))
  const pending=page.waitForEvent('popup');await page.getByRole('button',{name:'Enviar pelo WhatsApp'}).click();const popup=await pending;await popup.waitForLoadState();const link=new URL(popup.url());assert.equal(link.pathname,'/5563991399775');const text=link.searchParams.get('text');for(const value of ['SUALOJAAQUI','Visitante de teste','11999990000','Compra de celular','iPhone & cores.','demonstrativo'])assert.ok(text.includes(value));await popup.close()
  await page.screenshot({path:path.join(out,width+'-'+theme+'-contact.png'),fullPage:true})
  await page.goto(url+'/contato?assunto=Troca%20de%20tela%20de%20iPhone&mensagem=Quero%20diagnostico',{waitUntil:'domcontentloaded'});await page.getByRole('combobox').waitFor();await page.waitForTimeout(150);assert.equal(await page.getByRole('combobox').inputValue(),'Troca de tela de iPhone');assert.equal(await page.getByRole('textbox',{name:/Mensagem/}).inputValue(),'Quero diagnostico')
  await page.goto(url+'/',{waitUntil:'domcontentloaded'});await page.locator('#prova-social').waitFor();await page.locator('#prova-social').scrollIntoViewIfNeeded();await page.mouse.move(0,0)
  const track=page.locator('.marquee__track')
  assert.equal(await page.getByRole('tab',{name:'Fotos de clientes',exact:true}).getAttribute('aria-selected'),'true')
  const photoCount=await page.locator('.marquee__item--photo').count();assert.ok(photoCount>=4&&photoCount<=8);assert.equal(photoCount%2,0);assert.ok(await page.locator('.marquee img').evaluateAll(es=>es.every(e=>e.getAttribute('src')==='/proof/imagem-cliente.png')))
  await page.locator('.marquee img').evaluateAll(imgs=>Promise.all(imgs.map(async i=>{i.loading='eager';await i.decode()})))
  const transform=()=>track.evaluate(e=>getComputedStyle(e).transform)
  const before=await transform();await page.waitForTimeout(250);assert.notEqual(await transform(),before)
  await page.locator('.marquee').hover();assert.equal(await track.evaluate(e=>getComputedStyle(e).animationPlayState),'paused');await page.mouse.move(0,0)
  // The end of a cycle must land exactly on the first duplicated card, including the 12px gap.
  const seam=await track.evaluate(e=>{const items=e.children,n=items.length/2;const distance=items[n].offsetLeft-items[0].offsetLeft;const animation=e.getAnimations()[0];const duration=animation.effect.getTiming().duration;animation.pause();animation.currentTime=duration-.01;const translation=-new DOMMatrixReadOnly(getComputedStyle(e).transform).m41;animation.play();return Math.abs(translation-distance)})
  assert.ok(seam<1,'seamless duplicated loop')
  await page.locator('#prova-social').screenshot({path:path.join(out,width+'-'+theme+'-photos.png')})
  await page.getByRole('tab',{name:'Avaliações',exact:true}).click();await page.mouse.move(0,0);assert.equal(await page.locator('.marquee__item--review').count(),18)
  const dimensions=await page.locator('.marquee__item--review').evaluateAll(es=>es.map(e=>({width:e.offsetWidth,height:e.offsetHeight,overflow:e.scrollHeight>e.clientHeight})));assert.ok(dimensions.every(d=>d.width>=280&&d.width<=320&&d.height>=264&&d.height<=280&&!d.overflow));assert.equal(new Set(dimensions.map(d=>d.height)).size,1)
  const stars=page.locator('.marquee__item--review').first().locator('svg');assert.equal(await stars.count(),5)
  for(const fill of await stars.evaluateAll(es=>es.map(e=>getComputedStyle(e).fill)))assert.ok(fill!=='none'&&fill!=='rgba(0, 0, 0, 0)')
  const reviewBefore=await transform();await page.waitForTimeout(250);assert.notEqual(await transform(),reviewBefore)
  await page.locator('#prova-social').screenshot({path:path.join(out,width+'-'+theme+'-reviews.png')})
  assert.ok((await page.locator('#prova-social').innerText()).includes('fictícios'))
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await track.evaluate(e=>getComputedStyle(e).animationName),'none');await page.emulateMedia({reducedMotion:'no-preference'})
  await page.locator('#instagram').scrollIntoViewIfNeeded();const avatar=await page.locator('.ig-avatar').evaluate(e=>({rect:e.getBoundingClientRect().toJSON(),radius:getComputedStyle(e).borderRadius,fit:getComputedStyle(e).objectFit}));assert.equal(avatar.radius,'50%');assert.equal(avatar.rect.width,avatar.rect.height);assert.equal(avatar.fit,'contain');assert.equal(await page.locator('#instagram .ig-tile img').count(),6)
  assert.equal(await page.getByRole('link',{name:'Seguir no Instagram',exact:true}).getAttribute('href'),'https://instagram.com/xxxxxxxxxxx')
  assert.ok((await page.locator('#instagram').innerText()).includes('@SEUINSTAGRAM'))
  for(const value of ['500','50,1 mil','100'])assert.ok((await page.locator('.demo-ig-stats').innerText()).includes(value))
  await page.locator('#instagram').screenshot({path:path.join(out,width+'-'+theme+'-instagram.png')})
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[])
  results.push({width,height,theme,passed:true});console.log(width+' '+theme+' restored components passed');await context.close()
 }
 await fs.writeFile(path.join(out,'results.json'),JSON.stringify({passed:true,results,contactPopup:true,animatedTabs:true,seamlessLoop:true,reducedMotion:true,circularAvatar:true},null,2))
}finally{await browser.close()}
