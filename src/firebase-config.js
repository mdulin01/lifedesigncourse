// Firebase Configuration for lifedesigncourse.app
// REPLACE these placeholder values with your Firebase project credentials
// Get these from: https://console.firebase.google.com > Project Settings > General > Your apps

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

// SETUP INSTRUCTIONS:
//
// 1. Go to https://console.firebase.google.com
// 2. Click "Create a project" — name it "lifedesigncourse" or similar
// 3. Go to Project Settings (gear icon) > General
// 4. Scroll to "Your apps", click web icon (</>), register app
// 5. Copy the config values above
//
// 6. Enable Authentication:
//    - Go to Authentication > Sign-in method
//    - Enable "Google" provider
//    - Add authorized domains: lifedesigncourse.app, localhost
//
// 7. Enable Firestore:
//    - Go to Firestore Database > Create database
//    - Start in test mode for development
//
// 8. Enable Storage:
//    - Go to Storage > Get started
