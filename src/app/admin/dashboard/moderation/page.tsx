'use client'

import { useState } from 'react'
import { 
  Shield, AlertTriangle, CheckCircle, Trash2, ShieldAlert, 
  MapPin, User, Eye, UserX, Info, ShieldCheck
} from 'lucide-react'

interface FlaggedAd {
  id: string | number
  title: string
  category: string
  location: string
  reporter: string
  reason: string
  severity: 'critical' | 'high' | 'medium'
  date: string
}

export default function AdminModeration() {
  const [reports, setReports] = useState<FlaggedAd[]>([
    { id: 1, title: 'iPhone 15 Pro Max scellé à 35,000 FDJ', category: 'electronique', location: 'balbala', reporter: 'Système anti-fraude', reason: 'Le prix de cet article est 80% plus bas que la moyenne du marché, suspect d\'arnaque à l\'acompte.', severity: 'critical', date: 'Il y a 1h' },
    { id: 2, title: 'Appartement F4 meublé luxe pas cher', category: 'immobilier', location: 'haramous', reporter: 'Utilisateur #7852', reason: 'Photos volées sur un site étranger. Le vendeur n\'est pas à Djibouti et demande un virement Western Union.', severity: 'critical', date: 'Il y a 3h' },
    { id: 3, title: 'Toyota Land Cruiser Prado 2018', category: 'vehicules', location: 'djibouti-ville', reporter: 'Utilisateur #1420', reason: 'Annonce en doublon. Déjà publiée plusieurs fois par le même vendeur sous différents comptes.', severity: 'medium', date: 'Il y a 5h' },
    { id: 4, title: 'Sèche-cheveux professionnel Dyson', category: 'maison', location: 'boulevard', reporter: 'Système automatique', reason: 'Mots clés suspects ou répétitifs détectés dans la description.', severity: 'medium', date: 'Il y a 1 jour' }
  ])

  const handleApprove = (id: string | number) => {
    // Keep ad, dismiss report
    setReports(prev => prev.filter(r => r.id !== id))
    alert("Signalement rejeté. L'annonce est maintenue en ligne.")
  }

  const handleDeleteAd = (id: string | number) => {
    if (!confirm("Voulez-vous supprimer définitivement cette annonce signalée ?")) return
    setReports(prev => prev.filter(r => r.id !== id))
    alert("Annonce supprimée avec succès.")
  }

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return <span className="text-[10px] bg-red-100 text-red-700 font-extrabold px-2 py-0.5 rounded-full uppercase border border-red-200">Critique</span>
      case 'high':
        return <span className="text-[10px] bg-orange-100 text-orange-700 font-extrabold px-2 py-0.5 rounded-full uppercase border border-orange-200">Élevée</span>
      case 'medium':
        return <span className="text-[10px] bg-yellow-100 text-yellow-700 font-extrabold px-2 py-0.5 rounded-full uppercase border border-yellow-200">Moyenne</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-text-main flex items-center gap-2">
          <Shield className="w-8 h-8 text-red-500" />
          Centre de Modération & Sécurité
        </h1>
        <p className="text-text-muted mt-1">Traitez les rapports de la communauté et les détections automatiques du système anti-fraude de WAYCAN.</p>
      </div>

      {/* Warning Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 text-amber-800 text-xs shadow-sm">
        <Info className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
        <div>
          <p className="font-bold mb-1">Règles de modération recommandées :</p>
          <ul className="list-disc pl-4 space-y-1 opacity-90 font-medium">
            <li>Toute annonce demandant un paiement ou acompte anticipé (Waafi, Western Union) sans voir l'article doit être instantanément supprimée.</li>
            <li>Les utilisateurs signalés plus de 3 fois de manière fondée doivent avoir leur compte suspendu dans l'onglet <strong>Utilisateurs</strong>.</li>
          </ul>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-12 text-center text-gray-400 flex flex-col items-center justify-center min-h-[300px]">
            <ShieldCheck className="w-12 h-12 stroke-[1.5] text-green-500 mb-2" />
            <p className="font-bold text-sm text-text-main">Aucune annonce en attente de modération</p>
            <p className="text-xs text-text-muted mt-1">Excellent travail ! Tous les signalements ont été traités.</p>
          </div>
        ) : (
          reports.map((rep) => (
            <div key={rep.id} className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 space-y-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[10px] bg-primary/5 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{rep.category}</span>
                  {getSeverityBadge(rep.severity)}
                </div>
                
                <h3 className="font-bold text-base text-text-main leading-snug">{rep.title}</h3>
                
                <div className="flex gap-4 text-[10px] text-text-muted font-semibold">
                  <span className="flex items-center gap-0.5"><MapPin className="w-3.5 h-3.5" /> {rep.location}</span>
                  <span>•</span>
                  <span>{rep.date}</span>
                </div>

                <div className="bg-red-50/50 border border-red-100 rounded-xl p-3.5 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-red-700 font-extrabold">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Signalement : {rep.reporter}</span>
                  </div>
                  <p className="text-red-700 font-semibold leading-relaxed mt-1">{rep.reason}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100 mt-4">
                <button 
                  onClick={() => handleApprove(rep.id)}
                  className="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-green-600/10 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Garder l'annonce
                </button>
                <button 
                  onClick={() => handleDeleteAd(rep.id)}
                  className="px-3.5 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
