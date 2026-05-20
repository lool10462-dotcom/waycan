'use client'

import { useState } from 'react'
import { ImageIcon, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-50 flex flex-col items-center justify-center text-gray-400 p-6 border-b">
        <ImageIcon className="w-16 h-16 mb-2 stroke-[1.5]" />
        <p className="text-sm font-medium">Aucune photo pour cette annonce</p>
      </div>
    )
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-[4/3] w-full bg-neutral overflow-hidden rounded-t-xl group">
        <img
          src={images[activeIdx]}
          alt={`${title} - Photo ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Navigation Arrows (for multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault()
                handlePrev()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-text-main rounded-full flex items-center justify-center shadow transition-all hover:scale-105 active:scale-95 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                handleNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-text-main rounded-full flex items-center justify-center shadow transition-all hover:scale-105 active:scale-95 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Controls Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
          <button
            onClick={() => setLightboxOpen(true)}
            className="p-3 bg-white hover:bg-neutral text-text-main font-bold rounded-xl shadow-lg transition-transform scale-90 group-hover:scale-100 duration-300 flex items-center gap-2 text-sm"
          >
            <Maximize2 className="w-4 h-4" />
            Agrandir la photo
          </button>
        </div>

        {/* Floating Indicator */}
        <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm z-10">
          {activeIdx + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 px-4">
          {images.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                activeIdx === idx
                  ? 'border-accent shadow-sm scale-95 ring-2 ring-accent/20'
                  : 'border-gray-200 hover:border-accent/40 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={url}
                alt={`${title} miniature ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-10 h-10" />
          </button>
          <img
            src={images[activeIdx]}
            alt={title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
