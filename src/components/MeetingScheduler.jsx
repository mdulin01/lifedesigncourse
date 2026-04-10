import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase-config';
import {
  collection, doc, setDoc, onSnapshot, query, deleteDoc,
} from 'firebase/firestore';
import { CalendarDays, Users, Check, Clock, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { allowedEmails } from '../constants';

// Firestore collection: meetingAvailability/{odeoId}
// Each doc: { uid, name, email, dateKey: "2026-04-21", slots: ["09","10","11",...] }

const COLLECTION = 'meetingAvailability';

// Time slots: 8 AM to 8 PM in 1-hour blocks
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8..20
const formatHour = (h) => {
  const suffix = h >= 12 ? 'PM' : 'AM';
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display} ${suffix}`;
};

// Generate biweekly candidate dates for 4 months from today
function generateCandidateDates() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 4);

  // Generate every day in the range, grouped by week
  // We'll show a calendar-style grid per month
  const dates = [];
  const cursor = new Date(today);
  cursor.setDate(cursor.getDate() + 1); // start tomorrow
  while (cursor <= endDate) {
    // Only weekdays (Mon-Fri)
    const day = cursor.getDay();
    if (day >= 1 && day <= 5) {
      dates.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

function toDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function groupByMonth(dates) {
  const groups = {};
  for (const d of dates) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = { label: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), dates: [] };
    groups[key].dates.push(d);
  }
  return Object.values(groups);
}

export default function MeetingScheduler({ user }) {
  const [allResponses, setAllResponses] = useState([]); // all docs from Firestore
  const [selectedDate, setSelectedDate] = useState(null); // date key being edited
  const [mySlots, setMySlots] = useState([]); // slots toggled for selectedDate
  const [saving, setSaving] = useState(false);
  const [monthIndex, setMonthIndex] = useState(0);

  const isAdmin = allowedEmails.includes(user?.email);
  const candidateDates = useMemo(() => generateCandidateDates(), []);
  const months = useMemo(() => groupByMonth(candidateDates), [candidateDates]);

  // Real-time listener
  useEffect(() => {
    const q = query(collection(db, COLLECTION));
    const unsub = onSnapshot(q, (snap) => {
      setAllResponses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  // Build lookup: dateKey → { total respondents for that date, slot → count, respondent names per slot }
  const availability = useMemo(() => {
    const map = {};
    for (const r of allResponses) {
      const dk = r.dateKey;
      if (!map[dk]) map[dk] = { respondents: new Set(), slots: {}, respondentNames: {} };
      map[dk].respondents.add(r.uid);
      for (const slot of (r.slots || [])) {
        map[dk].slots[slot] = (map[dk].slots[slot] || 0) + 1;
        if (!map[dk].respondentNames[slot]) map[dk].respondentNames[slot] = [];
        map[dk].respondentNames[slot].push(r.name || r.email?.split('@')[0]);
      }
    }
    return map;
  }, [allResponses]);

  // All unique respondents
  const allRespondents = useMemo(() => {
    const names = new Map();
    for (const r of allResponses) {
      if (!names.has(r.uid)) names.set(r.uid, r.name || r.email?.split('@')[0]);
    }
    return names;
  }, [allResponses]);

  // My existing response for selected date
  useEffect(() => {
    if (!selectedDate || !user) { setMySlots([]); return; }
    const mine = allResponses.find((r) => r.dateKey === selectedDate && r.uid === user.uid);
    setMySlots(mine?.slots || []);
  }, [selectedDate, allResponses, user]);

  const toggleSlot = (hour) => {
    const h = String(hour).padStart(2, '0');
    setMySlots((prev) => prev.includes(h) ? prev.filter((s) => s !== h) : [...prev, h].sort());
  };

  const saveMyAvailability = async () => {
    if (!user || !selectedDate) return;
    setSaving(true);
    try {
      const docId = `${user.uid}_${selectedDate}`;
      if (mySlots.length === 0) {
        // Remove response if no slots selected
        await deleteDoc(doc(db, COLLECTION, docId));
      } else {
        await setDoc(doc(db, COLLECTION, docId), {
          uid: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'Anonymous',
          email: user.email,
          dateKey: selectedDate,
          slots: mySlots,
        });
      }
    } catch (err) {
      console.error('Failed to save availability:', err);
    }
    setSaving(false);
  };

  // Find best slots: dates+hours where most people overlap
  const bestSlots = useMemo(() => {
    if (allRespondents.size < 2) return [];
    const results = [];
    for (const [dk, info] of Object.entries(availability)) {
      for (const [slot, count] of Object.entries(info.slots)) {
        if (count >= 2) {
          results.push({ dateKey: dk, slot, count, names: info.respondentNames[slot] });
        }
      }
    }
    results.sort((a, b) => b.count - a.count);
    return results.slice(0, 10);
  }, [availability, allRespondents]);

  // Heat level for a date cell (0-3 based on how many respondents)
  const dateHeat = (dk) => {
    const info = availability[dk];
    if (!info) return 0;
    const maxSlotCount = Math.max(0, ...Object.values(info.slots));
    if (maxSlotCount >= allRespondents.size && allRespondents.size >= 2) return 3;
    if (maxSlotCount >= 2) return 2;
    if (info.respondents.size > 0) return 1;
    return 0;
  };

  const heatColors = [
    '', // 0
    'bg-sky-500/15 border-sky-500/30', // 1: some interest
    'bg-sky-500/30 border-sky-500/50', // 2: good overlap
    'bg-emerald-500/30 border-emerald-500/50 ring-1 ring-emerald-400/30', // 3: everyone
  ];

  const myResponseExists = (dk) => allResponses.some((r) => r.dateKey === dk && r.uid === user?.uid);

  const currentMonth = months[monthIndex] || months[0];
  if (!currentMonth) return null;

  const dayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
  const dateFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="space-y-5">
      {/* Respondents count */}
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Users className="w-3.5 h-3.5" />
        <span>{allRespondents.size} {allRespondents.size === 1 ? 'person has' : 'people have'} responded</span>
        {allRespondents.size > 0 && (
          <span className="text-white/25">({[...allRespondents.values()].join(', ')})</span>
        )}
      </div>

      {/* Month navigation + calendar grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
            disabled={monthIndex === 0}
            className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 disabled:opacity-20 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-white">{currentMonth.label}</span>
          <button
            onClick={() => setMonthIndex((i) => Math.min(months.length - 1, i + 1))}
            disabled={monthIndex === months.length - 1}
            className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 disabled:opacity-20 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Date grid */}
        <div className="grid grid-cols-5 gap-1.5">
          {/* Day headers (Mon-Fri) */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
            <div key={d} className="text-[10px] text-white/25 text-center py-1">{d}</div>
          ))}

          {/* Offset for first week */}
          {currentMonth.dates.length > 0 && (() => {
            const firstDay = currentMonth.dates[0].getDay(); // 1=Mon
            const offset = firstDay - 1; // Mon=0 offset
            return Array.from({ length: offset }, (_, i) => (
              <div key={`pad-${i}`} />
            ));
          })()}

          {/* Date cells */}
          {currentMonth.dates.map((d) => {
            const dk = toDateKey(d);
            const heat = dateHeat(dk);
            const isSelected = selectedDate === dk;
            const hasMyResponse = myResponseExists(dk);
            const info = availability[dk];
            const respondentCount = info?.respondents?.size || 0;

            return (
              <button
                key={dk}
                onClick={() => setSelectedDate(isSelected ? null : dk)}
                className={`relative p-2 rounded-lg border text-center transition-all ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400/60 ring-1 ring-sky-400/30'
                    : heat > 0
                      ? heatColors[heat]
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <span className={`text-sm block ${isSelected ? 'text-sky-300 font-semibold' : 'text-white/70'}`}>
                  {d.getDate()}
                </span>
                <span className="text-[9px] text-white/25 block">{dayFmt.format(d)}</span>
                {/* Indicators */}
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {hasMyResponse && <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                  {respondentCount > 0 && (
                    <span className="text-[8px] text-white/30">{respondentCount}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 text-[10px] text-white/30">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-sky-400" /> You responded</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-sky-500/30 border border-sky-500/50" /> Overlap</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-emerald-500/30 border border-emerald-500/50" /> Everyone</div>
        </div>
      </div>

      {/* Time slot picker for selected date */}
      {selectedDate && (
        <div className="border border-sky-500/20 rounded-xl p-4 bg-sky-500/[0.03] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">
                {dateFmt.format(new Date(selectedDate + 'T12:00:00'))}
              </h4>
              <p className="text-xs text-white/30">Tap hours you're available</p>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-xs text-white/30 hover:text-white/60 transition"
            >✕</button>
          </div>

          {/* Hour grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
            {HOURS.map((h) => {
              const hKey = String(h).padStart(2, '0');
              const isMine = mySlots.includes(hKey);
              const info = availability[selectedDate];
              const othersCount = (info?.slots?.[hKey] || 0) - (isMine ? 1 : 0);
              const totalCount = info?.slots?.[hKey] || 0;
              const names = info?.respondentNames?.[hKey] || [];

              return (
                <button
                  key={h}
                  onClick={() => toggleSlot(h)}
                  title={names.length > 0 ? names.join(', ') : undefined}
                  className={`relative px-2 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                    isMine
                      ? 'bg-sky-500/25 border-sky-400/50 text-sky-300'
                      : othersCount > 0
                        ? 'bg-white/[0.06] border-white/15 text-white/60'
                        : 'bg-white/[0.02] border-white/8 text-white/40 hover:bg-white/[0.05]'
                  }`}
                >
                  <Clock className="w-3 h-3 inline mr-1 opacity-50" />
                  {formatHour(h)}
                  {totalCount > 0 && (
                    <span className={`block text-[9px] mt-0.5 ${totalCount >= allRespondents.size && allRespondents.size >= 2 ? 'text-emerald-400' : 'text-white/25'}`}>
                      {totalCount}/{allRespondents.size || 1}
                    </span>
                  )}
                  {isMine && <Check className="w-3 h-3 absolute top-1 right-1 text-sky-400" />}
                </button>
              );
            })}
          </div>

          {/* Save button */}
          <button
            onClick={saveMyAvailability}
            disabled={saving}
            className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-40"
          >
            {saving ? 'Saving...' : mySlots.length === 0 ? 'Clear My Availability' : `Save ${mySlots.length} Slot${mySlots.length !== 1 ? 's' : ''}`}
          </button>

          {/* Who else responded for this date */}
          {(() => {
            const others = allResponses.filter((r) => r.dateKey === selectedDate && r.uid !== user?.uid);
            if (others.length === 0) return null;
            return (
              <div className="text-xs text-white/30 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-white/20">Others on this date:</span>
                {others.map((r) => (
                  <div key={r.id} className="flex items-center gap-2">
                    <span className="text-white/50">{r.name}</span>
                    <span className="text-white/20">—</span>
                    <span>{r.slots.map((s) => formatHour(Number(s))).join(', ')}</span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Best overlapping slots */}
      {bestSlots.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-emerald-400/80 uppercase tracking-wider">Best Overlapping Times</h4>
          <div className="space-y-1.5">
            {bestSlots.map((s, i) => (
              <div
                key={`${s.dateKey}-${s.slot}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/15"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                  {s.count}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-white/80 block">
                    {dateFmt.format(new Date(s.dateKey + 'T12:00:00'))} · {formatHour(Number(s.slot))}–{formatHour(Number(s.slot) + 1)}
                  </span>
                  <span className="text-[10px] text-white/30">{s.names?.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
