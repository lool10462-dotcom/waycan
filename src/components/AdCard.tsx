import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, MapPin, Clock } from 'lucide-react'

interface AdCardProps {
  id: string
  title: string
  price: string
  image: string
  location: string
  date: string
  views: number
  isPremium?: boolean
  category: string
}

export default function AdCard({
  id,
  title,
  price,
  image,
  location,
  date,
  views,
  isPremium = false,
  category
}: AdCardProps) {
  return (
    <Link href={`/annonce/${id}`}>
      <div className="card group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            unoptimized={true}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isPremium && (
            <span className="absolute top-3 right-3 badge badge-premium">
              Premium
            </span>
          )}
          <button
            className="absolute top-3 left-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-alert hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xl font-extrabold text-accent mb-2">{price} FDJ</p>
          <h3 className="font-semibold text-text-main line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {date}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-sm text-text-muted">
              <Eye className="w-4 h-4" />
              {views} vues
            </span>
            <span className="text-primary font-medium text-sm group-hover:underline">
              Voir →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}