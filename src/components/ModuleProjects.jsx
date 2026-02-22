import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle, ExternalLink, PenLine, Trophy } from 'lucide-react';
import { courseModules, moduleProjects, moduleMilestones } from '../constants';
import { useWorkbook } from '../hooks/useWorkbook';
import { useProgress } from '../hooks/useProgress';
import WorkbookExercise from './WorkbookExercise';

export default function ModuleProjects({ module, onBack, onModuleChange, user }) {
  const projects = moduleProjects[module.id] || [];
  const [expandedStep, setExpandedStep] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const [activeExercise, setActiveExercise] = useState(null);

  const { saveExercise, getStepData, loading } = useWorkbook(user);
  const { getCompletedSteps, toggleStepComplete } = useProgress(user);

  // Get completed steps for THIS module from Firestore
  const completedSteps = getCompletedSteps(module.id);

  // Reset expanded/details state when module changes
  useEffect(() => {
    setExpandedStep(null);
    setShowDetails({});
    setActiveExercise(null);
  }, [module.id]);

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

  const handleToggleComplete = (number) => {
    const isCurrentlyComplete = completedSteps.has(String(number));

    if (!isCurrentlyComplete) {
      // Auto-expand next incomplete step
      const currentStepIdx = projects.findIndex(s => s.number === number);
      const nextIncomplete = projects.find((s, i) =>
        i > currentStepIdx && !completedSteps.has(String(s.number)) && s.number !== number
      );
      if (nextIncomplete) {
        setExpandedStep(nextIncomplete.number);
      } else {
        setExpandedStep(null);
      }
    }

    toggleStepComplete(module.id, number);
  };

  const handleSaveExercise = async (data) => {
    if (!activeExercise) return;
    await saveExercise(module.id, activeExercise.number, data);
  };

  const completedCount = completedSteps.size;
  const totalCount = projects.length;
  const allComplete = totalCount > 0 && completedCount === totalCount;
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
          const isComplete = completedSteps.has(String(step.number));
          const isDetailsOpen = showDetails[step.number];
          const hasExercise = !!step.exercise;
          const exerciseData = hasExercise ? getStepData(module.id, step.number) : null;
          const exerciseDone = !!exerciseData;

          return (
            <div
              key={step.number}
              className={`rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                isComplete
                  ? 'bg-emerald-500/[0.03] border-emerald-500/15'
                  : isExpanded
                    ? 'bg-emerald-500/[0.06] border-emerald-400/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/20'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              {/* Left accent bar */}
              {isComplete && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/40 rounded-l-2xl" />
              )}
              {isExpanded && !isComplete && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-l-2xl" />
              )}
              {/* Step header — compact for completed, full for others */}
              <button
                onClick={() => toggleStep(step.number)}
                className={`w-full flex items-center gap-3 text-left transition-all ${
                  isComplete ? 'px-3 py-2' : 'px-4 py-3.5'
                }`}
              >
                {/* Number badge / check icon for completed */}
                {isComplete ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="text-emerald-400" style={{ width: '14px', height: '14px' }} />
                  </div>
                ) : (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md shrink-0 ${
                    isExpanded
                      ? 'bg-emerald-500/25 text-emerald-300'
                      : 'bg-white/10 text-white/40'
                  }`}>
                    {step.number}
                  </span>
                )}

                {/* Title — strikethrough when complete, highlighted when active */}
                <span className={`flex-1 font-semibold uppercase tracking-wide transition-colors ${
                  isComplete
                    ? 'text-xs text-white/30 line-through decoration-emerald-500/30 decoration-1'
                    : isExpanded
                      ? 'text-sm text-emerald-200'
                      : 'text-sm text-white'
                }`}>
                  {step.title}
                </span>

                {/* Exercise indicator */}
                {hasExercise && exerciseDone && !isComplete && (
                  <span className="text-[9px] font-bold text-emerald-400/60 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                    DONE
                  </span>
                )}

                {/* Active indicator */}
                {isExpanded && !isComplete && (
                  <span className="text-[9px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wider">
                    Active
                  </span>
                )}

                {/* Chevron — hidden for completed unless hovered */}
                {isComplete ? (
                  <ChevronDown className="w-3 h-3 text-white/10 shrink-0 opacity-0 group-hover:opacity-100 transition" />
                ) : isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400/50 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />
                )}
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
                    onClick={() => handleToggleComplete(step.number)}
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
        <>
          {/* Keyframe for rotating glow border */}
          {allComplete && (
            <style>{`
              @keyframes milestone-glow {
                0%, 100% { box-shadow: 0 0 15px 2px rgba(234,179,8,0.3), 0 0 30px 4px rgba(234,179,8,0.1); }
                50% { box-shadow: 0 0 25px 6px rgba(234,179,8,0.5), 0 0 50px 10px rgba(234,179,8,0.15); }
              }
              @keyframes trophy-shine {
                0%, 100% { filter: drop-shadow(0 0 4px rgba(234,179,8,0.6)); }
                50% { filter: drop-shadow(0 0 12px rgba(234,179,8,0.9)) drop-shadow(0 0 20px rgba(250,204,21,0.4)); }
              }
            `}</style>
          )}
          <div
            className={`rounded-2xl px-6 py-6 transition-all duration-700 ${
              allComplete
                ? 'bg-gradient-to-r from-yellow-900/60 via-amber-900/50 to-yellow-900/60 border-2 border-yellow-500/50 ring-2 ring-yellow-400/20'
                : 'bg-gradient-to-r from-teal-900/70 to-emerald-900/50 border border-emerald-500/20'
            }`}
            style={allComplete ? { animation: 'milestone-glow 3s ease-in-out infinite' } : {}}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy
                className={`w-6 h-6 transition-all duration-700 ${
                  allComplete ? 'text-yellow-400' : 'w-5 h-5 text-emerald-400/70'
                }`}
                style={allComplete ? { animation: 'trophy-shine 2s ease-in-out infinite' } : {}}
              />
              <p className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-700 ${
                allComplete ? 'text-yellow-400' : 'text-emerald-400/70'
              }`}>
                {allComplete ? 'Module Complete!' : milestones.length === 1 ? 'Milestone' : 'Milestones'}
              </p>
            </div>
            <div className={milestones.length > 1 ? 'space-y-3' : ''}>
              {milestones.map((m, i) => (
                <div key={i} className="text-center">
                  <p className={`font-bold text-sm uppercase tracking-wider transition-colors duration-700 ${
                    allComplete ? 'text-yellow-200' : 'text-white'
                  }`}>{m.title}</p>
                  <p className={`text-xs mt-0.5 transition-colors duration-700 ${
                    allComplete ? 'text-yellow-300/60' : 'text-white/50'
                  }`}>{m.message}</p>
                </div>
              ))}
            </div>
          </div>
        </>
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
