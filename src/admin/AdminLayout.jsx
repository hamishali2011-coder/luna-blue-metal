import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, LogOut, Menu, Package, Settings, ShoppingCart, X } from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { signOut, user } = useAuth()
  const [open, setOpen] = useState(false)

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-5 h-[84px] flex items-center border-b border-white/10">
        <Logo dark />
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14.5px] font-medium transition-colors ${
                isActive ? 'bg-white/10 text-white' : 'text-silver-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={17} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-white/10">
        <p className="px-3 text-[12.5px] text-silver-400 truncate mb-2">{user?.email}</p>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14.5px] font-medium text-silver-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <LogOut size={17} /> Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-mist flex">
      <aside className="hidden md:block w-60 shrink-0 bg-midnight-900">{SidebarContent}</aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-midnight-900">
            <button onClick={() => setOpen(false)} className="absolute top-5 right-3 text-white" aria-label="Close menu">
              <X size={20} />
            </button>
            {SidebarContent}
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="md:hidden h-[76px] bg-midnight-900 flex items-center px-4">
          <button onClick={() => setOpen(true)} className="text-white" aria-label="Open menu"><Menu size={22} /></button>
          <div className="ml-3"><Logo dark /></div>
        </header>
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
