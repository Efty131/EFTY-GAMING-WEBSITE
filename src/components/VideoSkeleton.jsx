import React from 'react';

export default function VideoSkeleton() {
  return (
    <div className="relative">
      {/* Pulsing border placeholder */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg blur opacity-50 animate-pulse"></div>

      <div className="relative bg-black rounded-lg overflow-hidden">
        {/* Thumbnail skeleton */}
        <div className="aspect-video bg-gray-800 animate-pulse"></div>

        {/* Text skeletons */}
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2"></div>
          <div className="flex gap-3">
            <div className="h-3 bg-gray-800 rounded animate-pulse w-16"></div>
            <div className="h-3 bg-gray-800 rounded animate-pulse w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
