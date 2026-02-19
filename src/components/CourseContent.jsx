import React from 'react';
import { GraduationCap, Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { courseModules } from '../constants';

export default function CourseContent() {
  const frameworkLabels = { dyl: 'Designing Your Life', ah: 'Atomic Habits', ai: 'AI Tools', both: 'Combined' };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Course Progress</h1>
        <p className="text-white/40 text-sm mt-1">Track your journey through all 8 modules</p>
      </div>

      {/* Progress bar */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Overall Progress</span>
          <span className="text-sm text-emerald-400 font-bold">0%</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Module list */}
      <div className="space-y-2">
        {courseModules.map((mod, idx) => {
          const isComplete = false;
          const isActive = idx === 0;
          const isLocked = idx > 0;

          return (
            <div
              key={mod.id}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition ${
                isActive
                  ? 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/15'
                  : isComplete
                    ? 'bg-white/[0.02] border-white/10'
                    : 'bg-white/[0.01] border-white/5 opacity-60'
              }`}
            >
              {/* Status icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isComplete ? 'bg-emerald-500/20' : isActive ? 'bg-emerald-500/15' : 'bg-white/5'
              }`}>
                {isComplete ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : isLocked ? (
                  <Lock className="w-4 h-4 text-white/20" />
                ) : (
                  <span className="text-xl">{mod.icon}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white/30 uppercase">Module {mod.id}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-white/40">
                    {frameworkLabels[mod.framework]}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white truncate">{mod.title}</h3>
              </div>

              {isActive && <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
