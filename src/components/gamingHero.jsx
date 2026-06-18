import React, { useState } from 'react';
import { Play, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import channelLogo from '../channel-logo.png';
import { useYouTubeVideos } from '../hooks/useYouTubeVideos';
import useScrollAnimation from '../hooks/useScrollAnimation';
import VideoCard from './VideoCard';
import VideoSkeleton from './VideoSkeleton';
import VideoPlayerModal from './VideoPlayerModal';
import ThemeToggle from './ThemeToggle';
import TelegramSignup from './TelegramSignup';

const NAV_LINKS = [
  { label: 'Home', href: '/', internal: true },
  { label: 'Videos', href: 'https://www.youtube.com/@Efty-v8s/videos', internal: false },
  { label: 'Shorts', href: 'https://www.youtube.com/@Efty-v8s/shorts', internal: false },
  { label: 'About', href: '/about', internal: true },
  { label: 'Contact', href: '/contact', internal: true },
];

export default function GamingHero({ isDark, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const { videos, loading, error } = useYouTubeVideos();
  const [heroRef, heroVisible] = useScrollAnimation();
  const [videosRef, videosVisible] = useScrollAnimation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Full Screen Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDark ? '0.4' : '0.15'
        }}
      ></div>

      {/* Gradient Overlays */}
      <div className={`fixed inset-0 z-0 ${isDark ? 'bg-gradient-to-b from-black/80 via-black/40 to-black/80' : 'bg-gradient-to-b from-gray-50/80 via-gray-50/40 to-gray-50/80'}`}></div>
      <div className="fixed inset-0 bg-gradient-to-r from-cyan-900/30 via-blue-900/20 to-purple-900/30 z-0"></div>

      {/* Navigation */}
      <nav className={`relative z-20 flex items-center justify-between px-8 py-6 backdrop-blur-sm ${isDark ? 'bg-black/30' : 'bg-white/30'}`}>
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-cyan-500/50 border-2 border-cyan-400">
            <img src={channelLogo} alt="Efty Gaming" />
          </div>
          <h1 className={`text-2xl font-bold tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>Efty</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.internal ? (
              <Link
                key={link.label}
                to={link.href}
                className={`font-medium hover:text-cyan-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium hover:text-cyan-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
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
              <span className={`w-full h-0.5 rounded-full transition-all duration-300 origin-left ${isDark ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'rotate-45 translate-x-0.5' : ''}`}></span>
              <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`}></span>
              <span className={`w-full h-0.5 rounded-full transition-all duration-300 origin-left ${isDark ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? '-rotate-45 translate-x-0.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 backdrop-blur-lg z-30 transform transition-transform duration-300 ease-in-out md:hidden ${isDark ? 'bg-black/95' : 'bg-white/95'} ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center" onClick={toggleMenu}>
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 rounded-full rotate-45 translate-y-2 ${isDark ? 'bg-white' : 'bg-gray-900'}`}></span>
            <span className={`w-full h-0.5 rounded-full -rotate-45 -translate-y-2 ${isDark ? 'bg-white' : 'bg-gray-900'}`}></span>
          </div>
        </button>

        <div className="flex flex-col items-start gap-6 mt-24 px-8">
          {NAV_LINKS.map((link, i) =>
            link.internal ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium text-lg hover:text-cyan-400 transition-all duration-300 transform ${isDark ? 'text-white' : 'text-gray-900'} ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ transitionDelay: isMenuOpen ? `${(i + 1) * 50}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium text-lg hover:text-cyan-400 transition-all duration-300 transform ${isDark ? 'text-white' : 'text-gray-900'} ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ transitionDelay: isMenuOpen ? `${(i + 1) * 50}ms` : '0ms' }}
              >
                {link.label}
              </a>
            )
          )}

          <a
            href="https://www.youtube.com/@Efty-v8s?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/50 mt-4 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
            style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
          >
            <Youtube size={18} />
            Subscribe
          </a>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={toggleMenu}></div>
      )}

      {/* Hero Content */}
      <div ref={heroRef} className={`relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-black/50 border border-cyan-500 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-sm font-semibold tracking-wide">LIVE ON YOUTUBE</span>
          </div>

          <h2 className={`text-5xl md:text-7xl font-bold mb-6 max-w-5xl leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="block drop-shadow-2xl">High-Quality Gaming Videos,</span>
            <span className="neon-glow-text block">Mods & Gameplay Tests</span>
          </h2>

          <p className={`text-lg md:text-xl max-w-2xl mb-12 leading-relaxed drop-shadow-2xl ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
            Dive into the world of gaming with exciting gameplay, tutorials,<br />
            and the latest tech reviews. Level up your knowledge!
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-12 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">6K</div>
              <div className={`text-sm tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>SUBSCRIBERS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">{videos.length || '400'}</div>
              <div className={`text-sm tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>VIDEOS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">10M+</div>
              <div className={`text-sm tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>VIEWS</div>
            </div>
          </div>

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
              className={`hover:bg-black/70 text-white font-bold px-8 py-4 rounded-lg transition-all flex items-center gap-3 border backdrop-blur-sm ${isDark ? 'bg-black/50 border-gray-700 hover:border-cyan-500' : 'bg-gray-900/50 border-gray-300 hover:border-cyan-500'}`}
            >
              <Play size={24} />
              Latest Video
            </a>
          </div>
        </div>
      </div>

      {/* Featured Videos Section */}
      <section className={`relative z-10 px-4 py-20 backdrop-blur-sm ${isDark ? 'bg-black/60' : 'bg-white/60'}`}>
        <div className="max-w-7xl mx-auto">
          <div ref={videosRef} className={`text-center mb-16 transition-all duration-700 ${videosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Videos</span>
            </h3>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Check out our latest gameplay and reviews</p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <VideoSkeleton key={i} />
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-12">
              <p className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Could not load videos. Showing default content.</p>
              <a href="https://www.youtube.com/@Efty-v8s/videos" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">
                Watch on YouTube →
              </a>
            </div>
          )}

          {!loading && !error && videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.slice(0, 6).map((video, index) => (
                <VideoCard key={video.videoId} video={video} index={index} onPlay={setActiveVideo} />
              ))}
            </div>
          )}

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

      {/* Telegram Signup */}
      <TelegramSignup />

      {/* Glow Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

      <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
