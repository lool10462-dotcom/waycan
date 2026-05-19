/**
 * Smart Vision AI Utility for WAYCAN
 * Uses client-side TensorFlow.js + MobileNet for category recognition from images,
 * with a high-accuracy keyword fallback from the filename.
 */

// Mapping of MobileNet labels or substrings to WAYCAN categories
const KEYWORD_MAPS = {
  vehicules: [
    'car', 'wheel', 'sports car', 'convertible', 'limousine', 'cab', 'minivan', 'pickup',
    'truck', 'trailer', 'jeep', 'motorcycle', 'scooter', 'bicycle', 'bus', 'ambulance',
    'vehicle', 'racer', 'tire', 'landrover', 'kart', 'moped', 'voiture', 'moto', 'camion',
    'velo', 'scoute', 'quad', 'toyota', 'mercedes', 'bmw', 'audi', 'hyundai', 'kia'
  ],
  electronique: [
    'notebook', 'laptop', 'computer', 'screen', 'monitor', 'television', 'cellular telephone',
    'hand-held computer', 'smartphone', 'mobile phone', 'iPod', 'tablet', 'mouse', 'keyboard',
    'joystick', 'camera', 'lens', 'projector', 'printer', 'photocopier', 'modem', 'radio',
    'headphones', 'loudspeaker', 'phone', 'telephone', 'iphone', 'samsung', 'pc', 'ordinateur',
    'ecran', 'appareil', 'cable', 'charger', 'chargeur', 'macbook', 'ipad', 'playstation', 'xbox'
  ],
  maison: [
    'sofa', 'couch', 'studio couch', 'armchair', 'chair', 'rocking chair', 'barber chair',
    'folding chair', 'table', 'desk', 'dining table', 'coffee table', 'bed', 'crib', 'wardrobe',
    'cabinet', 'refrigerator', 'microwave', 'stove', 'oven', 'dishwasher', 'washer', 'dryer',
    'pillow', 'blanket', 'curtain', 'rug', 'carpet', 'vase', 'clock', 'lamp', 'plate', 'cup',
    'mug', 'teapot', 'canap', 'fauteuil', 'chaise', 'bureau', 'lit', 'matelas', 'armoire',
    'meuble', 'cuisine', 'four', 'frigo', 'assiette', 'verre', 'salon'
  ],
  immobilier: [
    'home', 'house', 'building', 'skyscraper', 'yurt', 'greenhouse', 'barn', 'church',
    'castle', 'palace', 'boathouse', 'villa', 'apartment', 'studio', 'flat', 'terrain',
    'chambre', 'hotel', 'maison', 'immeuble', 'appartement', 'residence'
  ],
  services: [
    'screwdriver', 'hammer', 'wrench', 'pliers', 'hatchet', 'axe', 'drill', 'power drill',
    'tool', 'lawn mower', 'shovel', 'rake', 'broom', 'bucket', 'scissors', 'comb', 'hair dryer',
    'massage', 'spa', 'clean', 'plumber', 'electrician', 'service', 'cours', 'formation',
    'mecanic', 'peinture', 'outils', 'vis', 'bricolage'
  ],
  emploi: [
    'suit', 'tie', 'briefcase', 'diploma', 'book', 'notebook computer', 'office', 'desk',
    'recrutement', 'cv', 'travail', 'embauche', 'job', 'emploi', 'stage', 'contrat'
  ]
};

// Friendly names in French
export const CATEGORY_NAMES: { [key: string]: string } = {
  vehicules: 'Véhicules',
  immobilier: 'Immobilier',
  emploi: 'Emplois',
  electronique: 'Électronique',
  maison: 'Maison',
  services: 'Services'
};

/**
 * Loads a remote script dynamically and returns a promise
 */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve();
    
    // Check if script is already present
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}

/**
 * Dynamically loads TensorFlow.js and MobileNet from CDN
 */
export async function initTensorFlow(): Promise<any> {
  if (typeof window === 'undefined') return null;

  const win = window as any;
  if (win.tf && win.mobilenetModel) {
    return win.mobilenetModel;
  }

  try {
    // 1. Load TensorFlow.js core
    if (!win.tf) {
      await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js');
    }

    // 2. Load MobileNet model script
    await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.0/dist/mobilenet.min.js');

    // 3. Load the model weights
    if (win.mobilenet) {
      const model = await win.mobilenet.load({ version: 1, alpha: 1.0 });
      win.mobilenetModel = model;
      return model;
    }
    
    throw new Error('Failed to load MobileNet library from CDN');
  } catch (error) {
    console.error('Error loading TensorFlow/MobileNet:', error);
    return null;
  }
}

/**
 * Predicts category instantly from filename keywords
 */
export function predictFromFilename(filename: string): { category: string; label: string } | null {
  const lower = filename.toLowerCase();
  
  for (const [category, keywords] of Object.entries(KEYWORD_MAPS)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return {
          category,
          label: `Fichier : "${keyword}" détecté`
        };
      }
    }
  }
  
  return null;
}

/**
 * Classifies an image file using MobileNet (client-side) or fallback keywords
 */
export async function classifyImage(
  file: File,
  imageUrl: string,
  onStatusChange?: (status: string) => void
): Promise<{ category: string; confidence: number; label: string }> {
  
  // 1. Instant fallback: Keyword match on the filename
  onStatusChange?.("Analyse du nom du fichier...");
  const filenameMatch = predictFromFilename(file.name);
  if (filenameMatch) {
    // We found a strong keyword. Let's return it with high confidence!
    return {
      category: filenameMatch.category,
      confidence: 0.90,
      label: filenameMatch.label
    };
  }

  // 2. Heavy classification: Client-side AI Vision model
  try {
    onStatusChange?.("Démarrage de l'IA WAYCAN-Vision...");
    const model = await initTensorFlow();
    
    if (!model) {
      throw new Error("Could not initialize TensorFlow model");
    }

    onStatusChange?.("Analyse visuelle de l'image...");
    
    // Create an image element to feed to TensorFlow
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      
      img.onload = async () => {
        try {
          const predictions = await model.classify(img);
          console.log('MobileNet Predictions:', predictions);

          if (predictions && predictions.length > 0) {
            // Find best matching category in our maps
            for (const pred of predictions) {
              const className = pred.className.toLowerCase();
              
              for (const [category, keywords] of Object.entries(KEYWORD_MAPS)) {
                for (const keyword of keywords) {
                  if (className.includes(keyword)) {
                    resolve({
                      category,
                      confidence: Math.round(pred.probability * 100) / 100,
                      label: `IA : ${pred.className} (${Math.round(pred.probability * 100)}%)`
                    });
                    return;
                  }
                }
              }
            }

            // If no specific match, default to first prediction classification
            const bestPred = predictions[0];
            // Simple generic fallbacks
            let fallbackCat = 'electronique'; // Default
            if (bestPred.className.includes('dog') || bestPred.className.includes('cat') || bestPred.className.includes('animal')) {
              fallbackCat = 'maison'; // Pets under house/home
            }

            resolve({
              category: fallbackCat,
              confidence: 0.50,
              label: `IA : ${bestPred.className} (Générique)`
            });
          } else {
            resolve({
              category: 'electronique',
              confidence: 0.30,
              label: 'Catégorie par défaut'
            });
          }
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = (err) => {
        reject(err);
      };
    });

  } catch (error) {
    console.error("Vision AI error, using default:", error);
    // Ultimate fallback if TFJS fails (e.g. offline or CDN block)
    return {
      category: 'electronique',
      confidence: 0.40,
      label: 'Détection par défaut (Électronique)'
    };
  }
}
