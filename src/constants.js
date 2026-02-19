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
