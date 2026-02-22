import React, { useState } from 'react';
import { LayoutDashboard, Compass, BookOpen, Map, BarChart3, GraduationCap, ClipboardList, LogOut, Menu, X, Eye, EyeOff } from 'lucide-react';
import { useBTS } from '../contexts/BTSContext';
import Dashboard from './Dashboard';
import ValuesEditor from './ValuesEditor';
import Journal from './Journal';
import OdysseyPlanner from './OdysseyPlanner';
import HabitTracker from './HabitTracker';
import CourseContent from './CourseContent';
import Workbook from './Workbook';

const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'values', label: 'Values', icon: Compass },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'odyssey', label: 'Odyssey', icon: Map },
  { id: 'habits', label: 'Habits', icon: BarChart3 },
  { id: 'course', label: 'Course', icon: GraduationCap },
  { id: 'workbook', label: 'Workbook', icon: ClipboardList },
];

export default function Portal({ user, onSignOut }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { showBTS, toggleBTS } = useBTS();

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'values': return <ValuesEditor />;
      case 'journal': return <Journal />;
      case 'odyssey': return <OdysseyPlanner />;
      case 'habits': return <HabitTracker />;
      case 'course': return <CourseContent user={user} />;
      case 'workbook': return <Workbook user={user} />;
      default: return <Dashboard user={user} />;
    }
  };

  const ActiveIcon = sections.find(s => s.id === activeSection)?.icon || LayoutDashboard;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Desktop header */}
      <header className="hidden md:flex items-center gap-1 px-4 py-2 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
        <a href="/" className="flex items-center gap-2 mr-4">
          <span className="text-lg">🧭</span>
          <span className="font-bold text-white text-sm">Life Design</span>
        </a>
        <div className="flex items-center gap-1">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeSection === s.id
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {s.label}
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button onClick={toggleBTS} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition ${showBTS ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-white/30 hover:text-white/50'}`}>
            {showBTS ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />} BTS
          </button>
          <span className="text-xs text-white/30">{user.displayName || user.email}</span>
          <button onClick={onSignOut} className="p-1.5 text-white/30 hover:text-white/60 transition">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <button onClick={() => setShowMobileNav(!showMobileNav)} className="p-1.5 text-white/60 hover:text-white transition">
            {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <ActiveIcon className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white text-sm">{sections.find(s => s.id === activeSection)?.label}</span>
          </div>
        </div>
        <button onClick={onSignOut} className="p-1.5 text-white/30 hover:text-white/60 transition">
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* Mobile nav dropdown */}
      {showMobileNav && (
        <div className="md:hidden bg-slate-900 border-b border-white/10 px-2 py-2">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => { setActiveSection(s.id); setShowMobileNav(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${
                  activeSection === s.id ? 'bg-emerald-500/15 text-emerald-300' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" /> {s.label}
              </button>
            );
          })}
          <div className="border-t border-white/10 mt-1 pt-1">
            <a href="/" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/30 hover:text-white/60 transition">
              ← Back to Course Site
            </a>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {renderSection()}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex justify-around safe-bottom">
        {sections.map(s => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition ${
                activeSection === s.id ? 'text-emerald-400' : 'text-white/30'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{s.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
