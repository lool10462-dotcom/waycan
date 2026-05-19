import { Metadata } from 'next'
import { Shield, Lock, Eye, UserCheck, AlertTriangle, CheckCircle, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sécurité - Conseils et protection | WAYCAN',
  description: 'Guide de sécurité pour vos transactions sur WAYCAN. Protégez-vous des arnaques et échangez en toute confiance.',
}

const securityTips = [
  {
    icon: MapPin,
    title: 'Rencontrez en lieu public',
    description: 'Toujours rencontrer le vendeur ou acheteur dans un lieu public fréquenté (café, centre commercial, parking sécurisé).',
    color: 'bg-success',
  },
  {
    icon: Phone,
    title: 'Vérifiez avant de payer',
    description: 'Examinez le produit avant de payer. Pour les véhicules, faites un essayage. Pour l\'électronique, testez le fonctionnement.',
    color: 'bg-secondary',
  },
  {
    icon: Shield,
    title: 'Utilisez les paiement sécurisés',
    description: 'Préférez les paiements en main propres ou via les services de mobile money vérifiés. Évitez les virements bancaires.',
    color: 'bg-primary',
  },
  {
    icon: UserCheck,
    title: 'Vérifiez le profil',
    description: 'Choisissez des utilisateurs vérifiés avec le badge "Vendeur vérifié". Consultez leur historique et leurs avis.',
    color: 'bg-accent',
  },
]

const scamTypes = [
  {
    title: 'Arnaque au paiement',
    description: 'Un acheteur vous demande de payer des frais de livraison ou de douane avant l\'expédition. Fuyez!',
    warning: 'WAYCAN ne demande JAMAIS de paiement avant livraison.',
  },
  {
    title: 'Faux prix cassés',
    description: 'Des annonces avec des prix trop beaux pour être vrais cachent souvent des arnaques.',
    warning: 'Si le prix est 50% en dessous du marché, c\'est probablement une arnaque.',
  },
  {
    title: 'Compte usurpés',
    description: 'Des escrocs utilisent des photos et descriptions d\'annonces existantes pour欺骗 des acheteurs.',
    warning: 'Vérifiez toujours le numéro de téléphone directement.',
  },
  {
    title: 'Phishing',
    description: 'Des emails ou messages fake imitant WAYCAN pour voler vos identifiants.',
    warning: 'WAYCAN ne vous demandera JAMAIS votre mot de passe par email.',
  },
]

const reportSteps = [
  'Cliquez sur le bouton "Signaler" sur l\'annonce suspecte',
  'Décrivez le problème en détail',
  'Notre équipe vérifiera dans les 24h',
  'L\'annonce sera supprimée si elle violate nos règles',
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-6">
            <Shield className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-4xl font-bold text-text-main mb-4">Sécurité sur WAYCAN</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Votre sécurité est notre priorité. Suivez ces conseils pour des transactions sûres et réussies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {securityTips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div key={index} className="bg-surface rounded-xl p-6 flex gap-4 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${tip.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-main mb-2">{tip.title}</h3>
                  <p className="text-text-muted">{tip.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-br from-alert/10 to-alert/5 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-alert" />
            <h2 className="text-2xl font-bold text-text-main">Reconnaître les arnaques</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scamTypes.map((scam, index) => (
              <div key={index} className="bg-surface rounded-xl p-6">
                <h3 className="font-semibold text-text-main mb-2">{scam.title}</h3>
                <p className="text-text-muted text-sm mb-3">{scam.description}</p>
                <div className="bg-alert/10 border-l-4 border-alert p-3 rounded">
                  <p className="text-sm text-alert font-medium">{scam.warning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
            <CheckCircle className="w-7 h-7 text-success" />
            Comment signaler une arnaque?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {index + 1}
                </div>
                <p className="text-text-muted">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="/contact" className="btn-primary inline-flex items-center gap-2">
              Signaler un problème
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-text-main">Protection de vos données</h3>
            </div>
            <ul className="space-y-3 text-text-muted">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Chiffrement HTTPS sur tout le site
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Conformité RGPD/PDPA
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Vos données ne sont jamais vendues
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Option de suppression de compte
              </li>
            </ul>
          </div>

          <div className="bg-surface rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-text-main">Confidentialité</h3>
            </div>
            <ul className="space-y-3 text-text-muted">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Email masqué dans les annonces
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Numéro optional masqué
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Contrôle de la visibilité
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Bloquer des utilisateurs
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-primary text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Besoin d&apos;aide?</h2>
          <p className="mb-6 opacity-90">Notre équipe est disponible pour vous aider en cas de doute</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/25377179755" className="bg-success px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              WhatsApp: +253 77 17 97 55
            </a>
            <a href="/contact" className="bg-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors">
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}