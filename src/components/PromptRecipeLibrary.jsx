import { useState } from 'react';
import { Sparkles, Copy, Check, ChevronDown, ChevronUp, ChevronRight, ArrowLeft, BookOpen, GitFork, Search, Filter } from 'lucide-react';
import { promptRecipes, promptPatterns, forkRemixExamples } from '../constants';

const categories = [
  { id: 'all', label: 'All Recipes' },
  { id: 'scaffold', label: 'Scaffold' },
  { id: 'firebase', label: 'Firebase' },
  { id: 'recharts', label: 'Charts' },
  { id: 'deploy', label: 'Deploy' },
  { id: 'components', label: 'Components' },
  { id: 'styling', label: 'Styling' },
];

const difficultyColors = {
  beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  advanced: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

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

function RecipeDetail({ recipe, onBack }) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white/60 text-sm transition">
        <ArrowLeft className="w-4 h-4" /> Back to Recipes
      </button>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-white">{recipe.title}</h2>
          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>
        <p className="text-white/40 text-sm">{recipe.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {recipe.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/30">
            {tag}
          </span>
        ))}
        {recipe.relatedModules.map(m => (
          <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
            Module {m}
          </span>
        ))}
      </div>

      {/* The prompt */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Prompt — Copy & Paste to Claude</span>
          <CopyButton text={recipe.promptText} />
        </div>
        <pre className="text-sm text-emerald-300/90 whitespace-pre-wrap font-mono leading-relaxed">
          {recipe.promptText}
        </pre>
      </div>

      {/* Expected output */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-2">
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">What You'll Get</span>
        <p className="text-sm text-white/60 leading-relaxed">{recipe.expectedOutput}</p>
      </div>
    </div>
  );
}

function PromptPatternsSection() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-bold text-white">Prompt Patterns — 5 Techniques That Work</h3>
      </div>
      <p className="text-sm text-white/40 mb-4">
        These patterns work across any AI tool. Master them and you can build almost anything by describing it.
      </p>
      {promptPatterns
        .sort((a, b) => a.order - b.order)
        .map(pattern => (
          <div key={pattern.id} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === pattern.id ? null : pattern.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition"
            >
              <span className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                {pattern.order}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-white">{pattern.title}</span>
                <p className="text-xs text-white/30 mt-0.5 truncate">{pattern.description}</p>
              </div>
              {expandedId === pattern.id
                ? <ChevronUp className="w-4 h-4 text-white/20 shrink-0" />
                : <ChevronDown className="w-4 h-4 text-white/20 shrink-0" />
              }
            </button>
            {expandedId === pattern.id && (
              <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                <p className="text-sm text-white/50 leading-relaxed">{pattern.explanation}</p>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Example Prompt</span>
                    <CopyButton text={pattern.examplePrompt} />
                  </div>
                  <p className="text-sm text-emerald-300/80 font-mono leading-relaxed">{pattern.examplePrompt}</p>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
                  <span className="text-[10px] font-semibold text-emerald-400/60 uppercase tracking-wider">Why It Works</span>
                  <p className="text-sm text-white/50 mt-1">{pattern.whyItWorks}</p>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

function ForkRemixSection() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <GitFork className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-bold text-white">Fork & Remix — Same Feature, Different Prompts</h3>
      </div>
      <p className="text-sm text-white/40 mb-4">
        There's no single "right" prompt. See how different descriptions produce different results from the same starting point.
      </p>
      {forkRemixExamples.map(example => (
        <div key={example.id} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === example.id ? null : example.id)}
            className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition"
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-white">{example.component}</span>
              <p className="text-xs text-white/30 mt-0.5">{example.description}</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              {example.variations.length} variations
            </span>
            {expandedId === example.id
              ? <ChevronUp className="w-4 h-4 text-white/20 shrink-0" />
              : <ChevronDown className="w-4 h-4 text-white/20 shrink-0" />
            }
          </button>
          {expandedId === example.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
              {example.variations.map((v, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white/60">Variation {i + 1}:</span>
                    <span className="text-sm font-semibold text-white">{v.name}</span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Prompt Used</span>
                      <CopyButton text={v.promptUsed} />
                    </div>
                    <p className="text-xs text-emerald-300/70 font-mono leading-relaxed">{v.promptUsed}</p>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{v.description}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-white/30 font-semibold">Key differences:</span>
                    <span className="text-[10px] text-white/50">{v.keyDifferences}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PromptRecipeLibrary() {
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPatterns, setShowPatterns] = useState(false);
  const [showRemix, setShowRemix] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = promptRecipes.filter(r => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (activeRecipe) {
    const recipe = promptRecipes.find(r => r.id === activeRecipe);
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <RecipeDetail recipe={recipe} onBack={() => setActiveRecipe(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Prompt Recipe Library</h1>
        </div>
        <p className="text-sm text-white/40">
          Copy-paste prompts for common tasks. Each recipe shows exactly what to tell Claude and what you'll get back.
        </p>
      </div>

      {/* Prompt Patterns toggle */}
      <button
        onClick={() => setShowPatterns(!showPatterns)}
        className="w-full flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4 text-left hover:bg-emerald-500/10 transition"
      >
        <BookOpen className="w-5 h-5 text-emerald-400 shrink-0" />
        <div className="flex-1">
          <span className="text-sm font-semibold text-emerald-400">Prompt Patterns — Learn the Techniques</span>
          <p className="text-xs text-white/30 mt-0.5">5 repeatable patterns that make your prompts better</p>
        </div>
        {showPatterns
          ? <ChevronUp className="w-4 h-4 text-emerald-400/50 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-emerald-400/50 shrink-0" />
        }
      </button>
      {showPatterns && (
        <div className="border border-emerald-500/10 rounded-xl p-5 bg-white/[0.01]">
          <PromptPatternsSection />
        </div>
      )}

      {/* Search & Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/30"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-white/[0.03] border-white/10 text-white/40 hover:text-white/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider">
          {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''}
        </h3>
        {filteredRecipes.map(recipe => (
          <button
            key={recipe.id}
            onClick={() => setActiveRecipe(recipe.id)}
            className="w-full flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.06] transition text-left"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-white">{recipe.title}</span>
                <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full border ${difficultyColors[recipe.difficulty]}`}>
                  {recipe.difficulty}
                </span>
              </div>
              <p className="text-xs text-white/30 truncate">{recipe.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {recipe.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/25">{tag}</span>
                ))}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />
          </button>
        ))}
      </div>

      {/* Fork & Remix toggle */}
      <button
        onClick={() => setShowRemix(!showRemix)}
        className="w-full flex items-center gap-3 bg-purple-500/5 border border-purple-500/15 rounded-xl p-4 text-left hover:bg-purple-500/10 transition"
      >
        <GitFork className="w-5 h-5 text-purple-400 shrink-0" />
        <div className="flex-1">
          <span className="text-sm font-semibold text-purple-400">Fork & Remix — See How Prompts Shape Results</span>
          <p className="text-xs text-white/30 mt-0.5">Same feature, different prompts, different outcomes</p>
        </div>
        {showRemix
          ? <ChevronUp className="w-4 h-4 text-purple-400/50 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-purple-400/50 shrink-0" />
        }
      </button>
      {showRemix && (
        <div className="border border-purple-500/10 rounded-xl p-5 bg-white/[0.01]">
          <ForkRemixSection />
        </div>
      )}
    </div>
  );
}
