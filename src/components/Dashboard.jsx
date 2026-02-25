import React from 'react';
import { Users, GraduationCap, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { courseModules, moduleProjects } from '../constants';
import { useWorkbook } from '../hooks/useWorkbook';

export default function Dashboard({ user, onNavigate }) {
  const { workbookData, loading } = useWorkbook(user);
  const firstName = user?.displayName?.split(' ')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Calculate progress
  const moduleData = workbookData?.moduleData || {};
  let totalExercises = 0;
  let completedExercises = 0;
  let modulesWithProgress = 0;

  Object.keys(moduleProjects).forEach((modId) => {
    const steps = moduleProjects[modId];
    let modCompleted = 0;
    steps.forEach((step) => {
      if (step.exercise) {
        totalExercises++;
        if (moduleData[String(modId)]?.[step.number]) {
          completedExercises++;
          modCompleted++;
        }
      }
    });
    if (modCompleted > 0) modulesWithProgress++;
  });

  const totalModules = courseModules.length;
  const overallPct = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">{greeting}, {firstName}</h1>
        <p className="text-white/40 text-sm mt-1">Welcome to the Life Design Course</p>
      </div>

      {/* Course Progress */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">My Progress</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/[0.04] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{modulesWithProgress}<span className="text-lg text-white/30">/{totalModules}</span></div>
            <div className="text-xs text-white/40 mt-1">Modules Started</div>
          </div>
          <div className="bg-white/[0.04] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400">{completedExercises}<span className="text-lg text-white/30">/{totalExercises}</span></div>
            <div className="text-xs text-white/40 mt-1">Exercises Done</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">Overall completion</span>
            <span className="text-xs text-emerald-400 font-bold">{overallPct}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>

        {/* Module breakdown */}
        <div className="mt-4 space-y-1.5">
          {courseModules.slice(0, 3).map((mod) => {
            const steps = moduleProjects[mod.id] || [];
            const exerciseSteps = steps.filter(s => s.exercise);
            const done = exerciseSteps.filter(s => moduleData[String(mod.id)]?.[s.number]).length;
            const pct = exerciseSteps.length > 0 ? Math.round((done / exerciseSteps.length) * 100) : 0;

            return (
              <button
                key={mod.id}
                onClick={() => onNavigate?.('course')}
                className="w-full flex items-center gap-3 px-3 py-2 bg-white/[0.03] rounded-xl hover:bg-white/[0.06] transition text-left"
              >
                <span className="text-lg">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-white/70 truncate block">{mod.title}</span>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className="text-[10px] text-white/30 shrink-0">{done}/{exerciseSteps.length}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate?.('course')}
          className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 hover:bg-white/[0.06] transition text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold text-white">Continue Course</span>
            <p className="text-xs text-white/30 mt-0.5">Pick up where you left off</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/20" />
        </button>

        <button
          onClick={() => onNavigate?.('team')}
          className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 hover:bg-white/[0.06] transition text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold text-white">My Team</span>
            <p className="text-xs text-white/30 mt-0.5">Connect with your cohort</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/20" />
        </button>

        <button
          onClick={() => onNavigate?.('workbook')}
          className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 hover:bg-white/[0.06] transition text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold text-white">My Workbook</span>
            <p className="text-xs text-white/30 mt-0.5">Review your exercise responses</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/20" />
        </button>

      </div>
    </div>
  );
}
