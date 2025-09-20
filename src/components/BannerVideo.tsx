import { useCMSContent } from "@/hooks/useCMSContent";
import { useVideoManager } from "@/hooks/useVideoManager";
import YouTubeEmbed from "./YouTubeEmbed";

const BannerVideo = () => {
  const { content, loading } = useCMSContent();
  const videoRef = useVideoManager(false); // No autoplay for banner video

  if (loading) {
    return null;
  }

  // Only render if banner video exists and is a YouTube URL
  if (!content.videos?.bannerVideo?.url ||
      !(content.videos.bannerVideo.url.includes('youtube.com') ||
        content.videos.bannerVideo.url.includes('youtu.be'))) {
    return null;
  }

  const bannerVideo = content.videos.bannerVideo;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-max">
        {bannerVideo.title && (
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow text-center mb-12">
            {bannerVideo.title}
          </h2>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <YouTubeEmbed
              url={bannerVideo.url}
              title={bannerVideo.title || "Featured Performance"}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerVideo;