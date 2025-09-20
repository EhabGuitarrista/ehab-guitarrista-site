import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Play } from "lucide-react";
import { useVideoManager } from "@/hooks/useVideoManager";
import { useCMSContent } from "@/hooks/useCMSContent";
import { useState, useEffect } from "react";

interface PerformanceVideo {
  title: string;
  description: string;
  video: string;
  thumbnail?: string;
  order: number;
  featured: boolean;
}

// Dynamic Video Section Component
const DynamicVideoSection = ({ video, index }: { video: PerformanceVideo; index: number }) => {
  const videoRef = useVideoManager(false);
  
  // Determine aspect ratio based on video content or index
  const isWideVideo = video.featured || index === 0; // First video or featured videos are wide
  const aspectRatio = isWideVideo ? '16/9' : '9/16';
  const maxWidth = isWideVideo ? 'max-w-5xl' : 'max-w-md';
  const minHeight = isWideVideo ? '300px' : '400px';
  const maxHeight = isWideVideo ? 'none' : '600px';

  return (
    <div className="w-full">
      <h3 className="text-xl font-playfair font-semibold text-center text-foreground mb-8">
        {video.title}
      </h3>
      {video.description && (
        <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
          {video.description}
        </p>
      )}
      <div className={`w-full ${maxWidth} mx-auto`}>
        <video 
          ref={videoRef}
          className="w-full rounded-lg object-cover"
          controls
          playsInline
          preload="metadata"
          style={{ 
            aspectRatio: aspectRatio, 
            minHeight: minHeight,
            maxHeight: maxHeight
          }}
        >
          <source src={video.video} type="video/quicktime" />
          <source src={video.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const Performances = () => {
  const { content } = useCMSContent();
  const [performanceVideos, setPerformanceVideos] = useState<PerformanceVideo[]>([]);
  
  // Load performance videos from CMS (both fixed and dynamic)
  useEffect(() => {
    const loadPerformanceVideos = async () => {
      const videos: PerformanceVideo[] = [];
      let orderCounter = 100; // Start dynamic videos at order 100+ to avoid conflicts
      
      // 1. Load from existing fixed video fields (current working system)
      if (content.videos?.billBournePerformances?.file) {
        videos.push({
          title: content.videos.billBournePerformances.title,
          description: "Collaborative performance with renowned artist",
          video: content.videos.billBournePerformances.file,
          order: 1,
          featured: true
        });
      }
      
      if (content.videos?.notreDame?.file) {
        videos.push({
          title: content.videos.notreDame.title,
          description: "Intimate acoustic performance in historic chapel",
          video: content.videos.notreDame.file,
          order: 2,
          featured: false
        });
      }
      
      if (content.videos?.piano?.file) {
        videos.push({
          title: content.videos.piano.title,
          description: "Multi-instrumental showcase",
          video: content.videos.piano.file,
          order: 3,
          featured: false
        });
      }
      
      if (content.videos?.ensemble?.file) {
        videos.push({
          title: content.videos.ensemble.title,
          description: "Full band performance with multiple instruments",
          video: content.videos.ensemble.file,
          order: 4,
          featured: false
        });
      }
      
      if (content.videos?.oud?.file) {
        videos.push({
          title: content.videos.oud.title,
          description: "Traditional Middle Eastern instrument performance",
          video: content.videos.oud.file,
          order: 5,
          featured: false
        });
      }
      
      if (content.videos?.video8?.file) {
        videos.push({
          title: content.videos.video8.title,
          description: "Additional performance video",
          video: content.videos.video8.file,
          order: 8,
          featured: false
        });
      }
      
      if (content.videos?.video9?.file) {
        videos.push({
          title: content.videos.video9.title,
          description: "Additional performance video",
          video: content.videos.video9.file,
          order: 9,
          featured: false
        });
      }
      
      if (content.videos?.video10?.file) {
        videos.push({
          title: content.videos.video10.title,
          description: "Additional performance video",
          video: content.videos.video10.file,
          order: 10,
          featured: false
        });
      }
      
      // 2. Load from CMS-managed performance videos (performanceVideo1, performanceVideo2, etc.)
      if (content.videos) {
        Object.keys(content.videos).forEach((key) => {
          if (key.startsWith('performanceVideo') && content.videos[key]?.file) {
            const videoIndex = parseInt(key.replace('performanceVideo', '')) || orderCounter;
            videos.push({
              title: content.videos[key].title || `Performance Video ${videoIndex}`,
              description: content.videos[key].description || '',
              video: content.videos[key].file,
              order: videoIndex + 50, // Start dynamic videos at order 50+ to avoid conflicts
              featured: false
            });
          }
        });
      }
      
      // 3. Load from additional videos JSON (CMS managed) - keeping for backward compatibility
      try {
        const response = await fetch('/data/additional-videos.json');
        if (response.ok) {
          const additionalVideosData = await response.json();
          if (additionalVideosData.videos && Array.isArray(additionalVideosData.videos)) {
            for (const videoData of additionalVideosData.videos) {
              if (videoData.title && videoData.video) {
                videos.push({
                  title: videoData.title,
                  description: videoData.description || '',
                  video: videoData.video,
                  thumbnail: videoData.thumbnail,
                  order: videoData.order || orderCounter++,
                  featured: videoData.featured || false
                });
              }
            }
          }
        }
      } catch (error) {
        console.log('No additional videos found');
      }
      
      // Sort by order
      videos.sort((a, b) => a.order - b.order);
      setPerformanceVideos(videos);
    };
    
    loadPerformanceVideos();
  }, [content.videos]);


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-6 pb-8 bg-background">
          <div className="container-max text-center">
            {content.performancePage?.mainTitle && (
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-glow mb-8">
                {content.performancePage.mainTitle}
              </h1>
            )}
            {content.performancePage?.mainSubtitle && (
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto font-inter">
                {content.performancePage.mainSubtitle}
              </p>
            )}
            
            {/* Dynamic Performance Videos - Only show if videos exist */}
            {performanceVideos.length > 0 && (
              <div className="space-y-16">
                {performanceVideos.map((video, index) => (
                  <DynamicVideoSection 
                    key={`${video.title}-${index}`}
                    video={video}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Event Posters */}
        <section className="py-12 bg-background">
          <div className="container-max">
            {content.performancePage?.eventsTitle && (
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow text-center mb-6">
                {content.performancePage.eventsTitle}
              </h2>
            )}
            {content.performancePage?.eventsDescription && (
              <p className="text-lg text-muted-foreground text-center mb-10 max-w-3xl mx-auto font-inter">
                {content.performancePage.eventsDescription}
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container-max">
              {content.upcomingEvents && content.upcomingEvents.length > 0 ? (
                content.upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="aspect-[3/4] bg-muted overflow-hidden">
                      <img 
                        src={event.image}
                        alt={event.alt || `${event.title} event poster`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-foreground text-center">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground">
                  No upcoming events available.
                </div>
              )}
            </div>
            
            <div className="text-center mt-10">
              <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  {content.bookExperience?.title || "Book Your Experience"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {content.bookExperience?.description || "Ready to bring the magic of flamenco guitar to your event? Let's create something extraordinary together."}
                </p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    window.location.href = '#/';
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                  }}
                >
                  {content.bookExperience?.buttonText || "Schedule Consultation"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Performances;