import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique des Cookies | WAYCAN',
  description: 'Politique relative aux cookies et technologies similaires de WAYCAN Marketplace.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-text-main mb-8 text-center">Politique des Cookies</h1>
          
          <p className="text-text-muted mb-8">Dernière mise à jour: Mai 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">1. Qu&apos;est-ce qu&apos;un cookie?</h2>
            <p className="text-text-muted">
              Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous utilisez notre site. Les cookies nous permettent de mémoriser vos préférences et d&apos;améliorer votre expérience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">2. Types de cookies utilisés</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-text-main mb-2">Cookies essentiels</h3>
                <p className="text-text-muted text-sm">
                  Nécessaires au fonctionnement du site. Ils permettent la navigation et l&apos;accès aux fonctionnalités sécurisées. Ces cookies ne peuvent pas être désactivés.
                </p>
              </div>
              
              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-semibold text-text-main mb-2">Cookies analytiques</h3>
                <p className="text-text-muted text-sm">
                  Nous aident à comprendre comment les visiteurs utilisent notre site (pages visitées, temps passé, erreurs). Cela nous permet d&apos;améliorer continuellement le site.
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-text-main mb-2">Cookies функциональные</h3>
                <p className="text-text-muted text-sm">
                  Permettent de mémoriser vos préférences (langue, localisation, recherche) pour une expérience personnalisée.
                </p>
              </div>
              
              <div className="border-l-4 border-alert pl-4">
                <h3 className="font-semibold text-text-main mb-2">Cookies publicitaires</h3>
                <p className="text-text-muted text-sm">
                  Utilisés pour afficher des annonces pertinentes et mesurer l&apos;efficacité des campagnes publicitaires.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">3. Gestion des cookies</h2>
            <p className="text-text-muted mb-4">
              Vous avez plusieurs options pour gérer les cookies:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li><strong>Paramètres du navigateur:</strong> La plupart des navigateurs permettent de refuser ou d&apos;accepter les cookies</li>
              <li><strong>Bandeau de cookies:</strong> Vous pouvez modifier vos préférences à tout moment</li>
              <li><strong>Outils tiers:</strong> Désactivez les cookies de certaines entreprises</li>
            </ul>
            <p className="text-text-muted mt-4">
              Notez que désactiver certains cookies peut affecter le fonctionnement du site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">4. Cookies tiers</h2>
            <p className="text-text-muted">
              Nous utilisons des services tiers qui peuvent également placer des cookies:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2 mt-4">
              <li><strong>Google Analytics:</strong> Analyse d&apos;audience</li>
              <li><strong>Facebook Pixel:</strong> Publicités personnalisées</li>
              <li><strong>WhatsApp:</strong> Intégration de contact</li>
              <li><strong>Hébergement:</strong> Statistiques serveur</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">5. Durée de conservation</h2>
            <p className="text-text-muted">
              Les cookies sont conservés pour une durée maximale de 13 mois. Les cookies de session sont supprimés à la fermeture du navigateur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">6. Consentement</h2>
            <p className="text-text-muted">
              Lors de votre première visite, un bandeau vous permet d&apos;accepter ou de refuser les cookies non essentiels. Votre choix est conservé pour 6 mois.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">7. Mise à jour</h2>
            <p className="text-text-muted">
              Cette politique peut être mise à jour. La date de dernière modification est indiquée en haut de cette page.
            </p>
          </section>

          <div className="bg-neutral p-6 rounded-xl mt-8">
            <h3 className="font-semibold text-text-main mb-4">Gérez vos préférences cookies</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                Accepter tous les cookies
              </button>
              <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-gray-50">
                Refuser les cookies optionnels
              </button>
              <button className="px-4 py-2 border border-gray-300 text-text-muted rounded-lg text-sm hover:bg-gray-50">
                Personnaliser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}