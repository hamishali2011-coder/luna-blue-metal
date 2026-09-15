import { Link } from 'react-router-dom'

/**
 * The Crescent Bloom logo — a hand-illustrated badge (crescent moon, star
 * charm, and a pipe-cleaner floral bouquet) that already contains the full
 * wordmark and tagline, so it's used on its own without extra text.
 */
export default function Logo({ dark = false, className = '', size = 'md' }) {
  const dimensions = size === 'lg' ? 'h-16 w-16' : 'h-12 w-12'
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group ${className}`} aria-label="The Crescent Bloom home">
      <img
        src="/WhatsApp%20Image%202026-09-11%20at%203.14.59%20PM.jpeg"
        alt="The Crescent Bloom"
        className={`${dimensions} rounded-full object-cover shrink-0 shadow-soft transition-transform duration-500 group-hover:-rotate-6 ${dark ? 'ring-2 ring-white/40' : 'ring-2 ring-midnight-200'}`}
      />
    </Link>
  )
}
