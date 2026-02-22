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
        type: 'timed-writing', timer: 15,
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
        type: 'timed-writing', timer: 15,
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
        type: 'timed-writing', timer: 15,
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
        type: 'timed-writing', timer: 15,
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
    {
      number: '05',
      title: 'AI Build: Your Compass Page',
      description: 'Use AI to add a values compass component to your personal website.',
      artifact: 'A working Values Compass page on your personal site that displays your ranked values, workview, and lifeview.',
      details: 'Take everything you\'ve created in this module — your Workview, Lifeview, ranked values, and coherence scores — and use AI to build a Values Compass page on your personal website. This page becomes a living reference you can check before any big decision. Prompt Claude with your data and ask it to generate a React component that visualizes your values hierarchy, displays your Workview and Lifeview side by side, and shows your coherence scores.',
      tips: [
        'Copy your exercise responses from the Workbook using the copy button, then paste them into Claude as context.',
        'Start simple: "Here are my ranked values with definitions. Create a React component that displays them as a visual compass or ranked list with color-coded bars."',
        'Ask Claude to add your Workview and Lifeview as collapsible sections below the compass.',
        'Include your coherence scores as a simple bar chart so you can see gaps at a glance.',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'aiPrompt', label: 'Your AI Prompt', prompt: 'Write the prompt you gave (or will give) Claude to build your compass page. Include your values data and what you want it to look like.' },
          { id: 'whatYouBuilt', label: 'What You Built', prompt: 'Describe what your compass page looks like. What components did AI generate? What did you change or customize?' },
          { id: 'nextIteration', label: 'What You\'d Improve', prompt: 'What would you refine next time you update this page? What features would make it more useful for daily decision-making?' },
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
        type: 'timed-writing', timer: 15,
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
        type: 'timed-writing', timer: 15,
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
        type: 'timed-writing', timer: 15,
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
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'addActivity', label: 'Energizer to Add', prompt: 'What high-energy activity will you add to your week? When exactly will you do it? Be specific — day, time, duration.' },
          { id: 'changeActivity', label: 'Drain to Redesign', prompt: 'What draining activity will you change? Will you eliminate it, delegate it, or redesign it? What specifically will be different?' },
          { id: 'accountability', label: 'Accountability Plan', prompt: 'Who will you tell about this plan? How will you track whether the change sticks?' },
        ],
      },
    },
    {
      number: '05',
      title: 'AI Build: Your Energy Tracker',
      description: 'Use AI to add an energy logging tool to your personal website.',
      artifact: 'A working energy tracker on your site where you can log activities, rate energy/engagement, and see patterns.',
      details: 'Your energy audit revealed what fuels and drains you. Now build a tool on your personal site that lets you keep tracking. Prompt AI to create a component where you can log an activity, rate your energy (-2 to +2) and engagement (low/med/high), and see your history. Over time, this becomes your personal energy database — far more useful than a one-time audit.',
      tips: [
        'Copy your Energy Audit findings from the Workbook and share them with Claude as context for the design.',
        'Start with: "Build a React component with a form to log activities with energy ratings (-2 to +2) and engagement (low/med/high). Store entries in localStorage and show a scrollable history list."',
        'Ask Claude to color-code entries: green for high-energy, red for drains, yellow for neutral.',
        'Bonus: ask for a simple chart that shows your energy trend over the last 7 days.',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'aiPrompt', label: 'Your AI Prompt', prompt: 'Write the prompt you gave Claude to build your energy tracker. What data does it capture? How does it display history?' },
          { id: 'whatYouBuilt', label: 'What You Built', prompt: 'Describe your energy tracker. What does the form look like? How do you view past entries? Any charts or visualizations?' },
          { id: 'nextIteration', label: 'What You\'d Improve', prompt: 'What would make this tracker more useful? Patterns view? Weekly summary? Integration with your AEIOU data?' },
        ],
      },
    },
  ],
  4: [
    {
      number: '00',
      title: 'Your Current Path',
      description: 'Map out what your life looks like in 5 years if you keep doing what you\'re doing.',
      artifact: 'A written 5-year Odyssey Plan for your current trajectory.',
      details: 'Odyssey Plan #1 is your "keep going" plan. Project forward 5 years on your current path. Where do you live? What work are you doing? What does a typical week look like? Who\'s in your life? How do you feel? This isn\'t about whether you like the plan — it\'s about seeing it clearly. Many people have never actually spelled out where their default path leads.',
      tips: [
        'Be concrete. "Doing well" isn\'t a plan. "Running a 10-person team at a mid-size tech company in Portland" is.',
        'Include personal life: relationships, hobbies, health, where you live, daily routines.',
        'Rate this plan on four dimensions: Resources (do you have what you need?), Likability (do you want this?), Confidence (can you pull it off?), Coherence (does it fit your values?).',
        'Don\'t judge it yet. Just describe it honestly.',
      ],
      resources: [
        { label: 'Designing Your Life — Odyssey Planning', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'timed-writing',
        timer: 20,
        fields: [
          { id: 'plan1Title', label: 'Plan Title', prompt: 'Give this life path a short, descriptive title (e.g., "The Steady Climb" or "Corporate Track").' },
          { id: 'plan1Description', label: '5-Year Vision', prompt: 'Describe your life 5 years from now on your current path. Work, location, relationships, daily life, finances, health. Be specific.' },
          { id: 'plan1Ratings', label: 'Plan Ratings', prompt: 'Rate 1-10: Resources (do you have what you need?), Likability (do you want this?), Confidence (can you pull it off?), Coherence (does it fit your values?). Explain each.' },
        ],
      },
    },
    {
      number: '01',
      title: 'The Alternate Path',
      description: 'What would you do if your current path suddenly disappeared?',
      artifact: 'A written 5-year Odyssey Plan for an alternate trajectory.',
      details: 'Odyssey Plan #2 is your "pivot" plan. Imagine your current job, industry, or life situation vanishes tomorrow. Not fired — the whole field disappears. What would you do instead? This forces creative thinking beyond your comfort zone. Many people discover that their Plan B is actually more exciting than their Plan A. The constraint of "you can\'t do what you\'re doing now" unlocks ideas you\'ve been suppressing.',
      tips: [
        'Don\'t just pick the next closest thing. Go sideways. What skills transfer to a completely different field?',
        'Think about what you\'d do if nobody was watching and nobody would judge you.',
        'This plan can be wildly different from Plan 1. That\'s the point.',
        'Rate it on the same four dimensions: Resources, Likability, Confidence, Coherence.',
      ],
      resources: [
        { label: 'Odyssey Plan Template', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'timed-writing',
        timer: 20,
        fields: [
          { id: 'plan2Title', label: 'Plan Title', prompt: 'Title for this alternate path (e.g., "The Creative Leap" or "Teaching Abroad").' },
          { id: 'plan2Description', label: '5-Year Vision', prompt: 'If your current path disappeared, what would you do instead? Describe 5 years out in detail.' },
          { id: 'plan2Ratings', label: 'Plan Ratings', prompt: 'Rate 1-10: Resources, Likability, Confidence, Coherence. Explain each rating.' },
        ],
      },
    },
    {
      number: '02',
      title: 'The Wild Card',
      description: 'What would you do if money and reputation didn\'t matter?',
      artifact: 'A written 5-year Odyssey Plan for your "no limits" path.',
      details: 'Odyssey Plan #3 removes the constraints. If money wasn\'t an issue and nobody would laugh at you, what would you do? Open a surf school? Write novels? Run a nonprofit? Build robots? This plan reveals your deepest desires — the ones you\'ve dismissed as "unrealistic." Some version of this plan might be more achievable than you think, and elements of it can often be woven into Plans 1 or 2.',
      tips: [
        'Go big. This is your permission to dream without the inner critic.',
        'Include the details: where, with whom, what your days look like, what you contribute.',
        'After writing it, circle the elements that excite you most — those are data points, even if the whole plan isn\'t practical.',
        'Rate it: Resources, Likability, Confidence, Coherence. Notice which scores surprise you.',
      ],
      resources: [
        { label: 'Designing Your Life — Chapter on Odyssey Plans', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'timed-writing',
        timer: 20,
        fields: [
          { id: 'plan3Title', label: 'Plan Title', prompt: 'Title for your wild card path (e.g., "The Dream Life" or "Surf & Teach").' },
          { id: 'plan3Description', label: '5-Year Vision', prompt: 'No limits — money and reputation don\'t matter. What does your life look like in 5 years?' },
          { id: 'plan3Ratings', label: 'Plan Ratings', prompt: 'Rate 1-10: Resources, Likability, Confidence, Coherence. What surprises you about these scores?' },
        ],
      },
    },
    {
      number: '03',
      title: 'Compare & Decide',
      description: 'Lay your three plans side by side and see what the comparison reveals.',
      artifact: 'A comparison analysis of your three Odyssey Plans with a synthesis of what matters most.',
      details: 'Line up all three plans. Look at the ratings. Which plan scores highest on Likability? Confidence? Coherence? Often the "best" plan isn\'t one of the three — it\'s a hybrid that borrows the best elements from each. Also look at what\'s consistent across all three: those elements are probably non-negotiable for you regardless of the path you choose.',
      tips: [
        'Create a simple table: Plan 1 vs Plan 2 vs Plan 3, rated on all four dimensions.',
        'Highlight elements that appear in 2 or 3 plans — those are your "must-haves."',
        'Ask: "What would a Plan 4 look like that combines the best of all three?"',
        'Share your plans with a trusted friend or mentor. Fresh eyes catch things you miss.',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'comparison', label: 'Plan Comparison', prompt: 'Compare your 3 plans. Which scores highest on Likability? Confidence? Coherence? What patterns do you see across all three?' },
          { id: 'mustHaves', label: 'Non-Negotiables', prompt: 'What elements appear in 2 or 3 plans? These are likely your non-negotiables regardless of path.' },
          { id: 'hybridPlan', label: 'The Hybrid (Plan 4)', prompt: 'If you could combine the best elements from all three plans, what would that look like?' },
        ],
      },
    },
    {
      number: '04',
      title: 'Pick Your Prototype',
      description: 'Choose one element from your plans to test in real life this week.',
      artifact: 'A specific prototype plan — one small experiment to test an element of your odyssey plans.',
      details: 'Life design isn\'t about finding the perfect plan and executing it. It\'s about running small experiments. Pick one element from any of your plans that you can test this week. If Plan 3 involves teaching, volunteer for one session. If Plan 2 involves a career switch, have a coffee chat with someone in that field. Prototypes are low-risk, high-learning experiments.',
      tips: [
        'The best prototypes are conversations. Talk to someone living a version of the life you\'re considering.',
        'Keep it small: one afternoon, not one year. You\'re testing, not committing.',
        'Ask yourself: "What would I need to believe for this plan to work?" Then test that belief.',
        'Document what you learn. This feeds directly into Module 8 (Prototype & Iterate).',
      ],
      resources: [
        { label: 'Designing Your Life — Prototyping', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'elementToTest', label: 'Element to Test', prompt: 'Which specific element from which plan are you going to test? Why this one?' },
          { id: 'prototype', label: 'Prototype Plan', prompt: 'How will you test it? Be specific: what, when, where, who, how long. Keep it to one week or less.' },
          { id: 'successCriteria', label: 'Success Criteria', prompt: 'How will you know if this prototype was informative? What questions will it answer?' },
        ],
      },
    },
    {
      number: '05',
      title: 'AI Build: Your Odyssey Visualizer',
      description: 'Use AI to add an interactive odyssey plan comparison view to your personal website.',
      artifact: 'A working Odyssey Plans page on your site with side-by-side plan views and dimension scores.',
      details: 'You\'ve created three life plans with ratings across four dimensions. Now build a visualizer on your personal site that brings them to life. Prompt AI to create a component that shows all three plans side by side with radar charts or bar charts for Resources, Likability, Confidence, and Coherence. Include your hybrid Plan 4. This becomes a living document you update as your thinking evolves.',
      tips: [
        'Copy all three plan descriptions and ratings from your Workbook and paste them into Claude.',
        'Try: "Create a React component that shows 3 Odyssey Plans side by side. Each plan has a title, description, and 4 scores (1-10). Show the scores as a radar chart or grouped bar chart. Use Recharts for the charts."',
        'Ask Claude to make the plans editable — so you can update descriptions and re-score as your thinking changes.',
        'Add your hybrid Plan 4 and highlight which elements came from which original plan.',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
        { label: 'Recharts — React Chart Library', url: 'https://recharts.org' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'aiPrompt', label: 'Your AI Prompt', prompt: 'Write the prompt you gave Claude to build your odyssey visualizer. What visualization style did you choose? What data did you include?' },
          { id: 'whatYouBuilt', label: 'What You Built', prompt: 'Describe your odyssey visualizer. How are plans displayed? What charts or comparisons does it show? Can you edit the plans?' },
          { id: 'nextIteration', label: 'What You\'d Improve', prompt: 'What would make this more useful? Timeline view? Milestone tracking? Links to prototypes you\'re running?' },
        ],
      },
    },
  ],
  5: [
    {
      number: '00',
      title: 'Your Identity Statement',
      description: 'Define who you want to become, not just what you want to achieve.',
      artifact: 'A written identity statement: "I am the type of person who..."',
      details: 'James Clear\'s central insight: lasting change comes from changing your identity, not your outcomes. Instead of "I want to lose weight" (outcome), think "I am a healthy person" (identity). Instead of "I want to write a book" think "I am a writer." This shift changes how you make daily decisions. Your identity statement becomes the filter for every habit you build in this module.',
      tips: [
        'Start with: "I am the type of person who..." and write 3-5 completions.',
        'Ground each statement in your values from Module 2. Your identity should reflect what matters to you.',
        'Don\'t pick aspirational identities that don\'t connect to real desire. Pick ones that feel true or almost-true.',
        'Every action is a vote for the person you want to become. The goal is to cast more votes for the right identity.',
      ],
      resources: [
        { label: 'Atomic Habits — Identity-Based Habits', url: 'https://jamesclear.com/identity-based-habits' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'identityStatements', label: 'Identity Statements', prompt: 'Write 3-5 "I am the type of person who..." statements. Ground them in your values from Module 2.' },
          { id: 'currentEvidence', label: 'Current Evidence', prompt: 'For each identity statement, what existing behaviors already support it? Even small ones count.' },
          { id: 'gapAnalysis', label: 'The Gaps', prompt: 'Where is the biggest gap between your stated identity and your current behavior? No judgment — just awareness.' },
        ],
      },
    },
    {
      number: '01',
      title: 'The Four Laws Audit',
      description: 'Evaluate your current habits against the Four Laws of Behavior Change.',
      artifact: 'An audit of 3-5 current habits scored against Obvious, Attractive, Easy, Satisfying.',
      details: 'Pick 3-5 habits you either want to build or break. For each one, score it against the Four Laws: Is the cue Obvious? Is it Attractive? Is the behavior Easy? Is the reward Satisfying? Good habits should score high on all four. Bad habits you want to break — apply the inversions: make them Invisible, Unattractive, Difficult, and Unsatisfying.',
      tips: [
        'Include at least one habit you want to build and one you want to break.',
        'For habits to build: find where the weakest law is. That\'s where to focus.',
        'For habits to break: find where it\'s strongest. That\'s what\'s keeping it alive.',
        'Use your Energy Audit (Module 3) — high-energy activities make great habit foundations.',
      ],
      resources: [
        { label: 'Atomic Habits — The Four Laws', url: 'https://jamesclear.com/three-steps-habit-change' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'habitsToAudit', label: 'Habits to Audit', prompt: 'List 3-5 habits (mix of ones to build and break). For each, briefly describe the habit.' },
          { id: 'fourLawsScores', label: 'Four Laws Scores', prompt: 'For each habit, rate 1-5 on: Obvious (cue visible?), Attractive (want to do it?), Easy (low friction?), Satisfying (reward?). Note the weakest law for each.' },
          { id: 'breakdowns', label: 'Biggest Insight', prompt: 'What\'s the biggest pattern you see? Which law is consistently weakest in the habits you want to build?' },
        ],
      },
    },
    {
      number: '02',
      title: 'Design Your Cues',
      description: 'Apply the 1st Law: make good habit cues obvious and bad habit cues invisible.',
      artifact: 'An environment design plan that makes your desired cues impossible to miss.',
      details: 'The 1st Law says behavior change starts with awareness. Use implementation intentions ("I will [BEHAVIOR] at [TIME] in [LOCATION]") and environment design to make cues for good habits impossible to miss. For bad habits, make cues invisible — move the phone out of the bedroom, hide the snacks, close the browser tabs.',
      tips: [
        'Write implementation intentions for each habit: "I will meditate for 2 minutes at 7am in the living room."',
        'Redesign your physical space: put your running shoes by the door, leave a book on your pillow.',
        'For digital habits, use app blockers, remove shortcuts, or change default screens.',
        'Habit stacking: "After I [CURRENT HABIT], I will [NEW HABIT]." Attach new habits to existing ones.',
      ],
      resources: [
        { label: 'Atomic Habits — Implementation Intentions', url: 'https://jamesclear.com/implementation-intentions' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'implementations', label: 'Implementation Intentions', prompt: 'For each habit to build, write: "I will [BEHAVIOR] at [TIME] in [LOCATION]."' },
          { id: 'environmentDesign', label: 'Environment Changes', prompt: 'What physical or digital changes will you make to your environment to make cues obvious (good habits) or invisible (bad habits)?' },
          { id: 'habitStacks', label: 'Habit Stacks', prompt: 'What existing habits can you attach new ones to? Write your chains: "After I [CURRENT], I will [NEW]."' },
        ],
      },
    },
    {
      number: '03',
      title: 'The Two-Minute Rule',
      description: 'Apply the 3rd Law: make every new habit so easy it takes less than two minutes.',
      artifact: 'Each target habit scaled down to a two-minute starter version.',
      details: 'The 3rd Law is about reducing friction. Every habit should have a "gateway" version that takes less than two minutes. "Read 30 pages" becomes "read one page." "Run 3 miles" becomes "put on running shoes." The point isn\'t to stay at two minutes forever — it\'s to master the art of showing up. Once you start, momentum usually carries you further.',
      tips: [
        'Scale down ruthlessly. "Study Japanese for 30 minutes" → "Open the textbook."',
        'The goal is to become the type of person who shows up consistently, not to have a perfect session.',
        'Use the "just show up" rule for the first 2 weeks. Literally just do the 2-minute version.',
        'Once showing up is automatic, gradually increase. But never skip the showing up part.',
      ],
      resources: [
        { label: 'Atomic Habits — The Two-Minute Rule', url: 'https://jamesclear.com/how-to-stop-procrastinating' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'twoMinuteVersions', label: 'Two-Minute Versions', prompt: 'For each habit, write the two-minute gateway version. Make it embarrassingly easy to start.' },
          { id: 'frictionReduction', label: 'Friction Reduction', prompt: 'What friction points exist for each habit? How can you reduce the number of steps between you and starting?' },
          { id: 'commitPlan', label: 'The Showing Up Commitment', prompt: 'Commit to doing ONLY the two-minute version for the next 7 days. No more, no less. What will you track?' },
        ],
      },
    },
    {
      number: '04',
      title: 'Reward & Track',
      description: 'Apply the 4th Law: make habits satisfying with immediate rewards and tracking.',
      artifact: 'A habit tracking plan with specific rewards and the "never miss twice" rule.',
      details: 'The 4th Law: what gets rewarded gets repeated. Add an immediate reward after each habit (not one that contradicts the habit — don\'t eat cake after exercising). Then track it. Habit tracking itself is satisfying — seeing a streak grow becomes its own reward. The cardinal rule: never miss twice. Missing once is an accident. Missing twice is the start of a new habit.',
      tips: [
        'Match rewards to the habit. After a run, enjoy a nice shower. After studying, watch one episode.',
        'Use a simple tracker: a calendar with X marks, a habit app, or the portal\'s journal.',
        'The "never miss twice" rule is your safety net. Life happens — but always get back on track the next day.',
        'Celebrate small wins. The feeling of satisfaction cements the habit loop.',
      ],
      resources: [
        { label: 'Atomic Habits — Habit Tracking', url: 'https://jamesclear.com/habit-tracker' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'rewards', label: 'Reward System', prompt: 'For each habit, what immediate reward will you give yourself? Make sure it aligns with your identity.' },
          { id: 'trackingMethod', label: 'Tracking Method', prompt: 'How will you track each habit? What tool or system? How will you make the tracking itself visible and satisfying?' },
          { id: 'neverMissTwice', label: 'Recovery Plan', prompt: 'When (not if) you miss a day, what\'s your plan to get back on track immediately? Write a specific "if-then" plan.' },
        ],
      },
    },
    {
      number: '05',
      title: 'AI Build: Your Habit Engine',
      description: 'Use AI to add a daily habit checklist with streak tracking to your personal website.',
      artifact: 'A working habit tracker on your site with checkboxes, streak counters, and the "never miss twice" alert.',
      details: 'Your identity statements and Four Laws audit defined the habits you want. Now build the engine that runs them. Prompt AI to create a daily habit checklist on your personal site — each habit gets a checkbox, a streak counter, and a visual indicator. Add a "never miss twice" alert that flags any habit where you\'ve missed one day. This is the tool you\'ll check every morning.',
      tips: [
        'Copy your habit list, two-minute versions, and reward system from the Workbook.',
        'Try: "Build a React habit tracker component. I have these 5 habits [list them]. Each needs a daily checkbox, a streak counter, and a \'never miss twice\' warning if I missed yesterday. Store data in localStorage."',
        'Ask Claude to add your habit stacks as a morning/evening view so you see the chain, not just individual habits.',
        'Color-code streaks: green for 7+, gold for 30+, red flash when you\'re at risk of missing twice.',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'aiPrompt', label: 'Your AI Prompt', prompt: 'Write the prompt you gave Claude to build your habit engine. What habits are tracked? How does the streak system work?' },
          { id: 'whatYouBuilt', label: 'What You Built', prompt: 'Describe your habit tracker. What does the daily view look like? How do streaks display? What happens when you miss a day?' },
          { id: 'nextIteration', label: 'What You\'d Improve', prompt: 'What would make this more useful? Weekly summary? Habit stack visualization? Integration with your identity statements?' },
        ],
      },
    },
  ],
  6: [
    {
      number: '00',
      title: 'The HWPL Assessment',
      description: 'Rate your current Health, Work, Play, and Love balance on a scale of 1-10.',
      artifact: 'A scored self-assessment across all four life areas with written reflections.',
      details: 'The DYL dashboard starts with an honest snapshot. Rate yourself 1-10 in four areas: Health (physical, mental, spiritual well-being), Work (career, projects, purpose), Play (fun, creativity, recreation), and Love (relationships, community, belonging). Be honest — this is a diagnostic, not a report card. Most people have at least one area that\'s significantly lower than the others.',
      tips: [
        'Don\'t overthink the scores. Your gut reaction is usually accurate.',
        'A "full" life isn\'t all 10s. It\'s about being intentional about the balance YOU want.',
        'Write 2-3 sentences for each area explaining why you gave that score.',
        'Use your Energy Audit (Module 3) to inform your ratings — energy patterns reveal a lot about HWPL.',
      ],
      resources: [
        { label: 'Designing Your Life — The Dashboard', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'scored-assessment',
        fields: [
          { id: 'scores', label: 'HWPL Scores', prompt: 'Rate each area 1-10: Health, Work, Play, Love. Add a brief note explaining each score.' },
        ],
      },
    },
    {
      number: '01',
      title: 'Deep Dive: Your Lowest Score',
      description: 'Analyze the area that scored lowest and understand why.',
      artifact: 'A root cause analysis of your lowest-scoring life area.',
      details: 'Take whichever HWPL area scored lowest and dig deeper. What specifically is contributing to the low score? Is it a recent change or a long-standing issue? What have you tried? What would a +2 improvement look like? The goal is to move from a vague "this area is bad" to specific, addressable factors.',
      tips: [
        'Use the "5 Whys" technique: keep asking "why?" to get past surface answers.',
        'Look at this area through the lens of your values (Module 2) and energy patterns (Module 3).',
        'A low score doesn\'t mean failure. Some areas might be deliberately lower because you\'re investing elsewhere.',
        'Define what a +2 improvement would concretely look like. Not a 10 — just better than now.',
      ],
      resources: [
        { label: 'The 5 Whys Technique', url: 'https://en.wikipedia.org/wiki/Five_whys' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'lowestArea', label: 'Lowest Area', prompt: 'Which area scored lowest? What specifically is contributing to this score? Use "5 Whys" to dig deeper.' },
          { id: 'rootCauses', label: 'Root Causes', prompt: 'What are the 2-3 root causes? Is this a recent change or long-standing? What have you tried already?' },
          { id: 'plusTwo', label: 'The +2 Vision', prompt: 'What would a +2 improvement look like concretely? What would be different in your daily life?' },
        ],
      },
    },
    {
      number: '02',
      title: 'Design Your Rebalance',
      description: 'Create specific actions to improve your lowest area without tanking the others.',
      artifact: 'A 30-day rebalance plan with weekly check-ins.',
      details: 'Design a 30-day experiment to improve your lowest-scoring area. The key constraint: it can\'t come at the expense of an area that\'s already working. Use your habit design skills from Module 5 — implementation intentions, two-minute rule, environment design. Break the 30 days into weekly milestones so you can track progress.',
      tips: [
        'Start with one change per week, not five. Build momentum, not overwhelm.',
        'Use habit stacking: attach new behaviors to existing routines.',
        'Schedule weekly check-ins with yourself (or use the portal\'s Check In feature).',
        'Tell someone about your plan. Accountability dramatically increases follow-through.',
      ],
      resources: [
        { label: 'Life Design Portal — Check In', url: '/portal' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'weeklyPlan', label: '4-Week Plan', prompt: 'Week 1-4: What specific change will you make each week? Be concrete with times, places, and actions.' },
          { id: 'protections', label: 'Protecting What Works', prompt: 'Which HWPL areas are strong right now? How will you make sure your rebalance plan doesn\'t undermine them?' },
          { id: 'checkInPlan', label: 'Check-In Schedule', prompt: 'When will you review progress? Who will hold you accountable? What metrics will you track?' },
        ],
      },
    },
    {
      number: '03',
      title: 'Build Your Dashboard',
      description: 'Create a personal life dashboard that you\'ll actually check regularly.',
      artifact: 'A configured life dashboard with your HWPL scores, tracking metrics, and review schedule.',
      details: 'Turn your HWPL assessment into a living dashboard. This can be in the portal, a spreadsheet, a journal, or whatever format you\'ll actually use. The key is that it\'s easy to update and visible. Set a recurring review — weekly or monthly — to re-score your HWPL and track trends over time. The dashboard is your early warning system for life getting out of balance.',
      tips: [
        'The best dashboard is the one you\'ll actually look at. Don\'t over-engineer it.',
        'Include your HWPL scores, your active habits from Module 5, and your current focus area.',
        'Set a calendar reminder for your review cycle. Monthly is a good starting frequency.',
        'The portal\'s Resources section has a sample HWPL dashboard you can reference.',
      ],
      resources: [
        { label: 'Life Design Portal — Resources', url: '/portal' },
      ],
      exercise: {
        type: 'reflection',
        fields: [
          { id: 'dashboardFormat', label: 'Dashboard Format', prompt: 'Where will your dashboard live? Portal, spreadsheet, notebook? What will it include beyond HWPL scores?' },
          { id: 'reviewCycle', label: 'Review Cycle', prompt: 'How often will you review? Weekly? Monthly? What day/time? Put it on your calendar.' },
          { id: 'keyMetrics', label: 'Key Metrics', prompt: 'Beyond HWPL, what 2-3 other metrics matter to you right now? (e.g., exercise days, social events, creative sessions)' },
        ],
      },
    },
    {
      number: '04',
      title: 'AI Build: Your HWPL Dashboard',
      description: 'Use AI to add interactive Health, Work, Play, Love gauges to your personal website.',
      artifact: 'A working HWPL dashboard on your site with gauges, score history, and trend visualization.',
      details: 'Turn your HWPL assessment into a real dashboard on your personal site. Prompt AI to create four visual gauges (one per area), the ability to re-score yourself, and a history view that shows how your scores change over time. This is your early warning system — when any area drops, you\'ll see it immediately instead of waiting until you feel it.',
      tips: [
        'Copy your HWPL scores and analysis from the Workbook to give Claude context.',
        'Try: "Build a React HWPL Dashboard with 4 circular gauges for Health, Work, Play, Love (each 1-10). Include a button to log new scores with a date. Show a line chart of score history over time using Recharts. Store data in localStorage."',
        'Ask Claude to color the gauges: red below 4, yellow 4-6, green 7+.',
        'Add your rebalance plan as a pinned note on whichever gauge scored lowest.',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
        { label: 'Recharts — React Chart Library', url: 'https://recharts.org' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'aiPrompt', label: 'Your AI Prompt', prompt: 'Write the prompt you gave Claude to build your HWPL dashboard. What visualization style? What scoring and history features?' },
          { id: 'whatYouBuilt', label: 'What You Built', prompt: 'Describe your dashboard. What do the gauges look like? Can you re-score? Is there a history view?' },
          { id: 'nextIteration', label: 'What You\'d Improve', prompt: 'What would make this dashboard part of your actual routine? Notifications? Weekly email? Integration with your habit tracker?' },
        ],
      },
    },
  ],
  7: [
    {
      number: '00',
      title: 'Your Habit Inventory',
      description: 'List every habit — good and bad — that\'s currently running in your life.',
      artifact: 'A complete habit inventory: all current daily and weekly behaviors categorized by impact.',
      details: 'Before you can design a system, you need to see what\'s already running. List every repeated behavior in your life: morning coffee, phone checking, exercise, snacking, reading, scrolling, cleaning, etc. Then mark each one: (+) serves your identity, (-) works against it, (=) neutral. This is your "habits scorecard" from Atomic Habits — awareness before action.',
      tips: [
        'Walk through your typical day hour by hour. What do you do on autopilot?',
        'Include weekly habits too: meal prep, laundry, date night, etc.',
        'Don\'t rush the +/-/= ratings. Some habits feel productive but don\'t serve your identity.',
        'Be honest about time spent on phone, social media, and passive entertainment.',
      ],
      resources: [
        { label: 'Atomic Habits — Habits Scorecard', url: 'https://jamesclear.com/habits-scorecard' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'positiveHabits', label: 'Positive Habits (+)', prompt: 'List all current habits that serve your identity and values. Include frequency and timing.' },
          { id: 'negativeHabits', label: 'Negative Habits (-)', prompt: 'List habits that work against your desired identity. Be honest — awareness is the first step.' },
          { id: 'neutralHabits', label: 'Neutral Habits (=)', prompt: 'List habits that are neither helpful nor harmful. Could any of these become anchors for habit stacking?' },
        ],
      },
    },
    {
      number: '01',
      title: 'Build Your Stacks',
      description: 'Design habit stacks that chain new behaviors to existing ones.',
      artifact: 'A set of habit stacks linking new desired habits to established routines.',
      details: 'Habit stacking is the most reliable way to build new habits. The formula: "After I [CURRENT HABIT], I will [NEW HABIT]." Chain multiple habits together to build routines. Your morning might become: After I pour coffee, I will write 3 gratitude items. After I write gratitude items, I will review today\'s priorities. After I review priorities, I will start my first deep work block.',
      tips: [
        'Start with your most reliable existing habits as anchors.',
        'Keep new additions to the 2-minute rule at first. The chain matters more than the length of each link.',
        'Write your stacks out and post them where you\'ll see them (bathroom mirror, desk, fridge).',
        'Test one stack at a time. Don\'t build a 10-habit morning routine on day one.',
      ],
      resources: [
        { label: 'Atomic Habits — Habit Stacking', url: 'https://jamesclear.com/habit-stacking' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'morningStack', label: 'Morning Stack', prompt: 'Design a morning habit stack. "After I [wake up/pour coffee/etc], I will..." Chain 2-4 habits.' },
          { id: 'workStack', label: 'Work/Productivity Stack', prompt: 'Design a work habit stack. "After I [sit at desk/open laptop/etc], I will..."' },
          { id: 'eveningStack', label: 'Evening Stack', prompt: 'Design an evening habit stack. "After I [eat dinner/finish work/etc], I will..."' },
        ],
      },
    },
    {
      number: '02',
      title: 'Environment Audit',
      description: 'Redesign your physical and digital spaces to support your habit systems.',
      artifact: 'A before/after environment design plan for your key spaces.',
      details: 'Your environment is the invisible hand that shapes your behavior. Audit your key spaces: bedroom, kitchen, workspace, phone. For each space, ask: what behaviors does this environment encourage? What would I change to make good habits the default and bad habits harder? This is about designing choice architecture — making the right thing the easiest thing.',
      tips: [
        'One space, one purpose. If your bedroom has a TV and a desk, both sleep and work suffer.',
        'For digital spaces: curate your phone home screen, unsubscribe from triggers, use app limits.',
        'Make good choices visible: put fruit on the counter, leave the guitar out, keep the journal open on the desk.',
        'Make bad choices invisible: put snacks in hard-to-reach places, charge the phone outside the bedroom.',
      ],
      resources: [
        { label: 'Atomic Habits — Environment Design', url: 'https://jamesclear.com/choice-architecture' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'physicalSpaces', label: 'Physical Spaces', prompt: 'Audit your key spaces (bedroom, kitchen, workspace). What does each environment currently encourage? What will you change?' },
          { id: 'digitalSpaces', label: 'Digital Spaces', prompt: 'Audit your phone, computer, and apps. What do your defaults encourage? What will you change?' },
          { id: 'changeList', label: 'Top 5 Changes', prompt: 'List the 5 most impactful environment changes you\'ll make this week. Be specific.' },
        ],
      },
    },
    {
      number: '03',
      title: 'Streak System',
      description: 'Set up a habit tracking system with streaks and the "never miss twice" rule.',
      artifact: 'A configured tracking system for your top 3-5 habits with streak goals.',
      details: 'Tracking is the 4th Law in action: making habits satisfying through visible progress. Choose your top 3-5 habits and set up a tracking system. This could be a paper calendar, a habit app, a spreadsheet, or the portal\'s Journal. The key metric is your streak — but remember the golden rule: never miss twice. A single miss is normal. Two in a row is the enemy.',
      tips: [
        'Track at the same time every day — right before bed works well for most people.',
        'Start with just 3 habits to track. You can add more once tracking itself becomes automatic.',
        'Use visual tracking: crossing off days on a calendar is more satisfying than tapping a phone.',
        'Celebrate milestones: 7-day streak, 30-day streak, 100-day streak. Tell someone about it.',
      ],
      resources: [
        { label: 'Atomic Habits — How to Track Habits', url: 'https://jamesclear.com/habit-tracker' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'habitsToTrack', label: 'Habits to Track', prompt: 'Which 3-5 habits will you track daily? For each: the habit, the two-minute version, and your tracking method.' },
          { id: 'streakGoals', label: 'Streak Goals', prompt: 'What are your streak milestones? (7 days, 30 days, etc.) How will you celebrate each one?' },
          { id: 'recoveryPlan', label: 'Recovery Protocol', prompt: 'When you miss a day (you will), what\'s your exact recovery plan? Write an "if-then" for each habit.' },
        ],
      },
    },
    {
      number: '04',
      title: 'The Weekly Review',
      description: 'Design your weekly habit review ritual.',
      artifact: 'A weekly review template and schedule for your habit systems.',
      details: 'Systems only work if you maintain them. Design a weekly review ritual: a specific time each week when you review your streaks, assess what\'s working, adjust what isn\'t, and recommit for the next week. This is where you integrate everything: HWPL dashboard, habit tracking, energy patterns, and journal reflections. The review is the habit that maintains all other habits.',
      tips: [
        'Sunday evening or Monday morning works well for most people. Pick one and protect it.',
        'Keep it to 15-20 minutes. Review your trackers, note wins and misses, plan next week.',
        'Use the Check In feature in the portal as part of your weekly review.',
        'Ask three questions: What went well? What didn\'t? What will I change next week?',
      ],
      resources: [
        { label: 'Life Design Portal — Check In', url: '/portal' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'reviewSchedule', label: 'Review Schedule', prompt: 'When is your weekly review? Day, time, location. Put it on your calendar right now.' },
          { id: 'reviewTemplate', label: 'Review Template', prompt: 'What will you review each week? List the specific things you\'ll check: streaks, HWPL, journal, etc.' },
          { id: 'adjustmentProcess', label: 'Adjustment Process', prompt: 'How will you decide what to change? What criteria will you use to drop a habit, modify one, or add a new one?' },
        ],
      },
    },
    {
      number: '05',
      title: 'AI Build: Your Weekly Review',
      description: 'Use AI to add a weekly review dashboard that pulls together all your life design tools.',
      artifact: 'A working weekly review page on your site that shows habit streaks, HWPL snapshot, energy trends, and a journal prompt.',
      details: 'The weekly review is the habit that maintains all other habits. Build a review page on your personal site that shows everything in one place: this week\'s habit streaks, current HWPL scores, recent energy log patterns, and a journal prompt. This becomes your Sunday evening ritual — open one page, see your whole life at a glance, and plan the week ahead.',
      tips: [
        'Copy your review template and schedule from the Workbook exercise.',
        'Try: "Build a React Weekly Review page that shows: (1) habit streak summary from my tracker, (2) current HWPL gauge snapshot, (3) this week\'s energy log entries, (4) a journal text area for reflections, and (5) three questions: What went well? What didn\'t? What will I change?"',
        'Ask Claude to pull data from the same localStorage your other components use, so everything stays connected.',
        'Add a "Week of [date]" header and let it save weekly reviews so you can look back over time.',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'aiPrompt', label: 'Your AI Prompt', prompt: 'Write the prompt you gave Claude to build your weekly review page. What data sources does it pull from? What sections does it include?' },
          { id: 'whatYouBuilt', label: 'What You Built', prompt: 'Describe your weekly review page. How does it connect to your other tools? What does the review workflow feel like?' },
          { id: 'nextIteration', label: 'What You\'d Improve', prompt: 'What would make your weekly review truly indispensable? Auto-generated insights? Comparison to last week? Streaks across weeks?' },
        ],
      },
    },
  ],
  8: [
    {
      number: '00',
      title: 'The Review',
      description: 'Look back at everything you\'ve built across all 7 modules.',
      artifact: 'A comprehensive review of your course journey: values, energy, plans, habits, and dashboard.',
      details: 'Before you iterate, take stock. Review everything you\'ve created: your Workview and Lifeview (Module 2), your Energy Audit (Module 3), your Odyssey Plans (Module 4), your Identity and Habits (Module 5), your HWPL Dashboard (Module 6), and your Habit Systems (Module 7). What has changed since you started? What surprised you most? What has already shifted in your daily life?',
      tips: [
        'Use your Workbook to review all exercise responses chronologically.',
        'Look for evolution: have your values shifted? Has your energy map changed?',
        'Note which tools you\'re actually using vs. which ones you abandoned. That\'s data.',
        'Ask Claude to analyze your workbook: "Here are my responses from 8 modules. What themes and growth do you see?"',
      ],
      resources: [
        { label: 'Life Design Portal — Workbook', url: '/portal' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'biggestShifts', label: 'Biggest Shifts', prompt: 'What has changed most since you started this course? In your thinking? Your daily life? Your self-understanding?' },
          { id: 'toolsUsed', label: 'Tools That Stuck', prompt: 'Which tools and frameworks are you still using? Which did you abandon? What does that tell you?' },
          { id: 'surprises', label: 'Surprises', prompt: 'What surprised you most about yourself through this process? What did you learn that you didn\'t expect?' },
        ],
      },
    },
    {
      number: '01',
      title: 'The Experiment Log',
      description: 'Document the results of any prototypes you\'ve already run.',
      artifact: 'A log of experiments tried, results observed, and lessons learned.',
      details: 'If you ran a prototype from Module 4 or made changes from Module 3\'s redesign, document the results. What happened? Did reality match your expectations? What would you do differently? Even if you haven\'t run formal experiments, you\'ve been making changes throughout this course — those count. Log every change you made and what you learned.',
      tips: [
        'Include both "successful" and "failed" experiments. Failed experiments often teach more.',
        'For each experiment, note: what you tested, what happened, what you learned, what\'s next.',
        'Connect back to your values and energy data. Did the results align with your predictions?',
        'If you haven\'t run any prototypes yet, this is your prompt to design one for this week.',
      ],
      resources: [
        { label: 'Designing Your Life — Prototyping', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'experiments', label: 'Experiments Run', prompt: 'List every change or experiment you\'ve made during this course. For each: what you tested and what happened.' },
          { id: 'lessons', label: 'Lessons Learned', prompt: 'What patterns do you see across your experiments? What worked? What consistently didn\'t?' },
          { id: 'nextExperiment', label: 'Next Experiment', prompt: 'Based on everything you\'ve learned, what\'s the most important experiment to run next?' },
        ],
      },
    },
    {
      number: '02',
      title: 'The Iteration Plan',
      description: 'Revise your Odyssey Plans and habits based on everything you\'ve learned.',
      artifact: 'Updated Odyssey Plan and habit system incorporating all your learnings.',
      details: 'With 7 modules of data, revisit your Odyssey Plans. Do they still feel right? Update them with what you\'ve learned about your energy, values, and habits. Also update your habit systems — drop what\'s not working, double down on what is, and add new experiments. Life design is iterative: the plans you made in Module 4 should evolve based on what you\'ve discovered.',
      tips: [
        'Re-score your Odyssey Plans: Resources, Likability, Confidence, Coherence. Have the scores changed?',
        'Look at your habit tracking data. Which habits stuck? Which faded? Why?',
        'Consider creating a Plan 5: an updated version of your hybrid plan from Module 4.',
        'Your values might have shifted. That\'s growth, not failure.',
      ],
      resources: [
        { label: 'Designing Your Life — Iterate', url: 'https://designingyour.life' },
      ],
      exercise: {
        type: 'timed-writing',
        timer: 15,
        fields: [
          { id: 'updatedPlan', label: 'Updated Life Plan', prompt: 'Write your updated Odyssey Plan incorporating everything you\'ve learned. What stays? What changes? What\'s new?' },
          { id: 'updatedHabits', label: 'Updated Habit System', prompt: 'Which habits will you keep, drop, or modify? What new habits will you add? Write your updated system.' },
          { id: 'nextQuarter', label: 'Next 90 Days', prompt: 'What are your top 3 priorities for the next 90 days? How will you prototype and iterate on them?' },
        ],
      },
    },
    {
      number: '03',
      title: 'The Showcase',
      description: 'Prepare to share your journey with your cohort.',
      artifact: 'A showcase presentation: your personal website, your journey, and your next steps.',
      details: 'You\'ve built a personal website, defined your values, mapped your energy, designed three life plans, built habit systems, and created a life dashboard. Now share what you\'ve learned with your cohort. Prepare a brief showcase: share your website, one key insight, and your next steps. The act of sharing crystallizes your learning and inspires others.',
      tips: [
        'Keep it short: 5 minutes max. Focus on your biggest insight and one concrete change you\'ve made.',
        'Show your website and explain one design decision that reflects your values.',
        'Share one "before and after" — something that shifted significantly during the course.',
        'Be vulnerable. The most impactful shares are honest, not polished.',
      ],
      resources: [
        { label: 'Your Personal Website', url: '/' },
      ],
      exercise: {
        type: 'timed-writing', timer: 15,
        fields: [
          { id: 'keyInsight', label: 'Key Insight', prompt: 'What is the single biggest thing you learned about yourself through this course?' },
          { id: 'concreteChange', label: 'Concrete Change', prompt: 'What is one specific, observable change you\'ve made in your life as a result of this course?' },
          { id: 'nextSteps', label: 'Next Steps', prompt: 'What are you going to do next? How will you continue the life design process after this course ends?' },
        ],
      },
    },
    {
      number: '04',
      title: 'The Build: Your Life Design App',
      description: 'Wire all your tools together into a single daily-use app you install on your phone.',
      artifact: 'A complete personal life management web app with a "Today" screen, all your tools connected, and PWA install capability.',
      details: 'This is the capstone. Throughout Modules 2-7, you built individual components: a values compass, energy tracker, odyssey visualizer, habit engine, HWPL dashboard, and weekly review. Now you\'ll use AI to wire them all together with navigation, a "Today" home screen, and PWA (Progressive Web App) support so you can install it on your phone like a native app. The "Today" screen shows: today\'s habits to check off, your current HWPL snapshot, your active odyssey plan, and a quick journal entry. This is the app you open every morning.',
      tips: [
        'Start by telling Claude about all the components you\'ve already built and ask it to create a navigation system that connects them.',
        'The key prompt: "I have these React components: [list them]. Create a main App shell with tab navigation at the bottom (Today, Habits, Dashboard, Plans, Review). Add a PWA manifest and service worker so it can be installed as a phone app."',
        'For the "Today" screen, ask Claude to pull today\'s habit checklist, show the HWPL gauges in mini form, display your top 3 values, and include a one-line journal input.',
        'To make it a PWA: ask Claude to add a manifest.json with your app name and icon, and a basic service worker. Then deploy to Vercel. You\'ll be able to "Add to Home Screen" on your phone.',
      ],
      resources: [
        { label: 'Claude — AI Assistant', url: 'https://claude.ai' },
        { label: 'PWA Guide — web.dev', url: 'https://web.dev/progressive-web-apps/' },
        { label: 'Vercel — Deploy', url: 'https://vercel.com/new' },
      ],
      exercise: {
        type: 'timed-writing',
        timer: 15,
        fields: [
          { id: 'appArchitecture', label: 'App Architecture', prompt: 'Describe your final app. What screens does it have? How do they connect? What does the "Today" home screen show?' },
          { id: 'buildProcess', label: 'The Build Process', prompt: 'Walk through how you built it with AI. What prompts worked best? What did you have to iterate on? What was hardest to get right?' },
          { id: 'dailyUse', label: 'Your Daily Routine', prompt: 'How will you use this app every day? What\'s your morning check-in look like? When do you do your weekly review? What makes this app worth opening daily?' },
          { id: 'liveUrl', label: 'Live URL', prompt: 'Paste the deployed URL of your life design app. If not deployed yet, describe your deployment plan.' },
        ],
      },
    },
  ],
};

// Milestone banners that appear between module steps (Claw Camp-style)
export const moduleMilestones = {
  1: [
    { afterStep: '05', title: 'FIRST SITE LIVE', message: 'You\'ve deployed your personal website to the internet. Now design your life.' },
  ],
  2: [
    { afterStep: '04', title: 'VALUES DEFINED', message: 'You know what matters. Now build the compass into your site.' },
    { afterStep: '05', title: 'COMPASS BUILT', message: 'Your values compass is live on your site. Time to map your energy.' },
  ],
  3: [
    { afterStep: '04', title: 'ENERGY MAPPED', message: 'You see what fuels and drains you. Now build the tracker into your site.' },
    { afterStep: '05', title: 'TRACKER BUILT', message: 'Your energy tracker is live. Time to explore alternate life paths.' },
  ],
  4: [
    { afterStep: '04', title: 'PATHS EXPLORED', message: 'Three possible lives mapped. Now build the visualizer into your site.' },
    { afterStep: '05', title: 'VISUALIZER BUILT', message: 'Your odyssey plans are live and visual. Time to build the habits that get you there.' },
  ],
  5: [
    { afterStep: '04', title: 'IDENTITY CLAIMED', message: 'You know who you\'re becoming. Now build the habit engine into your site.' },
    { afterStep: '05', title: 'HABIT ENGINE BUILT', message: 'Your daily habit tracker is live. Time to build your life dashboard.' },
  ],
  6: [
    { afterStep: '03', title: 'LIFE ASSESSED', message: 'Your HWPL scores are set. Now build the dashboard into your site.' },
    { afterStep: '04', title: 'DASHBOARD BUILT', message: 'Your HWPL dashboard is live. Time to systematize your habits.' },
  ],
  7: [
    { afterStep: '04', title: 'SYSTEMS DESIGNED', message: 'Your habit systems are planned. Now build the weekly review into your site.' },
    { afterStep: '05', title: 'REVIEW BUILT', message: 'Your weekly review page is live. Time to bring it all together.' },
  ],
  8: [
    { afterStep: '04', title: 'APP COMPLETE', message: 'Your personal life design app is built and deployed. Open it every morning. This is just the beginning.' },
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
