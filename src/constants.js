// Authorized portal users
export const allowedEmails = [
  'mdulin@gmail.com',
  'jdulin07@gmail.com',
];

// Course module definitions
export const courseModules = [
  {
    id: 1,
    title: 'Build Your Personal Website',
    subtitle: 'AI-Assisted Web Development',
    description: 'Create a professional personal website from scratch using AI tools. Learn to communicate with AI to generate code, iterate on designs, and deploy to the web.',
    icon: '🌐',
    framework: 'ai',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    tools: ['Claude', 'React', 'Vite', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: 2,
    title: 'Values & Life Compass',
    subtitle: 'Designing Your Life — Workview & Lifeview',
    description: 'Define your Workview (why you work, what work means) and Lifeview (why you\'re here, what life means). Build a digital compass that keeps your decisions aligned with your values.',
    icon: '🧭',
    framework: 'dyl',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    tools: ['Values Assessment', 'Workview Editor', 'Lifeview Editor'],
  },
  {
    id: 3,
    title: 'Energy Audit',
    subtitle: 'Good Time Journal & AEIOU Framework',
    description: 'Track your daily activities and discover what energizes vs. drains you. Use the AEIOU framework (Activities, Environments, Interactions, Objects, Users) to find patterns.',
    icon: '⚡',
    framework: 'dyl',
    color: 'from-yellow-500/20 to-amber-500/20',
    borderColor: 'border-yellow-500/30',
    tools: ['Activity Logger', 'Energy Tracker', 'Pattern Analysis'],
  },
  {
    id: 4,
    title: 'Design Your Odyssey Plans',
    subtitle: 'Three Alternate Life Paths',
    description: 'Create three different 5-year life scenarios: your current path, what you\'d do if that disappeared, and what you\'d do if money didn\'t matter. Visualize and compare possibilities.',
    icon: '🗺️',
    framework: 'dyl',
    color: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'border-purple-500/30',
    tools: ['Odyssey Plan Builder', 'Timeline Visualizer', 'Decision Matrix'],
  },
  {
    id: 5,
    title: 'Identity-Based Habits',
    subtitle: 'The Four Laws of Behavior Change',
    description: 'Shift from outcome-based goals to identity-based habits. Learn to make habits Obvious, Attractive, Easy, and Satisfying using James Clear\'s proven framework.',
    icon: '🔄',
    framework: 'ah',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    tools: ['Identity Designer', 'Habit Builder', '4 Laws Checklist'],
  },
  {
    id: 6,
    title: 'Build Your Life Dashboard',
    subtitle: 'Health, Work, Play, Love Gauges',
    description: 'Build a personal dashboard that visualizes your life balance across four key areas. Track changes over time and identify where to focus your energy.',
    icon: '📊',
    framework: 'dyl',
    color: 'from-teal-500/20 to-emerald-500/20',
    borderColor: 'border-teal-500/30',
    tools: ['Life Balance Gauges', 'Trend Tracker', 'Focus Planner'],
  },
  {
    id: 7,
    title: 'Habit Systems & Tracking',
    subtitle: 'Stacking, Environment Design & Streaks',
    description: 'Build a habit tracking system with streak counters, habit stacking chains, the 2-minute rule simplifier, and environment design checklists.',
    icon: '📈',
    framework: 'ah',
    color: 'from-rose-500/20 to-pink-500/20',
    borderColor: 'border-rose-500/30',
    tools: ['Habit Tracker', 'Streak Counter', 'Stack Builder', 'Environment Audit'],
  },
  {
    id: 8,
    title: 'Prototype & Iterate',
    subtitle: 'Test Your Life Designs',
    description: 'Run small experiments to test your odyssey plans. Review your data, adjust your habits, and refine your life design. Build the iteration mindset.',
    icon: '🧪',
    framework: 'both',
    color: 'from-indigo-500/20 to-blue-500/20',
    borderColor: 'border-indigo-500/30',
    tools: ['Prototype Planner', 'Experiment Log', 'Review Dashboard'],
  },
];

// DYL Life Balance categories
export const dylCategories = [
  { id: 'health', label: 'Health', emoji: '❤️', color: 'emerald', description: 'Physical, mental, and spiritual well-being' },
  { id: 'work', label: 'Work', emoji: '💼', color: 'blue', description: 'Career, projects, purpose-driven effort' },
  { id: 'play', label: 'Play', emoji: '🎮', color: 'amber', description: 'Joy, fun, creativity, recharging' },
  { id: 'love', label: 'Love', emoji: '💜', color: 'rose', description: 'Relationships, community, belonging' },
];

// Atomic Habits 4 Laws
export const habitLaws = [
  { id: 'obvious', law: '1st Law', label: 'Make It Obvious', emoji: '👁', description: 'Design your environment so cues for good habits are visible', inverse: 'Make It Invisible' },
  { id: 'attractive', law: '2nd Law', label: 'Make It Attractive', emoji: '✨', description: 'Bundle habits with things you enjoy; join supportive communities', inverse: 'Make It Unattractive' },
  { id: 'easy', law: '3rd Law', label: 'Make It Easy', emoji: '🎯', description: 'Reduce friction; use the 2-minute rule to start small', inverse: 'Make It Difficult' },
  { id: 'satisfying', law: '4th Law', label: 'Make It Satisfying', emoji: '🏆', description: 'Track progress; celebrate small wins; never miss twice', inverse: 'Make It Unsatisfying' },
];

// AEIOU Journal prompts
export const journalPrompts = {
  activity: 'What were you actually doing? Was it structured or unstructured?',
  environment: 'Where were you? How did the space affect how you felt?',
  interactions: 'Who were you with? Was the interaction competitive, collaborative, or solo?',
  objects: 'What tools, devices, or objects were you using?',
  users: 'Who else was there? Who was affected by what you were doing?',
};

// Module project steps (Claw Camp-style step-by-step projects per module)
export const moduleProjects = {
  1: [
    {
      number: '00',
      title: 'The Vision',
      description: 'Decide what your personal website says about you before writing a single line of code.',
      artifact: 'A written site brief — who it\'s for, what it says about you, and the vibe you want.',
      details: 'Before you open any tools, get clear on what your website is actually for. Is it a portfolio for potential employers? A personal brand page? A place to share your work and ideas? Think about your audience, the impression you want to make, and 3-5 sections your site needs. Write this down — it becomes the prompt you\'ll give to AI to generate your site.',
      tips: [
        'Look at 3-5 personal websites you admire. Note what you like about each one.',
        'Write one sentence that captures what a visitor should think after 10 seconds on your site.',
        'List the sections your site needs: hero, about, projects, contact — keep it simple to start.',
        'Pick a color palette and mood. Words like "clean," "warm," "bold," or "minimal" help AI understand your style.',
      ],
      resources: [
        { label: 'Personal Site Inspiration — One Page Love', url: 'https://onepagelove.com/inspiration/personal' },
        { label: 'Coolors — Color Palette Generator', url: 'https://coolors.co' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'audience', label: 'Who Is It For?', prompt: 'Who will visit your site? Potential employers, clients, collaborators, friends? What do they need to see?' },
          { id: 'aboutYou', label: 'What It Says About You', prompt: 'What impression should someone have after 10 seconds on your site? What story does it tell about who you are?' },
          { id: 'vibe', label: 'The Vibe', prompt: 'What mood or aesthetic do you want? (e.g. clean and minimal, bold and colorful, warm and personal). List 3-5 adjectives.' },
          { id: 'sections', label: 'Sections & Structure', prompt: 'What sections does your site need? (e.g. hero, about, projects, blog, contact). List them in order.' },
          { id: 'inspiration', label: 'Inspiration Sites', prompt: 'List 2-3 sites you admire and what you like about each one.' },
        ],
      },
    },
    {
      number: '01',
      title: 'Set Up Your Tools',
      description: 'Install the development tools and create your project using AI.',
      artifact: 'A running local development server showing a starter page in your browser.',
      details: 'You\'ll install Node.js (the engine that runs your site locally), then use an AI tool like Claude to scaffold a React + Vite + Tailwind project. The AI writes the setup commands and config files — you just paste them into your terminal. By the end, you\'ll have a live preview running at localhost:5173 that auto-updates as you make changes.',
      tips: [
        'Download Node.js from nodejs.org — grab the LTS (Long Term Support) version.',
        'Use your terminal (Mac: Terminal app, Windows: PowerShell) to run commands.',
        'Tell Claude: "Help me create a new React + Vite + Tailwind CSS project called my-site" and follow the steps it gives you.',
        'If something doesn\'t work, paste the error message to Claude. Error messages are how AI helps you debug.',
      ],
      resources: [
        { label: 'Node.js Download', url: 'https://nodejs.org' },
        { label: 'Vite — Getting Started', url: 'https://vitejs.dev/guide/' },
        { label: 'Tailwind CSS — Installation', url: 'https://tailwindcss.com/docs/installation' },
      ],
    },
    {
      number: '02',
      title: 'Design Your Layout',
      description: 'Use AI to generate the page structure based on your site brief.',
      artifact: 'A skeleton React component with all your sections laid out (hero, about, projects, contact).',
      details: 'Take your site brief from step 00 and turn it into an AI prompt. Describe the sections you want, the layout, and the general feel. Claude will generate a React component with the structure in place. You\'ll iterate — ask for changes, rearrange sections, adjust the layout until the bones feel right. Don\'t worry about content yet, just structure.',
      tips: [
        'Give Claude your full site brief and say "Create a single-page React component with these sections."',
        'Ask for placeholder text and images — you\'ll replace them with real content next.',
        'If the layout isn\'t right, describe what to change: "Move the projects section above contact" or "Make the hero full-screen."',
        'Keep everything in one file for now. You can split into components later.',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
        { label: 'React Docs — Your First Component', url: 'https://react.dev/learn/your-first-component' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'layoutDescription', label: 'Layout Description', prompt: 'Describe the layout you want in plain English. What goes where? What\'s the first thing people see? How does it flow as they scroll?' },
          { id: 'aiPrompt', label: 'Your AI Prompt', prompt: 'Write the prompt you\'ll give Claude to generate your layout. Include your site brief, sections, and vibe from step 00.' },
        ],
      },
    },
    {
      number: '03',
      title: 'Build Your Content',
      description: 'Replace placeholders with your real bio, photos, project descriptions, and links.',
      artifact: 'A complete homepage with your actual content — bio, headshot, projects, and contact info.',
      details: 'This is where the site becomes yours. Replace every placeholder with real content: write your bio (or have AI help you draft one), add your photo, describe your projects or interests, and add your contact links. This step is less about code and more about what you want to say. The AI can help you write, edit, and refine your copy.',
      tips: [
        'Ask Claude to help you write your bio: "Write a 3-sentence professional bio for someone who [your background]."',
        'For photos, put image files in the public/ folder and reference them as "/photo.jpg".',
        'Link to your real social profiles, email, or portfolio pieces.',
        'Read your content out loud — if it sounds stiff, ask AI to make it more conversational.',
      ],
      resources: [
        { label: 'Unsplash — Free Photos', url: 'https://unsplash.com' },
        { label: 'How to Write a Great Bio', url: 'https://www.grammarly.com/blog/professional-bio/' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'bio', label: 'Your Bio', prompt: 'Write your bio — 3-5 sentences about who you are, what you do, and what you care about. Write it like you\'d say it, not like a resume.' },
          { id: 'projects', label: 'Projects / Work', prompt: 'List 2-4 projects, interests, or pieces of work you want to feature. For each: title, one-sentence description, and why it matters to you.' },
          { id: 'contact', label: 'Contact & Links', prompt: 'What contact info and social links will you include? (email, LinkedIn, GitHub, Twitter, etc.)' },
        ],
      },
    },
    {
      number: '04',
      title: 'Style It',
      description: 'Apply visual polish — colors, typography, spacing, and responsive design.',
      artifact: 'A polished, mobile-friendly page that looks professional on any screen size.',
      details: 'Now that your content is in place, make it look good. Use Tailwind CSS utility classes to control colors, fonts, spacing, and layout. Ask AI to apply your color palette from step 00, add hover effects, smooth transitions, and make everything responsive (looks great on both phone and desktop). This is where your site goes from "works" to "wow."',
      tips: [
        'Tell Claude your color palette and say "Apply these colors throughout the site using Tailwind classes."',
        'Test on mobile by resizing your browser window or using browser dev tools (Cmd+Option+I → toggle device toolbar).',
        'Less is more — clean spacing and consistent colors beat flashy animations.',
        'Ask AI to add subtle details: "Add a hover effect to the project cards" or "Make the hero text gradient."',
      ],
      resources: [
        { label: 'Tailwind CSS — Utility Reference', url: 'https://tailwindcss.com/docs' },
        { label: 'Google Fonts', url: 'https://fonts.google.com' },
      ],
    },
    {
      number: '05',
      title: 'Deploy It',
      description: 'Push your code to GitHub and deploy to Vercel for a live URL.',
      artifact: 'A live website at your-name.vercel.app (or your own custom domain).',
      details: 'Your site works locally — now put it on the internet. Create a GitHub repository, push your code, and connect it to Vercel for automatic deployment. Every time you push changes, Vercel rebuilds and deploys automatically. If you have a custom domain, you can connect that too. By the end, you\'ll have a real URL you can share with anyone.',
      tips: [
        'Create a free GitHub account if you don\'t have one, then ask Claude to walk you through "git init, add, commit, push."',
        'Sign up at vercel.com with your GitHub account — it auto-detects Vite projects.',
        'Your site will be live at [project-name].vercel.app within minutes.',
        'To add a custom domain, go to Vercel project settings → Domains and follow the DNS instructions.',
      ],
      resources: [
        { label: 'GitHub — Create Account', url: 'https://github.com/signup' },
        { label: 'Vercel — Deploy', url: 'https://vercel.com/new' },
        { label: 'Vercel — Custom Domains', url: 'https://vercel.com/docs/projects/domains' },
      ],
    },
  ],
  2: [
    {
      number: '00',
      title: 'The Mirror',
      description: 'Reflect on what work and life mean to you right now — before trying to change anything.',
      artifact: 'Two short written pieces: your Workview (1 paragraph) and your Lifeview (1 paragraph).',
      details: 'The Designing Your Life framework starts with two foundational questions: Why do you work? And why are you alive? Your Workview covers what work means to you, why you do it, and what makes it worthwhile. Your Lifeview covers your beliefs about life, purpose, meaning, and how the world works. These don\'t need to be perfect — they\'re a snapshot of where you are today. Write honestly, not aspirationally.',
      tips: [
        'Set a timer for 15 minutes per piece. Don\'t overthink — write what comes naturally.',
        'Your Workview should answer: Why do I work? What does work mean to me? What makes work "good" or "worthwhile"?',
        'Your Lifeview should answer: Why am I here? What is the meaning or purpose of life? What is my relationship to others?',
        'These are private. Nobody else needs to see them. Honesty matters more than eloquence.',
      ],
      resources: [
        { label: 'Designing Your Life — Burnett & Evans (Book)', url: 'https://designingyour.life' },
        { label: 'Workview & Lifeview Explained (Stanford Life Design Lab)', url: 'https://lifedesignlab.stanford.edu' },
      ],
      exercise: {
        type: 'timed-writing',
        timer: 15,
        fields: [
          { id: 'workview', label: 'Your Workview', prompt: 'Why do you work? What does work mean to you? What makes work worthwhile or "good"? Write freely — this is just for you.' },
          { id: 'lifeview', label: 'Your Lifeview', prompt: 'Why are you alive? What is the meaning or purpose of life? What is your relationship to others and the world? Write from the heart.' },
        ],
      },
    },
    {
      number: '01',
      title: 'The Compass Check',
      description: 'Compare your Workview and Lifeview to see where they align — and where they clash.',
      artifact: 'A written reflection on the coherence (or tension) between your Workview and Lifeview.',
      details: 'Read your Workview and Lifeview side by side. Where do they complement each other? Where do they contradict? If your Lifeview says relationships matter most but your Workview is all about achievement, that tension is worth noticing. This isn\'t about fixing anything — it\'s about awareness. The gaps between these two views often point to where you feel stuck or unfulfilled.',
      tips: [
        'Ask yourself: Does my work support my view of a life well-lived? If not, where\'s the disconnect?',
        'Look for words or themes that appear in both pieces — those are your core values.',
        'Contradictions aren\'t bad. They\'re data. Note them without judgment.',
        'Try asking Claude to analyze both pieces: "Here are my Workview and Lifeview. What themes and tensions do you see?"',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'alignment', label: 'Where They Align', prompt: 'Where do your Workview and Lifeview complement each other? What themes appear in both?' },
          { id: 'tension', label: 'Where They Clash', prompt: 'Where do they contradict? What tensions do you notice between what you believe about work and life?' },
          { id: 'insights', label: 'Key Insights', prompt: 'What surprised you? What gaps or disconnects feel most important to explore?' },
        ],
      },
    },
    {
      number: '02',
      title: 'Values Extraction',
      description: 'Pull out your core values from your Workview, Lifeview, and reflection.',
      artifact: 'A ranked list of your top 5-7 personal values with one-sentence definitions.',
      details: 'Your Workview, Lifeview, and compass check are full of implicit values. Now make them explicit. Go through everything you\'ve written and highlight the values that keep showing up: freedom, creativity, connection, security, growth, impact, adventure, family, etc. Then rank them. This ranked list becomes your decision-making filter — when you\'re stuck on a choice, check it against your values.',
      tips: [
        'Start by circling every value-loaded word in your Workview and Lifeview.',
        'If you get stuck, use a values card sort — look at a list of 50+ values and pick your top 10, then narrow to 5-7.',
        'Write a one-sentence definition for each value. "Freedom" means different things to different people.',
        'Ask Claude: "Help me extract values from this text" and paste your Workview/Lifeview.',
      ],
      resources: [
        { label: 'Brené Brown — List of Values', url: 'https://brenebrown.com/resources/dare-to-lead-list-of-values/' },
        { label: 'Personal Values Card Sort (PDF)', url: 'https://motivationalinterviewing.org/sites/default/files/valuescardsort_0.pdf' },
      ],
      exercise: {
        type: 'values-ranking',
        maxValues: 7,
        fields: [
          { id: 'values', label: 'Your Core Values', prompt: 'Add your top 5-7 values. For each, write a one-sentence definition of what it means to YOU.' },
        ],
      },
    },
    {
      number: '03',
      title: 'Build the Compass',
      description: 'Create a digital values compass that you can reference anytime.',
      artifact: 'A working Values Compass page in your Life Design portal.',
      details: 'Now turn your values into a tool you\'ll actually use. In the portal\'s Values section, enter your ranked values with definitions. The compass visualization shows your values at a glance. Over time, you\'ll reference this when making decisions: Does this opportunity align with my top values? Does this habit serve who I want to be? The digital format means it\'s always accessible and easy to update as you evolve.',
      tips: [
        'Enter your values in rank order — the top ones should be your non-negotiables.',
        'Write definitions that are specific to you, not dictionary definitions.',
        'Revisit this quarterly. Values shift as your life changes, and that\'s normal.',
        'Try using your compass for a real decision this week: a job choice, a commitment, how you spend your weekend.',
      ],
      resources: [
        { label: 'Life Design Portal — Values Section', url: '/portal' },
      ],
      exercise: {
        type: 'values-ranking',
        maxValues: 7,
        fields: [
          { id: 'values', label: 'Your Values Compass', prompt: 'Enter your ranked values with definitions. Drag to reorder. These become your decision-making compass.' },
        ],
      },
    },
    {
      number: '04',
      title: 'The Coherence Score',
      description: 'Rate how well your current life aligns with your stated values.',
      artifact: 'A scored assessment of each value (1-10) with notes on what\'s aligned and what\'s not.',
      details: 'For each of your top values, rate on a scale of 1-10 how well your current life reflects that value. If "creativity" is your #1 value but you score it a 3, that\'s a signal. If "security" ranks high and you score it a 9, great — that\'s working. This isn\'t a guilt exercise. It\'s a diagnostic. The gaps become your design challenges for the rest of the course.',
      tips: [
        'Be honest, not aspirational. Score where you actually are, not where you want to be.',
        'For any value scoring below 5, write one sentence about why.',
        'For any value scoring above 7, write what\'s making it work — so you can protect it.',
        'The biggest gaps between value rank and score are your highest-leverage areas for change.',
      ],
      resources: [
        { label: 'Designing Your Life — The Dashboard', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'scored-assessment',
        fields: [
          { id: 'scores', label: 'Value Coherence Scores', prompt: 'Rate how well your current life reflects each of your values (1-10). Add a note for any score below 5 or above 7.' },
        ],
      },
    },
  ],
  3: [
    {
      number: '00',
      title: 'The Log',
      description: 'Track your daily activities for one week using the Good Time Journal.',
      artifact: 'A week of daily activity logs — what you did, when, and for how long.',
      details: 'For one week, keep a simple log of how you spend your time. Every few hours, jot down what you were doing. Don\'t change your behavior — just observe it. The goal is raw data about your actual life, not your idealized version of it. You can use a notebook, a notes app, or the Journal section in the portal. The key is consistency: capture every day, even the boring ones.',
      tips: [
        'Set 3 phone alarms (morning, afternoon, evening) to remind you to log.',
        'Keep it simple: activity, duration, who you were with. One line per entry.',
        'Include everything — work tasks, meals, commuting, scrolling, exercising, conversations.',
        'Don\'t judge your entries. "Watched TV for 2 hours" is valid data, not a failure.',
      ],
      resources: [
        { label: 'Designing Your Life — Good Time Journal', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'day1', label: 'Day 1', prompt: 'Log your activities today. For each: what did you do, when, how long, and who were you with?' },
          { id: 'day2', label: 'Day 2', prompt: 'Log your activities today.' },
          { id: 'day3', label: 'Day 3', prompt: 'Log your activities today.' },
          { id: 'day4', label: 'Day 4', prompt: 'Log your activities today.' },
          { id: 'day5', label: 'Day 5', prompt: 'Log your activities today.' },
          { id: 'day6', label: 'Day 6', prompt: 'Log your activities today.' },
          { id: 'day7', label: 'Day 7', prompt: 'Log your activities today.' },
        ],
      },
    },
    {
      number: '01',
      title: 'The Energy Map',
      description: 'Rate each logged activity for energy and engagement.',
      artifact: 'Your activity log annotated with energy ratings (-2 to +2) and engagement ratings (low/medium/high).',
      details: 'Go back through your week of logs and add two ratings to each activity. Energy: did it drain you (-2, -1) or charge you (+1, +2)? Engagement: were you bored (low), going through the motions (medium), or in flow (high)? This is the core of the DYL energy audit — you\'re mapping what fuels you and what depletes you. Patterns will start to emerge.',
      tips: [
        'Rate on feel, not on what you think "should" energize you. Data beats expectations.',
        'Pay special attention to activities that are high-energy AND high-engagement — those are gold.',
        'Also note the low-energy, low-engagement activities. They\'re candidates for redesign or elimination.',
        'Time of day matters. The same activity might rate differently at 9am vs 9pm.',
      ],
      resources: [
        { label: 'Life Design Portal — Journal Section', url: '/portal' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'energizers', label: 'Energy Boosters', prompt: 'Which activities gave you the most energy (+1, +2)? What was your engagement level for each?' },
          { id: 'drains', label: 'Energy Drains', prompt: 'Which activities drained you (-1, -2)? What was your engagement level for each?' },
          { id: 'surprises', label: 'Surprises', prompt: 'What surprised you about your energy ratings? Any activities you expected to feel differently about?' },
        ],
      },
    },
    {
      number: '02',
      title: 'The AEIOU Breakdown',
      description: 'Analyze your peak and valley moments using the AEIOU framework.',
      artifact: 'AEIOU analysis of your top 3 high-energy and top 3 low-energy activities.',
      details: 'Pick your 3 highest-rated and 3 lowest-rated activities. For each one, break it down using AEIOU: Activities (what exactly were you doing?), Environments (where were you? what was the space like?), Interactions (who were you with? what was the dynamic?), Objects (what tools or things were you using?), Users (who benefited from what you were doing?). This reveals the specific ingredients that make something energizing or draining.',
      tips: [
        'Be specific. "Working" isn\'t helpful. "Writing a proposal alone in a quiet room" reveals what actually matters.',
        'Compare AEIOU across your highs — you\'ll likely find common threads (e.g., always solo, always creative, always with a specific person).',
        'Do the same for your lows. The draining pattern might be about the environment, not the task itself.',
        'Ask Claude to help: "Here are my AEIOU breakdowns. What patterns do you see across my high-energy activities?"',
      ],
      resources: [
        { label: 'AEIOU Framework Explained', url: 'https://designingyour.life' },
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'high1', label: 'High-Energy Activity #1 — AEIOU', prompt: 'Break down your top energizing activity: Activities (what exactly?), Environments (where?), Interactions (who?), Objects (what tools?), Users (who benefited?)' },
          { id: 'high2', label: 'High-Energy Activity #2 — AEIOU', prompt: 'Break down your second energizing activity using AEIOU.' },
          { id: 'high3', label: 'High-Energy Activity #3 — AEIOU', prompt: 'Break down your third energizing activity using AEIOU.' },
          { id: 'low1', label: 'Low-Energy Activity #1 — AEIOU', prompt: 'Break down your most draining activity using AEIOU.' },
          { id: 'low2', label: 'Low-Energy Activity #2 — AEIOU', prompt: 'Break down your second draining activity using AEIOU.' },
          { id: 'low3', label: 'Low-Energy Activity #3 — AEIOU', prompt: 'Break down your third draining activity using AEIOU.' },
        ],
      },
    },
    {
      number: '03',
      title: 'The Pattern Report',
      description: 'Synthesize your findings into clear energy patterns and insights.',
      artifact: 'A written summary: your top energy sources, top drains, and 3 key insights about yourself.',
      details: 'Step back and look at the big picture. What themes keep appearing in your high-energy activities? What\'s consistently present in your drains? Write a short report with three sections: "What energizes me" (the conditions, not just activities), "What drains me" (same), and "Three things I didn\'t expect." The surprises are often the most valuable — they reveal blind spots in your self-knowledge.',
      tips: [
        'Focus on conditions, not just activities. "Being creative with no deadline" is more useful than "painting."',
        'Look for contradictions. Maybe meetings drain you but one specific type of meeting doesn\'t — why?',
        'Share your findings with someone who knows you well. See if they\'re surprised or if it confirms what they already see.',
        'This report feeds directly into your Odyssey Plans (Module 4) — save it.',
      ],
      resources: [
        { label: 'Life Design Portal — Journal Section', url: '/portal' },
      ],
      exercise: {
        type: 'timed-writing',
        timer: 20,
        fields: [
          { id: 'energizers', label: 'What Energizes Me', prompt: 'What conditions (not just activities) consistently give you energy? Think about environment, people, type of work, time of day.' },
          { id: 'drains', label: 'What Drains Me', prompt: 'What conditions consistently drain you? Again, focus on the underlying factors, not just the activity name.' },
          { id: 'surprises', label: 'Three Things I Didn\'t Expect', prompt: 'What surprised you most in this audit? What blind spots did you uncover about yourself?' },
        ],
      },
    },
    {
      number: '04',
      title: 'The Redesign',
      description: 'Make one concrete change to your week based on your energy data.',
      artifact: 'A specific plan to add one energizing activity and reduce or redesign one draining activity.',
      details: 'Knowledge without action is just trivia. Pick one high-energy activity you want more of and one low-energy activity you want to change. For the energizer, schedule it — put it on your calendar this week. For the drain, you have three options: eliminate it, delegate it, or redesign it (change the environment, interaction, or timing). Start small. One change, one week. This is prototyping your life — the DYL way.',
      tips: [
        'Make the energizing addition easy. Block 30 minutes, not 3 hours. You can always expand later.',
        'For the drain, redesign is often better than elimination. Can you do the same task in a different place, at a different time, or with different people?',
        'Tell someone about your plan — accountability helps.',
        'Track the results next week. Did the change stick? Did it affect your energy as expected?',
      ],
      resources: [
        { label: 'Designing Your Life — Prototyping', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'addActivity', label: 'Energizer to Add', prompt: 'What high-energy activity will you add to your week? When exactly will you do it? Be specific — day, time, duration.' },
          { id: 'changeActivity', label: 'Drain to Redesign', prompt: 'What draining activity will you change? Will you eliminate it, delegate it, or redesign it? What specifically will be different?' },
          { id: 'accountability', label: 'Accountability Plan', prompt: 'Who will you tell about this plan? How will you track whether the change sticks?' },
        ],
      },
    },
  ],
};

// Behind the Scenes example entries (documenting the build process)
export const btsEntries = [
  {
    id: 'project-setup',
    section: 'hero',
    title: 'Setting Up the Project',
    description: 'We scaffolded this entire project from scratch using AI — React, Vite, Tailwind, and Firebase — by describing what we wanted and iterating on the output.',
    prompt: `"help me setup a new project using the same set-up as mikeandadam/mikedulinmd? It will be called lifedesigncourse.app... I want to set-up this site to use for teaching a course about how to use AI to assist with coding"`,
    tools: ['Claude Code', 'React', 'Vite', 'Tailwind CSS'],
  },
  {
    id: 'landing-page',
    section: 'modules',
    title: 'Designing the Landing Page',
    description: 'The course landing page was built in a single conversation. We described the course structure, referenced the DYL and Atomic Habits frameworks, and the AI generated all the content and layout.',
    prompt: `"Please look at the Designing your Life framework and tools as well as Atomic Habits to develop ideas for how this site should work, look, and feel."`,
    tools: ['Claude Code', 'Web Research', 'React Components'],
  },
  {
    id: 'bts-system',
    section: 'bts',
    title: 'The Behind-the-Scenes System',
    description: 'This very toggle system you\'re using right now was designed to let students see exactly how each piece was built — the prompts, screenshots, and tools used.',
    prompt: `"...some type of interface button that could switch between how the site looks in production and then show screenshots of the various tools and our example projects that they could create for themselves or the text input that I'm using with you to create web apps."`,
    tools: ['React Context', 'Component Composition'],
  },
];
