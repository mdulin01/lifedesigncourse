import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * useProgress — Firestore persistence for course step completion.
 *
 * Schema: progress/{userId} → { modules: { "1": ["01","02","03"], "2": ["01"] }, lastUpdated }
 *
 * Returns:
 *   - getCompletedSteps(moduleId) → Set of completed step numbers
 *   - isModuleComplete(moduleId, totalSteps) → boolean
 *   - toggleStepComplete(moduleId, stepNumber) → adds/removes step
 *   - loading
 */
export const useProgress = (user) => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real-time listener
  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(
      doc(db, 'progress', user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setProgressData(docSnap.data());
        } else {
          setProgressData({ modules: {} });
        }
        setLoading(false);
      },
      (error) => {
        console.error('[progress] onSnapshot error:', error);
        setLoading(false);
      }
    );

    return unsub;
  }, [user?.uid]);

  const getCompletedSteps = useCallback((moduleId) => {
    const steps = progressData?.modules?.[String(moduleId)] || [];
    return new Set(steps);
  }, [progressData]);

  const isModuleComplete = useCallback((moduleId, totalSteps) => {
    if (totalSteps === 0) return false;
    const completed = progressData?.modules?.[String(moduleId)] || [];
    return completed.length >= totalSteps;
  }, [progressData]);

  const toggleStepComplete = useCallback(async (moduleId, stepNumber) => {
    if (!user?.uid) return;

    const modKey = String(moduleId);
    const stepKey = String(stepNumber);
    const current = progressData?.modules?.[modKey] || [];
    let updated;

    if (current.includes(stepKey)) {
      updated = current.filter(s => s !== stepKey);
    } else {
      updated = [...current, stepKey];
    }

    // Optimistic update
    setProgressData(prev => ({
      ...prev,
      modules: { ...(prev?.modules || {}), [modKey]: updated },
    }));

    // Persist
    try {
      const docRef = doc(db, 'progress', user.uid);
      await setDoc(docRef, {
        modules: { ...(progressData?.modules || {}), [modKey]: updated },
        lastUpdated: new Date().toISOString(),
        userEmail: user.email || 'unknown',
      }, { merge: true });
    } catch (error) {
      console.error('[progress] save error:', error);
    }
  }, [user?.uid, user?.email, progressData]);

  return { getCompletedSteps, isModuleComplete, toggleStepComplete, loading };
};

export default useProgress;
