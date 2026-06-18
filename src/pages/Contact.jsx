import React from 'react';
import { Youtube, MessageCircle, Send, Mail } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

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

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '0.1',
        }}
      ></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Touch</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have a question, suggestion, or want to collaborate? Reach out through any of these channels.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {CONTACT_METHODS.map((method, index) => (
            <ContactCard key={index} method={method} index={index} />
          ))}
        </div>

        {/* Business Inquiries */}
        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Business Inquiries</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
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

function ContactCard({ method, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <a
      ref={ref}
      href={method.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-full ${method.bgColor} flex items-center justify-center ${method.color} group-hover:scale-110 transition-transform`}>
          {method.icon}
        </div>
        <div>
          <h3 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">{method.title}</h3>
          <p className="text-gray-400 text-sm">{method.description}</p>
        </div>
      </div>
    </a>
  );
}
