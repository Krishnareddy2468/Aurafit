import FaceScanner from "@/components/face-scanner"

export default function FaceScanPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">Face Analysis</h1>
          <p className="text-muted-foreground mt-2 text-base">
            Discover your skin tone and face shape to get personalized product recommendations
          </p>
        </div>
      </div>

      {/* Scanner */}
      <div className="container mx-auto px-4 py-12">
        <FaceScanner />
      </div>

      {/* Instructions */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 tracking-tight">How it works</h2>
          <div className="grid gap-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-medium">Allow camera access</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Start Face Scan" and grant camera permissions when prompted
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-medium">Position your face</h3>
                <p className="text-sm text-muted-foreground">
                  Look directly at the camera in good lighting. The scan takes about 3-5 seconds
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-medium">Get your results</h3>
                <p className="text-sm text-muted-foreground">
                  View your skin tone, face shape, and personalized recommendations
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Privacy:</strong> All analysis happens locally in your browser. 
              No images are uploaded or stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
