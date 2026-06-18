import React from 'react';
import { Youtube, Send, ExternalLink } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Videos', href: 'https://www.youtube.com/@Efty-v8s/videos' },
  { label: 'Shorts', href: 'https://www.youtube.com/@Efty-v8s/shorts' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const SOCIAL_LINKS = [
  { icon: <Youtube size={20} />, href: 'https://www.youtube.com/@Efty-v8s', label: 'YouTube' },
  { icon: <Send size={20} />, href: 'https://t.me/eftyv8s', label: 'Telegram' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black/80 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Efty Gaming</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              High-quality gaming videos, mods, and gameplay tests.
              Level up your gaming experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.href.startsWith('http') && <ExternalLink size={12} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-400/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Subscribe on YouTube for the latest content
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Efty Gaming. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Made with ❤️ for the gaming community
          </p>
        </div>
      </div>
    </footer>
  );
}
