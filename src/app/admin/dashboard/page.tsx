'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, Users, FileText, MessageCircle, BarChart3, Settings, 
  Shield, TrendingUp, Eye, DollarSign, AlertTriangle, CheckCircle, 
  XCircle, Search, Filter, MoreVertical, Trash2, Edit, Eye as ViewEye,
  RefreshCw, Download, Bell, LogOut, ChevronLeft, Menu, X, ShieldCheck,
  Phone, Mail, MapPin, Clock, Star, ToggleLeft, ToggleRight
} from 'lucide-react'

const adminNav = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
  { icon: FileText, label: 'Annonces', href: '/admin/dashboard/annonces', active: false },
  { icon: Users, label: 'Utilisateurs', href: '/admin/dashboard/utilisateurs', active: false },
  { icon: MessageCircle, label: 'Messages', href: '/admin/dashboard/messages', active: false },
  { icon: BarChart3, label: 'Statistiques', href: '/admin/dashboard/statistiques', active: false },
  { icon: DollarSign, label: 'Abonnements', href: '/admin/dashboard/abonnements', active: false },
  { icon: Shield, label: 'Modération', href: '/admin/dashboard/moderation', active: false },
  { icon: Settings, label: 'Paramètres', href: '/admin/dashboard/settings', active: false },
]

const stats = [
  { label: 'Annonces actives', value: '15,234', change: '+12%', icon: FileText, color: 'bg-primary' },
  { label: 'Utilisateurs', value: '52,847', change: '+8%', icon: Users, color: 'bg-secondary' },
  { label: 'Vues aujourd\'hui', value: '8,942', change: '+23%', icon: Eye, color: 'bg-accent' },
  { label: 'Revenus mois', value: '2.4M FDJ', change: '+15%', icon: DollarSign, color: 'bg-success' },
]

const recentAds = [
  { id: 1, title: 'Toyota Corolla 2020', price: '1,450,000 FDJ', status: 'active', views: 268, location: 'Djibouti-ville', date: 'Il y a 2h', premium: true },
  { id: 2, title: 'Appartement F3 Boulevard', price: '850,000 FDJ', status: 'pending', views: 0, location: 'Boulevard', date: 'Il y a 1h', premium: false },
  { id: 3, title: 'iPhone 14 Pro Max', price: '180,000 FDJ', status: 'active', views: 89, location: 'Balbala', date: 'Il y a 3h', premium: true },
  { id: 4, title: 'Mercedes G-Class', price: '4,500,000 FDJ', status: 'flagged', views: 456, location: 'Ambouli', date: 'Il y a 5h', premium: true },
  { id: 5, title: 'MacBook Pro M3', price: '350,000 FDJ', status: 'active', views: 145, location: 'Djibouti-ville', date: 'Il y a 6h', premium: false },
]

const recentUsers = [
  { id: 1, name: 'Mohamed Ali', email: 'mohamed@email.com', phone: '+253 77 12 34 56', verified: true, ads: 12, joined: 'Il y a 2 jours' },
  { id: 2, name: 'Fatou Ahmed', email: 'fatou@email.com', phone: '+253 77 23 45 67', verified: true, ads: 5, joined: 'Il y a 3 jours' },
  { id: 3, name: 'Youssef Ibrahim', email: 'youssef@email.com', phone: '+253 77 34 56 78', verified: false, ads: 0, joined: 'Aujourd\'hui' },
]

const flaggedAds = [
  { id: 1, title: 'Prix trop bas suspect', reason: 'Prix 80% en dessous du marché', reporter: 'Système automatique', date: 'Il y a 1h' },
  { id: 2, title: 'Contenu potentiellement dangereux', reason: 'Description inappropriée signalée', reporter: 'Utilisateur #4521', date: 'Il y a 3h' },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="flex items-center gap-1 text-success"><CheckCircle className="w-4 h-4" /> Active</span>
      case 'pending': return <span className="flex items-center gap-1 text-premium-gold"><Clock className="w-4 h-4" /> En attente</span>
      case 'flagged': return <span className="flex items-center gap-1 text-alert"><AlertTriangle className="w-4 h-4" /> Signalée</span>
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-neutral flex">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-primary text-white transition-all duration-300 fixed lg:relative z-30 h-screen`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">W</span>
              </div>
              <span className="font-bold text-xl">WAYCAN</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {adminNav.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white/70">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Déconnexion</span>}
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Dashboard Administrateur</h1>
            <p className="text-text-muted">Bienvenue sur le panneau de contrôle WAYCAN</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
            <button className="relative p-2 border rounded-lg hover:bg-gray-50">
              <Bell className="w-5 h-5 text-text-muted" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-alert text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-3 p-2 bg-surface rounded-lg border">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="font-medium text-sm">Admin Principal</p>
                <p className="text-xs text-text-muted">超级管理员</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-surface rounded-xl p-6 border">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-success text-sm font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-text-main">{stat.value}</p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-surface rounded-xl border overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-semibold text-text-main flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Dernières annonces
              </h2>
              <Link href="/admin/dashboard/annonces" className="text-sm text-primary hover:underline">
                Voir tout →
              </Link>
            </div>
            <div className="divide-y">
              {recentAds.map((ad) => (
                <div key={ad.id} className="p-4 flex items-center justify-between hover:bg-neutral/50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-text-main truncate">{ad.title}</p>
                      {ad.premium && <Star className="w-4 h-4 text-premium-gold fill-premium-gold flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-muted mt-1">
                      <span>{ad.price}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {ad.views}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ad.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {getStatusBadge(ad.status)}
                    <div className="relative group">
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-text-muted" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 bg-surface border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                          <ViewEye className="w-4 h-4" /> Voir
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                          <Edit className="w-4 h-4" /> Modifier
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-alert hover:bg-red-50 flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-xl border overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-semibold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-alert" />
                Annonces signalées
              </h2>
              <Link href="/admin/dashboard/moderation" className="text-sm text-primary hover:underline">
                Voir tout →
              </Link>
            </div>
            <div className="divide-y">
              {flaggedAds.map((ad) => (
                <div key={ad.id} className="p-4 flex items-center justify-between hover:bg-neutral/50">
                  <div className="flex-1">
                    <p className="font-medium text-text-main">{ad.title}</p>
                    <p className="text-sm text-text-muted mt-1">{ad.reason}</p>
                    <div className="flex items-center gap-4 text-xs text-text-muted mt-1">
                      <span>Signalé par: {ad.reporter}</span>
                      <span>•</span>
                      <span>{ad.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="px-3 py-1.5 bg-success text-white text-sm rounded-lg hover:bg-green-600">
                      valider
                    </button>
                    <button className="px-3 py-1.5 border border-alert text-alert text-sm rounded-lg hover:bg-red-50">
                      Rejeter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface rounded-xl border overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-semibold text-text-main flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                Nouveaux utilisateurs
              </h2>
              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                <RefreshCw className="w-4 h-4" /> Actualiser
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Utilisateur</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Contact</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Statut</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Annonces</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-neutral/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-text-main">{user.name}</p>
                            <p className="text-sm text-text-muted">Inscrit {user.joined}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-main">{user.email}</p>
                        <p className="text-xs text-text-muted">{user.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        {user.verified ? (
                          <span className="flex items-center gap-1 text-success text-sm">
                            <ShieldCheck className="w-4 h-4" /> Vérifié
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-text-muted text-sm">
                            <Clock className="w-4 h-4" /> En attente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-text-main font-medium">{user.ads}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded" title="Voir le profil">
                            <ViewEye className="w-4 h-4 text-text-muted" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded" title="Envoyer un email">
                            <Mail className="w-4 h-4 text-text-muted" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded" title="Suspendre">
                            <XCircle className="w-4 h-4 text-alert" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-surface rounded-xl border p-6">
            <h2 className="font-semibold text-text-main mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              Statistiques rapides
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Annonces Publiées</span>
                  <span className="font-medium text-text-main">15,234</span>
                </div>
                <div className="h-2 bg-neutral rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Utilisateurs actifs</span>
                  <span className="font-medium text-text-main">42,891</span>
                </div>
                <div className="h-2 bg-neutral rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Taux de conversion</span>
                  <span className="font-medium text-text-main">8.2%</span>
                </div>
                <div className="h-2 bg-neutral rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Annonces Premium</span>
                  <span className="font-medium text-text-main">3,421</span>
                </div>
                <div className="h-2 bg-neutral rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '22%' }} />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button className="w-full btn-secondary flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Exporter le rapport
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Maintenance système</h3>
              <p className="text-white/80 text-sm">Dernière sauvegarde: Il y a 2 minutes</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm">
                <CheckCircle className="w-4 h-4" />
                Tous les systèmes opérationnels
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}