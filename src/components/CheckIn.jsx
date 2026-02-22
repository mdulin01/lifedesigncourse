import React, { useState, useEffect, useCallback } from 'react';
import { Send, CheckCircle, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { doc, setDoc, onSnapshot, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase-config';

const checkInQuestions = [
  { id: 'energy', label: 'Energy Level', prompt: 'How\'s your energy this week?', type: 'scale', min: 1, max: 5, labels: ['Drained', 'Low', 'Okay', 'Good', 'On fire'] },
  { id: 'momentum', label: 'Course Momentum', prompt: 'How engaged are you with the course material?', type: 'scale', min: 1, max: 5, labels: ['Stuck', 'Slow', 'Steady', 'Rolling', 'Flying'] },
  { id: 'clarity', label: 'Clarity', prompt: 'How clear are you on your direction right now?', type: 'scale', min: 1, max: 5, labels: ['Foggy', 'Hazy', 'Getting there', 'Clear', 'Crystal'] },
  { id: 'highlight', label: 'Highlight', prompt: 'What\'s one thing that went well this week?', type: 'text' },
  { id: 'challenge', label: 'Challenge', prompt: 'What\'s one thing you\'re struggling with?', type: 'text' },
  { id: 'intention', label: 'Intention', prompt: 'What\'s your one focus for next week?', type: 'text' },
];

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

  // Check if already checked in this week
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);
  const alreadyCheckedIn = pastCheckIns.some(c => {
    const d = c.createdAt ? new Date(c.createdAt) : null;
    return d && d >= weekStart;
  });

  const updateResponse = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.uid) return;
    setSubmitting(true);
    try {
      const weekId = weekStart.toISOString().split('T')[0];
      await setDoc(doc(db, 'checkins', user.uid, 'entries', weekId), {
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

  const isComplete = checkInQuestions.every(q =>
    q.type === 'scale' ? responses[q.id] : responses[q.id]?.trim()
  );

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Weekly Check In</h1>
        <p className="text-white/40 text-sm mt-1">Take a few minutes to reflect on your week</p>
      </div>

      {/* Current check-in form */}
      {alreadyCheckedIn || submitted ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
          <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Checked in this week</h3>
          <p className="text-sm text-white/40">Come back next week for your next check-in.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {checkInQuestions.map((q) => (
            <div key={q.id} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <label className="text-sm font-semibold text-white block mb-1">{q.label}</label>
              <p className="text-xs text-white/40 mb-3">{q.prompt}</p>

              {q.type === 'scale' ? (
                <div className="flex gap-2">
                  {q.labels.map((label, i) => {
                    const val = i + 1;
                    const selected = responses[q.id] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => updateResponse(q.id, val)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition border ${
                          selected
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : 'bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.06] hover:text-white/60'
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
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-white text-sm resize-none focus:outline-none focus:border-emerald-500/40 placeholder-white/20"
                  placeholder="Write your thoughts..."
                />
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={!isComplete || submitting}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition ${
              isComplete
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
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
                <div key={ci.id} className="bg-white/[0.02] border border-white/5 rounded-xl">
                  <button
                    onClick={() => setExpandedPast(isExpanded ? null : ci.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  >
                    <Clock className="w-4 h-4 text-white/20 shrink-0" />
                    <span className="text-sm text-white/50">{getWeekLabel(ci.createdAt)}</span>
                    <div className="flex-1 flex gap-1.5 justify-end">
                      {['energy', 'momentum', 'clarity'].map(key => (
                        ci[key] && <span key={key} className="text-[10px] px-1.5 py-0.5 bg-emerald-500/10 rounded text-emerald-400/60">{ci[key]}/5</span>
                      ))}
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-white/20" /> : <ChevronDown className="w-4 h-4 text-white/20" />}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-2">
                      {checkInQuestions.map(q => {
                        const val = ci[q.id];
                        if (!val) return null;
                        return (
                          <div key={q.id}>
                            <span className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-wider">{q.label}</span>
                            <p className="text-sm text-white/50 mt-0.5">
                              {q.type === 'scale' ? `${val}/5 — ${q.labels[val - 1]}` : val}
                            </p>
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
