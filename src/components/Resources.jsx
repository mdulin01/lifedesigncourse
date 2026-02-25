import React, { useState } from 'react';
import { FolderOpen, ChevronRight, Compass, Map, BarChart3, LayoutDashboard, AlertCircle, Sparkles, Zap, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import ValuesEditor from './ValuesEditor';
import OdysseyPlanner from './OdysseyPlanner';
import HabitTracker from './HabitTracker';
import ErrorRecoveryGuide from './ErrorRecoveryGuide';
import PromptRecipeLibrary from './PromptRecipeLibrary';
import StackStarterKit from './StackStarterKit';

const samplePages = [
  { id: 'hwpl', label: 'HWPL Dashboard', description: 'Health, Work, Play, Love balance gauges and habit streaks', icon: LayoutDashboard, color: 'blue' },
  { id: 'values', label: 'Values Editor', description: 'Interactive values identification and ranking tool', icon: Compass, color: 'emerald' },
  { id: 'odyssey', label: 'Odyssey Planner', description: 'Three alternative 5-year life plans', icon: Map, color: 'purple' },
  { id: 'habits', label: 'Habit Tracker', description: 'Daily habit tracking with streaks and analytics', icon: BarChart3, color: 'amber' },
  { id: 'errors', label: 'Error Recovery Guide', description: 'Common errors and how to fix them with AI', icon: AlertCircle, color: 'red' },
  { id: 'prompts', label: 'Prompt Recipe Library', description: 'Copy-paste prompts for common tasks', icon: Sparkles, color: 'emerald' },
  { id: 'stack', label: 'Stack Starter Kit', description: 'The exact tech stack used to build this site', icon: Zap, color: 'amber' },
];

const references = [
  {
    category: 'Books & Frameworks',
    color: 'purple',
    links: [
      { label: 'Designing Your Life — Burnett & Evans', url: 'https://designingyour.life' },
      { label: 'Stanford Life Design Lab', url: 'https://lifedesignlab.stanford.edu' },
      { label: 'Atomic Habits — Identity-Based Habits', url: 'https://jamesclear.com/identity-based-habits' },
      { label: 'Atomic Habits — The Four Laws', url: 'https://jamesclear.com/three-steps-habit-change' },
      { label: 'Atomic Habits — Implementation Intentions', url: 'https://jamesclear.com/implementation-intentions' },
      { label: 'Atomic Habits — The Two-Minute Rule', url: 'https://jamesclear.com/how-to-stop-procrastinating' },
      { label: 'Atomic Habits — Habit Stacking', url: 'https://jamesclear.com/habit-stacking' },
      { label: 'Atomic Habits — Habits Scorecard', url: 'https://jamesclear.com/habits-scorecard' },
      { label: 'Atomic Habits — Environment Design', url: 'https://jamesclear.com/choice-architecture' },
      { label: 'Atomic Habits — Habit Tracking', url: 'https://jamesclear.com/habit-tracker' },
    ],
  },
  {
    category: 'Tools & Values',
    color: 'emerald',
    links: [
      { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
      { label: 'The 5 Whys Technique', url: 'https://en.wikipedia.org/wiki/Five_whys' },
      { label: 'Brené Brown — List of Values', url: 'https://brenebrown.com/resources/dare-to-lead-list-of-values/' },
      { label: 'Personal Values Card Sort (PDF)', url: 'https://motivationalinterviewing.org/sites/default/files/valuescardsort_0.pdf' },
    ],
  },
  {
    category: 'Dev & Design',
    color: 'blue',
    links: [
      { label: 'Node.js Download', url: 'https://nodejs.org' },
      { label: 'Vite — Getting Started', url: 'https://vitejs.dev/guide/' },
      { label: 'Tailwind CSS — Docs', url: 'https://tailwindcss.com/docs' },
      { label: 'React Docs — Your First Component', url: 'https://react.dev/learn/your-first-component' },
      { label: 'Recharts — React Chart Library', url: 'https://recharts.org' },
      { label: 'GitHub — Create Account', url: 'https://github.com/signup' },
      { label: 'Vercel — Deploy', url: 'https://vercel.com/new' },
      { label: 'Vercel — Custom Domains', url: 'https://vercel.com/docs/projects/domains' },
      { label: 'PWA Guide — web.dev', url: 'https://web.dev/progressive-web-apps/' },
    ],
  },
  {
    category: 'Design & Content',
    color: 'amber',
    links: [
      { label: 'Personal Site Inspiration — One Page Love', url: 'https://onepagelove.com/inspiration/personal' },
      { label: 'Coolors — Color Palette Generator', url: 'https://coolors.co' },
      { label: 'Google Fonts', url: 'https://fonts.google.com' },
      { label: 'Unsplash — Free Photos', url: 'https://unsplash.com' },
      { label: 'How to Write a Great Bio', url: 'https://www.grammarly.com/blog/professional-bio/' },
    ],
  },
];

const refColorMap = {
  purple: 'text-purple-400',
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  amber: 'text-amber-400',
};

const colorMap = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', iconBg: 'bg-blue-500/15' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', iconBg: 'bg-emerald-500/15' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', iconBg: 'bg-purple-500/15' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', iconBg: 'bg-amber-500/15' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', iconBg: 'bg-red-500/15' },
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
        {activePage === 'errors' && <ErrorRecoveryGuide onBack={() => setActivePage(null)} />}
        {activePage === 'prompts' && <PromptRecipeLibrary />}
        {activePage === 'stack' && <StackStarterKit />}
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

      {/* References */}
      <ReferencesSection />
    </div>
  );
}

function ReferencesSection() {
  const [expandedCategory, setExpandedCategory] = useState(null);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">References</h2>
        <p className="text-white/40 text-sm mt-1">External links referenced throughout the course</p>
      </div>
      <div className="space-y-2">
        {references.map((group) => {
          const isExpanded = expandedCategory === group.category;
          const colors = refColorMap[group.color];
          return (
            <div key={group.category} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : group.category)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-white">{group.category}</span>
                  <span className="text-xs text-white/20 ml-2">{group.links.length} links</span>
                </div>
                {isExpanded
                  ? <ChevronUp className="w-4 h-4 text-white/20 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-white/20 shrink-0" />
                }
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 space-y-1.5 border-t border-white/5 pt-3">
                  {group.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition text-sm ${colors}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-50" />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
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
