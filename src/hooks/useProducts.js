import { useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'
import { sampleProducts } from '../data/sampleProducts'

/**
 * Loads the product catalogue.
 * - If Supabase env vars are set, reads from the `products` table and stays
 *   in sync automatically: any insert/update/delete an admin makes shows up
 *   here without a page refresh, via a Supabase Realtime subscription.
 * - Otherwise falls back to the bundled sample data so the storefront is
 *   still browsable before the database is connected.
 */
export function useProducts() {
  const [products, setProducts] = useState(isSupabaseConfigured ? [] : sampleProducts)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let isMounted = true

    async function load() {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (!isMounted) return
      if (fetchError) {
        setError(fetchError.message)
        setProducts(sampleProducts)
      } else {
        setError(null)
        setProducts(data ?? [])
      }
      setLoading(false)
    }

    load()

    const channel = supabase
      .channel(`products-realtime-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        load()
      })
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return { products, loading, error }
}

export function useProduct(id) {
  const { products, loading, error } = useProducts()
  const product = useMemo(() => products.find((p) => String(p.id) === String(id)), [products, id])
  return { product, loading, error }
}
