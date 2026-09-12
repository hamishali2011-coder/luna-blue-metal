import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Star, Trash2 } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { deleteProduct } from '../lib/adminProducts'
import { formatPrice } from '../lib/format'
import { isSupabaseConfigured } from '../lib/supabaseClient'

export default function AdminProducts() {
  const { products, loading } = useProducts()
  const [deletingId, setDeletingId] = useState(null)

  async function handleDelete(product) {
    if (!isSupabaseConfigured) return
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    setDeletingId(product.id)
    try {
      await deleteProduct(product.id)
    } catch (err) {
      alert(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-[26px] text-ink">Products</h1>
          <p className="text-[14px] text-ink/50 mt-1">{loading ? 'Loading…' : `${products.length} products`}</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 bg-midnight-700 text-white px-5 py-2.5 rounded-full text-[14px] font-semibold hover:bg-midnight-800 transition-colors"
        >
          <Plus size={16} /> Add product
        </Link>
      </div>

      <div className="bg-paper rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-silver-200 text-ink/45 text-[12.5px] uppercase tracking-wide">
                <th className="py-3 px-4 font-medium">Product</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Stock</th>
                <th className="py-3 px-4 font-medium">Featured</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-silver-100">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image_url} alt={p.name} className="h-10 w-10 rounded-lg object-cover bg-mist" />
                      <span className="font-medium text-ink line-clamp-1 max-w-[220px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-ink/60 capitalize">{p.category}</td>
                  <td className="py-3 px-4 text-ink/80">{formatPrice(p.price)}</td>
                  <td className="py-3 px-4">
                    <span className={p.stock <= 0 ? 'text-red-500' : 'text-ink/80'}>{p.stock}</span>
                  </td>
                  <td className="py-3 px-4">
                    {p.featured && <Star size={15} className="text-midnight-600 fill-midnight-600" />}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/admin/products/${p.id}/edit`} className="p-2 text-ink/50 hover:text-midnight-700" aria-label={`Edit ${p.name}`}>
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p)}
                        disabled={deletingId === p.id}
                        className="p-2 text-ink/50 hover:text-red-500 disabled:opacity-40"
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && products.length === 0 && (
          <p className="text-center py-12 text-[14px] text-ink/45">No products yet. Add your first one.</p>
        )}
      </div>
    </div>
  )
}
