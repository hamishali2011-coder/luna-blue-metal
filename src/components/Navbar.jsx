import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../context/CartContext'
import { CATEGORIES } from '../data/sampleProducts'

const NAV_LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=bouquets', label: 'Bouquets' },
  { to: '/shop?category=keychains', label: 'Keychains' },
  { to: '/custom', label: 'Custom Orders' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { itemCount } = useCart()
  const navigate = useNavigate()

  function submitSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setOpen(false)
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-silver-200">
      <div className="container-page flex items-center justify-between h-[68px]">
        <button
          className="md:hidden -ml-2 p-2 text-ink"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <Logo className="md:mr-8" />

        <nav className="hidden md:flex items-center gap-7 flex-1 ml-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `text-[14.5px] font-medium tracking-wide transition-colors ${
                  isActive ? 'text-midnight-700' : 'text-ink/70 hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            className="p-2 text-ink/80 hover:text-ink transition-colors"
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Search products"
          >
            <Search size={20} />
          </button>
          <Link to="/cart" className="relative p-2 text-ink/80 hover:text-ink transition-colors" aria-label="View cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 grid place-items-center h-4 min-w-4 px-1 rounded-full bg-midnight-700 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-silver-200 bg-paper">
          <form onSubmit={submitSearch} className="container-page py-3 flex items-center gap-3">
            <Search size={18} className="text-ink/50 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search charms, bouquets, keychains…"
              className="w-full bg-transparent text-[15px] py-1 outline-none placeholder:text-ink/40"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="p-1 text-ink/50">
              <X size={18} />
            </button>
          </form>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[82%] max-w-xs bg-paper shadow-soft flex flex-col">
            <div className="flex items-center justify-between h-[68px] px-5 border-b border-silver-200">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col px-5 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-[16px] font-medium border-b border-silver-100"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-ink/40 mb-2">Categories</p>
                <div className="flex flex-col">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/shop?category=${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="py-2.5 text-[15px] text-ink/80"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
