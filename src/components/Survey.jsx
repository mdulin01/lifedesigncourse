import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Send, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { doc, setDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';

// Participant registry
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
];

// April 9, 2026 at 8:00 AM EDT (UTC-4)
const COURSE_START = new Date('2026-04-09T08:00:00-04:00');

function CountdownTimer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = COURSE_START - now;
  if (diff <= 0) return <span className="text-emerald-400 font-bold">Right now!</span>;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {[
        { value: days, label: 'days' },
        { value: hours, label: 'hrs' },
        { value: minutes, label: 'min' },
        { value: seconds, label: 'sec' },
      ].map((unit, i) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/[0.06] border border-white/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{String(unit.value).padStart(2, '0')}</span>
          </div>
          <span className="text-[10px] sm:text-xs text-white/40 mt-1.5 uppercase tracking-wider">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

// Scale question component
function ScaleQuestion({ question, value, onChange }) {
  const scaleColors = [
    { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-red-300', activeBg: 'bg-red-500/40' },
    { bg: 'bg-orange-500/20', border: 'border-orange-500/40', text: 'text-orange-300', activeBg: 'bg-orange-500/40' },
    { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-300', activeBg: 'bg-yellow-500/40' },
    { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-300', activeBg: 'bg-emerald-500/40' },
    { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-300', activeBg: 'bg-cyan-500/40' },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-white font-medium text-lg">{question.prompt}</h3>
      {question.subtext && <p className="text-white/50 text-sm">{question.subtext}</p>}
      <div className="flex gap-2 sm:gap-3 mt-4">
        {question.labels.map((label, i) => {
          const idx = i;
          const selected = value === i + 1;
          const colors = scaleColors[idx];
          return (
            <button
              key={i}
              onClick={() => onChange(i + 1)}
              className={`flex-1 py-3 px-1.5 rounded-xl border text-center transition-all ${
                selected
                  ? `${colors.activeBg} ${colors.border} ${colors.text} scale-[1.02] shadow-lg`
                  : `bg-white/[0.03] border-white/10 text-white/40 hover:bg-white/[0.06] hover:border-white/20`
              }`}
            >
              <div className="text-xl font-bold">{i + 1}</div>
              <div className="text-[10px] sm:text-xs mt-1 leading-tight">{label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Importance/confidence ruler (1-10)
function RulerQuestion({ question, value, onChange }) {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-medium text-lg">{question.prompt}</h3>
      {question.subtext && <p className="text-white/50 text-sm">{question.subtext}</p>}
      <div className="grid grid-cols-10 gap-1.5 mt-4">
        {Array.from({ length: 10 }, (_, i) => {
          const n = i + 1;
          const selected = value === n;
          const hue = Math.round((i / 9) * 120); // red(0) → green(120)
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`py-2.5 rounded-lg border text-center text-sm font-semibold transition-all ${
                selected
                  ? 'bg-emerald-500/30 border-emerald-500/50 text-emerald-300 scale-105 shadow-lg'
                  : 'bg-white/[0.03] border-white/10 text-white/40 hover:bg-white/[0.06]'
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-white/30 px-1">
        <span>{question.lowLabel}</span>
        <span>{question.highLabel}</span>
      </div>
    </div>
  );
}

// Text question
function TextQuestion({ question, value, onChange }) {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-medium text-lg">{question.prompt}</h3>
      {question.subtext && <p className="text-white/50 text-sm italic">{question.subtext}</p>}
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={question.rows || 3}
        placeholder={question.placeholder || 'Share your thoughts...'}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-4 text-white/90 placeholder-white/20 resize-none focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.06] transition text-sm leading-relaxed"
      />
    </div>
  );
}

// Survey sections
const surveyQuestions = [
  // Section 0: Identify
  {
    sectionTitle: null,
    questions: [{ id: 'email', type: 'identify' }],
  },
  // Section 1: Baseline — current practices
  {
    sectionTitle: 'Where You Are Now',
    sectionSubtitle: 'Rate your current engagement with each of these practices. There are no wrong answers — this is your starting point.',
    questions: [
      {
        id: 'baseline_reflection',
        type: 'scale',
        prompt: 'How regularly do you practice intentional self-reflection?',
        subtext: 'Journaling, structured thinking about your values, life direction, or personal growth.',
        labels: ['Rarely', 'Sometimes', 'Monthly', 'Weekly', 'Daily'],
      },
      {
        id: 'baseline_goals',
        type: 'scale',
        prompt: 'How actively do you design and plan your future?',
        subtext: 'Setting structured goals, mapping out life paths, prototyping next steps.',
        labels: ['React as needed', 'Occasional goals', 'Annual planning', 'Quarterly reviews', 'Active life design'],
      },
      {
        id: 'baseline_habits',
        type: 'scale',
        prompt: 'How intentional are your daily habits and routines?',
        subtext: 'Tracking habits, using systems, designing your environment for behavior change.',
        labels: ['No system', 'Trying', 'Some routines', 'Consistent', 'Systematic'],
      },
      {
        id: 'baseline_balance',
        type: 'scale',
        prompt: 'How aware are you of your energy and life balance?',
        subtext: 'Knowing what energizes vs. drains you, monitoring health/work/play/love balance.',
        labels: ['Not tracked', 'Vague sense', 'Somewhat aware', 'Good awareness', 'Track actively'],
      },
      {
        id: 'baseline_ai',
        type: 'scale',
        prompt: 'How much do you currently use AI tools in your work?',
        subtext: 'Using Claude, ChatGPT, or similar tools for research, writing, analysis, or building.',
        labels: ['Never tried', 'Explored once', 'Occasional use', 'Regular use', 'Power user'],
      },
      {
        id: 'baseline_tech',
        type: 'scale',
        prompt: 'How comfortable are you building digital tools?',
        subtext: 'Creating websites, apps, dashboards, or automated workflows.',
        labels: ['Not at all', 'Very basic', 'Some experience', 'Comfortable', 'Build regularly'],
      },
    ],
  },
  // Section 2: MI — Importance & Confidence
  {
    sectionTitle: 'What Matters to You',
    sectionSubtitle: 'These questions help us understand what you value and where you see opportunity.',
    questions: [
      {
        id: 'importance_intentional',
        type: 'ruler',
        prompt: 'How important is it to you right now to be more intentional about designing your life?',
        lowLabel: 'Not important',
        highLabel: 'Extremely important',
      },
      {
        id: 'why_not_lower',
        type: 'text',
        prompt: 'Why did you choose that number and not a lower one?',
        subtext: 'This question comes from motivational interviewing — it helps surface what you already value.',
        placeholder: 'What makes intentional life design matter to you right now...',
        rows: 3,
      },
      {
        id: 'confidence_change',
        type: 'ruler',
        prompt: 'How confident are you that you can make meaningful changes in how you design your life over the next 8 weeks?',
        lowLabel: 'Not confident',
        highLabel: 'Very confident',
      },
      {
        id: 'one_point_higher',
        type: 'text',
        prompt: 'What would it take to move your confidence one point higher?',
        subtext: 'Think about support, tools, knowledge, or conditions that would help.',
        placeholder: 'What would help you feel more confident...',
        rows: 3,
      },
    ],
  },
  // Section 3: MI — Evocative questions
  {
    sectionTitle: 'Looking Forward',
    sectionSubtitle: 'Your responses help us tailor the experience to what matters most to this group.',
    questions: [
      {
        id: 'excites_most',
        type: 'text',
        prompt: 'What excites you most about this training?',
        subtext: 'What caught your attention? What are you hoping to experience?',
        placeholder: 'What drew you to this...',
        rows: 3,
      },
      {
        id: 'one_change',
        type: 'text',
        prompt: 'If this training could change one thing about how you approach your life or career, what would that be?',
        placeholder: 'The one thing I\'d want to shift...',
        rows: 3,
      },
      {
        id: 'already_doing_well',
        type: 'text',
        prompt: 'What\'s one thing you\'re already doing well that you\'d like to build on?',
        subtext: 'You\'re not starting from zero. What\'s already working?',
        placeholder: 'Something I want to strengthen...',
        rows: 3,
      },
      {
        id: 'concerns',
        type: 'text',
        prompt: 'Is there anything you\'re curious or uncertain about?',
        subtext: 'No question is too small. This helps us prepare.',
        placeholder: 'Questions, concerns, or things you\'re wondering about...',
        rows: 3,
      },
    ],
  },
];

export default function Survey() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [matchedParticipant, setMatchedParticipant] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const totalSections = surveyQuestions.length;

  const handleEmailSubmit = async () => {
    const cleaned = email.trim().toLowerCase();
    const match = participants.find(p => p.email.toLowerCase() === cleaned);
    if (!match) {
      setEmailError('That email isn\'t on our participant list. Try another email, or contact mdulin@gmail.com for help.');
      return;
    }
    setMatchedParticipant(match);
    setEmailError('');

    // Check if already submitted
    try {
      const snap = await getDocs(collection(db, 'surveyResponses'));
      const existing = snap.docs.find(d => d.data().email?.toLowerCase() === cleaned);
      if (existing) {
        setAlreadySubmitted(true);
        return;
      }
    } catch (e) {
      // If we can't check, proceed anyway
    }

    setStep(1);
  };

  const updateResponse = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const currentSection = surveyQuestions[step];

  const isSectionComplete = useMemo(() => {
    if (step === 0) return false; // email step handled separately
    if (!currentSection) return false;
    return currentSection.questions.every(q => {
      const val = responses[q.id];
      if (q.type === 'scale' || q.type === 'ruler') return !!val;
      if (q.type === 'text') return !!val?.trim();
      return true;
    });
  }, [step, responses, currentSection]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const docId = matchedParticipant.email.toLowerCase().replace(/[^a-z0-9]/g, '_');
      await setDoc(doc(db, 'surveyResponses', docId), {
        name: matchedParticipant.name,
        email: matchedParticipant.email.toLowerCase(),
        responses,
        submittedAt: serverTimestamp(),
        submittedAtLocal: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Survey submit error:', e);
      alert('Something went wrong saving your response. Please try again.');
    }
    setSubmitting(false);
  };

  // Already submitted screen
  if (alreadySubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-center">
          <div className="text-5xl mb-4">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">You're all set, {matchedParticipant?.name?.split(' ')[0]}!</h1>
          <p className="text-white/50 mb-8">We already have your responses. Thanks for taking the time.</p>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <p className="text-white/40 text-sm mb-3 uppercase tracking-wider">Your next step begins in</p>
            <CountdownTimer />
            <p className="text-white/30 text-xs mt-4">April 9, 2026 · 8:00 AM ET · Washington, DC</p>
          </div>
          <a href="/" className="inline-block mt-6 text-emerald-400/60 hover:text-emerald-400 text-sm transition">
            Explore the course →
          </a>
        </div>
      </div>
    );
  }

  // Thank you screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-center">
          <div className="mb-6">
            <Sparkles className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">
              Thank you, {matchedParticipant?.name?.split(' ')[0]}!
            </h1>
            <p className="text-white/60 leading-relaxed">
              Your responses will help shape our time together.
              We're looking forward to having you in the room.
            </p>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 mb-6">
            <p className="text-white/40 text-sm mb-3 uppercase tracking-wider">Your next step begins in</p>
            <CountdownTimer />
            <p className="text-white/30 text-xs mt-4">April 9, 2026 · 8:00 AM ET · Washington, DC</p>
          </div>
          <a href="/" className="inline-block text-emerald-400/60 hover:text-emerald-400 text-sm transition">
            Explore the course while you wait →
          </a>
        </div>
      </div>
    );
  }

  // Identification step
  if (step === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          {/* Countdown hero */}
          <div className="text-center mb-10">
            <div className="text-4xl mb-4">🧭</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">AI Life Design</h1>
            <p className="text-white/50 text-sm mb-6">Pre-Training Survey</p>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
              <p className="text-white/40 text-sm mb-3 uppercase tracking-wider">Your next step begins in</p>
              <CountdownTimer />
              <p className="text-white/30 text-xs mt-4">April 9, 2026 · 8:00 AM ET · Washington, DC</p>
            </div>
          </div>

          {/* Email entry */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Before we begin, this short survey helps us understand where everyone is starting from —
              and helps you start thinking about what you want from this experience. Takes about 5 minutes.
            </p>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
              placeholder="Enter your registered email"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/40 transition text-sm"
            />
            {emailError && (
              <p className="text-red-400/80 text-sm mt-2">{emailError}</p>
            )}
            <button
              onClick={handleEmailSubmit}
              disabled={!email.trim()}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/25 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Begin Survey
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main survey flow
  const isLastSection = step === totalSections - 1;
  const progress = ((step) / (totalSections - 1)) * 100;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5">
        <div
          className="h-full bg-emerald-500/60 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-1 z-40 px-4 pt-4 pb-2">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <p className="text-white/30 text-sm">
            {matchedParticipant?.name?.split(' ')[0]} · Section {step} of {totalSections - 1}
          </p>
          <div className="flex items-center gap-1.5 text-white/20 text-xs">
            <Clock className="w-3.5 h-3.5" />
            ~{totalSections - 1 - step} min left
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Section header */}
        {currentSection.sectionTitle && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{currentSection.sectionTitle}</h2>
            {currentSection.sectionSubtitle && (
              <p className="text-white/50 text-sm leading-relaxed">{currentSection.sectionSubtitle}</p>
            )}
          </div>
        )}

        {/* Questions */}
        <div className="space-y-8">
          {currentSection.questions.map((q) => {
            if (q.type === 'scale') {
              return <ScaleQuestion key={q.id} question={q} value={responses[q.id]} onChange={(v) => updateResponse(q.id, v)} />;
            }
            if (q.type === 'ruler') {
              return <RulerQuestion key={q.id} question={q} value={responses[q.id]} onChange={(v) => updateResponse(q.id, v)} />;
            }
            if (q.type === 'text') {
              return <TextQuestion key={q.id} question={q} value={responses[q.id]} onChange={(v) => updateResponse(q.id, v)} />;
            }
            return null;
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/5">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step <= 1}
            className="flex items-center gap-2 px-5 py-2.5 text-white/40 hover:text-white/70 transition disabled:opacity-20 disabled:cursor-not-allowed text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {isLastSection ? (
            <button
              onClick={handleSubmit}
              disabled={!isSectionComplete || submitting}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/30 transition disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Survey
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!isSectionComplete}
              className="flex items-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/10 text-white/80 font-medium rounded-xl hover:bg-white/[0.1] transition disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
