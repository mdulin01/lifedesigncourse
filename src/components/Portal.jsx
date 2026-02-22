import React, { useState } from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { useBTS } from '../contexts/BTSContext';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import CheckIn from './CheckIn';
import Journal from './Journal';
import CourseContent from './CourseContent';
import Workbook from './Workbook';
import Resources from './Resources';

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
    profile: 'Profile',
    team: 'My Team',
  };

  // Desktop top bar for module view
  const showModuleBar = activeSection === 'course' && activeModule;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar */}
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
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-1.5 text-white/40 hover:text-white transition shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          ) : (
            /* Default bar — section name + hamburger on mobile */
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-1.5 text-white/60 hover:text-white transition"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="font-semibold text-white text-sm">{sectionLabels[activeSection] || activeSection}</span>
            </div>
          )}
        </header>

        {/* Spacer for fixed header */}
        <div className="h-[53px]" />

        {/* Content */}
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
