'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, Users, FileText, MessageCircle, BarChart3, Settings, 
  Shield, TrendingUp, Eye, DollarSign, AlertTriangle, CheckCircle, 
  XCircle, MoreVertical, Trash2, Edit, Eye as ViewEye,
  RefreshCw, Download, Bell, LogOut, Menu, X, ShieldCheck,
  Megaphone, Image, Globe, ExternalLink, Calendar, CreditCard,
  BarChart, TrendingDown, Plus, X as CloseIcon, Save, EyeOff,
  CheckSquare, Square, Radio, Link as LinkIcon, Smartphone, Monitor, Mail
} from 'lucide-react'

const adminNav = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: false },
  { icon: FileText, label: 'Annonces', href: '/admin/dashboard/annonces', active: false },
  { icon: Users, label: 'Utilisateurs', href: '/admin/dashboard/utilisateurs', active: false },
  { icon: MessageCircle, label: 'Messages', href: '/admin/dashboard/messages', active: false },
  { icon: BarChart3, label: 'Statistiques', href: '/admin/dashboard/statistiques', active: false },
  { icon: DollarSign, label: 'Abonnements', href: '/admin/dashboard/abonnements', active: false },
  { icon: Shield, label: 'Modération', href: '/admin/dashboard/moderation', active: false },
  { icon: Settings, label: 'Paramètres', href: '/admin/dashboard/settings', active: false },
]

interface PublicityCampaign {
  id: number
  name: string
  type: 'banner' | 'sidebar' | 'popup' | 'sponsorise' | 'newsletter' | 'sms'
  status: 'active' | 'paused' | 'expired'
  startDate: string
  endDate: string
  budget: number
  impressions: number
  clicks: number
  ctr: number
  client: string
  image?: string
  placement: string
}

const campaigns: PublicityCampaign[] = [
  { id: 1, name: 'Promotion Toyota Djibouti', type: 'banner', status: 'active', startDate: '2026-05-01', endDate: '2026-06-01', budget: 50000, impressions: 45000, clicks: 1250, ctr: 2.78, client: 'Toyota Djibouti', placement: 'Haut de page' },
  { id: 2, name: 'Pub Immobilier Premium', type: 'sidebar', status: 'active', startDate: '2026-05-10', endDate: '2026-05-25', budget: 25000, impressions: 28000, clicks: 560, ctr: 2.0, client: 'Agence Immobilière DJ', placement: 'Barre latérale' },
  { id: 3, name: 'Offre Eid - Électronique', type: 'popup', status: 'expired', startDate: '2026-04-20', endDate: '2026-04-30', budget: 35000, impressions: 62000, clicks: 3100, ctr: 5.0, client: 'TechnoShop DJ', placement: 'Popup centre' },
  { id: 4, name: 'Newsletter Mai', type: 'newsletter', status: 'active', startDate: '2026-05-15', endDate: '2026-05-22', budget: 15000, impressions: 15000, clicks: 2250, ctr: 15.0, client: 'Divers', placement: 'Email' },
  { id: 5, name: 'SMS Promotion Ramadan', type: 'sms', status: 'paused', startDate: '2026-05-01', endDate: '2026-05-15', budget: 20000, impressions: 10000, clicks: 800, ctr: 8.0, client: 'Marina Bay', placement: 'SMS Marketing' },
]

const adPlacements = [
  { id: 'hero', name: 'Bannière Héros (Hero)', locations: ['Homepage'], sizes: ['728x90', '1200x200'], price: 15000, description: 'Bannière en haut de la page d\'accueil' },
  { id: 'sidebar_top', name: 'Barre latérale haute', locations: ['Toutes pages'], sizes: ['300x250'], price: 8000, description: 'Publicité dans la barre latérale' },
  { id: 'sidebar_bottom', name: 'Barre latérale basse', locations: ['Toutes pages'], sizes: ['300x600'], price: 10000, description: 'Publicité grand format latéral' },
  { id: 'between_ads', name: 'Entre les annonces', locations: ['Page annonces'], sizes: ['600x300'], price: 6000, description: 'Publicité插入entre les annonces' },
  { id: 'popup_exit', name: 'Popup sortie', locations: ['Toutes pages'], sizes: ['Modal'], price: 12000, description: 'Popup lorsque l\'utilisateur quitte' },
  { id: 'newsletter_banner', name: 'Bannière Newsletter', locations: ['Emails'], sizes: ['600x100'], price: 5000, description: 'Bannière dans les emails' },
]

const stats = [
  { label: 'Campagnes actives', value: '12', change: '+3', icon: Megaphone, color: 'bg-success' },
  { label: 'Revenus pub ce mois', value: '425,000 FDJ', change: '+18%', icon: DollarSign, color: 'bg-accent' },
  { label: 'Impressions totales', value: '1.2M', change: '+25%', icon: Eye, color: 'bg-secondary' },
  { label: 'CTR moyen', value: '3.2%', change: '+0.5%', icon: TrendingUp, color: 'bg-primary' },
]

export default function PublicitePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('campaigns')
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    client: '',
    type: 'banner',
    placement: '',
    startDate: '',
    endDate: '',
    budget: '',
    imageUrl: '',
    linkUrl: ''
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">Active</span>
      case 'paused': return <span className="px-2 py-1 bg-premium-gold/10 text-amber-700 rounded-full text-xs font-medium">En pause</span>
      case 'expired': return <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">Expirée</span>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'banner': return <Image className="w-5 h-5" />
      case 'sidebar': return <Monitor className="w-5 h-5" />
      case 'popup': return <Radio className="w-5 h-5" />
      case 'newsletter': return <Mail className="w-5 h-5" />
      case 'sms': return <Smartphone className="w-5 h-5" />
      default: return <Globe className="w-5 h-5" />
    }
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
            <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
              <Megaphone className="w-7 h-7 text-accent" />
              Gestion de la Publicité
            </h1>
            <p className="text-text-muted">Gérez les campagnes publicitaires et les emplacements</p>
          </div>

          <button 
            onClick={() => setShowNewCampaign(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-orange-600"
          >
            <Plus className="w-5 h-5" />
            Nouvelle campagne
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
              onClick={() => setActiveTab('campaigns')}
              className={`px-6 py-4 font-medium transition-colors ${activeTab === 'campaigns' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              <Megaphone className="w-5 h-5 inline-block mr-2" />
              Campagnes
            </button>
            <button
              onClick={() => setActiveTab('placements')}
              className={`px-6 py-4 font-medium transition-colors ${activeTab === 'placements' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              <LayoutDashboard className="w-5 h-5 inline-block mr-2" />
              Emplacements
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-4 font-medium transition-colors ${activeTab === 'stats' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              <BarChart className="w-5 h-5 inline-block mr-2" />
              Statistiques
            </button>
          </div>

          {activeTab === 'campaigns' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Campagne</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Client</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Période</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Budget</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Impressions</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Clics</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">CTR</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Statut</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-neutral/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                            {getTypeIcon(campaign.type)}
                          </div>
                          <span className="font-medium text-text-main">{campaign.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm capitalize text-text-muted">{campaign.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-main">{campaign.client}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted">
                        {campaign.startDate} - {campaign.endDate}
                      </td>
                      <td className="px-6 py-4 font-medium text-accent">
                        {campaign.budget.toLocaleString()} FDJ
                      </td>
                      <td className="px-6 py-4 text-sm text-text-main">
                        {campaign.impressions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-main">
                        {campaign.clicks.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${campaign.ctr >= 3 ? 'text-success' : campaign.ctr >= 1 ? 'text-premium-gold' : 'text-alert'}`}>
                          {campaign.ctr}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(campaign.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded" title="Voir">
                            <ViewEye className="w-4 h-4 text-text-muted" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded" title="Modifier">
                            <Edit className="w-4 h-4 text-text-muted" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded" title={campaign.status === 'active' ? 'Pause' : 'Activer'}>
                            {campaign.status === 'active' ? <EyeOff className="w-4 h-4 text-text-muted" /> : <Eye className="w-4 h-4 text-text-muted" />}
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded" title="Supprimer">
                            <Trash2 className="w-4 h-4 text-alert" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adPlacements.map((placement) => (
                  <div key={placement.id} className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-text-main">{placement.name}</h3>
                      <span className="text-accent font-bold">{placement.price.toLocaleString()} FDJ</span>
                    </div>
                    <p className="text-sm text-text-muted mb-4">{placement.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {placement.sizes.map((size) => (
                        <span key={size} className="px-2 py-1 bg-neutral rounded text-xs text-text-muted">
                          {size}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-text-muted">
                        {placement.locations.join(', ')}
                      </span>
                      <button className="text-primary hover:underline text-sm font-medium">
                        Commander →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral rounded-xl p-6">
                  <h3 className="font-semibold text-text-main mb-4">Performance par type de publicité</h3>
                  <div className="space-y-4">
                    {[
                      { type: 'Bannières', ctr: 2.8, impressions: 450000 },
                      { type: 'Popups', ctr: 5.2, impressions: 120000 },
                      { type: 'Newsletter', ctr: 15.0, impressions: 15000 },
                      { type: 'SMS', ctr: 8.0, impressions: 10000 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-text-main">{item.type}</span>
                          <span className="text-text-muted">{item.ctr}% CTR</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${Math.min(item.ctr * 10, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral rounded-xl p-6">
                  <h3 className="font-semibold text-text-main mb-4">Revenus par semaine</h3>
                  <div className="flex items-end gap-2 h-40">
                    {[65, 80, 45, 90, 75, 85, 95].map((height, i) => (
                      <div key={i} className="flex-1 bg-accent rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-text-muted mt-2">
                    <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showNewCampaign && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-main">Nouvelle campagne pub</h2>
                <button onClick={() => setShowNewCampaign(false)} className="p-2 hover:bg-gray-100 rounded">
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Nom de la campagne</label>
                  <input
                    type="text"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Ex: Promotion Été 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Client / Entreprise</label>
                  <input
                    type="text"
                    value={newCampaign.client}
                    onChange={(e) => setNewCampaign({...newCampaign, client: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Nom de l'entreprise"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Type de pub</label>
                    <select
                      value={newCampaign.type}
                      onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    >
                      <option value="banner">Bannière</option>
                      <option value="sidebar">Barre latérale</option>
                      <option value="popup">Popup</option>
                      <option value="newsletter">Newsletter</option>
                      <option value="sms">SMS</option>
                      <option value="sponsorise">Annonce sponsorisée</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Emplacement</label>
                    <select
                      value={newCampaign.placement}
                      onChange={(e) => setNewCampaign({...newCampaign, placement: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    >
                      {adPlacements.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Date de début</label>
                    <input
                      type="date"
                      value={newCampaign.startDate}
                      onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Date de fin</label>
                    <input
                      type="date"
                      value={newCampaign.endDate}
                      onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Budget (FDJ)</label>
                  <input
                    type="number"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">URL de l'image (optionnel)</label>
                  <input
                    type="url"
                    value={newCampaign.imageUrl}
                    onChange={(e) => setNewCampaign({...newCampaign, imageUrl: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Lien de destination</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={newCampaign.linkUrl}
                      onChange={(e) => setNewCampaign({...newCampaign, linkUrl: e.target.value})}
                      className="w-full pl-12 px-4 py-3 border rounded-lg"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <button
                  onClick={() => setShowNewCampaign(false)}
                  className="px-6 py-2 border rounded-lg text-text-muted hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Créer la campagne
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}