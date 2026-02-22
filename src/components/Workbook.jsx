import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, BookOpen, FileText } from 'lucide-react';
import { courseModules, moduleProjects } from '../constants';
import { useWorkbook } from '../hooks/useWorkbook';
import ValuesCompass from './ValuesCompass';

/**
 * Workbook — Main view showing all saved exercise responses.
 * Organized by module, each response rendered with its exercise type.
 * Copy-to-clipboard on every section for sharing with AI agents.
 */
export default function Workbook({ user }) {
  const { workbookData, loading, saveExercise } = useWorkbook(user);
  const [expandedModule, setExpandedModule] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Format a single exercise's data as text for clipboard
  const formatExerciseText = (stepData, step) => {
    if (!stepData) return '';
    const lines = [`## ${step.title}\n`];

    if (step.exercise?.type === 'values-ranking' && stepData.values) {
      stepData.values.forEach((v, i) => {
        lines.push(`${i + 1}. ${v.name}: ${v.definition}`);
      });
    } else if (step.exercise?.type === 'scored-assessment' && stepData.scores) {
      stepData.scores.forEach((s) => {
        lines.push(`- ${s.name}: ${s.score}/10${s.note ? ` — ${s.note}` : ''}`);
      });
    } else {
      // Text fields
      const exercise = step.exercise;
      if (exercise?.fields) {
        exercise.fields.forEach((field) => {
          if (stepData[field.id]) {
            lines.push(`### ${field.label}`);
            lines.push(stepData[field.id]);
            lines.push('');
          }
        });
      }
    }

    return lines.join('\n');
  };

  // Copy entire module
  const copyModule = (moduleId) => {
    const steps = moduleProjects[moduleId] || [];
    const moduleData = workbookData?.moduleData?.[String(moduleId)] || {};
    const mod = courseModules.find((m) => m.id === moduleId);
    const lines = [`# Module ${moduleId}: ${mod?.title || ''}\n`];

    steps.forEach((step) => {
      const stepData = moduleData[step.number];
      if (stepData) {
        lines.push(formatExerciseText(stepData, step));
      }
    });

    copyToClipboard(lines.join('\n'), `module-${moduleId}`);
  };

  // Copy everything
  const copyAll = () => {
    const lines = ['# My Life Design Workbook\n'];
    Object.keys(moduleProjects).forEach((moduleId) => {
      const mod = courseModules.find((m) => m.id === Number(moduleId));
      const steps = moduleProjects[moduleId];
      const moduleData = workbookData?.moduleData?.[String(moduleId)] || {};
      const hasData = steps.some((s) => moduleData[s.number]);
      if (!hasData) return;

      lines.push(`\n# Module ${moduleId}: ${mod?.title || ''}\n`);
      steps.forEach((step) => {
        const stepData = moduleData[step.number];
        if (stepData) {
          lines.push(formatExerciseText(stepData, step));
        }
      });
    });
    copyToClipboard(lines.join('\n'), 'all');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  const moduleData = workbookData?.moduleData || {};

  // Count completed exercises across all modules
  let totalExercises = 0;
  let completedExercises = 0;
  Object.keys(moduleProjects).forEach((modId) => {
    const steps = moduleProjects[modId];
    steps.forEach((step) => {
      if (step.exercise) {
        totalExercises++;
        if (moduleData[String(modId)]?.[step.number]) {
          completedExercises++;
        }
      }
    });
  });
  const overallPct = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Workbook</h1>
          <p className="text-white/40 text-sm mt-1">Your accumulated course work in one place</p>
        </div>
        <button
          onClick={copyAll}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition"
        >
          {copiedId === 'all' ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy All for AI</>}
        </button>
      </div>

      {/* Overall progress */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Workbook Progress</span>
          <span className="text-sm text-emerald-400 font-bold">{completedExercises} / {totalExercises}</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${overallPct}%` }} />
        </div>
      </div>

      {/* Module sections */}
      {Object.keys(moduleProjects).map((modId) => {
        const mod = courseModules.find((m) => m.id === Number(modId));
        const steps = moduleProjects[modId];
        const modData = moduleData[String(modId)] || {};
        const stepsWithExercises = steps.filter((s) => s.exercise);
        const completedInModule = stepsWithExercises.filter((s) => modData[s.number]).length;
        const isExpanded = expandedModule === modId;
        const hasAnyData = completedInModule > 0;

        return (
          <div key={modId} className={`rounded-2xl border transition-all ${hasAnyData ? 'bg-white/[0.02] border-white/10' : 'bg-white/[0.01] border-white/5 opacity-60'}`}>
            {/* Module header */}
            <button
              onClick={() => setExpandedModule(isExpanded ? null : modId)}
              className="w-full flex items-center gap-3 px-4 py-4 text-left"
            >
              <span className="text-2xl">{mod?.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white/30 uppercase">Module {modId}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/10 rounded text-emerald-400/60">
                    {completedInModule}/{stepsWithExercises.length}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white truncate">{mod?.title}</h3>
              </div>

              {hasAnyData && (
                <button
                  onClick={(e) => { e.stopPropagation(); copyModule(Number(modId)); }}
                  className="text-white/20 hover:text-white/60 transition p-1"
                  title="Copy module for AI"
                >
                  {copiedId === `module-${modId}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              )}

              {isExpanded ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
            </button>

            {/* Expanded: show each exercise response */}
            {isExpanded && (
              <div className="px-4 pb-4 space-y-3">
                {stepsWithExercises.map((step) => {
                  const stepData = modData[step.number];
                  const copyId = `${modId}-${step.number}`;

                  if (!stepData) {
                    return (
                      <div key={step.number} className="flex items-center gap-3 px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <FileText className="w-4 h-4 text-white/15" />
                        <span className="text-sm text-white/25">{step.title}</span>
                        <span className="text-[10px] text-white/15 ml-auto">Not started</span>
                      </div>
                    );
                  }

                  return (
                    <div key={step.number} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                        <button
                          onClick={() => copyToClipboard(formatExerciseText(stepData, step), copyId)}
                          className="text-white/20 hover:text-white/60 transition"
                          title="Copy for AI"
                        >
                          {copiedId === copyId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Render based on type */}
                      {step.exercise.type === 'values-ranking' && stepData.values ? (
                        <ValuesCompass
                          values={stepData.values}
                          onReorder={(newValues) => saveExercise(modId, step.number, { ...stepData, values: newValues })}
                          readOnly={false}
                        />
                      ) : step.exercise.type === 'scored-assessment' && stepData.scores ? (
                        <div className="space-y-2">
                          {stepData.scores.map((s, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <span className="text-xs text-white/60 w-24 truncate">{s.name}</span>
                              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${s.score >= 8 ? 'bg-emerald-500' : s.score >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  style={{ width: `${s.score * 10}%` }}
                                />
                              </div>
                              <span className={`text-xs font-bold ${s.score >= 8 ? 'text-emerald-400' : s.score >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {s.score}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Text-based exercises */
                        <div className="space-y-3">
                          {step.exercise.fields?.map((field) => {
                            const val = stepData[field.id];
                            if (!val) return null;
                            return (
                              <div key={field.id}>
                                <span className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-wider">{field.label}</span>
                                <p className="text-sm text-white/60 mt-1 whitespace-pre-wrap leading-relaxed">{val}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {stepData.completedAt && (
                        <span className="text-[10px] text-white/20">
                          Saved {new Date(stepData.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
