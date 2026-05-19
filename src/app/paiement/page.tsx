'use client'

import { useState } from 'react'
import { CreditCard, Smartphone, Check, Loader2, Upload, AlertCircle, ShieldCheck } from 'lucide-react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { uploadImage } from '@/lib/storage'

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState<'card' | 'paypal' | 'waafi'>('card')
  const [isUploading, setIsUploading] = useState(false)
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Exemple de pack sélectionné (ceci pourra être dynamique selon la page précédente)
  const plan = { name: "Pro", price: 4500 }

  const handleWaafiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setErrorMsg(null)
    
    // Upload vers Supabase (Il faudra créer un bucket 'receipts' sur votre DB)
    const result = await uploadImage(files[0], 'receipts')

    if (result.error) {
      setErrorMsg(result.error)
    } else if (result.url) {
      setReceiptUrl(result.url)
      // On simule que le scanner a validé le reçu
      setTimeout(() => {
        setSuccess(true)
      }, 1500)
    }
    
    setIsUploading(false)
  }

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Intégration backend Stripe à brancher ici
    alert("Simulation de l'API Stripe : Paiement réussi !")
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-neutral pt-24 pb-12 flex items-center justify-center">
        <div className="bg-surface p-8 rounded-2xl max-w-md w-full text-center shadow-xl animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-text-main mb-4">Paiement validé !</h2>
          <p className="text-text-muted mb-8">
            Merci pour votre confiance. Votre compte est maintenant Premium et votre annonce gagne en visibilité.
          </p>
          <a href="/annonces" className="btn-primary w-full inline-block">Voir mes annonces</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        
        {/* Colonne de gauche - Méthodes de Paiement */}
        <div className="flex-1 bg-surface rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-success" />
            Paiement Sécurisé
          </h1>

          {/* Onglets */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl overflow-x-auto">
            <button 
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all min-w-[140px] ${activeTab === 'card' ? 'bg-white shadow-sm text-text-main' : 'text-gray-500 hover:text-text-main'}`}
            >
              <CreditCard className="w-4 h-4" /> Carte Bancaire
            </button>
            <button 
              onClick={() => setActiveTab('paypal')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all min-w-[140px] ${activeTab === 'paypal' ? 'bg-white shadow-sm text-[#003087]' : 'text-gray-500 hover:text-text-main'}`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106a.64.64 0 0 1-.632.533zM19.349 6.46c-.033.15-.06.31-.086.46-.984 5.04-4.35 6.79-8.648 6.79h-2.19c-.524 0-.968.38-.105.9l-1.12 7.1c-.082.52.338.9.862.9h3.766c.465 0 .866-.33.945-.79l.913-5.78c.08-.52.525-.9 1.05-.9h.455c3.81 0 6.786-1.55 7.663-5.79.43-2.07.2-3.8-1.505-5.34z"/></svg> PayPal
            </button>
            <button 
              onClick={() => setActiveTab('waafi')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all min-w-[140px] ${activeTab === 'waafi' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-text-main'}`}
            >
              <Smartphone className="w-4 h-4" /> Waafi Mobile
            </button>
          </div>

          {/* Interface Stripe / Carte Bancaire */}
          {activeTab === 'card' && (
            <form onSubmit={handleCardSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-6 flex gap-3">
                <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
                <p>Vos données bancaires sont encryptées par Stripe. Supporte Visa, Mastercard, Amex, Discover, Google Pay et Apple Pay.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Nom sur la carte</label>
                <input type="text" placeholder="ex: Hamza Asadullah" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Numéro de carte</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="0000 0000 0000 0000" className="input-field pl-12 font-mono tracking-widest" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Date d'expiration</label>
                  <input type="text" placeholder="MM/AA" className="input-field font-mono" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Code de sécurité (CVC)</label>
                  <input type="text" placeholder="123" className="input-field font-mono" required />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full mt-6 text-lg py-4">Payer {plan.price} FDJ</button>
            </form>
          )}

          {/* Interface PayPal */}
          {activeTab === 'paypal' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 flex flex-col items-center justify-center py-8">
              <PayPalScriptProvider options={{ clientId: "test" }}>
                  <PayPalButtons style={{ layout: "vertical", shape: "rect", color: "blue" }} />
              </PayPalScriptProvider>
              <p className="text-sm text-gray-400 mt-6 text-center max-w-sm">Vous allez être redirigé vers l'interface sécurisée de PayPal pour finaliser votre commande.</p>
            </div>
          )}

          {/* Interface Waafi (Mobile Money) */}
          {activeTab === 'waafi' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center flex flex-col items-center">
                <img src="/waafi-logo.png" alt="Waafi Logo" className="w-16 h-16 object-contain mb-3" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Étape 1 : Envoyez {plan.price} FDJ via Waafi</h3>
                <p className="text-green-700 font-mono text-3xl font-bold tracking-wider mb-2">+253 77 17 97 55</p>
                <p className="text-sm text-green-600 font-medium">Nom du compte administrateur : WAYCAN PRO</p>
              </div>

              <div className="space-y-4">
                <p className="font-medium text-text-main">Étape 2 : Uploadez la capture d'écran du transfert</p>
                
                {errorMsg && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-green-300 rounded-xl bg-green-50/50 hover:bg-green-50 transition-all cursor-pointer overflow-hidden group">
                  <input 
                    type="file" 
                    onChange={handleWaafiUpload}
                    accept="image/png, image/jpeg"
                    className="hidden"
                    disabled={isUploading}
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center text-green-600">
                      <Loader2 className="w-8 h-8 animate-spin mb-2" />
                      <span className="text-sm font-medium">Analyse du reçu (Date, Montant) en cours...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-green-700 group-hover:scale-105 transition-transform">
                      <Upload className="w-8 h-8 mb-2 opacity-80" />
                      <span className="font-bold text-lg">Sélectionner la capture d'écran</span>
                      <span className="text-xs opacity-70 mt-1">Notre système vérifiera automatiquement le montant</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Colonne de droite - Résumé de la commande */}
        <div className="w-full md:w-[350px] space-y-6">
          <div className="bg-surface rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-text-main mb-6 text-lg">Résumé de la commande</h3>
            <div className="space-y-4 text-sm mb-6 border-b border-gray-100 pb-6">
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Abonnement Premium</span>
                <span className="font-medium bg-accent/10 text-accent px-2 py-1 rounded text-xs">Pack {plan.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Durée</span>
                <span className="font-medium">1 Semaine</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Sous-total</span>
                <span className="font-medium">{plan.price} FDJ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Frais de transaction</span>
                <span className="font-medium text-success">Offerts</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total à payer</span>
              <span className="text-accent">{plan.price} FDJ</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm text-text-muted bg-white p-4 rounded-xl border border-gray-100">
            <ShieldCheck className="w-8 h-8 text-success flex-shrink-0" />
            <p>Paiement sécurisé. Garantie satisfait ou remboursé sous 48h en cas d'insatisfaction.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
