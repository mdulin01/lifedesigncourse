import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle, ExternalLink, PenLine, Trophy } from 'lucide-react';
import { courseModules, moduleProjects, moduleMilestones } from '../constants';
import { useWorkbook } from '../hooks/useWorkbook';
import WorkbookExercise from './WorkbookExercise';

export default function ModuleProjects({ module, onBack, onModuleChange, user }) {
  const projects = moduleProjects[module.id] || [];
  const [expandedStep, setExpandedStep] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [activeExercise, setActiveExercise] = useState(null); // step object

  const { saveExercise, getStepData, loading } = useWorkbook(user);

  // Find prev/next modules (only ones that have projects)
  const availableModules = courseModules.filter(m => !!moduleProjects[m.id]);
  const currentIdx = availableModules.findIndex(m => m.id === module.id);
  const prevModule = currentIdx > 0 ? availableModules[currentIdx - 1] : null;
  const nextModule = currentIdx < availableModules.length - 1 ? availableModules[currentIdx + 1] : null;

  // Combine all milestones for this module into one card
  const milestones = moduleMilestones[module.id] || [];

  const toggleStep = (number) => {
    setExpandedStep(expandedStep === number ? null : number);
  };

  const toggleDetails = (number) => {
    setShowDetails(prev => ({ ...prev, [number]: !prev[number] }));
  };

  const toggleComplete = (number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(number)) {
        next.delete(number);
      } else {
        next.add(number);
      }
      return next;
    });
  };

  const handleSaveExercise = async (data) => {
    if (!activeExercise) return;
    await saveExercise(module.id, activeExercise.number, data);
  };

  const completedCount = completedSteps.size;
  const totalCount = projects.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Module navigation bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => prevModule ? onModuleChange(prevModule) : onBack()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          {prevModule ? (
            <span className="hidden sm:inline">Module {prevModule.id}</span>
          ) : (
            <span className="hidden sm:inline">All Modules</span>
          )}
        </button>

        <span className="text-[10px] text-white/25 uppercase tracking-wider">
          Module {module.id} of {courseModules.length}
        </span>

        {nextModule ? (
          <button
            onClick={() => onModuleChange(nextModule)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400/70 hover:text-emerald-300 hover:bg-emerald-500/10 transition"
          >
            <span className="hidden sm:inline">Module {nextModule.id}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-20" />
        )}
      </div>

      {/* Module description */}
      <div>
        <p className="text-white/40 text-sm">{module.description}</p>
      </div>

      {/* Project steps */}
      <div className="space-y-2">
        {projects.map((step) => {
          const isExpanded = expandedStep === step.number;
          const isComplete = completedSteps.has(step.number);
          const isDetailsOpen = showDetails[step.number];
          const hasExercise = !!step.exercise;
          const exerciseData = hasExercise ? getStepData(module.id, step.number) : null;
          const exerciseDone = !!exerciseData;

          return (
            <div
              key={step.number}
              className={`rounded-2xl border transition-all relative overflow-hidden ${
                isComplete
                  ? 'bg-emerald-500/[0.04] border-emerald-500/20'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              {/* Dark left bar for completed steps */}
              {isComplete && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600/50 rounded-l-2xl" />
              )}
              {/* Step header */}
              <button
                onClick={() => toggleStep(step.number)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              >
                {/* Number badge */}
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md shrink-0 ${
                  isComplete
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-white/10 text-white/40'
                }`}>
                  {step.number}
                </span>

                {/* Title — strikethrough when complete */}
                <span className={`flex-1 text-sm font-semibold uppercase tracking-wide ${
                  isComplete ? 'text-white/40 line-through decoration-white/30' : 'text-white'
                }`}>
                  {step.title}
                </span>

                {/* Exercise indicator */}
                {hasExercise && exerciseDone && (
                  <span className="text-[9px] font-bold text-emerald-400/60 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                    DONE
                  </span>
                )}

                {/* Complete check */}
                {isComplete && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}

                {/* Chevron */}
                {isExpanded
                  ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />
                }
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Description */}
                  <p className="text-sm text-white/60">{step.description}</p>

                  {/* Artifact box */}
                  <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">The Artifact</span>
                    <p className="text-sm text-white/70 mt-1">{step.artifact}</p>
                  </div>

                  {/* Start Exercise button */}
                  {hasExercise && (
                    <button
                      onClick={() => setActiveExercise(step)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                        exerciseDone
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-emerald-500 text-white hover:bg-emerald-600'
                      }`}
                    >
                      <PenLine className="w-4 h-4" />
                      {exerciseDone ? 'Edit Exercise' : 'Start Exercise'}
                    </button>
                  )}

                  {/* More Info toggle */}
                  <button
                    onClick={() => toggleDetails(step.number)}
                    className="text-xs font-medium text-emerald-400/70 hover:text-emerald-400 transition"
                  >
                    {isDetailsOpen ? '- Less Info' : '> More Info'}
                  </button>

                  {/* Expanded details */}
                  {isDetailsOpen && (
                    <div className="space-y-4">
                      {/* Details paragraph */}
                      <p className="text-sm text-white/50 leading-relaxed">{step.details}</p>

                      {/* Tips */}
                      {step.tips && step.tips.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider">Tips</span>
                          <div className="mt-2 space-y-2">
                            {step.tips.map((tip, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-sm">
                                <span className="text-[10px] font-bold text-emerald-400/50 mt-0.5 shrink-0">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="text-white/50">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resources */}
                      {step.resources && step.resources.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider">Resources</span>
                          <div className="mt-2 space-y-1.5">
                            {step.resources.map((res, i) => (
                              <a
                                key={i}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm text-emerald-400/70 hover:text-emerald-400 transition"
                              >
                                <ExternalLink className="w-3 h-3 shrink-0" />
                                {res.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mark Complete button */}
                  <button
                    onClick={() => toggleComplete(step.number)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
                      isComplete
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
                    }`}
                  >
                    {isComplete ? (
                      <><CheckCircle className="w-3.5 h-3.5" /> Completed</>
                    ) : (
                      'Mark Complete'
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Combined milestone card at bottom */}
      {milestones.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-teal-900/70 to-emerald-900/50 border border-emerald-500/20 px-6 py-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-emerald-400/70" />
            <p className="text-emerald-400/70 text-[11px] font-bold uppercase tracking-[0.2em]">
              {milestones.length === 1 ? 'Milestone' : 'Milestones'}
            </p>
          </div>
          <div className={milestones.length > 1 ? 'space-y-3' : ''}>
            {milestones.map((m, i) => (
              <div key={i} className={milestones.length > 1 ? 'text-center' : 'text-center'}>
                <p className="text-white font-bold text-sm uppercase tracking-wider">{m.title}</p>
                <p className="text-white/50 text-xs mt-0.5">{m.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom module navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => prevModule ? onModuleChange(prevModule) : onBack()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          {prevModule ? `Module ${prevModule.id}` : 'All Modules'}
        </button>

        {nextModule && (
          <button
            onClick={() => onModuleChange(nextModule)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-emerald-400/70 hover:text-emerald-300 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/15 hover:border-emerald-500/25 transition"
          >
            Module {nextModule.id}: {nextModule.title}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Exercise Modal */}
      {activeExercise && (
        <WorkbookExercise
          exercise={activeExercise.exercise}
          stepTitle={activeExercise.title}
          existing={getStepData(module.id, activeExercise.number)}
          onSave={handleSaveExercise}
          onClose={() => setActiveExercise(null)}
        />
      )}
    </div>
  );
}
