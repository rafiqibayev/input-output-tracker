import React, { useMemo, useState } from 'react';
import { eachDayOfInterval, endOfWeek, format, isSameYear, startOfWeek } from 'date-fns';
import { DayCell } from './DayCell';
import { EditModal } from './EditModal';
import { START_DATE, END_DATE } from '../constants';
import { TrackerData, DayCellData, AppConfig } from '../types';

interface GridProps {
  data: TrackerData;
  config: AppConfig;
  onToggleInput: (dateString: string) => void;
  onToggleOutput: (dateString: string) => void;
}

export const Grid: React.FC<GridProps> = ({ data, config, onToggleInput, onToggleOutput }) => {
  const [selectedDay, setSelectedDay] = useState<DayCellData | null>(null);

  // Generate grid data
  const gridWeeks = useMemo(() => {
    // 1. Get the very first day of the week containing Jan 1 (Start on Monday)
    const matrixStart = startOfWeek(START_DATE, { weekStartsOn: 1 });
    // 2. Get the very last day of the week containing Dec 31 (End on Sunday)
    const matrixEnd = endOfWeek(END_DATE, { weekStartsOn: 1 });

    // 3. Get all days
    const allDays = eachDayOfInterval({ start: matrixStart, end: matrixEnd });

    // 4. Group into weeks (chunks of 7)
    const weeks: DayCellData[][] = [];
    let currentWeek: DayCellData[] = [];

    allDays.forEach((date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      const isTargetYear = isSameYear(date, START_DATE);
      
      currentWeek.push({
        date,
        dateString,
        isTargetYear,
        entry: data[dateString]
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return weeks;
  }, [data]);

  const handleCellClick = (cellData: DayCellData) => {
    setSelectedDay(cellData);
  };

  const closeModal = () => setSelectedDay(null);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        
        {/* Top Row: Month Labels */}
        <div className="flex w-full mb-2">
            {/* Month Labels Container */}
            <div className="flex-1 flex gap-[1px] md:gap-0.5">
                {gridWeeks.map((week, i) => {
                    // Check if this week contains the 1st of a month
                    const firstDayOfMonth = week.find(d => d.date.getDate() === 1);
                    const monthName = firstDayOfMonth ? format(firstDayOfMonth.date, 'MMM') : '';
                    return (
                        <div key={i} className="flex-1 flex justify-center items-end">
                             <span className="text-[8px] md:text-[10px] text-gray-400 dark:text-neutral-500 font-bold uppercase tracking-wider leading-none">
                                {monthName}
                             </span>
                        </div>
                    )
                })}
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex w-full">
             
             {/* The Grid (Columns of weeks) */}
             <div className="flex-1 flex gap-[1px] md:gap-0.5">
                {gridWeeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex-1 flex flex-col gap-[1px] md:gap-0.5">
                    {week.map((dayData) => (
                        <DayCell 
                        key={dayData.dateString} 
                        data={dayData} 
                        onClick={handleCellClick}
                        />
                    ))}
                    </div>
                ))}
             </div>
        </div>
      </div>

      {selectedDay && (
        <EditModal
          isOpen={!!selectedDay}
          onClose={closeModal}
          date={selectedDay.date}
          dateString={selectedDay.dateString}
          inputLabel={config.inputLabel}
          outputLabel={config.outputLabel}
          hasInput={!!data[selectedDay.dateString]?.input}
          hasOutput={!!data[selectedDay.dateString]?.output}
          onToggleInput={onToggleInput}
          onToggleOutput={onToggleOutput}
        />
      )}
    </div>
  );
};