import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'

export default function CustomOrder() {
  const { products } = useProducts()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ occasion: '', palette: '', details: '' })
  const [submitted, setSubmitted] = useState(false)

  const customProduct = products.find((p) => p.category === 'gifts') || {
    id: 'custom-request',
    name: 'Custom Handmade Gift',
    price: 0,
    stock: 99,
    image_url: 'https://picsum.photos/seed/luna-gift-1/800/800',
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addItem(customProduct, 1)
    setSubmitted(true)
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-midnight-500 font-medium text-[14px] mb-3">Made to order</p>
          <h1 className="font-display text-[32px] sm:text-[38px] leading-tight text-ink">
            Tell us what you're picturing.
          </h1>
          <p className="mt-4 text-[15px] text-ink/60 leading-relaxed max-w-md">
            Share the occasion, a colour palette and any details, and we will shape a one-off
            piece around it. We'll confirm the final price and timeline over WhatsApp before
            anything is made.
          </p>
          <a
            href="https://wa.me/00000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-medium text-midnight-700"
          >
            <MessageCircle size={17} /> Or message us directly on WhatsApp
          </a>
        </div>

        <div className="bg-mist rounded-2xl p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <h2 className="font-display text-[22px] text-ink">Request added</h2>
              <p className="mt-2 text-[14.5px] text-ink/60">
                We've added a placeholder custom item to your cart with your notes. Continue to
                checkout and we'll confirm final pricing with you afterward.
              </p>
              <button
                onClick={() => navigate('/checkout')}
                className="mt-6 inline-flex items-center gap-2 bg-midnight-700 text-white px-6 py-3.5 rounded-full text-[14.5px] font-semibold"
              >
                Continue to checkout <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13.5px] font-medium text-ink/70 mb-1.5">Occasion</label>
                <input
                  name="occasion"
                  value={form.occasion}
                  onChange={handleChange}
                  required
                  placeholder="Birthday, anniversary, just because…"
                  className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500 bg-paper"
                />
              </div>
              <div>
                <label className="block text-[13.5px] font-medium text-ink/70 mb-1.5">Colour palette</label>
                <input
                  name="palette"
                  value={form.palette}
                  onChange={handleChange}
                  required
                  placeholder="e.g. periwinkle blue and silver"
                  className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500 bg-paper"
                />
              </div>
              <div>
                <label className="block text-[13.5px] font-medium text-ink/70 mb-1.5">Details</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="Initials, size, inspiration photos you have, budget range…"
                  className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500 bg-paper"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-midnight-700 text-white px-6 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-midnight-800 transition-colors"
              >
                Send request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
