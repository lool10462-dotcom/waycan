'use client'

import { Search, MapPin, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const locations = [
  'Djibouti-ville',
  'Balbala',
  'Boulevard',
  'Haramous',
  'Ambouli',
  'Ali-Sabieh',
  'Tadjourah',
  'Obock',
]

const categories = [
  'Toutes catégories',
  'Véhicules',
  'Immobilier',
  'Emplois',
  'Électronique',
  'Maison & Déco',
  'Services',
]

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes catégories')
  const [selectedLocation, setSelectedLocation] = useState('Djibouti-ville')

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
          Vendez et achetez en toute simplicité à{' '}
          <span className="text-accent">Djibouti</span>
        </h1>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto animate-slide-up">
          Des milliers d&apos;annonces vérifiées — Voitures, immobilier, emplois et plus encore.
          <span className="block mt-2 text-success font-medium">100% gratuit pour publier.</span>
        </p>

        <div className="bg-surface rounded-2xl p-4 shadow-2xl max-w-4xl mx-auto animate-scale-in">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Que recherchez-vous ?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-48 px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary appearance-none bg-white cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full md:w-48 px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary appearance-none bg-white cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            <button className="bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all hover:scale-[1.02] shadow-lg">
              Rechercher
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 animate-stagger">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">15,000+</div>
            <div className="text-gray-300">Annonces actives</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">50,000+</div>
            <div className="text-gray-300">Utilisateurs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">98%</div>
            <div className="text-gray-300">Satisfaction</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral to-transparent" />
    </section>
  )
}