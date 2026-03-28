import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db, auth, googleProvider } from '../firebase-config';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  ArrowLeft, RefreshCw, Users, Calendar, ClipboardList, CheckCircle,
  XCircle, ChevronDown, ChevronRight, Clock, User, LogOut,
} from 'lucide-react';

const ADMIN_EMAILS = ['mdulin@gmail.com', 'catherine_cerulli@urmc.rochester.edu'];

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

const baselineQuestions = [
  { id: 'baseline_reflection', label: 'Self-Reflection', labels: ['Rarely', 'Sometimes', 'Monthly', 'Weekly', 'Daily'] },
  { id: 'baseline_goals', label: 'Life Design & Planning', labels: ['React as needed', 'Occasional goals', 'Annual planning', 'Quarterly reviews', 'Active life design'] },
  { id: 'baseline_habits', label: 'Intentional Habits', labels: ['No system', 'Trying', 'Some routines', 'Consistent', 'Systematic'] },
  { id: 'baseline_balance', label: 'Energy & Balance Awareness', labels: ['Not tracked', 'Vague sense', 'Somewhat aware', 'Good awareness', 'Track actively'] },
  { id: 'baseline_ai', label: 'AI Tool Usage', labels: ['Never tried', 'Explored once', 'Occasional use', 'Regular use', 'Power user'] },
  { id: 'baseline_tech', label: 'Building Digital Tools', labels: ['Not at all', 'Very basic', 'Some experience', 'Comfortable', 'Build regularly'] },
];

const rulerQuestions = [
  { id: 'importance_intentional', label: 'Importance of Intentional Life Design' },
  { id: 'confidence_change', label: 'Confidence in Making Changes' },
];

const textQuestions = [
  { id: 'excites_most', label: 'What excites you most?' },
  { id: 'one_change', label: 'One thing you\'d want to change' },
  { id: 'already_doing_well', label: 'What\'s already working' },
  { id: 'concerns', label: 'Questions or curiosities' },
  { id: 'why_not_lower', label: 'Why this matters' },
  { id: 'one_point_higher', label: 'What would build confidence' },
];

const instructors = [
  { id: 'cerulli', name: 'Dr. Kate Cerulli', title: 'CV Review & Career Strategy', emoji: '📋', color: 'purple' },
  { id: 'dulin', name: 'Dr. Mike Dulin', title: 'AI Training & Implementation', emoji: '🤖', color: 'emerald' },
];

const slotTimes = [
  { start: '12:00 PM', end: '12:45 PM' },
  { start: '1:00 PM', end: '1:45 PM' },
  { start: '2:00 PM', end: '2:45 PM' },
  { start: '3:00 PM', end: '3:45 PM' },
  { start: '4:00 PM', end: '4:45 PM' },
];

const days = [
  { id: 'apr9', label: 'Thursday, April 9', short: 'Apr 9' },
  { id: 'apr10', label: 'Friday, April 10', short: 'Apr 10' },
];

// ─── Individual response card ───
function ResponseCard({ response, expanded, onToggle }) {
  const r = response.responses || {};
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-sm font-bold">
          {response.name?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white/90 text-sm font-medium">{response.name}</p>
          <p className="text-white/30 text-xs truncate">{response.email}</p>
        </div>
        <span className="text-white/20 text-xs">
          {response.submittedAtLocal ? new Date(response.submittedAtLocal).toLocaleDateString() : ''}
        </span>
        {expanded ? <ChevronDown className="w-4 h-4 text-white/30" /> : <ChevronRight className="w-4 h-4 text-white/30" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-white/5 pt-4">
          {/* Baseline scales */}
          <div>
            <h4 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Starting Points</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {baselineQuestions.map(q => {
                const val = r[q.id];
                return (
                  <div key={q.id} className="bg-white/[0.03] rounded-lg px-3 py-2.5">
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{q.label}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-emerald-400 font-bold text-lg">{val || '—'}</span>
                      <span className="text-white/20 text-xs">/5</span>
                    </div>
                    <p className="text-white/30 text-[10px] mt-0.5">{val ? q.labels[val - 1] : 'No answer'}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ruler questions */}
          <div>
            <h4 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Readiness</h4>
            <div className="grid grid-cols-2 gap-2">
              {rulerQuestions.map(q => {
                const val = r[q.id];
                return (
                  <div key={q.id} className="bg-white/[0.03] rounded-lg px-3 py-2.5">
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{q.label}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-emerald-400 font-bold text-lg">{val || '—'}</span>
                      <span className="text-white/20 text-xs">/10</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text responses */}
          <div>
            <h4 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">In Their Own Words</h4>
            <div className="space-y-3">
              {textQuestions.map(q => {
                const val = r[q.id];
                if (!val) return null;
                return (
                  <div key={q.id}>
                    <p className="text-white/50 text-xs font-medium mb-1">{q.label}</p>
                    <p className="text-white/70 text-sm leading-relaxed bg-white/[0.03] rounded-lg px-3 py-2">{val}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Schedule overview ───
function ScheduleOverview({ bookings }) {
  const bookingList = Object.values(bookings);

  return (
    <div className="space-y-6">
      {instructors.map(inst => {
        const instBookings = bookingList.filter(b => b.instructorId === inst.id);
        return (
          <div key={inst.id}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{inst.emoji}</span>
              <h3 className={`font-semibold text-sm ${inst.color === 'purple' ? 'text-purple-400' : 'text-emerald-400'}`}>
                {inst.name}
              </h3>
              <span className="text-white/20 text-xs">— {inst.title}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {days.map(day => (
                <div key={day.id} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-white/5 bg-white/[0.01]">
                    <p className="text-white/60 text-sm font-medium">{day.label}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    {slotTimes.map((slot, idx) => {
                      const key = `${inst.id}_${day.id}_${idx}`;
                      const booking = bookings[key];
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            booking
                              ? `${inst.color === 'purple' ? 'bg-purple-500/10 border border-purple-500/15' : 'bg-emerald-500/10 border border-emerald-500/15'}`
                              : 'bg-white/[0.01] border border-white/5 opacity-40'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-white/30 shrink-0" />
                          <span className="text-white/50 w-28 shrink-0">{slot.start}</span>
                          {booking ? (
                            <span className={`font-medium text-sm ${inst.color === 'purple' ? 'text-purple-300' : 'text-emerald-300'}`}>
                              {booking.participantName}
                            </span>
                          ) : (
                            <span className="text-white/20 italic">Open</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Unbooked participants */}
      {(() => {
        const bookedEmails = new Set(bookingList.map(b => b.participantEmail?.toLowerCase()));
        const unbookedForCerulli = participants.filter(p => !bookingList.some(b => b.instructorId === 'cerulli' && b.participantEmail === p.email.toLowerCase()));
        const unbookedForDulin = participants.filter(p => !bookingList.some(b => b.instructorId === 'dulin' && b.participantEmail === p.email.toLowerCase()));

        if (unbookedForCerulli.length === 0 && unbookedForDulin.length === 0) return null;

        return (
          <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4">
            <h4 className="text-amber-400/80 text-xs font-medium uppercase tracking-wider mb-3">Still Need to Book</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {unbookedForCerulli.length > 0 && (
                <div>
                  <p className="text-white/40 text-xs mb-1.5">📋 Kate Cerulli ({unbookedForCerulli.length} remaining)</p>
                  <div className="space-y-1">
                    {unbookedForCerulli.map(p => (
                      <p key={p.email} className="text-white/50 text-sm">{p.name}</p>
                    ))}
                  </div>
                </div>
              )}
              {unbookedForDulin.length > 0 && (
                <div>
                  <p className="text-white/40 text-xs mb-1.5">🤖 Mike Dulin ({unbookedForDulin.length} remaining)</p>
                  <div className="space-y-1">
                    {unbookedForDulin.map(p => (
                      <p key={p.email} className="text-white/50 text-sm">{p.name}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── Main admin dashboard ───
export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [tab, setTab] = useState('survey'); // 'survey' | 'schedule'
  const [surveyData, setSurveyData] = useState([]);
  const [bookings, setBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedIdx, setExpandedIdx] = useState(null);

  // Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && ADMIN_EMAILS.includes(u.email?.toLowerCase())) {
        setUser(u);
      } else {
        setUser(null);
        if (u) signOut(auth);
      }
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // Load survey data
  const loadSurvey = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'surveyResponses'));
      setSurveyData(snap.docs.map(d => d.data()));
    } catch (e) {
      console.error('Error loading survey:', e);
    }
    setLoading(false);
  };

  // Real-time bookings
  useEffect(() => {
    if (!user) return;
    loadSurvey();
    const unsub = onSnapshot(collection(db, 'scheduleBookings'), (snap) => {
      const data = {};
      snap.docs.forEach(d => { data[d.id] = d.data(); });
      setBookings(data);
    });
    return unsub;
  }, [user]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!ADMIN_EMAILS.includes(result.user.email?.toLowerCase())) {
        await signOut(auth);
      }
    } catch (e) {
      if (e.code !== 'auth/popup-closed-by-user') {
        console.error('Sign-in error:', e);
      }
    }
  };

  // Auth loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-1">Instructor Admin</h1>
          <p className="text-white/50 text-sm mb-8">Sign in with your instructor account</p>
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl transition active:scale-[0.98] shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>
          <a href="/" className="block mt-6 text-emerald-400/60 hover:text-emerald-400 text-sm transition">
            ← Back to course
          </a>
        </div>
      </div>
    );
  }

  // Determine who has/hasn't responded
  const respondedEmails = new Set(surveyData.map(d => d.email?.toLowerCase()));
  const responded = participants.filter(p => respondedEmails.has(p.email.toLowerCase()));
  const notResponded = participants.filter(p => !respondedEmails.has(p.email.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="border-b border-white/5 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-white/30 hover:text-white/60 transition">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-white font-semibold text-lg">Instructor Admin</h1>
              <p className="text-white/40 text-xs">{user.displayName || user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadSurvey} className="text-white/30 hover:text-white/60 transition p-2" title="Refresh data">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={() => signOut(auth)} className="text-white/30 hover:text-white/60 transition p-2" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 flex gap-1">
          <button
            onClick={() => setTab('survey')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition ${
              tab === 'survey'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-white/40 hover:text-white/60'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Survey Responses
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === 'survey' ? 'bg-emerald-500/20' : 'bg-white/[0.05]'}`}>
              {surveyData.length}/9
            </span>
          </button>
          <button
            onClick={() => setTab('schedule')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition ${
              tab === 'schedule'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-white/40 hover:text-white/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Schedule
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === 'schedule' ? 'bg-emerald-500/20' : 'bg-white/[0.05]'}`}>
              {Object.keys(bookings).length}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tab === 'survey' ? (
          <div className="space-y-6">
            {/* Response status overview */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/50 text-xs uppercase tracking-wider">Responded</span>
                </div>
                <p className="text-emerald-400 text-2xl font-bold">{responded.length}</p>
                <div className="mt-2 space-y-0.5">
                  {responded.map(p => (
                    <p key={p.email} className="text-emerald-400/70 text-xs">{p.name}</p>
                  ))}
                </div>
              </div>
              <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span className="text-white/50 text-xs uppercase tracking-wider">Not Yet</span>
                </div>
                <p className="text-red-400 text-2xl font-bold">{notResponded.length}</p>
                <div className="mt-2 space-y-0.5">
                  {notResponded.map(p => (
                    <p key={p.email} className="text-red-400/70 text-xs">{p.name}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual responses */}
            <div>
              <h2 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Individual Responses</h2>
              {surveyData.length === 0 ? (
                <div className="text-center py-12 bg-white/[0.02] border border-white/5 rounded-xl">
                  <ClipboardList className="w-10 h-10 text-white/10 mx-auto mb-3" />
                  <p className="text-white/30 text-sm">No responses yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {surveyData.map((r, i) => (
                    <ResponseCard
                      key={r.email || i}
                      response={r}
                      expanded={expandedIdx === i}
                      onToggle={() => setExpandedIdx(expandedIdx === i ? null : i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <ScheduleOverview bookings={bookings} />
        )}
      </div>
    </div>
  );
}
