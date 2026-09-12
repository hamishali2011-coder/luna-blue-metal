import { MessageCircle } from 'lucide-react'
import { useSettings } from '../hooks/useSettings'
import { whatsAppLink } from '../hooks/useSettings'

/**
 * Floating WhatsApp button shown on every customer-facing page, linking to
 * the store's WhatsApp number (managed from Admin > Settings).
 */
export default function WhatsAppButton() {
  const { settings } = useSettings()
  if (!settings.whatsapp_number) return null

  return (
    <a
      href={whatsAppLink(settings.whatsapp_number, "Hi! I'd like to ask about your handmade pieces.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-soft grid place-items-center hover:scale-105 transition-transform"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  )
}
