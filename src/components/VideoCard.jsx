import React from 'react';
import { Play } from 'lucide-react';

// Predefined gradient combinations for video card glow borders
const GRADIENTS = [
  'from-cyan-400 via-blue-500 to-purple-500',
  'from-purple-500 via-pink-500 to-cyan-400',
  'from-blue-500 via-cyan-400 to-purple-500',
  'from-cyan-400 via-purple-500 to-pink-500',
  'from-pink-500 via-blue-500 to-cyan-400',
  'from-purple-500 via-cyan-400 to-blue-500',
];

export default function VideoCard({ video, index = 0, onPlay }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div className="group relative">
      {/* Glowing gradient border */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 animate-gradient-slow`}
      ></div>

      {/* Card content */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        {/* Thumbnail with play overlay */}
        <button
          onClick={() => onPlay(video)}
          className="block relative aspect-video w-full cursor-pointer"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-cyan-400/90 flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <Play size={28} className="text-black ml-1" fill="black" />
            </div>
          </div>
        </button>

        {/* Video info */}
        <div className="p-4">
          <h4 className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
            {video.title}
          </h4>
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            {video.views > 0 && (
              <span>{video.views.toLocaleString()} views</span>
            )}
            {video.publishedAt && (
              <span>{formatPublishedDate(video.publishedAt)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Format an ISO date string to a relative time string like "2 days ago".
 */
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
