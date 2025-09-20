import { Calendar, MapPin, Users, Award } from "lucide-react";
import ehabHeadshot from "@/assets/ehab-headshot.jpg";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect, useRef } from "react";
import { useVideoManager } from "@/hooks/useVideoManager";
import { useCMSContent } from "@/hooks/useCMSContent";
import YouTubeEmbed from "./YouTubeEmbed";

const About = () => {
  const { content, loading } = useCMSContent();
  const [isExtendedBioOpen, setIsExtendedBioOpen] = useState(false);
  const videoRef = useVideoManager(true); // Keep autoplay for About section only
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Debug video source
  const videoSrc = content.videos?.aboutSection?.file;
  console.log('About video source:', videoSrc);
  console.log('Full video data:', content.videos?.aboutSection);
  console.log('Content loading state:', loading);

  return (
    <section id="about" className="bg-background -mt-20 pt-32 pb-16 md:pb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary text-glow">
          {content.about.title}
        </h2>
      </div>
      
      <div className="container-max px-6 pb-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Professional Video */}
          {content.videos?.aboutSection?.file ? (
            <div className="w-full">
              <div className="bg-card border border-border rounded-lg overflow-hidden w-full">
                {/* Check if it's a YouTube URL or regular video file */}
                {content.videos.aboutSection.file.includes('youtube.com') ||
                 content.videos.aboutSection.file.includes('youtu.be') ? (
                  <YouTubeEmbed
                    url={content.videos.aboutSection.file}
                    title="About Ehab Guitarrista"
                    className="w-full"
                  />
                ) : (
                  <video
                    key={content.videos.aboutSection.file}
                    ref={videoRef}
                    width="100%"
                    height="400"
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full aspect-video"
                    style={{ minHeight: '400px' }}
                    onError={(e) => console.error('About video error:', e)}
                  onLoadedData={() => console.log('About video loaded successfully')}
                  >
                    <source src={content.videos.aboutSection.file} type="video/quicktime" />
                    <source src={content.videos.aboutSection.file} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="bg-card border border-border rounded-lg overflow-hidden w-full flex items-center justify-center" style={{ minHeight: '400px' }}>
                <div className="text-center text-muted-foreground">
                  <p className="text-lg">No video uploaded</p>
                  <p className="text-sm">Upload a video in the CMS to display here</p>
                </div>
              </div>
            </div>
          )}
          
          {/* About Content */}
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-foreground font-medium">
              {content.about.mainDescription}
            </p>
            
            <p className="text-lg leading-relaxed text-foreground font-medium hidden md:block">
              {content.about.secondParagraph}
            </p>
            
            <p className="text-lg leading-relaxed text-foreground font-medium hidden md:block">
              {content.about.thirdParagraph}
            </p>
            
            <p className="text-lg leading-relaxed text-foreground font-medium hidden md:block">
              {content.about.fourthParagraph}
            </p>
          </div>
        </div>
        
        {/* Extended Bio */}
        <div className="mb-12">
          <Collapsible open={isExtendedBioOpen} onOpenChange={setIsExtendedBioOpen}>
            <CollapsibleTrigger className="flex items-center justify-center w-full bg-card border border-border rounded-lg p-4 text-foreground hover:bg-card/80 transition-colors">
              <span className="text-xl font-playfair font-semibold">Extended Biography</span>
              <span className="ml-2">{isExtendedBioOpen ? '−' : '+'}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                {content.about.extendedBio && (
                  <>
                    <div>
                      <h4 className="text-xl font-playfair font-bold text-foreground mb-3">{content.about.extendedBio.earlyLife.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {content.about.extendedBio.earlyLife.text}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-playfair font-bold text-foreground mb-3">{content.about.extendedBio.mentorship.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {content.about.extendedBio.mentorship.text}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-playfair font-bold text-foreground mb-3">{content.about.extendedBio.professional.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {content.about.extendedBio.professional.text}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-playfair font-bold text-foreground mb-3">{content.about.extendedBio.musicalPhilosophy.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {content.about.extendedBio.musicalPhilosophy.text}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stats-card">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-primary mb-1">{content.stats.yearsPerforming.number}</h3>
            <p className="text-muted-foreground">{content.stats.yearsPerforming.label}</p>
          </div>
          
          <div className="stats-card">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-primary mb-1">{content.stats.citiesToured.number}</h3>
            <p className="text-muted-foreground">{content.stats.citiesToured.label}</p>
          </div>
          
          <div className="stats-card">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-primary mb-1">{content.stats.showsPlayed.number}</h3>
            <p className="text-muted-foreground">{content.stats.showsPlayed.label}</p>
          </div>
          
          <div className="stats-card">
            <Award className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-primary mb-1">{content.stats.awardsWon.number}</h3>
            <p className="text-muted-foreground">{content.stats.awardsWon.label}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;