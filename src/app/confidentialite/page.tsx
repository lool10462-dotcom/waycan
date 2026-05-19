import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Eye, Database, Trash2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | WAYCAN',
  description: 'Politique de confidentialité et protection des données personnelles WAYCAN Djibouti.',
}

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-text-main">Politique de Confidentialité</h1>
          </div>
          
          <p className="text-text-muted mb-8">Dernière mise à jour: Mai 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">1. Introduction</h2>
            <p className="text-text-muted">
              WAYCAN s&apos;engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données personnelles, en conformité avec le RGPD et les lois djiboutiennes sur la protection des données.
            </p>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-text-main">2. Données collectées</h2>
            </div>
            <p className="text-text-muted mb-4">
              Nous collectons les données suivantes:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li><strong>Informations d&apos;inscription:</strong> nom, email, téléphone</li>
              <li><strong>Informations du profil:</strong> photo, localisation, préférences</li>
              <li><strong>Données d&apos;utilisation:</strong> pages visitées, recherche, interactions</li>
              <li><strong>Données de transaction:</strong> historique d&apos;annonces, messages</li>
              <li><strong>Données techniques:</strong> adresse IP, navigateur, appareil</li>
            </ul>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-text-main">3. Utilisation des données</h2>
            </div>
            <p className="text-text-muted mb-4">
              Vos données sont utilisées pour:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li>Créer et gérer votre compte</li>
              <li>Publier et afficher vos annonces</li>
              <li>Faciliter les contacts entre utilisateurs</li>
              <li>Personnaliser votre expérience</li>
              <li>Améliorer nos services et détecter les fraudes</li>
              <li>Vous envoyer des notifications et mises à jour</li>
            </ul>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-text-main">4. Protection des données</h2>
            </div>
            <p className="text-text-muted mb-4">
              Nous mettons en œuvre les mesures de sécurité suivantes:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li>Chiffrement HTTPS sur tout le site</li>
              <li>Stockage sécurisé des données</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Sauvegardes régulières</li>
              <li>Formation de notre équipe à la sécurité</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">5. Partage des données</h2>
            <p className="text-text-muted mb-4">
              Nous ne vendons PAS vos données personnelles. Nous partageons vos données uniquement:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li>Avec votre consentement explicite</li>
              <li>Pour fulfiller nos obligations légales</li>
              <li>Avec des prestataires de services fiables (hébergement, paiement)</li>
              <li>Pour détecter et prévenir les fraudes</li>
            </ul>
            <p className="text-text-muted mt-4">
              Les annonceurs ne reçoivent pas vos coordonnées sauf si vous les partagez volontairement.
            </p>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-text-main">6. Vos droits</h2>
            </div>
            <p className="text-text-muted mb-4">
              Vous avez les droits suivants sur vos données:
            </p>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li><strong>Droit d&apos;accès:</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification:</strong> corriger des données inexactes</li>
              <li><strong>Droit d&apos;effacement:</strong> demander la suppression de vos données</li>
              <li><strong>Droit d&apos;opposition:</strong> vous opposer au traitement</li>
              <li><strong>Droit à la portabilité:</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit de retrait:</strong> retirer votre consentement à tout moment</li>
            </ul>
            <p className="text-text-muted mt-4">
              Pour exercer ces droits, contactez <Link href="mailto:support@waycan.dj" className="text-primary hover:underline">support@waycan.dj</Link>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">7. Cookies</h2>
            <p className="text-text-muted">
              WAYCAN utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences cookies dans les paramètres de votre navigateur ou via notre <Link href="/cookies" className="text-primary hover:underline">gestion des cookies</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">8. Conservation des données</h2>
            <p className="text-text-muted">
              Nous conservons vos données aussi longtemps que votre compte est actif ou aussi longtemps que nécessaire pour fournir nos services. Vous pouvez supprimer votre compte à tout moment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">9. Mineurs</h2>
            <p className="text-text-muted">
              WAYCAN n&apos;est pas destiné aux personnes de moins de 18 ans. Si nous thérapeutisons que nous avons collectées des données d&apos;un mineur, nous les supprimerons rapidement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-main mb-4">10. Modifications</h2>
            <p className="text-text-muted">
              Nous pouvons modifier cette politique à tout moment. Les modifications seront publiées sur cette page avec une date de mise à jour. Nous vous informerons de tout changement important par email.
            </p>
          </section>

          <div className="bg-neutral p-6 rounded-xl mt-8">
            <h3 className="font-semibold text-text-main mb-2">Contact</h3>
            <p className="text-text-muted">
              Pour toute question sur cette politique, contactez notre responsable confidentialité à <Link href="mailto:support@waycan.dj" className="text-primary hover:underline">support@waycan.dj</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}