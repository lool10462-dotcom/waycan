'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Image as ImageIcon, Video, Send, Loader2, AlertCircle, Trash2 } from 'lucide-react'
import { uploadImage } from '@/lib/storage'
import { supabase } from '@/lib/supabase'

export default function AdminActualites() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [secretPassword, setSecretPassword] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null)

  useEffect(() => {
    // Vérifier si l'admin est déjà connecté via localStorage
    if (localStorage.getItem('waycan_admin_unlocked') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setMessage(null)

    try {
      // Pour les vidéos, il faudrait idéalement utiliser un bucket spécifique ou adapter uploadImage
      // Ici on utilise la fonction d'upload existante vers un bucket 'actualites'
      const result = await uploadImage(files[0], 'actualites')
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else if (result.url) {
        setMediaUrls(prev => [...prev, result.url!])
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: "Erreur lors du téléchargement du média." })
    } finally {
      setIsUploading(false)
    }
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) {
      setMessage({ type: 'error', text: "Le titre et le contenu sont obligatoires." })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const { error } = await supabase.from('actualites').insert([
        {
          title,
          content,
          media_urls: mediaUrls,
          status: 'published'
        }
      ])

      if (error) throw error

      setMessage({ type: 'success', text: "Actualité publiée avec succès !" })
      setTitle('')
      setContent('')
      setMediaUrls([])
    } catch (err: any) {
      setMessage({ type: 'error', text: "Erreur lors de la publication." })
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- Écran de verrouillage "Invisible" (Fausse page 404) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral flex flex-col items-center justify-center p-4">
        <h1 className="text-8xl font-bold text-gray-200 mb-2">404</h1>
        <p className="text-gray-400 mb-12">La page que vous recherchez n'existe pas.</p>
        
        {/* Champ de recherche caché qui sert de mot de passe */}
        <div className="max-w-xs w-full opacity-10 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          <input 
            type="password"
            value={secretPassword}
            onChange={(e) => {
               const val = e.target.value
               setSecretPassword(val)
               // Le mot de passe secret est : waycan7717
               if(val === 'waycan7717') {
                 localStorage.setItem('waycan_admin_unlocked', 'true')
                 setIsAuthenticated(true)
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface rounded-2xl shadow-sm p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-text-main mb-2">Gestion des Actualités</h1>
          <p className="text-text-muted mb-8">Créez et publiez des articles, photos et vidéos pour informer vos utilisateurs.</p>

          {message && (
            <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              <AlertCircle className="w-5 h-5" />
              {message.text}
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">Titre de l'actualité</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Nouvelle mise à jour de la plateforme WAYCAN" 
                className="input-field text-lg font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-2">Contenu détaillé</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Rédigez le contenu de votre actualité ici..." 
                className="input-field min-h-[200px]"
              />
            </div>

            {/* Upload Section */}
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">Médias (Photos / Vidéos)</label>
              <div className="flex gap-4 items-center mb-4">
                <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                  <ImageIcon className="w-5 h-5" />
                  Ajouter une image
                  <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} disabled={isUploading} />
                </label>
                <label className="cursor-pointer bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                  <Video className="w-5 h-5" />
                  Ajouter une vidéo
                  <input type="file" accept="video/mp4,video/webm" className="hidden" onChange={handleMediaUpload} disabled={isUploading} />
                </label>
                {isUploading && <span className="text-sm text-gray-500 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Téléchargement...</span>}
              </div>

              {mediaUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {mediaUrls.map((url, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                      {url.includes('.mp4') || url.includes('.webm') ? (
                        <video src={url} className="w-full h-full object-cover" />
                      ) : (
                        <img src={url} alt="Média" className="w-full h-full object-cover" />
                      )}
                      <button 
                        type="button"
                        onClick={() => setMediaUrls(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting || isUploading}
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Publication en cours...</> : <><Send className="w-5 h-5" /> Publier l'actualité</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
