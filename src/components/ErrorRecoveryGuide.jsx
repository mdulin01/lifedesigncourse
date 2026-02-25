import { useState } from 'react';
import { AlertCircle, Copy, Check, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { errorRecoveryWalkthroughs } from '../constants';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : 'Copy Prompt'}
    </button>
  );
}

export default function ErrorRecoveryGuide({ onBack }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-6">
      {onBack && (
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white/60 text-sm transition">
          <ArrowLeft className="w-4 h-4" /> Back to Resources
        </button>
      )}

      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Error Recovery Guide</h2>
        </div>
        <p className="text-sm text-white/40">
          The 4 most common errors beginners hit — and the exact prompts to fix them with AI.
        </p>
      </div>

      <div className="space-y-3">
        {errorRecoveryWalkthroughs.map(error => (
          <div key={error.id} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === error.id ? null : error.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition"
            >
              <span className="text-2xl shrink-0">{error.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-white">{error.title}</span>
                <p className="text-xs text-white/30 mt-0.5">{error.description}</p>
              </div>
              {expandedId === error.id
                ? <ChevronUp className="w-4 h-4 text-white/20 shrink-0" />
                : <ChevronDown className="w-4 h-4 text-white/20 shrink-0" />
              }
            </button>
            {expandedId === error.id && (
              <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-4">
                {/* Error example */}
                <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                  <span className="text-[10px] font-semibold text-red-400/60 uppercase tracking-wider">What You'll See</span>
                  <pre className="text-xs text-red-300/70 font-mono mt-2 whitespace-pre-wrap leading-relaxed">
                    {error.errorExample}
                  </pre>
                </div>

                {/* Root causes */}
                <div>
                  <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Common Causes</span>
                  <div className="mt-2 space-y-1.5">
                    {error.rootCauses.map((cause, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-white/20 text-xs mt-0.5">•</span>
                        <span className="text-sm text-white/50">{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fix prompt */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Prompt to Fix It — Copy & Paste to Claude</span>
                    <CopyButton text={error.fixPrompt} />
                  </div>
                  <pre className="text-sm text-emerald-300/80 font-mono whitespace-pre-wrap leading-relaxed">
                    {error.fixPrompt}
                  </pre>
                </div>

                {/* Explanation */}
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
                  <span className="text-[10px] font-semibold text-emerald-400/60 uppercase tracking-wider">Why This Works</span>
                  <p className="text-sm text-white/50 mt-1 leading-relaxed">{error.explanation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
