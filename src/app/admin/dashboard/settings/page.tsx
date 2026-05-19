'use client'

import { useState } from 'react'
import { 
  Settings, Save, ShieldAlert, ToggleLeft, ToggleRight, 
  Database, RefreshCw, KeyRound, Globe, HelpCircle
} from 'lucide-react'

export default function AdminSettings() {
  const [formData, setFormData] = useState({
    siteName: 'WAYCAN Marketplace',
    siteEmail: 'support@waycan.dj',
    vipPriceDay: '350',
    minAdDescriptionLength: '50',
    maintenanceMode: false,
    autoModerateNewAds: false,
    maxImagesPerAd: '10'
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      alert("Paramètres système sauvegardés avec succès !")
    }, 1000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-text-main flex items-center gap-2">
          <Settings className="w-8 h-8 text-primary" />
          Paramètres du système
        </h1>
        <p className="text-text-muted mt-1">Configurez les variables globales de l'application, les seuils de modération et la maintenance du serveur.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left/Middle: Settings forms (2/3 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General settings */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-text-main text-base border-b pb-2 flex items-center gap-2">
              <Globe className="w-4.5 h-4.5 text-accent" />
              Configurations Générales
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-muted mb-2">Nom de la Plateforme</label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-2">Email Support & Contact</label>
                <input
                  type="email"
                  value={formData.siteEmail}
                  onChange={(e) => setFormData({ ...formData, siteEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-2">Tarif Journalier VIP (FDJ)</label>
                <input
                  type="number"
                  value={formData.vipPriceDay}
                  onChange={(e) => setFormData({ ...formData, vipPriceDay: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-2">Nombre Max de Photos par Annonce</label>
                <input
                  type="number"
                  value={formData.maxImagesPerAd}
                  onChange={(e) => setFormData({ ...formData, maxImagesPerAd: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Moderation Rules */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-text-main text-base border-b pb-2 flex items-center gap-2">
              <ShieldAlert className="w-4.5 h-4.5 text-accent" />
              Règles Anti-Fraude & Publications
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted mb-2">Longueur minimale description (caractères)</label>
                <input
                  type="number"
                  value={formData.minAdDescriptionLength}
                  onChange={(e) => setFormData({ ...formData, minAdDescriptionLength: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent max-w-xs"
                  required
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <h4 className="text-xs font-bold text-text-main">Modération automatique</h4>
                  <p className="text-[10px] text-text-muted">Les nouvelles annonces sont bloquées jusqu'à approbation manuelle de l'admin.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setFormData({ ...formData, autoModerateNewAds: !formData.autoModerateNewAds })}
                  className="focus:outline-none text-accent"
                >
                  {formData.autoModerateNewAds ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-gray-300" />}
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-xs font-bold text-text-main">Mode maintenance</h4>
                  <p className="text-[10px] text-text-muted font-semibold text-red-500">Mettre le site public hors-ligne pour maintenance.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setFormData({ ...formData, maintenanceMode: !formData.maintenanceMode })}
                  className="focus:outline-none text-accent"
                >
                  {formData.maintenanceMode ? <ToggleRight className="w-10 h-10 text-red-500" /> : <ToggleLeft className="w-10 h-10 text-gray-300" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar: Actions & details (1/3 cols) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-text-main text-base border-b pb-2 flex items-center gap-2">
              <Database className="w-4.5 h-4.5 text-accent" />
              Base de Données
            </h2>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted">Version Supabase :</span>
                <span className="font-bold text-text-main">v2.43.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Statut Connexion :</span>
                <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">Connecté</span>
              </div>
            </div>

            <button type="button" onClick={() => alert('Cache système vidé avec succès !')} className="w-full py-2.5 bg-neutral hover:bg-gray-100 text-text-main border border-gray-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              <RefreshCw className="w-3.5 h-3.5" />
              Vider le cache système
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 space-y-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/10 transition-colors disabled:opacity-50"
            >
              <Save className="w-4.5 h-4.5" />
              {saving ? 'Enregistrement...' : 'Sauvegarder les modifications'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}