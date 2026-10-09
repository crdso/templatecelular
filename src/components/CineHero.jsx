import { storeConfig } from '../config/store.js'
import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

const CHAPTERS = [
  [0,0,0.11,0.16],
  [0.19,0.25,0.40,0.46],
  [0.46,0.52,0.67,0.73],
  [0.73,0.79,0.92,0.97],
]
const Y0 = 0.88

function smooth(e,a=0,i=1){return Math.min(i,Math.max(a,e))}
function ease(e){const a=smooth(e);return a*a*(3-2*a)}
function opacityFor(e,[a,i,o,l]){
  if(e<a||e>l) return 0
  const d=i>a?ease((e-a)/(i-a)):1
  const f=l>o?1-ease((e-o)/(l-o)):1
  return Math.min(d,f)
}

export default function CineHero(){
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const videoRef = useRef(null)
  const copyRef = useRef(null)
  const supportRef = useRef(null)
  const cueRef = useRef(null)
  const statusRef = useRef(null)
  const progressRef = useRef(0)
  const { theme } = useTheme()

  const sources = {
    dark: {
      desktop:'/video/SUALOJAAQUI-scroll/SUALOJAAQUI-scroll-desktop-dark.mp4',
      mobile:'/video/SUALOJAAQUI-scroll/SUALOJAAQUI-scroll-mobile-dark.mp4',
      poster:'/video/SUALOJAAQUI-scroll/SUALOJAAQUI-scroll-poster-dark.webp',
      final:'/video/SUALOJAAQUI-scroll/SUALOJAAQUI-scroll-final-dark.webp',
    },
    light: {
      desktop:'/video/SUALOJAAQUI-scroll/SUALOJAAQUI-scroll-desktop.mp4',
      mobile:'/video/SUALOJAAQUI-scroll/SUALOJAAQUI-scroll-mobile.mp4',
      poster:'/video/SUALOJAAQUI-scroll/SUALOJAAQUI-scroll-poster.webp',
      final:'/video/SUALOJAAQUI-scroll/SUALOJAAQUI-scroll-final.webp',
    }
  }
  const src = sources[theme] || sources.dark

  useEffect(()=>{
    const b = sectionRef.current
    const s = stageRef.current
    const j = videoRef.current
    if(!b||!s||!j) return
    const E = Array.from(copyRef.current?.querySelectorAll('.store-cine-line')??[])

    function setStatus(text,ready){
      const el=statusRef.current
      if(el){ el.textContent=text; el.classList.toggle('is-ready',!!ready) }
    }

    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      b.dataset.mode='static'
      b.style.setProperty('--cine-progress','1')
      E.forEach((el,idx)=>{ el.style.opacity= idx===0?'1':'0'; el.style.transform='none' })
      if(supportRef.current) supportRef.current.style.opacity='1'
      if(cueRef.current) cueRef.current.style.opacity='0'
      setStatus('',true)
      return
    }

    const isMobile = window.matchMedia('(max-width: 767px), (hover: none) and (pointer: coarse)').matches
    const O = isMobile ? src.mobile : src.desktop
    const threshold = isMobile ? .03 : .018

    let z=0, G=0, raf=0, raf2=0, Q=false, B=0, K=0, seeking=false

    function dur(){ const d=j.duration; return Number.isFinite(d)&&d>0?d:0 }

    function render(progress){
      progressRef.current = progress
      b.style.setProperty('--cine-progress', progress.toFixed(4))
      const veil = ease((progress-.9)/.1)
      b.style.setProperty('--cine-veil', veil.toFixed(4))
      if(copyRef.current) copyRef.current.style.opacity=(1-ease((progress-.93)/.07)).toFixed(3)
      for(let i=0;i<E.length;i++){
        const o=opacityFor(progress, CHAPTERS[i])
        E[i].style.opacity=o.toFixed(3)
        E[i].style.transform=`translate3d(0, ${((1-o)*12).toFixed(2)}px, 0)`
      }
      if(supportRef.current){
        const o=opacityFor(progress,[0,0,.14,.2])
        supportRef.current.style.opacity=o.toFixed(3)
        supportRef.current.style.transform=`translate3d(0, ${((1-o)*10).toFixed(2)}px, 0)`
      }
      if(cueRef.current) cueRef.current.style.opacity=(1-ease((progress-.84)/.08)).toFixed(3)
    }

    function onScrollFrame(){
      raf2=0
      const top = b.getBoundingClientRect().top + window.scrollY
      const range = Math.max(1, b.offsetHeight - s.offsetHeight)
      z = smooth((window.scrollY - top)/range)
      if(!seeking){ seeking=true; G=z }
      render(z)
      if(!raf) raf=requestAnimationFrame(tick)
    }
    function schedule(){ if(!raf2) raf2=requestAnimationFrame(onScrollFrame) }

    function tick(ts){
      raf=0
      const dt = K ? Math.min(64, ts - K) : 16.7
      K=ts
      const lerp = 1 - Math.pow(1-.2, dt/16.7)
      G += (z - G)*lerp
      if(Math.abs(z-G)<0.0004) G=z
      const d = dur()
      if(d>0 && !Q && !j.seeking){
        const target = smooth(G / Y0) * Math.max(0, d - .04)
        if(Math.abs(j.currentTime - target) > threshold){
          Q=true; B=ts
          try{ j.currentTime = target }catch{ Q=false }
        }
      }
      if(Q && (j.seeking===false || ts - B > 400)) Q=false
      if(Math.abs(z-G) >= 0.0004 || Q) raf=requestAnimationFrame(tick)
      else K=0
    }

    function onSeeked(){ Q=false; if(!raf) raf=requestAnimationFrame(tick) }

    function onLoaded(){
      b.dataset.mode='video'
      setStatus('',true)
      // preservar progresso ao trocar tema
      const p = progressRef.current
      const d = dur()
      if(d>0 && p>0){
        try{ j.currentTime = smooth(p / Y0) * Math.max(0, d - .04) }catch{}
      }
      onScrollFrame()
    }
    function onError(){
      b.dataset.mode='static'
      setStatus('Prévia estática',true)
    }

    j.addEventListener('loadedmetadata', onScrollFrame)
    j.addEventListener('loadeddata', onLoaded, {once:true})
    j.addEventListener('seeked', onSeeked)
    j.addEventListener('error', onError)
    window.addEventListener('scroll', schedule, {passive:true})
    window.addEventListener('resize', onScrollFrame, {passive:true})
    window.addEventListener('orientationchange', onScrollFrame, {passive:true})

    const warm = ()=>{ const p=j.play(); if(p)p.then(()=>j.pause()).catch(()=>{}) }
    window.addEventListener('pointerdown', warm, {once:true, passive:true})

    // troca de tema preserva progresso: antes de trocar src, salva progresso
    const currentProgress = progressRef.current
    j.src=O
    j.load()
    // se já havia progresso, restaura após metadata
    if(currentProgress>0){
      const handler = ()=>{
        const d = dur()
        if(d>0){
          try{ j.currentTime = smooth(currentProgress / Y0) * Math.max(0, d - .04) }catch{}
        }
        j.removeEventListener('loadedmetadata', handler)
      }
      j.addEventListener('loadedmetadata', handler)
    }
    setStatus('Preparando experiência')
    onScrollFrame()

    return ()=>{
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onScrollFrame)
      window.removeEventListener('orientationchange', onScrollFrame)
      window.removeEventListener('pointerdown', warm)
      j.removeEventListener('loadedmetadata', onScrollFrame)
      j.removeEventListener('loadeddata', onLoaded)
      j.removeEventListener('seeked', onSeeked)
      j.removeEventListener('error', onError)
      if(raf) cancelAnimationFrame(raf)
      if(raf2) cancelAnimationFrame(raf2)
    }
  },[src.desktop, src.mobile, theme])

  return (
    <section ref={sectionRef} id="hero" className="store-cine" data-mode="loading" data-theme={theme} aria-labelledby="store-title">
      <div ref={stageRef} className="store-cine-stage">
        <div className="store-cine-frame">
          <video ref={videoRef} className="store-cine-video" muted playsInline preload="auto" poster={src.poster} aria-hidden tabIndex={-1} />
          <img src={src.final} alt={"iPhone em detalhe — linha disponível na "+storeConfig.name+""} className="store-cine-fallback" loading="lazy" decoding="async" />
        </div>

        <div ref={copyRef} className="store-cine-copy">
          <p className="store-cine-kicker">{storeConfig.name}</p>
          <div className="store-cine-lines">
            <h1 className="store-cine-line" id="store-title">Seu próximo <em>upgrade</em> começa aqui.</h1>
            <p className="store-cine-line" aria-hidden="true">Do detalhe à <em>experiência<span className="store-cine-stop">.</span></em></p>
            <p className="store-cine-line" aria-hidden="true">Cada detalhe no <em>lugar certo<span className="store-cine-stop">.</span></em></p>
            <p className="store-cine-line" aria-hidden="true">Você escolhe. A <em>{storeConfig.name}</em> cuida.</p>
          </div>
          <p ref={supportRef} className="store-cine-support">Aparelhos novos, seminovos e assistência técnica com garantia.</p>
          <div className="store-cine-rail" aria-hidden="true"><i /></div>
          <p ref={statusRef} className="store-cine-status" aria-live="polite" />
        </div>

        <div ref={cueRef} className="store-cine-cue" aria-hidden="true"><span />Role para avançar</div>
        <div className="store-cine-veil" aria-hidden="true" />
      </div>
    </section>
  )
}
