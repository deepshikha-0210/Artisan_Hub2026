import { useState, useRef, useEffect, useCallback } from "react";
import { Smartphone, Move, Check, ArrowRight, X, Camera, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import arPreviewImg from "@/assets/ar-preview.jpg";
import potteryImg from "@/assets/pottery.jpg";
import woodcraftImg from "@/assets/woodcraft.jpg";
import metalartImg from "@/assets/metalart.jpg";

const products = [
  { id: 1, name: "Terracotta Vase", image: potteryImg },
  { id: 2, name: "Temple Sculpture", image: woodcraftImg },
  { id: 3, name: "Brass Peacock", image: metalartImg },
];

const steps = [
  {
    number: "01",
    title: "Select a product",
    description: "Browse our collection and choose a piece",
    icon: Smartphone,
  },
  {
    number: "02",
    title: "Open AR viewer",
    description: "Allow camera access to see products in your space",
    icon: Camera,
  },
  {
    number: "03",
    title: "Place in your space",
    description: "Drag and resize the product to fit perfectly",
    icon: Check,
  },
];

const ARTryOn = () => {
  const [isAROpen, setIsAROpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [productPosition, setProductPosition] = useState({ x: 50, y: 50 });
  const [productScale, setProductScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      setCameraStream(stream);
      setIsCameraMode(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Unable to access camera. Please allow camera permissions.");
      setIsCameraMode(false);
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraMode(false);
  }, [cameraStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  // Set video source when stream changes
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const handleClose = () => {
    stopCamera();
    setIsAROpen(false);
    setProductPosition({ x: 50, y: 50 });
    setProductScale(1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setProductPosition({ 
      x: Math.max(10, Math.min(90, x)), 
      y: Math.max(10, Math.min(90, y)) 
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setProductPosition({ 
      x: Math.max(10, Math.min(90, x)), 
      y: Math.max(10, Math.min(90, y)) 
    });
  };

  const handleZoomIn = () => {
    setProductScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setProductScale((prev) => Math.max(prev - 0.2, 0.3));
  };

  const handleReset = () => {
    setProductPosition({ x: 50, y: 50 });
    setProductScale(1);
  };

  return (
    <>
      <section id="ar-tryon" className="section-padding bg-background">
        <div className="container-artisan">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              <h2 className="heading-section text-foreground mb-6">
                AR Try-On Experience
              </h2>
              <p className="text-body mb-10">
                See how our handcrafts look in your space before making a purchase. 
                Our AR technology uses your camera to let you visualize products in real-time.
              </p>

              {/* Steps */}
              <div className="space-y-6 mb-10">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className="flex items-start gap-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-semibold text-primary/60 tracking-wider">
                          STEP {step.number}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-medium text-foreground mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="bg-primary hover:bg-sage-dark text-primary-foreground group"
                onClick={() => setIsAROpen(true)}
              >
                <Camera className="mr-2 h-5 w-5" />
                Try AR Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right - Preview Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={arPreviewImg}
                  alt="AR Try-On Preview"
                  className="w-full h-auto"
                />
                {/* Floating UI Elements */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-soft">
                  <span className="text-xs font-medium text-primary">📷 Camera AR Mode</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-primary text-white rounded-lg px-4 py-2 shadow-soft">
                  <span className="text-sm font-medium">Drag to Place</span>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-terra/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* AR Modal */}
      {isAROpen && (
        <div className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-background rounded-3xl shadow-elevated max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <div>
                <h3 className="font-serif text-xl font-semibold">AR Try-On Experience</h3>
                <p className="text-sm text-muted-foreground">
                  {isCameraMode ? "Drag the product to place it in your space" : "Choose a mode to start"}
                </p>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Product Selector */}
              <div className="md:w-64 p-4 border-b md:border-b-0 md:border-r border-border bg-secondary/30 flex-shrink-0 overflow-y-auto">
                <p className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider">SELECT PRODUCT</p>
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`flex-shrink-0 flex items-center gap-3 p-3 rounded-xl transition-all ${
                        selectedProduct.id === product.id 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-card hover:bg-secondary"
                      }`}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="text-sm font-medium whitespace-nowrap">{product.name}</span>
                    </button>
                  ))}
                </div>

                {/* Controls */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider">CONTROLS</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomOut}
                      className="flex-1"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomIn}
                      className="flex-1"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Camera Toggle */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider">AR MODE</p>
                  {isCameraMode ? (
                    <Button
                      variant="outline"
                      onClick={stopCamera}
                      className="w-full"
                    >
                      Switch to Demo View
                    </Button>
                  ) : (
                    <Button
                      onClick={startCamera}
                      className="w-full bg-primary hover:bg-sage-dark text-primary-foreground"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Use Camera
                    </Button>
                  )}
                </div>
              </div>

              {/* AR View */}
              <div className="flex-1 relative overflow-hidden">
                <div 
                  ref={containerRef}
                  className="relative w-full h-full min-h-[400px] md:min-h-0 cursor-move select-none"
                  onMouseMove={handleMouseMove}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onTouchMove={handleTouchMove}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                >
                  {/* Camera Feed or Demo Image */}
                  {isCameraMode ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={arPreviewImg} 
                      alt="Demo living room"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Camera Error Message */}
                  {cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
                      <div className="bg-background rounded-2xl p-6 text-center max-w-sm mx-4">
                        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-foreground font-medium mb-2">Camera Access Required</p>
                        <p className="text-sm text-muted-foreground mb-4">{cameraError}</p>
                        <Button onClick={startCamera} className="bg-primary hover:bg-sage-dark">
                          Try Again
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Placed Product */}
                  <div 
                    className="absolute pointer-events-none transition-all duration-100"
                    style={{ 
                      left: `${productPosition.x}%`, 
                      top: `${productPosition.y}%`,
                      transform: `translate(-50%, -50%) scale(${productScale})`
                    }}
                  >
                    <div className="relative">
                      <img 
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-elevated"
                        style={{ 
                          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" 
                        }}
                      />
                      {/* Product shadow for realism */}
                      <div 
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground/20 rounded-full blur-md"
                        style={{ transform: `translateX(-50%) scaleX(${productScale})` }}
                      />
                    </div>
                  </div>

                  {/* AR Overlay */}
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                    {isCameraMode ? "Camera AR Active" : "Demo Mode"}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Selected: </span>
                    <span className="font-medium">{selectedProduct.name}</span>
                  </div>

                  {/* Drag hint */}
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground flex items-center gap-2">
                    <Move className="h-4 w-4" />
                    Drag to reposition
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between flex-shrink-0">
              <p className="text-sm text-muted-foreground hidden sm:block">
                {isCameraMode 
                  ? "Point your camera at where you want to place the product" 
                  : "Use camera mode for a real AR experience"
                }
              </p>
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-primary hover:bg-sage-dark text-primary-foreground"
                  onClick={handleClose}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ARTryOn;
