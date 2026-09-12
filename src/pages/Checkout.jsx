import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/format'
import { createOrder } from '../lib/orders'

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', required: true, span: 2 },
  { name: 'phone', label: 'Phone number', type: 'tel', required: true, span: 1 },
  { name: 'whatsapp', label: 'WhatsApp number', type: 'tel', required: true, span: 1 },
  { name: 'city', label: 'City', type: 'text', required: true, span: 2 },
  { name: 'address', label: 'Complete address', type: 'textarea', required: true, span: 2 },
  { name: 'notes', label: 'Order notes (optional)', type: 'textarea', required: false, span: 2 },
]

export default function Checkout() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', whatsapp: '', city: '', address: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const result = await createOrder({ customer: form, items, subtotal, deliveryFee, total })
      clearCart()
      navigate('/order-success', { state: { orderId: result.orderId, total } })
    } catch (err) {
      setError(err.message || 'Something went wrong placing your order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-[30px] sm:text-[36px] text-ink mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="font-display text-[19px] text-ink">Delivery details</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {FIELDS.map((field) => (
              <div key={field.name} className={field.span === 2 ? 'sm:col-span-2' : ''}>
                <label htmlFor={field.name} className="block text-[13.5px] font-medium text-ink/70 mb-1.5">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    value={form[field.name]}
                    onChange={handleChange}
                    rows={field.name === 'notes' ? 2 : 3}
                    className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500 bg-paper"
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500 bg-paper"
                  />
                )}
              </div>
            ))}
          </div>

          {error && <p className="text-[13.5px] text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-midnight-700 text-white px-8 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-midnight-800 transition-colors disabled:opacity-60"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? 'Placing order…' : `Place order · ${formatPrice(total)}`}
          </button>
        </form>

        <div className="h-fit bg-mist rounded-2xl p-6">
          <h2 className="font-display text-[19px] text-ink mb-5">Order Summary</h2>
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-lg overflow-hidden bg-paper shrink-0">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium text-ink truncate">{item.name}</p>
                  <p className="text-[12.5px] text-ink/50">Qty {item.quantity}</p>
                </div>
                <p className="text-[13.5px] font-semibold text-ink">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-silver-300 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-[14.5px] text-ink/70">
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[14.5px] text-ink/70">
              <span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-[16px] font-semibold text-ink pt-1">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
