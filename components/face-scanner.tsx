"use client";

/**
 * Face Scanner Component
 * Main component for face detection with webcam
 */

import { useEffect, useRef, useState } from 'react';
import { Camera, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { initializeFaceLandmarker, detectFaceLandmarks, disposeFaceLandmarker } from '@/lib/face-detection';
import { extractSkinTone, type SkinTone } from '@/lib/skin-tone-detection';
import { detectFaceShape, type FaceGeometry } from '@/lib/face-shape-detection';

type ScanState = 'idle' | 'initializing' | 'scanning' | 'complete' | 'error';

export type ScanResults = {
  skinTone: SkinTone;
  faceGeometry: FaceGeometry;
};

export default function FaceScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const [state, setState] = useState<ScanState>('idle');
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<ScanResults | null>(null);
  const [progress, setProgress] = useState(0);

  // Start camera and scanning
  const startScan = async () => {
    try {
      setState('initializing');
      setError('');
      setProgress(0);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Initialize MediaPipe FaceMesh
      await initializeFaceLandmarker();

      setState('scanning');
      setProgress(20);

      // Start detection loop
      processFrame();

    } catch (err) {
      console.error('Error starting scan:', err);
      setError(
        err instanceof Error && err.name === 'NotAllowedError'
          ? 'Camera access denied. Please allow camera permissions.'
          : 'Failed to initialize camera. Please try again.'
      );
      setState('error');
    }
  };

  // Process video frames for detection
  const processFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || state === 'complete') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame to canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // Detect landmarks (async)
    const timestamp = performance.now();
    const landmarks = await detectFaceLandmarks(video, timestamp);

    if (landmarks && landmarks.length === 468) {
      setProgress(prev => Math.min(prev + 5, 90));

      // Draw landmarks on canvas for visual feedback
      drawLandmarks(ctx, landmarks, canvas.width, canvas.height);

      // After 2 seconds of detection, capture results
      if (progress >= 80) {
        captureResults(video, landmarks);
        return;
      }
    }

    // Continue loop
    animationRef.current = window.requestAnimationFrame(() => processFrame());
  };

  // Capture final results
  const captureResults = async (video: HTMLVideoElement, landmarks: any[]) => {
    try {
      const skinTone = extractSkinTone(video, landmarks);
      const faceGeometry = detectFaceShape(landmarks);

      setResults({ skinTone, faceGeometry });
      setProgress(100);
      setState('complete');

      // Stop camera
      stopCamera();

    } catch (err) {
      console.error('Error capturing results:', err);
      setError('Failed to analyze face. Please try again.');
      setState('error');
    }
  };

  // Draw landmarks for visual feedback
  const drawLandmarks = (
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    width: number,
    height: number
  ) => {
    ctx.fillStyle = '#00ff00';
    
    // Draw key facial points
    const keyPoints = [10, 152, 234, 454, 127, 356, 172, 397];
    
    for (const idx of keyPoints) {
      const landmark = landmarks[idx];
      const x = landmark.x * width;
      const y = landmark.y * height;
      
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Reset scan
  const resetScan = () => {
    stopCamera();
    setState('idle');
    setResults(null);
    setProgress(0);
    setError('');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      disposeFaceLandmarker();
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Video Preview */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        {state === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Camera className="w-16 h-16 mx-auto text-gray-400" />
              <p className="text-gray-400">Ready to scan your face</p>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${state === 'idle' ? 'hidden' : ''}`}
          playsInline
          muted
        />

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full ${state !== 'scanning' ? 'hidden' : ''}`}
        />

        {/* Progress Overlay */}
        {state === 'scanning' && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <div className="flex-1">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-white text-sm font-medium">{progress}%</span>
              </div>
              <p className="text-white text-sm mt-2">Analyzing your face...</p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {state === 'error' && error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Controls */}
      <div className="flex gap-4 justify-center">
        {state === 'idle' && (
          <Button 
            onClick={startScan} 
            size="lg" 
            className="gap-2 bg-[#0d9488] hover:bg-[#0d9488]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Camera className="w-5 h-5" />
            Start Face Scan
          </Button>
        )}

        {state === 'initializing' && (
          <Button disabled size="lg" className="gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Initializing...
          </Button>
        )}

        {(state === 'complete' || state === 'error') && (
          <Button onClick={resetScan} variant="outline" size="lg">
            Scan Again
          </Button>
        )}
      </div>

      {/* Results Display */}
      {state === 'complete' && results && (
        <ScanResultsDisplay results={results} />
      )}
    </div>
  );
}

// Results Display Component
function ScanResultsDisplay({ results }: { results: ScanResults }) {
  const { skinTone, faceGeometry } = results;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Skin Tone */}
      <div className="bg-card rounded-lg border p-6 space-y-4">
        <h3 className="text-lg font-semibold">Skin Tone</h3>
        
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            style={{ backgroundColor: skinTone.hex }}
          />
          <div className="space-y-1">
            <p className="font-medium capitalize">{skinTone.category.replace('-', ' ')}</p>
            <p className="text-sm text-muted-foreground">{skinTone.hex}</p>
            <p className="text-xs text-muted-foreground">
              RGB: {skinTone.rgb.join(', ')}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            CIELAB: L*{skinTone.lab[0].toFixed(1)} a*{skinTone.lab[1].toFixed(1)} b*{skinTone.lab[2].toFixed(1)}
          </p>
        </div>
      </div>

      {/* Face Shape */}
      <div className="bg-card rounded-lg border p-6 space-y-4">
        <h3 className="text-lg font-semibold">Face Shape</h3>
        
        <div className="space-y-3">
          <div>
            <p className="text-2xl font-bold capitalize">{faceGeometry.shape}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Width to Height Ratio: {faceGeometry.measurements.widthToHeightRatio.toFixed(2)}
            </p>
          </div>

          <div className="pt-2 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Forehead</span>
              <span className="font-medium">{(faceGeometry.measurements.foreheadWidth * 100).toFixed(1)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cheekbone</span>
              <span className="font-medium">{(faceGeometry.measurements.cheekboneWidth * 100).toFixed(1)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Jawline</span>
              <span className="font-medium">{(faceGeometry.measurements.jawlineWidth * 100).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
