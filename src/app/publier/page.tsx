'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Camera, Upload, Check, Car, Home, Briefcase, Smartphone, Sofa, Wrench, Loader2 } from 'lucide-react'
import ImageUploader from '@/components/ImageUploader'
import { supabase } from '@/lib/supabase'

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

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

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

      alert('Annonce publiée avec succès !')
      router.push('/annonces')
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
          <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Choisissez une catégorie</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedCategory === cat.slug
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-200 hover:border-accent'
                    }`}
                  >
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${selectedCategory === cat.slug ? 'text-accent' : 'text-gray-400'}`} />
                    <p className="font-medium text-text-main">{cat.name}</p>
                  </button>
                )
              })}
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
                  className="input-field"
                  maxLength={70}
                />
                <p className="text-sm text-text-muted mt-1">{formData.title.length}/70 caractères</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez votre article en détail (minimum 50 caractères)"
                  className="input-field min-h-[200px]"
                  minLength={50}
                />
                <p className="text-sm text-text-muted mt-1">{formData.description.length} caractères (min. 50)</p>
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
                  className="input-field"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.negotiable}
                  onChange={(e) => setFormData({ ...formData, negotiable: e.target.checked })}
                  className="rounded text-accent"
                />
                <span className="text-text-main">Prix négociable</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Localisation</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input-field"
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
                  className="input-field"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.showPhone}
                  onChange={(e) => setFormData({ ...formData, showPhone: e.target.checked })}
                  className="rounded text-accent"
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
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Confirmation</h2>
            <div className="bg-neutral rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-text-main mb-4">Récapitulatif</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-text-muted">Catégorie:</span> <span className="font-medium">{selectedCategory}</span></p>
                <p><span className="text-text-muted">Titre:</span> <span className="font-medium">{formData.title || 'Non défini'}</span></p>
                <p><span className="text-text-muted">Prix:</span> <span className="font-medium text-accent">{formData.price ? `${formData.price} FDJ` : 'Non défini'}</span></p>
                <p><span className="text-text-muted">Localisation:</span> <span className="font-medium">{formData.location || 'Non définie'}</span></p>
              </div>
            </div>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="rounded text-accent mt-1" />
              <span className="text-sm text-text-muted">J&apos;accepte les CGU et les conditions d&apos;utilisation de WAYCAN</span>
            </label>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-6">
          <ChevronLeft className="w-4 h-4" />
          Retour
        </Link>

        <div className="bg-surface rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-text-main mb-8">Publier une annonce</h1>

          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.id ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-24 h-1 ${currentStep > step.id ? 'bg-accent' : 'bg-gray-200'}`} />
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
                disabled={currentStep === 1 && !selectedCategory}
                className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
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
                  className="btn-primary text-lg px-8 inline-flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Publication en cours...</>
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