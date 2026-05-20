'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ChevronLeft, ChevronRight, ImageIcon, Upload, Check, Car, Home, Briefcase, 
  Smartphone, Sofa, Wrench, Loader2, Brain, Sparkles, CheckCircle2, 
  ShieldCheck, Heart, Share2, MapPin, Clock, Phone, Eye 
} from 'lucide-react'
import ImageUploader from '@/components/ImageUploader'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/storage'
import { classifyImage, CATEGORY_NAMES } from '@/lib/vision'

const steps = [
  { id: 1, name: 'Catégorie' },
  { id: 2, name: 'Détails' },
  { id: 3, name: 'Photos' },
  { id: 4, name: 'Prix & Contact' },
  { id: 5, name: 'Confirmation' },
]

const categories = [
  { name: 'Véhicules', icon: Car, slug: 'vehicules' },
  { name: 'Immobilier', icon: Home, slug: 'immobilier' },
  { name: 'Emplois', icon: Briefcase, slug: 'emploi' },
  { name: 'Électronique', icon: Smartphone, slug: 'electronique' },
  { name: 'Maison', icon: Sofa, slug: 'maison' },
  { name: 'Services', icon: Wrench, slug: 'services' },
]

export default function PublishPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    negotiable: false,
    location: '',
    email: '',
    phone: '',
    showPhone: true,
    images: [] as string[],
  })

  // Smart AI vision states
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiStatus, setAiStatus] = useState('')
  const [aiResult, setAiResult] = useState<{ category: string; label: string } | null>(null)
  const [isPublished, setIsPublished] = useState(false)

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  // Handle image upload and classification on Step 1 (Smart Category detection)
  const handleAiImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsAiLoading(true);
    setAiStatus("Préparation de l'analyse...");
    setAiResult(null);

    try {
      // 1. Upload the image directly to Supabase storage so the user doesn't have to upload it again
      setAiStatus("Téléchargement de l'image...");
      const result = await uploadImage(file, 'ads-images');
      
      if (result.error) {
        throw new Error(result.error);
      }

      if (result.url) {
        // Automatically save in formData so it's already present in Step 3!
        setFormData(prev => ({
          ...prev,
          images: [result.url!, ...prev.images]
        }));

        // 2. Classify image with client-side TensorFlow model (with instant keyword fallback)
        const classification = await classifyImage(file, result.url, (status) => {
          setAiStatus(status);
        });

        // 3. Set category and display glowing success badge
        setSelectedCategory(classification.category);
        setAiResult({
          category: classification.category,
          label: classification.label
        });
      }
    } catch (err: any) {
      console.error(err);
      setAiStatus("Échec de la reconnaissance automatique.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const { data, error } = await supabase.from('ads').insert([
        {
          category: selectedCategory,
          title: formData.title,
          description: formData.description,
          price: formData.price ? parseFloat(formData.price) : null,
          negotiable: formData.negotiable,
          location: formData.location,
          email: formData.email,
          phone: formData.phone,
          show_phone: formData.showPhone,
          images: formData.images,
          status: 'active'
        }
      ])

      if (error) {
        throw error
      }

      // Smooth switch to premium success layout
      setIsPublished(true)
    } catch (err: any) {
      console.error("Erreur lors de l'insertion:", err)
      setSubmitError(err.message || 'Une erreur est survenue lors de la publication.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* AI Vision Smart Detector Box */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0d2d5a] via-primary to-primary/95 border-2 border-accent/40 rounded-2xl p-6 text-white shadow-xl group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/20 transition-all duration-500" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20 shadow-inner flex-shrink-0">
                  <Brain className="w-9 h-9 text-accent-light animate-pulse" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
                    <Sparkles className="w-5 h-5 text-accent-light animate-bounce" />
                    Détection Intelligente par IA
                  </h3>
                  <p className="text-white/80 text-sm mt-1 leading-relaxed">
                    Ajoutez une photo de votre objet pour que notre IA détecte instantanément sa catégorie et pré-remplisse vos étapes !
                  </p>
                </div>
                
                <div className="flex-shrink-0 w-full md:w-auto">
                  <label className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl cursor-pointer shadow-lg hover:shadow-accent/30 transition-all duration-300 transform active:scale-95 ${isAiLoading ? 'opacity-70 pointer-events-none' : ''}`}>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleAiImageSelect} 
                      className="hidden" 
                    />
                    {isAiLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{aiStatus}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Scanner une photo</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* AI scanning overlay or success badge */}
              {isAiLoading && (
                <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                  <div className="relative w-24 h-24 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
                    <Brain className="absolute inset-0 m-auto w-10 h-10 text-accent animate-pulse" />
                  </div>
                  <span className="text-lg font-semibold animate-pulse text-white">{aiStatus}</span>
                  <div className="w-48 h-1 bg-white/20 rounded-full mt-4 overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-accent animate-pulse w-full rounded-full" />
                  </div>
                </div>
              )}

              {aiResult && (
                <div className="mt-4 p-3 bg-white/10 backdrop-blur rounded-xl border border-white/10 flex items-center gap-3 animate-pulse">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-semibold text-green-300">Catégorie détectée : </span>
                    <span className="font-bold bg-accent px-2 py-0.5 rounded text-white text-xs mr-2">
                      {CATEGORY_NAMES[aiResult.category] || aiResult.category}
                    </span>
                    <span className="text-white/60 italic text-xs">({aiResult.label})</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 my-6 pt-6">
              <h2 className="text-2xl font-bold text-text-main mb-6">Ou choisissez une catégorie manuellement</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  const isSelected = selectedCategory === cat.slug
                  return (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setAiResult(null);
                      }}
                      className={`p-6 rounded-xl border-2 transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'border-accent bg-accent/5 ring-4 ring-accent/20 shadow-md'
                          : 'border-gray-200 hover:border-accent/50 hover:bg-neutral/40'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-8 h-8 bg-accent text-white flex items-center justify-center rounded-bl-xl shadow">
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                      )}
                      <Icon className={`w-10 h-10 mx-auto mb-3 transition-transform group-hover:scale-110 duration-300 ${isSelected ? 'text-accent' : 'text-gray-400'}`} />
                      <p className="font-medium text-text-main">{cat.name}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Détails de l&apos;annonce</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Titre de l&apos;annonce</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Toyota Corolla 2020 excellent état"
                  className="input-field w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  maxLength={70}
                />
                <p className="text-sm text-text-muted mt-1">{formData.title.length}/70 caractères</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    const words = e.target.value.trim().split(/\s+/).filter(w => w.length > 0);
                    if (words.length <= 700) {
                      setFormData({ ...formData, description: e.target.value })
                    }
                  }}
                  placeholder="Décrivez votre article en détail (maximum 700 mots)"
                  className="input-field w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent min-h-[200px]"
                />
                <p className="text-sm text-text-muted mt-1">
                  {formData.description.trim() ? formData.description.trim().split(/\s+/).filter(w => w.length > 0).length : 0}/700 mots (min. 10 mots)
                </p>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Photos de l&apos;annonce</h2>
            
            <ImageUploader 
              onUploadSuccess={(url) => setFormData(prev => ({ ...prev, images: [...prev.images, url] }))}
              maxImages={10}
            />

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">💡 Astuce: Les photos de qualité augmentent vos chances de vente de 50%!</p>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Prix et contact</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Prix (FDJ)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Ex: 1500000"
                  className="input-field w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.negotiable}
                  onChange={(e) => setFormData({ ...formData, negotiable: e.target.checked })}
                  className="rounded text-accent h-4 w-4"
                />
                <span className="text-text-main">Prix négociable</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Localisation</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input-field w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Sélectionnez une zone</option>
                  <option value="djibouti-ville">Djibouti-ville</option>
                  <option value="balbala">Balbala</option>
                  <option value="boulevard">Boulevard</option>
                  <option value="haramous">Haramous</option>
                  <option value="ambouli">Ambouli</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+253 77 17 97 55"
                  className="input-field w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.showPhone}
                  onChange={(e) => setFormData({ ...formData, showPhone: e.target.checked })}
                  className="rounded text-accent h-4 w-4"
                />
                <span className="text-text-main">Afficher mon numéro publiquement</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Email (optionnel)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                  className="input-field w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        const mainImage = formData.images[0];
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-main">Aperçu de votre publication</h2>
            <p className="text-text-muted text-sm -mt-4">Veuillez vérifier les informations ci-dessous. Voici comment votre annonce apparaîtra sur WAYCAN.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
              {/* Image Preview / Ad Card Preview (3/5 cols) */}
              <div className="md:col-span-3 bg-surface border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] w-full bg-neutral">
                  {mainImage ? (
                    <img 
                      src={mainImage} 
                      alt={formData.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-6 bg-gray-50">
                      <ImageIcon className="w-12 h-12 mb-2 stroke-[1.5]" />
                      <p className="text-sm font-medium">Aucune photo sélectionnée</p>
                      <button onClick={() => setCurrentStep(3)} className="text-xs text-accent underline mt-1">Ajouter une photo</button>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {CATEGORY_NAMES[selectedCategory] || selectedCategory}
                  </div>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-bold text-lg text-text-main leading-snug line-clamp-2">
                      {formData.title || "Titre de l'annonce non défini"}
                    </h3>
                  </div>
                  
                  <p className="text-2xl font-bold text-accent">
                    {formData.price ? `${Number(formData.price).toLocaleString()} FDJ` : 'Prix à débattre'}
                    {formData.negotiable && <span className="text-xs text-text-muted font-normal ml-2">(Négociable)</span>}
                  </p>

                  <p className="text-sm text-text-muted line-clamp-3 bg-neutral/30 p-3 rounded-lg border border-gray-100">
                    {formData.description || "Aucune description fournie pour le moment."}
                  </p>

                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-text-muted pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {formData.location ? formData.location.charAt(0).toUpperCase() + formData.location.slice(1) : "Non spécifié"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Aujourd'hui
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      0 vues
                    </span>
                    {formData.phone && formData.showPhone && (
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <Phone className="w-3.5 h-3.5" />
                        {formData.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action and Recap (2/5 cols) */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-neutral rounded-2xl p-6 border border-gray-100 space-y-4 shadow-sm">
                  <h4 className="font-bold text-text-main border-b pb-2">Informations de contact</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Téléphone :</span>
                      <span className="font-semibold text-text-main">{formData.phone || 'Non fourni'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Afficher le numéro :</span>
                      <span className="font-semibold text-text-main">{formData.showPhone ? 'Oui' : 'Non'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Email :</span>
                      <span className="font-semibold text-text-main truncate max-w-[140px]">{formData.email || 'Non fourni'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-neutral/40 transition-colors">
                    <input type="checkbox" className="rounded text-accent mt-1 h-4 w-4 cursor-pointer focus:ring-accent" defaultChecked required />
                    <span className="text-xs text-text-muted leading-relaxed">
                      J&apos;accepte les <Link href="/cgu" className="text-accent underline font-medium hover:text-accent-dark">Conditions Générales d&apos;Utilisation</Link> de WAYCAN et certifie l&apos;authenticité de cette annonce.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Render beautiful success step if published successfully
  if (isPublished) {
    const mainImage = formData.images[0];
    return (
      <div className="min-h-screen bg-neutral pt-24 pb-12 relative overflow-hidden flex items-center justify-center">
        {/* Confetti decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-10 left-10 w-4 h-4 bg-accent rounded-full animate-ping" />
          <div className="absolute top-20 right-20 w-3 h-3 bg-secondary rounded-full animate-bounce" />
          <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-green-400 rounded-full animate-pulse" />
          <div className="absolute bottom-40 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" />
        </div>

        <div className="max-w-xl w-full mx-auto px-4 relative z-10">
          <div className="bg-surface rounded-3xl p-8 shadow-2xl border border-green-100 text-center space-y-6">
            
            {/* Animated Checkmark */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full border-4 border-green-100 mb-2 relative">
              <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-20" />
              <ShieldCheck className="w-12 h-12 text-green-600 relative z-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-text-main">Félicitations !</h1>
              <p className="text-text-muted text-base">Votre annonce a été publiée en ligne avec succès ! Elle est désormais visible par les acheteurs à Djibouti.</p>
            </div>

            {/* Ad card snippet */}
            <div className="bg-neutral rounded-2xl p-4 border border-gray-100 flex gap-4 items-center text-left">
              <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                {mainImage ? (
                  <img src={mainImage} alt={formData.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-neutral">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] bg-accent/10 text-accent font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {CATEGORY_NAMES[selectedCategory] || selectedCategory}
                </span>
                <h3 className="font-bold text-sm text-text-main truncate mt-1">{formData.title}</h3>
                <p className="text-accent font-bold text-sm mt-0.5">
                  {formData.price ? `${Number(formData.price).toLocaleString()} FDJ` : 'Prix à débattre'}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <Link 
                href="/annonces" 
                className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/95 shadow-md shadow-primary/10 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Voir les annonces
              </Link>
              <button 
                onClick={() => {
                  setFormData({
                    title: '',
                    description: '',
                    price: '',
                    negotiable: false,
                    location: '',
                    email: '',
                    phone: '',
                    showPhone: true,
                    images: [],
                  });
                  setSelectedCategory('');
                  setAiResult(null);
                  setCurrentStep(1);
                  setIsPublished(false);
                }}
                className="w-full py-3.5 border border-gray-300 text-text-main font-semibold rounded-xl hover:bg-neutral transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Publier une autre
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex justify-center gap-6 text-xs text-text-muted">
              <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Merci d&apos;utiliser WAYCAN</span>
              <span>•</span>
              <button onClick={() => alert('Lien copié !')} className="hover:underline flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> Partager</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-6">
          <ChevronLeft className="w-4 h-4" />
          Retour
        </Link>

        <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-text-main mb-8">Publier une annonce</h1>

          <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.id ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-20 h-1 mx-2 ${currentStep > step.id ? 'bg-accent' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="min-h-[400px]">
            {renderStep()}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-text-main hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </button>
            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !selectedCategory) ||
                  (currentStep === 2 && (!formData.title || (formData.description.trim().split(/\s+/).filter(w => w.length > 0).length < 10)))
                }
                className="btn-primary inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg px-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 shadow-lg shadow-accent/20"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Publication...</>
                  ) : (
                    "Publier gratuitement"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}