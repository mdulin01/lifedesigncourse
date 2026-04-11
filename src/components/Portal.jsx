import React, { useState } from 'react';
import { ArrowLeft, Home, PenLine, GraduationCap, Users, Target, Compass } from 'lucide-react';
import { useBTS } from '../contexts/BTSContext';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Journal from './Journal';
import CourseContent from './CourseContent';
import MyTeam from './MyTeam';
import Training from './Training';
import MyPlan from './MyPlan';

const mobileNav = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'myplan', label: 'My Plan', icon: Target },
  { id: 'course', label: 'Course', icon: GraduationCap },
  { id: 'training', label: 'Hub', icon: Compass },
  { id: 'journal', label: 'Journal', icon: PenLine },
  { id: 'team', label: 'Team', icon: Users },
];

export default function Portal({ user, onSignOut }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const { showBTS, toggleBTS } = useBTS();

  const handleNavigate = (section) => {
    setActiveSection(section);
    if (section !== 'course') setActiveModule(null);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard user={user} onNavigate={handleNavigate} />;
      case 'myplan': return <MyPlan user={user} onNavigate={handleNavigate} />;
      case 'journal': return <Journal user={user} />;
      case 'course': return <CourseContent user={user} activeModule={activeModule} onModuleChange={setActiveModule} />;
      case 'training': return <Training user={user} onNavigate={handleNavigate} />;
      case 'team': return <MyTeam user={user} />;
      default: return <Dashboard user={user} onNavigate={handleNavigate} />;
    }
  };

  const sectionLabels = {
    dashboard: 'Home',
    myplan: 'My Plan',
    journal: 'Journal',
    course: 'Course',
    training: 'Training Hub',
    team: 'My Team',
  };

  const showModuleBar = activeSection === 'course' && activeModule;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar — desktop only */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onSignOut={onSignOut}
        showBTS={showBTS}
        toggleBTS={toggleBTS}
      />

      {/* Main content area */}
      <div className="md:ml-60 min-h-screen flex flex-col">
        {/* Fixed top bar */}
        <header className="fixed top-0 left-0 right-0 md:left-60 z-20 bg-slate-900/95 backdrop-blur-xl border-b border-white/5">
          {showModuleBar ? (
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                onClick={() => setActiveModule(null)}
                className="flex items-center gap-1 text-sm text-emerald-400/70 hover:text-emerald-400 transition shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="w-px h-5 bg-white/10 shrink-0" />
              <span className="text-xl shrink-0">{activeModule.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider">Module {activeModule.id}</span>
                <h2 className="text-sm font-semibold text-white truncate">{activeModule.title}</h2>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="font-semibold text-white text-sm">{sectionLabels[activeSection] || activeSection}</span>
            </div>
          )}
        </header>

        <div className="h-[53px]" />

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
            {renderSection()}
          </div>
        </main>

        <footer className="py-4 text-center hidden md:block">
          <p className="text-[10px] text-white/10">v2.0 · Apr 2026 · Built By Mike Dulin, MD</p>
        </footer>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-stretch justify-around">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex flex-col items-center gap-0.5 py-2 px-1 flex-1 transition-colors ${
                  isActive ? 'text-emerald-400' : 'text-white/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
        <div className="pb-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}
