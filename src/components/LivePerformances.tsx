import { useState, useEffect, useRef } from "react";
import { Camera, X } from "lucide-react";
import { useVideoManager } from "@/hooks/useVideoManager";
import { useCMSContent } from "@/hooks/useCMSContent";

const LivePerformances = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const liveVideoRef = useVideoManager(false); // Disable autoplay
  const { content } = useCMSContent();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            if (iframe && iframe.src) {
              const url = new URL(iframe.src);
              if (!url.searchParams.has('autoplay')) {
                url.searchParams.set('autoplay', '1');
                url.searchParams.set('muted', '1');
                iframe.src = url.toString();
              }
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Use CMS data for performance photos
  const performancePhotos = content.performanceImages.map(item => ({
    url: item.image,
    title: item.title,
    description: item.description
  })) || [];

  const allPhotos = [...performancePhotos];

  return (
    <section id="gallery" className="py-12 bg-background">
      <div className="container-max">
        {content.livePerformanceMoments?.title && (
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-foreground mb-6">
            {content.livePerformanceMoments.title}
          </h2>
        )}

        {/* Featured Collaboration Video */}
        {content.videos.billBourneMainPage.file ? (
          <div className="mb-10" ref={videoRef}>
            <h3 className="text-lg font-playfair font-medium text-center text-foreground mb-6">
              {content.videos.billBourneMainPage.title}
            </h3>
            <div className="flex justify-center">
              <div className="w-full px-0 md:px-4">
                <div className="w-full max-w-none md:max-w-5xl mx-auto">
                  <video 
                    ref={liveVideoRef}
                    className="w-full rounded-none md:rounded-lg object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    style={{ aspectRatio: '16/9', minHeight: '300px' }}
                  >
                    <source src={content.videos.billBourneMainPage.file} type="video/quicktime" />
                    <source src={content.videos.billBourneMainPage.file} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-10" ref={videoRef}>
            <div className="flex justify-center">
              <div className="w-full px-0 md:px-4">
                <div className="w-full max-w-none md:max-w-5xl mx-auto">
                  <div className="bg-card border border-border rounded-lg overflow-hidden w-full flex items-center justify-center" style={{ aspectRatio: '16/9', minHeight: '300px' }}>
                    <div className="text-center text-muted-foreground">
                      <p className="text-lg">No performance video uploaded</p>
                      <p className="text-sm">Upload a video in the CMS to display here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 px-3 md:px-0">
          {allPhotos.map((photo, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-1">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={allPhotos[selectedImage].url}
                alt={allPhotos[selectedImage].title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 rounded-b-lg">
                <h3 className="text-xl font-semibold mb-1">{allPhotos[selectedImage].title}</h3>
                <p className="text-white/80">{allPhotos[selectedImage].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LivePerformances;