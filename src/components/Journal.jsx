import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PenLine, Plus, ChevronDown, ChevronUp, Clock, Trash2, Flame, Star, BookOpen, Sparkles, Heart, Quote } from 'lucide-react';
import { doc, setDoc, onSnapshot, collection, query, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const MOODS = [
  { emoji: '🔥', label: 'Fired Up', color: 'from-orange-500/20 to-red-500/10', border: 'border-orange-500/40', glow: 'shadow-orange-500/10' },
  { emoji: '😊', label: 'Good', color: 'from-emerald-500/20 to-green-500/10', border: 'border-emerald-500/40', glow: 'shadow-emerald-500/10' },
  { emoji: '🤔', label: 'Reflective', color: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-500/40', glow: 'shadow-blue-500/10' },
  { emoji: '😤', label: 'Frustrated', color: 'from-red-500/20 to-rose-500/10', border: 'border-red-500/40', glow: 'shadow-red-500/10' },
  { emoji: '🌱', label: 'Growing', color: 'from-lime-500/20 to-emerald-500/10', border: 'border-lime-500/40', glow: 'shadow-lime-500/10' },
  { emoji: '💡', label: 'Inspired', color: 'from-yellow-500/20 to-amber-500/10', border: 'border-yellow-500/40', glow: 'shadow-yellow-500/10' },
];

const PROMPTS = [
  "What's one thing you learned about yourself today?",
  "What small win can you celebrate right now?",
  "If you could redesign one part of your day, what would it be?",
  "What habit is starting to feel more natural?",
  "What surprised you this week about your progress?",
  "Write a letter to your future self about where you are now.",
  "What's one experiment you want to try this week?",
  "What would your ideal Tuesday look like?",
  "What's draining your energy? What's fueling it?",
  "Describe a moment this week when you felt fully alive.",
  "What assumption about yourself are you ready to let go of?",
  "What would you do differently if you knew you couldn't fail?",
];

const MILESTONES = [
  { count: 1, icon: '🌱', label: 'First Seed', desc: 'You planted your first thought' },
  { count: 5, icon: '📝', label: 'Getting Started', desc: '5 entries — building the habit' },
  { count: 10, icon: '✨', label: 'Consistent', desc: '10 entries — real momentum' },
  { count: 25, icon: '🔥', label: 'On Fire', desc: '25 entries — you\'re on a roll' },
  { count: 50, icon: '⭐', label: 'Dedicated', desc: '50 entries — truly committed' },
  { count: 100, icon: '🏆', label: 'Centurion', desc: '100 entries — legendary' },
];

export default function Journal({ user }) {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedDate, setExpandedDate] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [justSaved, setJustSaved] = useState(false);
  const [showMilestone, setShowMilestone] = useState(null);

  // Load entries from Firestore
  useEffect(() => {
    if (!user?.uid) { setLoading(false); return; }

    const q = query(
      collection(db, 'journals', user.uid, 'entries'),
      orderBy('createdAt', 'desc'),
      limit(100)
    );

    const unsub = onSnapshot(q, (snap) => {
      setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));

    return unsub;
  }, [user?.uid]);

  // Rotate prompts
  const shufflePrompt = useCallback(() => {
    const idx = Math.floor(Math.random() * PROMPTS.length);
    setCurrentPrompt(PROMPTS[idx]);
    setShowPrompt(true);
  }, []);

  useEffect(() => {
    shufflePrompt();
  }, []);

  // Streak calculation
  const streak = useMemo(() => {
    if (entries.length === 0) return 0;
    const dates = [...new Set(entries.map(e =>
      new Date(e.createdAt).toLocaleDateString()
    ))].sort((a, b) => new Date(b) - new Date(a));

    let count = 0;
    const today = new Date();
    for (let i = 0; i < dates.length; i++) {
      const expected = new Date(today);
      expected.setDate(expected.getDate() - i);
      if (dates[i] === expected.toLocaleDateString()) {
        count++;
      } else if (i === 0) {
        // Check if they wrote yesterday (streak still alive)
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (dates[0] === yesterday.toLocaleDateString()) {
          count = 1;
          continue;
        }
        break;
      } else {
        break;
      }
    }
    return count;
  }, [entries]);

  // Current milestone
  const currentMilestone = useMemo(() => {
    return [...MILESTONES].reverse().find(m => entries.length >= m.count) || null;
  }, [entries.length]);

  const nextMilestone = useMemo(() => {
    return MILESTONES.find(m => entries.length < m.count) || null;
  }, [entries.length]);

  const handleAdd = async () => {
    if (!user?.uid || !newEntry.trim()) return;
    setSaving(true);
    try {
      const now = new Date();
      const entryId = now.toISOString().replace(/[:.]/g, '-');
      await setDoc(doc(db, 'journals', user.uid, 'entries', entryId), {
        content: newEntry.trim(),
        mood: selectedMood !== null ? MOODS[selectedMood].label : null,
        moodEmoji: selectedMood !== null ? MOODS[selectedMood].emoji : null,
        createdAt: now.toISOString(),
        userEmail: user.email,
      });
      setNewEntry('');
      setSelectedMood(null);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
      shufflePrompt();

      // Check for milestone
      const newCount = entries.length + 1;
      const hitMilestone = MILESTONES.find(m => m.count === newCount);
      if (hitMilestone) {
        setShowMilestone(hitMilestone);
        setTimeout(() => setShowMilestone(null), 4000);
      }
    } catch (err) {
      console.error('[journal] save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (entryId) => {
    if (!user?.uid) return;
    try {
      await deleteDoc(doc(db, 'journals', user.uid, 'entries', entryId));
    } catch (err) {
      console.error('[journal] delete error:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleAdd();
    }
  };

  const usePrompt = () => {
    setNewEntry(currentPrompt + '\n\n');
    setShowPrompt(false);
  };

  // Group entries by date
  const groupedByDate = entries.reduce((acc, entry) => {
    const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  const dateKeys = Object.keys(groupedByDate);
  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  const effectiveExpanded = expandedDate === null ? todayLabel : expandedDate;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6 relative">
      {/* Milestone celebration overlay */}
      {showMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-gray-900/95 border border-amber-500/30 rounded-3xl p-8 text-center animate-bounce shadow-2xl shadow-amber-500/20 pointer-events-auto">
            <div className="text-5xl mb-3">{showMilestone.icon}</div>
            <h3 className="text-xl font-bold text-amber-400" style={{ fontFamily: 'Caveat, cursive' }}>{showMilestone.label}!</h3>
            <p className="text-white/50 text-sm mt-1">{showMilestone.desc}</p>
          </div>
        </div>
      )}

      {/* Saved animation */}
      {justSaved && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-emerald-500/90 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-emerald-500/20 animate-bounce">
          Entry saved to your journal
        </div>
      )}

      {/* Header with streak */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Caveat, cursive' }}>
            My Journal
          </h1>
          <p className="text-white/40 text-sm mt-1">Your private space to think, reflect, and grow</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Streak badge */}
          {streak > 0 && (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/20 rounded-full px-3 py-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-300">{streak}</span>
              <span className="text-[10px] text-orange-400/60">day{streak !== 1 ? 's' : ''}</span>
            </div>
          )}
          {/* Entry count */}
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5">
            <BookOpen className="w-3.5 h-3.5 text-white/30" />
            <span className="text-sm text-white/40">{entries.length}</span>
          </div>
        </div>
      </div>

      {/* Milestone progress bar */}
      {nextMilestone && (
        <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {currentMilestone && <span className="text-sm">{currentMilestone.icon}</span>}
              <span className="text-xs text-white/30">
                {currentMilestone ? currentMilestone.label : 'Getting started'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/30">Next: {nextMilestone.icon} {nextMilestone.label}</span>
              <span className="text-[10px] text-white/20">({nextMilestone.count - entries.length} to go)</span>
            </div>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, (entries.length / nextMilestone.count) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Writing prompt */}
      {showPrompt && (
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500/[0.08] to-purple-500/[0.04] border border-indigo-500/15 rounded-2xl p-5">
          <Quote className="absolute top-3 right-3 w-8 h-8 text-indigo-500/10" />
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-400/80 uppercase tracking-wider">Writing Prompt</span>
          </div>
          <p className="text-white/70 text-sm italic leading-relaxed" style={{ fontFamily: 'Caveat, cursive', fontSize: '1.15rem' }}>
            "{currentPrompt}"
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={usePrompt}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition font-medium"
            >
              Use this prompt
            </button>
            <span className="text-white/10">|</span>
            <button
              onClick={shufflePrompt}
              className="text-xs text-white/30 hover:text-white/50 transition"
            >
              Shuffle
            </button>
          </div>
        </div>
      )}

      {/* New entry form — journal-like aesthetic */}
      <div className="relative bg-gradient-to-br from-amber-500/[0.04] to-orange-500/[0.02] border border-amber-500/10 rounded-2xl p-5 shadow-lg shadow-black/20">
        {/* Decorative notebook edge */}
        <div className="absolute left-6 top-16 bottom-4 w-px bg-rose-400/10" />

        <div className="flex items-center gap-2 mb-3">
          <PenLine className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Caveat, cursive', fontSize: '1.1rem' }}>
            New Entry
          </span>
          <span className="text-[10px] text-white/20 ml-auto">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            {' '}
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </span>
        </div>

        {/* Mood selector */}
        <div className="mb-3">
          <span className="text-[10px] text-white/25 uppercase tracking-wider mb-2 block">How are you feeling?</span>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((mood, idx) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(selectedMood === idx ? null : idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${
                  selectedMood === idx
                    ? `bg-gradient-to-r ${mood.color} border ${mood.border} shadow-lg ${mood.glow} scale-105`
                    : 'bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.05]'
                }`}
              >
                <span>{mood.emoji}</span>
                <span className={selectedMood === idx ? 'text-white/80' : 'text-white/35'}>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={5}
          style={{ fontFamily: 'Caveat, cursive', fontSize: '1.1rem', lineHeight: '1.8' }}
          className="w-full bg-white/[0.03] border border-white/8 rounded-xl p-4 pl-10 text-white/80 resize-none focus:outline-none focus:border-amber-500/30 focus:shadow-lg focus:shadow-amber-500/5 placeholder-white/15 transition-all duration-300"
          placeholder="Start writing... let your thoughts flow freely."
        />

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/15">Cmd+Enter to save</span>
            {newEntry.length > 0 && (
              <span className="text-[10px] text-white/15">{newEntry.length} chars</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={!newEntry.trim() || saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              newEntry.trim()
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02]'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" />
            {saving ? 'Saving...' : 'Add Entry'}
          </button>
        </div>
      </div>

      {/* Past entries grouped by date */}
      {dateKeys.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <BookOpen className="w-4 h-4 text-white/15" />
            <span className="text-xs text-white/20 uppercase tracking-wider font-medium">Past Entries</span>
          </div>

          {dateKeys.map((dateLabel, dateIdx) => {
            const isToday = dateLabel === todayLabel;
            const isExpanded = effectiveExpanded === dateLabel;
            const dayEntries = groupedByDate[dateLabel];
            const dayMoods = dayEntries.filter(e => e.moodEmoji).map(e => e.moodEmoji);

            return (
              <div
                key={dateLabel}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isToday
                    ? 'bg-gradient-to-br from-amber-500/[0.04] to-transparent border-amber-500/10'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => setExpandedDate(isExpanded ? '__none__' : dateLabel)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-white/[0.02] transition"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isToday
                      ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-400'
                      : 'bg-white/[0.04] text-white/25'
                  }`}>
                    {new Date(dayEntries[0].createdAt).getDate()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-medium ${isToday ? 'text-amber-300' : 'text-white/50'}`}>
                      {isToday ? 'Today' : dateLabel}
                    </span>
                    {dayMoods.length > 0 && (
                      <span className="ml-2 text-xs">{dayMoods.join(' ')}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-white/20 mr-2">
                    {dayEntries.length} {dayEntries.length === 1 ? 'entry' : 'entries'}
                  </span>
                  {isExpanded
                    ? <ChevronUp className="w-4 h-4 text-white/20" />
                    : <ChevronDown className="w-4 h-4 text-white/20" />
                  }
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4">
                    {dayEntries.map((entry, idx) => {
                      const time = new Date(entry.createdAt).toLocaleTimeString('en-US', {
                        hour: 'numeric', minute: '2-digit',
                      });
                      const moodData = entry.mood ? MOODS.find(m => m.label === entry.mood) : null;

                      return (
                        <div
                          key={entry.id}
                          className="group relative pl-8 border-l-2 border-white/5 hover:border-amber-500/20 transition-all duration-300"
                        >
                          {/* Timeline dot */}
                          <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-amber-500/30 group-hover:bg-amber-400/60 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all" />

                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] text-white/20">{time}</span>
                            {entry.moodEmoji && (
                              <span className="text-xs" title={entry.mood}>{entry.moodEmoji}</span>
                            )}
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="opacity-0 group-hover:opacity-100 text-white/15 hover:text-red-400/60 transition p-0.5 ml-auto"
                              title="Delete entry"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <p
                            className="text-white/55 whitespace-pre-wrap leading-relaxed group-hover:text-white/70 transition-colors"
                            style={{ fontFamily: 'Caveat, cursive', fontSize: '1.05rem', lineHeight: '1.7' }}
                          >
                            {entry.content}
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
      ) : (
        <div className="text-center py-16 space-y-4">
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/15 rounded-2xl flex items-center justify-center mx-auto">
              <PenLine className="w-7 h-7 text-amber-400/40" />
            </div>
          </div>
          <div>
            <p className="text-white/30 text-sm">Your journal is waiting</p>
            <p className="text-white/15 text-xs mt-1">Write your first entry to plant the seed</p>
          </div>
        </div>
      )}
    </div>
  );
}
