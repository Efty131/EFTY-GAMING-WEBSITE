import React from 'react';
import { Send } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function TelegramSignup() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative z-10 px-4 py-16">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Send size={32} className="text-blue-400" />
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Join the <span className="text-blue-400">Telegram</span> Channel
        </h3>

        <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Get notified about new videos, behind-the-scenes content, and gaming updates
          directly on your phone.
        </p>

        <a
          href="https://t.me/eftyv8s"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg shadow-blue-500/50 hover:scale-105"
        >
          <Send size={20} />
          Join Channel
        </a>
      </div>
    </section>
  );
}
