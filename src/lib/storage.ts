import { supabase } from './supabase';

// Constants for robust validation
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB (augmenté pour les vidéos)
export const ACCEPTED_MEDIA_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];

export interface UploadResult {
  url?: string;
  error?: string;
}

/**
 * Uploads an image or video to Supabase Storage robustly with validation.
 * @param file The file object to upload
 * @param bucketName The storage bucket (default: 'ads-images')
 * @returns UploadResult containing the URL on success, or an error message.
 */
export async function uploadImage(file: File, bucketName: string = 'ads-images'): Promise<UploadResult> {
  try {
    // 1. Validation : Type de fichier (Antibug)
    if (!ACCEPTED_MEDIA_TYPES.includes(file.type)) {
      return { error: "Format non supporté. Veuillez utiliser JPG, PNG, WEBP, MP4 ou WEBM." };
    }

    // 2. Validation : Taille de fichier (Antibug)
    if (file.size > MAX_FILE_SIZE) {
      return { error: "Le fichier est trop volumineux (Max: 50MB)." };
    }

    // 3. Nom de fichier unique pour éviter les conflits
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const filePath = `public/${uniqueFileName}`;

    // 4. Upload vers Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false // Ne pas écraser s'il existe par miracle
      });

    if (error) {
      console.error("Erreur d'upload Supabase:", error);
      return { error: "Une erreur est survenue lors de l'upload vers le serveur." };
    }

    // 5. Récupération de l'URL publique
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return { url: publicUrlData.publicUrl };

  } catch (err: any) {
    console.error("Exception in uploadImage:", err);
    return { error: "Erreur réseau inattendue. Veuillez vérifier votre connexion." };
  }
}
