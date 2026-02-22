import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, runTransaction } from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * useWorkbook — Firestore persistence for participant workbook data.
 *
 * Schema: workbooks/{userId} → { moduleData: { "2": { "00": {...}, "01": {...} } }, lastUpdated, userEmail }
 *
 * Uses runTransaction for saves to force server round-trip and properly
 * detect permission errors (setDoc resolves from offline cache even when
 * the server rejects the write).
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
  // Uses runTransaction to guarantee server round-trip (catches permission errors immediately)
  const saveExercise = useCallback(async (moduleId, stepNumber, data) => {
    if (!user?.uid) return;

    try {
      const docRef = doc(db, 'workbooks', user.uid);

      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        const existing = docSnap.exists() ? docSnap.data() : { moduleData: {} };

        const moduleData = existing.moduleData || {};
        const modData = moduleData[String(moduleId)] || {};
        modData[String(stepNumber)] = {
          ...data,
          completedAt: new Date().toISOString(),
        };
        moduleData[String(moduleId)] = modData;

        const clean = JSON.parse(JSON.stringify({
          moduleData,
          lastUpdated: new Date().toISOString(),
          userEmail: user.email || 'unknown',
        }));

        transaction.set(docRef, clean, { merge: true });
      });
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
