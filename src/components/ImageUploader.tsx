'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, AlertCircle, Info, Maximize2 } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  maxImages?: number;
}

export default function ImageUploader({ onUploadSuccess, maxImages = 5 }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (previewUrls.length >= maxImages) {
      setErrorMsg(`Vous ne pouvez pas uploader plus de ${maxImages} images.`);
      return;
    }

    const file = files[0];
    setErrorMsg(null);
    setIsUploading(true);

    const result = await uploadImage(file, 'ads-images');

    if (result.error) {
      setErrorMsg(result.error);
    } else if (result.url) {
      setPreviewUrls(prev => [...prev, result.url!]);
      onUploadSuccess(result.url);
    }

    setIsUploading(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setPreviewUrls(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Alert pour les bonnes pratiques */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-sm text-amber-800">
        <Info className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Astuces de pro pour vendre plus vite :</p>
          <ul className="list-disc pl-4 space-y-1 opacity-90">
            <li>Utilisez la lumière naturelle du jour (évitez les flashs et le contre-jour).</li>
            <li>Nettoyez bien l'objet et choisissez un fond neutre (comme un mur blanc ou une table propre).</li>
            <li>Prenez l'article sous plusieurs angles pour rassurer l'acheteur sur son état.</li>
          </ul>
        </div>
      </div>

      {/* Zone de Drop / Upload */}
      <div 
        className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-accent transition-all cursor-pointer overflow-hidden group"
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-2 text-accent">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium">Téléchargement en cours...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-500 group-hover:text-accent transition-colors">
            <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium">Cliquez pour ajouter une image</p>
            <p className="text-xs text-gray-400">PNG, JPG ou WEBP (Max 5MB)</p>
          </div>
        )}
      </div>

      {/* Affichage des Erreurs */}
      {errorMsg && (
        <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Collage Layout */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {previewUrls.map((url, idx) => (
            <div 
              key={idx} 
              className={`relative group rounded-xl overflow-hidden shadow-sm border border-gray-200 cursor-pointer ${
                idx === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'col-span-1 aspect-square'
              }`}
              onClick={() => setLightboxImage(url)}
            >
              <img 
                src={url} 
                alt={`Aperçu ${idx + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {idx === 0 && (
                <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  Image Principale
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); setLightboxImage(url); }}
                  className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full transition-all"
                  title="Agrandir"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                  className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-all"
                  title="Supprimer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Zoom (Full Screen) */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
          >
            <X className="w-10 h-10" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Zoomed" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
