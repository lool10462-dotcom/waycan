'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdCard from './AdCard'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

const filters = ['Tout', 'Véhicules', 'Immobilier', 'Multimédia', 'Emplois & Services', 'Maison, Décoration', 'Loisirs et sports']

export default function FeaturedAds() {
  const [activeFilter, setActiveFilter] = useState('Tout')
  const [ads, setAds] = useState<any[]>([])
  const [banners, setBanners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // 1. Récupérer les annonces
      const { data: adsData, error: adsError } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false })

      if (!adsError && adsData) {
        setAds(adsData)
      }

      // 2. Récupérer les bannières publicitaires personnalisées
      const { data: bannersData, error: bannersError } = await supabase
        .from('banners')
        .select('*')
        .eq('status', 'active')
      
      if (!bannersError && bannersData) {
        setBanners(bannersData)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  // Filtrage intelligent et gestion automatique de l'expiration Premium
  const filteredAds = activeFilter === 'Tout' 
    ? ads 
    : ads.filter(ad => {
        // Validation basique de catégorie
        return ad.category?.toLowerCase() === activeFilter.toLowerCase()
      })

  return (
    <section className="py-16 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Affichage d'une bannière publicitaire (Style Google Adsense personnalisé) */}
        {banners.length > 0 && banners.find(b => b.position === 'top') && (
          <div className="w-full mb-12 flex justify-center">
            <a href={banners.find(b => b.position === 'top')?.link_url || '#'} target="_blank" rel="noopener noreferrer" className="block w-full max-w-4xl relative group rounded-xl overflow-hidden shadow-sm">
              <span className="absolute top-0 right-0 bg-black/50 text-white text-[10px] px-2 py-1 z-10 rounded-bl-lg">Publicité WAYCAN</span>
              <img 
                src={banners.find(b => b.position === 'top')?.image_url} 
                alt="Publicité Partenaire" 
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </a>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main">
              Dernières Annonces
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-muted hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : filteredAds.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
            <span className="text-4xl mb-4 block">🔍</span>
            <p>Aucune annonce trouvée pour "{activeFilter}".</p>
            <p className="text-sm mt-2">Soyez le premier à publier dans cette catégorie !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
            {filteredAds.map((ad) => {
              // Système Antibug : Auto-expiration Premium. 
              // Si premium_expires_at est dépassé par rapport à la date actuelle, isPremium devient faux.
              const isPremiumActive = ad.is_premium && 
                (!ad.premium_expires_at || new Date(ad.premium_expires_at) > new Date())

              // Extraction sécurisée des images (Support chaîne JSON ou tableau natif)
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
              const mainImage = imagesArray.length > 0 ? imagesArray[0] : 'https://placehold.co/600x400?text=Pas+d%27image'

              return (
                <AdCard
                  key={ad.id}
                  id={ad.id}
                  title={ad.title}
                  price={ad.price ? ad.price.toString() : 'Sur demande'}
                  image={mainImage}
                  location={ad.location || 'Djibouti'}
                  date="Récent"
                  views={Math.floor(Math.random() * 100) + 10}
                  isPremium={isPremiumActive}
                  category={ad.category || 'Général'}
                />
              )
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/annonces" className="btn-outline inline-flex items-center gap-2">
            Explorer tout le catalogue
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}