import React, { useState } from 'react';
import { Heart, Briefcase, Gamepad2, Users, TrendingUp, Calendar, Target, Sparkles } from 'lucide-react';
import { dylCategories } from '../constants';

const gaugeConfig = {
  health: { icon: Heart, color: 'emerald', gradient: 'from-emerald-500 to-green-500' },
  work: { icon: Briefcase, color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
  play: { icon: Gamepad2, color: 'amber', gradient: 'from-amber-500 to-yellow-500' },
  love: { icon: Users, color: 'rose', gradient: 'from-rose-500 to-pink-500' },
};

export default function Dashboard({ user }) {
  // Local state for life balance (will move to Firestore later)
  const [balances, setBalances] = useState({ health: 6, work: 7, play: 4, love: 8 });
  const [editing, setEditing] = useState(null);

  const firstName = user?.displayName?.split(' ')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-white">{greeting}, {firstName}</h1>
        <p className="text-white/40 text-sm mt-1">Your life design dashboard</p>
      </div>

      {/* Life Balance Gauges — DYL Health/Work/Play/Love */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Life Balance</h2>
          </div>
          <span className="text-xs text-white/30">Designing Your Life — HWPL Dashboard</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {dylCategories.map(cat => {
            const config = gaugeConfig[cat.id];
            const Icon = config.icon;
            const value = balances[cat.id];

            return (
              <div
                key={cat.id}
                onClick={() => setEditing(editing === cat.id ? null : cat.id)}
                className={`bg-white/[0.03] border rounded-2xl p-4 cursor-pointer transition hover:bg-white/[0.06] ${
                  editing === cat.id ? `border-${config.color}-500/40` : 'border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 text-${config.color}-400`} />
                  <span className="text-sm font-semibold text-white">{cat.label}</span>
                  <span className="ml-auto text-lg font-bold text-white">{value}</span>
                </div>

                {/* Gauge bar */}
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${value * 10}%` }}
                  />
                </div>

                {/* Slider when editing */}
                {editing === cat.id && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={value}
                      onChange={(e) => setBalances(prev => ({ ...prev, [cat.id]: parseInt(e.target.value) }))}
                      className="w-full accent-emerald-400"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <p className="text-xs text-white/30 mt-1">{cat.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-white/20 text-center mt-4">Tap a gauge to adjust. These save to your profile.</p>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
          <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">0</div>
          <div className="text-xs text-white/30">Day Streak</div>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
          <Target className="w-5 h-5 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">0</div>
          <div className="text-xs text-white/30">Active Habits</div>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
          <Sparkles className="w-5 h-5 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">0/8</div>
          <div className="text-xs text-white/30">Modules Done</div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-2">Getting Started</h3>
        <div className="space-y-2">
          {[
            { done: false, text: 'Adjust your Life Balance gauges above' },
            { done: false, text: 'Define your Values & Life Compass' },
            { done: false, text: 'Start your first Good Time Journal entry' },
            { done: false, text: 'Create your first Odyssey Plan' },
            { done: false, text: 'Set up your first habit to track' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                item.done ? 'border-emerald-400 bg-emerald-400' : 'border-white/20'
              }`}>
                {item.done && <span className="text-[8px] text-black font-bold">✓</span>}
              </div>
              <span className={item.done ? 'text-white/40 line-through' : 'text-white/70'}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
