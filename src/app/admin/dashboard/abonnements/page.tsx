'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  DollarSign, Star, Calendar, CreditCard, ChevronRight, CheckCircle, 
  Settings2, Activity, ArrowUpRight, ShieldCheck, Mail, Search,
  Filter, Check, X, AlertTriangle, Loader2, ShieldAlert, Eye, 
  HelpCircle, Info, Phone, AlertCircle
} from 'lucide-react'

interface Payment {
  id: string | number
  created_at: string
  approved_at?: string | null
  user_id: string | null
  ad_id: string | null
  plan_name: 'Free' | 'Silver' | 'Gold' | 'VIP'
  amount: number
  sender_number: string
  transaction_id: string
  screenshot_url: string
  status: 'pending' | 'approved' | 'rejected' | 'suspicious' | 'fraud'
  payment_code: string
  fraud_score: number
  rejection_reason?: string | null
  ads?: {
    id: string
    title: string
    price: number | null
  } | null
}

interface PremiumPack {
  id: string | number
  name: string
  price: string
  duration: string
  features: string[]
  active_subscriptions: number
}

const defaultMockPayments: Payment[] = [
  {
    id: 'pay-1',
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    user_id: 'user-dileita',
    ad_id: 'ad-toyota',
    plan_name: 'VIP',
    amount: 5000,
    sender_number: '77849204',
    transaction_id: 'WF-83294829',
    screenshot_url: '/waafi.jpg.png',
    status: 'pending',
    payment_code: 'WF-83294829',
    fraud_score: 0,
    ads: {
      id: 'ad-toyota',
      title: 'Toyota Land Cruiser V8 2022 Excellent État',
      price: 14500000
    }
  },
  {
    id: 'pay-2',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    user_id: 'user-kamil',
    ad_id: 'ad-appart',
    plan_name: 'Gold',
    amount: 4500,
    sender_number: '99203849', // Short format (raises fraud score)
    transaction_id: 'WF-29384920',
    screenshot_url: '/waafi-logo.png.png',
    status: 'suspicious',
    payment_code: 'WF-29384920',
    fraud_score: 50,
    ads: {
      id: 'ad-appart',
      title: 'Appartement F4 à louer Haramous',
      price: 180000
    }
  },
  {
    id: 'pay-3',
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    user_id: 'user-fathia',
    ad_id: 'ad-iphone',
    plan_name: 'Silver',
    amount: 2500,
    sender_number: '77920482',
    transaction_id: 'WF-83294829', // Duplicate Transaction ID!
    screenshot_url: '/waafi.jpg.png',
    status: 'fraud',
    payment_code: 'WF-47291048',
    fraud_score: 100,
    ads: {
      id: 'ad-iphone',
      title: 'iPhone 15 Pro Max Neuf',
      price: 240000
    }
  },
  {
    id: 'pay-4',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    approved_at: new Date(Date.now() - 23 * 3600 * 1000).toISOString(),
    user_id: 'user-dileita-2',
    ad_id: 'ad-studio',
    plan_name: 'Gold',
    amount: 4500,
    sender_number: '77820491',
    transaction_id: 'WF-92840294',
    screenshot_url: '/waafi.jpg.png',
    status: 'approved',
    payment_code: 'WF-92840294',
    fraud_score: 0,
    ads: {
      id: 'ad-studio',
      title: 'Studio Meublé Balbala',
      price: 75000
    }
  },
  {
    id: 'pay-5',
    created_at: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    user_id: 'user-gouled',
    ad_id: 'ad-villa',
    plan_name: 'VIP',
    amount: 5000,
    sender_number: '77819203',
    transaction_id: 'WF-10294829',
    screenshot_url: '/waafi.jpg.png',
    status: 'rejected',
    payment_code: 'WF-10294829',
    fraud_score: 10,
    rejection_reason: "Reçu de transfert illisible. Veuillez renvoyer une capture d'écran claire de votre message de confirmation Waafi.",
    ads: {
      id: 'ad-villa',
      title: 'Villa de Luxe 5 chambres Haramous',
      price: 45000000
    }
  }
]

export default function AdminAbonnements() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'suspicious' | 'fraud' | 'approved' | 'rejected'>('all')
  
  // Custom alerts/toasts
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)
  
  // Rejection modal
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [currentPaymentToReject, setCurrentPaymentToReject] = useState<Payment | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [quickReason, setQuickReason] = useState('')

  // Receipt visual Lightbox
  const [selectedReceiptUrl, setSelectedReceiptUrl] = useState<string | null>(null)

  const [packs] = useState<PremiumPack[]>([
    { id: 1, name: 'Silver Boost', price: '2,500 FDJ', duration: '7 jours', features: ['Ruban Silver accrocheur', 'Mise en avant moyenne', 'Partage réseaux'], active_subscriptions: 218 },
    { id: 2, name: 'Gold Booster', price: '4,500 FDJ', duration: '15 jours', features: ['En haut de liste', 'Ruban jaune accrocheur', 'Notifications acheteurs'], active_subscriptions: 145 },
    { id: 3, name: 'VIP Plan', price: '5,000 FDJ', duration: '30 jours', features: ['Tous les privilèges VIP', 'Mise en avant prioritaire', 'Assistance premium 24h'], active_subscriptions: 82 }
  ])

  // Fetch payments from Supabase
  const fetchPayments = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          ads:ad_id (
            id,
            title,
            price
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        // Table not created yet or database connection down
        if (error.message?.includes('does not exist')) {
          console.warn("Supabase payments table doesn't exist yet. Running in simulation mode.")
        } else {
          throw error
        }
        setIsLive(false)
        setPayments(defaultMockPayments)
      } else if (data) {
        setPayments(data)
        setIsLive(true)
      }
    } catch (err: any) {
      console.error("Error loading payments:", err)
      setIsLive(false)
      setPayments(defaultMockPayments)
      setAlert({ type: 'error', message: `Erreur Supabase: ${err.message}. Passage en mode démonstration.` })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  // Auto-dismiss alert after 5s
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [alert])

  // Apply quick reasons to text input
  useEffect(() => {
    if (quickReason) {
      setRejectionReason(quickReason)
    }
  }, [quickReason])

  // Approval handler
  const handleApprove = async (payment: Payment) => {
    try {
      if (isLive && typeof payment.id === 'string') {
        // 1. Update payment status in public.payments table
        const { error: paymentError } = await supabase
          .from('payments')
          .update({ 
            status: 'approved',
            approved_at: new Date().toISOString()
          })
          .eq('id', payment.id)

        if (paymentError) throw paymentError

        // 2. Turn associated ad is_premium to true
        if (payment.ad_id) {
          const { error: adError } = await supabase
            .from('ads')
            .update({ is_premium: true })
            .eq('id', payment.ad_id)

          if (adError) throw adError
        }
      }

      // Update state locally
      setPayments(prev => prev.map(p => 
        p.id === payment.id 
          ? { ...p, status: 'approved', approved_at: new Date().toISOString() } 
          : p
      ))

      setAlert({
        type: 'success',
        message: `Paiement ${payment.payment_code} approuvé avec succès ! L'annonce "${payment.ads?.title || 'Associée'}" est désormais VIP/Premium.`
      })
    } catch (err: any) {
      console.error(err)
      setAlert({ type: 'error', message: `Échec de l'approbation : ${err.message}` })
    }
  }

  // Rejection Submission
  const submitRejection = async () => {
    if (!currentPaymentToReject || !rejectionReason.trim()) return

    try {
      if (isLive && typeof currentPaymentToReject.id === 'string') {
        const { error } = await supabase
          .from('payments')
          .update({ 
            status: 'rejected',
            rejection_reason: rejectionReason.trim()
          })
          .eq('id', currentPaymentToReject.id)

        if (error) throw error
      }

      setPayments(prev => prev.map(p => 
        p.id === currentPaymentToReject.id 
          ? { ...p, status: 'rejected', rejection_reason: rejectionReason.trim() } 
          : p
      ))

      setAlert({
        type: 'info',
        message: `Le paiement ${currentPaymentToReject.payment_code} a été refusé. Motif: "${rejectionReason}"`
      })
      setRejectModalOpen(false)
      setCurrentPaymentToReject(null)
      setRejectionReason('')
      setQuickReason('')
    } catch (err: any) {
      console.error(err)
      setAlert({ type: 'error', message: `Échec du rejet : ${err.message}` })
    }
  }

  // Quick action to flag complete fraud
  const handleMarkFraud = async (payment: Payment) => {
    if (!confirm(`Confirmez-vous que la transaction ${payment.transaction_id} est frauduleuse ?`)) return

    try {
      if (isLive && typeof payment.id === 'string') {
        const { error } = await supabase
          .from('payments')
          .update({ 
            status: 'fraud',
            fraud_score: 100
          })
          .eq('id', payment.id)

        if (error) throw error
      }

      setPayments(prev => prev.map(p => 
        p.id === payment.id 
          ? { ...p, status: 'fraud', fraud_score: 100 } 
          : p
      ))

      setAlert({
        type: 'error',
        message: `La transaction ${payment.transaction_id} a été marquée comme FRAUDE.`
      })
    } catch (err: any) {
      console.error(err)
      setAlert({ type: 'error', message: `Erreur lors du marquage : ${err.message}` })
    }
  }

  // Filtering payments based on search and selected tab status
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.transaction_id.toLowerCase().includes(search.toLowerCase()) ||
      payment.payment_code.toLowerCase().includes(search.toLowerCase()) ||
      payment.sender_number.includes(search) ||
      (payment.ads?.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (payment.user_id || '').toLowerCase().includes(search.toLowerCase())

    if (statusFilter === 'all') return matchesSearch
    return matchesSearch && payment.status === statusFilter
  })

  // Dynamic status counters for cards
  const pendingCount = payments.filter(p => p.status === 'pending').length
  const suspiciousCount = payments.filter(p => p.status === 'suspicious').length
  const fraudCount = payments.filter(p => p.status === 'fraud').length
  const approvedTotal = payments.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0)
  const approvedCount = payments.filter(p => p.status === 'approved').length

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Alert banner */}
      {alert && (
        <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 p-4 rounded-xl border shadow-xl max-w-md animate-in slide-in-from-right duration-300 ${
          alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          {alert.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> :
           alert.type === 'error' ? <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" /> :
           <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />}
          <p className="text-sm font-semibold">{alert.message}</p>
          <button onClick={() => setAlert(null)} className="ml-auto p-1 hover:bg-black/5 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header section with live database indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-main flex items-center gap-2 tracking-tight">
            <DollarSign className="w-8 h-8 text-green-600 bg-green-50 rounded-xl p-1 border border-green-200" />
            Validation des Paiements Waafi
          </h1>
          <p className="text-text-muted mt-1 font-medium">
            Système manuel semi-automatisé de vérification des boosts premium de Djibouti.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              Base Supabase Connectée
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm" title="Exécution sur données de secours en local car les tables SQL Supabase n'ont pas encore été créées">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Mode Simulation
            </span>
          )}
          
          <button 
            onClick={fetchPayments} 
            className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-500 transition-all"
            title="Rafraîchir les transactions"
          >
            <Activity className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time analytical counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute right-0 top-0 w-24 h-24 bg-green-500/5 rounded-bl-full pointer-events-none" />
          <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Recettes Approuvées</span>
          <p className="text-2xl font-black text-green-600 mt-1">{approvedTotal.toLocaleString()} FDJ</p>
          <p className="text-[10px] text-text-muted font-bold mt-1">Sur {approvedCount} forfaits validés au total</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
          <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">En attente (Pending)</span>
          <p className="text-2xl font-black text-blue-600 mt-1">{pendingCount} Reçu(s)</p>
          <p className="text-[10px] text-text-muted font-bold mt-1">À inspecter et approuver manuellement</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
          <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Transaction(s) Suspecte(s)</span>
          <p className="text-2xl font-black text-amber-500 mt-1">{suspiciousCount} Alerte(s)</p>
          <p className="text-[10px] text-amber-600/90 font-bold mt-1">Score anti-fraude &gt;= 50%</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute right-0 top-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
          <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Tentatives de Fraude</span>
          <p className="text-2xl font-black text-red-600 mt-1">{fraudCount} Bloqué(es)</p>
          <p className="text-[10px] text-red-600 font-bold mt-1">ID doublons ou scores de fraude à 100%</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* LEFT COLUMN: Configuration Pricing & Guidelines */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 space-y-6">
            <h2 className="font-bold text-text-main text-lg flex items-center gap-2 border-b pb-4">
              <Settings2 className="w-5 h-5 text-accent" />
              Forfaits Premium Actifs
            </h2>
            <div className="space-y-4">
              {packs.map((pack) => (
                <div key={pack.id} className="p-4 bg-neutral/65 border border-gray-200 rounded-xl relative overflow-hidden hover:border-accent/40 transition-colors flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-text-main flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 
                      {pack.name}
                    </span>
                    <span className="font-black text-accent text-sm">{pack.price} / {pack.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pack.features.map((f, idx) => (
                      <span key={idx} className="bg-white border border-gray-150 text-[9px] text-text-muted px-2 py-0.5 rounded font-semibold">{f}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
            <h3 className="font-bold text-text-main text-base flex items-center gap-2 border-b pb-3 mb-4">
              <HelpCircle className="w-4.5 h-4.5 text-accent" />
              Moteur Anti-Fraude
            </h3>
            <div className="text-xs space-y-3 text-text-muted leading-relaxed font-medium">
              <p>
                Le système évalue automatiquement un score de fraude sur 100 points à la soumission :
              </p>
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong className="text-red-600">Doublon d'ID (+100)</strong> : Transaction Waafi déjà soumise auparavant.</li>
                <li><strong className="text-amber-600">Écart Montant (+50)</strong> : Le prix envoyé diffère du tarif du pack.</li>
                <li><strong className="text-gray-700">Format Phone (+30)</strong> : Format de numéro non Djiboutien.</li>
                <li><strong className="text-gray-700">Cooldown Court (+40)</strong> : Soumission en moins de 3 minutes d'intervalle.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MANUAL PAYMENTS ACCEPTANCE LIST */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Dashboard Table Filter & Header */}
          <div className="p-5 border-b space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="font-extrabold text-text-main text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Liste des Demandes de Boosts Waafi
              </h2>
              <span className="text-xs font-bold text-text-muted bg-neutral px-2.5 py-1 rounded-lg border">
                {filteredPayments.length} transactions
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher transaction, code, phone, annonce..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent w-full text-xs font-medium transition-all"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="py-2 pl-2.5 pr-8 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente (Pending)</option>
                  <option value="suspicious">Suspects (Score &gt;= 50%)</option>
                  <option value="fraud">Fraudes Classées</option>
                  <option value="approved">Validés (Approved)</option>
                  <option value="rejected">Refusés (Rejected)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table container */}
          <div className="overflow-x-auto flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
                <p className="text-xs font-bold text-text-muted">Chargement des transactions depuis la base...</p>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center px-6">
                <ShieldCheck className="w-12 h-12 text-gray-300 stroke-[1.5] mb-3" />
                <h3 className="font-bold text-text-main text-sm">Aucune transaction trouvée</h3>
                <p className="text-xs text-text-muted mt-1 max-w-sm leading-relaxed font-semibold">
                  Aucun paiement ne correspond aux filtres sélectionnés ou aucune demande n'a encore été soumise.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredPayments.map((payment) => {
                  const isHighRisk = payment.fraud_score >= 50
                  const isFraud = payment.status === 'fraud'
                  const isSuspicious = payment.status === 'suspicious'
                  
                  // Row border/color context based on fraud risk
                  let statusRowBg = 'hover:bg-neutral/40'
                  if (isFraud) statusRowBg = 'bg-red-50/20 hover:bg-red-50/30'
                  else if (isSuspicious) statusRowBg = 'bg-amber-50/20 hover:bg-amber-50/30'

                  return (
                    <div 
                      key={payment.id} 
                      className={`p-4 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${statusRowBg}`}
                    >
                      {/* Left Block: Ad and Plan Details */}
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase ${
                            payment.plan_name === 'VIP' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                            payment.plan_name === 'Gold' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}>
                            {payment.plan_name} • {payment.amount} FDJ
                          </span>
                          <span className="text-[10px] text-text-muted font-bold">
                            Soumis le {new Date(payment.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-sm text-text-main truncate" title={payment.ads?.title}>
                          {payment.ads?.title || "Annonce non disponible"}
                        </h4>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-text-muted">
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] text-text-main border">
                            ID: {payment.payment_code}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {payment.sender_number}
                          </span>
                          <span>•</span>
                          <span className="text-gray-500 font-medium">
                            Tx: <strong className="text-text-main font-bold">{payment.transaction_id}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Middle Block: Fraud Score and Status Badges */}
                      <div className="flex-shrink-0 flex md:flex-col items-start md:items-end gap-2 md:gap-1.5 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-text-muted">Risque :</span>
                          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-black border ${
                            payment.fraud_score >= 80 ? 'text-red-700 bg-red-50 border-red-200' :
                            payment.fraud_score >= 40 ? 'text-amber-700 bg-amber-50 border-amber-200' :
                            'text-green-700 bg-green-50 border-green-200'
                          }`}>
                            {payment.fraud_score}%
                          </span>
                        </div>

                        {/* Status Label */}
                        <div className="ml-auto md:ml-0">
                          {payment.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200">
                              <Loader2 className="w-3 h-3 animate-spin" /> En attente
                            </span>
                          )}
                          {payment.status === 'suspicious' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200">
                              <AlertTriangle className="w-3 h-3" /> Suspect
                            </span>
                          )}
                          {payment.status === 'fraud' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-red-700 bg-red-50 border border-red-200">
                              <ShieldAlert className="w-3 h-3" /> Fraude Classée
                            </span>
                          )}
                          {payment.status === 'approved' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-green-700 bg-green-50 border border-green-200">
                              <CheckCircle className="w-3 h-3" /> Validé
                            </span>
                          )}
                          {payment.status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-gray-600 bg-gray-50 border border-gray-200" title={payment.rejection_reason || ''}>
                              <X className="w-3 h-3" /> Refusé
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Block: Actions */}
                      <div className="flex-shrink-0 flex items-center gap-2 w-full md:w-auto border-t md:border-none pt-2 md:pt-0">
                        {/* Eye Button to Preview Screenshot */}
                        <button 
                          onClick={() => setSelectedReceiptUrl(payment.screenshot_url)}
                          className="p-2 bg-neutral hover:bg-gray-200 text-gray-600 rounded-xl border transition-all"
                          title="Voir le reçu de paiement"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Inline Admin Approval Buttons if Pending or Suspicious */}
                        {(payment.status === 'pending' || payment.status === 'suspicious') ? (
                          <>
                            <button 
                              onClick={() => handleApprove(payment)}
                              className="flex-1 md:flex-initial px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1"
                              title="Valider la transaction & Activer le premium"
                            >
                              <Check className="w-3.5 h-3.5" /> Approuver
                            </button>
                            <button 
                              onClick={() => {
                                setCurrentPaymentToReject(payment)
                                setRejectModalOpen(true)
                              }}
                              className="p-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl transition-all"
                              title="Rejeter et justifier"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMarkFraud(payment)}
                              className="p-2 border border-gray-200 hover:bg-gray-150 text-gray-500 hover:text-red-500 rounded-xl transition-all"
                              title="Signaler comme fraude absolue"
                            >
                              <ShieldAlert className="w-4 h-4" />
                            </button>
                          </>
                        ) : payment.status === 'rejected' && payment.rejection_reason ? (
                          <div className="text-[10px] text-text-muted italic max-w-[200px] truncate" title={payment.rejection_reason}>
                            Motif : {payment.rejection_reason}
                          </div>
                        ) : payment.status === 'approved' && payment.approved_at ? (
                          <span className="text-[10px] text-green-600 font-bold">
                            Validé le {new Date(payment.approved_at).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-[10px] text-red-600 font-extrabold flex items-center gap-0.5">
                            <ShieldAlert className="w-3 h-3" /> Bloqué
                          </span>
                        )}
                      </div>

                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* MODAL 1: PREVIEW SCREENSHOT LIGHTBOX */}
      {selectedReceiptUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full border border-gray-200 shadow-2xl relative flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-neutral">
              <span className="font-extrabold text-sm text-text-main flex items-center gap-1.5">
                <CreditCard className="w-4.5 h-4.5 text-accent" />
                Vérification du reçu de transfert Waafi
              </span>
              <button 
                onClick={() => setSelectedReceiptUrl(null)}
                className="p-1.5 hover:bg-gray-200 text-gray-500 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Screenshot Container */}
            <div className="p-4 bg-gray-900 flex items-center justify-center min-h-[300px] max-h-[500px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedReceiptUrl} 
                alt="Reçu Waafi" 
                className="object-contain max-h-[450px] rounded-lg shadow-md max-w-full"
                onError={(e) => {
                  // Fallback for missing/bad local screenshots
                  e.currentTarget.src = "/waafi.jpg.png"
                }}
              />
            </div>

            <div className="p-4 border-t bg-neutral/50 flex justify-end gap-2">
              <button 
                onClick={() => setSelectedReceiptUrl(null)}
                className="px-4 py-2 border rounded-xl text-xs font-bold bg-white text-gray-600 hover:bg-gray-50 transition-all"
              >
                Fermer l'aperçu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: REJECTION WITH JUSTIFICATION */}
      {rejectModalOpen && currentPaymentToReject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full border shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="p-5 border-b flex justify-between items-center bg-neutral">
              <span className="font-extrabold text-sm text-text-main flex items-center gap-1.5">
                <AlertCircle className="w-4.5 h-4.5 text-red-500" />
                Justification du rejet de boost
              </span>
              <button 
                onClick={() => {
                  setRejectModalOpen(false)
                  setCurrentPaymentToReject(null)
                  setRejectionReason('')
                  setQuickReason('')
                }}
                className="p-1.5 hover:bg-gray-200 text-gray-500 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="text-xs text-text-muted leading-relaxed font-semibold">
                Indiquez à l'utilisateur la raison pour laquelle son paiement manuel par Waafi n'a pas pu être validé.
              </div>

              {/* Quick pre-made reasons buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-text-muted uppercase">Motifs Prédéfinis :</span>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => setQuickReason("Reçu de transfert illisible. Veuillez renvoyer une capture d'écran nette.")}
                    className="px-2.5 py-1 bg-neutral hover:bg-gray-200 text-[10px] text-text-main font-bold border rounded-lg transition-all"
                  >
                    Image illisible
                  </button>
                  <button 
                    onClick={() => setQuickReason("Le montant saisi ne correspond pas à la tarification du forfait sélectionné.")}
                    className="px-2.5 py-1 bg-neutral hover:bg-gray-200 text-[10px] text-text-main font-bold border rounded-lg transition-all"
                  >
                    Montant incorrect
                  </button>
                  <button 
                    onClick={() => setQuickReason("ID de transaction non trouvé dans les relevés du compte Waafi Pay.")}
                    className="px-2.5 py-1 bg-neutral hover:bg-gray-200 text-[10px] text-text-main font-bold border rounded-lg transition-all"
                  >
                    Transaction introuvable
                  </button>
                </div>
              </div>

              {/* Text justification box */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-text-muted uppercase">Message Personnalisé :</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Écrivez le motif exact..."
                  rows={4}
                  className="w-full p-3 border border-gray-250 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent bg-neutral/20 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="p-4 border-t bg-neutral/50 flex justify-end gap-2">
              <button 
                onClick={() => {
                  setRejectModalOpen(false)
                  setCurrentPaymentToReject(null)
                  setRejectionReason('')
                  setQuickReason('')
                }}
                className="px-4 py-2 border rounded-xl text-xs font-bold bg-white text-gray-500 hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button 
                onClick={submitRejection}
                disabled={!rejectionReason.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all"
              >
                Confirmer le Refus
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}