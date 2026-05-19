import { Metadata } from 'next'
import Link from 'next/link'
import { Camera, Edit3, Rocket, Search, MessageCircle, ShieldCheck, Star, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Comment ça marche - Guide complet | WAYCAN',
  description: 'Apprenez à utiliser WAYCAN pour vendre et acheter en toute simplicité à Djibouti.',
}

const sellSteps = [
  {
    icon: Camera,
    title: '1. Prenez des photos',
    description: ' Photographiez votre article sous un bon éclairage. Les photos de qualité attirent plus d\'acheteurs.',
    tips: ['Utilisez la lumière naturelle', 'Faites plusieurs angles', 'Nettoyez le produit avant'],
  },
  {
    icon: Edit3,
    title: '2. Créez votre annonce',
    description: 'Remplissez les détails: titre accrocheur, description complète, prix juste et votre localisation.',
    tips: ['Titre descriptif de 5-10 mots', 'Description détaillée', 'Prix basé sur le marché'],
  },
  {
    icon: Rocket,
    title: '3. Publiez et vendez',
    description: 'Votre annonce est visible instantanément. Les acheteurs vous contactent directement!',
    tips: ['Répondez rapidement', 'Soiez disponible sur WhatsApp', 'Acceptez les visites'],
  },
]

const buySteps = [
  {
    icon: Search,
    title: '1. Trouvez votre produit',
    description: 'Parcourez les catégories ou utilisez la recherche pour trouver ce que vous cherchez.',
    tips: ['Utilisez les filtres', 'Sauvegardez vos recherches', 'Explorez les similaires'],
  },
  {
    icon: MessageCircle,
    title: '2. Contactez le vendeur',
    description: 'Utilisez WhatsApp, téléphone ou notre messagerie pour poser vos questions.',
    tips: ['Demandez plus de photos', 'Négociez le prix', 'Planifiez la rencontre'],
  },
  {
    icon: ShieldCheck,
    title: '3. Finalisez l\'achat',
    description: 'Rencontrez le vendeur dans un lieu public, vérifiez le produit et finalisez la transaction.',
    tips: ['Rencontrez en sécurité', 'Testez le produit', 'Paiement sécurisé'],
  },
]

const features = [
  { title: 'Recherche intelligente', description: 'Autocomplete et suggestions basées sur l\'IA' },
  { title: 'Notifications en temps réel', description: 'Soyez alerté des nouvelles annonces' },
  { title: 'Messagerie intégrée', description: 'Communication sécurisée entre acheteurs et vendeurs' },
  { title: 'Badge Vendeur vérifié', description: 'Identifiez les vendeurs de confiance' },
  { title: 'Filtres avancés', description: 'Trouvez exactement ce que vous cherchez' },
  { title: 'Favoris', description: 'Sauvegardez les annonces qui vous intéressent' },
]

const stats = [
  { number: '15,000+', label: 'Annonces actives' },
  { number: '50,000+', label: 'Utilisateurs' },
  { number: '98%', label: 'Satisfaction' },
  { number: '24h', label: 'Temps de réponse' },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Comment fonctionne <span className="text-accent">WAYCAN</span>?
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Achetez et vendez en quelques clics. Voici tout ce que vous devez savoir pour réussir.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-surface rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-primary">{stat.number}</p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-surface rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-main">Comment vendre</h2>
            </div>
            <div className="space-y-8">
              {sellSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="relative">
                    {index < sellSteps.length - 1 && (
                      <div className="absolute left-6 top-14 w-0.5 h-12 bg-gray-200" />
                    )}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-main mb-2">{step.title}</h3>
                        <p className="text-text-muted mb-3">{step.description}</p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                              <CheckCircle className="w-4 h-4 text-success" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <Link href="/publier" className="btn-primary mt-8 inline-flex items-center gap-2">
              Publier une annonce <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-surface rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-main">Comment acheter</h2>
            </div>
            <div className="space-y-8">
              {buySteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="relative">
                    {index < buySteps.length - 1 && (
                      <div className="absolute left-6 top-14 w-0.5 h-12 bg-gray-200" />
                    )}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-main mb-2">{step.title}</h3>
                        <p className="text-text-muted mb-3">{step.description}</p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                              <CheckCircle className="w-4 h-4 text-success" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <Link href="/annonces" className="btn-secondary mt-8 inline-flex items-center gap-2">
              Parcourir les annonces <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text-main text-center mb-8">Fonctionnalités clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-surface rounded-xl p-6 flex gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-main mb-1">{feature.title}</h3>
                  <p className="text-sm text-text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d&apos;utilisateurs qui font confiance à WAYCAN pour leurs transactions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/publier" className="bg-accent px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Publier une annonce
            </Link>
            <Link href="/inscription" className="bg-white/20 px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}