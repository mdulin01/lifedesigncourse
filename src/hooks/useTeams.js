import { useState, useEffect, useCallback } from 'react';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, getDocs, arrayUnion, arrayRemove, writeBatch } from 'firebase/firestore';
import { db } from '../firebase-config';
import { courseModules } from '../constants';

/**
 * useTeams — manage teams + channels.
 *
 * Schema:
 *   teams/{teamId} → { name, description, createdBy, createdAt, memberIds }
 *   teams/{teamId}/channels/{channelId} → { name, type, moduleId?, createdAt }
 */
export const useTeams = (user) => {
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener on all teams
  useEffect(() => {
    if (!user?.uid) { setLoading(false); return; }

    const unsub = onSnapshot(collection(db, 'teams'), (snap) => {
      const teams = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllTeams(teams);
      setLoading(false);
    }, (err) => {
      console.error('[teams] onSnapshot error:', err);
      setLoading(false);
    });

    return unsub;
  }, [user?.uid]);

  // Teams the current user belongs to
  const myTeams = allTeams.filter(t => (t.memberIds || []).includes(user?.uid));

  // Create a new team with auto-generated module channels
  const createTeam = useCallback(async (name, description = '') => {
    if (!user?.uid) return null;

    const teamRef = doc(collection(db, 'teams'));
    const teamData = {
      name,
      description,
      createdBy: user.uid,
      createdAt: new Date().toISOString(),
      memberIds: [user.uid],
    };

    try {
      const batch = writeBatch(db);
      batch.set(teamRef, teamData);

      // Auto-create a channel for each course module
      courseModules.forEach((mod) => {
        const chanRef = doc(collection(db, 'teams', teamRef.id, 'channels'));
        batch.set(chanRef, {
          name: `Module ${mod.id}: ${mod.title}`,
          type: 'module',
          moduleId: mod.id,
          createdAt: new Date().toISOString(),
        });
      });

      // Also create a General channel
      const generalRef = doc(collection(db, 'teams', teamRef.id, 'channels'));
      batch.set(generalRef, {
        name: 'General',
        type: 'custom',
        createdAt: new Date().toISOString(),
      });

      await batch.commit();
      return teamRef.id;
    } catch (err) {
      console.error('[teams] create error:', err);
      return null;
    }
  }, [user?.uid]);

  // Join a team
  const joinTeam = useCallback(async (teamId) => {
    if (!user?.uid) return;
    try {
      await updateDoc(doc(db, 'teams', teamId), {
        memberIds: arrayUnion(user.uid),
      });
    } catch (err) {
      console.error('[teams] join error:', err);
    }
  }, [user?.uid]);

  // Leave a team
  const leaveTeam = useCallback(async (teamId) => {
    if (!user?.uid) return;
    try {
      await updateDoc(doc(db, 'teams', teamId), {
        memberIds: arrayRemove(user.uid),
      });
    } catch (err) {
      console.error('[teams] leave error:', err);
    }
  }, [user?.uid]);

  // Get channels for a team
  const getChannels = useCallback(async (teamId) => {
    try {
      const snap = await getDocs(collection(db, 'teams', teamId, 'channels'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('[teams] getChannels error:', err);
      return [];
    }
  }, []);

  // Create a custom channel in a team
  const createChannel = useCallback(async (teamId, name) => {
    if (!user?.uid) return null;
    try {
      const chanRef = doc(collection(db, 'teams', teamId, 'channels'));
      await setDoc(chanRef, {
        name,
        type: 'custom',
        createdAt: new Date().toISOString(),
      });
      return chanRef.id;
    } catch (err) {
      console.error('[teams] createChannel error:', err);
      return null;
    }
  }, [user?.uid]);

  return { allTeams, myTeams, loading, createTeam, joinTeam, leaveTeam, getChannels, createChannel };
};

export default useTeams;
