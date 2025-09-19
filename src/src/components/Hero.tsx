import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useCMSContent } from "@/hooks/useCMSContent";

const Hero = () => {
  const { content, loading } = useCMSContent();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <section id="home" className="min-h-screen md:min-h-[100vh] flex items-center justify-center relative overflow-hidden pt-20 md:pt-16 pb-16 md:pb-24">
      {/* Mobile background - positioned lower */}
      <div className="absolute top-16 left-0 right-0 bottom-0 bg-background md:hidden">
        {content.hero.image && (
          <img 
            src={content.hero.image} 
            alt="Ehab Guitarrista professional portrait with guitar on black background"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-background/30"></div>
        {/* Bokeh circles */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-primary/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/2 w-28 h-28 bg-primary/15 rounded-full blur-2xl"></div>
        <div className="absolute top-2/3 left-1/6 w-18 h-18 bg-primary/20 rounded-full blur-xl"></div>
      </div>
      
      {/* Desktop background - original positioning */}
      <div className="absolute inset-0 top-16 bg-background hidden md:block">
        {content.hero.image && (
          <img 
            src={content.hero.image} 
            alt="Ehab Guitarrista professional portrait with guitar on black background"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-background/30"></div>
        {/* Bokeh circles */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-primary/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/2 w-28 h-28 bg-primary/15 rounded-full blur-2xl"></div>
        <div className="absolute top-2/3 left-1/6 w-18 h-18 bg-primary/20 rounded-full blur-xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 container-max pt-20">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-primary text-glow mb-6 animate-fade-in opacity-70 md:opacity-100">
          {content.hero.title}
        </h1>
        <h2 className="text-xl md:text-2xl text-foreground md:text-muted-foreground mb-8 font-inter animate-fade-in opacity-90 md:opacity-100">
          {content.hero.subtitle}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="btn-primary transform hover:scale-105 transition-all duration-300 animate-fade-in"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }}
          >
            <Calendar className="mr-2 h-5 w-5" />
            {content.hero.bookButtonText}
          </Button>
          <Button 
            className="btn-outline transform hover:scale-105 transition-all duration-300 animate-fade-in"
            onClick={() => {
              document.getElementById('music')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
              // Trigger auto-play after scroll
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('autoPlayMusic'));
              }, 800);
            }}
          >
            {content.hero.listenButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;