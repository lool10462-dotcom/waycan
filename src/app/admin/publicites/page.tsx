'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Image as ImageIcon, Link as LinkIcon, Send, Loader2, AlertCircle, Trash2, LayoutTemplate } from 'lucide-react'
import { uploadImage } from '@/lib/storage'
import { supabase } from '@/lib/supabase'

export default function AdminPublicites() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [secretPassword, setSecretPassword] = useState('')
  
  const [companyName, setCompanyName] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [position, setPosition] = useState('top') // 'top', 'sidebar', 'bottom'
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null)

  const [activeBanners, setActiveBanners] = useState<any[]>([])

  useEffect(() => {
    if (localStorage.getItem('waycan_admin_unlocked') === 'true') {
      setIsAuthenticated(true)
      fetchBanners()
    }
  }, [])

  const fetchBanners = async () => {
    const { data } = await supabase.from('banners').select('*').order('created_at', { ascending: false })
    if (data) setActiveBanners(data)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setMessage(null)

    try {
      const result = await uploadImage(files[0], 'banners')
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else if (result.url) {
        setImageUrl(result.url)
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: "Erreur lors du téléchargement de l'image." })
    } finally {
      setIsUploading(false)
    }
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageUrl || !linkUrl || !companyName) {
      setMessage({ type: 'error', text: "L'image, le lien et le nom de l'entreprise sont obligatoires." })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const { error } = await supabase.from('banners').insert([
        {
          company_name: companyName,
          link_url: linkUrl,
          image_url: imageUrl,
          position: position,
          status: 'active'
        }
      ])

      if (error) throw error

      setMessage({ type: 'success', text: "Publicité ajoutée avec succès !" })
      setCompanyName('')
      setLinkUrl('')
      setImageUrl(null)
      fetchBanners()
    } catch (err: any) {
      setMessage({ type: 'error', text: "Erreur lors de l'ajout de la publicité." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette publicité ?")) return
    
    await supabase.from('banners').delete().eq('id', id)
    fetchBanners()
  }

  // --- Écran de verrouillage "Invisible" ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral flex flex-col items-center justify-center p-4">
        <h1 className="text-8xl font-bold text-gray-200 mb-2">404</h1>
        <p className="text-gray-400 mb-12">La page que vous recherchez n'existe pas.</p>
        
        <div className="max-w-xs w-full opacity-10 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          <input 
            type="password"
            value={secretPassword}
            onChange={(e) => {
               const val = e.target.value
               setSecretPassword(val)
               if(val === 'waycan7717') {
                 localStorage.setItem('waycan_admin_unlocked', 'true')
                 setIsAuthenticated(true)
                 fetchBanners()
               }
            }}
            className="w-full bg-transparent border-b border-gray-300 text-center py-2 text-sm focus:outline-none focus:border-primary text-gray-600"
            placeholder="Rechercher..."
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="bg-surface rounded-2xl shadow-sm p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-text-main mb-2 flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-primary" />
            Gestionnaire de Publicités (Ad Manager)
          </h1>
          <p className="text-text-muted mb-8">Ajoutez des bannières promotionnelles pour des entreprises partenaires, qui s'afficheront sur tout le site.</p>

          {message && (
            <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              <AlertCircle className="w-5 h-5" />
              {message.text}
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Nom de l'entreprise</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ex: Djibouti Telecom" 
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Lien de redirection (URL)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="url" 
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://..." 
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-2">Position de la bannière</label>
              <select 
                value={position} 
                onChange={(e) => setPosition(e.target.value)}
                className="input-field"
              >
                <option value="top">En haut (Vedette)</option>
                <option value="middle">Milieu de page</option>
                <option value="bottom">En bas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-2">Bannière (Image longue, ex: 1200x200px)</label>
              {!imageUrl ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                  {isUploading ? (
                    <div className="flex flex-col items-center text-blue-600">
                      <Loader2 className="w-8 h-8 animate-spin mb-2" />
                      <span>Upload en cours...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <span className="font-medium">Cliquer pour uploader une bannière</span>
                    </div>
                  )}
                </label>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <img src={imageUrl} alt="Prévisualisation" className="w-full h-auto object-cover max-h-48" />
                  <button 
                    type="button"
                    onClick={() => setImageUrl(null)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting || isUploading}
                className="btn-primary inline-flex items-center gap-2"
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Ajout en cours...</> : <><Send className="w-5 h-5" /> Publier la publicité</>}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-surface rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-text-main mb-6">Publicités Actives</h2>
          {activeBanners.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucune publicité n'est actuellement diffusée sur le site.</p>
          ) : (
            <div className="space-y-4">
              {activeBanners.map((banner) => (
                <div key={banner.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <img src={banner.image_url} alt={banner.company_name} className="w-32 h-12 object-cover rounded shadow-sm" />
                    <div>
                      <p className="font-bold text-text-main">{banner.company_name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" /> {banner.link_url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">{banner.position}</span>
                    <button 
                      onClick={() => handleDelete(banner.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Supprimer la publicité"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
