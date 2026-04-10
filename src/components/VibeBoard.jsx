import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase-config';
import {
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { Plus, GripVertical, Trash2, ArrowRight, ArrowLeft, Lightbulb, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { allowedEmails } from '../constants';

const COLUMNS = [
  { id: 'idea', label: 'Ideas', icon: Lightbulb, color: 'amber', gradient: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500/30', dot: 'bg-amber-400' },
  { id: 'building', label: 'Building', icon: Loader2, color: 'blue', gradient: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', dot: 'bg-blue-400' },
  { id: 'done', label: 'Done', icon: CheckCircle2, color: 'emerald', gradient: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
];

export default function VibeBoard({ user }) {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const inputRef = useRef(null);

  const isAdmin = allowedEmails.includes(user?.email?.toLowerCase());

  // Real-time listener on shared collection
  useEffect(() => {
    const q = query(collection(db, 'vibeBoard'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setIdeas(items);
      setLoading(false);
    });
    return unsub;
  }, []);

  const addIdea = async (e) => {
    e.preventDefault();
    const text = newIdea.trim();
    if (!text || adding) return;
    setAdding(true);
    try {
      await addDoc(collection(db, 'vibeBoard'), {
        text,
        status: 'idea',
        createdAt: serverTimestamp(),
        authorName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        authorEmail: user.email,
        authorUid: user.uid,
      });
      setNewIdea('');
      inputRef.current?.focus();
    } catch (err) {
      console.error('Failed to add idea:', err);
    }
    setAdding(false);
  };

  const moveIdea = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'vibeBoard', id), { status: newStatus });
    } catch (err) {
      console.error('Failed to move idea:', err);
    }
  };

  const removeIdea = async (id) => {
    try {
      await deleteDoc(doc(db, 'vibeBoard', id));
    } catch (err) {
      console.error('Failed to remove idea:', err);
    }
  };

  const colIndex = (status) => COLUMNS.findIndex((c) => c.id === status);

  const canDelete = (idea) => isAdmin || idea.authorUid === user?.uid;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h1 className="text-2xl font-bold text-white">Vibe Coding Ideas</h1>
        </div>
        <p className="text-sm text-white/50">
          Drop ideas for things we could build together — move them across as we go.
        </p>
      </div>

      {/* Quick add */}
      <form onSubmit={addIdea} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder="Type an idea and hit enter..."
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition"
        />
        <button
          type="submit"
          disabled={!newIdea.trim() || adding}
          className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </form>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => {
          const Icon = col.icon;
          const colIdeas = ideas.filter((i) => i.status === col.id);
          return (
            <div key={col.id} className={`bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden`}>
              {/* Column header */}
              <div className={`flex items-center gap-2 px-4 py-3 bg-gradient-to-r ${col.gradient} border-b ${col.border}`}>
                <Icon className="w-4 h-4 text-white/70" />
                <span className="text-sm font-semibold text-white">{col.label}</span>
                <span className="ml-auto text-xs text-white/30 tabular-nums">{colIdeas.length}</span>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-2 min-h-[120px]">
                {colIdeas.length === 0 && (
                  <p className="text-xs text-white/15 text-center py-6">No items yet</p>
                )}
                {colIdeas.map((idea) => {
                  const idx = colIndex(idea.status);
                  const canLeft = idx > 0;
                  const canRight = idx < COLUMNS.length - 1;
                  return (
                    <div
                      key={idea.id}
                      className="group bg-white/[0.04] border border-white/10 rounded-xl p-3 hover:bg-white/[0.06] transition"
                    >
                      <p className="text-sm text-white/90 mb-2 leading-relaxed">{idea.text}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/25">{idea.authorName}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {canLeft && (
                            <button
                              onClick={() => moveIdea(idea.id, COLUMNS[idx - 1].id)}
                              className="p-1 text-white/25 hover:text-white/60 transition"
                              title={`Move to ${COLUMNS[idx - 1].label}`}
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {canRight && (
                            <button
                              onClick={() => moveIdea(idea.id, COLUMNS[idx + 1].id)}
                              className="p-1 text-white/25 hover:text-white/60 transition"
                              title={`Move to ${COLUMNS[idx + 1].label}`}
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {canDelete(idea) && (
                            <button
                              onClick={() => removeIdea(idea.id)}
                              className="p-1 text-white/25 hover:text-rose-400 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
