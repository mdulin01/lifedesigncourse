import React, { useState, useEffect } from 'react';
import {
  Compass, Globe, Lightbulb, ChevronRight, ChevronDown, ChevronUp,
  BookOpen, CheckCircle2, Circle, Loader2, GraduationCap, Zap, Code,
} from 'lucide-react';
import { useWorkbook } from '../hooks/useWorkbook';
import { courseModules, moduleProjects } from '../constants';
import VibeBoard from './VibeBoard';

// Small inline card for a completed exercise field
function FieldPreview({ label, value }) {
  if (!value) return null;
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  if (!text.trim()) return null;
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
      <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">{label}</span>
      <p className="text-sm text-white/70 leading-relaxed line-clamp-3">{text}</p>
    </div>
  );
}

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

// Module progress summary with step list
function ModuleProgress({ moduleId, moduleInfo, workbookData, onNavigate }) {
  const steps = moduleProjects[moduleId] || [];
  const modData = workbookData?.moduleData?.[String(moduleId)] || {};
  const exerciseSteps = steps.filter((s) => s.exercise);
  const completedCount = exerciseSteps.filter((s) => modData[s.number]).length;
  const pct = exerciseSteps.length > 0 ? Math.round((completedCount / exerciseSteps.length) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-white/40 tabular-nums shrink-0">{completedCount}/{exerciseSteps.length}</span>
      </div>

      {/* Step list */}
      <div className="space-y-1.5">
        {steps.map((step) => {
          const done = step.exercise && modData[step.number];
          return (
            <div
              key={step.number}
              className="flex items-start gap-2.5 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition"
            >
              {done ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-4 h-4 text-white/15 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <span className="text-sm text-white/80 block">{step.title}</span>
                <span className="text-xs text-white/30 block truncate">{step.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onNavigate?.('course')}
        className="text-xs text-emerald-400/70 hover:text-emerald-400 flex items-center gap-1 transition mt-1"
      >
        Open in Course <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}

// Values display from workbook data (Module 2, step 02 or 03)
function ValuesDisplay({ workbookData }) {
  const mod2 = workbookData?.moduleData?.['2'] || {};

  // Try step 03 (Build the Compass) first, then 02 (Values Extraction)
  const valuesData = mod2['03'] || mod2['02'] || null;
  const mirrorData = mod2['00'] || null;
  const compassData = mod2['01'] || null;
  const coherenceData = mod2['04'] || null;

  const hasAnyData = valuesData || mirrorData || compassData || coherenceData;

  if (!hasAnyData) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-white/30">No values data yet.</p>
        <p className="text-xs text-white/20 mt-1">Complete Module 2 exercises to see your values here.</p>
      </div>
    );
  }

  // Extract values list if it exists
  const valuesField = valuesData?.values;
  const valuesList = Array.isArray(valuesField)
    ? valuesField
    : typeof valuesField === 'string'
      ? valuesField.split('\n').filter(Boolean)
      : null;

  return (
    <div className="space-y-4">
      {/* Values list */}
      {valuesList && valuesList.length > 0 && (
        <div>
          <span className="text-[10px] uppercase tracking-wider text-emerald-400/60 block mb-2">Your Core Values</span>
          <div className="flex flex-wrap gap-2">
            {valuesList.map((v, i) => {
              const label = typeof v === 'object' ? (v.value || v.label || v.name || JSON.stringify(v)) : v;
              return (
                <span key={i} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-300 font-medium">
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Workview & Lifeview */}
      {mirrorData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldPreview label="Workview" value={mirrorData.workview} />
          <FieldPreview label="Lifeview" value={mirrorData.lifeview} />
        </div>
      )}

      {/* Compass check */}
      {compassData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldPreview label="Where They Align" value={compassData.alignment} />
          <FieldPreview label="Where They Clash" value={compassData.tension} />
        </div>
      )}

      {/* Coherence scores */}
      {coherenceData?.scores && (
        <FieldPreview label="Value Coherence Scores" value={coherenceData.scores} />
      )}
    </div>
  );
}

// Time Study / Energy Audit display from Module 3 workbook data
function TimeStudyDisplay({ workbookData }) {
  const mod3 = workbookData?.moduleData?.['3'] || {};

  // Step 00 = activity log, 01 = energy ratings, 02 = AEIOU, 03 = patterns, 04 = action plan
  const activityLog = mod3['00'] || null;
  const energyRatings = mod3['01'] || null;
  const aeiouAnalysis = mod3['02'] || null;
  const patterns = mod3['03'] || null;
  const actionPlan = mod3['04'] || null;

  const hasAnyData = activityLog || energyRatings || aeiouAnalysis || patterns || actionPlan;

  if (!hasAnyData) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-white/30">No time study data yet.</p>
        <p className="text-xs text-white/20 mt-1">Complete Module 3 (Energy Audit) exercises to see your analysis here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Energy boosters & drains */}
      {energyRatings && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldPreview label="Energy Boosters (+)" value={energyRatings.energizers} />
          <FieldPreview label="Energy Drains (-)" value={energyRatings.drains} />
        </div>
      )}

      {/* Pattern synthesis */}
      {patterns && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldPreview label="What Energizes Me" value={patterns.energizers} />
          <FieldPreview label="What Drains Me" value={patterns.drains} />
        </div>
      )}

      {/* AEIOU breakdown */}
      {aeiouAnalysis && (
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-yellow-400/60 block">AEIOU Analysis</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldPreview label="High-Energy Breakdown" value={aeiouAnalysis.highEnergy} />
            <FieldPreview label="Low-Energy Breakdown" value={aeiouAnalysis.lowEnergy} />
          </div>
        </div>
      )}

      {/* Activity log */}
      {activityLog && (
        <FieldPreview label="Activity Log" value={activityLog.activities || activityLog.log} />
      )}

      {/* Action plan */}
      {actionPlan && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldPreview label="Energizer to Add" value={actionPlan.addActivity} />
          <FieldPreview label="Drain to Change" value={actionPlan.changeActivity} />
        </div>
      )}
    </div>
  );
}

// Workbook results summary — shows which modules have data
function WorkbookSummary({ workbookData, onNavigate }) {
  const moduleData = workbookData?.moduleData || {};
  const modulesWithData = Object.keys(moduleData).filter(
    (k) => Object.keys(moduleData[k] || {}).length > 0
  );

  if (modulesWithData.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-white/30">No workbook responses yet.</p>
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
          <button
            key={modId}
            onClick={() => onNavigate?.('workbook')}
            className="w-full flex items-center gap-3 px-3 py-2.5 bg-white/[0.03] rounded-xl hover:bg-white/[0.06] transition text-left"
          >
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
          Your values, time study, vibe coding projects, workbook results, and live ideas — all in one place.
        </p>
      </div>

      {/* 1. Values, Principles & Time Study */}
      <Section
        icon={Compass}
        title="Values, Principles & Time Study"
        subtitle="Your compass, energy audit, and how you spend your time"
        color="emerald"
        gradient="from-emerald-500/10 to-teal-500/10"
        border="border-emerald-500/20"
        defaultOpen={true}
      >
        {/* Values subsection */}
        <div>
          <h3 className="text-xs font-semibold text-emerald-400/80 uppercase tracking-wider mb-3">My Values & Life Compass</h3>
          <ValuesDisplay workbookData={workbookData} />
          <div className="mt-3">
            <ModuleProgress moduleId={2} moduleInfo={courseModules[1]} workbookData={workbookData} onNavigate={onNavigate} />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Time Study subsection */}
        <div>
          <h3 className="text-xs font-semibold text-yellow-400/80 uppercase tracking-wider mb-3">Time Study & Energy Audit</h3>
          <TimeStudyDisplay workbookData={workbookData} />
          <div className="mt-3">
            <ModuleProgress moduleId={3} moduleInfo={courseModules[2]} workbookData={workbookData} onNavigate={onNavigate} />
          </div>
        </div>
      </Section>

      {/* 2. Vibe Code a Project */}
      <Section
        icon={Code}
        title="Vibe Code a Project"
        subtitle="Build your personal website with AI — Module 1"
        color="blue"
        gradient="from-blue-500/10 to-cyan-500/10"
        border="border-blue-500/20"
      >
        <ModuleProgress moduleId={1} moduleInfo={courseModules[0]} workbookData={workbookData} onNavigate={onNavigate} />
      </Section>

      {/* 3. Workbook Results */}
      <Section
        icon={BookOpen}
        title="My Workbook Results"
        subtitle="All your completed exercises across every module"
        color="purple"
        gradient="from-purple-500/10 to-violet-500/10"
        border="border-purple-500/20"
      >
        <WorkbookSummary workbookData={workbookData} onNavigate={onNavigate} />
      </Section>

      {/* 4. Vibe Board */}
      <Section
        icon={Lightbulb}
        title="Vibe Board"
        subtitle="Live coding ideas from class"
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
