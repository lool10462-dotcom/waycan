'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FileText, Users, Eye, DollarSign, AlertTriangle, CheckCircle, 
  Clock, MoreVertical, Trash2, Edit, RefreshCw, Download, 
  MapPin, Star, ShieldCheck, Mail, XCircle, BarChart3
} from 'lucide-react'

const stats = [
  { label: 'Annonces actives', value: '15,234', change: '+12%', icon: FileText, color: 'bg-primary' },
  { label: 'Utilisateurs', value: '52,847', change: '+8%', icon: Users, color: 'bg-secondary' },
  { label: 'Vues aujourd\'hui', value: '8,942', change: '+23%', icon: Eye, color: 'bg-accent' },
  { label: 'Revenus mois', value: '2.4M FDJ', change: '+15%', icon: DollarSign, color: 'bg-green-600' },
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
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full"><CheckCircle className="w-3.5 h-3.5" /> Active</span>
      case 'pending': return <span className="flex items-center gap-1 text-yellow-600 text-xs font-semibold bg-yellow-50 px-2 py-1 rounded-full"><Clock className="w-3.5 h-3.5" /> En attente</span>
      case 'flagged': return <span className="flex items-center gap-1 text-red-600 text-xs font-semibold bg-red-50 px-2 py-1 rounded-full"><AlertTriangle className="w-3.5 h-3.5" /> Signalée</span>
      default: return status
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Message */}
      <div>
        <h1 className="text-3xl font-extrabold text-text-main">Tableau de bord administrateur</h1>
        <p className="text-text-muted mt-1">Consultez les statistiques générales et gérez l'activité en temps réel de WAYCAN.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-md shadow-black/5`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold">{stat.change}</span>
            </div>
            <p className="text-3xl font-black text-text-main">{stat.value}</p>
            <p className="text-text-muted text-sm font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Ads and Moderation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Ads Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="font-bold text-text-main flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-primary" />
              Dernières annonces publiées
            </h2>
            <Link href="/admin/dashboard/annonces" className="text-sm font-bold text-accent hover:underline">
              Gérer tout →
            </Link>
          </div>
          <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
            {recentAds.map((ad) => (
              <div key={ad.id} className="p-4 flex items-center justify-between hover:bg-neutral/30 transition-colors">
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-text-main truncate text-sm">{ad.title}</p>
                    {ad.premium && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-muted mt-1.5">
                    <span className="font-semibold text-accent">{ad.price}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {ad.views} vues</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {ad.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(ad.status)}
                  <div className="relative group">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-text-muted" />
                    </button>
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[140px] p-1.5">
                      <Link href="/admin/dashboard/annonces" className="w-full px-3 py-2 text-left text-xs hover:bg-neutral rounded-lg flex items-center gap-2 font-medium text-text-main">
                        <Eye className="w-4 h-4 text-gray-500" /> Voir
                      </Link>
                      <button className="w-full px-3 py-2 text-left text-xs hover:bg-neutral rounded-lg flex items-center gap-2 font-medium text-text-main">
                        <Edit className="w-4 h-4 text-gray-500" /> Modifier
                      </button>
                      <button className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 font-medium">
                        <Trash2 className="w-4 h-4" /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged Ads Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="font-bold text-text-main flex items-center gap-2 text-lg">
              <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
              Annonces signalées
            </h2>
            <Link href="/admin/dashboard/moderation" className="text-sm font-bold text-red-500 hover:underline">
              Modérer tout →
            </Link>
          </div>
          <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
            {flaggedAds.map((ad) => (
              <div key={ad.id} className="p-4 flex items-center justify-between hover:bg-neutral/30 transition-colors">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-bold text-text-main text-sm">{ad.title}</p>
                  <p className="text-xs text-red-600 font-medium bg-red-50 border border-red-100 rounded-lg p-2 mt-1.5">{ad.reason}</p>
                  <div className="flex items-center gap-4 text-xs text-text-muted mt-2">
                    <span>Signalé par : <strong className="text-text-main">{ad.reporter}</strong></span>
                    <span>•</span>
                    <span>{ad.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-green-600/10">
                    Valider
                  </button>
                  <button className="px-3.5 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-all">
                    Rejeter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Users and Quick stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Users Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="font-bold text-text-main flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-secondary" />
              Nouveaux utilisateurs
            </h2>
            <button className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Actualiser
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Utilisateur</th>
                  <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Annonces</th>
                  <th className="px-6 py-4 text-center text-xs font-extrabold text-text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-base border border-primary/20">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-text-main text-sm">{user.name}</p>
                          <p className="text-[10px] text-text-muted font-medium">Inscrit {user.joined}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-xs font-semibold text-text-main">{user.email}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{user.phone}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.verified ? (
                        <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-bold border border-green-100">
                          <ShieldCheck className="w-3.5 h-3.5" /> Vérifié
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full text-xs font-bold border border-yellow-100">
                          <Clock className="w-3.5 h-3.5" /> Attente
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-text-main font-bold bg-neutral px-2.5 py-1 rounded-lg border border-gray-100 text-xs">{user.ads}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="p-1.5 hover:bg-neutral hover:text-accent rounded-lg text-gray-500 transition-colors" title="Voir le profil">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-neutral hover:text-primary rounded-lg text-gray-500 transition-colors" title="Envoyer un email">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-600 rounded-lg transition-colors" title="Suspendre">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Chart mockup */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-text-main mb-6 flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-accent" />
              Statistiques rapides
            </h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-text-muted">Annonces Publiées</span>
                  <span className="text-text-main">15,234</span>
                </div>
                <div className="h-2 bg-neutral rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-text-muted">Utilisateurs actifs</span>
                  <span className="text-text-main">42,891</span>
                </div>
                <div className="h-2 bg-neutral rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-text-muted">Taux de conversion</span>
                  <span className="text-text-main">8.2%</span>
                </div>
                <div className="h-2 bg-neutral rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-text-muted">VIP / Premium</span>
                  <span className="text-text-main">3,421</span>
                </div>
                <div className="h-2 bg-neutral rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '22%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <button className="w-full py-3.5 bg-neutral hover:bg-gray-100 text-text-main border border-gray-200 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Exporter le rapport
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}