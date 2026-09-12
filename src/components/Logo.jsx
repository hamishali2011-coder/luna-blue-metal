import { Link } from 'react-router-dom'

/**
 * The "Luna Crescent" mark — a crescent moon shaped like a single bent
 * length of wire, with a small coiled twist at its lower tip (echoing how
 * a pipe-cleaner is finished off by hand). This is the brand's icon,
 * paired with the LUNA BLUE METAL wordmark.
 */
export default function Logo({ dark = false, className = '' }) {
  const stroke = dark ? '#8FA8D6' : '#1E3A5F'

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group ${className}`} aria-label="LUNA BLUE METAL home">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-500 group-hover:-rotate-6"
      >
        {/* Luna Crescent mark */}
        <path
          d="M20.5 6.5c-6 0-10.5 4.4-10.5 9.5s4.5 9.5 10.5 9.5c1.5 0 2.9-.3 4.2-.8-3.9-1.3-6.7-4.8-6.7-8.7s2.8-7.4 6.7-8.7c-1.3-.5-2.7-.8-4.2-.8z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* coiled wire twist at the lower tip */}
        <path
          d="M11.5 22.5c.9.9 2.2.6 2.2-.6s-1.3-1.9-1.9-1.1"
          stroke={stroke}
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-display leading-none ${dark ? 'text-paper' : 'text-ink'}`}>
        <span className="block text-[15px] tracking-[0.04em]">LUNA BLUE</span>
        <span className="block text-[15px] tracking-[0.04em] -mt-1">METAL</span>
      </span>
    </Link>
  )
}
