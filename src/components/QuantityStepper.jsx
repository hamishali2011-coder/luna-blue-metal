import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({ value, onChange, max = 99, min = 1, size = 'md' }) {
  const pad = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  return (
    <div className="inline-flex items-center border border-silver-300 rounded-full overflow-hidden">
      <button
        type="button"
        className={`${pad} grid place-items-center text-ink/70 hover:bg-mist disabled:opacity-30 transition-colors`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={15} />
      </button>
      <span className="w-9 text-center text-[15px] font-medium select-none">{value}</span>
      <button
        type="button"
        className={`${pad} grid place-items-center text-ink/70 hover:bg-mist disabled:opacity-30 transition-colors`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={15} />
      </button>
    </div>
  )
}
