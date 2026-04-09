import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import WorkshopNav from './WorkshopNav';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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

const SMART_LABELS = {
  S: 'Specific — What exactly will you accomplish?',
  M: 'Measurable — How will you know you\'ve succeeded?',
  A: 'Achievable — Is this realistic given your resources?',
  R: 'Relevant — Why does this matter to your life design?',
  T: 'Time-bound — When will you complete this?',
};

function VennDiagram({ areas }) {
  const w = 340, h = 310;
  const cx = w / 2, cy = h / 2;
  const r = 85;
  const offset = 48;

  const circles = [
    { x: cx, y: cy - offset, color: '#3b82f6' },
    { x: cx - offset * 0.87, y: cy + offset * 0.5, color: '#10b981' },
    { x: cx + offset * 0.87, y: cy + offset * 0.5, color: '#a855f7' },
  ];

  const labels = [
    areas[0] || 'Area 1',
    areas[1] || 'Area 2',
    areas[2] || 'Area 3',
  ];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xs mx-auto">
      {circles.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={r}
          fill={c.color} fillOpacity={0.1} stroke={c.color} strokeWidth={2.5} strokeOpacity={0.4} />
      ))}
      {/* Area labels outside circles */}
      <text x={cx} y={18} textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="600">
        {labels[0]}
      </text>
      <text x={22} y={h - 8} textAnchor="start" fill="#6ee7b7" fontSize="12" fontWeight="600">
        {labels[1]}
      </text>
      <text x={w - 22} y={h - 8} textAnchor="end" fill="#c4b5fd" fontSize="12" fontWeight="600">
        {labels[2]}
      </text>
      {/* Section numbers */}
      <text x={cx} y={cy - offset + 5} textAnchor="middle" fill="white" fillOpacity={0.35} fontSize="16" fontWeight="bold">1</text>
      <text x={cx - offset * 0.87} y={cy + offset * 0.5 + 5} textAnchor="middle" fill="white" fillOpacity={0.35} fontSize="16" fontWeight="bold">2</text>
      <text x={cx + offset * 0.87} y={cy + offset * 0.5 + 5} textAnchor="middle" fill="white" fillOpacity={0.35} fontSize="16" fontWeight="bold">3</text>
      {/* Intersection markers */}
      <text x={cx - offset * 0.42} y={cy - offset * 0.12} textAnchor="middle" fill="white" fillOpacity={0.2} fontSize="9">1∩2</text>
      <text x={cx + offset * 0.42} y={cy - offset * 0.12} textAnchor="middle" fill="white" fillOpacity={0.2} fontSize="9">1∩3</text>
      <text x={cx} y={cy + offset * 0.55} textAnchor="middle" fill="white" fillOpacity={0.2} fontSize="9">2∩3</text>
      <circle cx={cx} cy={cy + 3} r={14} fill="white" fillOpacity={0.06} />
      <text x={cx} y={cy + 7} textAnchor="middle" fill="white" fillOpacity={0.3} fontSize="8" fontWeight="bold">✦</text>
    </svg>
  );
}

function SmartChevron() {
  const letters = ['S', 'M', 'A', 'R', 'T'];
  const colors = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'];
  return (
    <div className="flex justify-center mb-4">
      {letters.map((l, i) => (
        <div key={l} className="relative flex items-center justify-center text-white font-bold text-sm"
          style={{
            width: 52, height: 34,
            background: colors[i],
            clipPath: i === 0
              ? 'polygon(0% 0%, 82% 0%, 100% 50%, 82% 100%, 0% 100%)'
              : i < 4
              ? 'polygon(0% 0%, 82% 0%, 100% 50%, 82% 100%, 0% 100%, 18% 50%)'
              : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 18% 50%)',
            marginLeft: i > 0 ? -4 : 0,
          }}>
          <span style={{ marginLeft: i > 0 ? 4 : 0 }}>{l}</span>
        </div>
      ))}
    </div>
  );
}

export default function GoalWorksheet() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const dataRef = useRef(null);

  const [areas, setAreas] = useState(['', '', '']);
  const [synergies, setSynergies] = useState(['', '', '', '', '']);
  const [goals, setGoals] = useState([
    { title: '', S: '', M: '', A: '', R: '', T: '' },
    { title: '', S: '', M: '', A: '', R: '', T: '' },
    { title: '', S: '', M: '', A: '', R: '', T: '' },
  ]);

  // Keep ref in sync for auto-save
  useEffect(() => {
    dataRef.current = { areas, synergies, goals };
  }, [areas, synergies, goals]);

  useEffect(() => {
    const paramEmail = searchParams.get('email');
    if (paramEmail && !verified) {
      const cleaned = paramEmail.trim().toLowerCase();
      const match = participants.find(p => p.email.toLowerCase() === cleaned);
      if (match) {
        setEmail(cleaned);
        setName(match.name);
        setVerified(true);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!verified || !email) return;
    const loadData = async () => {
      try {
        const docId = email.replace(/[^a-zA-Z0-9]/g, '_');
        const snap = await getDoc(doc(db, 'workbookGoals', docId));
        if (snap.exists()) {
          const d = snap.data();
          if (d.areas) setAreas(d.areas);
          if (d.synergies) setSynergies(d.synergies);
          if (d.goals) setGoals(d.goals);
          setLastSaved(d.updatedAt?.toDate?.() || null);
        }
      } catch (e) { console.error('Load error:', e); }
      setLoaded(true);
    };
    loadData();
  }, [verified, email]);

  const doSave = async () => {
    if (!dataRef.current) return;
    setSaving(true);
    try {
      const docId = email.replace(/[^a-zA-Z0-9]/g, '_');
      await setDoc(doc(db, 'workbookGoals', docId), {
        email, name,
        ...dataRef.current,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      setLastSaved(new Date());
    } catch (e) {
      console.error('Save error:', e);
    }
    setSaving(false);
  };

  // Auto-save every 30s
  useEffect(() => {
    if (!loaded || !verified) return;
    const interval = setInterval(doSave, 30000);
    return () => clearInterval(interval);
  }, [loaded, verified, email, name]);

  const handleVerify = (e) => {
    e.preventDefault();
    const cleaned = email.trim().toLowerCase();
    const match = participants.find(p => p.email.toLowerCase() === cleaned);
    if (match) {
      setName(match.name);
      setVerified(true);
      setError('');
    } else {
      setError('Email not found. Please use the email you registered with.');
    }
  };

  const updateArea = (idx, val) => setAreas(prev => prev.map((a, i) => i === idx ? val : a));
  const updateSynergy = (idx, val) => setSynergies(prev => prev.map((s, i) => i === idx ? val : s));
  const updateGoal = (gIdx, field, val) => {
    setGoals(prev => prev.map((g, i) => i === gIdx ? { ...g, [field]: val } : g));
  };

  if (!verified) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">📓</div>
          <h1 className="text-3xl font-bold text-white mb-2">Workshop Workbook</h1>
          <p className="text-white/50 text-sm mb-6">AI Life Design Training</p>
          <form onSubmit={handleVerify} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <label className="block text-left text-xs uppercase tracking-wider text-white/50 mb-2">Your email</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="Enter your registered email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 mb-4" required />
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <button type="submit" className="w-full py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/30 transition">
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <WorkshopNav email={email} />
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Workshop Workbook</h1>
          <p className="text-white/40 text-sm">{name} — AI Life Design Training</p>
          {lastSaved && (
            <p className="text-white/20 text-xs mt-1">
              Last saved {lastSaved.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </p>
          )}
        </div>

        {/* Section 1: Intellectual Areas of Inspiration */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-5">
          <h2 className="text-lg font-semibold text-white mb-1">Intellectual Areas of Inspiration</h2>
          <p className="text-white/40 text-sm mb-4">
            What are three areas that inspire you intellectually? These could be research topics, professional interests, passions, or curiosities.
          </p>

          <VennDiagram areas={areas} />

          <div className="space-y-3 mt-4">
            {areas.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  i === 0 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  i === 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                }`}>{i + 1}</div>
                <input type="text" value={a} onChange={e => updateArea(i, e.target.value)}
                  placeholder={`Area of interest ${i + 1}`}
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-blue-500/40 text-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Potential Synergies */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-5">
          <h2 className="text-lg font-semibold text-white mb-1">Potential Synergy Between Areas & People</h2>
          <p className="text-white/40 text-sm mb-4">
            Where do your areas overlap? Who could you collaborate with? Think about connections between your interests and the people in this room.
          </p>

          <div className="space-y-3">
            {synergies.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-white/20 text-sm w-5 shrink-0">{i + 1}.</span>
                <input type="text" value={s} onChange={e => updateSynergy(i, e.target.value)}
                  placeholder={
                    i === 0 ? 'e.g., "Health equity + policy — collaborate with Lucy"' :
                    i === 1 ? 'e.g., "Community engagement + data — partner with Wendi"' :
                    'Describe a synergy...'
                  }
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/15 focus:outline-none focus:border-emerald-500/40 text-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: SMART Goals */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">SMART Goals for the Year</h2>
          <SmartChevron />
          <p className="text-white/40 text-sm mb-5">
            Set 1–3 goals that are Specific, Measurable, Achievable, Relevant, and Time-bound. Connect them to the areas of inspiration you identified above.
          </p>

          {goals.map((goal, gIdx) => (
            <div key={gIdx} className={`${gIdx > 0 ? 'mt-6 pt-6 border-t border-white/5' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 text-sm font-bold">
                  {gIdx + 1}
                </div>
                <input type="text" value={goal.title}
                  onChange={e => updateGoal(gIdx, 'title', e.target.value)}
                  placeholder={`Goal ${gIdx + 1} title`}
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-blue-500/40 text-sm font-medium" />
              </div>

              <div className="space-y-2 ml-10">
                {Object.entries(SMART_LABELS).map(([key, hint]) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      goal[key] ? 'bg-blue-500/25 text-blue-400' : 'bg-white/5 text-white/30'
                    }`}>{key}</span>
                    <input type="text" value={goal[key]}
                      onChange={e => updateGoal(gIdx, key, e.target.value)}
                      placeholder={hint}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/15 focus:outline-none focus:border-blue-500/30 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button — sticky at bottom */}
        <div className="sticky bottom-4">
          <button onClick={doSave} disabled={saving}
            className="w-full py-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold rounded-xl hover:bg-emerald-500/30 transition disabled:opacity-50 text-lg shadow-lg shadow-black/30 backdrop-blur-sm">
            {saving ? 'Saving...' : '💾  Save My Workbook'}
          </button>
        </div>
        <p className="text-center text-white/15 text-xs mt-2">Auto-saves every 30 seconds</p>

        <p className="text-center text-white/10 text-xs mt-8">© 2025 Cerulli • AI Life Design Training</p>
      </div>
    </div>
  );
}
