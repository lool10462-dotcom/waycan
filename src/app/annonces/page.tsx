'use client'

import Link from 'next/link'
import AdCard from '@/components/AdCard'
import { Grid, List, SlidersHorizontal, ChevronRight, MapPin } from 'lucide-react'

const allAds = [
  { id: '1', title: 'Toyota Corolla 2020 - Excellent état', price: '1,450,000', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', location: 'Djibouti-ville', date: 'Il y a 2 jours', views: 268, isPremium: true, category: 'vehicules' },
  { id: '2', title: 'Appartement F3 centre-ville avec vue mer', price: '850,000', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', location: 'Boulevard', date: 'Il y a 5 jours', views: 156, isPremium: false, category: 'immobilier' },
  { id: '3', title: 'iPhone 14 Pro Max 256GB - Comme neuf', price: '180,000', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80', location: 'Balbala', date: 'Il y a 1 jour', views: 89, isPremium: true, category: 'electronique' },
  { id: '4', title: 'Assistant commercial bilingue - CDD 6 mois', price: '120,000', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80', location: 'Djibouti-ville', date: 'Il y a 3 jours', views: 234, isPremium: false, category: 'emploi' },
  { id: '5', title: 'BMW X5 2019 - Luxe 4x4', price: '2,800,000', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', location: 'Ambouli', date: 'Il y a 1 semaine', views: 312, isPremium: true, category: 'vehicules' },
  { id: '6', title: 'Villa moderne avec piscine', price: '5,500,000', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', location: 'Haramous', date: 'Il y a 4 jours', views: 178, isPremium: true, category: 'immobilier' },
  { id: '7', title: 'MacBook Pro M3 14" - Garantie', price: '350,000', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80', location: 'Djibouti-ville', date: 'Il y a 2 jours', views: 145, isPremium: false, category: 'electronique' },
  { id: '8', title: 'Canapé d\'angle cuir noir', price: '95,000', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', location: 'Balbala', date: 'Il y a 6 jours', views: 67, isPremium: false, category: 'maison' },
  { id: '9', title: 'Honda Civic 2021 - Garantie', price: '1,650,000', image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&q=80', location: 'Boulevard', date: 'Il y a 3 jours', views: 189, isPremium: false, category: 'vehicules' },
  { id: '10', title: 'Terrain constructible 500m²', price: '450,000', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', location: 'Ali-Sabieh', date: 'Il y a 1 semaine', views: 98, isPremium: true, category: 'immobilier' },
  { id: '11', title: 'Samsung Galaxy S24 Ultra', price: '220,000', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80', location: 'Djibouti-ville', date: 'Il y a 2 jours', views: 112, isPremium: false, category: 'electronique' },
  { id: '12', title: 'Cours de mathématiques - Lycée', price: '25,000', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80', location: 'Balbala', date: 'Il y a 5 jours', views: 45, isPremium: false, category: 'services' },
]

const locations = ['Djibouti-ville', 'Balbala', 'Boulevard', 'Haramous', 'Ambouli', 'Ali-Sabieh', 'Tadjourah', 'Obock']

export default function AnnoncesPage() {
  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-main">Toutes les annonces</span>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-main">Toutes les annonces</h1>
            <p className="text-text-muted mt-2">{allAds.length.toLocaleString()} annonces disponibles</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border rounded-lg bg-surface">
              <option>Trier par: Plus récentes</option>
              <option>Prix: Croissant</option>
              <option>Prix: Décroissant</option>
              <option>Plus vues</option>
            </select>
            <div className="flex border rounded-lg overflow-hidden">
              <button className="p-2 bg-primary text-white"><Grid className="w-5 h-5" /></button>
              <button className="p-2 bg-surface hover:bg-gray-50"><List className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-surface rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold text-text-main mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" /> Filtres
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Catégorie</label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>Toutes les catégories</option>
                    <option>Véhicules</option>
                    <option>Immobilier</option>
                    <option>Emplois</option>
                    <option>Électronique</option>
                    <option>Maison</option>
                    <option>Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Prix min (FDJ)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Prix max (FDJ)</label>
                  <input type="number" placeholder="10,000,000" className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Localisation</label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>Toutes les localisations</option>
                    {locations.map(loc => (
                      <option key={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-accent" />
                  <span className="text-sm">Uniquement Premium</span>
                </label>

                <button className="w-full btn-primary">Appliquer les filtres</button>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {allAds.map((ad) => (
                <AdCard key={ad.id} {...ad} />
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90">
                Charger plus d&apos;annonces
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}