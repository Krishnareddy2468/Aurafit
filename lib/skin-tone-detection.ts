/**
 * Skin Tone Detection
 * Extracts skin color from facial regions and converts RGB to CIELAB
 */

import { type NormalizedLandmark } from '@/lib/face-detection';
import colorConvert from 'color-convert';

export type SkinTone = {
  rgb: [number, number, number];
  lab: [number, number, number];
  category: 'very-light' | 'light' | 'medium' | 'tan' | 'brown' | 'dark';
  hex: string;
};

/**
 * Sample pixels from facial regions to get skin tone
 * Samples from cheeks, forehead, and nose bridge
 */
export function extractSkinTone(
  video: HTMLVideoElement,
  landmarks: NormalizedLandmark[]
): SkinTone {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  // Sample regions: cheeks (330, 101), forehead (10), nose bridge (168)
  const samplePoints = [330, 101, 10, 168, 234, 454];
  const colors: number[][] = [];

  for (const idx of samplePoints) {
    const landmark = landmarks[idx];
    const x = Math.floor(landmark.x * canvas.width);
    const y = Math.floor(landmark.y * canvas.height);

    // Sample 5x5 pixel region around landmark
    const imageData = ctx.getImageData(x - 2, y - 2, 5, 5);
    const avgColor = averageColor(imageData.data);
    colors.push(avgColor);
  }

  // Average all sampled colors
  const avgR = Math.round(colors.reduce((sum, c) => sum + c[0], 0) / colors.length);
  const avgG = Math.round(colors.reduce((sum, c) => sum + c[1], 0) / colors.length);
  const avgB = Math.round(colors.reduce((sum, c) => sum + c[2], 0) / colors.length);

  const rgb: [number, number, number] = [avgR, avgG, avgB];
  const lab = colorConvert.rgb.lab(rgb);
  const category = categorizeSkinTone(lab);
  const hex = `#${colorConvert.rgb.hex(rgb)}`;

  return { rgb, lab, category, hex };
}

/**
 * Calculate average color from pixel data
 */
function averageColor(data: Uint8ClampedArray): number[] {
  let r = 0, g = 0, b = 0;
  const pixelCount = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  return [r / pixelCount, g / pixelCount, b / pixelCount];
}

/**
 * Categorize skin tone based on CIELAB L* value (lightness)
 * L*: 0 (black) to 100 (white)
 */
function categorizeSkinTone(lab: number[]): SkinTone['category'] {
  const lightness = lab[0];

  if (lightness >= 80) return 'very-light';
  if (lightness >= 70) return 'light';
  if (lightness >= 60) return 'medium';
  if (lightness >= 50) return 'tan';
  if (lightness >= 40) return 'brown';
  return 'dark';
}
