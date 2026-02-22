import React, { useState, useEffect, useCallback } from 'react';
import { PenLine, Plus, ChevronDown, ChevronUp, Clock, Trash2 } from 'lucide-react';
import { doc, setDoc, onSnapshot, collection, query, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function Journal({ user }) {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedDate, setExpandedDate] = useState(null);

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

  const handleAdd = async () => {
    if (!user?.uid || !newEntry.trim()) return;
    setSaving(true);
    try {
      const now = new Date();
      const entryId = now.toISOString().replace(/[:.]/g, '-');
      await setDoc(doc(db, 'journals', user.uid, 'entries', entryId), {
        content: newEntry.trim(),
        createdAt: now.toISOString(),
        userEmail: user.email,
      });
      setNewEntry('');
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

  // Auto-expand today
  const effectiveExpanded = expandedDate === null ? todayLabel : expandedDate;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Journal</h1>
        <p className="text-white/40 text-sm mt-1">Reflect on your process, capture thoughts, and track your journey</p>
      </div>

      {/* New entry form */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <PenLine className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white">New Entry</span>
          <span className="text-[10px] text-white/20 ml-auto">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </span>
        </div>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-white text-sm resize-none focus:outline-none focus:border-emerald-500/40 placeholder-white/20"
          placeholder="What's on your mind? How are you feeling about the course?"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] text-white/20">⌘+Enter to save</span>
          <button
            onClick={handleAdd}
            disabled={!newEntry.trim() || saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
              newEntry.trim()
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
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
        <div className="space-y-2">
          {dateKeys.map((dateLabel) => {
            const isToday = dateLabel === todayLabel;
            const isExpanded = effectiveExpanded === dateLabel;
            const dayEntries = groupedByDate[dateLabel];

            return (
              <div key={dateLabel} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedDate(isExpanded ? '__none__' : dateLabel)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition"
                >
                  <Clock className="w-4 h-4 text-white/20 shrink-0" />
                  <span className={`text-sm font-medium ${isToday ? 'text-emerald-400' : 'text-white/50'}`}>
                    {isToday ? 'Today' : dateLabel}
                  </span>
                  <span className="text-[10px] text-white/20 ml-auto mr-2">
                    {dayEntries.length} {dayEntries.length === 1 ? 'entry' : 'entries'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-white/20" /> : <ChevronDown className="w-4 h-4 text-white/20" />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    {dayEntries.map((entry) => {
                      const time = new Date(entry.createdAt).toLocaleTimeString('en-US', {
                        hour: 'numeric', minute: '2-digit',
                      });
                      return (
                        <div key={entry.id} className="group flex gap-3">
                          <div className="flex flex-col items-center pt-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/40 shrink-0" />
                            <div className="w-px flex-1 bg-white/5 mt-1" />
                          </div>
                          <div className="flex-1 min-w-0 pb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] text-white/25">{time}</span>
                              <button
                                onClick={() => handleDelete(entry.id)}
                                className="opacity-0 group-hover:opacity-100 text-white/15 hover:text-red-400/60 transition p-0.5"
                                title="Delete entry"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-sm text-white/60 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
                          </div>
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
        <div className="text-center py-12">
          <PenLine className="w-8 h-8 text-white/10 mx-auto mb-3" />
          <p className="text-white/25 text-sm">No entries yet</p>
          <p className="text-white/15 text-xs mt-1">Start journaling about your experience</p>
        </div>
      )}
    </div>
  );
}
