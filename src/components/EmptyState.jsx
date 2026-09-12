export default function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-20">
      <h3 className="font-display text-[22px] text-ink">{title}</h3>
      {description && <p className="mt-2 text-[14.5px] text-ink/55 max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
