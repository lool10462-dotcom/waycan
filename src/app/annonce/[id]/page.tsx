import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Heart, Share2, Flag, MapPin, Clock, Eye, Phone, MessageCircle, CheckCircle } from 'lucide-react'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Toyota Corolla 2020 | WAYCAN Marketplace',
    description: 'Toyota Corolla 2020 excellent état à vendre - 1,450,000 FDJ',
  }
}

export default function AdDetailPage({ params }: PageProps) {
  const ad = {
    id: params.id,
    title: 'Toyota Corolla 2020 - Excellent état, rarement utilisé',
    price: '1,450,000',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    ],
    location: 'Djibouti-ville',
    date: 'Il y a 2 jours',
    views: 268,
    isPremium: true,
    description: `Magnifique Toyota Corolla 2020 en excellent état. Véicule très bien entretenu, peu km, parfait pour usage familial ou professionnel.

Options incluses:
- Climatisation automatique
- Vitres électriques
- Caméra de recul
- Système audio Bluetooth
- Jantes alliage

Rapporteur disponible. Possibilité de financement.`,
    specs: {
      Marque: 'Toyota',
      Modèle: 'Corolla',
      Année: '2020',
      Kilométrage: '45,000 km',
      Carburant: 'Essence',
      Transmission: 'Automatique',
      Couleur: 'Blanc nacré',
    },
    seller: {
      name: 'Mohamed Ali',
      avatar: 'MA',
      verified: true,
      memberSince: '2024',
      responseTime: '< 1 heure',
      rating: 4.8,
    },
  }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-6">
          <ChevronLeft className="w-4 h-4" />
          Retour aux annonces
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl overflow-hidden mb-6">
              <div className="relative aspect-[4/3]">
                <Image
                  src={ad.images[0]}
                  alt={ad.title}
                  fill
                  className="object-cover"
                  priority
                />
                {ad.isPremium && (
                  <span className="absolute top-4 left-4 badge badge-premium">Premium</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-3xl font-extrabold text-accent mb-2">{ad.price} FDJ</p>
                    <h1 className="text-2xl font-bold text-text-main">{ad.title}</h1>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <Flag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-6">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {ad.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {ad.date}</span>
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {ad.views} vues</span>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-lg font-semibold text-text-main mb-4">Description</h2>
                  <p className="text-text-muted whitespace-pre-line">{ad.description}</p>
                </div>

                <div className="border-t mt-6 pt-6">
                  <h2 className="text-lg font-semibold text-text-main mb-4">Caractéristiques</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(ad.specs).map(([key, value]) => (
                      <div key={key} className="bg-neutral rounded-lg p-3">
                        <p className="text-xs text-text-muted mb-1">{key}</p>
                        <p className="font-medium text-text-main">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text-main mb-4">Annonces similaires</h2>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Link key={i} href="/annonce/1" className="block">
                    <div className="bg-neutral rounded-lg overflow-hidden">
                      <div className="aspect-video relative">
                        <Image
                          src={`https://images.unsplash.com/photo-${1621007900000 + i}?w=400&q=80`}
                          alt="Similar ad"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-accent">1,200,000 FDJ</p>
                        <p className="text-sm text-text-muted line-clamp-1">Voiture similaire</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-surface rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {ad.seller.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-text-main flex items-center gap-2">
                    {ad.seller.name}
                    {ad.seller.verified && <CheckCircle className="w-4 h-4 text-success" />}
                  </h3>
                  <p className="text-sm text-text-muted">Membre depuis {ad.seller.memberSince}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
                <span className="text-success">●</span>
                <span>Répond généralement en {ad.seller.responseTime}</span>
              </div>

              <div className="space-y-3">
                <a
                  href="https://wa.me/25377179755"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-success text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contacter par WhatsApp
                </a>
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  <Phone className="w-5 h-5" />
                  Appeler
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  Envoyer un message
                </button>
              </div>

              <div className="mt-6 p-4 bg-neutral rounded-lg">
                <p className="text-sm text-text-muted flex items-start gap-2">
                  <span className="text-accent">💡</span>
                  <span>Rencontrez le vendeur dans un lieu public et vérifiez le véhicule avant de payer.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}