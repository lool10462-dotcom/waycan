import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'WAYCAN - Marketplace Djibouti | Vendez, achetez, progressez',
  description: 'La marketplace intelligente de Djibouti. Achetez et vendez voitures, immobilier, emplois, électronique et plus encore.',
  keywords: 'annonces Djibouti, marketplace, voiture Djibouti, appartement Djibouti, emploi Djibouti, vente',
  authors: [{ name: 'WAYCAN' }],
  openGraph: {
    title: 'WAYCAN - Marketplace Djibouti',
    description: 'Vendez, achetez, progressez — La marketplace intelligente de Djibouti',
    type: 'website',
    locale: 'fr_DJ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}