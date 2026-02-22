import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * useUserProfile — manages user profile in Firestore + lists all participants.
 *
 * Auto-creates a profile doc on first use.
 * Schema: users/{userId} → { displayName, email, photoURL, joinedAt }
 */
export const useUserProfile = (user) => {
  const [profile, setProfile] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ensure profile doc exists
  useEffect(() => {
    if (!user?.uid) { setLoading(false); return; }

    const userRef = doc(db, 'users', user.uid);

    // Listen for profile changes
    const unsub = onSnapshot(userRef, async (snap) => {
      if (snap.exists()) {
        setProfile({ id: snap.id, ...snap.data() });
      } else {
        // First time — create profile
        const newProfile = {
          displayName: user.displayName || 'User',
          email: user.email || '',
          photoURL: user.photoURL || '',
          joinedAt: new Date().toISOString(),
        };
        try {
          await setDoc(userRef, newProfile);
          setProfile({ id: user.uid, ...newProfile });
        } catch (err) {
          console.error('[userProfile] create error:', err);
        }
      }
      setLoading(false);
    }, (err) => {
      console.error('[userProfile] onSnapshot error:', err);
      setLoading(false);
    });

    return unsub;
  }, [user?.uid, user?.displayName, user?.email, user?.photoURL]);

  // Load all users (for directory)
  const loadAllUsers = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      const users = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllUsers(users);
      return users;
    } catch (err) {
      console.error('[userProfile] loadAllUsers error:', err);
      return [];
    }
  }, []);

  return { profile, allUsers, loadAllUsers, loading };
};

export default useUserProfile;
