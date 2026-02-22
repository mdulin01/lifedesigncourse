import React, { useState } from 'react';
import { Menu } from 'lucide-react';
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
  const { showBTS, toggleBTS } = useBTS();

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard user={user} onNavigate={setActiveSection} />;
      case 'checkin': return <CheckIn user={user} />;
      case 'journal': return <Journal user={user} />;
      case 'course': return <CourseContent user={user} />;
      case 'workbook': return <Workbook user={user} />;
      case 'resources': return <Resources />;
      default: return <Dashboard user={user} onNavigate={setActiveSection} />;
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

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onSignOut={onSignOut}
        showBTS={showBTS}
        toggleBTS={toggleBTS}
      />

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="md:ml-60 min-h-screen flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-white/60 hover:text-white transition"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold text-white text-sm">{sectionLabels[activeSection] || activeSection}</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
