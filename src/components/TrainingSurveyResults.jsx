import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase-config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { BarChart3, Users, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { allowedEmails } from '../constants';

const COLLECTION = 'trainingSurveys';

const SCALE_LABELS = ['', 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

const QUESTION_LABELS = {
  overall_valuable: 'Sessions were valuable use of time',
  overall_organized: 'Well-organized and easy to follow',
  overall_pace: 'Pace was appropriate',
  overall_recommend: 'Would recommend to a colleague',
  ai_confidence: 'More confident using AI tools',
  ai_practical: 'Learned practical skills',
  ai_website: 'Website exercise helped understand AI + coding',
  ai_continue: 'Plan to continue using AI tools',
  ld_values: 'Values/compass exercises were meaningful',
  ld_energy: 'Energy audit helped see priorities',
  ld_reflection: 'Exercises gave useful insights',
};

const SECTIONS = [
  { id: 'overall', label: 'Overall Experience', keys: ['overall_valuable', 'overall_organized', 'overall_pace', 'overall_recommend'] },
  { id: 'ai', label: 'AI & Vibe Coding', keys: ['ai_confidence', 'ai_practical', 'ai_website', 'ai_continue'] },
  { id: 'ld', label: 'Life Design', keys: ['ld_values', 'ld_energy', 'ld_reflection'] },
];

const OPEN_QUESTIONS = [
  { id: 'open_best', label: 'Most valuable part' },
  { id: 'open_improve', label: 'What could be improved' },
  { id: 'open_surprise', label: 'Surprises / perspective shifts' },
  { id: 'open_other', label: 'Other comments' },
];

function RatingBar({ label, values }) {
  const count = values.length;
  if (count === 0) return null;
  const avg = values.reduce((a, b) => a + b, 0) / count;
  const pct = (avg / 5) * 100;

  const dist = [0, 0, 0, 0, 0];
  values.forEach((v) => { if (v >= 1 && v <= 5) dist[v - 1]++; });

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-white/70 flex-1">{label}</span>
        <span className={`text-sm font-bold tabular-nums ${avg >= 4 ? 'text-emerald-400' : avg >= 3 ? 'text-yellow-400' : 'text-rose-400'}`}>
          {avg.toFixed(1)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${avg >= 4 ? 'bg-emerald-500' : avg >= 3 ? 'bg-yellow-500' : 'bg-rose-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex gap-0.5">
          {dist.map((d, i) => (
            <div key={i} className="text-[8px] text-white/20 w-4 text-center" title={`${SCALE_LABELS[i + 1]}: ${d}`}>
              {d > 0 ? d : '\u00B7'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrainingSurveyResults({ user }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOpen, setExpandedOpen] = useState({});

  const isAdmin = allowedEmails.includes(user?.email?.toLowerCase());

  useEffect(() => {
    if (!isAdmin) { setLoading(false); return; }
    const q = query(collection(db, COLLECTION));
    const unsub = onSnapshot(q, (snap) => {
      setResponses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, [isAdmin]);

  const submitted = useMemo(() => responses.filter((r) => r.submitted), [responses]);
  const drafts = useMemo(() => responses.filter((r) => !r.submitted), [responses]);

  const aggregated = useMemo(() => {
    const agg = {};
    for (const r of submitted) {
      const resp = r.responses || {};
      for (const [key, val] of Object.entries(resp)) {
        if (typeof val === 'number') {
          if (!agg[key]) agg[key] = [];
          agg[key].push(val);
        }
      }
    }
    return agg;
  }, [submitted]);

  const overallAvg = useMemo(() => {
    const allVals = Object.values(aggregated).flat();
    return allVals.length > 0 ? allVals.reduce((a, b) => a + b, 0) / allVals.length : 0;
  }, [aggregated]);

  const sectionAvgs = useMemo(() => {
    return SECTIONS.map((s) => {
      const vals = s.keys.flatMap((k) => aggregated[k] || []);
      const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
      return { ...s, avg };
    });
  }, [aggregated]);

  const openResponses = useMemo(() => {
    const grouped = {};
    for (const q of OPEN_QUESTIONS) {
      grouped[q.id] = [];
      for (const r of submitted) {
        const text = r.responses?.[q.id];
        if (text && text.trim()) {
          grouped[q.id].push({ name: r.name, text: text.trim() });
        }
      }
    }
    return grouped;
  }, [submitted]);

  if (!isAdmin) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <Users className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-white/80"><strong className="text-emerald-400">{submitted.length}</strong> submitted</span>
        </div>
        {drafts.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <span className="text-sm text-white/80"><strong className="text-yellow-400">{drafts.length}</strong> in progress</span>
          </div>
        )}
        {submitted.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl">
            <BarChart3 className="w-4 h-4 text-white/40" />
            <span className="text-sm text-white/80">Overall: <strong className={overallAvg >= 4 ? 'text-emerald-400' : overallAvg >= 3 ? 'text-yellow-400' : 'text-rose-400'}>{overallAvg.toFixed(1)}</strong>/5</span>
          </div>
        )}
      </div>

      {submitted.length === 0 ? (
        <p className="text-sm text-white/30 text-center py-6">No submitted surveys yet.</p>
      ) : (
        <>
          {/* Section score cards */}
          <div className="grid grid-cols-3 gap-2">
            {sectionAvgs.map((s) => (
              <div key={s.id} className="text-center py-3 bg-white/[0.03] border border-white/5 rounded-xl">
                <div className={`text-xl font-bold ${s.avg >= 4 ? 'text-emerald-400' : s.avg >= 3 ? 'text-yellow-400' : 'text-rose-400'}`}>
                  {s.avg.toFixed(1)}
                </div>
                <div className="text-[10px] text-white/30 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Per-question ratings */}
          {SECTIONS.map((section) => (
            <div key={section.id}>
              <h4 className="text-[10px] font-semibold text-emerald-400/60 uppercase tracking-wider mb-1">{section.label}</h4>
              <div className="divide-y divide-white/5">
                {section.keys.map((key) => (
                  <RatingBar key={key} label={QUESTION_LABELS[key]} values={aggregated[key] || []} />
                ))}
              </div>
            </div>
          ))}

          {/* Open-ended */}
          <div>
            <h4 className="text-[10px] font-semibold text-emerald-400/60 uppercase tracking-wider mb-2">Open Feedback</h4>
            <div className="space-y-2">
              {OPEN_QUESTIONS.map((q) => {
                const items = openResponses[q.id];
                const isOpen = expandedOpen[q.id];
                return (
                  <div key={q.id} className="border border-white/5 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedOpen((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="w-full flex items-center justify-between px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] transition text-left"
                    >
                      <span className="text-xs text-white/60">{q.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/25">{items.length}</span>
                        {isOpen ? <ChevronUp className="w-3 h-3 text-white/20" /> : <ChevronDown className="w-3 h-3 text-white/20" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-3 py-2 space-y-2">
                        {items.length === 0 ? (
                          <p className="text-xs text-white/20 py-2">No responses yet</p>
                        ) : items.map((item, i) => (
                          <div key={i} className="bg-white/[0.03] rounded-lg p-2.5">
                            <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
                            <span className="text-[9px] text-white/20 mt-1 block">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Respondents */}
          <div>
            <h4 className="text-[10px] font-semibold text-white/20 uppercase tracking-wider mb-1">Respondents</h4>
            <div className="flex flex-wrap gap-1.5">
              {submitted.map((r) => (
                <span key={r.id} className="text-[10px] text-white/30 bg-white/[0.04] px-2 py-1 rounded-full">{r.name}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
