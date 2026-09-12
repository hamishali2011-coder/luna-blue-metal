export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="text-midnight-500 text-[14px] font-medium mb-2">{eyebrow}</p>}
      <h2 className="font-display text-[28px] sm:text-[34px] leading-tight text-ink">{title}</h2>
      {description && <p className="mt-3 text-[15px] text-ink/60 leading-relaxed">{description}</p>}
    </div>
  )
}
