import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { CATEGORIES } from '../data/sampleProducts'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

function ProductSkeleton() {
  return (
    <div>
      <div className="skeleton aspect-square rounded-2xl" />
      <div className="skeleton h-4 w-3/4 rounded mt-3" />
      <div className="skeleton h-4 w-1/3 rounded mt-2" />
    </div>
  )
}

export default function Home() {
  const { products, loading } = useProducts()

  return (
    <div className="container-page py-8 sm:py-10">
      {/* Compact intro */}
      <div className="fade-in-up flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 rounded-2xl bg-gradient-to-r from-midnight-50 via-mist to-transparent px-5 py-6 sm:px-7">
        <div>
          <p className="text-midnight-500 font-medium text-[13.5px] mb-1">Handmade in small batches</p>
          <h1 className="font-display text-[26px] sm:text-[30px] text-ink">The Crescent Bloom</h1>
        </div>
        <Link to="/custom" className="text-[14px] font-medium text-midnight-700 hover:text-midnight-800 inline-flex items-center gap-1 press-feedback">
          Request a custom piece <ArrowRight size={15} />
        </Link>
      </div>

      {/* Category quick filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
        <Link
          to="/shop"
          className="press-feedback shrink-0 px-4 py-2 rounded-full text-[13.5px] font-medium bg-midnight-700 text-white"
        >
          All products
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to={`/shop?category=${c.slug}`}
            className="press-feedback shrink-0 px-4 py-2 rounded-full text-[13.5px] font-medium bg-mist text-ink/70 hover:bg-midnight-50 hover:text-midnight-700 transition-colors"
          >
            {c.label}
          </Link>
        ))}
      </div>

      {/* Products, straight away */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
          {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      ) : products.length === 0 ? (
        <EmptyState title="No products yet" description="Check back soon — new pieces are added regularly." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  )
}
