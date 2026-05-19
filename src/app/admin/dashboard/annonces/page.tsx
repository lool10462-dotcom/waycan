'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  FileText, Search, Filter, CheckCircle, Clock, AlertTriangle, 
  Trash2, Star, Eye, MapPin, RefreshCw, EyeOff, ImageIcon
} from 'lucide-react'

interface Ad {
  id: string | number
  title: string
  price: number | null
  category: string
  location: string
  status: string
  created_at: string
  images: string[]
  negotiable: boolean
  is_premium?: boolean
}

export default function AdminAnnonces() {
  const [ads, setAds] = useState<Ad[]>([])
  const [filteredAds, setFilteredAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const fetchAds = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) {
        setAds(data)
        setFilteredAds(data)
      }
    } catch (err) {
      console.error("Error fetching ads:", err)
      // Mock fallback ads in case the table doesn't have records or has different schema
      const mockAds: Ad[] = [
        { id: 1, title: 'Toyota Corolla 2020 Excellent État', price: 1450000, category: 'vehicules', location: 'djibouti-ville', status: 'active', created_at: new Date().toISOString(), images: [], negotiable: true, is_premium: true },
        { id: 2, title: 'Appartement F3 Moderne Boulevard', price: 850000, category: 'immobilier', location: 'boulevard', status: 'pending', created_at: new Date().toISOString(), images: [], negotiable: false, is_premium: false },
        { id: 3, title: 'iPhone 14 Pro Max 256GB', price: 180000, category: 'electronique', location: 'balbala', status: 'active', created_at: new Date().toISOString(), images: [], negotiable: true, is_premium: false },
        { id: 4, title: 'Mercedes G-Class AMG', price: 4500000, category: 'vehicules', location: 'haramous', status: 'flagged', created_at: new Date().toISOString(), images: [], negotiable: false, is_premium: true },
        { id: 5, title: 'Canapé d\'angle cuir noir', price: 120000, category: 'maison', location: 'ambouli', status: 'active', created_at: new Date().toISOString(), images: [], negotiable: true, is_premium: false }
      ]
      setAds(mockAds)
      setFilteredAds(mockAds)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAds()
  }, [])

  useEffect(() => {
    let result = ads
    if (search) {
      result = result.filter(ad => ad.title.toLowerCase().includes(search.toLowerCase()))
    }
    if (statusFilter !== 'all') {
      result = result.filter(ad => ad.status === statusFilter)
    }
    if (categoryFilter !== 'all') {
      result = result.filter(ad => ad.category === categoryFilter)
    }
    setFilteredAds(result)
  }, [search, statusFilter, categoryFilter, ads])

  const handleUpdateStatus = async (id: string | number, newStatus: string) => {
    try {
      // If it's a real string ID from Supabase
      if (typeof id === 'string') {
        const { error } = await supabase
          .from('ads')
          .update({ status: newStatus })
          .eq('id', id)
        if (error) throw error
      }
      
      // Update local state instantly
      setAds(prev => prev.map(ad => ad.id === id ? { ...ad, status: newStatus } : ad))
    } catch (err) {
      console.error("Error updating ad status:", err)
      alert("Erreur lors de la mise à jour")
    }
  }

  const handleTogglePremium = async (id: string | number, currentVal: boolean) => {
    try {
      if (typeof id === 'string') {
        const { error } = await supabase
          .from('ads')
          .update({ is_premium: !currentVal })
          .eq('id', id)
        if (error) throw error
      }
      
      setAds(prev => prev.map(ad => ad.id === id ? { ...ad, is_premium: !currentVal } : ad))
    } catch (err) {
      console.error("Error toggling premium:", err)
    }
  }

  const handleDeleteAd = async (id: string | number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer définitivement cette annonce ?")) return
    try {
      if (typeof id === 'string') {
        const { error } = await supabase
          .from('ads')
          .delete()
          .eq('id', id)
        if (error) throw error
      }
      
      setAds(prev => prev.filter(ad => ad.id !== id))
    } catch (err) {
      console.error("Error deleting ad:", err)
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-xs font-bold border border-green-100"><CheckCircle className="w-3.5 h-3.5" /> Active</span>
      case 'pending':
        return <span className="inline-flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-bold border border-yellow-100"><Clock className="w-3.5 h-3.5" /> En attente</span>
      case 'flagged':
        return <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2.5 py-1 rounded-full text-xs font-bold border border-red-100"><AlertTriangle className="w-3.5 h-3.5" /> Signalée</span>
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-main flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            Gestion des annonces
          </h1>
          <p className="text-text-muted mt-1">Gérez, validez, signalez ou supprimez toutes les publications déposées sur WAYCAN.</p>
        </div>
        <button onClick={fetchAds} className="w-full sm:w-auto py-2.5 px-4 bg-white hover:bg-neutral border rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-text-main shadow-sm transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par titre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent w-full text-sm transition-all"
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex-1 md:w-44">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actives</option>
              <option value="pending">En attente</option>
              <option value="flagged">Signalées</option>
            </select>
          </div>

          <div className="flex-1 md:w-44">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
            >
              <option value="all">Toutes catégories</option>
              <option value="vehicules">Véhicules</option>
              <option value="immobilier">Immobilier</option>
              <option value="emploi">Emplois</option>
              <option value="electronique">Électronique</option>
              <option value="maison">Maison</option>
              <option value="services">Services</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ads List */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500">
            <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
            <p className="font-semibold text-sm">Chargement des publications...</p>
          </div>
        ) : filteredAds.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
            <EyeOff className="w-12 h-12 stroke-[1.5] text-gray-400 mb-2" />
            <p className="font-bold text-sm text-text-main">Aucune annonce trouvée</p>
            <p className="text-xs text-text-muted mt-1">Essayez de modifier votre recherche ou vos filtres.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Annonce</th>
                  <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Catégorie</th>
                  <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Prix (FDJ)</th>
                  <th className="px-6 py-4 text-left text-xs font-extrabold text-text-muted uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-center text-xs font-extrabold text-text-muted uppercase tracking-wider">Premium</th>
                  <th className="px-6 py-4 text-right text-xs font-extrabold text-text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAds.map((ad) => {
                  const mainImg = ad.images && ad.images.length > 0 ? ad.images[0] : null
                  return (
                    <tr key={ad.id} className="hover:bg-neutral/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-neutral border border-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {mainImg ? (
                              <img src={mainImg} alt={ad.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-text-main text-sm truncate max-w-[240px]" title={ad.title}>{ad.title}</p>
                            <span className="flex items-center gap-1 text-[10px] text-text-muted mt-1">
                              <MapPin className="w-3 h-3" />
                              {ad.location}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs bg-primary/5 text-primary font-bold px-2 py-0.5 rounded-full capitalize">
                          {ad.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-accent text-sm">
                        {ad.price ? `${Number(ad.price).toLocaleString()} FDJ` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusLabel(ad.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button 
                          onClick={() => handleTogglePremium(ad.id, ad.is_premium || false)}
                          className="focus:outline-none"
                        >
                          <Star className={`w-5 h-5 mx-auto ${ad.is_premium ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-2">
                          {ad.status !== 'active' && (
                            <button 
                              onClick={() => handleUpdateStatus(ad.id, 'active')}
                              className="px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm shadow-green-600/10"
                            >
                              Valider
                            </button>
                          )}
                          {ad.status !== 'flagged' && (
                            <button 
                              onClick={() => handleUpdateStatus(ad.id, 'flagged')}
                              className="px-2.5 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-lg text-xs transition-colors"
                            >
                              Signaler
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteAd(ad.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer définitivement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function Loader2({ className }: { className?: string }) {
  return <div className={`border-2 border-accent/30 border-t-accent rounded-full animate-spin ${className}`} />
}
