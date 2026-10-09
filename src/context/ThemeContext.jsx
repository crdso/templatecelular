import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'store_theme'

function getSystemTheme(){
  if(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

function getInitialTheme(){
  try{
    const saved = localStorage.getItem(STORAGE_KEY)
    if(saved === 'light' || saved === 'dark') return saved
  }catch{}
  return getSystemTheme()
}

export function ThemeProvider({ children }){
  const [theme, setTheme] = useState(() => {
    if(typeof document !== 'undefined'){
      const attr = document.documentElement.getAttribute('data-theme')
      if(attr === 'light' || attr === 'dark') return attr
    }
    return getInitialTheme()
  })

  useEffect(()=>{
    // sync with system if no manual choice, and listen for changes
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const handler = (e)=>{
      try{
        const saved = localStorage.getItem(STORAGE_KEY)
        if(saved !== 'light' && saved !== 'dark'){
          const next = e.matches ? 'light' : 'dark'
          setTheme(next)
          document.documentElement.setAttribute('data-theme', next)
        }
      }catch{}
    }
    media.addEventListener('change', handler)
    return ()=> media.removeEventListener('change', handler)
  },[])

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    try{ localStorage.setItem(STORAGE_KEY, theme) }catch{}
  },[theme])

  const toggle = ()=> setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(){
  const ctx = useContext(ThemeContext)
  if(!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
