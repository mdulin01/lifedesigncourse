import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code, MessageSquare, Wrench } from 'lucide-react';
import { useBTS } from '../contexts/BTSContext';

export default function BTSCard({ title, description, prompt, tools = [], screenshot }) {
  const { showBTS } = useBTS();
  const [expanded, setExpanded] = useState(false);

  if (!showBTS) return null;

  return (
    <div className="my-4 mx-auto max-w-2xl animate-in">
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
            <Code className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-0.5">Behind the Scenes</div>
            <div className="text-sm font-medium text-white truncate">{title}</div>
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="px-4 pb-4 space-y-3 border-t border-amber-500/20">
            {/* Description */}
            <p className="text-sm text-white/70 pt-3">{description}</p>

            {/* The actual prompt */}
            {prompt && (
              <div className="bg-slate-900/80 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400">Prompt Used</span>
                </div>
                <p className="text-xs text-white/60 font-mono leading-relaxed whitespace-pre-wrap">{prompt}</p>
              </div>
            )}

            {/* Tools used */}
            {tools.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Wrench className="w-3.5 h-3.5 text-white/40" />
                {tools.map(tool => (
                  <span key={tool} className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/60">{tool}</span>
                ))}
              </div>
            )}

            {/* Screenshot placeholder */}
            {screenshot && (
              <div className="rounded-xl overflow-hidden border border-white/10">
                <img src={screenshot} alt={title} className="w-full" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
