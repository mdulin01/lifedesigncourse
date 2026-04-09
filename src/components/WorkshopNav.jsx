import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/welcome', icon: '🏠', label: 'Home' },
  { path: '/survey', icon: '📋', label: 'Survey' },
  { path: '/schedule', icon: '📅', label: 'Schedule' },
  { path: '/values', icon: '🧭', label: 'Values' },
  { path: '/values/cloud', icon: '☁️', label: 'Word Cloud' },
  { path: '/worksheet', icon: '📓', label: 'Workbook' },
];

export default function WorkshopNav({ email }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const emailParam = email ? `?email=${encodeURIComponent(email)}` : '';

  return (
    <>
      {/* Toggle button — fixed top-left */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/[0.12] hover:text-white transition backdrop-blur-sm shadow-lg"
        aria-label="Toggle navigation"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {/* Slide-out panel */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-slate-900/95 border-r border-white/10 z-40 transform transition-transform duration-200 ease-out backdrop-blur-md ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="pt-16 px-3">
          <p className="text-[10px] uppercase tracking-widest text-white/30 px-3 mb-3">Workshop Tools</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={`${item.path}${emailParam}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-400 font-medium'
                      : 'text-white/50 hover:bg-white/[0.05] hover:text-white/80'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
