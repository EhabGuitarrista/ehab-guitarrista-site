import { useState } from "react";
import { Camera, X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const photos = [
    {
      url: "/lovable-uploads/29148ff4-7ba7-4db9-95a5-3be951bd3593.png",
      title: "Live Performance",
      description: "Ehab performing in an elegant venue setting"
    },
    {
      url: "/lovable-uploads/a4881041-d7c1-4c38-a226-1528d78cd2e7.png", 
      title: "Flamenco Collaboration",
      description: "Performance with flamenco dancer and ensemble"
    },
    {
      url: "/lovable-uploads/68242477-a1d5-423e-835d-65e8d78356e2.png",
      title: "Guitar Collection",
      description: "Professional guitar collection for various performances"
    },
    {
      url: "/lovable-uploads/671be344-9a00-42cd-bf9e-044efec21e64.png",
      title: "Concert Performance",
      description: "Ehab in performance attire with sunglasses showcasing his distinctive style"
    },
    {
      url: "/lovable-uploads/178b603a-1fa3-4eab-8e3d-fd9273218278.png",
      title: "Artistic Portrait",
      description: "Black and white artistic portrait capturing the musician's intensity"
    },
    {
      url: "/lovable-uploads/683ccb34-9bec-4ea7-88f2-d1b0aca72524.png",
      title: "Studio Session",
      description: "Ehab in white shirt during an intimate acoustic session"
    }
  ];

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-max">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow text-center mb-6">
          Photo Gallery
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto font-inter">
          Experience the artistry and passion through moments captured during performances 
          and behind the scenes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
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
                src={photos[selectedImage].url}
                alt={photos[selectedImage].title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 rounded-b-lg">
                <h3 className="text-xl font-semibold mb-1">{photos[selectedImage].title}</h3>
                <p className="text-white/80">{photos[selectedImage].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;