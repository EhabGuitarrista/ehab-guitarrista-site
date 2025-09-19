import React from 'react';

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url, title = "Video", className = "" }) => {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className={`aspect-video bg-muted flex items-center justify-center ${className}`}>
        <p className="text-muted-foreground">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className={`aspect-video ${className}`}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
    </div>
  );
};

export default YouTubeEmbed;