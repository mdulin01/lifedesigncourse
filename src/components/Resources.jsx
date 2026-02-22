import React, { useState } from 'react';
import { FolderOpen, ChevronRight, Compass, Map, BarChart3, LayoutDashboard } from 'lucide-react';
import ValuesEditor from './ValuesEditor';
import OdysseyPlanner from './OdysseyPlanner';
import HabitTracker from './HabitTracker';

const samplePages = [
  { id: 'hwpl', label: 'HWPL Dashboard', description: 'Health, Work, Play, Love balance gauges and habit streaks', icon: LayoutDashboard, color: 'blue' },
  { id: 'values', label: 'Values Editor', description: 'Interactive values identification and ranking tool', icon: Compass, color: 'emerald' },
  { id: 'odyssey', label: 'Odyssey Planner', description: 'Three alternative 5-year life plans', icon: Map, color: 'purple' },
  { id: 'habits', label: 'Habit Tracker', description: 'Daily habit tracking with streaks and analytics', icon: BarChart3, color: 'amber' },
];

const colorMap = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', iconBg: 'bg-blue-500/15' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', iconBg: 'bg-emerald-500/15' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', iconBg: 'bg-purple-500/15' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', iconBg: 'bg-amber-500/15' },
};

export default function Resources() {
  const [activePage, setActivePage] = useState(null);

  if (activePage) {
    const page = samplePages.find(p => p.id === activePage);
    return (
      <div className="space-y-4 pb-20 md:pb-6">
        <button
          onClick={() => setActivePage(null)}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Resources
        </button>
        <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-2.5 mb-2">
          <span className="text-xs text-amber-400/70">Sample Page — {page?.label}</span>
        </div>
        {activePage === 'hwpl' && <HWPLDashboard />}
        {activePage === 'values' && <ValuesEditor />}
        {activePage === 'odyssey' && <OdysseyPlanner />}
        {activePage === 'habits' && <HabitTracker />}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Resources</h1>
        <p className="text-white/40 text-sm mt-1">Sample tools and reference pages from the Life Design toolkit</p>
      </div>

      <div className="space-y-3">
        {samplePages.map((page) => {
          const Icon = page.icon;
          const colors = colorMap[page.color];
          return (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className="w-full flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-4 hover:bg-white/[0.06] transition text-left"
            >
              <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-white">{page.label}</span>
                <p className="text-xs text-white/30 mt-0.5">{page.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Inline HWPL Dashboard — the old Dashboard content
function HWPLDashboard() {
  const categories = [
    { label: 'Health', emoji: '💪', score: 0 },
    { label: 'Work', emoji: '💼', score: 0 },
    { label: 'Play', emoji: '🎯', score: 0 },
    { label: 'Love', emoji: '❤️', score: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Life Balance Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Rate and track your Health, Work, Play, and Love balance</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <div key={cat.label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
            <span className="text-3xl">{cat.emoji}</span>
            <h3 className="text-sm font-semibold text-white mt-2">{cat.label}</h3>
            <div className="mt-3 h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${cat.score * 10}%` }} />
            </div>
            <span className="text-xs text-white/30 mt-1 block">{cat.score}/10</span>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-center">
        <p className="text-white/25 text-sm">This is a sample dashboard. Your actual progress is tracked in the Course and Workbook sections.</p>
      </div>
    </div>
  );
}
