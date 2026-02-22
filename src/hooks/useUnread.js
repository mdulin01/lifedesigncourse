import { useState, useEffect, useCallback } from 'react';
import { collection, doc, setDoc, onSnapshot, getDocs, increment } from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * useUnread — tracks unread message counts per channel.
 *
 * Schema: users/{userId}/unread/{teamId_channelId} → { count, lastRead }
 *
 * Returns totalUnread (for sidebar badge) and per-channel helpers.
 */
export const useUnread = (user) => {
  const [unreadMap, setUnreadMap] = useState({});   // { "teamId_channelId": count }
  const [totalUnread, setTotalUnread] = useState(0);

  // Listen to all unread docs
  useEffect(() => {
    if (!user?.uid) return;

    const unsub = onSnapshot(collection(db, 'users', user.uid, 'unread'), (snap) => {
      const map = {};
      let total = 0;
      snap.docs.forEach(d => {
        const count = d.data().count || 0;
        map[d.id] = count;
        total += count;
      });
      setUnreadMap(map);
      setTotalUnread(total);
    }, (err) => {
      console.error('[unread] onSnapshot error:', err);
    });

    return unsub;
  }, [user?.uid]);

  // Get unread count for a specific channel
  const getUnread = useCallback((teamId, channelId) => {
    return unreadMap[`${teamId}_${channelId}`] || 0;
  }, [unreadMap]);

  // Get total unread for a specific team
  const getTeamUnread = useCallback((teamId) => {
    let total = 0;
    Object.entries(unreadMap).forEach(([key, count]) => {
      if (key.startsWith(`${teamId}_`)) total += count;
    });
    return total;
  }, [unreadMap]);

  // Mark a channel as read
  const markRead = useCallback(async (teamId, channelId) => {
    if (!user?.uid) return;
    try {
      await setDoc(doc(db, 'users', user.uid, 'unread', `${teamId}_${channelId}`), {
        count: 0,
        lastRead: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.error('[unread] markRead error:', err);
    }
  }, [user?.uid]);

  // Increment unread for other team members (call after sending a message)
  const notifyOthers = useCallback(async (teamId, channelId, memberIds) => {
    if (!user?.uid) return;
    const others = memberIds.filter(id => id !== user.uid);

    // Batch increment for each other member
    for (const memberId of others) {
      try {
        const ref = doc(db, 'users', memberId, 'unread', `${teamId}_${channelId}`);
        await setDoc(ref, {
          count: increment(1),
          lastMessage: new Date().toISOString(),
        }, { merge: true });
      } catch (err) {
        // May fail if user hasn't created their unread doc yet — that's ok
        console.error('[unread] notifyOthers error:', err);
      }
    }
  }, [user?.uid]);

  return { totalUnread, getUnread, getTeamUnread, markRead, notifyOthers };
};

export default useUnread;
