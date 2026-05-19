import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CGU - Conditions Générales d\'Utilisation | WAYCAN',
  description: 'Conditions générales d\'utilisation de la plateforme WAYCAN Marketplace Djibouti.',
}

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-text-main mb-8 text-center">Conditions Générales d&apos;Utilisation</h1>
          
          <div className="prose max-w-none">
            <p className="text-text-muted mb-8">Dernière mise à jour: Mai 2026</p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">1. Objet</h2>
              <p className="text-text-muted">
                Les présentes Conditions Générales d&apos;Utilisation (CGU) ont pour objet de définir les modalités d&apos;accès et d&apos;utilisation de la plateforme WAYCAN, propriété de WAYCAN Sarl, société enregistrée à Djibouti.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">2. Acceptation des conditions</h2>
              <p className="text-text-muted">
                L&apos;utilisation de WAYCAN implique l&apos;acceptation pleine et entière des présentes CGU. Si vous n&apos;acceptez pas ces conditions, vous ne devez pas utiliser la plateforme.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">3. Éligibilité</h2>
              <p className="text-text-muted mb-4">
                Pour utiliser WAYCAN, vous devez:
              </p>
              <ul className="list-disc pl-6 text-text-muted space-y-2">
                <li>Être âgé d&apos;au moins 18 ans</li>
                <li>Posséder un numéro de téléphone valide</li>
                <li>Avoir la capacité juridique de passer des contrats</li>
                <li>Ne pas être suspendu ou banni de la plateforme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">4. Inscription et compte</h2>
              <p className="text-text-muted mb-4">
                Lors de votre inscription, vous vous engagez à:
              </p>
              <ul className="list-disc pl-6 text-text-muted space-y-2">
                <li>Fournir des informations exactes et à jour</li>
                <li>Maintenir la confidentialité de votre mot de passe</li>
                <li>Ne pas partager votre compte avec d&apos;autres personnes</li>
                <li>Notifier WAYCAN de toute utilisation non autorisée</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">5. Annonces et contenu</h2>
              <p className="text-text-muted mb-4">
                Vous vous engagez à:
              </p>
              <ul className="list-disc pl-6 text-text-muted space-y-2">
                <li>Publier uniquement des annonces légales et conformes</li>
                <li>Ne pas copier le contenu d&apos;autres annonces</li>
                <li>Ne pas utiliser de photos volées ou truquées</li>
                <li>Ne pas proposer de biens ou services illégaux</li>
                <li>Ne pas spammer ou posters des annonces répétitives</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">6. Interdictions</h2>
              <p className="text-text-muted mb-4">
                Il est strictement interdit de:
              </p>
              <ul className="list-disc pl-6 text-text-muted space-y-2">
                <li>Proposer des biens volés ou illégaux</li>
                <li>Organiser des systèmes pyramidaux ou arnaques</li>
                <li>Harceler, menacer ou diffamer d&apos;autres utilisateurs</li>
                <li>Tenter de contourner les mesures de sécurité</li>
                <li>Utiliser des bots ou automates pour poster du contenu</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">7. Transactions</h2>
              <p className="text-text-muted">
                WAYCAN est une plateforme de mise en relation. Les transactions se font directement entre acheteurs et vendeurs. WAYCAN ne participe pas aux transactions et ne peut être tenu responsable des problèmes entre utilisateurs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">8. Responsabilité</h2>
              <p className="text-text-muted">
                WAYCAN s&apos;efforce de fournir un service de qualité mais ne peut garantir l&apos;exactitude des annonces. Les utilisateurs sont responsables de leurs propres transactions et doivent prendre leurs précautions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">9. Résiliation</h2>
              <p className="text-text-muted">
                WAYCAN se réserve le droit de suspendre ou supprimer un compte sans préavis en cas de violation des CGU ou de comportement nuisible à la plateforme.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-text-main mb-4">10. Droit applicable</h2>
              <p className="text-text-muted">
                Les présentes CGU sont régies par le droit djiboutien. Tout litige sera porté devant les tribunaux de Djibouti.
              </p>
            </section>

            <div className="bg-neutral p-6 rounded-xl mt-8">
              <p className="text-text-muted">
                Pour toute question concernant ces CGU, contactez-nous à <Link href="mailto:support@waycan.dj" className="text-primary hover:underline">support@waycan.dj</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}