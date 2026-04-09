import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import WorkshopNav from './WorkshopNav';

// Simple deterministic "random" from seed
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Color palette
const palette = [
  '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#fbbf24',
  '#fb923c', '#4ade80', '#38bdf8', '#c084fc', '#f87171',
  '#2dd4bf', '#818cf8',
];

function WordCloud({ words }) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 800, h: 500 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.clientWidth, h: Math.max(400, el.clientWidth * 0.6) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Sort by count descending
  const sorted = useMemo(() => [...words].sort((a, b) => b.count - a.count), [words]);
  const maxCount = sorted[0]?.count || 1;

  // Place words using a spiral layout
  const placed = useMemo(() => {
    if (!sorted.length) return [];
    const cx = dims.w / 2;
    const cy = dims.h / 2;
    const boxes = [];
    const result = [];

    for (let i = 0; i < sorted.length; i++) {
      const word = sorted[i];
      const ratio = word.count / maxCount;
      const fontSize = Math.max(14, Math.round(ratio * 52 + 12));
      const estWidth = word.text.length * fontSize * 0.6;
      const estHeight = fontSize * 1.3;

      // Spiral outward to find placement
      let placed_ = false;
      for (let t = 0; t < 500; t++) {
        const angle = t * 0.15;
        const radius = t * 1.2;
        const x = cx + radius * Math.cos(angle) - estWidth / 2;
        const y = cy + radius * Math.sin(angle) - estHeight / 2;

        // Check bounds
        if (x < 10 || x + estWidth > dims.w - 10 || y < 10 || y + estHeight > dims.h - 10) continue;

        // Check overlap
        const overlap = boxes.some(b =>
          x < b.x + b.w + 4 && x + estWidth + 4 > b.x &&
          y < b.y + b.h + 2 && y + estHeight + 2 > b.y
        );

        if (!overlap) {
          boxes.push({ x, y, w: estWidth, h: estHeight });
          result.push({
            ...word,
            x, y, fontSize,
            color: palette[i % palette.length],
            rotation: seededRandom(i * 7) > 0.75 ? (seededRandom(i * 13) > 0.5 ? -12 : 12) : 0,
          });
          placed_ = true;
          break;
        }
      }
      if (!placed_ && result.length < 40) {
        // Fallback: place at bottom
        result.push({
          ...word,
          x: 20 + seededRandom(i * 3) * (dims.w - 200),
          y: dims.h - 60 - seededRandom(i * 5) * 40,
          fontSize: Math.max(12, fontSize * 0.7),
          color: palette[i % palette.length],
          rotation: 0,
        });
      }
    }
    return result;
  }, [sorted, maxCount, dims]);

  return (
    <div ref={containerRef} className="w-full" style={{ height: dims.h }}>
      <svg width={dims.w} height={dims.h} className="select-none">
        {placed.map((w, i) => (
          <text
            key={i}
            x={w.x + (w.text.length * w.fontSize * 0.3)}
            y={w.y + w.fontSize}
            fill={w.color}
            fontSize={w.fontSize}
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight={w.count >= maxCount * 0.6 ? 'bold' : w.count >= maxCount * 0.3 ? '600' : 'normal'}
            textAnchor="middle"
            opacity={0.85 + (w.count / maxCount) * 0.15}
            transform={w.rotation ? `rotate(${w.rotation}, ${w.x + w.text.length * w.fontSize * 0.3}, ${w.y + w.fontSize * 0.5})` : undefined}
            className="transition-opacity duration-300 hover:opacity-100 cursor-default"
          >
            {w.text}
            <title>{w.text}: {w.count} {w.count === 1 ? 'person' : 'people'}</title>
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function ValuesCloud() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('values'); // 'values' | 'principles'

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'valuesResponses'), (snap) => {
      setResponses(snap.docs.map(d => d.data()));
      setLoading(false);
    });
    return unsub;
  }, []);

  // Aggregate values into word counts
  const valueWords = useMemo(() => {
    const counts = {};
    responses.forEach(r => {
      (r.values || []).forEach(v => {
        const key = v.trim().toLowerCase();
        const display = v.trim();
        if (!counts[key]) counts[key] = { text: display, count: 0 };
        counts[key].count++;
      });
    });
    return Object.values(counts).sort((a, b) => b.count - a.count);
  }, [responses]);

  // Aggregate principles — split by meaningful words
  const principleWords = useMemo(() => {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'is', 'it', 'as', 'be', 'are', 'was', 'were', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
      'shall', 'can', 'not', 'no', 'so', 'if', 'than', 'that', 'this', 'these', 'those', 'i', 'my',
      'me', 'we', 'our', 'you', 'your', 'they', 'them', 'their', 'what', 'which', 'who', 'when',
      'where', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some',
      'such', 'only', 'own', 'same', 'just', 'about', 'up', 'out', 'into', 'over', 'after',
      'before', 'between', 'through', 'during', 'above', 'below', 'then', 'once', 'here', 'there',
      'am', 'its', 'also', 'very', 'much', 'too', 'any', 'don', 't', 's', 're', 've', 'll', 'd',
      'things', 'thing', 'way', 'ways', 'make', 'made', 'get', 'got', 'go', 'going', 'come',
    ]);
    const counts = {};
    responses.forEach(r => {
      (r.principles || []).forEach(p => {
        const words = p.replace(/[^a-zA-Z\s'-]/g, '').split(/\s+/).filter(w => w.length > 2);
        words.forEach(w => {
          const key = w.toLowerCase();
          if (stopWords.has(key)) return;
          if (!counts[key]) counts[key] = { text: w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(), count: 0 };
          counts[key].count++;
        });
      });
    });
    return Object.values(counts).sort((a, b) => b.count - a.count);
  }, [responses]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const words = view === 'values' ? valueWords : principleWords;

  return (
    <div className="min-h-screen bg-slate-950 pb-12">
      <WorkshopNav email={email} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🧭</div>
          <h1 className="text-2xl font-bold text-white mb-1">Our Shared Values & Principles</h1>
          <p className="text-white/40 text-sm">{responses.length} response{responses.length !== 1 ? 's' : ''} — AI Life Design Training</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setView('values')}
            className={`px-5 py-2 rounded-xl text-sm font-medium border transition ${
              view === 'values'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-white/[0.03] border-white/10 text-white/40 hover:text-white/60'
            }`}
          >
            Values ({valueWords.length})
          </button>
          <button
            onClick={() => setView('principles')}
            className={`px-5 py-2 rounded-xl text-sm font-medium border transition ${
              view === 'principles'
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
                : 'bg-white/[0.03] border-white/10 text-white/40 hover:text-white/60'
            }`}
          >
            Principles ({principleWords.length})
          </button>
        </div>

        {/* Word Cloud */}
        {words.length > 0 ? (
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-6">
            <WordCloud words={words} />
          </div>
        ) : (
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-12 text-center mb-6">
            <p className="text-white/30 text-sm">No responses yet. Share the survey link to get started!</p>
          </div>
        )}

        {/* Legend / stats */}
        {words.length > 0 && (
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
            <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">
              {view === 'values' ? 'Most Selected Values' : 'Most Common Themes'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {words.slice(0, 15).map((w, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-sm"
                  style={{ color: palette[i % palette.length] }}
                >
                  {w.text}
                  <span className="text-white/20 text-xs">×{w.count}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-white/15 text-xs text-center mt-6">
          Live data — updates in real-time as participants respond
        </p>
      </div>
    </div>
  );
}
