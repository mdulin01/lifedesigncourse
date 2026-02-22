import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, ExternalLink } from 'lucide-react';
import { moduleProjects } from '../constants';

export default function ModuleProjects({ module, onBack }) {
  const projects = moduleProjects[module.id] || [];
  const [expandedStep, setExpandedStep] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());

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

  const completedCount = completedSteps.size;
  const totalCount = projects.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-emerald-400/70 hover:text-emerald-400 transition mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Modules
        </button>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{module.icon}</span>
          <div>
            <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider">Module {module.id}</span>
            <h1 className="text-2xl font-bold text-white">{module.title}</h1>
          </div>
        </div>
        <p className="text-white/40 text-sm mt-2">{module.description}</p>
      </div>

      {/* Progress bar */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Module Progress</span>
          <span className="text-sm text-emerald-400 font-bold">{completedCount} / {totalCount}</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Project steps */}
      <div className="space-y-2">
        {projects.map((step) => {
          const isExpanded = expandedStep === step.number;
          const isComplete = completedSteps.has(step.number);
          const isDetailsOpen = showDetails[step.number];

          return (
            <div
              key={step.number}
              className={`rounded-2xl border transition-all ${
                isComplete
                  ? 'bg-emerald-500/[0.04] border-emerald-500/20'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
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

                {/* Title */}
                <span className={`flex-1 text-sm font-semibold ${
                  isComplete ? 'text-white/60' : 'text-white'
                }`}>
                  {step.title}
                </span>

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
    </div>
  );
}
