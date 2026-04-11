import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth, googleProvider } from './firebase-config';
import {
  signInWithPopup, onAuthStateChanged, signOut,
  sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink,
} from 'firebase/auth';
import { BTSProvider } from './contexts/BTSContext';
import CourseLanding from './components/CourseLanding';
import Portal from './components/Portal';
import TrainingSurvey from './components/TrainingSurvey';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailLinkSent, setEmailLinkSent] = useState(false);
  const [showEmailOption, setShowEmailOption] = useState(false);

  // Handle email link sign-in callback
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(() => {
            window.localStorage.removeItem('emailForSignIn');
          })
          .catch((err) => {
            console.error('Email link sign-in failed:', err);
            setAuthError('Email sign-in failed: ' + err.message);
          });
      }
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  const handleSignIn = async () => {
    try {
      setAuthError('');
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      if (e.code !== 'auth/popup-closed-by-user') {
        setAuthError('Sign-in failed: ' + e.message);
      }
    }
  };

  const handleEmailLinkSignIn = async () => {
    if (!emailInput.trim()) return;
    try {
      setAuthError('');
      const actionCodeSettings = {
        url: window.location.origin + window.location.pathname,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, emailInput.trim(), actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', emailInput.trim());
      setEmailLinkSent(true);
    } catch (e) {
      setAuthError('Failed to send sign-in link: ' + e.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const SignInBlock = () => (
    <div className="space-y-4">
      <button
        onClick={handleSignIn}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl transition active:scale-[0.98] shadow-lg"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Sign in with Google
      </button>

      {!showEmailOption ? (
        <button
          onClick={() => setShowEmailOption(true)}
          className="w-full text-sm text-white/40 hover:text-white/60 transition py-2"
        >
          No Google account? Sign in with email
        </button>
      ) : emailLinkSent ? (
        <div className="text-center py-3 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <p className="text-sm text-emerald-400 font-medium">Check your email!</p>
          <p className="text-xs text-white/40 mt-1">We sent a sign-in link to {emailInput}</p>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20"
            onKeyDown={(e) => e.key === 'Enter' && handleEmailLinkSignIn()}
          />
          <button
            onClick={handleEmailLinkSignIn}
            disabled={!emailInput.trim()}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Send sign-in link
          </button>
        </div>
      )}

      {authError && <p className="mt-2 text-red-400 text-sm text-center">{authError}</p>}
    </div>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BTSProvider>
      <Routes>
        <Route path="/survey" element={
          user ? (
            <div className="min-h-screen bg-slate-950 px-4 py-8">
              <div className="max-w-lg mx-auto">
                <div className="mb-6">
                  <div className="text-3xl mb-2">📋</div>
                  <h1 className="text-xl font-bold text-white">Training Feedback Survey</h1>
                  <p className="text-sm text-white/40 mt-1">Help us improve future sessions</p>
                </div>
                <TrainingSurvey user={user} />
                <div className="mt-8 text-center">
                  <a href="/portal" className="text-emerald-400/60 hover:text-emerald-400 text-sm transition">
                    Go to Portal →
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
              <div className="w-full max-w-sm text-center">
                <div className="mb-8">
                  <div className="text-5xl mb-4">📋</div>
                  <h1 className="text-2xl font-bold text-white mb-1">Training Feedback Survey</h1>
                  <p className="text-white/50 text-sm">Sign in to submit your feedback</p>
                </div>
                <SignInBlock />
              </div>
            </div>
          )
        } />
        <Route path="/portal/*" element={
          user ? (
            <Portal user={user} onSignOut={handleSignOut} />
          ) : (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
              <div className="w-full max-w-sm text-center">
                <div className="mb-8">
                  <div className="text-5xl mb-4">🤖</div>
                  <h1 className="text-2xl font-bold text-white mb-1">AI Life Design Portal</h1>
                  <p className="text-white/50 text-sm">Sign in to access your tools</p>
                </div>
                <SignInBlock />
                <a href="/" className="block mt-6 text-emerald-400/60 hover:text-emerald-400 text-sm transition">
                  ← Back to course
                </a>
              </div>
            </div>
          )
        } />
        <Route path="*" element={
          <CourseLanding onSignIn={handleSignIn} user={user} onSignOut={handleSignOut} />
        } />
      </Routes>
    </BTSProvider>
  );
}
