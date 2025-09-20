import { useCMSContent } from "@/hooks/useCMSContent";
import { useVideoManager } from "@/hooks/useVideoManager";
import YouTubeEmbed from "./YouTubeEmbed";

const BannerVideo = () => {
  const { content, loading } = useCMSContent();
  const videoRef = useVideoManager(false); // No autoplay for banner video

  if (loading) {
    return null;
  }

  // Only render if banner video exists
  if (!content.videos?.bannerVideo?.url) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-max">
        {content.videos.bannerVideo.title && (
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow text-center mb-12">
            {content.videos.bannerVideo.title}
          </h2>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Check if it's a YouTube URL or regular video file */}
            {content.videos.bannerVideo.url.includes('youtube.com') ||
             content.videos.bannerVideo.url.includes('youtu.be') ? (
              <YouTubeEmbed
                url={content.videos.bannerVideo.url}
                title={content.videos.bannerVideo.title || "Featured Performance"}
                className="w-full"
              />
            ) : (
              <video
                key={content.videos.bannerVideo.url}
                ref={videoRef}
                width="100%"
                height="400"
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-video"
                style={{ minHeight: '400px' }}
                onError={(e) => console.error('Banner video error:', e)}
                onLoadedData={() => console.log('Banner video loaded successfully')}
              >
                <source src={content.videos.bannerVideo.url} type="video/quicktime" />
                <source src={content.videos.bannerVideo.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerVideo;