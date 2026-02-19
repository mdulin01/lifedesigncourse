import React from 'react';
import { BarChart3, Plus } from 'lucide-react';
import { habitLaws } from '../constants';

export default function HabitTracker() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Habit Tracker</h1>
        <p className="text-white/40 text-sm mt-1">Build identity-based habits using the Four Laws of Behavior Change</p>
      </div>

      {/* Four Laws */}
      <div className="grid grid-cols-2 gap-3">
        {habitLaws.map(law => (
          <div key={law.id} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
            <div className="text-2xl mb-2">{law.emoji}</div>
            <div className="text-[10px] font-bold text-white/30 uppercase mb-0.5">{law.law}</div>
            <h3 className="text-sm font-bold text-white mb-1">{law.label}</h3>
            <p className="text-xs text-white/40">{law.description}</p>
          </div>
        ))}
      </div>

      {/* Habits list */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-400" />
            <h2 className="text-base font-bold text-white">My Habits</h2>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-medium text-emerald-300 hover:bg-emerald-500/30 transition">
            <Plus className="w-3 h-3" /> Add Habit
          </button>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📈</div>
          <p className="text-white/30 text-sm">No habits yet</p>
          <p className="text-white/15 text-xs mt-1">Coming in Modules 5 & 7</p>
        </div>
      </div>
    </div>
  );
}
