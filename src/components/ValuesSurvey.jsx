import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doc, setDoc, collection, getDocs, onSnapshot, serverTimestamp } from 'firebase/firestore';
import WorkshopNav from './WorkshopNav';
import { db } from '../firebase-config';

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

const suggestedValues = [
  'Joy', 'Community', 'Service', 'Autonomy', 'Change',
  'Resilience', 'Debt Free', 'Flexibility', 'Health', 'Freedom / Choice',
  'Sustainability', 'Security', 'Justice', 'Loyalty', 'Self Awareness',
  'Altruism', 'Curiosity', 'Purpose', 'Creativity', 'Knowledge',
  'Gratefulness', 'Faith', 'Honesty', 'Humility', 'Empathy', 'Magic',
];

export default function ValuesSurvey() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [selectedValues, setSelectedValues] = useState([]);
  const [customValue, setCustomValue] = useState('');
  const [principles, setPrinciples] = useState(['', '', '']);
  const [whyMatter, setWhyMatter] = useState('');

  // Auto-verify from URL
  useEffect(() => {
    const paramEmail = searchParams.get('email');
    if (paramEmail && !verified) {
      const cleaned = paramEmail.trim().toLowerCase();
      const match = participants.find(p => p.email.toLowerCase() === cleaned);
      if (match) {
        setEmail(cleaned);
        setName(match.name);
        checkAlreadySubmitted(cleaned);
        setVerified(true);
      }
    }
  }, [searchParams]);

  const checkAlreadySubmitted = async (emailToCheck) => {
    try {
      const snap = await getDocs(collection(db, 'valuesResponses'));
      const existing = snap.docs.find(d => d.data().email?.toLowerCase() === emailToCheck.toLowerCase());
      if (existing) setAlreadySubmitted(true);
    } catch (e) { /* proceed */ }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const cleaned = email.trim().toLowerCase();
    const match = participants.find(p => p.email.toLowerCase() === cleaned);
    if (match) {
      setName(match.name);
      setVerified(true);
      checkAlreadySubmitted(cleaned);
      setError('');
    } else {
      setError('Email not found. Please use the email you registered with.');
    }
  };

  const toggleValue = (val) => {
    setSelectedValues(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : prev.length < 7 ? [...prev, val] : prev
    );
  };

  const addCustomValue = () => {
    const trimmed = customValue.trim();
    if (trimmed && !selectedValues.includes(trimmed) && selectedValues.length < 7) {
      setSelectedValues(prev => [...prev, trimmed]);
      setCustomValue('');
    }
  };

  const updatePrinciple = (idx, val) => {
    setPrinciples(prev => prev.map((p, i) => i === idx ? val : p));
  };

  const handleSubmit = async () => {
    const filledPrinciples = principles.filter(p => p.trim());
    setSubmitting(true);
    try {
      const docId = email.replace(/[^a-zA-Z0-9]/g, '_');
      await setDoc(doc(db, 'valuesResponses', docId), {
        email,
        name,
        values: selectedValues,
        principles: filledPrinciples,
        whyMatter: whyMatter.trim(),
        submittedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Submit error:', e);
      alert('Failed to submit. Please try again.');
    }
    setSubmitting(false);
  };

  // Email entry
  if (!verified) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">🧭</div>
          <h1 className="text-3xl font-bold text-white mb-2">Values & Principles</h1>
          <p className="text-white/50 text-sm mb-6">AI Life Design Training</p>
          <form onSubmit={handleVerify} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <label className="block text-left text-xs uppercase tracking-wider text-white/50 mb-2">Your email</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="Enter your registered email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 mb-4"
              required
            />
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <button type="submit" className="w-full py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/30 transition">
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Already submitted
  if (alreadySubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-white mb-2">Already Submitted</h1>
          <p className="text-white/50 text-sm mb-6">Thanks, {name.split(' ')[0]}! You've already shared your values and principles.</p>
          <a href="/values/cloud" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/30 transition">
            View the Word Cloud →
          </a>
        </div>
      </div>
    );
  }

  // Success
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-white mb-2">Thank You, {name.split(' ')[0]}!</h1>
          <p className="text-white/50 text-sm mb-6">Your values and principles have been captured. We'll use these during the training to explore how your work and life align with what matters most to you.</p>
          <a href="/values/cloud" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/30 transition">
            View the Word Cloud →
          </a>
        </div>
      </div>
    );
  }

  // Survey form
  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <WorkshopNav email={email} />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">🧭</div>
          <h1 className="text-2xl font-bold text-white mb-1">What Matters Most to You?</h1>
          <p className="text-white/40 text-sm">{name} — AI Life Design Training</p>
        </div>

        {/* Section 1: Values */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-1">Your Core Values</h2>
          <p className="text-white/40 text-sm mb-4">
            Select 3–7 values that resonate most with you. These are the qualities and ideals that guide your decisions and define who you are.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedValues.map(val => {
              const selected = selectedValues.includes(val);
              return (
                <button
                  key={val}
                  onClick={() => toggleValue(val)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    selected
                      ? 'bg-emerald-500/25 border-emerald-500/40 text-emerald-400'
                      : 'bg-white/[0.03] border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                  }`}
                >
                  {selected && '✓ '}{val}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customValue}
              onChange={e => setCustomValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomValue())}
              placeholder="Add your own value..."
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/40 text-sm"
            />
            <button
              onClick={addCustomValue}
              disabled={!customValue.trim() || selectedValues.length >= 7}
              className="px-4 py-2 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 rounded-xl text-sm hover:bg-emerald-500/25 transition disabled:opacity-30"
            >
              Add
            </button>
          </div>

          <p className="text-white/20 text-xs mt-2">{selectedValues.length}/7 selected{selectedValues.length < 3 ? ' (minimum 3)' : ''}</p>

          {selectedValues.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {selectedValues.map(val => (
                <span key={val} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 rounded-full text-sm">
                  {val}
                  <button onClick={() => setSelectedValues(prev => prev.filter(v => v !== val))} className="text-emerald-400/50 hover:text-emerald-400 ml-0.5">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Principles */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-1">Your Guiding Principles</h2>
          <p className="text-white/40 text-sm mb-4">
            What are 1–3 principles or beliefs that guide how you live and work? These are the rules or truths you come back to when making important decisions.
          </p>

          {principles.map((p, i) => (
            <div key={i} className="mb-3">
              <label className="text-white/30 text-xs mb-1 block">Principle {i + 1}{i === 0 ? '' : ' (optional)'}</label>
              <input
                type="text"
                value={p}
                onChange={e => updatePrinciple(i, e.target.value)}
                placeholder={
                  i === 0 ? 'e.g., "Always lead with empathy"'
                  : i === 1 ? 'e.g., "Progress over perfection"'
                  : 'e.g., "Leave things better than I found them"'
                }
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/15 focus:outline-none focus:border-purple-500/40 text-sm"
              />
            </div>
          ))}
        </div>

        {/* Section 3: Why */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-1">Why Do These Matter?</h2>
          <p className="text-white/40 text-sm mb-4">
            In a few sentences, share why these values and principles are important to you right now. How do they connect to the work you're doing? (Optional)
          </p>
          <textarea
            value={whyMatter}
            onChange={e => setWhyMatter(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/15 focus:outline-none focus:border-emerald-500/40 text-sm resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold rounded-xl hover:bg-emerald-500/30 transition disabled:opacity-30 disabled:cursor-not-allowed text-lg"
        >
          {submitting ? 'Submitting...' : 'Submit My Values & Principles'}
        </button>
      </div>
    </div>
  );
}
