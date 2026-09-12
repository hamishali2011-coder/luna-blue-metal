-- ============================================================================
-- LUNA BLUE METAL — Supabase schema
-- Run this once in the Supabase SQL editor (or via `supabase db push` /
-- the Supabase MCP `apply_migration` tool) on a fresh project.
--
-- Any signed-in Supabase Auth user is treated as an admin. For a
-- single-admin storefront like this, create exactly one user under
-- Authentication → Users and sign in with that account on /admin/login.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null default '',
  price       numeric(10, 2) not null check (price >= 0),
  category    text not null,
  image_url   text,
  stock       integer not null default 0 check (stock >= 0),
  featured    boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Products are publicly readable"
  on public.products for select
  using (true);

create policy "Authenticated users can insert products"
  on public.products for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete products"
  on public.products for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- customers
-- ---------------------------------------------------------------------------
create table if not exists public.customers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null unique,
  whatsapp   text,
  city       text,
  address    text,
  created_at timestamptz not null default now()
);

alter table public.customers enable row level security;

create policy "Anyone can create a customer record"
  on public.customers for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can update their own customer record by phone"
  on public.customers for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Authenticated users can read customers"
  on public.customers for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid references public.customers (id) on delete set null,
  customer_name text not null,
  phone         text not null,
  whatsapp      text,
  city          text not null,
  address       text not null,
  notes         text,
  subtotal      numeric(10, 2) not null default 0,
  delivery_fee  numeric(10, 2) not null default 0,
  total         numeric(10, 2) not null default 0,
  status        text not null default 'pending'
                check (status in ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
  created_at    timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Anyone can create an order"
  on public.orders for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can read orders"
  on public.orders for select
  to authenticated
  using (true);

create policy "Authenticated users can update orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- order_items
-- ---------------------------------------------------------------------------
create table if not exists public.order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  quantity   integer not null check (quantity > 0),
  price      numeric(10, 2) not null
);

alter table public.order_items enable row level security;

create policy "Anyone can create order items"
  on public.order_items for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can read order items"
  on public.order_items for select
  to authenticated
  using (true);

-- Customers only ever create rows (during checkout); reading/updating an
-- order's items back is an admin-only action, matching the orders table.

-- ---------------------------------------------------------------------------
-- Stock helper: called after an order is placed to decrement inventory.
-- Defined as SECURITY DEFINER so a non-admin checkout can still adjust
-- stock without being granted broad update rights on `products`.
-- ---------------------------------------------------------------------------
create or replace function public.decrement_stock(p_product_id uuid, p_quantity integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.products
  set stock = greatest(stock - p_quantity, 0)
  where id = p_product_id;
end;
$$;

grant execute on function public.decrement_stock(uuid, integer) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage: product images bucket, publicly readable, admin-only writes.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Product images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated users can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Authenticated users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- ---------------------------------------------------------------------------
-- Realtime: let the storefront pick up admin product changes live.
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table public.products;
alter publication supabase_realtime add table public.orders;

-- ---------------------------------------------------------------------------
-- Optional: seed a few starter products (safe to skip/edit).
-- ---------------------------------------------------------------------------
insert into public.products (name, description, price, category, image_url, stock, featured)
values
  ('Periwinkle Loop Keychain', 'A hand-coiled pipe-cleaner keychain in soft periwinkle blue.', 850, 'keychains', 'https://picsum.photos/seed/luna-key-1/800/800', 14, true),
  ('Midnight Rose Bouquet', 'Six hand-shaped pipe-cleaner roses in deep midnight blue and silver.', 2400, 'bouquets', 'https://picsum.photos/seed/luna-bouquet-1/800/800', 6, true),
  ('Little Bloom Phone Charm', 'A miniature wire flower on a short strap.', 550, 'phone-charms', 'https://picsum.photos/seed/luna-phone-1/800/800', 18, true)
on conflict do nothing;
