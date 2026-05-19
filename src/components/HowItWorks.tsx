import Link from 'next/link'
import { ImageIcon, Edit3, Rocket } from 'lucide-react'

const steps = [
  {
    icon: ImageIcon,
    title: 'Prenez une photo',
    description: 'Photographiez votre article dans un endroit bien éclairé pour attirer plus d\'acheteurs',
    color: 'bg-accent',
  },
  {
    icon: Edit3,
    title: 'Décrivez votre annonce',
    description: 'Ajoutez un titre accrocheur, un prix juste et votre localisation précise',
    color: 'bg-secondary',
  },
  {
    icon: Rocket,
    title: 'Publiez et vendez',
    description: 'Votre annonce est visible instantanément par des milliers d\'acheteurs',
    color: 'bg-success',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
            Vendre en 3 étapes simples
          </h2>
          <p className="text-text-muted text-lg">
            Plus besoin d&apos;être expert pour vendre sur WAYCAN
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-accent via-secondary to-success -translate-y-1/2 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative z-10 text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 ${step.color} rounded-full mb-6 shadow-lg hover:scale-110 transition-transform`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <div className="bg-surface inline-block px-4 py-1 rounded-full text-sm font-medium text-text-muted mb-4">
                  Étape {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-text-main mb-3">{step.title}</h3>
                <p className="text-text-muted max-w-xs mx-auto">{step.description}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/publier" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            <span>+</span> Publier mon annonce gratuitement
          </Link>
        </div>
      </div>
    </section>
  )
}