import React from 'react';
import { Map, Rocket, Lightbulb, Heart } from 'lucide-react';

export default function OdysseyPlanner() {
  const plans = [
    { id: 1, title: 'Life One', subtitle: 'Your current path', desc: 'What does your life look like if you keep doing what you\'re doing?', icon: Rocket, color: 'blue' },
    { id: 2, title: 'Life Two', subtitle: 'The alternate path', desc: 'What would you do if your current career disappeared tomorrow?', icon: Lightbulb, color: 'purple' },
    { id: 3, title: 'Life Three', subtitle: 'The wild card', desc: 'What would you do if money and image didn\'t matter at all?', icon: Heart, color: 'rose' },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Odyssey Plans</h1>
        <p className="text-white/40 text-sm mt-1">Design three possible 5-year life paths — there's never just one right answer</p>
      </div>

      <div className="space-y-4">
        {plans.map(plan => {
          const Icon = plan.icon;
          return (
            <div key={plan.id} className={`bg-${plan.color}-500/5 border border-${plan.color}-500/20 rounded-2xl p-6`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl bg-${plan.color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${plan.color}-400`} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{plan.title}</h2>
                  <p className="text-xs text-white/40">{plan.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-white/50 mb-4">{plan.desc}</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-h-[100px] flex items-center justify-center">
                <span className="text-white/20 text-sm">Coming in Module 4</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
