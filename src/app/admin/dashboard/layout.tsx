'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Users, FileText, MessageCircle, BarChart3, Settings, 
  Shield, DollarSign, Bell, LogOut, Menu, X, Search
} from 'lucide-react'

const adminNav = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FileText, label: 'Annonces', href: '/admin/dashboard/annonces' },
  { icon: Users, label: 'Utilisateurs', href: '/admin/dashboard/utilisateurs' },
  { icon: MessageCircle, label: 'Messages', href: '/admin/dashboard/messages' },
  { icon: BarChart3, label: 'Statistiques', href: '/admin/dashboard/statistiques' },
  { icon: DollarSign, label: 'Abonnements', href: '/admin/dashboard/abonnements' },
  { icon: Shield, label: 'Modération', href: '/admin/dashboard/moderation' },
  { icon: Settings, label: 'Paramètres', href: '/admin/dashboard/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Perform any logout logic here
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-neutral flex font-sans">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0d2d5a] text-white transition-all duration-300 fixed lg:relative z-30 h-screen flex flex-col shadow-xl`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10 h-20">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-[#0d2d5a] font-black text-2xl">W</span>
              </div>
              <span className="font-extrabold text-xl tracking-wider">WAYCAN</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <span className="text-[#0d2d5a] font-black text-xl">W</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {adminNav.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-accent text-white font-bold shadow-lg shadow-accent/20 translate-x-1' 
                    : 'hover:bg-white/5 text-white/80 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-white/60'}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-red-500/10 text-red-300 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-semibold">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="bg-white border-b h-20 px-6 lg:px-8 flex items-center justify-between flex-shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-text-main hidden sm:block">WAYCAN Administration</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="Recherche globale..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent w-64 text-sm transition-all"
              />
            </div>
            <button className="relative p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
            </button>
            <div className="flex items-center gap-3 p-1.5 pr-3 bg-neutral rounded-xl border border-gray-100">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                A
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-xs text-text-main">Admin WAYCAN</p>
                <p className="text-[10px] text-text-muted">Super Administrateur</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 bg-neutral/40 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
