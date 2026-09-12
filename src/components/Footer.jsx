import { Link } from 'react-router-dom'
import { Instagram, Mail, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import WireLoop from './WireLoop'
import { CATEGORIES } from '../data/sampleProducts'

export default function Footer() {
  return (
    <footer className="bg-midnight-800 text-silver-200 mt-24">
      <div className="container-page pt-16 pb-8">
        <WireLoop className="w-40 h-6 text-midnight-400 mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo dark />
            <p className="mt-4 text-[14px] leading-relaxed text-silver-300 max-w-[220px]">
              Every piece is shaped by hand, one wire at a time, in small batches.
            </p>
          </div>

          <div>
            <p className="text-[13px] uppercase tracking-wider text-silver-400 mb-4">Shop</p>
            <ul className="space-y-2.5 text-[14.5px]">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link to={`/shop?category=${c.slug}`} className="text-silver-200 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] uppercase tracking-wider text-silver-400 mb-4">Brand</p>
            <ul className="space-y-2.5 text-[14.5px]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/custom" className="hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[13px] uppercase tracking-wider text-silver-400 mb-4">Say hello</p>
            <ul className="space-y-3 text-[14.5px]">
              <li className="flex items-center gap-2"><Instagram size={16} /> @lunabluemetal</li>
              <li className="flex items-center gap-2"><MessageCircle size={16} /> WhatsApp orders welcome</li>
              <li className="flex items-center gap-2"><Mail size={16} /> hello@lunabluemetal.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-2 justify-between text-[13px] text-silver-400">
          <p>© {new Date().getFullYear()} Luna Blue Metal. Handmade to order.</p>
          <p>Every piece may vary slightly — that is the hand in handmade.</p>
        </div>
      </div>
    </footer>
  )
}
