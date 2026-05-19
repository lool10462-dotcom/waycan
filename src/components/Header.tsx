'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Menu, X, MapPin, ChevronDown } from 'lucide-react'

const categoriesData = [
  { 
    name: 'Immobilier', 
    icon: '🏠', 
    subcategories: ['Maisons à vendre', 'Maisons à louer', 'Terrain', 'Locaux commerciaux']
  },
  { 
    name: 'Véhicules', 
    icon: '🚗', 
    subcategories: ['Voitures', 'Motos, Scooters', 'Bateaux', 'Accessoires et pièces']
  },
  { 
    name: 'Maison, Décoration', 
    icon: '🛋️', 
    subcategories: ['Meubles et Intérieur', 'Électroménager', 'Climatiseurs, Télévisions', 'Vêtements, Chaussures, Mode', 'Accessoires']
  },
  { 
    name: 'Multimédia', 
    icon: '💻', 
    subcategories: ['Informatique', 'Consoles, Jeux vidéo', 'Téléphones, Smartphones', 'TV, Image & Son, Photo']
  },
  { 
    name: 'Loisirs et sports', 
    icon: '🎵', 
    subcategories: ['Sports', 'Livres', 'Jeux & jouets', 'Films, musique']
  },
  { 
    name: 'Emplois & Services', 
    icon: '💼', 
    subcategories: ['Emplois', 'Services', 'Matériel professionnel']
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
              WAYCAN
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Que cherchez-vous ? Voiture, appartement, emploi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors">
                Rechercher
              </button>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-text-main hover:text-primary font-medium transition-colors">
              Accueil
            </Link>
            
            {/* Menu Catégories avec Sous-catégories */}
            <div 
              className="relative group"
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button className="flex items-center gap-1 text-text-main hover:text-primary font-medium transition-colors py-6">
                Catégories <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute top-full left-0 mt-0 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex overflow-hidden">
                {/* Colonne gauche : Catégories principales */}
                <div className="w-1/3 bg-gray-50 border-r border-gray-100 py-2">
                  {categoriesData.map((cat) => (
                    <div
                      key={cat.name}
                      onMouseEnter={() => setActiveCategory(cat.name)}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${activeCategory === cat.name ? 'bg-white text-primary font-bold border-l-4 border-primary' : 'text-text-main hover:bg-gray-100 border-l-4 border-transparent'}`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm">{cat.name}</span>
                    </div>
                  ))}
                </div>
                
                {/* Colonne droite : Sous-catégories */}
                <div className="w-2/3 p-6 bg-white">
                  {activeCategory ? (
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">
                        {activeCategory}
                      </h3>
                      <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                        {categoriesData.find(c => c.name === activeCategory)?.subcategories.map((sub, idx) => (
                          <li key={idx}>
                            <Link 
                              href={`/annonces?cat=${encodeURIComponent(activeCategory)}&sub=${encodeURIComponent(sub)}`}
                              className="text-sm text-gray-600 hover:text-accent flex items-center gap-2 transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <span className="text-4xl mb-2">🎯</span>
                      <p className="text-sm">Survolez une catégorie pour voir les détails</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Link href="/publier" className="text-text-main hover:text-primary font-medium transition-colors">
              Publier
            </Link>
            <Link href="/actualites" className="text-text-main hover:text-primary font-medium transition-colors">
              Actualités
            </Link>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <MapPin className="w-4 h-4" />
              <span>Djibouti-ville</span>
            </div>
          </nav>

          <div className="hidden md:block">
            <Link href="/publier" className="btn-primary inline-flex items-center gap-2">
              <span>+</span> Publier une annonce
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-t">
          <div className="px-4 py-4 h-[calc(100vh-4rem)] overflow-y-auto">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary mb-4"
            />
            <nav className="flex flex-col gap-2">
              <Link href="/" className="px-4 py-3 rounded-lg hover:bg-neutral font-medium text-text-main">
                Accueil
              </Link>
              
              <div className="py-2">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Catégories</p>
                {categoriesData.map((cat) => (
                  <div key={cat.name} className="mb-1">
                    <button 
                      onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-neutral font-medium text-text-main transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{cat.icon}</span>
                        {cat.name}
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeCategory === cat.name ? 'rotate-180 text-primary' : 'text-gray-400'}`} />
                    </button>
                    
                    {activeCategory === cat.name && (
                      <div className="pl-14 pr-4 py-2 bg-gray-50 rounded-b-lg space-y-2">
                        {cat.subcategories.map((sub, idx) => (
                          <Link 
                            key={idx}
                            href={`/annonces?cat=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub)}`}
                            className="block text-sm text-gray-600 hover:text-primary py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Link href="/publier" className="btn-primary text-center mt-4 mb-8">
                + Publier une annonce
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}