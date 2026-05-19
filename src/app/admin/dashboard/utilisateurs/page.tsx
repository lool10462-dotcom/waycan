'use client'

import { useState } from 'react'
import { 
  Users, Search, ShieldCheck, ShieldAlert, Mail, Phone, 
  Trash2, ToggleLeft, ToggleRight, CheckCircle2, UserX
} from 'lucide-react'

interface User {
  id: string | number
  name: string
  email: string
  phone: string
  verified: boolean
  ads_count: number
  joined: string
  status: 'active' | 'suspended'
}

export default function AdminUtilisateurs() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Mohamed Ali', email: 'mohamed@email.com', phone: '+253 77 12 34 56', verified: true, ads_count: 12, joined: '12 Mars 2026', status: 'active' },
    { id: 2, name: 'Fatou Ahmed', email: 'fatou@email.com', phone: '+253 77 23 45 67', verified: true, ads_count: 5, joined: '20 Février 2026', status: 'active' },
    { id: 3, name: 'Youssef Ibrahim', email: 'youssef@email.com', phone: '+253 77 34 56 78', verified: false, ads_count: 0, joined: '19 Mai 2026', status: 'active' },
    { id: 4, name: 'Amina Barreh', email: 'amina@email.com', phone: '+253 77 45 67 89', verified: false, ads_count: 2, joined: '05 Janvier 2026', status: 'suspended' },
    { id: 5, name: 'Abdourahman Dileita', email: 'abdou@email.com', phone: '+253 77 56 78 90', verified: true, ads_count: 28, joined: '30 Novembre 2025', status: 'active' },
  ])
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase())
    if (filterType === 'verified') return matchesSearch && user.verified
    if (filterType === 'unverified') return matchesSearch && !user.verified
    if (filterType === 'suspended') return matchesSearch && user.status === 'suspended'
    return matchesSearch
  })

  const handleToggleVerify = (id: string | number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, verified: !u.verified } : u))
  }

  const handleToggleStatus = (id: string | number) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active'
        return { ...u, status: nextStatus }
      }
      return u
    }))
  }

  const handleDeleteUser = (id: string | number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer définitivement cet utilisateur ?")) return
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-text-main flex items-center gap-2">
          <Users className="w-8 h-8 text-primary" />
          Gestion des utilisateurs
        </h1>
        <p className="text-text-muted mt-1">Supervisez les comptes des utilisateurs de la plateforme, attribuez des badges de confiance ou suspendez-les.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent w-full text-sm transition-all"
          />
        </div>

        <div className="w-full md:w-48">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
          >
            <option value="all">Tous les comptes</option>
            <option value="verified">Vérifiés</option>
            <option value="unverified">Non vérifiés</option>
            <option value="suspended">Suspendus</option>
          </select>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Vérification</th>
                <th className="px-6 py-4 text-center text-xs font-extrabold text-text-muted uppercase tracking-wider">Annonces</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-right text-xs font-extrabold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-neutral/20 transition-colors ${user.status === 'suspended' ? 'bg-red-50/20' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent font-extrabold text-base border border-accent/20">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-text-main text-sm">{user.name}</p>
                        <p className="text-[10px] text-text-muted mt-0.5">Inscrit le {user.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-text-main flex items-center gap-1"><Mail className="w-3 h-3 text-gray-400" /> {user.email}</span>
                      <span className="text-[10px] text-text-muted flex items-center gap-1"><Phone className="w-3 h-3 text-gray-400" /> {user.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleToggleVerify(user.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                        user.verified 
                          ? 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100' 
                          : 'text-gray-500 bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {user.verified ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                      {user.verified ? 'Vérifié' : 'Non vérifié'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="font-bold text-xs bg-neutral px-2.5 py-1 border rounded-lg text-text-main">{user.ads_count}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      user.status === 'active' 
                        ? 'text-green-700 bg-green-50 border-green-200' 
                        : 'text-red-700 bg-red-50 border-red-200'
                    }`}>
                      {user.status === 'active' ? 'Actif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleToggleStatus(user.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          user.status === 'active'
                            ? 'text-red-600 hover:bg-red-50 border-red-100'
                            : 'text-green-600 hover:bg-green-50 border-green-100'
                        }`}
                        title={user.status === 'active' ? "Suspendre l'utilisateur" : "Activer l'utilisateur"}
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
                        title="Supprimer définitivement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
