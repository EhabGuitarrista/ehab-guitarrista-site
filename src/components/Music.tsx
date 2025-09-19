import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useCMSContent } from "@/hooks/useCMSContent";

const Music = () => {
  const { content, loading } = useCMSContent();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = content.music?.tracks || [];

  // Ensure currentTrack is valid
  const validCurrentTrack = Math.max(0, Math.min(currentTrack, tracks.length - 1));

  useEffect(() => {
    if (validCurrentTrack !== currentTrack) {
      setCurrentTrack(validCurrentTrack);
    }
  }, [tracks.length, currentTrack, validCurrentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks[validCurrentTrack]) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      console.log('Audio can play:', tracks[validCurrentTrack]?.title);
    };

    const handlePlay = () => {
      // Pause all videos when audio starts playing
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach((video) => {
        if (!video.paused) {
          video.pause();
        }
      });
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
    };
  }, [validCurrentTrack, tracks]);

  // Listen for auto-play trigger from Hero button
  useEffect(() => {
    const handleAutoPlay = async () => {
      if (!isPlaying && audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error auto-playing music:', error);
        }
      }
    };

    const handleVideoPausedAudio = () => {
      // Update UI when video pauses audio
      setIsPlaying(false);
    };

    window.addEventListener('autoPlayMusic', handleAutoPlay);
    window.addEventListener('videoPausedAudio', handleVideoPausedAudio);
    
    return () => {
      window.removeEventListener('autoPlayMusic', handleAutoPlay);
      window.removeEventListener('videoPausedAudio', handleVideoPausedAudio);
    };
  }, [isPlaying]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const handleTrackSelect = (index: number) => {
    const audio = audioRef.current;
    const wasPlaying = isPlaying; // Remember if music was playing
    
    setCurrentTrack(index);
    setCurrentTime(0);
    
    if (audio) {
      audio.load(); // Load the new track
      
      if (wasPlaying) {
        // If music was playing, auto-play the new track once it's ready
        const playWhenReady = () => {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.error('Error auto-playing track:', error);
            setIsPlaying(false);
          });
          audio.removeEventListener('canplaythrough', playWhenReady);
        };
        
        audio.addEventListener('canplaythrough', playWhenReady);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const handleSkipBack = () => {
    if (validCurrentTrack > 0) {
      handleTrackSelect(validCurrentTrack - 1);
    }
  };

  const handleSkipForward = () => {
    if (validCurrentTrack < tracks.length - 1) {
      handleTrackSelect(validCurrentTrack + 1);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Show loading state
  if (loading) {
    return (
      <section id="music" className="section-padding bg-background py-24 md:py-32">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow mb-6">
            Loading Music...
          </h2>
        </div>
      </section>
    );
  }

  // Show empty state if no tracks or all tracks have empty files
  const hasValidTracks = tracks && tracks.length > 0 && tracks.some(track => track.file && track.file.trim() !== '');

  if (!tracks || tracks.length === 0 || !hasValidTracks) {
    return (
      <section id="music" className="section-padding bg-background py-24 md:py-32">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow mb-6">
            {content.music.title}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto font-inter">
            {content.music.subtitle}
          </p>
          <div className="bg-muted/20 rounded-lg p-8 max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-4">
              Music tracks will appear here once uploaded through the CMS.
            </p>
            <p className="text-sm text-muted-foreground">
              Visit the admin panel to add your musical compositions.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="music" className="section-padding bg-background py-24 md:py-32">
      <div className="container-max">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow text-center mb-6">
          {content.music.title}
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground text-center mb-16 max-w-4xl mx-auto font-inter">
          {content.music.subtitle}
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Audio Player */}
          <div className="audio-player">
            {tracks[validCurrentTrack]?.file && (
              <audio
                ref={audioRef}
                src={tracks[validCurrentTrack]?.file}
                preload="metadata"
              />
            )}
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <Volume2 className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-2 text-foreground">
              {tracks[validCurrentTrack]?.title}
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              {tracks[validCurrentTrack]?.description}
            </p>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div 
                className="w-full bg-muted rounded-full h-2 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-150"
                  style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="transition-all duration-300 transform hover:scale-110"
                onClick={handleSkipBack}
                disabled={validCurrentTrack === 0}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                onClick={handlePlayPause}
                className="bg-primary text-primary-foreground rounded-full w-12 h-12 p-0 transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="transition-all duration-300 transform hover:scale-110"
                onClick={handleSkipForward}
                disabled={validCurrentTrack === tracks.length - 1}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Featured Tracks */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-6 text-foreground">
              {content.music.featuredTracksTitle}
            </h3>
            
            <div className="space-y-3">
              {tracks.map((track, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                    validCurrentTrack === index
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => handleTrackSelect(index)}
                >
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant={validCurrentTrack === index && isPlaying ? "default" : "outline"}
                      className="rounded-full w-10 h-10 p-0 transition-all duration-300 transform hover:scale-110"
                    >
                      {validCurrentTrack === index && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{track.title}</h4>
                      <p className="text-sm text-muted-foreground">{track.description}</p>
                    </div>
                    
                    <span className="text-sm text-muted-foreground">
                      {validCurrentTrack === index && duration ? formatTime(duration) : "--:--"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;