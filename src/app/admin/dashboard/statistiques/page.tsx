'use client'

import { 
  BarChart3, TrendingUp, TrendingDown, Users, Eye, FileText, 
  DollarSign, Activity, Calendar, Download, Sparkles
} from 'lucide-react'

const statKPIs = [
  { label: 'Visiteurs uniques', value: '45,210', change: '+18.4%', up: true, desc: 'Ce mois-ci' },
  { label: 'Nouvelles inscriptions', value: '1,284', change: '+24.1%', up: true, desc: 'Cette semaine' },
  { label: 'Taux de clics (CTR)', value: '14.2%', change: '-2.3%', up: false, desc: 'Sur les bannières publicitaires' },
  { label: 'Valeur transactions estimée', value: '12.4M FDJ', change: '+15.6%', up: true, desc: 'Valeur marchande négociée' },
]

const categoryShares = [
  { category: 'Véhicules', count: '5,342', percentage: 35, color: 'bg-primary' },
  { category: 'Électronique', count: '3,812', percentage: 25, color: 'bg-accent' },
  { category: 'Immobilier', count: '2,284', percentage: 15, color: 'bg-secondary' },
  { category: 'Maison & Déco', count: '1,824', percentage: 12, color: 'bg-amber-500' },
  { category: 'Services & Bricolage', count: '1,210', percentage: 8, color: 'bg-green-500' },
  { category: 'Emplois & CV', count: '762', percentage: 5, color: 'bg-purple-500' },
]

const areaDistribution = [
  { location: 'Djibouti-ville', ads: '8,410', percentage: 55 },
  { location: 'Balbala', ads: '3,820', percentage: 25 },
  { location: 'Boulevard', ads: '1,530', percentage: 10 },
  { location: 'Haramous', ads: '918', percentage: 6 },
  { location: 'Ambouli', ads: '556', percentage: 4 },
]

export default function AdminStatistiques() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-main flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-accent" />
            Statistiques & Rapports
          </h1>
          <p className="text-text-muted mt-1">Consultez l'évolution de l'audience, la répartition des annonces et les indicateurs clés de WAYCAN.</p>
        </div>
        <button onClick={() => alert('Rapport exporté !')} className="py-2.5 px-4 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/10 transition-colors">
          <Download className="w-4 h-4" />
          Exporter Excel/PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
            <p className="text-text-muted text-xs font-bold uppercase tracking-wider">{kpi.label}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-text-main">{kpi.value}</span>
              <span className={`flex items-center text-xs font-extrabold ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.up ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                {kpi.change}
              </span>
            </div>
            <p className="text-[10px] text-text-muted mt-1.5 font-medium">{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Category Breakdown (3/5 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="font-bold text-text-main text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent animate-pulse" />
              Répartition des annonces par catégorie
            </h2>
            <span className="text-xs font-bold text-text-muted bg-neutral px-2.5 py-1 border rounded-lg">Ce mois-ci</span>
          </div>

          <div className="space-y-4">
            {categoryShares.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-text-main">{cat.category}</span>
                  <span className="text-text-muted">{cat.count} annonces ({cat.percentage}%)</span>
                </div>
                <div className="h-3 bg-neutral rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full transition-all duration-1000`} style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Breakdown (2/5 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="font-bold text-text-main text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Distribution par Localisation
            </h2>
          </div>

          <div className="space-y-4">
            {areaDistribution.map((area, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-text-main">{area.location}</span>
                  <span className="text-text-muted">{area.ads} ({area.percentage}%)</span>
                </div>
                <div className="h-2 bg-neutral rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${area.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 text-[11px] text-blue-800 leading-relaxed">
            ⚡ <strong>Info :</strong> Djibouti-ville et Balbala représentent à elles seules plus de 80% de l'activité commerciale globale sur le site.
          </div>
        </div>
      </div>
    </div>
  )
}
