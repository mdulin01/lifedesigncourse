import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, BarChart3, Target, Zap, Brain, Sparkles, Eye, EyeOff, LogIn, LogOut, ChevronRight } from 'lucide-react';
import { courseModules, btsEntries } from '../constants';
import { useBTS } from '../contexts/BTSContext';
import BTSCard from './BTSCard';

const HERO_IMAGES = [
  'https://nam.edu/wp-content/uploads/2024/10/thumb-2009_NAS_Dome_188-1024x683.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Keck_Center_of_the_National_Academies.JPG/1280px-Keck_Center_of_the_National_Academies.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/National_Academy_of_Sciences%2C_Washington%2C_D.C._01_-_2012.JPG/1920px-National_Academy_of_Sciences%2C_Washington%2C_D.C._01_-_2012.JPG',
  'https://images.unsplash.com/photo-1698440881207-091797fa03f5?w=1920&q=80&fit=crop',
];

export default function CourseLanding({ onSignIn, user, onSignOut }) {
  const navigate = useNavigate();
  const { showBTS, toggleBTS } = useBTS();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const frameworkIcons = { dyl: '🧭', ah: '🔄', ai: '🤖', both: '🧪' };
  const frameworkLabels = { dyl: 'Designing Your Life', ah: 'Atomic Habits', ai: 'AI Tools', both: 'Combined' };

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* BTS Toggle */}
      <button
        onClick={toggleBTS}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium shadow-2xl transition-all active:scale-95 ${
          showBTS
            ? 'bg-amber-500 text-black hover:bg-amber-400'
            : 'bg-slate-800 text-white/70 hover:text-white border border-white/20 hover:border-amber-500/50'
        }`}
      >
        {showBTS ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {showBTS ? 'Hide' : 'Behind the Scenes'}
      </button>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <span className="font-bold text-white text-sm sm:text-base">AI Life Design Course</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#modules" className="text-xs sm:text-sm text-white/50 hover:text-white transition hidden sm:block">Modules</a>
            <a href="#frameworks" className="text-xs sm:text-sm text-white/50 hover:text-white transition hidden sm:block">Frameworks</a>
            {user ? (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/portal')} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-medium text-emerald-300 hover:bg-emerald-500/30 transition">
                  My Portal <ChevronRight className="w-3 h-3" />
                </button>
                <button onClick={onSignOut} className="p-1.5 text-white/30 hover:text-white/60 transition">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={onSignIn} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/15 transition">
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Photo carousel background */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out"
              style={{ opacity: currentImage === i ? 1 : 0 }}
            />
          ))}
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/80 to-slate-950" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" /> A new kind of course — built with AI, about AI
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            Design Your Life
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              With AI
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            A hands-on course that combines the <strong className="text-white/80">Designing Your Life</strong> framework
            with <strong className="text-white/80">Atomic Habits</strong> — and teaches you to build personal tools
            using AI along the way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#modules" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-xl transition active:scale-[0.98] shadow-lg shadow-emerald-500/25">
              Explore the Course <ArrowRight className="w-4 h-4" />
            </a>
            {!user && (
              <button onClick={onSignIn} className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium rounded-xl transition">
                Sign In to Portal
              </button>
            )}
          </div>
        </div>
      </section>

      {/* BTS Card for hero */}
      {btsEntries.filter(e => e.section === 'hero').map(entry => (
        <BTSCard key={entry.id} {...entry} />
      ))}

      {/* What You'll Build */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">What You'll Build</h2>
          <p className="text-white/50 max-w-xl mx-auto">Real tools for your real life — not just theory. Every module produces something you'll actually use.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: '🌐', title: 'Personal Website', desc: 'Your professional home on the web' },
            { icon: '📊', title: 'Life Dashboard', desc: 'Health, Work, Play, Love gauges' },
            { icon: '📈', title: 'Habit Tracker', desc: 'Streaks, stacks, and systems' },
            { icon: '🗺️', title: 'Odyssey Plans', desc: 'Three possible life paths' },
            { icon: '⚡', title: 'Energy Journal', desc: 'What energizes vs. drains you' },
            { icon: '🧭', title: 'Values Compass', desc: 'Workview + Lifeview aligned' },
            { icon: '🔄', title: 'Identity Designer', desc: 'Who you want to become' },
            { icon: '🧪', title: 'Experiment Log', desc: 'Prototype and iterate on life' },
          ].map((item, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 hover:bg-white/[0.06] hover:border-emerald-500/20 transition group">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-white/40">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Modules */}
      <section id="modules" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Course Modules</h2>
          <p className="text-white/50 max-w-xl mx-auto">Eight hands-on modules that take you from setting up your tools to designing and iterating on your life.</p>
        </div>

        {/* BTS Card for modules */}
        {btsEntries.filter(e => e.section === 'modules').map(entry => (
          <BTSCard key={entry.id} {...entry} />
        ))}

        <div className="space-y-4">
          {courseModules.map((mod) => (
            <div
              key={mod.id}
              className={`bg-gradient-to-r ${mod.color} border ${mod.borderColor} rounded-2xl p-5 sm:p-6 hover:scale-[1.01] transition-transform`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl shrink-0">{mod.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold text-white/30 uppercase">Module {mod.id}</span>
                    <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/50">
                      {frameworkIcons[mod.framework]} {frameworkLabels[mod.framework]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{mod.title}</h3>
                  <p className="text-sm text-white/50 mb-3">{mod.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.tools.map(tool => (
                      <span key={tool} className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-white/40 font-medium">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frameworks Section */}
      <section id="frameworks" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Two Frameworks, One System</h2>
          <p className="text-white/50 max-w-xl mx-auto">Designing Your Life gives you direction. Atomic Habits gives you execution. Together, they create a complete system for intentional living.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* DYL Card */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-8 h-8 text-emerald-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Designing Your Life</h3>
                <p className="text-xs text-emerald-400/70">Burnett & Evans — Stanford d.school</p>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-4">
              Apply design thinking to your life. Instead of finding "the one right answer,"
              generate multiple possibilities and prototype your way forward.
            </p>
            <div className="space-y-2">
              {[
                { label: 'Workview & Lifeview', desc: 'Define what work and life mean to you' },
                { label: 'Good Time Journal', desc: 'Track energy and engagement patterns' },
                { label: 'Odyssey Plans', desc: 'Design three possible 5-year futures' },
                { label: 'Life Dashboard', desc: 'Health, Work, Play, Love balance' },
                { label: 'Prototyping', desc: 'Test ideas before committing' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div><span className="text-white/80 font-medium">{item.label}</span> <span className="text-white/40">— {item.desc}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* AH Card */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Atomic Habits</h3>
                <p className="text-xs text-orange-400/70">James Clear</p>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-4">
              Small changes compound into remarkable results. Build identity-based habits
              using the four laws of behavior change.
            </p>
            <div className="space-y-2">
              {[
                { label: 'Identity-Based Habits', desc: 'Focus on who you want to become' },
                { label: 'Make It Obvious', desc: 'Design cues in your environment' },
                { label: 'Make It Easy', desc: 'The 2-minute rule to start small' },
                { label: 'Habit Stacking', desc: 'Chain new habits to existing ones' },
                { label: 'Never Miss Twice', desc: 'Build streaks and track progress' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  <div><span className="text-white/80 font-medium">{item.label}</span> <span className="text-white/40">— {item.desc}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Integration */}
        <div className="mt-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-3xl p-6 sm:p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Powered by AI</h3>
          </div>
          <p className="text-sm text-white/60 max-w-2xl mx-auto">
            Every tool in this course is built using AI-assisted development. You'll learn to use
            Claude and other AI tools to create your own web applications — no prior coding experience required.
            The course itself is a living example of what you'll learn to build.
          </p>
        </div>
      </section>

      {/* BTS Card for BTS system */}
      {btsEntries.filter(e => e.section === 'bts').map(entry => (
        <BTSCard key={entry.id} {...entry} />
      ))}

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Design Your Life?</h2>
          <p className="text-white/50 mb-6 max-w-lg mx-auto">
            Start with the tools. Stay for the transformation. Every module builds something real
            that you'll use every day.
          </p>
          {user ? (
            <button
              onClick={() => navigate('/portal')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-xl transition shadow-lg shadow-emerald-500/25"
            >
              Go to Your Portal <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onSignIn}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-xl transition shadow-lg shadow-emerald-500/25"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-white/30">
            <span>🤖</span>
            <span>AI Life Design Course</span>
            <span className="text-white/10">|</span>
            <span>Built with AI</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/20">
            <span>Designing Your Life + Atomic Habits + AI Tools</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
