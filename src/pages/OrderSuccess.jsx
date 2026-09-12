import { Link, Navigate, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { formatPrice } from '../lib/format'

export default function OrderSuccess() {
  const { state } = useLocation()

  if (!state?.orderId) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="container-page py-20 text-center max-w-lg mx-auto">
      <div className="mx-auto h-16 w-16 rounded-full bg-midnight-50 grid place-items-center text-midnight-700">
        <CheckCircle2 size={30} />
      </div>
      <h1 className="mt-6 font-display text-[28px] text-ink">Thank you for your order</h1>
      <p className="mt-3 text-[15px] text-ink/60 leading-relaxed">
        Your order <span className="font-semibold text-ink">#{String(state.orderId).slice(0, 8)}</span> for{' '}
        {formatPrice(state.total)} has been received. We will reach out on WhatsApp to confirm delivery details.
      </p>
      <Link
        to="/shop"
        className="mt-8 inline-flex items-center gap-2 bg-midnight-700 text-white px-6 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-midnight-800 transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  )
}
