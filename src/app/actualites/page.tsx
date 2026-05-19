'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ChevronRight, Share2, Heart, MessageCircle, Eye, Search, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const newsCategories = [
  { name: 'Tous' },
  { name: 'Tendances' },
  { name: 'Conseils' },
  { name: 'Économie' },
  { name: 'Automobile' },
  { name: 'Immobilier' },
]

const tips = [
  { title: '5 conseils pour vendre vite', icon: '💡' },
  { title: 'Prix vs qualité: que choisir?', icon: '⚖️' },
  { title: 'Documents indispensables pour vendre', icon: '📄' },
  { title: 'Négocier sans conflit', icon: '🤝' },
]

export default function ActualitesPage() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [actualites, setActualites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActualites = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('actualites')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setActualites(data)
      }
      setLoading(false)
    }
    fetchActualites()
  }, [])

  const filteredActualites = activeCategory === 'Tous'
    ? actualites
    : actualites // A implémenter si on ajoute des catégories aux actualités

  const featuredArticle = filteredActualites.length > 0 ? filteredActualites[0] : null
  const otherArticles = filteredActualites.length > 1 ? filteredActualites.slice(1) : []

  const renderMedia = (url: string | undefined, isFeatured: boolean = false) => {
    if (!url) return <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Aucun média</div>
    
    const isVideo = url.includes('.mp4') || url.includes('.webm')
    
    if (isVideo) {
      return (
        <video 
          src={url} 
          autoPlay={isFeatured} 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )
    }

    return (
      <img
        src={url}
        alt="Média d'actualité"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    )
  }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Actualités <span className="text-accent">WAYCAN</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Les dernières nouvelles, conseils et tendances du marché djiboutien
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {newsCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category.name
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-muted hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : filteredActualites.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            Aucune actualité publiée pour le moment.
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-text-main mb-6">À la une</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {featuredArticle && (
                  <div className="relative rounded-2xl overflow-hidden group cursor-pointer bg-surface shadow-sm">
                    <div className="aspect-[16/9] relative">
                      {renderMedia(featuredArticle.media_urls?.[0], true)}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{featuredArticle.title}</h3>
                      <p className="text-white/80 mb-4 line-clamp-2">{featuredArticle.content}</p>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Nouveau
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {Math.floor(Math.random() * 500) + 100}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {otherArticles.slice(0, 3).map((article) => (
                    <Link key={article.id} href={`/actualites/${article.id}`} className="block">
                      <div className="bg-surface rounded-xl p-4 flex gap-4 hover:shadow-lg transition-shadow border border-gray-50">
                        <div className="w-32 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                          {renderMedia(article.media_urls?.[0])}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-text-main line-clamp-2 mt-1">{article.title}</h3>
                          <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> Récemment</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {otherArticles.length > 3 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-main">Derniers articles</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherArticles.slice(3).map((article) => (
                    <Link key={article.id} href={`/actualites/${article.id}`} className="block">
                      <div className="bg-surface rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-50">
                        <div className="aspect-[4/3] relative">
                          {renderMedia(article.media_urls?.[0])}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-text-main line-clamp-2 mb-2">{article.title}</h3>
                          <p className="text-sm text-text-muted line-clamp-2 mb-4">{article.content}</p>
                          <div className="flex items-center justify-between text-sm text-text-muted">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Récent
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white shadow-md">
              <h3 className="text-2xl font-bold mb-4">Abonnez-vous à notre newsletter</h3>
              <p className="mb-6 opacity-90">Recevez nos derniers conseils et actualités directement dans votre boîte mail.</p>
              <div className="flex gap-4 flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-lg text-text-main focus:outline-none"
                />
                <button className="px-6 py-3 bg-accent rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  S'abonner
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-text-main mb-4">Nos conseils populaires</h3>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral transition-colors cursor-pointer"
                >
                  <span className="text-xl">{tip.icon}</span>
                  <span className="text-text-main text-sm font-medium">{tip.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}