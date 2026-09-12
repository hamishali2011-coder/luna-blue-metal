import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

const EMPTY_STATS = {
  totalOrders: 0,
  totalSales: 0,
  pendingOrders: 0,
  completedOrders: 0,
  productsSold: 0,
  totalProducts: 0,
}

export function useAdminStats() {
  const [stats, setStats] = useState(EMPTY_STATS)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let isMounted = true

    async function load() {
      setLoading(true)
      const [{ data: orders }, { count: totalProducts }, { data: items }] = await Promise.all([
        supabase.from('orders').select('total, status'),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('order_items').select('quantity'),
      ])

      if (!isMounted) return

      const totalOrders = orders?.length ?? 0
      const totalSales = orders?.reduce((sum, o) => sum + Number(o.total || 0), 0) ?? 0
      const pendingOrders = orders?.filter((o) => o.status === 'pending').length ?? 0
      const completedOrders = orders?.filter((o) => o.status === 'completed').length ?? 0
      const productsSold = items?.reduce((sum, i) => sum + Number(i.quantity || 0), 0) ?? 0

      setStats({ totalOrders, totalSales, pendingOrders, completedOrders, productsSold, totalProducts: totalProducts ?? 0 })
      setLoading(false)
    }

    load()
    return () => { isMounted = false }
  }, [])

  return { stats, loading }
}
