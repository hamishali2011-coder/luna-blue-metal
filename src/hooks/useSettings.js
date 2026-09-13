import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

const DEFAULT_SETTINGS = {
  whatsapp_number: '923371256811',
}

/**
 * Loads store-wide settings (currently just the WhatsApp number) from
 * Supabase, with a realtime subscription so admin changes appear on the
 * storefront instantly. Falls back to a sensible default when Supabase
 * isn't configured yet.
 */
export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let isMounted = true

    async function load() {
      setLoading(true)
      const { data } = await supabase.from('store_settings').select('*').limit(1).maybeSingle()
      if (!isMounted) return
      if (data) setSettings(data)
      setLoading(false)
    }

    load()

    const channel = supabase
      .channel(`settings-realtime-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'store_settings' }, load)
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return { settings, loading }
}

export function whatsAppLink(number, message = '') {
  const clean = String(number || '').replace(/[^0-9]/g, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${clean}${text}`
}
