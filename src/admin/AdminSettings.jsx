import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useSettings } from '../hooks/useSettings'
import { supabase } from '../lib/supabaseClient'

export default function AdminSettings() {
  const { settings, loading } = useSettings()
  const [whatsapp, setWhatsapp] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (settings.whatsapp_number) setWhatsapp(settings.whatsapp_number)
  }, [settings.whatsapp_number])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const { data: existing } = await supabase.from('store_settings').select('id').limit(1).maybeSingle()
      const cleanNumber = whatsapp.replace(/[^0-9]/g, '')

      if (existing) {
        const { error: updateError } = await supabase
          .from('store_settings')
          .update({ whatsapp_number: cleanNumber, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('store_settings')
          .insert({ whatsapp_number: cleanNumber })
        if (insertError) throw insertError
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.message || 'Could not save settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-[26px] text-ink mb-1">Settings</h1>
      <p className="text-[14px] text-ink/50 mb-8">Store-wide details used across the website.</p>

      <form onSubmit={handleSubmit} className="bg-paper rounded-2xl shadow-soft p-6 space-y-5">
        <div>
          <label className="block text-[13px] font-medium text-ink/70 mb-1.5">WhatsApp number</label>
          <p className="text-[12.5px] text-ink/45 mb-2">
            Include the country code, digits only (e.g. 923371256811 for a Pakistani number).
            This powers the floating WhatsApp button, the footer link, and the custom-order page.
          </p>
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="923001234567"
            disabled={loading}
            className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500"
          />
        </div>

        {error && <p className="text-[13.5px] text-red-500">{error}</p>}
        {saved && <p className="text-[13.5px] text-green-600">Saved — the website will update automatically.</p>}

        <button
          type="submit"
          disabled={saving || loading}
          className="inline-flex items-center gap-2 bg-midnight-700 text-white px-6 py-3 rounded-full text-[14.5px] font-semibold hover:bg-midnight-800 transition-colors disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          Save settings
        </button>
      </form>
    </div>
  )
}
