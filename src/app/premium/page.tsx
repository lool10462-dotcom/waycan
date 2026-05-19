import { Metadata } from 'next'
import Link from 'next/link'
import { Check, Star, TrendingUp, Zap, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Premium - Boostez vos annonces | WAYCAN',
  description: 'Augmentez la visibilité de vos annonces avec nos packs premium. Plus de vues, plus de contacts, plus de ventes!',
}

const benefits = [
  { icon: TrendingUp, title: '+300% de vues', description: 'Votre annonce apparaît en priorité dans les résultats de recherche' },
  { icon: Zap, title: 'Visibilité instantanée', description: 'Votre annonce devient visible dès la publication' },
  { icon: Shield, title: 'Badge Premium', description: 'Un badge dor&eacute; attire la confiance des acheteurs' },
  { icon: Users, title: 'Plus de contacts', description: 'Augmentez vos chances de vente de 5x' },
]

const packs = [
  {
    name: 'Basic',
    price: '2,900',
    period: 'semaine',
    description: 'Idéal pour tester',
    features: [
      'Annonce en tête de liste',
      'Badge Premium visible',
      '7 jours de visibilité',
      'Support par email',
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
      'Badge Premium color&eacute;',
      '30 jours de visibilit&eacute;',
      'Partage sur r&eacute;seaux sociaux',
      'Statistiques avanc&eacute;es',
      'Support prioritaires',
    ],
    cta: 'Choisir Pro',
    popular: true,
  },
  {
    name: 'Business',
    price: '7,500',
    period: 'semaine',
    description: 'Pour les pros',
    features: [
      'Boutique d&eacute;di&eacute;e',
      '10 annonces premium',
      'Analytics complet',
      'Support WhatsApp prioritaire',
      'APIacc&egrave;s',
      'Formation incluse',
    ],
    cta: 'Choisir Business',
    popular: false,
  },
]

const testimonials = [
  { name: 'Mohamed D.', text: 'Mes annonces vendues 3x plus vite avec Premium!', role: 'Vendeur v&eacute;rifi&eacute;' },
  { name: 'Fatou A.', text: 'Le badge Premium m\'a permis de gagner la confiance des acheteurs.', role: 'Acheteuse' },
  { name: 'Youssef I.', text: 'Support excellent et r&eacute;sultats au rendez-vous.', role: 'Vendeur pro' },
]

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-premium-gold/20 text-amber-700 rounded-full text-sm font-medium mb-4">
            &nbsp;✨ boost&eacute; votre visibilit&eacute;&nbsp;
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            WAYCAN <span className="text-accent">Premium</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Vendez plus vite gr&acirc;ce &agrave; nos packs premium. Plus de vues, plus de contacts, plus de ventes!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="bg-surface rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mb-4">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-semibold text-text-main mb-2">{benefit.title}</h3>
                <p className="text-sm text-text-muted">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {packs.map((pack, index) => (
            <div
              key={index}
              className={`bg-surface rounded-2xl p-6 relative ${
                pack.popular ? 'ring-2 ring-accent shadow-xl scale-105' : 'hover:shadow-lg'
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Plus populaire
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-text-main mb-2">{pack.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-extrabold text-accent">{pack.price}</span>
                <span className="text-text-muted"> FDJ/{pack.period}</span>
              </div>
              <p className="text-text-muted mb-6">{pack.description}</p>

              <ul className="space-y-3 mb-8">
                {pack.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-text-main">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/paiement"
                className={`w-full py-3 rounded-lg font-semibold transition-all inline-block text-center ${
                  pack.popular
                    ? 'bg-accent text-white hover:bg-orange-600'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {pack.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Essayez gratuitement!</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Publiez votre premi&egrave;re annonce et recevez automatiquement 3 jours de visibilit&eacute; Premium offerte!
          </p>
          <a href="/publier" className="inline-block bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Publier une annonce gratuite
          </a>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-main text-center mb-8">Ce que disent nos utilisateurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-surface rounded-xl p-6">
                <p className="text-text-muted mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-text-main">{testimonial.name}</p>
                    <p className="text-sm text-text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-text-main mb-6">Questions fr&eacute;quentes</h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="flex items-center justify-between p-4 bg-neutral rounded-lg cursor-pointer">
                <span className="font-medium text-text-main">Puis-je annuler &agrave; tout moment?</span>
                <span className="text-accent">+</span>
              </summary>
              <p className="p-4 text-text-muted">Oui, vous pouvez annuler votre pack Premium &agrave; tout moment. Vous conservrez les avantages jusqu&apos;&agrave; la fin de la p&eacute;riode pay&eacute;e.</p>
            </details>
            <details className="group">
              <summary className="flex items-center justify-between p-4 bg-neutral rounded-lg cursor-pointer">
                <span className="font-medium text-text-main">Comment suis-je factur&eacute;?</span>
                <span className="text-accent">+</span>
              </summary>
              <p className="p-4 text-text-muted">La facturation se fait par semaine via mobile money (Sahal, D-Money) ou carte bancaire. Vous pouvez aussi payer en especes &agrave; notre bureau.</p>
            </details>
            <details className="group">
              <summary className="flex items-center justify-between p-4 bg-neutral rounded-lg cursor-pointer">
                <span className="font-medium text-text-main">Puis-je tester avant d&apos;acheter?</span>
                <span className="text-accent">+</span>
              </summary>
              <p className="p-4 text-text-muted">Chaque nouvelle annonce b&eacute;n&eacute;ficie de 3 jours Premium offert! Cela vous permet de tester l&apos;efficacit&eacute; avant d&apos;acheter un pack.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}