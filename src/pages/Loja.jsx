import { storeConfig } from '../config/store.js'
import { useMemo, useState } from 'react'
import { Search, List, LayoutGrid, ShoppingBag, X, ShieldCheck, Truck, SlidersHorizontal } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import CatalogSelect from '../components/CatalogSelect.jsx'
import { categories, departments, filterProducts } from '../data/catalog.js'
import { useCart } from '../context/CartContext.jsx'
import './Loja.css'

const sortOptions = [{value:'relevancia',label:'Destaques'},{value:'menor',label:'Menor preço'},{value:'maior',label:'Maior preço'},{value:'nome',label:'Nome: A–Z'}]
const availabilityOptions = [{value:'todos',label:'Todos os produtos'},{value:'disponiveis',label:'Disponíveis'},]

export default function Loja() {
  const { categorySlug } = useParams()
  const cat = categorySlug || 'todos'
  const [q, setQ] = useState('')
  const [availability, setAvailability] = useState('todos')
  const [sort, setSort] = useState('relevancia')
  const [viewMode, setViewMode] = useState('grid')
  const [page, setPage] = useState({key:'',count:24})
  const { openCart } = useCart()
  const filtered = useMemo(() => filterProducts({query:q,category:cat,sort,availability}), [q,cat,sort,availability])
  const filterKey = [q,cat,sort,availability].join('|')
  const count = page.key === filterKey ? page.count : 24
  const category = [...departments,...categories].find(c => c.slug === cat)
  return <main className="store-page">
    <section className="store-hero-open">
      <div className="store-hero-grid">
        <div className="store-hero-copy">
          <p className="section-kicker">LOJA {storeConfig.name}</p>
          <h1 className="store-hero-title">Seu próximo iPhone está aqui.</h1>
          <p className="store-hero-lead">Explore diferentes modelos de iPhone, compare opções e encontre o aparelho ideal para você.</p>
        </div>
        <div className="store-hero-visual store-hero-banner"><div className="store-hero-banner-inner"><img src="/images/iphone17promax.webp" alt={"Loja "+storeConfig.name+""} width="1000" height="1000" fetchPriority="high" decoding="async" /></div></div>
      </div>
      <div className="store-hero-benefits">
        <div className="store-benefit"><ShieldCheck size={20} strokeWidth={1.8} /><strong>Catálogo</strong><span>Modelos de iPhone</span></div>
        <div className="store-benefit"><Truck size={20} strokeWidth={1.8} /><strong>Orçamento</strong><span>Pelo WhatsApp</span></div>
        <div className="store-benefit"><SlidersHorizontal size={20} strokeWidth={1.8} /><strong>Atendimento</strong><span>Compra assistida</span></div>
      </div>
    </section>

    <p className="demo-notice site-shell">Preços e disponibilidade demonstrativos. Confirme valores e condições com a loja.</p><section id="catalogo" className="store-catalog">
      <div className="store-products-section">
        <div className="store-catalog-heading"><div><p className="section-kicker">ENCONTRE O SEU</p><h2>{category?.name || 'Explore a loja'}</h2></div><button className="store-view-cart" type="button" onClick={openCart}><ShoppingBag size={17} /> Ver carrinho</button></div>
        <div className="store-toolbar">
          <div className="store-toolbar-row">
            <div className="store-search-field"><Search size={20} aria-hidden="true" /><input aria-label="Buscar produtos" value={q} onChange={e => setQ(e.target.value)} placeholder="Busque por produto, marca ou capacidade" />{q && <button aria-label="Limpar busca" onClick={() => setQ('')} type="button"><X size={18} /></button>}</div>
            <button type="button" className="store-icon-btn" onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} aria-label={viewMode === 'grid' ? 'Alternar para lista' : 'Alternar para grade'}>{viewMode === 'grid' ? <List size={19} /> : <LayoutGrid size={19} />}<span>{viewMode === 'grid' ? 'Lista' : 'Grade'}</span></button>
            <CatalogSelect label="Ordenar produtos" value={sort} options={sortOptions} onChange={setSort} />
          </div>
          <nav className="store-filter-row" aria-label="Categorias de produtos"><Link to="/loja" aria-current={cat === 'todos' ? 'page' : undefined} className={cat === 'todos' ? 'store-filter-pill is-active' : 'store-filter-pill'}>Todos</Link>{departments.map(c => <Link key={c.slug} to={'/loja/categoria/'+c.slug} aria-current={cat === c.slug ? 'page' : undefined} className={cat === c.slug ? 'store-filter-pill is-active' : 'store-filter-pill'}>{c.name}</Link>)}</nav>
        </div>
        <div className="store-results-row"><p role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}{q && <span> para “{q}”</span>}</p><CatalogSelect label="Filtrar disponibilidade" value={availability} options={availabilityOptions} onChange={setAvailability} /></div>
        <div className={viewMode === 'list' ? 'store-products-grid is-list' : 'store-products-grid'}>{filtered.slice(0,count).map(p => <ProductCard key={p.slug} product={p} />)}</div>
        {filtered.length === 0 && <div className="store-empty"><Search size={28} /><h3>Nenhum produto por aqui.</h3><p>Tente outro nome, marca ou categoria.</p><Link to="/loja" onClick={() => {setQ('');setAvailability('todos')}}>Limpar filtros</Link></div>}
        {filtered.length > count && <div className="store-load-more"><p>Mostrando {Math.min(count,filtered.length)} de {filtered.length} produtos</p><button type="button" onClick={() => setPage({key:filterKey,count:count+24})}>Ver mais produtos</button></div>}
      </div>
    </section>
  </main>
}
