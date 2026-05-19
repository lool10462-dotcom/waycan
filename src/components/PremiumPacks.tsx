import { Check, Star } from 'lucide-react'

const packs = [
  {
    name: 'Basic',
    price: '2,900',
    period: 'semaine',
    description: 'Pour une visibilité rapide',
    features: [
      'Annonce en tête de liste',
      'Badge Premium visible',
      '7 jours de visibilité boostée',
    ],
    cta: 'Choisir Basic',
    popular: false,
  },
  {
    name: 'Pro',
    price: '4,500',
    period: 'semaine',
    description: 'Le plus populaire',
    features: [
      'Position prioritaire',
      'Badge Premium + couleur',
      '30 jours de visibilité',
      'Partage réseaux sociaux',
    ],
    cta: 'Choisir Pro',
    popular: true,
  },
  {
    name: 'Business',
    price: '7,500',
    period: 'semaine',
    description: 'Pour les professionnels',
    features: [
      'Boutique dédiée',
      '10 annonces premium',
      'Analytics dashboard',
      'Support prioritaire WhatsApp',
    ],
    cta: 'Choisir Business',
    popular: false,
  },
]

export default function PremiumPacks() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-[#1a3d7a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Boostez votre visibilité
          </h2>
          <p className="text-gray-300 text-lg">
            Nos packs premium vous mettent en avant pour vendre plus vite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map((pack, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all hover:scale-105 ${
                pack.popular ? 'ring-2 ring-accent' : ''
              }`}
            >
              {pack.popular && (
                <div className="flex items-center justify-center gap-2 -mt-8 mb-4">
                  <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Plus populaire
                  </span>
                </div>
              )}

              <h3 className="text-xl font-semibold text-white mb-2">{pack.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">{pack.price}</span>
                <span className="text-gray-300"> FDJ/{pack.period}</span>
              </div>
              <p className="text-gray-300 text-sm mb-6">{pack.description}</p>

              <ul className="space-y-3 mb-8">
                {pack.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-200">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  pack.popular
                    ? 'bg-accent text-white hover:bg-orange-600'
                    : 'bg-white text-primary hover:bg-gray-100'
                }`}
              >
                {pack.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}