// A single recurring hand-drawn motif: a coiled wire loop, echoing pipe-cleaner
// craft. Used sparingly — as a section divider and inside the logo mark —
// rather than as a repeated decorative icon everywhere.
export default function WireLoop({ className = '', animated = false }) {
  return (
    <svg
      viewBox="0 0 240 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 20c10-16 24-16 34 0s24 16 34 0 24-16 34 0 24 16 34 0 24-16 34 0 24 16 34 0 24-16 34 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={100}
        style={
          animated
            ? { strokeDasharray: 100, strokeDashoffset: 100, animation: 'loop 1.6s ease-out forwards' }
            : undefined
        }
      />
    </svg>
  )
}
