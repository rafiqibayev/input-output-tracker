import React from 'react';
import { format } from 'date-fns';
import { DayCellData } from '../types';

interface DayCellProps {
  data: DayCellData;
  onClick: (data: DayCellData) => void;
}

export const DayCell: React.FC<DayCellProps> = React.memo(({ data, onClick }) => {
  const { isTargetYear, entry, date } = data;
  
  // Base classes for container
  let bgClass = 'bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800'; 
  // Base classes for text label
  let textClass = 'text-gray-400 dark:text-neutral-700 font-medium';

  if (entry?.output) {
    // Level 2 (Output - Red)
    bgClass = 'bg-red-600 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-500';
    textClass = 'text-white font-bold';
  } else if (entry?.input) {
    // Level 1 (Input - Grind)
    bgClass = 'bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-200 dark:hover:bg-neutral-400';
    textClass = 'text-white dark:text-neutral-900 font-bold';
  }

  // Smart Label Logic
  const dayNum = date.getDate();
  const isFirstOfMonth = dayNum === 1;
  const label = isFirstOfMonth ? format(date, 'MMM').toUpperCase() : dayNum;

  // Visibility for padding days
  const visibilityClass = isTargetYear ? 'opacity-100' : 'opacity-0 pointer-events-none';

  // Text scaling for month names
  const textSizeClass = isFirstOfMonth ? 'text-[9px] md:text-[10px]' : 'text-[10px] md:text-xs';

  return (
    <button
      onClick={() => isTargetYear && onClick(data)}
      title={data.dateString}
      className={`
        w-full h-full rounded-[1px] md:rounded-sm 
        flex items-center justify-center overflow-hidden
        transition-colors duration-200 active:scale-95
        ${bgClass} ${visibilityClass}
      `}
    >
        <span className={`${textSizeClass} leading-none select-none ${textClass}`}>
            {label}
        </span>
    </button>
  );
});

DayCell.displayName = 'DayCell';