import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

export default function CatalogSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef(null)
  const button = useRef(null)
  const optionRefs = useRef([])
  const id = useId()
  const selectedIndex = options.findIndex(o => o.value === value)
  useEffect(() => {
    if (!open) return
    const close = e => { if (!root.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])
  useEffect(() => { if (open) optionRefs.current[active]?.focus() }, [open, active])
  const choose = next => { onChange(next); setOpen(false); button.current?.focus() }
  return <div className="catalog-select" ref={root}>
    <button ref={button} type="button" className="catalog-select-trigger" aria-label={`${label}: ${options[selectedIndex]?.label}`} aria-haspopup="listbox" aria-expanded={open} aria-controls={id} onClick={() => { setActive(Math.max(0, selectedIndex)); setOpen(v => !v) }} onKeyDown={e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(0, selectedIndex)); setOpen(true) }
    }}><span>{options[selectedIndex]?.label}</span><ChevronDown size={16} aria-hidden="true" /></button>
    {open && <div id={id} className="catalog-select-menu" role="listbox" aria-label={label} onKeyDown={e => {
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); button.current?.focus() }
      if (e.key === 'Tab') setOpen(false)
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setActive(v => (v + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length) }
      if (e.key === 'Home') { e.preventDefault(); setActive(0) }
      if (e.key === 'End') { e.preventDefault(); setActive(options.length - 1) }
    }}>{options.map((option, index) => <button key={option.value} ref={el => { optionRefs.current[index] = el }} type="button" role="option" aria-selected={value === option.value} tabIndex={active === index ? 0 : -1} onClick={() => choose(option.value)}>{option.label}{value === option.value && <Check size={16} aria-hidden="true" />}</button>)}</div>}
  </div>
}
