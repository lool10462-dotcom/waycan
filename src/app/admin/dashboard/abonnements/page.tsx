'use client'

import { useState } from 'react'
import { 
  DollarSign, Star, Calendar, CreditCard, ChevronRight, CheckCircle, 
  Settings2, Activity, ArrowUpRight, ShieldCheck, Mail
} from 'lucide-react'

interface PremiumPack {
  id: string | number
  name: string
  price: string
  duration: string
  features: string[]
  active_subscriptions: number
}

interface ActiveVip {
  id: string | number
  ad_title: string
  user_name: string
  user_email: string
  plan_name: string
  amount: string
  start_date: string
  end_date: string
}

export default function AdminAbonnements() {
  const [packs, setPacks] = useState<PremiumPack[]>([
    { id: 1, name: 'VIP Gold', price: '5,000 FDJ', duration: '15 jours', features: ['En haut de liste', 'Ruban jaune accrocheur', 'Notifications acheteurs'], active_subscriptions: 145 },
    { id: 2, name: 'Platinum Booster', price: '9,500 FDJ', duration: '30 jours', features: ['Tous les privilèges VIP', 'Bannière publicitaire latérale', 'Assistance premium 24h'], active_subscriptions: 82 },
    { id: 3, name: 'Top Visibilité', price: '2,500 FDJ', duration: '7 jours', features: ['Mise en avant 3 jours', 'Partage automatique réseaux'], active_subscriptions: 218 }
  ])

  const [activeVips, setActiveVips] = useState<ActiveVip[]>([
    { id: 1, ad_title: 'Toyota Land Cruiser V8 2022', user_name: 'Mohamed Dileita', user_email: 'dileita@gmail.com', plan_name: 'VIP Gold', amount: '5,000 FDJ', start_date: '10 Mai 2026', end_date: '25 Mai 2026' },
    { id: 2, ad_title: 'Appartement F4 à louer Haramous', user_name: 'Kamil Ahmed', user_email: 'kamil.ahmed@yahoo.fr', plan_name: 'Platinum Booster', amount: '9,500 FDJ', start_date: '01 Mai 2026', end_date: '31 Mai 2026' },
    { id: 3, ad_title: 'iPhone 15 Pro Max Neuf', user_name: 'Fathia Hassan', user_email: 'fathia99@gmail.com', plan_name: 'Top Visibilité', amount: '2,500 FDJ', start_date: '16 Mai 2026', end_date: '23 Mai 2026' }
  ])

  const [revenueStats] = useState({
    gross_month: '1,865,000 FDJ',
    subscribers_count: '445',
    active_premium_ratio: '18%',
    growth: '+14.2%'
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-main flex items-center gap-2">
            <DollarSign className="w-8 h-8 text-green-600" />
            Gestion des Abonnements VIP
          </h1>
          <p className="text-text-muted mt-1">Configurez les formules premium, surveillez les transactions et suivez la visibilité payante.</p>
        </div>
      </div>

      {/* Revenue indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Chiffre d'Affaires Mensuel</span>
          <p className="text-2xl font-black text-green-600 mt-1">{revenueStats.gross_month}</p>
          <p className="text-[10px] text-green-600 font-bold mt-1">{revenueStats.growth} par rapport au mois dernier</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Abonnés Actifs</span>
          <p className="text-2xl font-black text-text-main mt-1">{revenueStats.subscribers_count} VIP</p>
          <p className="text-[10px] text-text-muted font-semibold mt-1">Sur 1,280 annonces publiées</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Taux de Pénétration VIP</span>
          <p className="text-2xl font-black text-accent mt-1">{revenueStats.active_premium_ratio}</p>
          <p className="text-[10px] text-text-muted font-semibold mt-1">Ratio annonces gratuites/payantes</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Passerelle de Paiement</span>
            <p className="text-sm font-bold text-text-main mt-1">Waafi Pay, CAC Pay</p>
            <p className="text-[9px] text-green-600 font-semibold mt-0.5">Opérationnel & Actif</p>
          </div>
          <CreditCard className="w-10 h-10 text-gray-300 stroke-[1.5]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* VIP Plans Settings (2/5 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 space-y-6">
          <h2 className="font-bold text-text-main text-lg flex items-center gap-2 border-b pb-4">
            <Settings2 className="w-5 h-5 text-accent" />
            Tarification & Forfaits
          </h2>
          <div className="space-y-4">
            {packs.map((pack) => (
              <div key={pack.id} className="p-4 bg-neutral/50 border rounded-xl relative overflow-hidden flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-text-main flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {pack.name}</span>
                  <span className="font-black text-accent text-sm">{pack.price} / {pack.duration}</span>
                </div>
                <p className="text-[11px] text-text-muted font-medium mt-1">Souscripteurs actifs : <strong className="text-text-main">{pack.active_subscriptions}</strong></p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {pack.features.map((f, idx) => (
                    <span key={idx} className="bg-white border border-gray-100 text-[9px] text-text-muted px-2 py-0.5 rounded font-semibold">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active VIP listing (3/5 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="font-bold text-text-main text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
              Historique des souscriptions VIP actives
            </h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-[460px] overflow-y-auto">
            {activeVips.map((vip) => (
              <div key={vip.id} className="p-4 hover:bg-neutral/30 transition-colors flex justify-between items-center gap-4">
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-text-main truncate">{vip.ad_title}</h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted mt-1 font-semibold">
                    <span className="text-accent flex items-center gap-1 font-bold"><CreditCard className="w-3.5 h-3.5" /> {vip.plan_name} ({vip.amount})</span>
                    <span>•</span>
                    <span className="text-text-main">{vip.user_name}</span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-1.5 flex items-center gap-1 font-semibold"><Calendar className="w-3.5 h-3.5 text-gray-400" /> Du {vip.start_date} au {vip.end_date}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold border border-green-100"><ShieldCheck className="w-3.5 h-3.5" /> Actif</span>
                  <button onClick={() => alert(`Email envoyé à ${vip.user_email}`)} className="p-2 hover:bg-neutral rounded-xl text-gray-500 transition-all" title="Contacter l'abonné">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}