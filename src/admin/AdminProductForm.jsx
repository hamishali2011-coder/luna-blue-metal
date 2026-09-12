import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2, UploadCloud } from 'lucide-react'
import { useProduct } from '../hooks/useProducts'
import { createProduct, updateProduct, uploadProductImage } from '../lib/adminProducts'
import { CATEGORIES } from '../data/sampleProducts'

const EMPTY_FORM = { name: '', description: '', price: '', category: CATEGORIES[0].slug, stock: '', featured: false, image_url: '' }

export default function AdminProductForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const { product } = useProduct(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEditing && product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price ?? '',
        category: product.category || CATEGORIES[0].slug,
        stock: product.stock ?? '',
        featured: Boolean(product.featured),
        image_url: product.image_url || '',
      })
      setImagePreview(product.image_url || '')
    }
  }, [isEditing, product])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleImagePick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      let imageUrl = form.image_url
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile)
      }

      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        featured: form.featured,
        image_url: imageUrl,
      }

      if (isEditing) {
        await updateProduct(id, payload)
      } else {
        await createProduct(payload)
      }
      navigate('/admin/products')
    } catch (err) {
      setError(err.message || 'Could not save this product.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-[26px] text-ink mb-6">{isEditing ? 'Edit product' : 'Add product'}</h1>

      <form onSubmit={handleSubmit} className="bg-paper rounded-2xl shadow-soft p-6 space-y-5">
        <div>
          <label className="block text-[13px] font-medium text-ink/70 mb-2">Product image</label>
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 rounded-xl bg-mist overflow-hidden shrink-0">
              {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />}
            </div>
            <label className="inline-flex items-center gap-2 border border-silver-300 rounded-full px-4 py-2.5 text-[13.5px] font-medium cursor-pointer hover:bg-mist">
              <UploadCloud size={15} /> Upload image
              <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-ink/70 mb-1.5">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500" />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-ink/70 mb-1.5">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} required className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[13px] font-medium text-ink/70 mb-1.5">Price (Rs.)</label>
            <input type="number" min="0" step="1" name="price" value={form.price} onChange={handleChange} required className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-ink/70 mb-1.5">Stock</label>
            <input type="number" min="0" step="1" name="stock" value={form.stock} onChange={handleChange} required className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500" />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-ink/70 mb-1.5">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500 bg-paper">
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
        </div>

        <label className="flex items-center gap-2.5 text-[14px] text-ink/75">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="h-4 w-4 rounded border-silver-400" />
          Mark as featured
        </label>

        {error && <p className="text-[13.5px] text-red-500">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-midnight-700 text-white px-6 py-3 rounded-full text-[14.5px] font-semibold hover:bg-midnight-800 transition-colors disabled:opacity-60"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {isEditing ? 'Save changes' : 'Add product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="px-6 py-3 rounded-full text-[14.5px] font-medium text-ink/60 hover:bg-mist">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
