# Luna Blue Metal

A complete, data-driven e-commerce storefront for a handmade accessories brand
(keychains, bouquets, flowers, phone charms, bag charms, custom gifts),
built with React + Vite + Tailwind CSS, backed by Supabase (Database,
Storage, Auth).

## What's included

- **Customer storefront**: Home, Shop (search/filter/sort), Product Detail,
  Cart, Checkout, Order Success, Custom Order request.
- **Admin dashboard** (`/admin`): stats overview, product management
  (add/edit/delete + image upload), order management (status updates).
- **Supabase-ready data layer**: products load live from Supabase with a
  Realtime subscription, so admin changes appear on the storefront
  instantly. Falls back to bundled sample data if Supabase isn't
  configured yet, so the site is still browsable during setup.
- **Supabase schema** (`supabase/schema.sql`): `products`, `orders`,
  `order_items`, `customers` tables, Row Level Security policies, a
  `product-images` Storage bucket, and a stock-decrement helper function.

## 1. Install dependencies

```bash
npm install
```

## 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the SQL Editor, paste and run the contents of `supabase/schema.sql`.
   This creates all four tables, security policies, the image storage
   bucket, and a few starter products.
3. Under **Authentication → Users**, add one user (email + password) — this
   is your admin login. Any signed-in user is treated as an admin, so
   only create accounts for people who should manage the store.
4. Under **Project Settings → API**, copy your **Project URL** and
   **anon public key** (never the `service_role` key).

## 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in the two values from the previous step:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 4. Run it

```bash
npm run dev
```

Visit `http://localhost:5173` for the storefront and
`http://localhost:5173/admin/login` for the admin dashboard.

## 5. Build for production

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy to Vercel, Netlify,
Cloudflare Pages, or any static host. Set the same two `VITE_SUPABASE_*`
environment variables in your hosting provider's dashboard.

## Project structure

```
src/
  admin/        Admin dashboard pages (login, layout, dashboard, products, orders)
  components/   Shared UI (navbar, footer, product card, etc.)
  context/      Cart + Auth React contexts
  data/         Bundled sample products (fallback + category list)
  hooks/        Data-fetching hooks (products, admin stats, admin orders)
  lib/          Supabase client, order creation, admin CRUD, formatting
  pages/        Customer-facing route pages
supabase/
  schema.sql    Full database schema, RLS policies, storage bucket
```

## Notes

- The `service_role` key is never used in this frontend — only the public
  `anon` key, which is safe to expose and is restricted by the RLS
  policies in `schema.sql`.
- Delivery fee logic and free-delivery threshold live in
  `src/context/CartContext.jsx` — adjust `DELIVERY_FEE` and
  `FREE_DELIVERY_THRESHOLD` there.
- Product images uploaded from the admin panel go to the `product-images`
  Storage bucket and are served via Supabase's public CDN URL.
