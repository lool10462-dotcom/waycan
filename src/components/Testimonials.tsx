'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Mohamed Ali',
    role: 'Vendeur vérifié',
    avatar: 'MA',
    rating: 5,
    text: "J'ai vendu ma voiture en 3 jours grâce à WAYCAN. Interface super simple et acheteurs sérieux. Je recommande!",
    memberSince: '2024',
  },
  {
    name: 'Fatou Ahmed',
    role: 'Acheteuse',
    avatar: 'FA',
    rating: 5,
    text: "Trouvé mon appartement idéal en une semaine. Les annonces sont vérifiées, j'ai pu contacter les propriétaires directement.",
    memberSince: '2023',
  },
  {
    name: 'Youssef Ibrahim',
    role: 'Vendeur vérifié',
    avatar: 'YI',
    rating: 5,
    text: "Excellent service! J'ai vendu 5 articles le mois dernier. Le système premium m'a vraiment aidé à gagner en visibilité.",
    memberSince: '2024',
  },
  {
    name: 'Aminata Djama',
    role: 'Acheteuse',
    avatar: 'AD',
    rating: 5,
    text: "La meilleure plateforme d'annonces à Djibouti. Le support client est réactif et les transactions sont sécurisées.",
    memberSince: '2023',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-text-muted text-lg">
           Découvrez ce que nos utilisateurs disent de WAYCAN
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-surface rounded-2xl p-8 shadow-lg">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-main">{testimonial.name}</h4>
                        <p className="text-sm text-text-muted">{testimonial.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-premium-gold text-premium-gold" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-text-muted text-lg italic leading-relaxed">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-sm text-text-muted">
                        Membre depuis {testimonial.memberSince}
                      </span>
                      <span className="ml-4 inline-flex items-center gap-1 text-success text-sm">
                        <span className="w-2 h-2 bg-success rounded-full"></span>
                        Vendeur vérifié
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-surface rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-text-main" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-surface rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-text-main" />
          </button>
        </div>
      </div>
    </section>
  )
}