import React from 'react';
import { BookOpen, Zap, Battery } from 'lucide-react';
import { journalPrompts } from '../constants';

export default function Journal() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Good Time Journal</h1>
        <p className="text-white/40 text-sm mt-1">Track your activities and discover what energizes you — using the AEIOU framework</p>
      </div>

      {/* AEIOU Framework */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h2 className="text-base font-bold text-white">AEIOU Framework</h2>
        </div>
        <div className="grid gap-2">
          {Object.entries(journalPrompts).map(([key, prompt]) => (
            <div key={key} className="flex items-start gap-2 text-sm">
              <span className="font-bold text-yellow-400 uppercase w-2">{key[0]}</span>
              <span className="text-white/50">{prompt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Entry area */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">Today's Entries</h2>
        </div>
        <div className="text-center py-8">
          <Battery className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-white/30 text-sm">No entries yet</p>
          <p className="text-white/15 text-xs mt-1">Coming in Module 3</p>
        </div>
      </div>
    </div>
  );
}
