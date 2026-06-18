import React, { useState } from 'react';
import { Play, Youtube } from 'lucide-react';
import channelLogo from '../channel-logo.png';
import { useYouTubeVideos } from '../hooks/useYouTubeVideos';
import VideoCard from './VideoCard';
import VideoSkeleton from './VideoSkeleton';
import VideoPlayerModal from './VideoPlayerModal';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Videos', href: 'https://www.youtube.com/@Efty-v8s/videos' },
  { label: 'Shorts', href: 'https://www.youtube.com/@Efty-v8s/shorts' },
  { label: 'Blog', href: '/' },
  { label: 'About', href: '/' },
  { label: 'Contact', href: '/' },
];

export default function GamingHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const { videos, loading, error } = useYouTubeVideos();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Full Screen Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: '0.4'
        }}
      ></div>

      {/* Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-cyan-900/30 via-blue-900/20 to-purple-900/30 z-0"></div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-cyan-500/50 border-2 border-cyan-400">
            <img src={channelLogo} alt="Efty Gaming" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">Efty</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white font-medium hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.youtube.com/@Efty-v8s?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-6 py-2.5 rounded-lg transition-all items-center gap-2 shadow-lg shadow-cyan-500/50"
          >
            <Youtube size={18} />
            Subscribe
          </a>

          {/* Animated Hamburger Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-45 translate-x-0.5' : ''
                  }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'
                  }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-45 translate-x-0.5' : ''
                  }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-lg z-30 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center"
          onClick={toggleMenu}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className="w-full h-0.5 bg-white rounded-full rotate-45 translate-y-2"></span>
            <span className="w-full h-0.5 bg-white rounded-full -rotate-45 -translate-y-2"></span>
          </div>
        </button>

        {/* Mobile Menu Links */}
        <div className="flex flex-col items-start gap-6 mt-24 px-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-white font-medium text-lg hover:text-cyan-400 transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
              style={{ transitionDelay: isMenuOpen ? `${(i + 1) * 50}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Subscribe Button */}
          <a
            href="https://www.youtube.com/@Efty-v8s?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/50 mt-4 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
            style={{ transitionDelay: isMenuOpen ? '350ms' : '0ms' }}
          >
            <Youtube size={18} />
            Subscribe
          </a>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="relative z-10">
          {/* Live Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-black/50 border border-cyan-500 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-sm font-semibold tracking-wide">LIVE ON YOUTUBE</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-bold mb-6 max-w-5xl leading-tight">
            <span className="text-white block drop-shadow-2xl">High-Quality Gaming Videos,</span>
            <span className="neon-glow-text block">
              Mods & Gameplay Tests
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed drop-shadow-2xl">
            Dive into the world of gaming with exciting gameplay, tutorials,<br />
            and the latest tech reviews. Level up your knowledge!
          </p>

          {/* Stats - Hardcoded (RSS feed doesn't include channel-level stats) */}
          <div className="flex flex-wrap items-center justify-center gap-12 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                6K
              </div>
              <div className="text-gray-300 text-sm tracking-wider">SUBSCRIBERS</div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                {videos.length || '400'}
              </div>
              <div className="text-gray-300 text-sm tracking-wider">VIDEOS</div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                10M+
              </div>
              <div className="text-gray-300 text-sm tracking-wider">VIEWS</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.youtube.com/@Efty-v8s?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-8 py-4 rounded-lg transition-all flex items-center gap-3 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105"
            >
              <Youtube size={24} />
              Subscribe on YouTube
            </a>

            <a
              href="https://www.youtube.com/@Efty-v8s/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/50 hover:bg-black/70 text-white font-bold px-8 py-4 rounded-lg transition-all flex items-center gap-3 border border-gray-700 hover:border-cyan-500 backdrop-blur-sm"
            >
              <Play size={24} />
              Latest Video
            </a>
          </div>
        </div>
      </div>

      {/* Featured Videos Section - Dynamic from RSS Feed */}
      <section className="relative z-10 px-4 py-20 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Videos</span>
            </h3>
            <p className="text-gray-300 text-lg">Check out our latest gameplay and reviews</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <VideoSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">Could not load videos. Showing default content.</p>
              <a
                href="https://www.youtube.com/@Efty-v8s/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Watch on YouTube →
              </a>
            </div>
          )}

          {/* Video Grid - Dynamic */}
          {!loading && !error && videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.slice(0, 6).map((video, index) => (
                <VideoCard key={video.videoId} video={video} index={index} onPlay={setActiveVideo} />
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="https://www.youtube.com/@Efty-v8s/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent hover:bg-cyan-500/20 text-cyan-400 font-bold px-8 py-4 rounded-lg transition-all border-2 border-cyan-400 hover:border-cyan-300 hover:scale-105"
            >
              View All Videos
            </a>
          </div>
        </div>
      </section>

      {/* Additional Glow Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

      {/* Video Player Modal */}
      <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
