import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { CheckCircle2, Send, Loader2 } from 'lucide-react';

const COLLECTION = 'trainingSurveys';

// Likert scale options
const SCALE = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

const QUESTIONS = [
  {
    id: 'overall',
    section: 'Overall Experience',
    items: [
      { id: 'overall_valuable', text: 'The training sessions were a valuable use of my time.' },
      { id: 'overall_organized', text: 'The sessions were well-organized and easy to follow.' },
      { id: 'overall_pace', text: 'The pace of the training was appropriate.' },
      { id: 'overall_recommend', text: 'I would recommend this training to a colleague.' },
    ],
  },
  {
    id: 'ai_skills',
    section: 'AI & Vibe Coding',
    items: [
      { id: 'ai_confidence', text: 'I feel more confident using AI tools (e.g., Claude) after the training.' },
      { id: 'ai_practical', text: 'I learned practical skills I can apply to my own projects.' },
      { id: 'ai_website', text: 'The website-building exercise helped me understand how AI can assist with coding.' },
      { id: 'ai_continue', text: 'I plan to continue using AI tools in my work after this training.' },
    ],
  },
  {
    id: 'life_design',
    section: 'Life Design Concepts',
    items: [
      { id: 'ld_values', text: 'The values and life compass exercises were meaningful to me.' },
      { id: 'ld_energy', text: 'The energy audit / time study helped me see my priorities more clearly.' },
      { id: 'ld_reflection', text: 'The exercises gave me useful insights about myself.' },
    ],
  },
  {
    id: 'open',
    section: 'Open Feedback',
    items: [
      { id: 'open_best', text: 'What was the most valuable part of the training?', type: 'textarea' },
      { id: 'open_improve', text: 'What could be improved for future sessions?', type: 'textarea' },
      { id: 'open_surprise', text: 'Was there anything that surprised you or changed your perspective?', type: 'textarea' },
      { id: 'open_other', text: 'Any other comments or suggestions?', type: 'textarea' },
    ],
  },
];

function LikertRow({ question, value, onChange }) {
  return (
    <div className="py-3">
      <p className="text-sm text-white/80 mb-2.5">{question.text}</p>
      <div className="flex gap-1.5">
        {SCALE.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(question.id, opt.value)}
            className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all ${
              value === opt.value
                ? 'bg-emerald-500/25 border-emerald-400/50 text-emerald-300 ring-1 ring-emerald-400/30'
                : 'bg-white/[0.03] border-white/10 text-white/40 hover:bg-white/[0.06]'
            } border`}
            title={opt.label}
          >
            <span className="block text-base">{opt.value}</span>
            <span className="block text-[8px] leading-tight mt-0.5 opacity-60 hidden sm:block">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TextQuestion({ question, value, onChange }) {
  return (
    <div className="py-3">
      <p className="text-sm text-white/80 mb-2">{question.text}</p>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(question.id, e.target.value)}
        rows={3}
        placeholder="Your thoughts..."
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition resize-none"
      />
    </div>
  );
}

export default function TrainingSurvey({ user }) {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load existing response
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, COLLECTION, user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setResponses(data.responses || {});
          setSubmitted(data.submitted || false);
        }
      } catch (err) {
        console.error('Failed to load survey:', err);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const updateResponse = (questionId, value) => {
    if (submitted) return;
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  // Auto-save draft every time responses change
  useEffect(() => {
    if (!user || loading || submitted) return;
    const timeout = setTimeout(async () => {
      try {
        await setDoc(doc(db, COLLECTION, user.uid), {
          uid: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'Anonymous',
          email: user.email,
          responses,
          submitted: false,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } catch (err) {
        console.error('Auto-save failed:', err);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [responses, user, loading, submitted]);

  const handleSubmit = async () => {
    if (!user || saving) return;
    setSaving(true);
    try {
      await setDoc(doc(db, COLLECTION, user.uid), {
        uid: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        email: user.email,
        responses,
        submitted: true,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submit failed:', err);
    }
    setSaving(false);
  };

  // Count answered likert questions
  const likertQuestions = QUESTIONS.flatMap((s) => s.items.filter((q) => !q.type));
  const answeredCount = likertQuestions.filter((q) => responses[q.id]).length;
  const totalLikert = likertQuestions.length;
  const allLikertAnswered = answeredCount === totalLikert;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-3">
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
        <h3 className="text-lg font-semibold text-white">Thank you!</h3>
        <p className="text-sm text-white/50">Your feedback has been submitted. We appreciate your time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-white/40">
          Please rate your experience from the past 2 days. Your responses are saved automatically and will help us improve future sessions.
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${(answeredCount / totalLikert) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-white/30 tabular-nums">{answeredCount}/{totalLikert}</span>
        </div>
      </div>

      {/* Likert scale legend */}
      <div className="flex justify-between text-[9px] text-white/25 px-1">
        <span>1 = Strongly Disagree</span>
        <span>3 = Neutral</span>
        <span>5 = Strongly Agree</span>
      </div>

      {QUESTIONS.map((section) => (
        <div key={section.id}>
          <h4 className="text-xs font-semibold text-emerald-400/80 uppercase tracking-wider mb-1">{section.section}</h4>
          <div className="divide-y divide-white/5">
            {section.items.map((q) =>
              q.type === 'textarea' ? (
                <TextQuestion key={q.id} question={q} value={responses[q.id]} onChange={updateResponse} />
              ) : (
                <LikertRow key={q.id} question={q} value={responses[q.id]} onChange={updateResponse} />
              )
            )}
          </div>
        </div>
      ))}

      {/* Submit */}
      <div className="pb-8">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
          ) : (
            <><Send className="w-4 h-4" /> Submit Survey</>
          )}
        </button>
        {!allLikertAnswered && (
          <p className="text-xs text-white/50 text-center mt-2">{answeredCount}/{totalLikert} rated questions answered</p>
        )}
      </div>
    </div>
  );
}
