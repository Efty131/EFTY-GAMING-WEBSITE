import React, { useState } from 'react';
import { Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import channelLogo from '../channel-logo.png';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '/', internal: true },
  { label: 'Videos', href: 'https://www.youtube.com/@Efty-v8s/videos', internal: false },
  { label: 'Shorts', href: 'https://www.youtube.com/@Efty-v8s/shorts', internal: false },
  { label: 'About', href: '/about', internal: true },
  { label: 'Contact', href: '/contact', internal: true },
];

export default function Navbar({ isDark, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
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
              className={`font-medium hover:text-cyan-400 transition-colors ${location.pathname === link.href ? 'text-cyan-400' : isDark ? 'text-white' : 'text-gray-900'}`}
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
        {toggleTheme && <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />}
        <a
          href="https://www.youtube.com/@Efty-v8s?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-6 py-2.5 rounded-lg transition-all items-center gap-2 shadow-lg shadow-cyan-500/50"
        >
          <Youtube size={18} />
          Subscribe
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 rounded-full transition-all duration-300 origin-left ${isDark ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'rotate-45 translate-x-0.5' : ''}`}></span>
            <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`}></span>
            <span className={`w-full h-0.5 rounded-full transition-all duration-300 origin-left ${isDark ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? '-rotate-45 translate-x-0.5' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 backdrop-blur-lg z-30 transform transition-transform duration-300 ease-in-out md:hidden ${isDark ? 'bg-black/95' : 'bg-white/95'} ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
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
                className={`font-medium text-lg hover:text-cyan-400 transition-all duration-300 transform ${location.pathname === link.href ? 'text-cyan-400' : isDark ? 'text-white' : 'text-gray-900'} ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
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
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </nav>
  );
}
