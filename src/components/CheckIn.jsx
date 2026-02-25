import React, { useState, useEffect, useCallback } from 'react';
import { Send, CheckCircle, ChevronDown, ChevronUp, Clock, Check } from 'lucide-react';
import { doc, setDoc, onSnapshot, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase-config';

const scaleColors = [
  { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-red-300', dot: 'bg-red-400' },
  { bg: 'bg-orange-500/20', border: 'border-orange-500/40', text: 'text-orange-300', dot: 'bg-orange-400' },
  { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-300', dot: 'bg-yellow-400' },
  { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-300', dot: 'bg-emerald-400' },
  { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-300', dot: 'bg-cyan-400' },
];

const textQuestionMeta = {
  highlight: { emoji: '✨', color: 'from-amber-500/10 to-yellow-500/5', borderColor: 'hover:border-amber-500/30', accentColor: 'text-amber-400', labelBg: 'bg-amber-500/10', labelText: 'text-amber-400/60' },
  challenge: { emoji: '🔥', color: 'from-rose-500/10 to-red-500/5', borderColor: 'hover:border-rose-500/30', accentColor: 'text-rose-400', labelBg: 'bg-rose-500/10', labelText: 'text-rose-400/60' },
  intention: { emoji: '🎯', color: 'from-blue-500/10 to-indigo-500/5', borderColor: 'hover:border-blue-500/30', accentColor: 'text-blue-400', labelBg: 'bg-blue-500/10', labelText: 'text-blue-400/60' },
};

const scaleQuestionMeta = {
  energy: { emoji: '⚡', color: 'from-purple-500/10 to-violet-500/5', borderColor: 'hover:border-purple-500/30', accentColor: 'text-purple-400' },
  momentum: { emoji: '🚀', color: 'from-emerald-500/10 to-teal-500/5', borderColor: 'hover:border-emerald-500/30', accentColor: 'text-emerald-400' },
  clarity: { emoji: '🔮', color: 'from-sky-500/10 to-cyan-500/5', borderColor: 'hover:border-sky-500/30', accentColor: 'text-sky-400' },
};

const checkInQuestions = [
  { id: 'energy', label: 'Energy Level', prompt: 'How\'s your energy today?', type: 'scale', min: 1, max: 5, labels: ['Drained', 'Low', 'Okay', 'Good', 'On fire'] },
  { id: 'momentum', label: 'Course Momentum', prompt: 'How engaged are you with the course material?', type: 'scale', min: 1, max: 5, labels: ['Stuck', 'Slow', 'Steady', 'Rolling', 'Flying'] },
  { id: 'clarity', label: 'Clarity', prompt: 'How clear are you on your direction right now?', type: 'scale', min: 1, max: 5, labels: ['Foggy', 'Hazy', 'Getting there', 'Clear', 'Crystal'] },
  { id: 'highlight', label: 'Highlight', prompt: 'What\'s one thing that went well today?', type: 'text' },
  { id: 'challenge', label: 'Challenge', prompt: 'What\'s one thing you\'re struggling with?', type: 'text' },
  { id: 'intention', label: 'Intention', prompt: 'What\'s your one focus for tomorrow?', type: 'text' },
];

function isQuestionComplete(q, responses) {
  if (q.type === 'scale') return !!responses[q.id];
  return !!responses[q.id]?.trim();
}

export default function CheckIn({ user }) {
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pastCheckIns, setPastCheckIns] = useState([]);
  const [expandedPast, setExpandedPast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load past check-ins
  useEffect(() => {
    if (!user?.uid) { setLoading(false); return; }

    const q = query(
      collection(db, 'checkins', user.uid, 'entries'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsub = onSnapshot(q, (snap) => {
      setPastCheckIns(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));

    return unsub;
  }, [user?.uid]);

  // Check if already checked in today
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const alreadyCheckedIn = pastCheckIns.some(c => {
    const d = c.createdAt ? new Date(c.createdAt) : null;
    return d && d >= todayStart;
  });

  const updateResponse = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.uid) return;
    setSubmitting(true);
    try {
      const dayId = todayStart.toISOString().split('T')[0];
      await setDoc(doc(db, 'checkins', user.uid, 'entries', dayId), {
        ...responses,
        createdAt: new Date().toISOString(),
        userEmail: user.email,
        userName: user.displayName,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('[checkIn] save error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getWeekLabel = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isComplete = checkInQuestions.every(q => isQuestionComplete(q, responses));
  const completedCount = checkInQuestions.filter(q => isQuestionComplete(q, responses)).length;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Check In</h1>
          <p className="text-white/40 text-sm mt-1">Take a few minutes to reflect on your day</p>
        </div>
        {!alreadyCheckedIn && !submitted && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
            <span className="text-xs text-white/40">{completedCount}/{checkInQuestions.length}</span>
            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / checkInQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Current check-in form */}
      {alreadyCheckedIn || submitted ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
          <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Checked in today</h3>
          <p className="text-sm text-white/40">Come back tomorrow for your next check-in.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {checkInQuestions.map((q) => {
            const done = isQuestionComplete(q, responses);
            const meta = q.type === 'scale' ? scaleQuestionMeta[q.id] : textQuestionMeta[q.id];

            return (
              <div
                key={q.id}
                className={`relative bg-gradient-to-br ${meta?.color || ''} border border-white/10 ${meta?.borderColor || ''} rounded-2xl p-5 transition-all duration-300 ${done ? 'ring-1 ring-emerald-500/20' : ''} hover:shadow-lg hover:shadow-white/[0.02] hover:scale-[1.005]`}
              >
                {/* Completion check */}
                {done && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-1">
                  {meta?.emoji && <span className="text-lg">{meta.emoji}</span>}
                  <label className={`text-sm font-semibold ${meta?.accentColor || 'text-white'}`}>{q.label}</label>
                </div>
                <p className="text-xs text-white/40 mb-3">{q.prompt}</p>

                {q.type === 'scale' ? (
                  <div className="flex gap-2">
                    {q.labels.map((label, i) => {
                      const val = i + 1;
                      const selected = responses[q.id] === val;
                      const colors = scaleColors[i];
                      return (
                        <button
                          key={val}
                          onClick={() => updateResponse(q.id, val)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                            selected
                              ? `${colors.bg} ${colors.border} ${colors.text} scale-105 shadow-md`
                              : 'bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.06] hover:text-white/60 hover:scale-[1.02]'
                          }`}
                        >
                          <div className="text-lg mb-0.5">{val}</div>
                          <div className="text-[9px] leading-tight">{label}</div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <textarea
                    value={responses[q.id] || ''}
                    onChange={(e) => updateResponse(q.id, e.target.value)}
                    rows={3}
                    className={`w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-white text-sm resize-none focus:outline-none focus:border-emerald-500/40 placeholder-white/20 transition`}
                    placeholder="Write your thoughts..."
                  />
                )}
              </div>
            );
          })}

          <button
            onClick={handleSubmit}
            disabled={!isComplete || submitting}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition ${
              isComplete
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Submitting...' : 'Submit Check In'}
          </button>
        </div>
      )}

      {/* Past check-ins */}
      {pastCheckIns.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3">Past Check-Ins</h2>
          <div className="space-y-2">
            {pastCheckIns.map((ci) => {
              const isExpanded = expandedPast === ci.id;
              return (
                <div key={ci.id} className="bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all">
                  <button
                    onClick={() => setExpandedPast(isExpanded ? null : ci.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  >
                    <Clock className="w-4 h-4 text-white/20 shrink-0" />
                    <span className="text-sm text-white/50">{getWeekLabel(ci.createdAt)}</span>
                    <div className="flex-1 flex gap-1.5 justify-end">
                      {['energy', 'momentum', 'clarity'].map(key => {
                        const val = ci[key];
                        if (!val) return null;
                        const colors = scaleColors[val - 1];
                        return (
                          <span key={key} className={`text-[10px] px-1.5 py-0.5 ${colors.bg} rounded ${colors.text}`}>
                            {val}/5
                          </span>
                        );
                      })}
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-white/20" /> : <ChevronDown className="w-4 h-4 text-white/20" />}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-3">
                      {checkInQuestions.map(q => {
                        const val = ci[q.id];
                        if (!val) return null;
                        const meta = q.type === 'scale' ? scaleQuestionMeta[q.id] : textQuestionMeta[q.id];
                        return (
                          <div key={q.id}>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              {meta?.emoji && <span className="text-xs">{meta.emoji}</span>}
                              <span className={`text-[10px] font-bold uppercase tracking-wider ${meta?.accentColor || 'text-emerald-400/50'}`}>{q.label}</span>
                            </div>
                            {q.type === 'scale' ? (
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${scaleColors[val - 1].dot}`} />
                                <p className="text-sm text-white/50">{val}/5 — {q.labels[val - 1]}</p>
                              </div>
                            ) : (
                              <p className="text-sm text-white/50 mt-0.5">{val}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
