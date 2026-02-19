import React from 'react';
import { Compass, FileText, Heart } from 'lucide-react';

export default function ValuesEditor() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Values & Life Compass</h1>
        <p className="text-white/40 text-sm mt-1">Define your Workview and Lifeview — the foundation of your life design</p>
      </div>

      <div className="grid gap-4">
        {[
          { icon: FileText, title: 'Workview', desc: 'Why do you work? What does work mean to you? What makes it worthwhile?', color: 'blue' },
          { icon: Heart, title: 'Lifeview', desc: 'Why are you here? What is the meaning of life? What is the relationship of the individual to others?', color: 'rose' },
          { icon: Compass, title: 'Compass Check', desc: 'How well do your Workview and Lifeview align? Where are the tensions?', color: 'emerald' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className={`bg-${item.color}-500/5 border border-${item.color}-500/20 rounded-2xl p-6`}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`w-5 h-5 text-${item.color}-400`} />
                <h2 className="text-lg font-bold text-white">{item.title}</h2>
              </div>
              <p className="text-sm text-white/40 mb-4">{item.desc}</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-h-[120px] flex items-center justify-center">
                <span className="text-white/20 text-sm">Coming in Module 2</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
