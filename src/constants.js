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
