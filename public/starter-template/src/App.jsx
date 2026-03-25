import React from 'react';

// ============================================================
// YOUR PERSONAL WEBSITE STARTER
// ============================================================
// This is your starting point. You'll customize everything here
// by describing what you want to Claude — no coding required.
//
// Try telling Claude:
//   "Replace this placeholder with a professional site for me.
//    I'm a [your role]. I want sections for: hero, about,
//    publications/projects, and contact. Use a [color] palette
//    with a clean, modern feel."
// ============================================================

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-lg">Your Name</span>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#work" className="hover:text-white transition">Work</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="text-emerald-400 text-sm font-medium mb-4">Welcome</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Hi, I'm <span className="text-emerald-400">Your Name</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-8">
            A short tagline about who you are and what you do.
            Replace this with your own introduction.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded-xl transition"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Write a few paragraphs about your background, experience,
                and what drives you. This is your chance to tell your story.
              </p>
              <p>
                What do you care about? What's your expertise?
                What would you want someone to know about you?
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center text-white/20">
                <div className="text-6xl mb-2">📸</div>
                <p className="text-sm">Your photo here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work / Projects Section */}
      <section id="work" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Work & Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Project One', desc: 'Brief description of this project or accomplishment.' },
            { title: 'Project Two', desc: 'Brief description of this project or accomplishment.' },
            { title: 'Project Three', desc: 'Brief description of this project or accomplishment.' },
          ].map((project, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 hover:bg-white/[0.05] transition"
            >
              <h3 className="font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-white/40">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white/[0.02] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-white/50 mb-6">I'd love to hear from you.</p>
          <a
            href="mailto:your.email@example.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/25 transition"
          >
            your.email@example.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-white/20 text-xs">
        Built with AI · Life Design with AI Course
      </footer>
    </div>
  );
}
