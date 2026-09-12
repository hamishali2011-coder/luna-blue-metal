export function formatPrice(amount) {
  const value = Number(amount) || 0
  return `Rs. ${value.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`
}

export function slugifyCategory(label) {
  return String(label).toLowerCase().trim().replace(/\s+/g, '-')
}
