import { Link } from 'react-router-dom'
import { ArrowRight, Gift, Recycle, Sparkles, Truck } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { CATEGORIES } from '../data/sampleProducts'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import WireLoop from '../components/WireLoop'

const REVIEWS = [
  { name: 'Ayesha K.', text: 'The bouquet looked exactly like the photos and lasted through the whole event. Ordering on WhatsApp was so easy.', role: 'Karachi' },
  { name: 'Zainab R.', text: 'My phone charm gets compliments every week. You can tell each one is actually shaped by hand.', role: 'Lahore' },
  { name: 'Hamza S.', text: 'Ordered a custom gift set for my sister and the packaging alone made it feel special.', role: 'Islamabad' },
]

const WHY_US = [
  { icon: Sparkles, title: 'Made by hand', text: 'Every loop and petal is shaped one at a time — nothing here is mass produced.' },
  { icon: Truck, title: 'Careful delivery', text: 'Packed to travel safely, with tracking shared over WhatsApp.' },
  { icon: Gift, title: 'Custom orders', text: 'Colours, initials and sizes made to your request, at no extra rush.' },
  { icon: Recycle, title: 'Built to last', text: 'Wire-core pieces that hold their shape — no wilting, ever.' },
]

const GALLERY_SEEDS = ['luna-ig-1', 'luna-ig-2', 'luna-ig-3', 'luna-ig-4', 'luna-ig-5', 'luna-ig-6']

export default function Home() {
  const { products } = useProducts()
  const featured = products.filter((p) => p.featured).slice(0, 4)
  const newArrivals = [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4)
  const bestSellers = [...products].sort((a, b) => a.stock - b.stock).slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-midnight-500 font-medium text-[14px] mb-4">Handmade in small batches</p>
            <h1 className="font-display text-[40px] sm:text-[54px] leading-[1.05] text-ink">
              Wire, twisted by hand, into something worth keeping.
            </h1>
            <p className="mt-5 text-[16px] text-ink/60 leading-relaxed max-w-md">
              Luna Blue Metal shapes pipe-cleaner keychains, bouquets and charms in soft blue and
              silver tones — each one bent, coiled and finished by hand.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-midnight-700 text-white px-6 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-midnight-800 transition-colors"
              >
                Shop the collection <ArrowRight size={16} />
              </Link>
              <Link to="/custom" className="text-[14.5px] font-medium text-ink/70 hover:text-ink underline underline-offset-4">
                Request a custom piece
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="grid grid-cols-5 grid-rows-5 gap-3 h-[380px] sm:h-[460px]">
              <div className="col-span-3 row-span-3 rounded-3xl overflow-hidden bg-mist">
                <img src="https://picsum.photos/seed/luna-hero-1/700/700" alt="Handmade wire bouquet" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-2 row-span-2 col-start-4 rounded-2xl overflow-hidden bg-mist">
                <img src="https://picsum.photos/seed/luna-hero-2/500/500" alt="Wire keychain detail" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-2 row-span-3 col-start-4 row-start-3 rounded-2xl overflow-hidden bg-midnight-700">
                <img src="https://picsum.photos/seed/luna-hero-3/500/700" alt="Wire flower stem" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="col-span-3 row-span-2 row-start-4 rounded-2xl overflow-hidden bg-mist">
                <img src="https://picsum.photos/seed/luna-hero-4/700/500" alt="Bag charm on strap" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand intro */}
      <section className="container-page py-10">
        <WireLoop className="w-32 h-5 text-midnight-300 mb-6" />
        <p className="font-display text-[22px] sm:text-[26px] leading-snug text-ink max-w-2xl">
          What started as a hobby with leftover pipe cleaners is now a small studio making
          keychains, bouquets and charms for people who like their accessories a little different.
        </p>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="container-page py-14">
          <div className="flex items-end justify-between mb-8">
            <SectionHeading eyebrow="Handpicked" title="Featured pieces" />
            <Link to="/shop" className="hidden sm:inline text-[14px] font-medium text-ink/60 hover:text-ink">View all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="container-page py-14">
        <SectionHeading eyebrow="Browse" title="Shop by category" />
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              to={`/shop?category=${c.slug}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-midnight-800"
            >
              <img
                src={`https://picsum.photos/seed/luna-cat-${i}/500/620`}
                alt={c.label}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-display text-[19px]">{c.label}</p>
                <p className="text-silver-200 text-[12.5px] mt-0.5">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      {newArrivals.length > 0 && (
        <section className="container-page py-14">
          <div className="flex items-end justify-between mb-8">
            <SectionHeading eyebrow="Just in" title="New arrivals" />
            <Link to="/shop" className="hidden sm:inline text-[14px] font-medium text-ink/60 hover:text-ink">View all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Custom order */}
      <section className="container-page py-14">
        <div className="rounded-3xl bg-midnight-700 text-white grid md:grid-cols-2 overflow-hidden">
          <div className="p-9 sm:p-12 flex flex-col justify-center">
            <p className="text-midnight-200 text-[14px] font-medium mb-3">Made to order</p>
            <h2 className="font-display text-[28px] sm:text-[32px] leading-tight">
              Have something specific in mind?
            </h2>
            <p className="mt-4 text-[15px] text-silver-200 leading-relaxed max-w-sm">
              Send us a colour palette, an initial or an occasion, and we will shape a piece around it.
              Most custom orders are ready within 5–7 days.
            </p>
            <Link
              to="/custom"
              className="mt-7 inline-flex w-fit items-center gap-2 bg-white text-midnight-800 px-6 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-silver-100 transition-colors"
            >
              Start a custom order <ArrowRight size={16} />
            </Link>
          </div>
          <div className="min-h-[220px] md:min-h-full">
            <img src="https://picsum.photos/seed/luna-custom/700/600" alt="Custom order example" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Best sellers */}
      {bestSellers.length > 0 && (
        <section className="container-page py-14">
          <div className="flex items-end justify-between mb-8">
            <SectionHeading eyebrow="Loved by customers" title="Best sellers" />
            <Link to="/shop" className="hidden sm:inline text-[14px] font-medium text-ink/60 hover:text-ink">View all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="container-page py-14">
        <SectionHeading eyebrow="Why Luna Blue Metal" title="What makes each piece worth it" align="center" />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {WHY_US.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center px-2">
              <div className="mx-auto h-12 w-12 rounded-full bg-midnight-50 grid place-items-center text-midnight-700">
                <Icon size={20} />
              </div>
              <p className="mt-4 font-medium text-[15px] text-ink">{title}</p>
              <p className="mt-1.5 text-[13.5px] text-ink/55 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-mist py-16 mt-8">
        <div className="container-page">
          <SectionHeading eyebrow="From customers" title="Kind words" align="center" />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-paper rounded-2xl p-6 shadow-soft">
                <p className="text-[14.5px] text-ink/75 leading-relaxed">"{r.text}"</p>
                <p className="mt-4 text-[14px] font-semibold text-ink">{r.name}</p>
                <p className="text-[12.5px] text-ink/45">{r.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram gallery */}
      <section className="container-page py-14">
        <SectionHeading eyebrow="@lunabluemetal" title="From the studio" align="center" />
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {GALLERY_SEEDS.map((seed) => (
            <a
              key={seed}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square rounded-xl overflow-hidden bg-mist block"
            >
              <img src={`https://picsum.photos/seed/${seed}/300/300`} alt="Studio moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
