import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Clock, Save, CheckCircle, GripVertical, Plus, Trash2 } from 'lucide-react';

/**
 * WorkbookExercise — Full-screen modal for completing exercises.
 *
 * Props:
 *   exercise   – exercise config from constants.js (type, timer, fields, maxValues)
 *   stepTitle  – display title (e.g. "The Mirror")
 *   existing   – previously saved data (or null)
 *   onSave     – (data) => Promise  — called with field values
 *   onClose    – () => void
 */
export default function WorkbookExercise({ exercise, stepTitle, existing, onSave, onClose }) {
  const [fieldValues, setFieldValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.timer ? exercise.timer * 60 : null);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Pre-fill from existing data
  useEffect(() => {
    if (existing) {
      setFieldValues(existing);
    }
  }, [existing]);

  // Timer logic
  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setTimerRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds) => {
    if (seconds === null) return '';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const updateField = useCallback((id, value) => {
    setFieldValues((prev) => ({ ...prev, [id]: value }));
    setSaved(false);
  }, []);

  const [saveError, setSaveError] = useState(null);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await onSave(fieldValues);
      // Save succeeded — close immediately
      onClose();
    } catch (err) {
      console.error('[WorkbookExercise] save failed:', err);
      setSaveError(err.message || 'Save failed — check Firestore rules for the workbooks collection.');
      setSaving(false);
    }
  };

  // Render exercise body based on type
  const renderExercise = () => {
    switch (exercise.type) {
      case 'timed-writing':
        return renderTimedWriting();
      case 'reflection':
        return renderReflection();
      case 'values-ranking':
        return renderValuesRanking();
      case 'scored-assessment':
        return renderScoredAssessment();
      default:
        return <p className="text-white/50">Unknown exercise type.</p>;
    }
  };

  // ─── Timed Writing ───
  const renderTimedWriting = () => (
    <div className="space-y-6">
      {/* Timer bar */}
      {exercise.timer && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (timeLeft === 0) setTimeLeft(exercise.timer * 60);
              setTimerRunning(!timerRunning);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition"
          >
            <Clock className="w-4 h-4" />
            {timerRunning ? 'Pause' : timeLeft === 0 ? 'Restart' : 'Start Timer'}
          </button>
          <span className={`text-2xl font-mono font-bold ${timeLeft <= 60 && timeLeft > 0 ? 'text-red-400 animate-pulse' : 'text-white/60'}`}>
            {formatTime(timeLeft)}
          </span>
          {timeLeft === 0 && (
            <span className="text-xs text-emerald-400 font-medium">Time's up! Keep writing or save.</span>
          )}
        </div>
      )}

      {/* Text fields */}
      {exercise.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="text-sm font-semibold text-white">{field.label}</label>
          <p className="text-xs text-white/40">{field.prompt}</p>
          <textarea
            value={fieldValues[field.id] || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            rows={8}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-4 text-white text-sm leading-relaxed resize-y focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 placeholder-white/20"
            placeholder="Start writing..."
          />
        </div>
      ))}
    </div>
  );

  // ─── Reflection (multi-field text) ───
  const renderReflection = () => (
    <div className="space-y-6">
      {exercise.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="text-sm font-semibold text-white">{field.label}</label>
          <p className="text-xs text-white/40">{field.prompt}</p>
          <textarea
            value={fieldValues[field.id] || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            rows={5}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-4 text-white text-sm leading-relaxed resize-y focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 placeholder-white/20"
            placeholder="Write your thoughts..."
          />
        </div>
      ))}
    </div>
  );

  // ─── Values Ranking ───
  const renderValuesRanking = () => {
    const values = fieldValues.values || [];

    const addValue = () => {
      const max = exercise.maxValues || 7;
      if (values.length >= max) return;
      updateField('values', [...values, { name: '', definition: '' }]);
    };

    const removeValue = (idx) => {
      updateField('values', values.filter((_, i) => i !== idx));
    };

    const updateValue = (idx, key, val) => {
      const updated = values.map((v, i) => (i === idx ? { ...v, [key]: val } : v));
      updateField('values', updated);
    };

    const moveValue = (idx, direction) => {
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= values.length) return;
      const updated = [...values];
      [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
      updateField('values', updated);
    };

    const rankColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600', 'text-white/50', 'text-white/40', 'text-white/30', 'text-white/20'];

    return (
      <div className="space-y-4">
        <p className="text-xs text-white/40">{exercise.fields[0]?.prompt}</p>

        {values.map((val, idx) => (
          <div key={idx} className="flex items-start gap-3 group">
            {/* Rank & reorder */}
            <div className="flex flex-col items-center gap-1 pt-2">
              <span className={`text-xs font-bold ${rankColors[idx] || 'text-white/20'}`}>#{idx + 1}</span>
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveValue(idx, -1)}
                  disabled={idx === 0}
                  className="text-white/20 hover:text-white/60 disabled:opacity-0 text-xs"
                >▲</button>
                <button
                  onClick={() => moveValue(idx, 1)}
                  disabled={idx === values.length - 1}
                  className="text-white/20 hover:text-white/60 disabled:opacity-0 text-xs"
                >▼</button>
              </div>
            </div>

            {/* Value inputs */}
            <div className="flex-1 space-y-1.5">
              <input
                type="text"
                value={val.name}
                onChange={(e) => updateValue(idx, 'name', e.target.value)}
                placeholder="Value name (e.g. Freedom, Creativity)"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/40 placeholder-white/20"
              />
              <input
                type="text"
                value={val.definition}
                onChange={(e) => updateValue(idx, 'definition', e.target.value)}
                placeholder="What does this mean to you?"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white/70 text-xs focus:outline-none focus:border-emerald-500/40 placeholder-white/15"
              />
            </div>

            {/* Remove */}
            <button
              onClick={() => removeValue(idx)}
              className="text-white/10 hover:text-red-400 transition pt-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {values.length < (exercise.maxValues || 7) && (
          <button
            onClick={addValue}
            className="flex items-center gap-2 text-sm text-emerald-400/70 hover:text-emerald-400 transition"
          >
            <Plus className="w-4 h-4" /> Add Value
          </button>
        )}
      </div>
    );
  };

  // ─── Scored Assessment ───
  const renderScoredAssessment = () => {
    // Reads values from Module 2 step 02 (values-ranking) if available in existing parent data
    // For now, user enters values inline
    const scores = fieldValues.scores || [];

    const addScore = () => {
      updateField('scores', [...scores, { name: '', score: 5, note: '' }]);
    };

    const removeScore = (idx) => {
      updateField('scores', scores.filter((_, i) => i !== idx));
    };

    const updateScore = (idx, key, val) => {
      const updated = scores.map((s, i) => (i === idx ? { ...s, [key]: val } : s));
      updateField('scores', updated);
    };

    const getScoreColor = (score) => {
      if (score >= 8) return 'text-emerald-400';
      if (score >= 5) return 'text-yellow-400';
      return 'text-red-400';
    };

    const getBarColor = (score) => {
      if (score >= 8) return 'bg-emerald-500';
      if (score >= 5) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
      <div className="space-y-4">
        <p className="text-xs text-white/40">{exercise.fields[0]?.prompt}</p>

        {scores.map((item, idx) => (
          <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateScore(idx, 'name', e.target.value)}
                placeholder="Value name"
                className="flex-1 bg-transparent border-b border-white/10 px-1 py-1 text-white text-sm focus:outline-none focus:border-emerald-500/40 placeholder-white/20"
              />
              <span className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                {item.score}
              </span>
              <button onClick={() => removeScore(idx)} className="text-white/10 hover:text-red-400 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/30">1</span>
              <div className="flex-1 relative">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${getBarColor(item.score)}`} style={{ width: `${item.score * 10}%` }} />
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={item.score}
                  onChange={(e) => updateScore(idx, 'score', parseInt(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-xs text-white/30">10</span>
            </div>

            {/* Note for low/high scores */}
            {(item.score <= 5 || item.score >= 7) && (
              <input
                type="text"
                value={item.note || ''}
                onChange={(e) => updateScore(idx, 'note', e.target.value)}
                placeholder={item.score <= 5 ? 'Why is this low?' : 'What makes this work?'}
                className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2 text-white/60 text-xs focus:outline-none focus:border-emerald-500/30 placeholder-white/15"
              />
            )}
          </div>
        ))}

        <button
          onClick={addScore}
          className="flex items-center gap-2 text-sm text-emerald-400/70 hover:text-emerald-400 transition"
        >
          <Plus className="w-4 h-4" /> Add Value to Score
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] mx-4 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Exercise</span>
            <h2 className="text-lg font-bold text-white">{stepTitle}</h2>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {renderExercise()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 space-y-2">
          {saveError && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {saveError}
            </p>
          )}
          <div className="flex items-center justify-between">
          <button onClick={onClose} className="text-sm text-white/40 hover:text-white/60 transition">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition ${
              saved
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            {saving ? (
              'Saving...'
            ) : saved ? (
              <><CheckCircle className="w-4 h-4" /> Saved</>
            ) : (
              <><Save className="w-4 h-4" /> Save Progress</>
            )}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
