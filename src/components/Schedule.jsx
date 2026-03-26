import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle, X, ArrowLeft, RefreshCw } from 'lucide-react';
import { doc, setDoc, deleteDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';

// Participant registry (same as Survey)
const participants = [
  { name: 'Amy Gilbert', email: 'alewisgilbert.healthpolicy@gmail.com' },
  { name: 'Ellen-Marie Whelan', email: 'ellenmarie.whelan@gmail.com' },
  { name: 'Carrie Colla', email: 'carrie.h.colla@dartmouth.edu' },
  { name: 'Lucy Marcil', email: 'lumarcil@gmail.com' },
  { name: 'Tonya Moore', email: 'tonyamoore.healthpolicy@gmail.com' },
  { name: 'Wendi Gosliner', email: 'wendigosliner@gmail.com' },
  { name: 'Mary Mazanec', email: 'mary.mazanec@comcast.net' },
  { name: 'Carole Pratt', email: 'carolepratt12@gmail.com' },
  { name: 'Stephen Morales', email: 'stephen.a.morales@gmail.com' },
  { name: 'Mike Dulin', email: 'mdulin@gmail.com' },
  { name: 'Kate Cerulli', email: 'catherine_cerulli@urmc.rochester.edu' },
];

const instructors = [
  {
    id: 'cerulli',
    name: 'Dr. Kate Cerulli',
    title: 'CV Review & Career Strategy',
    description: 'Review your CV, discuss career positioning, and explore how your fellowship experience connects to your next chapter.',
    color: 'purple',
    emoji: '📋',
  },
  {
    id: 'dulin',
    name: 'Dr. Mike Dulin',
    title: 'AI Training & Implementation',
    description: 'Hands-on support building your personal site, using Claude for your work, and integrating AI tools into your practice.',
    color: 'emerald',
    emoji: '🤖',
  },
];

// 45-min slots on the hour (15-min break between)
const slotTimes = [
  { start: '1:00 PM', end: '1:45 PM' },
  { start: '2:00 PM', end: '2:45 PM' },
  { start: '3:00 PM', end: '3:45 PM' },
  { start: '4:00 PM', end: '4:45 PM' },
];

const days = [
  { id: 'apr9', label: 'Wednesday, April 9', short: 'Apr 9' },
  { id: 'apr10', label: 'Thursday, April 10', short: 'Apr 10' },
];

const colorMap = {
  purple: {
    bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400',
    activeBg: 'bg-purple-500/20', activeBorder: 'border-purple-500/40',
    btn: 'bg-purple-500/15 border-purple-500/25 text-purple-400 hover:bg-purple-500/25',
  },
  emerald: {
    bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400',
    activeBg: 'bg-emerald-500/20', activeBorder: 'border-emerald-500/40',
    btn: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25',
  },
};

export default function Schedule() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [matchedParticipant, setMatchedParticipant] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [bookings, setBookings] = useState({});
  const [confirmCancel, setConfirmCancel] = useState(null);

  // Auto-verify from URL params
  useEffect(() => {
    const paramEmail = searchParams.get('email');
    if (paramEmail && !matchedParticipant) {
      const cleaned = paramEmail.trim().toLowerCase();
      const match = participants.find(p => p.email.toLowerCase() === cleaned);
      if (match) {
        setEmail(cleaned);
        setMatchedParticipant(match);
      }
    }
  }, [searchParams]);

  // Listen to bookings in real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'scheduleBookings'), (snap) => {
      const data = {};
      snap.docs.forEach(d => {
        data[d.id] = d.data();
      });
      setBookings(data);
    });
    return unsub;
  }, []);

  const handleEmailSubmit = () => {
    const cleaned = email.trim().toLowerCase();
    const match = participants.find(p => p.email.toLowerCase() === cleaned);
    if (!match) {
      setEmailError('Email not found in participant list. Contact mdulin@gmail.com for help.');
      return;
    }
    setMatchedParticipant(match);
    setEmailError('');
  };

  const slotKey = (instructorId, dayId, slotIdx) => `${instructorId}_${dayId}_${slotIdx}`;

  const bookSlot = async (instructorId, dayId, slotIdx) => {
    const key = slotKey(instructorId, dayId, slotIdx);
    try {
      await setDoc(doc(db, 'scheduleBookings', key), {
        instructorId,
        dayId,
        slotIdx,
        participantName: matchedParticipant.name,
        participantEmail: matchedParticipant.email.toLowerCase(),
        bookedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error('Booking error:', e);
      alert('Failed to book slot. Please try again.');
    }
  };

  const cancelSlot = async (key) => {
    try {
      await deleteDoc(doc(db, 'scheduleBookings', key));
      setConfirmCancel(null);
    } catch (e) {
      console.error('Cancel error:', e);
      alert('Failed to cancel. Please try again.');
    }
  };

  const getSlotStatus = (instructorId, dayId, slotIdx) => {
    const key = slotKey(instructorId, dayId, slotIdx);
    const booking = bookings[key];
    if (!booking) return { status: 'open' };
    if (booking.participantEmail === matchedParticipant?.email?.toLowerCase()) {
      return { status: 'mine', key };
    }
    return { status: 'taken', name: booking.participantName };
  };

  // My bookings
  const myBookings = Object.entries(bookings)
    .filter(([_, b]) => b.participantEmail === matchedParticipant?.email?.toLowerCase())
    .map(([key, b]) => ({ key, ...b }));

  // Email entry
  if (!matchedParticipant) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <div className="text-4xl mb-4">📅</div>
            <h1 className="text-3xl font-bold text-white mb-2">One-on-One Sign-Up</h1>
            <p className="text-white/50 text-sm mb-1">April 9 & 10 · Afternoons · Washington, DC</p>
            <p className="text-white/30 text-xs">45-minute sessions with your instructors</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {instructors.map(inst => (
              <div key={inst.id} className={`${colorMap[inst.color].bg} border ${colorMap[inst.color].border} rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{inst.emoji}</span>
                  <span className={`font-medium text-sm ${colorMap[inst.color].text}`}>{inst.name}</span>
                </div>
                <p className="text-white/60 text-xs font-medium mb-1">{inst.title}</p>
                <p className="text-white/30 text-xs leading-relaxed">{inst.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
              placeholder="Enter your registered email"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/40 transition text-sm"
            />
            {emailError && <p className="text-red-400/80 text-sm mt-2">{emailError}</p>}
            <button
              onClick={handleEmailSubmit}
              disabled={!email.trim()}
              className="mt-4 w-full px-6 py-3 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/25 transition disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              View Available Slots
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main scheduling view
  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="border-b border-white/5 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-white/30 hover:text-white/60 transition">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-white font-semibold">One-on-One Sign-Up</h1>
              <p className="text-white/40 text-xs">{matchedParticipant.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* My bookings summary */}
        {myBookings.length > 0 && (
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Your Bookings</h3>
            <div className="space-y-2">
              {myBookings.map(b => {
                const inst = instructors.find(i => i.id === b.instructorId);
                const day = days.find(d => d.id === b.dayId);
                const slot = slotTimes[b.slotIdx];
                return (
                  <div key={b.key} className={`flex items-center gap-3 ${colorMap[inst.color].bg} border ${colorMap[inst.color].border} rounded-lg px-4 py-3`}>
                    <span>{inst.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${colorMap[inst.color].text}`}>{inst.title}</p>
                      <p className="text-white/40 text-xs">{day.short} · {slot.start} – {slot.end} ET</p>
                    </div>
                    <button
                      onClick={() => setConfirmCancel(b.key)}
                      className="text-white/20 hover:text-red-400/60 transition p-1"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cancel confirmation modal */}
        {confirmCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
              <p className="text-white/80 text-sm mb-4">Cancel this booking?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmCancel(null)}
                  className="flex-1 px-4 py-2.5 bg-white/[0.05] border border-white/10 text-white/60 rounded-xl text-sm hover:bg-white/[0.1] transition"
                >
                  Keep It
                </button>
                <button
                  onClick={() => cancelSlot(confirmCancel)}
                  className="flex-1 px-4 py-2.5 bg-red-500/15 border border-red-500/25 text-red-400 rounded-xl text-sm hover:bg-red-500/25 transition"
                >
                  Cancel Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructor sections */}
        {instructors.map(inst => {
          const colors = colorMap[inst.color];
          return (
            <div key={inst.id}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{inst.emoji}</span>
                <div>
                  <h2 className={`font-semibold ${colors.text}`}>{inst.name}</h2>
                  <p className="text-white/40 text-xs">{inst.title}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {days.map(day => (
                  <div key={day.id} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-white/5 bg-white/[0.01]">
                      <p className="text-white/60 text-sm font-medium">{day.label}</p>
                      <p className="text-white/20 text-xs">1:00 PM – 4:45 PM ET · 45 min each</p>
                    </div>
                    <div className="p-2 space-y-1.5">
                      {slotTimes.map((slot, idx) => {
                        const { status, key, name } = getSlotStatus(inst.id, day.id, idx);
                        return (
                          <div key={idx}>
                            {status === 'open' && (
                              <button
                                onClick={() => bookSlot(inst.id, day.id, idx)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition text-left ${colors.btn}`}
                              >
                                <Clock className="w-4 h-4 shrink-0 opacity-60" />
                                <span className="text-sm flex-1">{slot.start} – {slot.end}</span>
                                <span className="text-[10px] opacity-60">Book</span>
                              </button>
                            )}
                            {status === 'mine' && (
                              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${colors.activeBg} ${colors.activeBorder}`}>
                                <CheckCircle className={`w-4 h-4 shrink-0 ${colors.text}`} />
                                <span className={`text-sm flex-1 font-medium ${colors.text}`}>{slot.start} – {slot.end}</span>
                                <span className={`text-[10px] ${colors.text} opacity-80`}>You</span>
                              </div>
                            )}
                            {status === 'taken' && (
                              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/5 bg-white/[0.01] opacity-50">
                                <User className="w-4 h-4 shrink-0 text-white/20" />
                                <span className="text-sm flex-1 text-white/30">{slot.start} – {slot.end}</span>
                                <span className="text-[10px] text-white/20">{name?.split(' ')[0]}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <p className="text-white/15 text-xs text-center pt-4">
          You can book sessions with both instructors. Cancel and rebook anytime before April 9.
        </p>
      </div>
    </div>
  );
}
