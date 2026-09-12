import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The app runs in "demo mode" (sample data, no persistence) whenever these
// env vars are missing, so the storefront still renders during setup.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

export const PRODUCT_IMAGE_BUCKET = 'product-images'

export function getPublicImageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  if (!supabase) return path
  const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path)
  return data?.publicUrl ?? path
}
