'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Star, Phone, MessageCircle, CreditCard, X, ChevronRight, Shield, Calendar, CheckCircle } from 'lucide-react'

interface Pack {
  id: number
  name: string
  price: number
  period: string
  description: string
  features: string[]
  popular: boolean
}

const packs: Pack[] = [
  {
    id: 1,
    name: 'Basic',
    price: 2900,
    period: 'semaine',
    description: 'Pour une visibilité rapide',
    features: ['Annonce en tête de liste', 'Badge Premium visible', '7 jours de visibilité boostée'],
    popular: false,
  },
  {
    id: 2,
    name: 'Pro',
    price: 4500,
    period: 'semaine',
    description: 'Le plus populaire',
    features: ['Position prioritaire', 'Badge Premium + couleur', '30 jours de visibilité', 'Partage réseaux sociaux'],
    popular: true,
  },
  {
    id: 3,
    name: 'Business',
    price: 7500,
    period: 'semaine',
    description: 'Pour les professionnels',
    features: ['Boutique dédiée', '10 annonces premium', 'Analytics dashboard', 'Support prioritaire WhatsApp'],
    popular: false,
  }
]

export default function SubscribePage() {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    adTitle: '',
    paymentMethod: 'whatsapp'
  })

  const handleSelectPack = (pack: Pack) => {
    setSelectedPack(pack)
    setShowPaymentModal(true)
    setPaymentStep(1)
  }

  const handleSubmitPayment = () => {
    if (paymentStep === 1) {
      setPaymentStep(2)
    } else {
      setPaymentStep(3)
    }
  }

  const getWhatsAppMessage = () => {
    if (!selectedPack) return ''
    return `Bonjour WAYCAN ! Je souhaite souscrire au pack *${selectedPack.name}* (${selectedPack.price} FDJ/${selectedPack.period}) pour mon annonce: "${formData.adTitle}". Mon nom: ${formData.name}, Téléphone: ${formData.phone}`
  }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-4">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour
          </Link>
          <h1 className="text-4xl font-bold text-text-main mb-4">
            Boostez votre <span className="text-accent">visibilité</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Augmentez vos chances de vente avec nos packs Premium. Paiement simple via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`bg-surface rounded-2xl p-6 relative transition-all hover:shadow-xl ${
                pack.popular ? 'ring-2 ring-accent scale-105' : 'border'
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Plus populaire
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-text-main text-center mb-2">{pack.name}</h3>
              <div className="text-center mb-4">
                <span className="text-4xl font-extrabold text-accent">{pack.price.toLocaleString()}</span>
                <span className="text-text-muted"> FDJ/{pack.period}</span>
              </div>
              <p className="text-text-muted text-center mb-6">{pack.description}</p>

              <ul className="space-y-3 mb-8">
                {pack.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPack(pack)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  pack.popular
                    ? 'bg-accent text-white hover:bg-orange-600'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                Choisir {pack.name}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-success/10 to-transparent rounded-2xl p-8 border border-success/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-text-main text-xl mb-2">Paiement via WhatsApp</h3>
              <p className="text-text-muted mb-4">
                Le paiement est simple et sécurisé via WhatsApp. Après votre commande, vous recevrez un message avec les instructions de paiement.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Activation en 24h</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Support inclus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && selectedPack && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-main">
                {paymentStep === 3 ? 'Paiement confirmé!' : `Souscrire au pack ${selectedPack.name}`}
              </h2>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentStep === 1 && (
              <div className="p-6 space-y-4">
                <div className="bg-neutral p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-muted">Pack sélectionné</span>
                    <span className="font-semibold text-text-main">{selectedPack.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Montant</span>
                    <span className="text-2xl font-bold text-accent">{selectedPack.price.toLocaleString()} FDJ</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Votre nom complet *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Ex: Mohamed Ali"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Numéro WhatsApp *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="+253 77 12 34 56"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Titre de l'annonce à booster *</label>
                  <input
                    type="text"
                    value={formData.adTitle}
                    onChange={(e) => setFormData({...formData, adTitle: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Ex: Toyota Corolla 2020"
                  />
                  <p className="text-xs text-text-muted mt-1">Entrez le titre exact de votre annonce existante</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Méthode de paiement</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer bg-success/5 border-success/20">
                      <input
                        type="radio"
                        name="payment"
                        value="whatsapp"
                        checked={formData.paymentMethod === 'whatsapp'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="w-5 h-5 text-success"
                      />
                      <Phone className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-medium text-text-main">Via WhatsApp</p>
                        <p className="text-sm text-text-muted">Paiement via mobile money</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer opacity-60">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        disabled
                        className="w-5 h-5"
                      />
                      <CreditCard className="w-5 h-5 text-text-muted" />
                      <div>
                        <p className="font-medium text-text-main">Espèces (bientôt)</p>
                        <p className="text-sm text-text-muted">Paiement en main propre</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSubmitPayment}
                  disabled={!formData.name || !formData.phone || !formData.adTitle}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Passer au paiement
                </button>
              </div>
            )}

            {paymentStep === 2 && (
              <div className="p-6 space-y-6">
                <div className="bg-success/10 border border-success/20 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-success mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Commande créée!</span>
                  </div>
                  <p className="text-text-muted text-sm">
                    Envoyez le paiement via WhatsApp en cliquant sur le bouton ci-dessous.
                  </p>
                </div>

                <div className="bg-neutral p-4 rounded-xl">
                  <h3 className="font-semibold text-text-main mb-3">Récapitulatif</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Pack</span>
                      <span className="font-medium">{selectedPack.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Annonce</span>
                      <span className="font-medium">{formData.adTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Contact</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-semibold">Total à payer</span>
                      <span className="font-bold text-xl text-accent">{selectedPack.price.toLocaleString()} FDJ</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                  <h4 className="font-medium text-blue-800 mb-2">📋 Instructions de paiement:</h4>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Cliquez sur &quot;Envoyer sur WhatsApp&quot; ci-dessous</li>
                    <li>Un message prédéfini sera envoyé automatiquement</li>
                    <li>Effectuez le paiement via mobile money (Sahal/D-Money)</li>
                    <li>Envoyez la capture d&apos;écran en réponse</li>
                    <li>Votre pack sera activé sous 24h!</li>
                  </ol>
                </div>

                <a
                  href={`https://wa.me/25377179755?text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-success text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Envoyer sur WhatsApp
                </a>

                <button
                  onClick={() => setPaymentStep(1)}
                  className="w-full text-text-muted hover:text-primary"
                >
                  ← Modifier ma commande
                </button>
              </div>
            )}

            {paymentStep === 3 && (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-4">Paiement en attente</h3>
                <p className="text-text-muted mb-6">
                  Votre demande a été envoyée via WhatsApp. Veuillez effectuer le paiement et envoyer la capture d&apos;écran. 
                  Votre pack sera activé sous 24h après vérification du paiement.
                </p>
                <div className="bg-neutral p-4 rounded-xl text-left mb-6">
                  <p className="text-sm text-text-muted mb-2">Numéro de référence:</p>
                  <p className="font-mono text-lg font-bold text-text-main">WC-{Date.now().toString().slice(-8)}</p>
                </div>
                <Link
                  href="/"
                  className="btn-primary inline-flex"
                >
                  Retour à l&apos;accueil
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}