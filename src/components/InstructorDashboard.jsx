import React, { useState } from 'react';
import {
  ChevronDown, ChevronRight, CheckCircle, Circle, Play, Users, Calendar,
  Rocket, BookOpen, Sparkles, Monitor, Clock, ArrowLeft, ExternalLink,
  Copy, Check, Terminal, Globe, Shield, Lightbulb, BarChart3, Mic,
} from 'lucide-react';

// ─── Instructor emails ───
const INSTRUCTOR_EMAILS = ['mdulin@gmail.com', 'jdulin07@gmail.com', 'catherine_cerulli@urmc.rochester.edu'];

// ─── Cohort data ───
const cohort = [
  { name: 'Amy Gilbert', title: 'JD, MPH', role: 'Health policy/law', fellowship: '2023-24', note: 'Office of the VP, maternal health policy' },
  { name: 'Ellen-Marie Whelan', title: 'NP, PhD', role: 'Nursing/population health', fellowship: '2003', note: 'Chief Population Health Officer, CMS' },
  { name: 'Carrie Colla', title: 'PhD', role: 'Health economics', fellowship: '2017-18', note: 'Dartmouth professor, former CBO director' },
  { name: 'Lucy Marcil', title: 'MD, MPH', role: 'Pediatrics', fellowship: '2023-24', note: 'Founded StreetCred, TED Fellow' },
  { name: 'Tonya Moore', title: 'PhD, RN', role: 'Nursing/workforce', fellowship: '2024-25', note: 'Current fellow, first MS nurse selected' },
  { name: 'Wendi Gosliner', title: 'DrPH, RD', role: 'Nutrition policy', fellowship: '2013-14', note: 'UC Berkeley, advised Rep. Pelosi' },
  { name: 'Mary Mazanec', title: 'CNP', role: 'Pediatric NP', fellowship: '1998-99', note: 'South Shore Health' },
  { name: 'Carole Pratt', title: 'DDS', role: 'Dentistry/rural health', fellowship: '2011-12', note: 'VA Governor\'s senior health advisor' },
  { name: 'Stephen Morales', title: 'MBA', role: 'Health management', fellowship: '2025-26', note: 'MIT eng → Duke MBA → Malmora Global' },
];

// ─── Copy button ───
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="ml-2 text-white/20 hover:text-white/50 transition inline-flex items-center">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

// ─── Collapsible section ───
function Section({ title, icon: Icon, color = 'emerald', defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const colorMap = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  };
  return (
    <div className={`border rounded-xl overflow-hidden ${open ? colorMap[color]?.split(' ').slice(1).join(' ') || 'border-white/10' : 'border-white/5'}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-5 py-4 text-left transition ${open ? 'bg-white/[0.02]' : 'hover:bg-white/[0.02]'}`}
      >
        <Icon className={`w-5 h-5 shrink-0 ${colorMap[color]?.split(' ')[0] || 'text-white/50'}`} />
        <span className="flex-1 font-semibold text-white text-sm">{title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-white/30" /> : <ChevronRight className="w-4 h-4 text-white/30" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

// ─── Step tracker ───
function StepTracker({ steps }) {
  const [completed, setCompleted] = useState({});
  const toggle = (i) => setCompleted(prev => ({ ...prev, [i]: !prev[i] }));
  return (
    <div className="space-y-2">
      {steps.map((step, i) => (
        <button
          key={i}
          onClick={() => toggle(i)}
          className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg text-left transition ${
            completed[i] ? 'bg-emerald-500/5 border border-emerald-500/15' : 'bg-white/[0.02] border border-white/5 hover:border-white/10'
          }`}
        >
          {completed[i]
            ? <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            : <Circle className="w-5 h-5 text-white/15 shrink-0 mt-0.5" />
          }
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${completed[i] ? 'text-emerald-400/80' : 'text-white/80'}`}>{step.title}</p>
            {step.detail && <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{step.detail}</p>}
            {step.script && (
              <div className="mt-2 bg-black/30 rounded-lg px-3 py-2 font-mono text-xs text-white/50 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 shrink-0" />
                <span className="flex-1 truncate">{step.script}</span>
                <CopyBtn text={step.script} />
              </div>
            )}
          </div>
          {step.time && <span className="text-[10px] text-white/20 shrink-0">{step.time}</span>}
        </button>
      ))}
    </div>
  );
}

// ─── Code block ───
function CodeBlock({ code, label }) {
  return (
    <div className="rounded-lg overflow-hidden border border-white/5">
      {label && (
        <div className="bg-white/[0.03] px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-white/30 uppercase tracking-wider">{label}</span>
          <CopyBtn text={code} />
        </div>
      )}
      <pre className="bg-black/20 px-4 py-3 text-xs text-white/60 overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">{code}</pre>
    </div>
  );
}

// ─── Main component ───
export default function InstructorDashboard({ user }) {
  if (!user || !INSTRUCTOR_EMAILS.includes(user.email?.toLowerCase())) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center">
          <Shield className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <h1 className="text-white/40 text-lg">Instructor Access Only</h1>
          <a href="/portal" className="text-emerald-400/60 hover:text-emerald-400 text-sm mt-4 inline-block">← Back to portal</a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* ────────── COHORT OVERVIEW ────────── */}
      <Section title="Cohort Overview — 9 RWJF Health Policy Fellows" icon={Users} color="purple" defaultOpen={false}>
        <p className="text-white/40 text-sm mb-4">
          All participants are Robert Wood Johnson Foundation Health Policy Fellows spanning 1998-2026.
          Senior health leaders across clinical, research, policy, and executive tracks.
        </p>
        <div className="space-y-2">
          {cohort.map((p, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/15 flex items-center justify-center text-xs font-bold text-purple-400 shrink-0 mt-0.5">
                {p.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 font-medium">{p.name}, <span className="text-white/40">{p.title}</span></p>
                <p className="text-xs text-white/30">{p.role} · Fellow {p.fellowship}</p>
                <p className="text-xs text-white/20 mt-0.5">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ────────── TRAINING AGENDA ────────── */}
      <Section title="Training Agenda — April 9 Session" icon={Calendar} color="amber" defaultOpen={true}>
        <p className="text-white/40 text-sm mb-4">
          Step through each block of the training. Check items off as you go.
        </p>
        <StepTracker steps={[
          {
            title: '1. Welcome & Introductions',
            detail: 'Introduce yourself and Kate. Go around the room — name, fellowship year, one sentence about why they signed up.',
            time: '15 min',
          },
          {
            title: '2. Show Survey Results',
            detail: 'Pull up lifedesigncourse.app/survey/results on the projector. Walk through the cohort baseline — where the group is starting from, what excites them, themes in open-ended responses.',
            time: '10 min',
          },
          {
            title: '3. Course Overview & Frameworks',
            detail: 'Introduce the two frameworks: Designing Your Life (Stanford) and Atomic Habits (James Clear). Explain how they complement each other — DYL for direction, Atomic Habits for execution. Show the 8-module structure.',
            time: '15 min',
          },
          {
            title: '4. Live Demo — Vibe Coding a Website',
            detail: 'Build a site from scratch using Claude in ~15 minutes. See the "Vibe Coding Demo" section below for the full script.',
            time: '20 min',
          },
          {
            title: '5. Participants Vibe Code Their Own Sites',
            detail: 'Guided session where each participant starts their own personal website with Claude. Use the setup guide and starter template. Circulate and help.',
            time: '45 min',
          },
          {
            title: '6. AI Toolkit Overview',
            detail: 'Show Claude Cowork, MCP connectors, voice mode, memory/projects. Explain how these tools will be used throughout the course.',
            time: '15 min',
          },
          {
            title: '7. Calendar Analysis Exercise',
            detail: 'Participants export their Google Calendar and analyze alignment with their stated values. See "Calendar Analysis" section below.',
            time: '30 min',
          },
          {
            title: '8. Values & Life Compass Introduction (Module 2 Kickoff)',
            detail: 'Introduce the Workview/Lifeview exercise. Adapted for senior leaders: focus on how values have evolved across career transitions, and where they feel tension now.',
            time: '20 min',
          },
          {
            title: '9. Wrap-Up & Next Steps',
            detail: 'Preview what\'s coming in future sessions. Assign Module 2 exercises as homework. Show them the portal, workbook, and check-in features.',
            time: '10 min',
          },
        ]} />
      </Section>

      {/* ────────── VIBE CODING DEMO ────────── */}
      <Section title="Vibe Coding Demo Script" icon={Play} color="emerald" defaultOpen={false}>
        <p className="text-white/40 text-sm mb-4">
          Live demo for Kate and the cohort. Build a health policy researcher's site in ~15 minutes.
          Narrate every step so participants see the thought process, not just the output.
        </p>

        <div className="bg-amber-500/5 border border-amber-500/15 rounded-lg px-4 py-3 mb-4">
          <p className="text-amber-300/80 text-sm font-medium">Before the demo</p>
          <p className="text-white/40 text-xs mt-1">
            Have Claude open in a browser tab. Have a terminal ready. Make sure Node.js is installed.
            Open this page on a second screen so you can glance at the script.
          </p>
        </div>

        <StepTracker steps={[
          {
            title: 'Step 1: Set the scene (2 min)',
            detail: '"I\'m going to build a professional website for a fictional health policy researcher in about 15 minutes. I won\'t write any code — I\'ll describe what I want and let Claude build it."',
            time: '2 min',
          },
          {
            title: 'Step 2: Create the project (1 min)',
            detail: 'In Claude, type the setup prompt below. Paste the commands Claude gives you into the terminal.',
            script: 'npm create vite@latest demo-site -- --template react && cd demo-site && npm install -D tailwindcss @tailwindcss/vite && npm run dev',
            time: '1 min',
          },
          {
            title: 'Step 3: Describe the site (3 min)',
            detail: 'Give Claude the big prompt. Narrate as you type: "I\'m telling Claude who this person is, what sections I want, and the overall feel."',
            time: '3 min',
          },
          {
            title: 'Step 4: First iteration (3 min)',
            detail: 'Claude generates the full site. Paste it in, show the live preview. Point out: "We have a complete, professional site and I haven\'t written a single line of code."',
            time: '3 min',
          },
          {
            title: 'Step 5: Customize live (5 min)',
            detail: 'Make 3-4 changes by talking to Claude: change the color scheme, add a publications section, make it mobile-responsive, add a contact form. Each change shows the power of iteration.',
            time: '5 min',
          },
          {
            title: 'Step 6: Deploy (2 min)',
            detail: 'Push to GitHub and deploy to Vercel. Show the live URL. "This is now on the internet. Anyone can see it. That took 15 minutes."',
            script: 'git init && git add . && git commit -m "initial site" && npx vercel --yes',
            time: '2 min',
          },
        ]} />

        <h4 className="text-white/60 text-sm font-medium mt-6 mb-2">Demo Prompt — Copy & Customize</h4>
        <CodeBlock label="Initial site prompt for Claude" code={`I want to build a single-page personal website for Dr. Sarah Chen, a health policy researcher. Here's the brief:

**Who she is:** Health economist and policy researcher at Georgetown. Former Congressional Budget Office analyst. Focuses on healthcare access and equity in rural communities. Published 30+ papers.

**Sections needed:**
1. Hero — her name, title, a one-line tagline, professional headshot placeholder
2. About — 2-3 paragraphs about her background and mission
3. Research — 4-5 featured publications with titles and journal names
4. Speaking — upcoming talks and past keynotes
5. Contact — email, LinkedIn, and a simple contact form

**Vibe:** Clean, authoritative, warm. Navy blue + white + subtle gold accents. Think "credible academic who is also approachable."

Build this as a single React component using Tailwind CSS. Make it fully responsive. Use placeholder images.`} />

        <h4 className="text-white/60 text-sm font-medium mt-6 mb-2">Iteration Prompts</h4>
        <div className="space-y-2">
          {[
            'Change the color scheme to deep teal and warm white. Make it feel more modern.',
            'Add a "Policy Impact" section between Research and Speaking. Show 3 bullet points with metrics like "Authored policy brief adopted by 12 state Medicaid programs."',
            'Make the hero section full-viewport height with a subtle gradient background.',
            'Add smooth scroll navigation — when someone clicks a nav link, it scrolls to that section.',
          ].map((prompt, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2 flex items-start gap-2">
              <span className="text-[10px] text-emerald-400/60 font-mono mt-0.5">{i + 1}</span>
              <p className="text-xs text-white/50 flex-1">{prompt}</p>
              <CopyBtn text={prompt} />
            </div>
          ))}
        </div>
      </Section>

      {/* ────────── ACCOUNT SETUP GUIDE ────────── */}
      <Section title="Participant Account Setup Guide" icon={Shield} color="blue" defaultOpen={false}>
        <p className="text-white/40 text-sm mb-4">
          Each participant needs their own free accounts. Walk them through this or share the link.
          Total setup time: ~20 minutes per person.
        </p>

        <h4 className="text-white/60 text-sm font-medium mb-2">1. Claude Account</h4>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 mb-4">
          <p className="text-white/40 text-xs leading-relaxed">
            Go to <span className="text-blue-400">claude.ai</span> → Sign up with Google. Free tier works for the course.
            Pro ($20/mo) gives more usage and access to Cowork. Recommended but not required.
          </p>
        </div>

        <h4 className="text-white/60 text-sm font-medium mb-2">2. GitHub Account</h4>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 mb-4">
          <p className="text-white/40 text-xs leading-relaxed">
            Go to <span className="text-blue-400">github.com/signup</span> → Create free account.
            This is where their site code lives. They won't need to learn git — Claude handles it.
          </p>
        </div>

        <h4 className="text-white/60 text-sm font-medium mb-2">3. Vercel Account</h4>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 mb-4">
          <p className="text-white/40 text-xs leading-relaxed">
            Go to <span className="text-blue-400">vercel.com</span> → Sign up with GitHub (uses the account from step 2).
            Free tier: unlimited projects, 100GB bandwidth/month. Their sites deploy automatically on every push.
          </p>
        </div>

        <h4 className="text-white/60 text-sm font-medium mb-2">4. Node.js (for local development)</h4>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 mb-4">
          <p className="text-white/40 text-xs leading-relaxed">
            Go to <span className="text-blue-400">nodejs.org</span> → Download the LTS version. Install it.
            This runs the development server on their laptop so they can preview changes in real-time.
          </p>
          <CodeBlock code="node --version  # should show v20+ or v22+" label="Verify installation" />
        </div>

        <h4 className="text-white/60 text-sm font-medium mb-2">5. Firebase (optional — for later modules)</h4>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
          <p className="text-white/40 text-xs leading-relaxed">
            Go to <span className="text-blue-400">console.firebase.google.com</span> → Create a project.
            Not needed for Module 1 (personal website). Required starting Module 5 (habit tracking) and Module 6 (life dashboard).
            Free Spark plan: 20K writes/day, 50K reads/day — more than enough.
          </p>
        </div>

        <div className="bg-rose-500/5 border border-rose-500/15 rounded-lg px-4 py-3 mt-4">
          <p className="text-rose-300/80 text-sm font-medium">Important: Individual accounts, not shared</p>
          <p className="text-white/40 text-xs mt-1">
            Each participant should use their own accounts so they own their work after the course ends.
            Shared accounts create security risks and their sites would stop working when access is revoked.
          </p>
        </div>
      </Section>

      {/* ────────── VIBE CODING GUIDE ────────── */}
      <Section title="Vibe Coding 101 — Prompting Guide for Participants" icon={Sparkles} color="cyan" defaultOpen={false}>
        <p className="text-white/40 text-sm mb-4">
          Reference guide for participants on how to effectively prompt Claude for site changes.
        </p>

        <h4 className="text-white/60 text-sm font-medium mb-2">The Core Pattern</h4>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 mb-4">
          <p className="text-white/50 text-sm leading-relaxed">
            <strong className="text-white/70">Describe → Generate → Review → Iterate</strong>
          </p>
          <p className="text-white/30 text-xs mt-2">
            You describe what you want in plain English. Claude generates code. You look at the result.
            You tell Claude what to change. Repeat until it's right. You never need to read or understand the code.
          </p>
        </div>

        <h4 className="text-white/60 text-sm font-medium mb-3">Prompt Patterns That Work</h4>
        <div className="space-y-3">
          {[
            {
              label: 'Starting a new section',
              example: 'Add a "Publications" section after the About section. Show 5 publications in a clean card layout with title, journal name, year, and a link.',
              why: 'Specifies placement, content, and visual style.',
            },
            {
              label: 'Changing visual style',
              example: 'Change the color scheme to deep navy (#1a1a2e) and warm gold (#d4a574). Make the headings gold and the body text a soft off-white.',
              why: 'Gives exact colors. The more specific, the fewer iterations needed.',
            },
            {
              label: 'Fixing something that looks wrong',
              example: 'The project cards are too close together on mobile. Add more spacing between them and make them stack vertically on small screens.',
              why: 'Describes the problem and the fix. Claude needs to know both.',
            },
            {
              label: 'Adding interactivity',
              example: 'When someone clicks a project card, expand it to show a full description and a link to the paper. Collapse it when clicked again.',
              why: 'Describes the behavior, not the implementation.',
            },
            {
              label: 'Getting unstuck',
              example: 'I\'m getting this error: [paste error]. The site was working before I added the contact form. Can you fix it?',
              why: 'Always paste error messages. Claude can diagnose from the error text.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
              <p className="text-white/60 text-xs font-medium mb-1">{item.label}</p>
              <div className="bg-black/20 rounded px-3 py-2 mb-2">
                <p className="text-emerald-400/70 text-xs font-mono leading-relaxed">{item.example}</p>
              </div>
              <p className="text-white/20 text-[10px]">{item.why}</p>
            </div>
          ))}
        </div>

        <h4 className="text-white/60 text-sm font-medium mt-6 mb-2">Common Mistakes</h4>
        <div className="space-y-2">
          {[
            { bad: '"Make it look better"', good: '"Increase spacing between cards, use a warmer color palette, and make the hero text larger"', why: 'Vague prompts get vague results.' },
            { bad: '"Fix the CSS"', good: '"The heading text is too small on mobile and the cards overlap. Make headings 24px on mobile and add 16px gap between cards"', why: 'Be specific about what\'s broken.' },
            { bad: 'Giving up after one try', good: 'Iterate 3-4 times — each round gets closer', why: 'Vibe coding is a conversation, not a one-shot.' },
          ].map((item, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-red-400/60 text-[10px] uppercase tracking-wider mb-1">Instead of</p>
                <p className="text-white/40 text-xs">{item.bad}</p>
              </div>
              <div>
                <p className="text-emerald-400/60 text-[10px] uppercase tracking-wider mb-1">Try</p>
                <p className="text-white/40 text-xs">{item.good}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ────────── CALENDAR ANALYSIS ────────── */}
      <Section title="Calendar Analysis Exercise" icon={Calendar} color="rose" defaultOpen={false}>
        <p className="text-white/40 text-sm mb-4">
          Participants analyze their own calendar data to see how their time aligns (or doesn't) with their stated values.
          Best done after Module 2 (Values & Life Compass).
        </p>

        <div className="bg-amber-500/5 border border-amber-500/15 rounded-lg px-4 py-3 mb-4">
          <p className="text-amber-300/80 text-sm font-medium">Privacy Note</p>
          <p className="text-white/40 text-xs mt-1">
            Calendar data is personal. Participants should review and redact sensitive meeting titles before sharing with Claude.
            Analysis stays on their device — nothing is stored or shared with the group.
          </p>
        </div>

        <StepTracker steps={[
          {
            title: 'Step 1: Define your values (from Module 2)',
            detail: 'Participants should have their top 5 values identified. If not done yet, do a quick 5-minute values extraction.',
            time: '5 min',
          },
          {
            title: 'Step 2: Export calendar data',
            detail: 'Google Calendar → Settings → Import & Export → Export. Downloads an .ics file with all events. Alternatively, use Google Takeout for a more detailed export.',
          },
          {
            title: 'Step 3: Upload to Claude and analyze',
            detail: 'Upload the .ics file to Claude (or use Cowork with Google Calendar MCP connector). Use the analysis prompt below.',
          },
          {
            title: 'Step 4: Review alignment report',
            detail: 'Claude categorizes time spent and scores alignment against stated values. Look for gaps — where are you spending time that doesn\'t serve your top values?',
            time: '10 min',
          },
          {
            title: 'Step 5: One calendar change',
            detail: 'Based on the analysis, each participant commits to ONE calendar change for the next 2 weeks. Share with the group.',
            time: '10 min',
          },
        ]} />

        <h4 className="text-white/60 text-sm font-medium mt-6 mb-2">Analysis Prompt for Claude</h4>
        <CodeBlock label="Calendar analysis prompt" code={`I'm going to upload my Google Calendar export (.ics file) from the last 4 weeks.

My top 5 personal values are:
1. [Value 1]
2. [Value 2]
3. [Value 3]
4. [Value 4]
5. [Value 5]

Please analyze my calendar and:

1. **Categorize my time** into buckets:
   - Direct patient/client work
   - Research & writing
   - Meetings & administration
   - Mentorship & teaching
   - Personal health & wellness
   - Family & relationships
   - Professional development
   - Commuting & transitions
   - Other (specify)

2. **Score alignment** — For each value, rate 1-10 how well my calendar reflects it. Show your reasoning.

3. **Identify gaps** — Where am I spending significant time on things that don't serve my top values? Where are my values underrepresented?

4. **Suggest 3 changes** — Concrete, realistic calendar adjustments I could make in the next 2 weeks to better align my time with my values.

Be honest. I want to see the truth, not reassurance.`} />
      </Section>

      {/* ────────── CLAUDE & AI TOOLKIT ────────── */}
      <Section title="AI Toolkit — What to Show Participants" icon={Monitor} color="blue" defaultOpen={false}>
        <p className="text-white/40 text-sm mb-4">
          Key Claude capabilities to introduce during the training. Focus on what's relevant for non-technical health leaders.
        </p>

        <div className="space-y-3">
          {[
            {
              name: 'Claude Cowork (Desktop App)',
              desc: 'Autonomous task execution on their computer. Can organize files, draft documents, manage spreadsheets, and complete multi-step workflows.',
              useCase: 'Delegate research synthesis, literature reviews, or report formatting while you focus on higher-order thinking.',
              icon: '💻',
            },
            {
              name: 'MCP Connectors',
              desc: 'Pre-built integrations with Google Calendar, Drive, Gmail, Slack. Claude can read and act on data from these tools directly.',
              useCase: 'Connect Google Calendar for the time alignment exercise. Connect Drive to have Claude analyze scattered notes and documents.',
              icon: '🔌',
            },
            {
              name: 'Voice Mode',
              desc: 'Talk to Claude instead of typing. Use /voice command and hold spacebar to speak.',
              useCase: 'Hands-free journaling — dictate reflections while walking. Claude transcribes and structures your thoughts.',
              icon: '🎙️',
            },
            {
              name: 'Memory & Projects',
              desc: 'Claude remembers context across sessions. Create a "Life Design" project and all conversations build on previous ones.',
              useCase: 'Build a persistent AI coach that knows your values, goals, and progress. It gets more personalized over time.',
              icon: '🧠',
            },
            {
              name: 'Dispatch (Mobile → Desktop)',
              desc: 'Assign tasks from your phone. Come back to finished work on your desktop.',
              useCase: 'While commuting: "Organize my notes from today\'s meeting into action items." When you get to your desk, it\'s done.',
              icon: '📱',
            },
            {
              name: 'Artifacts',
              desc: 'Claude can build interactive visualizations, dashboards, charts, and mini-applications inline.',
              useCase: 'Build your personal HWPL dashboard, values compass visualization, or habit tracker right in the conversation.',
              icon: '🎨',
            },
          ].map((tool, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{tool.icon}</span>
                <h5 className="text-white/80 text-sm font-medium">{tool.name}</h5>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">{tool.desc}</p>
              <div className="mt-2 bg-emerald-500/5 border border-emerald-500/10 rounded px-3 py-2">
                <p className="text-emerald-400/60 text-[10px] uppercase tracking-wider mb-0.5">Course use case</p>
                <p className="text-white/50 text-xs">{tool.useCase}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ────────── UPDATED WORKBOOK PROMPTS ────────── */}
      <Section title="Updated Workbook Prompts for Senior Leaders" icon={BookOpen} color="purple" defaultOpen={false}>
        <p className="text-white/40 text-sm mb-4">
          Rewritten prompts that respect the expertise level of this cohort. These replace the default prompts
          for the April 9 cohort. The original prompts work for general audiences; these are tailored for
          accomplished health policy professionals.
        </p>

        <h4 className="text-white/60 text-sm font-medium mb-2">Module 2 — Values & Life Compass</h4>
        <div className="space-y-2 mb-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
            <p className="text-white/50 text-xs font-medium mb-1">Workview (Original: "Why do you work?")</p>
            <p className="text-emerald-400/70 text-xs leading-relaxed">
              "Your relationship with work has evolved across career phases — from training to practice to leadership to policy.
              What does work mean to you now that it didn't 10 years ago? What convictions about 'good work' have remained constant,
              and what have you let go of? Where do you feel tension between what you believe and what your role requires?"
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
            <p className="text-white/50 text-xs font-medium mb-1">Lifeview (Original: "Why are you alive?")</p>
            <p className="text-emerald-400/70 text-xs leading-relaxed">
              "You've dedicated your career to improving health systems and health outcomes. How does that connect to your
              deeper beliefs about why you're here? What responsibilities do you feel toward the systems you've been part of?
              How do you think about legacy — not in the abstract, but for you, specifically?"
            </p>
          </div>
        </div>

        <h4 className="text-white/60 text-sm font-medium mb-2">Module 3 — Energy Audit</h4>
        <div className="space-y-2 mb-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
            <p className="text-white/50 text-xs font-medium mb-1">Activity Logging (Enhanced for leadership context)</p>
            <p className="text-emerald-400/70 text-xs leading-relaxed">
              "Beyond the standard AEIOU, add two dimensions: Stakeholder Complexity (are you managing competing interests?)
              and Influence Potential (can this activity shape outcomes beyond your immediate role?).
              Track for one week and look for the pattern — what energizes your leadership?"
            </p>
          </div>
        </div>

        <h4 className="text-white/60 text-sm font-medium mb-2">Module 4 — Odyssey Plans</h4>
        <div className="space-y-2 mb-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
            <p className="text-white/50 text-xs font-medium mb-1">Plan A → "The Deepening"</p>
            <p className="text-emerald-400/70 text-xs leading-relaxed">
              "You stay in your current domain and go deeper. What's the ceiling of influence on this path?
              What becomes possible in 5 years that isn't possible now? What might become stale?"
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
            <p className="text-white/50 text-xs font-medium mb-1">Plan B → "The Pivot"</p>
            <p className="text-emerald-400/70 text-xs leading-relaxed">
              "Your expertise is portable. If your current role ended tomorrow, what adjacent field or problem
              would benefit most from what you know? What about your field energizes you most — and where else
              is that same problem being solved?"
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
            <p className="text-white/50 text-xs font-medium mb-1">Plan C → "The Leverage Play"</p>
            <p className="text-emerald-400/70 text-xs leading-relaxed">
              "You optimize for maximum influence, not title or institution. What becomes possible if you
              trade security for impact? What's your 10-year legacy? Who do you need to reach?"
            </p>
          </div>
        </div>

        <h4 className="text-white/60 text-sm font-medium mb-2">Module 5 — Identity-Based Habits</h4>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 mb-6">
          <p className="text-white/50 text-xs font-medium mb-1">Four Laws at Institutional Scale</p>
          <p className="text-emerald-400/70 text-xs leading-relaxed">
            "You already have strong personal habits — that's not the challenge. The question is: how do you
            embed the practices you value into the organizations and systems you lead? For each of the Four Laws,
            think at the team/org level: How do you make good practices Obvious for your team? Attractive within
            your organization? Easy to adopt? Satisfying to maintain?"
          </p>
        </div>

        <h4 className="text-white/60 text-sm font-medium mb-2">Module 6 — Life Dashboard</h4>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
          <p className="text-white/50 text-xs font-medium mb-1">HWPL → Defining Success Across Your Roles</p>
          <p className="text-emerald-400/70 text-xs leading-relaxed">
            "Instead of generic Health/Work/Play/Love, define YOUR four dimensions: Leadership Impact (your primary domain),
            Expertise Deepening (staying current, advancing your field), Relationships (team, mentors, peers, family),
            and Renewal (the non-negotiables that keep you sustainable). Weight them based on your current season of life.
            How has this balance shifted across your career? Is it moving in the direction you want?"
          </p>
        </div>
      </Section>

      {/* ────────── QUICK LINKS ────────── */}
      <Section title="Quick Links" icon={Globe} color="emerald" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Survey', url: '/survey', icon: '📋' },
            { label: 'Survey Results', url: '/survey/results', icon: '📊' },
            { label: 'Course Landing', url: '/', icon: '🏠' },
            { label: 'Portal', url: '/portal', icon: '🚀' },
            { label: 'GitHub Repo', url: 'https://github.com/mdulin01/lifedesigncourse', icon: '💻' },
            { label: 'Firebase Console', url: 'https://console.firebase.google.com/project/lifedesigncourse', icon: '🔥' },
            { label: 'Vercel Dashboard', url: 'https://vercel.com/dashboard', icon: '▲' },
            { label: 'Claude', url: 'https://claude.ai', icon: '🤖' },
          ].map((link, i) => (
            <a
              key={i}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.02] border border-white/5 rounded-lg hover:border-white/15 hover:bg-white/[0.04] transition text-sm"
            >
              <span>{link.icon}</span>
              <span className="text-white/60 text-xs">{link.label}</span>
              {link.url.startsWith('http') && <ExternalLink className="w-3 h-3 text-white/20 ml-auto" />}
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
