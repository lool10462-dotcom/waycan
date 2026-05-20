import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, Heart, Share2, Flag, MapPin, Clock, Eye, Phone, MessageCircle, CheckCircle, Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ImageGallery from '@/components/ImageGallery'

interface PageProps {
  params: { id: string }
}

// Convert category slugs to readable French names
const CATEGORY_NAMES: Record<string, string> = {
  vehicules: 'Véhicules',
  immobilier: 'Immobilier',
  emploi: 'Emplois',
  electronique: 'Électronique',
  maison: 'Maison',
  services: 'Services',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { data: ad } = await supabase
      .from('ads')
      .select('title, price')
      .eq('id', params.id)
      .single()

    if (ad) {
      return {
        title: `${ad.title} | WAYCAN Marketplace`,
        description: `${ad.title} à vendre pour ${ad.price ? Number(ad.price).toLocaleString() : 'prix à débattre'} FDJ sur WAYCAN.`,
      }
    }
  } catch (e) {
    console.error(e)
  }
  return {
    title: 'Annonce | WAYCAN Marketplace',
    description: 'Découvrez cette superbe annonce à vendre sur WAYCAN.',
  }
}

export default async function AdDetailPage({ params }: PageProps) {
  const { id } = params

  // 1. Fetch the real ad from Supabase
  let dbAd: any = null
  try {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('id', id)
      .single()
    
    if (!error && data) {
      dbAd = data
    }
  } catch (err) {
    console.error("Error fetching ad from Supabase:", err)
  }

  // 2. Map database ad to page model, or fallback to beautiful default data if not found or ID is "1"
  let ad: any = null

  if (dbAd) {
    // Robustly parse the images JSON string array
    let imagesArray: string[] = []
    if (dbAd.images) {
      if (Array.isArray(dbAd.images)) {
        imagesArray = dbAd.images
      } else if (typeof dbAd.images === 'string') {
        try {
          const parsed = JSON.parse(dbAd.images)
          if (Array.isArray(parsed)) {
            imagesArray = parsed
          } else {
            imagesArray = [dbAd.images]
          }
        } catch {
          imagesArray = [dbAd.images]
        }
      }
    }

    ad = {
      id: dbAd.id,
      title: dbAd.title || 'Sans titre',
      price: dbAd.price ? `${Number(dbAd.price).toLocaleString()}` : 'Prix à débattre',
      negotiable: dbAd.negotiable || false,
      images: imagesArray,
      location: dbAd.location || 'Djibouti',
      date: dbAd.created_at ? new Date(dbAd.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Récent',
      views: dbAd.views || 0,
      isPremium: dbAd.is_premium || false,
      description: dbAd.description || 'Aucune description fournie.',
      phone: dbAd.phone || '',
      showPhone: dbAd.show_phone !== false,
      email: dbAd.email || '',
      category: dbAd.category || 'Général',
      specs: {
        'Catégorie': CATEGORY_NAMES[dbAd.category] || dbAd.category || 'Général',
        'Localisation': dbAd.location || 'Djibouti',
        'Statut': dbAd.status === 'active' ? 'En ligne' : 'En attente',
        'Prix': dbAd.price ? `${Number(dbAd.price).toLocaleString()} FDJ` : 'À débattre',
        'Négociable': dbAd.negotiable ? 'Oui' : 'Non',
      },
      seller: {
        name: 'Vendeur WAYCAN',
        avatar: 'VW',
        verified: true,
        memberSince: '2026',
        responseTime: '< 1 heure',
        rating: 5.0,
      }
    }
  } else {
    // Fallback static mock details (e.g. for demonstration or fallback)
    ad = {
      id: id,
      title: 'Toyota Corolla 2020 - Excellent état, rarement utilisé',
      price: '1,450,000',
      negotiable: true,
      images: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
        'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      ],
      location: 'Djibouti-ville',
      date: 'Il y a 2 jours',
      views: 268,
      isPremium: true,
      description: `Magnifique Toyota Corolla 2020 en excellent état. Véhicule très bien entretenu, peu km, parfait pour usage familial ou professionnel.
  
  Options incluses:
  - Climatisation automatique
  - Vitres électriques
  - Caméra de recul
  - Système audio Bluetooth
  - Jantes alliage`,
      phone: '+253 77 17 97 55',
      showPhone: true,
      email: 'contact@waycan.com',
      category: 'vehicules',
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
  }

  // Increment views count in background asynchronously to be efficient
  if (dbAd) {
    try {
      await supabase
        .from('ads')
        .update({ views: (dbAd.views || 0) + 1 })
        .eq('id', id)
    } catch (e) {
      // Ignore background views increment error
    }
  }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/annonces" className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-6">
          <ChevronLeft className="w-4 h-4" />
          Retour aux annonces
        </Link>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100">
              
              {/* Interactive Image Gallery */}
              <ImageGallery images={ad.images} title={ad.title} />

              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-3xl font-extrabold text-accent mb-2">
                      {ad.price} {ad.price !== 'Prix à débattre' ? 'FDJ' : ''}
                      {ad.negotiable && <span className="text-xs text-text-muted font-normal ml-2">(Négociable)</span>}
                    </p>
                    <h1 className="text-2xl font-bold text-text-main leading-snug">{ad.title}</h1>
                  </div>
                  <div className="flex gap-2 self-start">
                    <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors shadow-sm bg-white" title="Ajouter aux favoris">
                      <Heart className="w-5 h-5 text-gray-500 hover:text-alert transition-colors" />
                    </button>
                    <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors shadow-sm bg-white" title="Partager">
                      <Share2 className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors shadow-sm bg-white" title="Signaler">
                      <Flag className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
  
                <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-6">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-accent" /> {ad.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {ad.date}</span>
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {ad.views} vues</span>
                </div>
  
                <div className="border-t pt-6">
                  <h2 className="text-lg font-semibold text-text-main mb-4">Description</h2>
                  <p className="text-text-muted whitespace-pre-line leading-relaxed">{ad.description}</p>
                </div>
  
                <div className="border-t mt-6 pt-6">
                  <h2 className="text-lg font-semibold text-text-main mb-4">Caractéristiques</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(ad.specs).map(([key, value]) => (
                      <div key={key} className="bg-neutral rounded-lg p-3 border border-gray-50">
                        <p className="text-xs text-text-muted mb-1">{key}</p>
                        <p className="font-semibold text-text-main text-sm">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24 space-y-6">
              
              {/* Seller Profiling */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-tr from-primary to-[#0d2d5a] rounded-full flex items-center justify-center text-white font-bold text-lg shadow">
                  {ad.seller.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-text-main flex items-center gap-1.5">
                    {ad.seller.name}
                    {ad.seller.verified && <CheckCircle className="w-4.5 h-4.5 text-success fill-success/15" />}
                  </h3>
                  <p className="text-xs text-text-muted">Membre depuis {ad.seller.memberSince}</p>
                </div>
              </div>
  
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <span className="text-success animate-pulse">●</span>
                <span>Répond généralement en {ad.seller.responseTime}</span>
              </div>
  
              {/* Communication methods */}
              <div className="space-y-3 pt-2">
                {ad.showPhone && ad.phone ? (
                  <>
                    <a
                      href={`https://wa.me/${ad.phone.replace(/[^0-9+]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-success text-white py-3.5 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-md shadow-success/10 text-center"
                    >
                      <MessageCircle className="w-5 h-5 fill-white/10" />
                      Contacter via WhatsApp
                    </a>
                    
                    <a
                      href={`tel:${ad.phone}`}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/95 transition-colors shadow-md shadow-primary/10"
                    >
                      <Phone className="w-5 h-5 fill-white/10" />
                      Appeler ({ad.phone})
                    </a>
                  </>
                ) : (
                  <div className="bg-red-50 text-red-700 text-xs p-3.5 rounded-xl border border-red-100 flex items-start gap-2">
                    <Shield className="w-4.5 h-4.5 flex-shrink-0 text-red-500 mt-0.5" />
                    <span>Ce vendeur a choisi de cacher ses informations de contact. Vous pouvez essayer d'utiliser le bouton de contact par email.</span>
                  </div>
                )}

                {ad.email && (
                  <a 
                    href={`mailto:${ad.email}?subject=Intéressé par votre annonce : ${ad.title}`}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 text-text-main py-3.5 rounded-xl font-bold hover:bg-neutral transition-all bg-white shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Envoyer un e-mail
                  </a>
                )}
              </div>
  
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100/50">
                <p className="text-xs text-amber-800 flex items-start gap-2 leading-relaxed">
                  <span className="text-base">💡</span>
                  <span><strong>Conseil de sécurité :</strong> Rencontrez le vendeur dans un lieu public et sécurisé (comme un café ou un centre commercial). N'envoyez jamais d'argent en avance.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}