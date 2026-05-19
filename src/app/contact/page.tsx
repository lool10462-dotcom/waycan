import { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact - Nous contacter | WAYCAN',
  description: 'Contactez WAYCAN - Support client, commerciales et partenariats. Disponible 7j/7 de 8h à 20h.',
}

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Business',
    description: 'Réponse rapide en moins de 2h',
    contact: '+253 77 17 97 55',
    action: 'Envoyer un message',
    href: 'https://wa.me/25377179755',
    color: 'bg-success',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    description: 'Lun-Sam: 8h-20h',
    contact: '+253 77 17 97 55',
    action: 'Appeler',
    href: 'tel:+25377179755',
    color: 'bg-primary',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Réponse sous 24h',
    contact: 'support@waycan.dj',
    action: 'Envoyer un email',
    href: 'mailto:support@waycan.dj',
    color: 'bg-secondary',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-main mb-4">Contactez-nous</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Notre équipe est disponible 7 jours sur 7 pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-surface rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${method.color} rounded-full mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text-main mb-2">{method.title}</h3>
                <p className="text-text-muted mb-4">{method.description}</p>
                <p className="font-medium text-primary mb-4">{method.contact}</p>
                <span className="inline-flex items-center gap-2 text-accent font-medium">
                  {method.action} →
                </span>
              </a>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-main mb-6">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Nom complet</label>
                  <input type="text" placeholder="Votre nom" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Email</label>
                  <input type="email" placeholder="votre@email.com" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Téléphone</label>
                <input type="tel" placeholder="+253 77 17 97 55" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Sujet</label>
                <select className="input-field">
                  <option>Sélectionnez un sujet</option>
                  <option>Support technique</option>
                  <option>Question sur une annonce</option>
                  <option>Signaler un problème</option>
                  <option>Partenariats commerciaux</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Message</label>
                <textarea
                  placeholder="Décrivez votre problème ou question en détail..."
                  className="input-field min-h-[150px]"
                />
              </div>
              <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Envoyer le message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-text-main mb-6">Informations complémentaires</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-main">Adresse</h3>
                    <p className="text-text-muted">Djibouti-ville, Djibouti</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-main">Horaires d&apos;ouverture</h3>
                    <p className="text-text-muted">7j/7, 8h - 20h (GMT+3)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-main">Temps de réponse</h3>
                    <p className="text-text-muted">&lt; 2h sur WhatsApp, &lt; 24h par email</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Besoin d&apos;aide urgente?</h3>
              <p className="mb-4 opacity-90">Notre équipe WhatsApp est disponible pour vous aider immédiatement.</p>
              <a
                href="https://wa.me/25377179755"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-success px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chatter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}