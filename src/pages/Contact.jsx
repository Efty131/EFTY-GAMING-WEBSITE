import React from 'react';
import { Youtube, MessageCircle, Send, Mail } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import Navbar from '../components/Navbar';

const CONTACT_METHODS = [
  {
    icon: <Youtube size={28} />,
    title: 'YouTube',
    description: 'Comment on any video or DM on YouTube',
    link: 'https://www.youtube.com/@Efty-v8s',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: <Send size={28} />,
    title: 'Telegram',
    description: 'Join the community channel',
    link: 'https://t.me/eftyv8s',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    icon: <MessageCircle size={28} />,
    title: 'Discord',
    description: 'Hang out with fellow gamers',
    link: '#',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
  },
  {
    icon: <Mail size={28} />,
    title: 'Email',
    description: 'For business inquiries',
    link: 'mailto:efty.gaming@gmail.com',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
  },
];

export default function Contact({ isDark, toggleTheme }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isDark ? '0.1' : '0.05',
        }}
      ></div>
      <div className={`fixed inset-0 z-0 ${isDark ? 'bg-gradient-to-b from-black/80 via-black/60 to-black/80' : 'bg-gradient-to-b from-gray-50/80 via-gray-50/60 to-gray-50/80'}`}></div>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Get In <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Touch</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a question, suggestion, or want to collaborate? Reach out through any of these channels.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {CONTACT_METHODS.map((method, index) => (
            <ContactCard key={index} method={method} index={index} isDark={isDark} />
          ))}
        </div>

        {/* Business Inquiries */}
        <div className={`backdrop-blur-sm border rounded-2xl p-8 md:p-12 text-center ${isDark ? 'bg-black/50 border-white/10' : 'bg-white/50 border-gray-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Business Inquiries</h2>
          <p className={`mb-6 max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Interested in sponsoring a video, partnership, or collaboration?
            Feel free to reach out via email or YouTube DMs.
          </p>
          <a
            href="mailto:efty.gaming@gmail.com"
            className="inline-block bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-8 py-3 rounded-lg transition-all shadow-lg shadow-cyan-500/50 hover:scale-105"
          >
            Send an Email
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ method, index, isDark }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <a
      ref={ref}
      href={method.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block backdrop-blur-sm border rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-500 group ${isDark ? 'bg-black/50 border-white/10' : 'bg-white/50 border-gray-200'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-full ${method.bgColor} flex items-center justify-center ${method.color} group-hover:scale-110 transition-transform`}>
          {method.icon}
        </div>
        <div>
          <h3 className={`font-bold text-lg group-hover:text-cyan-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{method.title}</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{method.description}</p>
        </div>
      </div>
    </a>
  );
}
