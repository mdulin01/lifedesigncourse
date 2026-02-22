# lifedesigncourse.app Project Guidelines

## Project Switching Rule

**When switching between projects, follow these steps:**

1. Close all Chrome browser tabs and windows first
2. Open only the tabs relevant to the current project:
   - Vercel (deployment/hosting)
   - Firebase Console (backend/database)
   - Google Cloud Console (if applicable)
   - GitHub (repository)
   - Live site (the deployed application)

This ensures Chrome only shows tabs for the active project, avoiding confusion and maintaining a clean workspace.

---

## Project Overview

**lifedesigncourse.app** is a web application for delivering life design course content, enabling users to engage with course materials, track progress, and participate in community discussions.

---

## Key URLs & Resources

| Resource | URL |
|----------|-----|
| **Live Site** | https://lifedesigncourse.app |
| **GitHub Repository** | https://github.com/mdulin01/lifedesigncourse |
| **Firebase Console** | https://console.firebase.google.com/project/lifedesigncourse |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Google Cloud Console** | https://console.cloud.google.com |

---

## Technical Stack

- **Frontend Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Backend/Database:** Firebase (Firestore, Authentication, Storage)
- **Deployment:** Vercel
- **Version Control:** GitHub (mdulin01/lifedesigncourse)

---

## Project Structure

```
lifedesigncourse/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── services/        # Firebase and API services
│   ├── styles/          # Global styles
│   └── App.jsx          # Main app component
├── public/              # Static assets
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── .env                 # Environment variables (not in git)
└── firestore.rules      # Firestore security rules
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (typically http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

---

## Firebase Setup

- **Project ID:** lifedesigncourse
- **Database:** Firestore
- **Authentication:** Enabled
- **Storage:** Enabled for course materials and user uploads
- **Security Rules:** See `firestore.rules` in project root

---

## Environment Variables

The `.env` file should contain:
- Firebase API keys and configuration
- Other sensitive configuration (not committed to git)

Check with team members for current `.env` values if starting fresh.

---

## Deployment Notes

- **Hosting:** Vercel
- **Custom Domain:** lifedesigncourse.app
- **Branch Deployments:** Automatic from GitHub pushes
- **Production Build:** Auto-triggered on main/master branch commits

---

## Before Starting Work

1. Ensure all dependencies are installed: `npm install`
2. Verify `.env` file has necessary API keys
3. Check Firebase Console for Firestore data status
4. Verify Vercel deployment health at https://vercel.com/dashboard
5. Test the live site to confirm it's accessible
