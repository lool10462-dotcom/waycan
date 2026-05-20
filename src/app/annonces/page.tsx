'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdCard from '@/components/AdCard'
import { Grid, List, SlidersHorizontal, ChevronRight, MapPin, Loader2, Info, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const staticFallbackAds = [
  { id: '1', title: 'Toyota Corolla 2020 - Excellent état', price: '1,450,000', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', location: 'Djibouti-ville', date: 'Il y a 2 jours', views: 268, isPremium: true, category: 'vehicules' },
  { id: '2', title: 'Appartement F3 centre-ville avec vue mer', price: '850,000', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', location: 'Boulevard', date: 'Il y a 5 jours', views: 156, isPremium: false, category: 'immobilier' },
  { id: '3', title: 'iPhone 14 Pro Max 256GB - Comme neuf', price: '180,000', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80', location: 'Balbala', date: 'Il y a 1 jour', views: 89, isPremium: true, category: 'electronique' },
  { id: '4', title: 'Assistant commercial bilingue - CDD 6 mois', price: '120,000', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80', location: 'Djibouti-ville', date: 'Il y a 3 jours', views: 234, isPremium: false, category: 'emploi' },
  { id: '5', title: 'BMW X5 2019 - Luxe 4x4', price: '2,800,000', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', location: 'Ambouli', date: 'Il y a 1 semaine', views: 312, isPremium: true, category: 'vehicules' },
  { id: '6', title: 'Villa moderne avec piscine', price: '5,500,000', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', location: 'Haramous', date: 'Il y a 4 jours', views: 178, isPremium: true, category: 'immobilier' },
]

const CATEGORIES = [
  { slug: 'all', name: 'Toutes les catégories' },
  { slug: 'vehicules', name: 'Véhicules' },
  { slug: 'immobilier', name: 'Immobilier' },
  { slug: 'emploi', name: 'Emplois' },
  { slug: 'electronique', name: 'Électronique' },
  { slug: 'maison', name: 'Maison' },
  { slug: 'services', name: 'Services' },
]

const LOCATIONS = ['Djibouti-ville', 'Balbala', 'Boulevard', 'Haramous', 'Ambouli', 'Ali-Sabieh', 'Tadjourah', 'Obock']

export default function AnnoncesPage() {
  const [ads, setAds] = useState<any[]>([])
  const [filteredAds, setFilteredAds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Filter States
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [location, setLocation] = useState('all')
  const [premiumOnly, setPremiumOnly] = useState(false)
  const [sort, setSort] = useState('recent')

  // Fetch ads from Supabase
  useEffect(() => {
    const fetchAllAds = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data) {
          // Parse images safely for all fetched items
          const mapped = data.map((ad: any) => {
            let imagesArray: string[] = []
            if (ad.images) {
              if (Array.isArray(ad.images)) {
                imagesArray = ad.images
              } else if (typeof ad.images === 'string') {
                try {
                  const parsed = JSON.parse(ad.images)
                  if (Array.isArray(parsed)) {
                    imagesArray = parsed
                  } else {
                    imagesArray = [ad.images]
                  }
                } catch {
                  imagesArray = [ad.images]
                }
              }
            }

            return {
              id: ad.id,
              title: ad.title || 'Sans titre',
              price: ad.price ? ad.price : null,
              rawPrice: ad.price, // keep numerical for min/max filters
              image: imagesArray.length > 0 ? imagesArray[0] : 'https://placehold.co/600x400?text=Pas+d%27image',
              location: ad.location || 'Djibouti',
              date: ad.created_at ? new Date(ad.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : "Aujourd'hui",
              views: ad.views || 0,
              isPremium: ad.is_premium || false,
              category: ad.category || 'Général',
              created_at: ad.created_at
            }
          })

          // Combine database ads + fallback if empty, to ensure something is always displayed
          setAds(mapped.length > 0 ? mapped : staticFallbackAds.map(ad => ({ ...ad, rawPrice: parseFloat(ad.price.replace(/,/g, '')) })))
        } else {
          // Fallback to mock ads
          setAds(staticFallbackAds.map(ad => ({ ...ad, rawPrice: parseFloat(ad.price.replace(/,/g, '')) })))
        }
      } catch (err) {
        console.error(err)
        setAds(staticFallbackAds.map(ad => ({ ...ad, rawPrice: parseFloat(ad.price.replace(/,/g, '')) })))
      } finally {
        setLoading(false)
      }
    }

    fetchAllAds()
  }, [])

  // Filter and Sort trigger
  useEffect(() => {
    let result = [...ads]

    // 1. Search filter (case-insensitive on Title)
    if (search.trim()) {
      result = result.filter(ad => ad.title.toLowerCase().includes(search.toLowerCase()))
    }

    // 2. Category filter
    if (category !== 'all') {
      result = result.filter(ad => ad.category?.toLowerCase() === category.toLowerCase())
    }

    // 3. Location filter
    if (location !== 'all') {
      result = result.filter(ad => ad.location?.toLowerCase().includes(location.toLowerCase()))
    }

    // 4. Minimum Price
    if (minPrice) {
      result = result.filter(ad => ad.rawPrice !== null && ad.rawPrice >= parseFloat(minPrice))
    }

    // 5. Maximum Price
    if (maxPrice) {
      result = result.filter(ad => ad.rawPrice !== null && ad.rawPrice <= parseFloat(maxPrice))
    }

    // 6. Premium Only
    if (premiumOnly) {
      result = result.filter(ad => ad.isPremium === true)
    }

    // 7. Sort
    if (sort === 'recent') {
      result.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    } else if (sort === 'price_asc') {
      result.sort((a, b) => (a.rawPrice || 0) - (b.rawPrice || 0))
    } else if (sort === 'price_desc') {
      result.sort((a, b) => (b.rawPrice || 0) - (a.rawPrice || 0))
    } else if (sort === 'views') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0))
    }

    setFilteredAds(result)
  }, [search, category, location, minPrice, maxPrice, premiumOnly, sort, ads])

  const handleResetFilters = () => {
    setSearch('')
    setCategory('all')
    setLocation('all')
    setMinPrice('')
    setMaxPrice('')
    setPremiumOnly(false)
    setSort('recent')
  }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-main">Toutes les annonces</span>
        </nav>

        {/* Search header & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-main">Toutes les annonces</h1>
            <p className="text-text-muted mt-2">{filteredAds.length} {filteredAds.length > 1 ? 'annonces trouvées' : 'annonce trouvée'}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Real-time search bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
            </div>

            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border rounded-xl bg-surface focus:ring-2 focus:ring-accent focus:outline-none text-sm"
            >
              <option value="recent">Plus récentes</option>
              <option value="price_asc">Prix: Croissant</option>
              <option value="price_desc">Prix: Décroissant</option>
              <option value="views">Plus populaires</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-surface rounded-xl p-6 sticky top-24 border border-gray-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-bold text-text-main flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-primary" /> Filtres
                </h3>
                <button 
                  onClick={handleResetFilters}
                  className="text-xs text-accent font-bold hover:underline"
                >
                  Réinitialiser
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-2">Catégorie</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-accent focus:outline-none text-sm"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price range */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1">Prix (FDJ)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-accent text-sm" 
                    />
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-accent text-sm" 
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-2">Localisation</label>
                  <select 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-accent focus:outline-none text-sm"
                  >
                    <option value="all">Toutes localisations</option>
                    {LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Premium checklist */}
                <label className="flex items-center gap-3 cursor-pointer p-1">
                  <input 
                    type="checkbox" 
                    checked={premiumOnly}
                    onChange={(e) => setPremiumOnly(e.target.checked)}
                    className="rounded text-accent w-4.5 h-4.5 cursor-pointer focus:ring-accent" 
                  />
                  <span className="text-sm font-semibold text-text-main">Uniquement Premium</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-32 text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="font-semibold text-sm">Chargement des annonces...</p>
              </div>
            ) : filteredAds.length === 0 ? (
              <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center p-6">
                <span className="text-5xl mb-4">🔍</span>
                <p className="font-bold text-lg text-text-main">Aucune annonce correspondante</p>
                <p className="text-sm text-text-muted mt-2 max-w-md leading-relaxed">Nous n'avons trouvé aucune annonce correspondant à vos critères de recherche actuels. Essayez de réinitialiser vos filtres.</p>
                <button 
                  onClick={handleResetFilters}
                  className="mt-6 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/95 transition-all shadow shadow-primary/10"
                >
                  Effacer les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAds.map((ad) => (
                  <AdCard 
                    key={ad.id} 
                    id={ad.id}
                    title={ad.title}
                    price={ad.price ? Number(ad.price).toLocaleString() : 'Sur demande'}
                    image={ad.image}
                    location={ad.location}
                    date={ad.date}
                    views={ad.views}
                    isPremium={ad.isPremium}
                    category={ad.category}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}