import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown, MessageCircle, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - Foire aux questions | WAYCAN',
  description: 'Trouvez réponses à vos questions sur WAYCAN - Comment vendre, acheter, sécuriser vos transactions et plus encore.',
}

const faqCategories = [
  {
    title: 'Général',
    questions: [
      {
        q: 'Qu\'est-ce que WAYCAN ?',
        a: 'WAYCAN est la première marketplace d\'annonces classées à Djibouti, spécialisée dans la mise en relation entre acheteurs et vendeurs. Nous proposons des annonces dans plusieurs catégories: véhicules, immobilier, emplois, électronique, maison et services.'
      },
      {
        q: 'WAYCAN est-il gratuit ?',
        a: 'Oui! La publication d\'annonces est 100% gratuite sur WAYCAN. Nous proposons également des packs premium optionnels pour booster la visibilité de vos annonces.'
      },
      {
        q: 'Dans quelles zones pouvez-vous livrer ?',
        a: 'WAYCAN est disponible dans tout Djibouti, incluant Djibouti-ville, Balbala, Boulevard, Haramous, Ambouli, Ali-Sabieh, Tadjourah et Obock. Les transactions se font principalement en personne.'
      },
    ]
  },
  {
    title: 'Vendre',
    questions: [
      {
        q: 'Comment publier une annonce ?',
        a: 'Cliquez sur "Publier une annonce" dans le menu, choissez votre catégorie, ajoutez les détails, des photos de qualité, votre prix et vos coordonnées. Votre annonce sera visible instantanément!'
      },
      {
        q: 'Quelles photos dois-je ajouter ?',
        a: 'Ajoutez des photos nettes et bien éclairées de votre produit sous plusieurs angles. Les annonces avec de bonnes photos se vendent 50% plus vite! Évitez les photos floues ou mal éclairées.'
      },
      {
        q: 'Comment fixer le bon prix ?',
        a: 'Recherchez des annonces similaires pour vous faire une idée. Nous proposons également un outil de "Prix suggéré" basé sur les annonces similaires sur notre plateforme.'
      },
      {
        q: 'Puis-je modifier mon annonce ?',
        a: 'Oui, connectez-vous à votre compte et allez dans "Mes annonces" pour modifier, supprimer ou renouveler vos annonces.'
      },
    ]
  },
  {
    title: 'Acheter',
    questions: [
      {
        q: 'Comment contacter un vendeur ?',
        a: 'Cliquez sur "Voir l\'annonce" puis utilisez les boutons WhatsApp, Appeler ou Message pour contacter directement le vendeur.'
      },
      {
        q: 'WAYCAN garantit-il les transactions ?',
        a: 'WAYCAN facilite la mise en relation mais ne参与了 pas aux transactions. Nous vous recommandons de rencontrer le vendeur dans un lieu public et de vérifier le produit avant de payer.'
      },
      {
        q: 'Que faire en cas d\'arnaque ?',
        a: 'Signalez immédiatement l\'annonce via le bouton "Signaler" sur la page de l\'annonce. Notre équipe vérifiera et supprimera les annonces frauduleuses.'
      },
    ]
  },
  {
    title: 'Compte & Sécurité',
    questions: [
      {
        q: 'Comment créer un compte ?',
        a: 'Cliquez sur "Inscription" et remplissez le formulaire avec votre nom, email, téléphone et mot de passe. Vous pouvez aussi vous inscrire avec Google ou Facebook.'
      },
      {
        q: 'Comment devenir "Vendeur vérifié" ?',
        a: 'Confirmez votre numéro de téléphone et votre email via notre processus de vérification. Les vendeurs vérifiés bénéficient d\'un badge et d\'une confiance accrue des acheteurs.'
      },
      {
        q: 'Mes données sont-elles sécurisées ?',
        a: 'Absolument! WAYCAN utilise le chiffrement HTTPS et respecte les normes de protection des données personnelles (GDPR/PDPA).'
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-main mb-4">Foire Aux Questions</h1>
          <p className="text-text-muted text-lg">Trouvez rapidement les réponses à vos questions</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher dans la FAQ..."
              className="w-full px-6 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="bg-surface rounded-xl overflow-hidden">
              <div className="bg-primary px-6 py-4">
                <h2 className="text-xl font-semibold text-white">{category.title}</h2>
              </div>
              <div className="divide-y">
                {category.questions.map((item, qIndex) => (
                  <details key={qIndex} className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-neutral/50 transition-colors">
                      <span className="font-medium text-text-main pr-4">{item.q}</span>
                      <ChevronDown className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-text-muted leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Vous n&apos;avez pas trouvé votre réponse?</h3>
          <p className="mb-6 opacity-90">Notre équipe est disponible pour vous aider</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/25377179755" className="inline-flex items-center gap-2 bg-success px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors">
              <Mail className="w-5 h-5" />
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}