import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';

/**
 * ValuesCompass — Interactive ranked values visualization.
 *
 * Props:
 *   values    – [{ name, definition, rank? }]
 *   onReorder – (newValues) => void  — called when user reorders
 *   readOnly  – boolean  — hide reorder controls
 */
export default function ValuesCompass({ values = [], onReorder, readOnly = false }) {
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  if (!values || values.length === 0) {
    return <p className="text-xs text-white/20">No values entered yet.</p>;
  }

  const rankColors = [
    { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400', label: 'text-yellow-400/80' },
    { bg: 'bg-gray-300/10', border: 'border-gray-400/20', text: 'text-gray-300', label: 'text-gray-300/70' },
    { bg: 'bg-amber-600/15', border: 'border-amber-600/20', text: 'text-amber-500', label: 'text-amber-500/70' },
    { bg: 'bg-emerald-500/10', border: 'border-emerald-500/15', text: 'text-emerald-400/70', label: 'text-emerald-400/50' },
    { bg: 'bg-white/[0.04]', border: 'border-white/10', text: 'text-white/50', label: 'text-white/30' },
    { bg: 'bg-white/[0.03]', border: 'border-white/8', text: 'text-white/40', label: 'text-white/25' },
    { bg: 'bg-white/[0.02]', border: 'border-white/5', text: 'text-white/30', label: 'text-white/20' },
  ];

  const handleDragStart = (idx) => {
    if (readOnly) return;
    setDragging(idx);
  };

  const handleDragOver = (e, idx) => {
    e.preventDefault();
    setDragOver(idx);
  };

  const handleDrop = (idx) => {
    if (dragging === null || dragging === idx) {
      setDragging(null);
      setDragOver(null);
      return;
    }
    const updated = [...values];
    const [moved] = updated.splice(dragging, 1);
    updated.splice(idx, 0, moved);
    onReorder?.(updated);
    setDragging(null);
    setDragOver(null);
  };

  const moveValue = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= values.length) return;
    const updated = [...values];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    onReorder?.(updated);
  };

  // Visual compass: horizontal bars with width proportional to inverse rank
  return (
    <div className="space-y-1.5">
      {values.map((val, idx) => {
        const color = rankColors[idx] || rankColors[rankColors.length - 1];
        const widthPct = Math.max(40, 100 - idx * 10);
        const isDragTarget = dragOver === idx && dragging !== idx;

        return (
          <div
            key={idx}
            draggable={!readOnly}
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={() => { setDragging(null); setDragOver(null); }}
            onDrop={() => handleDrop(idx)}
            className={`flex items-center gap-2 transition-all ${
              dragging === idx ? 'opacity-40' : ''
            } ${isDragTarget ? 'translate-y-1' : ''}`}
          >
            {/* Reorder handle */}
            {!readOnly && (
              <div className="flex flex-col items-center gap-0 shrink-0">
                <button
                  onClick={() => moveValue(idx, -1)}
                  disabled={idx === 0}
                  className="text-white/15 hover:text-white/40 disabled:opacity-0 text-[10px] leading-none"
                >▲</button>
                <GripVertical className="w-3 h-3 text-white/15 cursor-grab" />
                <button
                  onClick={() => moveValue(idx, 1)}
                  disabled={idx === values.length - 1}
                  className="text-white/15 hover:text-white/40 disabled:opacity-0 text-[10px] leading-none"
                >▼</button>
              </div>
            )}

            {/* Rank badge */}
            <span className={`text-xs font-bold w-6 text-center shrink-0 ${color.text}`}>
              #{idx + 1}
            </span>

            {/* Value bar */}
            <div
              className={`${color.bg} border ${color.border} rounded-lg px-3 py-2 transition-all`}
              style={{ width: `${widthPct}%` }}
            >
              <span className={`text-sm font-semibold ${color.text}`}>{val.name}</span>
              {val.definition && (
                <p className={`text-[10px] mt-0.5 ${color.label}`}>{val.definition}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
