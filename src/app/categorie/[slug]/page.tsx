'use client'

import Link from 'next/link'
import AdCard from '@/components/AdCard'
import { SlidersHorizontal, Grid, List, ChevronRight } from 'lucide-react'

interface PageProps {
  params: { slug: string }
}

const categoryData: Record<string, { title: string; description: string; count: number }> = {
  vehicules: { title: 'Véhicules à Djibouti', description: 'Achetez et vendez voitures, motos, trucks et bateaux à Djibouti', count: 1240 },
  immobilier: { title: 'Immobilier à Djibouti', description: 'Appartements, villas, terrains et locations à Djibouti', count: 856 },
  emploi: { title: 'Emplois à Djibouti', description: 'Trouvez votre prochain emploi à Djibouti', count: 432 },
  electronique: { title: 'Électronique à Djibouti', description: 'Téléphones, ordinateurs, TVs et gadgets', count: 2150 },
  maison: { title: 'Maison & Déco', description: 'Meubles, électroménager et décoration', count: 780 },
  services: { title: 'Services à Djibouti', description: 'Prestations professionnelles et services', count: 320 },
}

const sampleAds = [
  { id: '1', title: 'Toyota Corolla 2020 - Excellent état', price: '1,450,000', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', location: 'Djibouti-ville', date: 'Il y a 2 jours', views: 268, isPremium: true, category: 'vehicules' },
  { id: '5', title: 'BMW X5 2019 - Luxe 4x4', price: '2,800,000', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', location: 'Ambouli', date: 'Il y a 1 semaine', views: 312, isPremium: true, category: 'vehicules' },
  { id: '9', title: 'Honda Civic 2021 - Garantie', price: '1,650,000', image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&q=80', location: 'Boulevard', date: 'Il y a 3 jours', views: 189, isPremium: false, category: 'vehicules' },
  { id: '10', title: 'Mercedes C-Class 2020', price: '2,100,000', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', location: 'Djibouti-ville', date: 'Il y a 5 jours', views: 245, isPremium: true, category: 'vehicules' },
  { id: '11', title: 'Nissan Rogue 2022', price: '1,900,000', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80', location: 'Balbala', date: 'Il y a 1 jour', views: 156, isPremium: false, category: 'vehicules' },
  { id: '12', title: 'Hyundai Tucson 2021', price: '1,750,000', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', location: 'Haramous', date: 'Il y a 4 jours', views: 198, isPremium: true, category: 'vehicules' },
  { id: '13', title: 'Kia Sportage 2020', price: '1,350,000', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80', location: 'Ambouli', date: 'Il y a 6 jours', views: 134, isPremium: false, category: 'vehicules' },
  { id: '14', title: 'Ford Explorer 2019', price: '1,800,000', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', location: 'Djibouti-ville', date: 'Il y a 2 semaines', views: 267, isPremium: true, category: 'vehicules' },
]

export default function CategoryPage({ params }: PageProps) {
  const category = categoryData[params.slug] || { title: 'Catégorie', description: '', count: 0 }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-main">{category.title}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-2">{category.title}</h1>
          <p className="text-text-muted">{category.count.toLocaleString()} annonces</p>
        </div>

        <div className="bg-surface rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">Tout</button>
            <button className="px-4 py-2 bg-neutral text-text-muted rounded-lg text-sm font-medium hover:bg-gray-200">Voitures</button>
            <button className="px-4 py-2 bg-neutral text-text-muted rounded-lg text-sm font-medium hover:bg-gray-200">Motos</button>
            <button className="px-4 py-2 bg-neutral text-text-muted rounded-lg text-sm font-medium hover:bg-gray-200">Camions</button>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded text-primary" />
              <span>Uniquement Premium</span>
            </label>
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <button className="p-2 bg-primary text-white rounded"><Grid className="w-4 h-4" /></button>
              <button className="p-2 hover:bg-gray-100 rounded"><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleAds.map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90">
            Charger plus d&apos;annonces
          </button>
        </div>
      </div>
    </div>
  )
}