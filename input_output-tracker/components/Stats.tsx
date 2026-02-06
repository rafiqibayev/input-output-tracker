import React from 'react';

interface StatsProps {
  grindDays: number;
  outputsShipped: number;
}

export const Stats: React.FC<StatsProps> = ({ grindDays, outputsShipped }) => {
  return (
    <div className="flex flex-wrap gap-8 my-8 pb-8 border-b border-gray-100 dark:border-neutral-800">
      <div className="flex flex-col">
        <span className="text-4xl font-bold tracking-tighter text-neutral-900 dark:text-white">{grindDays}</span>
        <span className="text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest mt-1">Days Grind</span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-4xl font-bold tracking-tighter text-red-600 dark:text-red-500">{outputsShipped}</span>
        <span className="text-xs font-bold text-red-600/60 dark:text-red-500/60 uppercase tracking-widest mt-1">Outputs Shipped</span>
      </div>
    </div>
  );
};