import { isSupabaseConfigured, supabase } from './supabaseClient'

/**
 * Creates an order + its order_items, and upserts a customer record.
 * When Supabase isn't configured yet, resolves with a locally-generated
 * order id so the checkout flow can still be demoed end to end.
 */
export async function createOrder({ customer, items, subtotal, deliveryFee, total }) {
  if (!isSupabaseConfigured) {
    await new Promise((r) => setTimeout(r, 600))
    return { orderId: `DEMO-${Date.now()}`, demo: true }
  }

  const { data: customerRow, error: customerError } = await supabase
    .from('customers')
    .upsert(
      {
        name: customer.name,
        phone: customer.phone,
        whatsapp: customer.whatsapp,
        city: customer.city,
        address: customer.address,
      },
      { onConflict: 'phone' }
    )
    .select()
    .single()

  if (customerError) throw customerError

  const orderId = crypto.randomUUID()

  const { error: orderError } = await supabase
    .from('orders')
    .insert({
      id: orderId,
      customer_name: customer.name,
      phone: customer.phone,
      whatsapp: customer.whatsapp,
      city: customer.city,
      address: customer.address,
      notes: customer.notes || null,
      subtotal,
      delivery_fee: deliveryFee,
      total,
      status: 'pending',
      customer_id: customerRow?.id ?? null,
    })

  if (orderError) throw orderError

  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
  if (itemsError) throw itemsError

  // Best-effort stock decrement — safe to ignore failures here since the
  // order itself already succeeded.
  for (const item of items) {
    await supabase.rpc('decrement_stock', { p_product_id: item.id, p_quantity: item.quantity }).catch(() => {})
  }

  return { orderId, demo: false }
}
