import React, { useState } from 'react';
import { Menu, ArrowLeft, Home, BookOpen, PenLine, GraduationCap, ClipboardList, Users } from 'lucide-react';
import { useBTS } from '../contexts/BTSContext';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import CheckIn from './CheckIn';
import Journal from './Journal';
import CourseContent from './CourseContent';
import Workbook from './Workbook';
import Resources from './Resources';
import MyTeam from './MyTeam';
import PromptRecipeLibrary from './PromptRecipeLibrary';
import StackStarterKit from './StackStarterKit';

const mobileNav = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'checkin', label: 'Check In', icon: BookOpen },
  { id: 'journal', label: 'Journal', icon: PenLine },
  { id: 'course', label: 'Course', icon: GraduationCap },
  { id: 'workbook', label: 'Workbook', icon: ClipboardList },
  { id: 'team', label: 'Team', icon: Users },
];

export default function Portal({ user, onSignOut }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null); // tracks current module for header
  const { showBTS, toggleBTS } = useBTS();

  const handleNavigate = (section) => {
    setActiveSection(section);
    if (section !== 'course') setActiveModule(null);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard user={user} onNavigate={handleNavigate} />;
      case 'checkin': return <CheckIn user={user} />;
      case 'journal': return <Journal user={user} />;
      case 'course': return <CourseContent user={user} activeModule={activeModule} onModuleChange={setActiveModule} />;
      case 'workbook': return <Workbook user={user} />;
      case 'resources': return <Resources />;
      case 'prompts': return <PromptRecipeLibrary />;
      case 'stack': return <StackStarterKit />;
      case 'team': return <MyTeam user={user} />;
      default: return <Dashboard user={user} onNavigate={handleNavigate} />;
    }
  };

  const sectionLabels = {
    dashboard: 'Home',
    checkin: 'Check In',
    journal: 'Journal',
    course: 'Course',
    workbook: 'Workbook',
    resources: 'Resources',
    prompts: 'Prompt Library',
    stack: 'Stack Starter',
    profile: 'Profile',
    team: 'My Team',
  };

  // Desktop top bar for module view
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

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="md:ml-60 min-h-screen flex flex-col">
        {/* Fixed top bar */}
        <header className="fixed top-0 left-0 right-0 md:left-60 z-20 bg-slate-900/95 backdrop-blur-xl border-b border-white/5">
          {showModuleBar ? (
            /* Module detail bar — shown when inside a module */
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
            /* Default bar — section name only */
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="font-semibold text-white text-sm">{sectionLabels[activeSection] || activeSection}</span>
            </div>
          )}
        </header>

        {/* Spacer for fixed header */}
        <div className="h-[53px]" />

        {/* Content — extra bottom padding on mobile for bottom nav */}
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
            {renderSection()}
          </div>
        </main>

        {/* Build footer */}
        <footer className="py-4 text-center hidden md:block">
          <p className="text-[10px] text-white/10">v1.0 · Feb 22, 2026 · Built By Mike Dulin, MD</p>
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
