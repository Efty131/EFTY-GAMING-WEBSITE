import React from 'react';
import { Youtube, Gamepad2, Monitor, Heart } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import Navbar from '../components/Navbar';

const HIGHLIGHTS = [
  {
    icon: <Gamepad2 size={32} />,
    title: 'Gameplay & Reviews',
    description: 'In-depth gameplay sessions, honest reviews, and first looks at the latest titles.',
  },
  {
    icon: <Monitor size={32} />,
    title: 'Mods & Tech',
    description: 'Graphics mods, performance tests, and hardware breakdowns to level up your setup.',
  },
  {
    icon: <Heart size={32} />,
    title: 'Community First',
    description: 'Built by a gamer, for gamers. Every video is made with passion and love for the craft.',
  },
];

export default function About({ isDark, toggleTheme }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isDark ? '0.15' : '0.08',
        }}
      ></div>
      <div className={`fixed inset-0 z-0 ${isDark ? 'bg-gradient-to-b from-black/80 via-black/60 to-black/80' : 'bg-gradient-to-b from-gray-50/80 via-gray-50/60 to-gray-50/80'}`}></div>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Efty Gaming</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Welcome to Efty Gaming — your destination for high-quality gaming content.
            From stunning open-world drives to intense multiplayer battles, every video
            is crafted to deliver the best gaming experience on YouTube.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className={`backdrop-blur-sm border rounded-2xl p-8 md:p-12 ${isDark ? 'bg-black/50 border-white/10' : 'bg-white/50 border-gray-200'}`}>
            <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Youtube size={28} className="text-red-500" />
              My Story
            </h2>
            <div className={`space-y-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>
                What started as a passion for gaming turned into a mission to share incredible
                gaming moments with the world. Efty Gaming is all about showcasing the beauty
                of modern games — from the breathtaking landscapes of Forza Horizon 5 to the
                post-apocalyptic world of Once Human.
              </p>
              <p>
                Every video is recorded in ultra graphics, edited with care, and uploaded to
                bring you the most immersive experience possible. Whether it's a relaxing scenic
                drive or an intense squad battle, you'll find it here.
              </p>
              <p>
                With over <span className="text-cyan-400 font-semibold">6,000 subscribers</span> and{' '}
                <span className="text-cyan-400 font-semibold">10 million+ views</span>, this community
                keeps growing — and it's all thanks to you.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {HIGHLIGHTS.map((item, index) => (
            <HighlightCard key={index} item={item} index={index} isDark={isDark} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://www.youtube.com/@Efty-v8s?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-8 py-4 rounded-lg transition-all shadow-lg shadow-cyan-500/50 hover:scale-105"
          >
            Join the Community on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ item, index, isDark }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`backdrop-blur-sm border rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all duration-500 ${isDark ? 'bg-black/50 border-white/10' : 'bg-white/50 border-gray-200'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400">
        {item.icon}
      </div>
      <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</p>
    </div>
  );
}
