import { useState, useEffect, useCallback } from 'react';
import { collection, doc, setDoc, onSnapshot, query, orderBy, limit, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * useMessages — real-time message stream for a team channel.
 *
 * Schema: teams/{teamId}/channels/{channelId}/messages/{messageId}
 *   → { userId, senderName, senderEmail, content, type, metadata, createdAt }
 */
export const useMessages = (user, teamId, channelId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener on messages, sorted by createdAt
  useEffect(() => {
    if (!teamId || !channelId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'teams', teamId, 'channels', channelId, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(200)
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => {
      console.error('[messages] onSnapshot error:', err);
      setLoading(false);
    });

    return unsub;
  }, [teamId, channelId]);

  // Send a message
  const sendMessage = useCallback(async (content, type = 'text', metadata = null) => {
    if (!user?.uid || !teamId || !channelId || !content.trim()) return;

    const msgRef = doc(collection(db, 'teams', teamId, 'channels', channelId, 'messages'));
    const msgData = {
      userId: user.uid,
      senderName: user.displayName || 'User',
      senderEmail: user.email || '',
      content: content.trim(),
      type,
      createdAt: new Date().toISOString(),
    };
    if (metadata) msgData.metadata = metadata;

    try {
      await setDoc(msgRef, msgData);
    } catch (err) {
      console.error('[messages] send error:', err);
    }
  }, [user?.uid, user?.displayName, user?.email, teamId, channelId]);

  // Delete own message
  const deleteMessage = useCallback(async (messageId) => {
    if (!teamId || !channelId) return;
    try {
      await deleteDoc(doc(db, 'teams', teamId, 'channels', channelId, 'messages', messageId));
    } catch (err) {
      console.error('[messages] delete error:', err);
    }
  }, [teamId, channelId]);

  // Edit own message
  const editMessage = useCallback(async (messageId, newContent) => {
    if (!teamId || !channelId) return;
    try {
      await updateDoc(doc(db, 'teams', teamId, 'channels', channelId, 'messages', messageId), {
        content: newContent,
        editedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[messages] edit error:', err);
    }
  }, [teamId, channelId]);

  return { messages, loading, sendMessage, deleteMessage, editMessage };
};

export default useMessages;
