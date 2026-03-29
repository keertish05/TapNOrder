import React from 'react';
import { motion } from 'motion/react';
import { Bell, Droplets, Utensils, Zap, Battery, Baby, Move } from 'lucide-react';

const ACTIONS = [
  { id: 'waiter', label: 'Waiter', icon: <Bell /> },
  { id: 'water', label: 'Water', icon: <Droplets /> },
  { id: 'napkin', label: 'Napkin', icon: <Zap /> },
  { id: 'cutlery', label: 'Cutlery', icon: <Utensils /> },
  { id: 'charger', label: 'Charger', icon: <Battery /> },
  { id: 'highchair', label: 'Baby Chair', icon: <Baby /> },
  { id: 'change', label: 'Table', icon: <Move /> },
];

export default function QuickButtons() {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 mb-12 px-6 -mx-6">
      {ACTIONS.map((action) => (
        <motion.button
          key={action.id}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/50 hover:bg-white text-ink/40 px-5 py-3 rounded-2xl border border-primary/5 hover:border-primary/10 transition-all flex-shrink-0 flex items-center gap-3 group"
        >
          <div className="text-primary/40 group-hover:text-primary transition-colors">
            {React.cloneElement(action.icon as React.ReactElement, { size: 14 })}
          </div>
          <span className="text-[9px] font-display font-black uppercase tracking-[0.2em]">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
