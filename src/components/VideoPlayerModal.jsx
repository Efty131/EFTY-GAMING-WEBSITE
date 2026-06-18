import React, { useEffect } from 'react';
import { X, Youtube } from 'lucide-react';

export default function VideoPlayerModal({ video, onClose }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (video) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [video]);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"></div>

      {/* Player Container */}
      <div
        className="relative w-full max-w-5xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Custom Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-3 min-w-0">
            <Youtube size={20} className="text-red-500 flex-shrink-0" />
            <h3 className="text-white font-semibold text-sm md:text-base truncate">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close player"
          >
            <X size={20} />
          </button>
        </div>

        {/* YouTube Embed */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-white/10">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info Bar */}
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            {video.views > 0 && (
              <span>{video.views.toLocaleString()} views</span>
            )}
            {video.publishedAt && (
              <span>{formatPublishedDate(video.publishedAt)}</span>
            )}
          </div>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Watch on YouTube ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function formatPublishedDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
