import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAdminOrders } from '../hooks/useAdminOrders'
import { formatPrice } from '../lib/format'
import { isSupabaseConfigured } from '../lib/supabaseClient'

const STATUSES = ['pending', 'confirmed', 'processing', 'completed', 'cancelled']

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-blue-50 text-blue-700',
  processing: 'bg-midnight-50 text-midnight-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-600',
}

export default function AdminOrders() {
  const { orders, loading, updateStatus } = useAdminOrders()
  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      <h1 className="font-display text-[26px] text-ink mb-1">Orders</h1>
      <p className="text-[14px] text-ink/50 mb-6">{loading ? 'Loading…' : `${orders.length} orders`}</p>

      {!isSupabaseConfigured && (
        <p className="mb-6 text-[13.5px] text-amber-700 bg-amber-50 rounded-xl px-4 py-3">
          Connect Supabase to manage real orders — orders placed in demo mode aren't stored.
        </p>
      )}

      <div className="bg-paper rounded-2xl shadow-soft divide-y divide-silver-100">
        {orders.map((order) => (
          <div key={order.id}>
            <button
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div className="min-w-0">
                <p className="text-[14.5px] font-medium text-ink">{order.customer_name}</p>
                <p className="text-[12.5px] text-ink/45">
                  {new Date(order.created_at).toLocaleDateString()} · {order.city}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[14.5px] font-semibold text-ink">{formatPrice(order.total)}</span>
                <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[order.status] || 'bg-mist text-ink/60'}`}>
                  {order.status}
                </span>
                {expanded === order.id ? <ChevronUp size={17} className="text-ink/40" /> : <ChevronDown size={17} className="text-ink/40" />}
              </div>
            </button>

            {expanded === order.id && (
              <div className="px-5 pb-5 bg-mist/50">
                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <p className="text-[12.5px] uppercase tracking-wide text-ink/40 mb-2">Customer</p>
                    <p className="text-[14px] text-ink/80">{order.customer_name}</p>
                    <p className="text-[14px] text-ink/80">{order.phone}</p>
                    <p className="text-[14px] text-ink/80">WhatsApp: {order.whatsapp}</p>
                    <p className="text-[14px] text-ink/80">{order.address}, {order.city}</p>
                    {order.notes && <p className="text-[13.5px] text-ink/60 mt-2 italic">"{order.notes}"</p>}
                  </div>
                  <div>
                    <p className="text-[12.5px] uppercase tracking-wide text-ink/40 mb-2">Items</p>
                    <div className="space-y-2">
                      {order.order_items?.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-[13.5px]">
                          <span className="text-ink/75">{item.products?.name || 'Product'} × {item.quantity}</span>
                          <span className="text-ink/60">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-silver-200 space-y-1 text-[13.5px]">
                      <div className="flex justify-between text-ink/60"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                      <div className="flex justify-between text-ink/60"><span>Delivery</span><span>{formatPrice(order.delivery_fee)}</span></div>
                      <div className="flex justify-between font-semibold text-ink"><span>Total</span><span>{formatPrice(order.total)}</span></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <label className="text-[13px] font-medium text-ink/60">Status</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border border-silver-300 rounded-full px-4 py-2 text-[13.5px] bg-paper outline-none capitalize"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}

        {!loading && orders.length === 0 && (
          <p className="text-center py-12 text-[14px] text-ink/45">No orders yet.</p>
        )}
      </div>
    </div>
  )
}
