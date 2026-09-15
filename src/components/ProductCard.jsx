import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ShoppingBag } from 'lucide-react'
import { formatPrice } from '../lib/format'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const outOfStock = (product.stock ?? 0) <= 0

  function handleAdd(e) {
    e.preventDefault()
    if (outOfStock) return
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="group fade-in-up" style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}>
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-mist shadow-soft/0 group-hover:shadow-soft transition-shadow duration-300">
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 bg-paper/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide text-midnight-700">
              Featured
            </span>
          )}
          {outOfStock && (
            <span className="absolute top-3 right-3 bg-ink/80 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide text-white">
              Sold out
            </span>
          )}
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="press-feedback absolute bottom-3 right-3 grid place-items-center h-10 w-10 rounded-full bg-paper text-ink shadow-soft opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 disabled:opacity-0"
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? <Check size={17} className="text-green-600" /> : <ShoppingBag size={17} />}
          </button>
        </div>
      </Link>
      <Link to={`/product/${product.id}`} className="block mt-3">
        <h3 className="text-[15px] font-medium text-ink leading-snug line-clamp-2 group-hover:text-midnight-700 transition-colors">{product.name}</h3>
        <p className="mt-1 text-[14.5px] text-midnight-700 font-semibold">{formatPrice(product.price)}</p>
      </Link>
    </div>
  )
}
