import React from 'react';
import { Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { courseModules, moduleProjects } from '../constants';
import { useProgress } from '../hooks/useProgress';
import ModuleProjects from './ModuleProjects';

export default function CourseContent({ user, activeModule, onModuleChange }) {
  const frameworkLabels = { dyl: 'Designing Your Life', ah: 'Atomic Habits', ai: 'AI Tools', both: 'Combined' };
  const { isModuleComplete } = useProgress(user);

  // If a module is selected, show its project steps
  if (activeModule) {
    return (
      <ModuleProjects
        module={activeModule}
        onBack={() => onModuleChange(null)}
        onModuleChange={onModuleChange}
        user={user}
      />
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Course Modules</h1>
        <p className="text-white/40 text-sm mt-1">8 modules to design your life with intention</p>
      </div>

      {/* Module list */}
      <div className="space-y-2">
        {courseModules.map((mod, idx) => {
          const hasProjects = !!moduleProjects[mod.id];
          const totalSteps = (moduleProjects[mod.id] || []).length;
          const isComplete = hasProjects && isModuleComplete(mod.id, totalSteps);
          const isActive = hasProjects && !isComplete;
          const isLocked = !hasProjects;

          return (
            <button
              key={mod.id}
              onClick={() => hasProjects && onModuleChange(mod)}
              disabled={!hasProjects}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition text-left ${
                isComplete
                  ? 'bg-emerald-500/[0.04] border-emerald-500/20 hover:bg-emerald-500/[0.08] cursor-pointer'
                  : isActive
                    ? 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/15 cursor-pointer'
                    : 'bg-white/[0.01] border-white/5 opacity-60 cursor-default'
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
                  {isComplete && (
                    <span className="text-[9px] font-bold text-emerald-400/60 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      COMPLETE
                    </span>
                  )}
                </div>
                <h3 className={`text-sm font-semibold truncate ${
                  isComplete
                    ? 'text-white/40 line-through decoration-emerald-500/30 decoration-1'
                    : 'text-white'
                }`}>
                  {mod.title}
                </h3>
                {isLocked && (
                  <span className="text-[10px] text-white/20">Coming soon</span>
                )}
              </div>

              {isComplete ? (
                <CheckCircle className="w-5 h-5 text-emerald-400/50 shrink-0" />
              ) : isActive ? (
                <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
