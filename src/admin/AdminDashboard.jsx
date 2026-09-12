import { CheckCircle2, Clock, DollarSign, Package, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useAdminStats } from '../hooks/useAdminStats'
import { formatPrice } from '../lib/format'
import { isSupabaseConfigured } from '../lib/supabaseClient'

const CARDS = [
  { key: 'totalOrders', label: 'Total Orders', icon: ShoppingCart, format: (v) => v },
  { key: 'totalSales', label: 'Total Sales', icon: DollarSign, format: formatPrice },
  { key: 'pendingOrders', label: 'Pending Orders', icon: Clock, format: (v) => v },
  { key: 'completedOrders', label: 'Completed Orders', icon: CheckCircle2, format: (v) => v },
  { key: 'productsSold', label: 'Products Sold', icon: ShoppingBag, format: (v) => v },
  { key: 'totalProducts', label: 'Total Products', icon: Package, format: (v) => v },
]

export default function AdminDashboard() {
  const { stats, loading } = useAdminStats()

  return (
    <div>
      <h1 className="font-display text-[26px] text-ink mb-1">Dashboard</h1>
      <p className="text-[14px] text-ink/50 mb-8">An overview of orders, sales and inventory.</p>

      {!isSupabaseConfigured && (
        <p className="mb-6 text-[13.5px] text-amber-700 bg-amber-50 rounded-xl px-4 py-3">
          Connect Supabase to see live statistics — run <code className="font-mono text-[12.5px]">supabase/schema.sql</code> and
          add your project credentials to .env.
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map(({ key, label, icon: Icon, format }) => (
          <div key={key} className="bg-paper rounded-2xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <span className="h-9 w-9 rounded-full bg-midnight-50 grid place-items-center text-midnight-700">
                <Icon size={17} />
              </span>
            </div>
            <p className="text-[22px] font-semibold text-ink">{loading ? '—' : format(stats[key])}</p>
            <p className="text-[13px] text-ink/50 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
