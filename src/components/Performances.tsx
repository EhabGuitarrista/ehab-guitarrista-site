import { Play } from "lucide-react";
import { useCMSContent } from "@/hooks/useCMSContent";
import YouTubeEmbed from "./YouTubeEmbed";

const Performances = () => {
  const { content } = useCMSContent();

  // Use videos from CMS
  const videos = content.videos.performances;

  return (
    <section id="performances" className="section-padding bg-background">
      <div className="container-max">
        {/* Performance Videos */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow text-center mb-16">
            Performance Videos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {videos.map((video, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden group">
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  {video.file ? (
                    // Check if it's a YouTube URL
                    video.file.includes('youtube.com') || video.file.includes('youtu.be') ? (
                      <YouTubeEmbed
                        url={video.file}
                        title={video.title || "Performance Video"}
                        className="w-full h-full"
                      />
                    ) : (
                      <video
                        src={video.file}
                        controls
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
                    )
                  ) : (
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{video.title}</h3>
                  <p className="text-muted-foreground">{video.description || "Performance video"}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dynamic Performance Photos */}
          {content.performanceImages && content.performanceImages.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-playfair font-bold text-center text-foreground mb-8">
                Live Performance Moments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {content.performanceImages.map((item, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image}
                        alt={item.alt}
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Performances & Tours */}
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow text-center mb-6">
            Performances & Tours
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto font-inter">
            From coast to coast, experience the passion and artistry that has captivated 
            audiences across Canada's most prestigious venues and festivals.
          </p>
          
        {/* Event Posters */}
        <div className="mb-20">
          <h3 className="text-2xl font-playfair font-bold text-center text-foreground mb-8">
            {content.upcomingEventsTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.upcomingEvents && content.upcomingEvents.length > 0 ? (
              content.upcomingEvents.map((event, index) => (
                <div key={index} className="bg-card border border-border rounded-lg overflow-hidden group">
                  <div className="aspect-[3/4] bg-muted overflow-hidden">
                    <img 
                      src={event.image}
                      alt={event.alt || `${event.title} event poster`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))
            ) : (
              // Fallback to default events if CMS data is not available
              <>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-muted overflow-hidden">
                    <img 
                      src="/lovable-uploads/b385d23d-aa6f-4d0a-a0d5-b5adde069a09.png"
                      alt="August 8th Ehab Guitarrista Ensemble performance poster"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-muted overflow-hidden">
                    <img 
                      src="/lovable-uploads/84083fd4-89a9-4ca6-8197-ae74c3f952f2.png"
                      alt="Lorca Night event poster"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-muted overflow-hidden">
                    <img 
                      src="/lovable-uploads/34f4cef6-dd7e-425d-9bc2-c31f848591c1.png"
                      alt="Inspired by Spain event poster"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* This section can be expanded with upcoming shows, past performances, etc. */}
        <div className="text-center">
          <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
              {content.bookExperience?.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {content.bookExperience?.description}
            </p>
            <button
              className="btn-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {content.bookExperience?.buttonText}
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Performances;