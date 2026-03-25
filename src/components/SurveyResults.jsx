import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { BarChart3, Users, MessageSquare, ArrowLeft, RefreshCw } from 'lucide-react';

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

function BarChart({ data, labels, maxCount }) {
  return (
    <div className="space-y-1.5">
      {labels.map((label, i) => {
        const count = data[i + 1] || 0;
        const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-white/40 w-24 text-right shrink-0 truncate">{label}</span>
            <div className="flex-1 h-6 bg-white/[0.03] rounded-md overflow-hidden relative">
              <div
                className="h-full bg-emerald-500/30 rounded-md transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
              {count > 0 && (
                <span className="absolute inset-y-0 left-2 flex items-center text-xs text-white/60 font-medium">
                  {count}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RulerChart({ data, total }) {
  const avg = total > 0 ? Object.entries(data).reduce((sum, [k, v]) => sum + (Number(k) * v), 0) / total : 0;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-emerald-400">{avg.toFixed(1)}</span>
        <span className="text-white/40 text-sm">/ 10 average</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 10 }, (_, i) => {
          const n = i + 1;
          const count = data[n] || 0;
          const maxH = 40;
          const h = total > 0 ? Math.max(4, (count / total) * maxH) : 4;
          return (
            <div key={n} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-sm transition-all ${count > 0 ? 'bg-emerald-500/40' : 'bg-white/[0.05]'}`}
                style={{ height: `${h}px` }}
              />
              <span className="text-[10px] text-white/30">{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ThemeCloud({ responses }) {
  if (!responses.length) return <p className="text-white/30 text-sm italic">No responses yet</p>;
  return (
    <div className="space-y-2">
      {responses.map((r, i) => (
        <div key={i} className="bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2">
          <p className="text-white/60 text-sm leading-relaxed">{r}</p>
        </div>
      ))}
    </div>
  );
}

export default function SurveyResults() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'surveyResponses'));
      setData(snap.docs.map(d => d.data()));
    } catch (e) {
      console.error('Error loading survey results:', e);
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const totalResponses = data.length;

  // Compute distributions for scale questions
  const computeDistribution = (qId) => {
    const dist = {};
    data.forEach(d => {
      const val = d.responses?.[qId];
      if (val) dist[val] = (dist[val] || 0) + 1;
    });
    return dist;
  };

  // Collect text responses
  const collectText = (qId) => {
    return data
      .map(d => d.responses?.[qId])
      .filter(Boolean)
      .filter(t => t.trim());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="border-b border-white/5 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-white/30 hover:text-white/60 transition">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-white font-semibold text-lg">Cohort Pulse</h1>
              <p className="text-white/40 text-xs">Pre-training survey results</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/[0.05] px-3 py-1.5 rounded-lg">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-white/70 text-sm font-medium">{totalResponses}</span>
              <span className="text-white/30 text-xs">/ 9</span>
            </div>
            <button onClick={loadData} className="text-white/30 hover:text-white/60 transition p-2">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {totalResponses === 0 ? (
          <div className="text-center py-20">
            <BarChart3 className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <h2 className="text-white/40 text-lg">No responses yet</h2>
            <p className="text-white/20 text-sm mt-1">Results will appear here as participants complete the survey.</p>
          </div>
        ) : (
          <>
            {/* Baseline skills */}
            <section>
              <h2 className="text-xl font-bold text-white mb-1">Starting Points</h2>
              <p className="text-white/40 text-sm mb-6">Where the group is right now across six key areas.</p>
              <div className="space-y-6">
                {baselineQuestions.map(q => {
                  const dist = computeDistribution(q.id);
                  const avg = totalResponses > 0
                    ? Object.entries(dist).reduce((s, [k, v]) => s + Number(k) * v, 0) / totalResponses
                    : 0;
                  return (
                    <div key={q.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white/80 font-medium text-sm">{q.label}</h3>
                        <span className="text-emerald-400 font-bold text-lg">{avg.toFixed(1)}<span className="text-white/20 text-xs font-normal"> / 5</span></span>
                      </div>
                      <BarChart data={dist} labels={q.labels} maxCount={totalResponses} />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Readiness */}
            <section>
              <h2 className="text-xl font-bold text-white mb-1">Readiness</h2>
              <p className="text-white/40 text-sm mb-6">How important and confident the group feels about making changes.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {rulerQuestions.map(q => {
                  const dist = computeDistribution(q.id);
                  return (
                    <div key={q.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                      <h3 className="text-white/80 font-medium text-sm mb-3">{q.label}</h3>
                      <RulerChart data={dist} total={totalResponses} />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Themes from open-ended */}
            <section>
              <h2 className="text-xl font-bold text-white mb-1">In Their Own Words</h2>
              <p className="text-white/40 text-sm mb-6">Anonymous responses from the group.</p>
              <div className="space-y-6">
                {textQuestions.map(q => {
                  const texts = collectText(q.id);
                  if (texts.length === 0) return null;
                  return (
                    <div key={q.id}>
                      <h3 className="text-white/60 font-medium text-sm mb-2 flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400/60" />
                        {q.label}
                      </h3>
                      <ThemeCloud responses={texts} />
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
