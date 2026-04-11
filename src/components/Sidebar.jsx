import React from 'react';
import {
  Home, GraduationCap, Users, Target,
  PenLine, LogOut, X, Eye, EyeOff, Compass,
} from 'lucide-react';

const navSections = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'myplan', label: 'My Plan', icon: Target },
  { id: 'course', label: 'Course', icon: GraduationCap },
  { id: 'training', label: 'Training Hub', icon: Compass },
  { id: 'journal', label: 'Journal', icon: PenLine },
  { id: 'team', label: 'My Team', icon: Users },
];

export default function Sidebar({
  activeSection,
  onNavigate,
  isOpen,
  onClose,
  user,
  onSignOut,
  showBTS,
  toggleBTS,
}) {
  const renderNavItem = (section) => {
    const Icon = section.icon;
    const isActive = activeSection === section.id;

    return (
      <button
        key={section.id}
        onClick={() => {
          onNavigate(section.id);
          onClose?.();
        }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        }`}
      >
        <Icon className="w-4.5 h-4.5 shrink-0" style={{ width: '18px', height: '18px' }} />
        <span>{section.label}</span>
      </button>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/5">
        <a href="/" className="flex items-center gap-2.5">
          <span className="text-xl">🤖</span>
          <div>
            <span className="font-bold text-white text-sm tracking-tight">AI Life Design</span>
            <span className="block text-[9px] text-white/30 uppercase tracking-widest">Course Portal</span>
          </div>
        </a>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navSections.map((s) => renderNavItem(s))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5 space-y-3">
        {/* BTS toggle */}
        <button
          onClick={toggleBTS}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
            showBTS
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
              : 'text-white/25 hover:text-white/40 hover:bg-white/5'
          }`}
        >
          {showBTS ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          Behind the Scenes
        </button>

        {/* User row */}
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
            {(user?.displayName || user?.email || '?')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{user?.displayName || 'User'}</p>
            <p className="text-[10px] text-white/30 truncate">{user?.email}</p>
          </div>
          <button
            onClick={onSignOut}
            className="p-1.5 text-white/20 hover:text-white/50 transition shrink-0"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-slate-900/60 border-r border-white/5 fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="relative w-72 max-w-[80vw] bg-slate-900 border-r border-white/10 flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-4 right-3 p-1.5 text-white/30 hover:text-white/60 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
