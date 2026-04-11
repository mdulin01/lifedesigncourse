import React, { useState } from 'react';
import { Compass, Target, MapPin, ChevronDown, ChevronUp, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { useWorkbook } from '../hooks/useWorkbook';
import { courseModules, moduleProjects } from '../constants';

function FieldPreview({ label, value }) {
  if (!value) return null;
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  if (!text.trim()) return null;
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
      <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">{label}</span>
      <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function CollapsibleSection({ icon: Icon, title, subtitle, color, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const colorMap = {
    emerald: { gradient: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    purple: { gradient: 'from-purple-500/10 to-violet-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
    yellow: { gradient: 'from-yellow-500/10 to-amber-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
    blue: { gradient: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
  };
  const c = colorMap[color] || colorMap.emerald;

  return (
    <div className={`border ${c.border} rounded-2xl overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${c.gradient} text-left transition hover:brightness-110`}
      >
        <Icon className={`w-5 h-5 ${c.text} shrink-0`} />
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

export default function MyPlan({ user, onNavigate }) {
  const { workbookData, loading } = useWorkbook(user);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  const mod2 = workbookData?.moduleData?.['2'] || {};
  const mod3 = workbookData?.moduleData?.['3'] || {};
  const mod4 = workbookData?.moduleData?.['4'] || {};

  // Values data
  const valuesData = mod2['03'] || mod2['02'] || null;
  const mirrorData = mod2['00'] || null;
  const compassData = mod2['01'] || null;
  const coherenceData = mod2['04'] || null;

  const valuesField = valuesData?.values;
  const valuesList = Array.isArray(valuesField)
    ? valuesField
    : typeof valuesField === 'string'
      ? valuesField.split('\n').filter(Boolean)
      : null;

  // Energy data
  const energyRatings = mod3['01'] || null;
  const patterns = mod3['03'] || null;
  const actionPlan = mod3['04'] || null;

  // Odyssey plans
  const plan1 = mod4['00'] || null;
  const plan2 = mod4['01'] || null;
  const plan3 = mod4['02'] || null;
  const comparison = mod4['03'] || null;

  const hasValues = valuesList || mirrorData || compassData || coherenceData;
  const hasEnergy = energyRatings || patterns || actionPlan;
  const hasPlans = plan1 || plan2 || plan3;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <Target className="w-5 h-5 text-emerald-400" />
          <h1 className="text-2xl font-bold text-white">My Plan</h1>
        </div>
        <p className="text-sm text-white/50">
          Your values, what gives you energy, and the life paths you're exploring — your personal compass.
        </p>
      </div>

      {/* Empty state if nothing yet */}
      {!hasValues && !hasEnergy && !hasPlans && (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/15 rounded-2xl flex items-center justify-center mx-auto">
            <Target className="w-7 h-7 text-emerald-400/40" />
          </div>
          <div>
            <p className="text-white/40 text-sm">Your plan is waiting to be built</p>
            <p className="text-white/25 text-xs mt-1">Complete Course exercises to see your values, energy map, and life paths here.</p>
          </div>
          <button
            onClick={() => onNavigate?.('course')}
            className="text-sm text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 mx-auto"
          >
            Go to Course <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 1. My Values & Principles */}
      <CollapsibleSection
        icon={Compass}
        title="My Values & Principles"
        subtitle="What matters most to you and how it shows up in your life"
        color="emerald"
        defaultOpen={true}
      >
        {hasValues ? (
          <div className="space-y-4">
            {/* Values badges */}
            {valuesList && valuesList.length > 0 && (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400/60 block mb-2">Core Values</span>
                <div className="flex flex-wrap gap-2">
                  {valuesList.map((v, i) => {
                    const label = typeof v === 'object' ? (v.value || v.label || v.name || JSON.stringify(v)) : v;
                    const rankColors = ['bg-amber-500/20 border-amber-500/30 text-amber-300', 'bg-slate-300/10 border-slate-300/20 text-slate-300', 'bg-orange-700/15 border-orange-700/25 text-orange-300'];
                    const colorClass = i < 3 ? rankColors[i] : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300';
                    return (
                      <span key={i} className={`px-3 py-1.5 ${colorClass} border rounded-full text-xs font-medium`}>
                        {i + 1}. {label}
                      </span>
                    );
                  })}
                </div>
                {/* Value definitions if available */}
                {valuesList.some(v => typeof v === 'object' && v.definition) && (
                  <div className="mt-3 space-y-1.5">
                    {valuesList.filter(v => typeof v === 'object' && v.definition).map((v, i) => (
                      <div key={i} className="text-xs text-white/40">
                        <span className="text-white/60 font-medium">{v.name || v.label}:</span> {v.definition}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Workview & Lifeview */}
            {mirrorData && (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400/60 block mb-2">My Perspectives</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FieldPreview label="Why I Work (Workview)" value={mirrorData.workview} />
                  <FieldPreview label="What Life Means (Lifeview)" value={mirrorData.lifeview} />
                </div>
              </div>
            )}

            {/* Alignment */}
            {compassData && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldPreview label="Where They Align" value={compassData.alignment} />
                <FieldPreview label="Where They Clash" value={compassData.tension} />
              </div>
            )}

            {/* Coherence scores */}
            {coherenceData?.scores && Array.isArray(coherenceData.scores) && (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400/60 block mb-2">How Well My Life Reflects My Values</span>
                <div className="space-y-2">
                  {coherenceData.scores.map((s, i) => {
                    const score = s.score || 0;
                    const color = score >= 8 ? 'bg-emerald-500' : score >= 5 ? 'bg-yellow-500' : 'bg-red-500';
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-white/60 w-24 truncate">{s.name}</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${score * 10}%` }} />
                        </div>
                        <span className="text-xs text-white/40 w-8 text-right">{score}/10</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-white/30">No values entered yet.</p>
            <p className="text-xs text-white/20 mt-1">Complete the Values & Life Compass exercises in the Course to build this section.</p>
            <button onClick={() => onNavigate?.('course')} className="text-xs text-emerald-400/70 hover:text-emerald-400 flex items-center gap-1 transition mt-3 mx-auto">
              Go to Course <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </CollapsibleSection>

      {/* 2. What Gives Me Energy */}
      <CollapsibleSection
        icon={MapPin}
        title="What Gives Me Energy"
        subtitle="Activities that fuel you vs. drain you, and your action plan"
        color="yellow"
        defaultOpen={true}
      >
        {hasEnergy ? (
          <div className="space-y-4">
            {energyRatings && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldPreview label="Energy Boosters" value={energyRatings.energizers} />
                <FieldPreview label="Energy Drains" value={energyRatings.drains} />
              </div>
            )}
            {patterns && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldPreview label="What Energizes Me" value={patterns.energizers} />
                <FieldPreview label="What Drains Me" value={patterns.drains} />
              </div>
            )}
            {actionPlan && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldPreview label="Energy Booster to Add" value={actionPlan.addActivity} />
                <FieldPreview label="Drain to Change" value={actionPlan.changeActivity} />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-white/30">No energy audit data yet.</p>
            <p className="text-xs text-white/20 mt-1">Complete the Energy Audit exercises in the Course to build this section.</p>
            <button onClick={() => onNavigate?.('course')} className="text-xs text-emerald-400/70 hover:text-emerald-400 flex items-center gap-1 transition mt-3 mx-auto">
              Go to Course <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </CollapsibleSection>

      {/* 3. Life Paths (Odyssey Plans) */}
      <CollapsibleSection
        icon={MapPin}
        title="Life Paths I'm Exploring"
        subtitle="Three possible 5-year visions for your life"
        color="purple"
        defaultOpen={hasPlans}
      >
        {hasPlans ? (
          <div className="space-y-4">
            {[
              { data: plan1, label: 'Path 1: Current Direction', desc: 'Where your current path leads' },
              { data: plan2, label: 'Path 2: Alternative', desc: 'What if your current path wasn\'t an option?' },
              { data: plan3, label: 'Path 3: Wild Card', desc: 'What if money and reputation didn\'t matter?' },
            ].map(({ data, label, desc }, idx) => {
              if (!data) return null;
              // Flatten all fields into preview
              const fields = Object.entries(data).filter(([k, v]) => k !== 'completedAt' && v && typeof v === 'string');
              return (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2">
                  <div>
                    <span className="text-xs font-semibold text-purple-400/80">{label}</span>
                    <span className="text-[10px] text-white/25 block">{desc}</span>
                  </div>
                  {fields.map(([key, val]) => (
                    <FieldPreview key={key} label={key.replace(/([A-Z])/g, ' $1').trim()} value={val} />
                  ))}
                </div>
              );
            })}

            {comparison && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-purple-400/60 block">Your Comparison</span>
                {Object.entries(comparison).filter(([k, v]) => k !== 'completedAt' && v).map(([key, val]) => (
                  <FieldPreview key={key} label={key.replace(/([A-Z])/g, ' $1').trim()} value={typeof val === 'string' ? val : JSON.stringify(val)} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-white/30">No life paths mapped yet.</p>
            <p className="text-xs text-white/20 mt-1">You'll explore this in the DYL Book Club — creating three possible 5-year plans for your life.</p>
          </div>
        )}
      </CollapsibleSection>
    </div>
  );
}
