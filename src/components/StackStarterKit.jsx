import { useState } from 'react';
import { Zap, Copy, Check, ExternalLink, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { stackStarterKit } from '../constants';

const colorMap = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400' },
};

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/25 transition"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied!' : (label || 'Copy Prompt')}
    </button>
  );
}

function ToolCard({ tool }) {
  const [expanded, setExpanded] = useState(false);
  const colors = colorMap[tool.color] || colorMap.emerald;

  return (
    <div className={`bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition"
      >
        <span className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center text-lg shrink-0`}>
          {tool.icon}
        </span>
        <div className="flex-1 min-w-0">
          <span className={`text-sm font-bold ${colors.text}`}>{tool.name}</span>
          <p className="text-xs text-white/30 mt-0.5">{tool.what}</p>
        </div>
        {expanded
          ? <ChevronUp className="w-4 h-4 text-white/20 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-white/20 shrink-0" />
        }
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
          <div>
            <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Why This Tool?</span>
            <p className="text-sm text-white/50 mt-1 leading-relaxed">{tool.why}</p>
          </div>
          <div className={`${colors.bg} border ${colors.border} rounded-lg p-3`}>
            <div className="flex items-center gap-1.5 mb-1">
              <Lightbulb className="w-3 h-3 text-white/40" />
              <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Pro Tip</span>
            </div>
            <p className="text-sm text-white/50">{tool.tip}</p>
          </div>
          <a
            href={tool.learnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs ${colors.text} hover:underline`}
          >
            Learn more <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function StackStarterKit() {
  const [showTips, setShowTips] = useState(false);
  const kit = stackStarterKit;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center">
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Stack Starter Kit</h1>
        </div>
        <p className="text-sm text-white/40">
          This is the exact tech stack used to build this course site. One prompt sets up the whole thing.
        </p>
      </div>

      {/* Stack overview cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider">Your Stack — 4 Tools, Zero Server Code</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {kit.overview.map(tool => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>

      {/* Setup prompt */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Setup Prompt</h3>
            <p className="text-xs text-white/30 mt-0.5">Copy this into Claude to scaffold your project from scratch</p>
          </div>
          <CopyButton text={kit.setupPrompt} />
        </div>
        <pre className="text-sm text-emerald-300/80 whitespace-pre-wrap font-mono leading-relaxed bg-white/[0.02] rounded-xl p-4 border border-white/5">
          {kit.setupPrompt}
        </pre>
      </div>

      {/* Customization tips */}
      <div>
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-left hover:bg-white/[0.05] transition"
        >
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-semibold text-white">Customization Tips</span>
            <p className="text-xs text-white/30 mt-0.5">How to adapt the starter prompt for your specific project</p>
          </div>
          {showTips
            ? <ChevronUp className="w-4 h-4 text-white/20 shrink-0" />
            : <ChevronDown className="w-4 h-4 text-white/20 shrink-0" />
          }
        </button>
        {showTips && (
          <div className="mt-3 space-y-2">
            {kit.customizationTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-lg p-3">
                <span className="text-xs font-bold text-amber-400/60 mt-0.5">{i + 1}.</span>
                <p className="text-sm text-white/50 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Template repo link */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
          <span className="text-lg">📦</span>
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold text-white">GitHub Template (Optional)</span>
          <p className="text-xs text-white/30 mt-0.5">Fork this repo to skip the setup prompt entirely</p>
        </div>
        <a
          href={kit.templateRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition"
        >
          View Repo <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
