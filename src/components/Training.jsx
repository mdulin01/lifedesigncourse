import React, { useState } from 'react';
import {
  Compass, Lightbulb, ChevronRight, ChevronDown, ChevronUp,
  BookOpen, CheckCircle2, Circle, Loader2, GraduationCap,
  Code, Heart, BookMarked,
} from 'lucide-react';
import { useWorkbook } from '../hooks/useWorkbook';
import { courseModules, moduleProjects } from '../constants';
import VibeBoard from './VibeBoard';

// Collapsible section wrapper
function Section({ icon: Icon, title, subtitle, color, gradient, border, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`border ${border} rounded-2xl overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${gradient} text-left transition hover:brightness-110`}
      >
        <Icon className={`w-5 h-5 text-${color}-400 shrink-0`} />
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-white block">{title}</span>
          {subtitle && <span className="text-xs text-white/40">{subtitle}</span>}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
      </button>
      {open && <div className="px-5 py-4 space-y-4">{children}</div>}
    </div>
  );
}

// Module progress summary
function ModuleProgress({ moduleId, workbookData, onNavigate }) {
  const steps = moduleProjects[moduleId] || [];
  const modData = workbookData?.moduleData?.[String(moduleId)] || {};
  const exerciseSteps = steps.filter((s) => s.exercise);
  const completedCount = exerciseSteps.filter((s) => modData[s.number]).length;
  const pct = exerciseSteps.length > 0 ? Math.round((completedCount / exerciseSteps.length) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-white/40 tabular-nums shrink-0">{completedCount}/{exerciseSteps.length}</span>
      </div>
      <div className="space-y-1.5">
        {steps.map((step) => {
          const done = step.exercise && modData[step.number];
          return (
            <div key={step.number} className="flex items-start gap-2.5 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition">
              {done ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <Circle className="w-4 h-4 text-white/15 shrink-0 mt-0.5" />}
              <div className="min-w-0">
                <span className="text-sm text-white/80 block">{step.title}</span>
                <span className="text-xs text-white/30 block truncate">{step.description}</span>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => onNavigate?.('course')} className="text-xs text-emerald-400/70 hover:text-emerald-400 flex items-center gap-1 transition mt-1">
        Open in Course <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}

// Workbook results summary
function WorkbookSummary({ workbookData, onNavigate }) {
  const moduleData = workbookData?.moduleData || {};
  const modulesWithData = Object.keys(moduleData).filter((k) => Object.keys(moduleData[k] || {}).length > 0);

  if (modulesWithData.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-white/30">No exercise responses yet.</p>
        <p className="text-xs text-white/20 mt-1">Complete course exercises to see your results here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {modulesWithData.map((modId) => {
        const mod = courseModules.find((m) => String(m.id) === modId);
        if (!mod) return null;
        const steps = moduleProjects[mod.id] || [];
        const modStepData = moduleData[modId] || {};
        const completedSteps = Object.keys(modStepData).length;
        const totalExercises = steps.filter((s) => s.exercise).length;
        return (
          <button key={modId} onClick={() => onNavigate?.('course')} className="w-full flex items-center gap-3 px-3 py-2.5 bg-white/[0.03] rounded-xl hover:bg-white/[0.06] transition text-left">
            <span className="text-lg">{mod.icon}</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-white/80 block truncate">{mod.title}</span>
              <span className="text-xs text-white/30">{completedSteps} of {totalExercises} exercises</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />
          </button>
        );
      })}
    </div>
  );
}

export default function Training({ user, onNavigate }) {
  const { workbookData, loading } = useWorkbook(user);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <h1 className="text-2xl font-bold text-white">Training Hub</h1>
        </div>
        <p className="text-sm text-white/50">
          Your training foundation, book club, projects, and shared ideas.
        </p>
      </div>

      {/* Developing From Within — Kate's training recap */}
      <Section
        icon={Heart}
        title="Developing From Within"
        subtitle="Recap from the in-person training with Kate — your foundation"
        color="purple"
        gradient="from-purple-500/10 to-violet-500/10"
        border="border-purple-500/20"
        defaultOpen={true}
      >
        <div className="space-y-4">
          <p className="text-sm text-white/60 leading-relaxed">
            The in-person training with Kate Cerulli introduced the <span className="text-purple-300 font-medium">Developing From Within</span> framework — understanding yourself as the foundation for leading change. Key themes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <span className="text-lg block mb-1">🪞</span>
              <span className="text-xs font-semibold text-white/70 block mb-1">Self-Awareness</span>
              <p className="text-xs text-white/40">Understanding your values, strengths, and patterns as a leader</p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <span className="text-lg block mb-1">🤝</span>
              <span className="text-xs font-semibold text-white/70 block mb-1">Authentic Connection</span>
              <p className="text-xs text-white/40">Building trust through genuine presence and vulnerability</p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <span className="text-lg block mb-1">🌱</span>
              <span className="text-xs font-semibold text-white/70 block mb-1">Growth Mindset</span>
              <p className="text-xs text-white/40">Treating challenges as opportunities to learn and evolve</p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <span className="text-lg block mb-1">🧭</span>
              <span className="text-xs font-semibold text-white/70 block mb-1">Purpose & Direction</span>
              <p className="text-xs text-white/40">Connecting your inner compass to the work you do in the world</p>
            </div>
          </div>
          <p className="text-xs text-white/30 italic">This foundation feeds into everything that follows — your values work, energy audit, and life design exercises all build on what you discovered with Kate.</p>
        </div>
      </Section>

      {/* DYL Book Club */}
      <Section
        icon={BookMarked}
        title="Designing Your Life — Book Club"
        subtitle="Biweekly reading and discussion group"
        color="emerald"
        gradient="from-emerald-500/10 to-teal-500/10"
        border="border-emerald-500/20"
        defaultOpen={true}
      >
        <div className="space-y-4">
          <p className="text-sm text-white/60 leading-relaxed">
            Over the coming months, we'll read <span className="text-emerald-300 font-medium">Designing Your Life</span> by Bill Burnett & Dave Evans together. We meet every two weeks to discuss a chapter and do the exercises.
          </p>
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400/60 block">What You'll Work On</span>
            <div className="space-y-1.5">
              {[
                { icon: '🧭', title: 'Values & Life Compass', desc: 'Define what matters to you and check if your life reflects it' },
                { icon: '⚡', title: 'Energy Mapping', desc: 'Track what activities fuel you vs. drain you' },
                { icon: '🗺️', title: 'Life Path Planning', desc: 'Sketch three possible 5-year versions of your life' },
                { icon: '📊', title: 'Life Balance Check', desc: 'Rate yourself across health, work, play, and love' },
                { icon: '🧪', title: 'Small Experiments', desc: 'Test your ideas before making big commitments' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-3 py-2.5 bg-white/[0.02] rounded-lg">
                  <span className="text-base shrink-0">{item.icon}</span>
                  <div>
                    <span className="text-sm text-white/80 block">{item.title}</span>
                    <span className="text-xs text-white/35">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/30">Your book club work will appear in <button onClick={() => onNavigate?.('myplan')} className="text-emerald-400/70 hover:text-emerald-400 transition underline">My Plan</button> as you complete exercises.</p>
        </div>
      </Section>

      {/* Build a Project with AI */}
      <Section
        icon={Code}
        title="Build a Project with AI"
        subtitle="Create your personal website step by step"
        color="blue"
        gradient="from-blue-500/10 to-cyan-500/10"
        border="border-blue-500/20"
      >
        <ModuleProgress moduleId={1} workbookData={workbookData} onNavigate={onNavigate} />
      </Section>

      {/* Exercise Results */}
      <Section
        icon={BookOpen}
        title="My Exercise Results"
        subtitle="All your completed exercises across every module"
        color="purple"
        gradient="from-purple-500/10 to-violet-500/10"
        border="border-purple-500/20"
      >
        <WorkbookSummary workbookData={workbookData} onNavigate={onNavigate} />
      </Section>

      {/* Vibe Board */}
      <Section
        icon={Lightbulb}
        title="Vibe Board"
        subtitle="Ideas and links from our sessions"
        color="amber"
        gradient="from-amber-500/10 to-yellow-500/10"
        border="border-amber-500/20"
        defaultOpen={true}
      >
        <VibeBoard user={user} />
      </Section>
    </div>
  );
}
