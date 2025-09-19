import { useEffect, useRef } from 'react';

export const useVideoManager = (enableAutoplay = true) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      // Pause all other videos when this one starts
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });

      // Pause all audio elements when video starts
      const allAudio = document.querySelectorAll('audio');
      allAudio.forEach((audioElement) => {
        if (!audioElement.paused) {
          audioElement.pause();
          // Trigger custom event to update audio player UI
          window.dispatchEvent(new CustomEvent('videoPausedAudio'));
        }
      });
    };

    // Set up intersection observer for autoplay
    let observer: IntersectionObserver | null = null;
    if (enableAutoplay) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && video.paused) {
              try {
                // First try playing with sound
                video.muted = false;
                await video.play();
              } catch (error) {
                try {
                  // If that fails, try with muted
                  video.muted = true;
                  await video.play();
                } catch (mutedError) {
                  // Both failed, that's okay
                  console.log('Video autoplay failed for:', video.src);
                }
              }
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(video);
    }

    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('play', handlePlay);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [enableAutoplay]);

  return videoRef;
};