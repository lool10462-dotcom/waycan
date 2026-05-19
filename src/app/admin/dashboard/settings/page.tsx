'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, Users, FileText, MessageCircle, BarChart3, Settings, 
  Shield, TrendingUp, Eye, DollarSign, AlertTriangle, CheckCircle, 
  XCircle, MoreVertical, Trash2, Edit, Eye as ViewEye,
  RefreshCw, Download, Bell, LogOut, Menu, X, ShieldCheck,
  Key, Lock, Eye as EyeIcon, EyeOff, Save, User, Mail, Phone,
  Globe, Palette, Bell as BellIcon, Shield as ShieldIcon, Database,
  Trash, CheckSquare, Square, Plus, Image, Link as LinkIcon
} from 'lucide-react'

const adminNav = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: false },
  { icon: FileText, label: 'Annonces', href: '/admin/dashboard/annonces', active: false },
  { icon: Users, label: 'Utilisateurs', href: '/admin/dashboard/utilisateurs', active: false },
  { icon: MessageCircle, label: 'Messages', href: '/admin/dashboard/messages', active: false },
  { icon: BarChart3, label: 'Statistiques', href: '/admin/dashboard/statistiques', active: false },
  { icon: DollarSign, label: 'Abonnements', href: '/admin/dashboard/abonnements', active: false },
  { icon: Shield, label: 'Modération', href: '/admin/dashboard/moderation', active: false },
  { icon: Settings, label: 'Paramètres', href: '/admin/dashboard/settings', active: true },
]

interface AdminUser {
  email: string
  name: string
  role: string
  lastLogin: string
}

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  
  const [adminUser, setAdminUser] = useState<AdminUser>({
    email: 'admin@waycan.dj',
    name: 'Administrateur Principal',
    role: 'Super Administrateur',
    lastLogin: '17 Mai 2026, 14:32'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'WAYCAN',
    siteDescription: 'La marketplace intelligente de Djibouti',
    contactEmail: 'support@waycan.dj',
    contactPhone: '+253 77 17 97 55',
    address: 'Djibouti-ville, Djibouti',
    timezone: 'Africa/Djibouti',
    currency: 'FDJ'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newAdNotification: true,
    newUserNotification: true,
    weeklyReport: true,
    securityAlerts: true
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    ipWhitelist: '',
    loginAlerts: true
  })

  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const handlePasswordChange = () => {
    setPasswordError('')
    
    if (passwordData.currentPassword !== 'Admin2026!') {
      setPasswordError('Mot de passe actuel incorrect')
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 8 caractères')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas')
      return
    }

    setPasswordSuccess(true)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setTimeout(() => setPasswordSuccess(false), 3000)
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
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-text-main">Paramètres du compte</h1>
          <p className="text-text-muted">Gérez votre profil, mot de passe et préférences</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-surface rounded-xl border p-2">
              {[
                { id: 'profile', icon: User, label: 'Profil' },
                { id: 'password', icon: Key, label: 'Mot de passe' },
                { id: 'site', icon: Globe, label: 'Site web' },
                { id: 'notifications', icon: BellIcon, label: 'Notifications' },
                { id: 'security', icon: ShieldIcon, label: 'Sécurité' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-surface rounded-xl border p-6">
                <h2 className="text-xl font-semibold text-text-main mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profil administrateur
                </h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    A
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-main">{adminUser.name}</h3>
                    <p className="text-text-muted">{adminUser.role}</p>
                    <p className="text-sm text-text-muted mt-1">Dernière connexion: {adminUser.lastLogin}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={adminUser.name}
                      onChange={(e) => setAdminUser({...adminUser, name: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Email</label>
                    <input
                      type="email"
                      value={adminUser.email}
                      onChange={(e) => setAdminUser({...adminUser, email: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t flex justify-end">
                  <button className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="bg-surface rounded-xl border p-6">
                <h2 className="text-xl font-semibold text-text-main mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Changer le mot de passe
                </h2>

                {passwordSuccess && (
                  <div className="bg-success/10 border border-success text-success p-4 rounded-lg mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Mot de passe modifié avec succès!
                  </div>
                )}

                {passwordError && (
                  <div className="bg-alert/10 border border-alert text-alert p-4 rounded-lg mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {passwordError}
                  </div>
                )}

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Mot de passe actuel</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-3 pr-12 border rounded-lg"
                        placeholder="Entrez le mot de passe actuel"
                      />
                    </div>
                    <p className="text-xs text-text-muted mt-1">Mot de passe actuel: Admin2026!</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Nouveau mot de passe</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="Nouveau mot de passe (min. 8 caractères)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="Confirmez le nouveau mot de passe"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t flex justify-end">
                  <button 
                    onClick={handlePasswordChange}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    Mettre à jour le mot de passe
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'site' && (
              <div className="bg-surface rounded-xl border p-6">
                <h2 className="text-xl font-semibold text-text-main mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Paramètres du site
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Nom du site</label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Email de contact</label>
                    <input
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={siteSettings.contactPhone}
                      onChange={(e) => setSiteSettings({...siteSettings, contactPhone: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Fuseau horaire</label>
                    <select
                      value={siteSettings.timezone}
                      onChange={(e) => setSiteSettings({...siteSettings, timezone: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    >
                      <option value="Africa/Djibouti">Africa/Djibouti (GMT+3)</option>
                      <option value="Africa/Nairobi">Africa/Nairobi (GMT+3)</option>
                      <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t flex justify-end">
                  <button className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-surface rounded-xl border p-6">
                <h2 className="text-xl font-semibold text-text-main mb-6 flex items-center gap-2">
                  <BellIcon className="w-5 h-5" />
                  Paramètres de notification
                </h2>

                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Notifications par email', desc: 'Recevoir les mises à jour par email' },
                    { key: 'newAdNotification', label: 'Nouvelle annonce', desc: 'Alert lorsqu\'une nouvelle annonce est publiée' },
                    { key: 'newUserNotification', label: 'Nouvel utilisateur', desc: 'Alert lors d\'une nouvelle inscription' },
                    { key: 'weeklyReport', label: 'Rapport hebdomadaire', desc: 'Recevoir un résumé chaque semaine' },
                    { key: 'securityAlerts', label: 'Alertes de sécurité', desc: 'Notifications importantes de sécurité' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-text-main">{item.label}</p>
                        <p className="text-sm text-text-muted">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, [item.key]: !notificationSettings[item.key as keyof typeof notificationSettings]})}
                        className="text-primary"
                      >
                        {notificationSettings[item.key as keyof typeof notificationSettings] ? 
                          <CheckSquare className="w-6 h-6" /> : 
                          <Square className="w-6 h-6 text-gray-300" />
                        }
                      </button>
                    </label>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t flex justify-end">
                  <button className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-surface rounded-xl border p-6">
                <h2 className="text-xl font-semibold text-text-main mb-6 flex items-center gap-2">
                  <ShieldIcon className="w-5 h-5" />
                  Paramètres de sécurité
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-text-main">Authentification à deux facteurs</p>
                      <p className="text-sm text-text-muted">Ajouter une couche de sécurité supplémentaire</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings({...securitySettings, twoFactorEnabled: !securitySettings.twoFactorEnabled})}
                      className="text-primary"
                    >
                      {securitySettings.twoFactorEnabled ? 
                        <CheckSquare className="w-6 h-6" /> : 
                        <Square className="w-6 h-6 text-gray-300" />
                      }
                    </button>
                  </label>

                  <div className="p-4 border rounded-lg">
                    <label className="block text-sm font-medium text-text-main mb-2">Délai d'expiration de session (minutes)</label>
                    <input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border rounded-lg"
                      min={5}
                      max={120}
                    />
                  </div>

                  <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-text-main">Alertes de connexion</p>
                      <p className="text-sm text-text-muted">Recevoir une notification lors d'une nouvelle connexion</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings({...securitySettings, loginAlerts: !securitySettings.loginAlerts})}
                      className="text-primary"
                    >
                      {securitySettings.loginAlerts ? 
                        <CheckSquare className="w-6 h-6" /> : 
                        <Square className="w-6 h-6 text-gray-300" />
                      }
                    </button>
                  </label>
                </div>

                <div className="mt-6 pt-6 border-t flex justify-end">
                  <button className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}