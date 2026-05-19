import Link from 'next/link'
import { Car, Home, Briefcase, Smartphone, Sofa, Wrench } from 'lucide-react'

const categories = [
  { name: 'Véhicules', icon: Car, color: 'bg-primary', count: 1240, href: '/categorie/vehicules' },
  { name: 'Immobilier', icon: Home, color: 'bg-secondary', count: 856, href: '/categorie/immobilier' },
  { name: 'Emplois', icon: Briefcase, color: 'bg-success', count: 432, href: '/categorie/emploi' },
  { name: 'Électronique', icon: Smartphone, color: 'bg-accent', count: 2150, href: '/categorie/electronique' },
  { name: 'Maison & Déco', icon: Sofa, color: 'bg-purple-500', count: 780, href: '/categorie/maison' },
  { name: 'Services', icon: Wrench, color: 'bg-alert', count: 320, href: '/categorie/services' },
]

export default function Categories() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
            Explorer par catégorie
          </h2>
          <p className="text-text-muted text-lg">
            Trouvez ce que vous cherchez parmi nos catégories populaires
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-stagger">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group"
              >
                <div className="bg-neutral rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-2 hover:border-accent">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${category.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-text-main mb-1">{category.name}</h3>
                  <p className="text-sm text-text-muted">
                    {category.count.toLocaleString()} annonces
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}