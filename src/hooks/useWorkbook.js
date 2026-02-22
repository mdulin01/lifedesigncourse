import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * useWorkbook — Firestore persistence for participant workbook data.
 *
 * Schema: workbooks/{userId} → { moduleData: { "2": { "00": {...}, "01": {...} } }, lastUpdated, userEmail }
 */
export const useWorkbook = (user) => {
  const [workbookData, setWorkbookData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real-time listener
  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(
      doc(db, 'workbooks', user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setWorkbookData(docSnap.data());
        } else {
          setWorkbookData({ moduleData: {} });
        }
        setLoading(false);
      },
      (error) => {
        console.error('[workbook] onSnapshot error:', error);
        setLoading(false);
      }
    );

    return unsub;
  }, [user?.uid]);

  // Save exercise data for a specific module step
  const saveExercise = useCallback(async (moduleId, stepNumber, data) => {
    if (!user?.uid) return;

    try {
      const path = `moduleData.${moduleId}.${stepNumber}`;
      const updates = {
        [path]: {
          ...data,
          completedAt: new Date().toISOString(),
        },
        lastUpdated: new Date().toISOString(),
        userEmail: user.email || 'unknown',
      };

      // Strip undefined values
      const clean = JSON.parse(JSON.stringify(updates));
      await setDoc(doc(db, 'workbooks', user.uid), clean, { merge: true });
    } catch (error) {
      console.error('[workbook] save error:', error);
      throw error;
    }
  }, [user?.uid, user?.email]);

  // Get data for a specific module
  const getModuleData = useCallback((moduleId) => {
    return workbookData?.moduleData?.[String(moduleId)] || {};
  }, [workbookData]);

  // Get data for a specific step
  const getStepData = useCallback((moduleId, stepNumber) => {
    return workbookData?.moduleData?.[String(moduleId)]?.[String(stepNumber)] || null;
  }, [workbookData]);

  return { workbookData, loading, saveExercise, getModuleData, getStepData };
};

export default useWorkbook;
