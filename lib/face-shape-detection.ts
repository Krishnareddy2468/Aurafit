/**
 * Face Shape Detection
 * Analyzes facial geometry to determine face shape
 */

import { type NormalizedLandmark } from '@/lib/face-detection';

export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'oblong';

export type FaceGeometry = {
  shape: FaceShape;
  measurements: {
    faceWidth: number;
    faceHeight: number;
    foreheadWidth: number;
    cheekboneWidth: number;
    jawlineWidth: number;
    widthToHeightRatio: number;
  };
};

/**
 * Detect face shape from landmarks
 * Uses facial proportions and ratios to classify
 */
export function detectFaceShape(landmarks: NormalizedLandmark[]): FaceGeometry {
  // Key landmark indices for measurements
  const topOfHead = landmarks[10];
  const chinBottom = landmarks[152];
  
  // Forehead width (temple to temple)
  const leftTemple = landmarks[127];
  const rightTemple = landmarks[356];
  
  // Cheekbone width (widest part of face)
  const leftCheek = landmarks[234];
  const rightCheek = landmarks[454];
  
  // Jawline width
  const leftJaw = landmarks[172];
  const rightJaw = landmarks[397];

  // Calculate distances
  const faceHeight = distance(topOfHead, chinBottom);
  const foreheadWidth = distance(leftTemple, rightTemple);
  const cheekboneWidth = distance(leftCheek, rightCheek);
  const jawlineWidth = distance(leftJaw, rightJaw);
  const faceWidth = Math.max(foreheadWidth, cheekboneWidth, jawlineWidth);
  
  const widthToHeightRatio = faceWidth / faceHeight;

  // Determine face shape based on proportions
  const shape = classifyFaceShape({
    faceWidth,
    faceHeight,
    foreheadWidth,
    cheekboneWidth,
    jawlineWidth,
    widthToHeightRatio
  });

  return {
    shape,
    measurements: {
      faceWidth,
      faceHeight,
      foreheadWidth,
      cheekboneWidth,
      jawlineWidth,
      widthToHeightRatio
    }
  };
}

/**
 * Calculate Euclidean distance between two landmarks
 */
function distance(p1: NormalizedLandmark, p2: NormalizedLandmark): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = (p1.z || 0) - (p2.z || 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Classify face shape based on measurements
 */
function classifyFaceShape(measurements: Omit<FaceGeometry['measurements'], 'shape'>): FaceShape {
  const {
    foreheadWidth,
    cheekboneWidth,
    jawlineWidth,
    widthToHeightRatio
  } = measurements;

  // Normalize widths relative to cheekbone (typically widest)
  const foreheadRatio = foreheadWidth / cheekboneWidth;
  const jawRatio = jawlineWidth / cheekboneWidth;

  // Round: Width ≈ Height, all widths similar
  if (widthToHeightRatio > 0.85 && Math.abs(foreheadRatio - jawRatio) < 0.1) {
    return 'round';
  }

  // Square: Width ≈ Height, strong jawline
  if (widthToHeightRatio > 0.8 && jawRatio > 0.9) {
    return 'square';
  }

  // Heart: Wide forehead, narrow jaw
  if (foreheadRatio > jawRatio && jawRatio < 0.85) {
    return 'heart';
  }

  // Diamond: Wide cheekbones, narrow forehead and jaw
  if (foreheadRatio < 0.9 && jawRatio < 0.9) {
    return 'diamond';
  }

  // Oblong: Height > Width
  if (widthToHeightRatio < 0.75) {
    return 'oblong';
  }

  // Default: Oval (balanced proportions)
  return 'oval';
}

/**
 * Get face shape description for UI display
 */
export function getFaceShapeDescription(shape: FaceShape): string {
  const descriptions: Record<FaceShape, string> = {
    oval: 'Balanced proportions with gently rounded edges. Forehead is slightly wider than chin.',
    round: 'Equal width and length with soft, curved lines. Full cheeks and rounded chin.',
    square: 'Angular jawline with similar width across forehead, cheeks, and jaw.',
    heart: 'Wider forehead tapering to a narrow, pointed chin. High cheekbones.',
    diamond: 'Narrow forehead and jaw with wide, high cheekbones.',
    oblong: 'Longer than it is wide with a straight cheek line and rounded chin.'
  };

  return descriptions[shape];
}
