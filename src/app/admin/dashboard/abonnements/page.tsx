'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, Users, FileText, MessageCircle, BarChart3, Settings, 
  Shield, TrendingUp, Eye, DollarSign, AlertTriangle, CheckCircle, 
  XCircle, Search, Filter, MoreVertical, Trash2, Edit, Eye as ViewEye,
  RefreshCw, Download, Bell, LogOut, ChevronLeft, Menu, X, ShieldCheck,
  Phone, Mail, MapPin, Clock, Star, ToggleLeft, ToggleRight, Plus,
  CreditCard, Wallet, CheckSquare, Square, Save, X as CloseIcon,
  Package, CreditCard as CardIcon, History, UserPlus, TrendingDown,
  Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react'

const adminNav = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: false },
  { icon: FileText, label: 'Annonces', href: '/admin/dashboard/annonces', active: false },
  { icon: Users, label: 'Utilisateurs', href: '/admin/dashboard/utilisateurs', active: false },
  { icon: MessageCircle, label: 'Messages', href: '/admin/dashboard/messages', active: false },
  { icon: BarChart3, label: 'Statistiques', href: '/admin/dashboard/statistiques', active: false },
  { icon: DollarSign, label: 'Abonnements', href: '/admin/dashboard/abonnements', active: true },
  { icon: Shield, label: 'Modération', href: '/admin/dashboard/moderation', active: false },
  { icon: Settings, label: 'Paramètres', href: '/admin/dashboard/settings', active: false },
]

const initialPacks = [
  {
    id: 1,
    name: 'Basic',
    price: 2900,
    period: 'semaine',
    description: 'Pour une visibilité rapide',
    features: ['Annonce en tête de liste', 'Badge Premium visible', '7 jours de visibilité boostée'],
    popular: false,
    active: true,
    color: '#0A2463'
  },
  {
    id: 2,
    name: 'Pro',
    price: 4500,
    period: 'semaine',
    description: 'Le plus populaire',
    features: ['Position prioritaire', 'Badge Premium + couleur', '30 jours de visibilité', 'Partage réseaux sociaux'],
    popular: true,
    active: true,
    color: '#FF6B35'
  },
  {
    id: 3,
    name: 'Business',
    price: 7500,
    period: 'semaine',
    description: 'Pour les professionnels',
    features: ['Boutique dédiée', '10 annonces premium', 'Analytics dashboard', 'Support prioritaire WhatsApp'],
    popular: false,
    active: true,
    color: '#06D6A0'
  }
]

const activeSubscriptions = [
  { id: 1, user: 'Mohamed Ali', pack: 'Pro', startDate: '2026-05-15', endDate: '2026-06-15', amount: 4500, status: 'active', autoRenew: true },
  { id: 2, user: 'Fatou Ahmed', pack: 'Business', startDate: '2026-05-10', endDate: '2026-06-10', amount: 7500, status: 'active', autoRenew: false },
  { id: 3, user: 'Youssef Ibrahim', pack: 'Basic', startDate: '2026-05-18', endDate: '2026-05-25', amount: 2900, status: 'expiring', autoRenew: false },
  { id: 4, user: 'Aminata Djama', pack: 'Pro', startDate: '2026-05-01', endDate: '2026-06-01', amount: 4500, status: 'active', autoRenew: true },
  { id: 5, user: 'Mahamoud Said', pack: 'Business', startDate: '2026-04-20', endDate: '2026-05-20', amount: 7500, status: 'active', autoRenew: true },
]

const paymentHistory = [
  { id: 1, user: 'Mohamed Ali', pack: 'Pro', amount: 4500, date: '2026-05-15', method: 'WhatsApp', status: 'completed', phone: '+253 77 12 34 56' },
  { id: 2, user: 'Fatou Ahmed', pack: 'Business', amount: 7500, date: '2026-05-10', method: 'WhatsApp', status: 'completed', phone: '+253 77 23 45 67' },
  { id: 3, user: 'Aminata Djama', pack: 'Pro', amount: 4500, date: '2026-05-01', method: 'Espèces', status: 'completed', phone: '-' },
  { id: 4, user: 'Mahamoud Said', pack: 'Business', amount: 7500, date: '2026-04-20', method: 'WhatsApp', status: 'completed', phone: '+253 77 34 56 78' },
  { id: 5, user: 'Ali Mohamed', pack: 'Basic', amount: 2900, date: '2026-05-18', method: 'WhatsApp', status: 'pending', phone: '+253 77 45 67 89' },
]

const statsCards = [
  { label: 'Abonnés actifs', value: '156', change: '+12%', icon: UserPlus, color: 'bg-success' },
  { label: 'Revenus mois', value: '284,500 FDJ', change: '+23%', icon: DollarSign, color: 'bg-accent' },
  { label: 'Renouvellements', value: '89%', change: '+5%', icon: RefreshCw, color: 'bg-secondary' },
  { label: 'Taux conversion', value: '8.2%', change: '-2%', icon: TrendingDown, color: 'bg-alert' },
]

export default function AbonnementsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [packs, setPacks] = useState(initialPacks)
  const [editingPack, setEditingPack] = useState<typeof initialPacks[0] | null>(null)
  const [showPaymentSettings, setShowPaymentSettings] = useState(false)
  const [activeTab, setActiveTab] = useState('packs')

const [paymentSettings, setPaymentSettings] = useState({
    whatsappEnabled: true,
    whatsappNumber: '+253 77 17 97 55',
    cashEnabled: true,
    bankTransferEnabled: false,
    bankName: '',
    accountNumber: '',
    autoRenew: true,
    gracePeriod: 3
  })

  const handleSavePack = () => {
    if (editingPack) {
      setPacks(packs.map(p => p.id === editingPack.id ? editingPack : p))
      setEditingPack(null)
    }
  }

  const handleTogglePack = (id: number) => {
    setPacks(packs.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  return (
    <div className="min-h-screen bg-neutral flex">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-primary text-white transition-all duration-300 fixed lg:relative z-30 h-screen`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">W</span>
              </div>
              <span className="font-bold text-xl">WAYCAN</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {adminNav.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white/70">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Déconnexion</span>}
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Gestion des Abonnements</h1>
            <p className="text-text-muted">Gérez vos packs Premium et les paiements</p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowPaymentSettings(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <CreditCard className="w-5 h-5" />
              <span className="hidden sm:inline">Paramètres paiement</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nouveau pack</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-surface rounded-xl p-6 border">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-success' : 'text-alert'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-text-main">{stat.value}</p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface rounded-xl border mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('packs')}
              className={`px-6 py-4 font-medium transition-colors ${activeTab === 'packs' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              <Package className="w-5 h-5 inline-block mr-2" />
              Packs Premium
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`px-6 py-4 font-medium transition-colors ${activeTab === 'subscriptions' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              <Users className="w-5 h-5 inline-block mr-2" />
              Abonnés actifs
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-4 font-medium transition-colors ${activeTab === 'payments' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              <History className="w-5 h-5 inline-block mr-2" />
              Historique paiements
            </button>
          </div>

          {activeTab === 'packs' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packs.map((pack) => (
                  <div
                    key={pack.id}
                    className={`border-2 rounded-2xl p-6 transition-all ${pack.popular ? 'border-accent shadow-lg' : 'border-gray-200 hover:border-gray-300'} ${!pack.active ? 'opacity-60 grayscale' : ''}`}
                  >
                    {pack.popular && (
                      <div className="text-center -mt-8 mb-4">
                        <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                          <Star className="w-4 h-4 inline mr-1" />
                          Plus populaire
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-text-main">{pack.name}</h3>
                      <button
                        onClick={() => handleTogglePack(pack.id)}
                        className={`p-2 rounded-lg ${pack.active ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'}`}
                        title={pack.active ? 'Désactiver' : 'Activer'}
                      >
                        {pack.active ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="mb-4">
                      <span className="text-3xl font-extrabold text-accent">{pack.price.toLocaleString()}</span>
                      <span className="text-text-muted"> FDJ/{pack.period}</span>
                    </div>

                    <p className="text-text-muted text-sm mb-4">{pack.description}</p>

                    <ul className="space-y-2 mb-6">
                      {pack.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingPack(pack)}
                        className="flex-1 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Utilisateur</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Pack</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Début</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Fin</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Montant</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Statut</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Renouvel.</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {activeSubscriptions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-neutral/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                            {sub.user.charAt(0)}
                          </div>
                          <span className="font-medium text-text-main">{sub.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sub.pack === 'Business' ? 'bg-success/10 text-success' :
                          sub.pack === 'Pro' ? 'bg-accent/10 text-accent' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {sub.pack}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {sub.startDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {sub.endDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-text-main">{sub.amount.toLocaleString()} FDJ</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 text-sm ${
                          sub.status === 'active' ? 'text-success' : 'text-alert'
                        }`}>
                          {sub.status === 'active' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                          {sub.status === 'active' ? 'Actif' : 'Expire bientôt'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {sub.autoRenew ? (
                          <span className="text-success text-sm flex items-center gap-1">
                            <RefreshCw className="w-4 h-4" />
                            Auto
                          </span>
                        ) : (
                          <span className="text-text-muted text-sm">Manuel</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded" title="Voir détails">
                            <ViewEye className="w-4 h-4 text-text-muted" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded" title="Renouveler">
                            <RefreshCw className="w-4 h-4 text-text-muted" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded" title="Annuler">
                            <XCircle className="w-4 h-4 text-alert" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Utilisateur</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Pack</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Montant</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Méthode</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Téléphone</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Statut</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="hover:bg-neutral/50">
                      <td className="px-6 py-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {payment.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-text-main">{payment.user}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{payment.pack}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-accent">{payment.amount.toLocaleString()} FDJ</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 text-sm ${
                          payment.method === 'WhatsApp' ? 'text-success' : 'text-text-muted'
                        }`}>
                          {payment.method === 'WhatsApp' ? <Phone className="w-4 h-4" /> : <Wallet className="w-4 h-4" />}
                          {payment.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted">{payment.phone}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'completed' ? 'bg-success/10 text-success' : 'bg-premium-gold/10 text-amber-700'
                        }`}>
                          {payment.status === 'completed' ? 'Validé' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {payment.status === 'pending' && (
                            <>
                              <button className="px-3 py-1 bg-success text-white text-xs rounded hover:bg-green-600">
                                Valider
                              </button>
                              <button className="px-3 py-1 border border-alert text-alert text-xs rounded hover:bg-red-50">
                                Refuser
                              </button>
                            </>
                          )}
                          <button className="p-2 hover:bg-gray-100 rounded" title="Reçu">
                            <CreditCard className="w-4 h-4 text-text-muted" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showPaymentSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-main">Paramètres de Paiement</h2>
                <button onClick={() => setShowPaymentSettings(false)} className="p-2 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-success/10 to-transparent p-4 rounded-xl border border-success/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-6 h-6 text-success" />
                    <h3 className="font-semibold text-text-main">Paiement via WhatsApp</h3>
                  </div>
                  <p className="text-sm text-text-muted">
                    Les utilisateurs peuvent payer via WhatsApp en vous envoyant un message avec leur preuve de paiement.
                  </p>
                </div>

                <div>
                  <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-medium text-text-main">Activer WhatsApp</p>
                        <p className="text-sm text-text-muted">Accepter les paiements via WhatsApp</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPaymentSettings({...paymentSettings, whatsappEnabled: !paymentSettings.whatsappEnabled})}
                      className="text-primary"
                    >
                      {paymentSettings.whatsappEnabled ? 
                        <ToggleRight className="w-8 h-8" /> : 
                        <ToggleLeft className="w-8 h-8 text-gray-300" />
                      }
                    </button>
                  </label>
                </div>

                {paymentSettings.whatsappEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Numéro WhatsApp Business</label>
                    <input
                      type="tel"
                      value={paymentSettings.whatsappNumber}
                      onChange={(e) => setPaymentSettings({...paymentSettings, whatsappNumber: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="+253 77 17 97 55"
                    />
                    <p className="text-xs text-text-muted mt-1">Les clients enverront leur paiement à ce numéro</p>
                  </div>
                )}

                <div>
                  <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-medium text-text-main">Paiement en espèces</p>
                        <p className="text-sm text-text-muted">Paiement directement en main propre</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPaymentSettings({...paymentSettings, cashEnabled: !paymentSettings.cashEnabled})}
                      className="text-primary"
                    >
                      {paymentSettings.cashEnabled ? 
                        <ToggleRight className="w-8 h-8" /> : 
                        <ToggleLeft className="w-8 h-8 text-gray-300" />
                      }
                    </button>
                  </label>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-text-main mb-4">Instructions de paiement WhatsApp</h3>
                  <div className="bg-neutral p-4 rounded-lg text-sm text-text-muted space-y-2">
                    <p className="font-medium text-text-main">Message à envoyer aux clients:</p>
                    <pre className="whitespace-pre-wrap font-mono text-xs">
{`Bonjour ! Je souhaite souscrire au pack [PACK_NAME].

Montant: [PRIX] FDJ
Durée: [PÉRIODE]

Veuillez effectuer le paiement via :
• Mobile Money (Sahal/D-Money)
• Virement bancaire

Une fois le paiement effectué, envoyez-moi une capture d'écran ici.

Merci de votre confiance ! 🙏`}
                    </pre>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Renouvellement auto</label>
                    <select
                      value={paymentSettings.autoRenew ? 'true' : 'false'}
                      onChange={(e) => setPaymentSettings({...paymentSettings, autoRenew: e.target.value === 'true'})}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="true">Activé</option>
                      <option value="false">Désactivé</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Délai de grâce (jours)</label>
                    <input
                      type="number"
                      value={paymentSettings.gracePeriod}
                      onChange={(e) => setPaymentSettings({...paymentSettings, gracePeriod: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border rounded-lg"
                      min={0}
                      max={30}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <button
                  onClick={() => setShowPaymentSettings(false)}
                  className="px-6 py-2 border rounded-lg text-text-muted hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}

        {editingPack && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-2xl w-full max-w-lg">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-main">Modifier le pack {editingPack.name}</h2>
                <button onClick={() => setEditingPack(null)} className="p-2 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Nom du pack</label>
                  <input
                    type="text"
                    value={editingPack.name}
                    onChange={(e) => setEditingPack({...editingPack, name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Prix (FDJ)</label>
                    <input
                      type="number"
                      value={editingPack.price}
                      onChange={(e) => setEditingPack({...editingPack, price: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Période</label>
                    <select
                      value={editingPack.period}
                      onChange={(e) => setEditingPack({...editingPack, period: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    >
                      <option value="jour">Jour</option>
                      <option value="semaine">Semaine</option>
                      <option value="mois">Mois</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Description</label>
                  <input
                    type="text"
                    value={editingPack.description}
                    onChange={(e) => setEditingPack({...editingPack, description: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Fonctionnalités (une par ligne)</label>
                  <textarea
                    value={editingPack.features.join('\n')}
                    onChange={(e) => setEditingPack({...editingPack, features: e.target.value.split('\n').filter(f => f.trim())})}
                    className="w-full px-4 py-3 border rounded-lg min-h-[120px]"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPack.popular}
                      onChange={(e) => setEditingPack({...editingPack, popular: e.target.checked})}
                      className="w-5 h-5 text-accent rounded"
                    />
                    <span className="font-medium">Pack populaire</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPack.active}
                      onChange={(e) => setEditingPack({...editingPack, active: e.target.checked})}
                      className="w-5 h-5 text-primary rounded"
                    />
                    <span className="font-medium">Pack actif</span>
                  </label>
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <button
                  onClick={() => setEditingPack(null)}
                  className="px-6 py-2 border rounded-lg text-text-muted hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSavePack}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}