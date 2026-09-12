import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { CATEGORIES } from '../data/sampleProducts'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function Shop() {
  const { products, loading } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const activeCategory = searchParams.get('category') || 'all'
  const query = searchParams.get('q') || ''
  const sort = searchParams.get('sort') || 'newest'

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case 'featured':
        list.sort((a, b) => Number(b.featured) - Number(a.featured))
        break
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      default:
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    return list
  }, [products, activeCategory, query, sort])

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-midnight-500 font-medium text-[14px] mb-2">
            {loading ? 'Loading…' : `${filtered.length} piece${filtered.length === 1 ? '' : 's'}`}
          </p>
          <h1 className="font-display text-[30px] sm:text-[36px] text-ink">
            {query ? `Results for "${query}"` : activeCategory !== 'all' ? CATEGORIES.find((c) => c.slug === activeCategory)?.label : 'Shop all'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="sm:hidden inline-flex items-center gap-2 border border-silver-300 rounded-full px-4 py-2 text-[14px] font-medium"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal size={15} /> Filter
          </button>
          <select
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="border border-silver-300 rounded-full px-4 py-2.5 text-[14px] bg-paper outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {query && (
        <button
          onClick={() => updateParam('q', '')}
          className="mb-6 inline-flex items-center gap-1.5 text-[13.5px] bg-mist rounded-full px-3 py-1.5 text-ink/70"
        >
          "{query}" <X size={13} />
        </button>
      )}

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden md:block">
          <p className="text-[13px] uppercase tracking-wider text-ink/40 mb-3">Category</p>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => updateParam('category', 'all')}
              className={`text-left py-1.5 text-[14.5px] ${activeCategory === 'all' ? 'text-midnight-700 font-semibold' : 'text-ink/65 hover:text-ink'}`}
            >
              All products
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => updateParam('category', c.slug)}
                className={`text-left py-1.5 text-[14.5px] ${activeCategory === c.slug ? 'text-midnight-700 font-semibold' : 'text-ink/65 hover:text-ink'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </aside>

        <div>
          {filtered.length === 0 && !loading ? (
            <EmptyState
              title="No pieces match yet"
              description="Try a different category or search term."
              action={
                <button onClick={() => setSearchParams({})} className="text-[14px] font-semibold text-midnight-700 underline underline-offset-4">
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-9">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 bg-paper rounded-t-3xl p-6 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <p className="font-display text-[19px]">Filter by category</p>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close"><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => { updateParam('category', 'all'); setFiltersOpen(false) }}
                className={`text-left py-2.5 text-[15px] ${activeCategory === 'all' ? 'text-midnight-700 font-semibold' : 'text-ink/70'}`}
              >
                All products
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => { updateParam('category', c.slug); setFiltersOpen(false) }}
                  className={`text-left py-2.5 text-[15px] ${activeCategory === c.slug ? 'text-midnight-700 font-semibold' : 'text-ink/70'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
