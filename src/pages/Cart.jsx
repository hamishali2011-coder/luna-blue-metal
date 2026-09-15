import { Link } from 'react-router-dom'
import { ArrowRight, Trash2 } from 'lucide-react'
import { useCart, FREE_DELIVERY_THRESHOLD } from '../context/CartContext'
import { formatPrice } from '../lib/format'
import QuantityStepper from '../components/QuantityStepper'
import EmptyState from '../components/EmptyState'

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, deliveryFee, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="Your cart is empty"
          description="Add a few hand-shaped pieces to get started."
          action={<Link to="/shop" className="inline-flex items-center gap-2 bg-midnight-700 text-white px-6 py-3 rounded-full text-[14px] font-semibold">Browse the shop <ArrowRight size={15} /></Link>}
        />
      </div>
    )
  }

  const remainingForFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-[30px] sm:text-[36px] text-ink mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="flex flex-col divide-y divide-silver-200">
          {items.map((item) => (
            <div key={item.id} className="py-5 flex gap-4">
              <Link to={`/product/${item.id}`} className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-xl overflow-hidden bg-mist">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <Link to={`/product/${item.id}`} className="text-[15px] font-medium text-ink hover:text-midnight-700">
                    {item.name}
                  </Link>
                  <button onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`} className="text-ink/35 hover:text-red-500 transition-colors shrink-0">
                    <Trash2 size={17} />
                  </button>
                </div>
                <p className="text-[14px] text-ink/55">{formatPrice(item.price)} each</p>
                <div className="flex items-center justify-between mt-2">
                  <QuantityStepper value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} max={item.stock} size="sm" />
                  <p className="text-[15px] font-semibold text-ink">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 h-fit bg-mist rounded-2xl p-6">
          <h2 className="font-display text-[19px] text-ink mb-5">Order Summary</h2>
          <div className="flex justify-between text-[14.5px] text-ink/70 mb-2.5">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-[14.5px] text-ink/70 mb-2.5">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
          </div>
          {remainingForFreeDelivery > 0 && (
            <p className="text-[12.5px] text-midnight-600 mb-3">
              Add {formatPrice(remainingForFreeDelivery)} more for free delivery.
            </p>
          )}
          <div className="border-t border-silver-300 mt-3 pt-3 flex justify-between text-[16px] font-semibold text-ink">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link
            to="/checkout"
            className="press-feedback mt-6 w-full inline-flex items-center justify-center gap-2 bg-midnight-700 text-white px-6 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-midnight-800 transition-colors"
          >
            Checkout <ArrowRight size={16} />
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-[13.5px] text-ink/55 hover:text-ink">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
