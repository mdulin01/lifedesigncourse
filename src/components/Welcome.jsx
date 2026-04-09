import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import WorkshopNav from './WorkshopNav';

const participants = [
  { name: 'Amy Gilbert', email: 'alewisgilbert.healthpolicy@gmail.com' },
  { name: 'Ellen-Marie Whelan', email: 'ellenmarie.whelan@gmail.com' },
  { name: 'Carrie Colla', email: 'carrie.h.colla@dartmouth.edu' },
  { name: 'Lucy Marcil', email: 'lumarcil@gmail.com' },
  { name: 'Tonya Moore', email: 'tonyamoore.healthpolicy@gmail.com' },
  { name: 'Wendi Gosliner', email: 'wendigosliner@gmail.com' },
  { name: 'Mary Mazanec', email: 'mary.mazanec@comcast.net' },
  { name: 'Carole Pratt', email: 'carolepratt12@gmail.com' },
  { name: 'Stephen Morales', email: 'stephen.a.morales@gmail.com' },
  { name: 'Mike Dulin', email: 'mdulin@gmail.com' },
  { name: 'Kate Cerulli', email: 'catherine_cerulli@urmc.rochester.edu' },
  { name: 'Nicole Arthun', email: 'nicolearthun@gmail.com' },
  { name: 'Marissa Gioffre', email: 'mgioffre@nas.edu' },
];

const COURSE_START = new Date('2026-04-09T08:00:00-04:00');

function Countdown() {
  const [diff, setDiff] = useState(COURSE_START - new Date());
  useEffect(() => {
    const t = setInterval(() => setDiff(COURSE_START - new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (diff <= 0) return <p className="text-emerald-400 font-semibold text-lg">Training has begun!</p>;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return (
    <div className="flex gap-3 justify-center text-center">
      {[
        [d, 'days'], [h, 'hrs'], [m, 'min'], [s, 'sec']
      ].map(([v, l]) => (
        <div key={l} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 min-w-[60px]">
          <div className="text-2xl font-bold text-emerald-400 tabular-nums">{v}</div>
          <div className="text-[10px] uppercase tracking-wider text-white/40">{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function Welcome() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  // Auto-verify from URL params
  useEffect(() => {
    const paramEmail = searchParams.get('email');
    if (paramEmail && !verified) {
      const match = participants.find(p => p.email.toLowerCase() === paramEmail.trim().toLowerCase());
      if (match) {
        setEmail(paramEmail.trim().toLowerCase());
        setName(match.name);
        setVerified(true);
      }
    }
  }, [searchParams]);

  const handleVerify = (e) => {
    e.preventDefault();
    const match = participants.find(p => p.email.toLowerCase() === email.trim().toLowerCase());
    if (match) {
      setName(match.name);
      setVerified(true);
      setError('');
    } else {
      setError('Email not found in participant list. Please use the email you registered with.');
    }
  };

  if (!verified) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Life Design Training</h1>
          <p className="text-white/50 mb-2">RWJF Health Policy Fellows</p>
          <p className="text-white/40 text-sm mb-6">April 9–10, 2026 · Washington, DC</p>
          <div className="mb-8">
            <Countdown />
          </div>
          <form onSubmit={handleVerify} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <label className="block text-left text-xs uppercase tracking-wider text-white/50 mb-2">
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="Enter your registered email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 mb-4"
              required
            />
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/30 transition"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    );
  }

  const emailParam = encodeURIComponent(email);
  const steps = [
    {
      num: 1,
      icon: '📋',
      title: 'Complete the Pre-Training Survey',
      desc: 'Help us tailor the experience to your goals and current AI comfort level. Takes about 5 minutes.',
      to: `/survey?email=${emailParam}`,
      btn: 'Take the Survey',
      color: 'purple',
    },
    {
      num: 2,
      icon: '📅',
      title: 'Book Your One-on-One Sessions',
      desc: 'Sign up for a session with Dr. Cerulli (CV review) and Dr. Dulin (AI training) on April 9–10.',
      to: `/schedule?email=${emailParam}`,
      btn: 'Schedule Sessions',
      color: 'emerald',
    },
    {
      num: 3,
      icon: '🧭',
      title: 'Share Your Values & Principles',
      desc: 'Select your core values and guiding principles. Results build a live word cloud for the group.',
      to: `/values?email=${emailParam}`,
      btn: 'Values Survey',
      color: 'blue',
    },
    {
      num: 4,
      icon: '📓',
      title: 'Workshop Workbook',
      desc: 'Map your intellectual areas of inspiration, find synergies, and set SMART goals for the year.',
      to: `/worksheet?email=${emailParam}`,
      btn: 'Open Workbook',
      color: 'amber',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12">
      <WorkshopNav email={email} />
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">👋</div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome, {name.split(' ')[0]}!
          </h1>
          <p className="text-white/50 text-sm">
            Your workshop tools and activities are below.
          </p>
          <div className="mt-4">
            <Countdown />
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((s) => {
            const colorMap = {
              purple: { border: 'border-purple-500/30 hover:border-purple-500/50', num: 'bg-purple-500/20 text-purple-400', btn: 'bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30' },
              emerald: { border: 'border-emerald-500/30 hover:border-emerald-500/50', num: 'bg-emerald-500/20 text-emerald-400', btn: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30' },
              blue: { border: 'border-blue-500/30 hover:border-blue-500/50', num: 'bg-blue-500/20 text-blue-400', btn: 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30' },
              amber: { border: 'border-amber-500/30 hover:border-amber-500/50', num: 'bg-amber-500/20 text-amber-400', btn: 'bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30' },
            };
            const c = colorMap[s.color] || colorMap.emerald;
            const border = c.border;
            const numBg = c.num;
            const btnClass = c.btn;

            return (
              <Link
                key={s.num}
                to={s.to}
                className={`block bg-white/[0.03] border ${border} rounded-2xl p-6 transition group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full ${numBg} flex items-center justify-center font-bold text-lg`}>
                    {s.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{s.icon}</span>
                      <h2 className="text-lg font-semibold text-white">{s.title}</h2>
                    </div>
                    <p className="text-white/50 text-sm mb-4">{s.desc}</p>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 border ${btnClass} rounded-xl text-sm font-medium transition`}>
                      {s.btn}
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-white/30 text-xs mt-8">
          Questions? Email{' '}
          <a href="mailto:mdulin@gmail.com" className="text-emerald-400/60 hover:text-emerald-400 transition">
            mdulin@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
