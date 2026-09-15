import { useSettings, whatsAppLink } from '../hooks/useSettings'

/**
 * The classic WhatsApp glyph (phone handset inside a chat bubble), drawn as
 * inline SVG so it renders crisply at any size without an external asset.
 */
function WhatsAppGlyph({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 4C9.4 4 4 9.4 4 16c0 2.1.6 4.2 1.6 6L4 28l6.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 4 16 4z"
        fill="white"
      />
      <path
        d="M22.4 18.9c-.3-.2-1.9-1-2.2-1s-.5-.1-.7.2-.8 1-.9 1.1-.3.2-.6 0c-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2s0-.4.1-.6c.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5s0-.4 0-.5c-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5z"
        fill="#25D366"
      />
    </svg>
  )
}

/**
 * Floating "chat on WhatsApp" button using the classic recognizable
 * WhatsApp glyph, positioned bottom-right on every customer-facing page.
 */
export default function WhatsAppButton() {
  const { settings } = useSettings()
  if (!settings.whatsapp_number) return null

  return (
    <a
      href={whatsAppLink(settings.whatsapp_number, "Hi! I'd like to ask about your handmade pieces.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] shadow-soft grid place-items-center hover:scale-105 transition-transform"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppGlyph size={30} />
    </a>
  )
}
