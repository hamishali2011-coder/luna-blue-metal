import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'lbm_cart_v1'
export const DELIVERY_FEE = 50
export const FREE_DELIVERY_THRESHOLD = 5000

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      const maxQty = product.stock ?? 99
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, maxQty) }
            : i
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          stock: product.stock,
          quantity: Math.min(quantity, maxQty),
        },
      ]
    })
  }

  function updateQuantity(id, quantity) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock ?? 99)) } : i))
        .filter((i) => i.quantity > 0)
    )
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])
  const deliveryFee = useMemo(() => (items.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE), [items, subtotal])
  const total = subtotal + deliveryFee
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
