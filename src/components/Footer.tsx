import Link from 'next/link'
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">W</span>
              </div>
              <span className="text-2xl font-bold">WAYCAN</span>
            </div>
            <p className="text-gray-300 mb-4">
              Vendez, achetez, progressez — La marketplace intelligente de Djibouti
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/waycan" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/waycan" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/25377179755" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Explorer</h3>
            <ul className="space-y-2">
              <li><Link href="/annonces" className="text-gray-300 hover:text-white transition-colors">Toutes les annonces</Link></li>
              <li><Link href="/categorie/vehicules" className="text-gray-300 hover:text-white transition-colors">Véhicules</Link></li>
              <li><Link href="/categorie/immobilier" className="text-gray-300 hover:text-white transition-colors">Immobilier</Link></li>
              <li><Link href="/categorie/emploi" className="text-gray-300 hover:text-white transition-colors">Emplois</Link></li>
              <li><Link href="/categorie/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/actualites" className="text-gray-300 hover:text-white transition-colors">Actualités</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Aide</h3>
            <ul className="space-y-2">
              <li><Link href="/comment-ca-marche" className="text-gray-300 hover:text-white transition-colors">Comment ça marche</Link></li>
              <li><Link href="/securite" className="text-gray-300 hover:text-white transition-colors">Sécurité</Link></li>
              <li><Link href="/souscrire" className="text-gray-300 hover:text-white transition-colors">Premium</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="/cgu" className="text-gray-300 hover:text-white transition-colors">CGU</Link></li>
              <li><Link href="/confidentialite" className="text-gray-300 hover:text-white transition-colors">Confidentialité</Link></li>
              <li><Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookies</Link></li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Restez informé</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                />
                <button className="bg-accent px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +253 77 17 97 55
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@waycan.dj
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Djibouti-ville
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 WAYCAN. Tous droits réservés.
            </p>
            <div className="mt-4">
              <Link href="/admin" className="text-gray-500 text-xs hover:text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                Administration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}