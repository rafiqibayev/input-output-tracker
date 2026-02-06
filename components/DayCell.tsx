import React from 'react';
import { DayCellData } from '../types';

interface DayCellProps {
  data: DayCellData;
  onClick: (data: DayCellData) => void;
}

export const DayCell: React.FC<DayCellProps> = React.memo(({ data, onClick }) => {
  const { isTargetYear, entry, date } = data;
  
  // Decide color class
  // Default (Level 0 - Empty): Light Gray in Light Mode, Dark Gray in Dark Mode
  let bgClass = 'bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-300 dark:text-neutral-700'; 
  
  if (entry?.output) {
    // Level 2 (Output - Red): Constant Red
    bgClass = 'bg-red-600 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-500 text-white'; 
  } else if (entry?.input) {
    // Level 1 (Input - Grind): Black in Light Mode, White/Light Gray in Dark Mode
    bgClass = 'bg-neutral-900 hover:bg-neutral-700 text-neutral-500 dark:bg-neutral-200 dark:hover:bg-neutral-400 dark:text-neutral-900'; 
  }

  // If it's padding for the grid (not actually 2026), make it invisible or very subtle
  const visibilityClass = isTargetYear ? 'opacity-100' : 'opacity-0 pointer-events-none';

  return (
    <button
      onClick={() => isTargetYear && onClick(data)}
      title={data.dateString}
      className={`
        w-full aspect-square rounded-[1px] md:rounded-sm 
        flex items-center justify-center
        transition-colors duration-200 
        ${bgClass} ${visibilityClass}
      `}
    >
        <span className="text-[0px] md:text-[8px] lg:text-[10px] font-bold leading-none select-none">
            {date.getDate()}
        </span>
    </button>
  );
});

DayCell.displayName = 'DayCell';