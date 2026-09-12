import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Check, ChevronRight, ShieldCheck, Truck } from 'lucide-react'
import { useProduct, useProducts } from '../hooks/useProducts'
import { CATEGORIES } from '../data/sampleProducts'
import { formatPrice } from '../lib/format'
import { useCart } from '../context/CartContext'
import QuantityStepper from '../components/QuantityStepper'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

export default function ProductDetail() {
  const { id } = useParams()
  const { product, loading } = useProduct(id)
  const { products } = useProducts()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title={loading ? 'Loading product…' : 'Product not found'}
          description={loading ? undefined : 'This piece may have been removed or sold out.'}
          action={!loading && <Link to="/shop" className="text-[14px] font-semibold text-midnight-700 underline underline-offset-4">Back to shop</Link>}
        />
      </div>
    )
  }

  const outOfStock = (product.stock ?? 0) <= 0
  const categoryLabel = CATEGORIES.find((c) => c.slug === product.category)?.label || product.category
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  function handleAddToCart() {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  function handleBuyNow() {
    addItem(product, qty)
    navigate('/checkout')
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="flex items-center gap-1.5 text-[13px] text-ink/45 mb-6">
        <Link to="/shop" className="hover:text-ink">Shop</Link>
        <ChevronRight size={13} />
        <Link to={`/shop?category=${product.category}`} className="hover:text-ink">{categoryLabel}</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="rounded-3xl overflow-hidden bg-mist aspect-square">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-midnight-500 text-[13.5px] font-medium">{categoryLabel}</p>
          <h1 className="mt-2 font-display text-[28px] sm:text-[32px] text-ink leading-tight">{product.name}</h1>
          <p className="mt-3 text-[22px] font-semibold text-midnight-700">{formatPrice(product.price)}</p>

          <p className="mt-5 text-[15px] text-ink/65 leading-relaxed">{product.description}</p>

          <div className="mt-5 flex items-center gap-2 text-[13.5px]">
            <span className={`h-2 w-2 rounded-full ${outOfStock ? 'bg-red-400' : 'bg-green-500'}`} />
            {outOfStock ? (
              <span className="text-ink/50">Out of stock</span>
            ) : (
              <span className="text-ink/60">{product.stock} in stock</span>
            )}
          </div>

          {!outOfStock && (
            <div className="mt-6 flex items-center gap-4">
              <QuantityStepper value={qty} onChange={setQty} max={product.stock} />
            </div>
          )}

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-midnight-700 text-midnight-700 px-6 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-midnight-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {added ? <><Check size={16} /> Added</> : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-midnight-700 text-white px-6 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-midnight-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-silver-200 pt-6">
            <div className="flex items-start gap-2.5">
              <Truck size={17} className="text-midnight-600 mt-0.5 shrink-0" />
              <p className="text-[13px] text-ink/55 leading-snug">Nationwide delivery, tracked over WhatsApp.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck size={17} className="text-midnight-600 mt-0.5 shrink-0" />
              <p className="text-[13px] text-ink/55 leading-snug">Carefully packed so pieces arrive intact.</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-[24px] text-ink mb-7">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-9">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
