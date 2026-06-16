import { useRef, useState } from 'react';
import { Play, Pause, Film } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VideoItem {
  src: string;
  poster?: string;
}

export default function VideoShowcaseSection() {
  const { t } = useLanguage();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Add your video files here — place MP4s in public/gallery/videos/
  const videos: VideoItem[] = [
    { src: '/gallery/videos/video1.mp4' },
    { src: '/gallery/videos/video2.mp4' },
  ];

  const handlePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      video.pause();
      setPlayingIndex(null);
    } else {
      // Pause any currently playing video
      if (playingIndex !== null && videoRefs.current[playingIndex]) {
        videoRefs.current[playingIndex]!.pause();
      }
      video.play();
      setPlayingIndex(index);
    }
  };

  const handleVideoEnd = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null);
    }
  };

  return (
    <section id="videos" className="py-24 relative overflow-hidden">
      {/* Light Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/gallery/light-bg.png" 
          alt="Modern Light Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-primary font-bold text-[12px] uppercase tracking-widest mb-4">
            <span className="w-8 h-[2px] bg-brand-secondary"></span>
            <Film size={16} />
            <span>{t.navVideos}</span>
            <span className="w-8 h-[2px] bg-brand-secondary"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-slate mb-6">
            {t.videosTitle}
          </h2>
          <p className="text-lg text-brand-gray max-w-3xl mx-auto font-light leading-relaxed">
            {t.videosSubtitle}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <div 
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-brand-slate cursor-pointer"
              onClick={() => handlePlayPause(index)}
            >
              {/* Video Element */}
              <div className="relative aspect-[9/16] md:aspect-[9/14]">
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={video.src}
                  poster={video.poster}
                  className="w-full h-full object-cover"
                  playsInline
                  preload="metadata"
                  onEnded={() => handleVideoEnd(index)}
                />

                {/* Gradient Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-brand-primary-dark/80 via-brand-primary-dark/20 to-transparent transition-opacity duration-300 ${
                    playingIndex === index ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                  }`}
                />

                {/* Play/Pause Button */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    playingIndex === index ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                  }`}
                >
                  <div className="relative">
                    {/* Pulse ring animation */}
                    {playingIndex !== index && (
                      <div className="absolute inset-0 rounded-full bg-brand-secondary/40 animate-pulse-ring" />
                    )}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-secondary/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:bg-brand-secondary group-hover:scale-110 transition-all duration-300">
                      {playingIndex === index ? (
                        <Pause size={28} className="text-brand-primary" />
                      ) : (
                        <Play size={28} className="text-brand-primary ml-1" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Video number badge */}
                <div className="absolute top-4 left-4 bg-brand-primary/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Film size={12} />
                    {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State — shown when no videos are available */}
        {videos.length === 0 && (
          <div className="text-center py-16">
            <Film size={48} className="text-brand-gray/30 mx-auto mb-4" />
            <p className="text-brand-gray text-lg">Videos coming soon...</p>
          </div>
        )}
      </div>

      <style>{`
        video::-webkit-media-controls {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
