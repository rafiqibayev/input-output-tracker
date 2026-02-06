import React, { useMemo, useState } from 'react';
import { 
  eachDayOfInterval, 
  endOfWeek, 
  format, 
  isSameYear, 
  startOfWeek, 
} from 'date-fns';
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

// --- Vertical Grid (Mobile & Tablet) ---
// Mobile (< md): 7 cols (1 week)
// Tablet (md - xl): 14 cols (2 weeks)
// Vertical Scroll
const VerticalGrid: React.FC<{ 
  data: TrackerData; 
  onCellClick: (data: DayCellData) => void;
}> = ({ data, onCellClick }) => {
  
  // Align grid to start on Monday for perfect alignment
  const allDays = useMemo(() => {
    // Start from the Monday of the first week (may be Dec 2025)
    const start = startOfWeek(START_DATE, { weekStartsOn: 1 });
    // End on the Sunday of the last week (may be Jan 2027)
    const end = endOfWeek(END_DATE, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, []);

  return (
    <div className="w-full flex flex-col pb-12">
      <div className="grid grid-cols-7 md:grid-cols-14 gap-1 w-full">
        {allDays.map((date) => {
          const dateString = format(date, 'yyyy-MM-dd');
          // Hide days that aren't in 2026 (padding days)
          const isTargetYear = isSameYear(date, START_DATE);
          
          const cellData: DayCellData = {
            date,
            dateString,
            isTargetYear,
            entry: data[dateString]
          };

          return (
            <div 
              key={dateString} 
              className="aspect-square w-full"
            >
              <DayCell 
                data={cellData} 
                onClick={onCellClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Horizontal Grid (Desktop XL+) ---
// Flex layout to fill full width.
// No scrolling, scales with screen.
const HorizontalGrid: React.FC<{
  data: TrackerData;
  onCellClick: (data: DayCellData) => void;
}> = ({ data, onCellClick }) => {
  
  const gridWeeks = useMemo(() => {
    const matrixStart = startOfWeek(START_DATE, { weekStartsOn: 1 }); 
    const matrixEnd = endOfWeek(END_DATE, { weekStartsOn: 1 });
    const allDays = eachDayOfInterval({ start: matrixStart, end: matrixEnd });

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

  return (
    <div className="w-full flex flex-col">
       {/* Flex container that spans full width */}
       <div className="flex w-full gap-[2px]"> 
          {gridWeeks.map((week, weekIndex) => (
              <div 
                key={weekIndex} 
                // flex-1 ensures equal distribution of width
                className="flex-1 flex flex-col gap-[2px]" 
              >
              {week.map((dayData) => (
                  <div key={dayData.dateString} className="w-full aspect-square">
                    <DayCell 
                        data={dayData} 
                        onClick={onCellClick}
                    />
                  </div>
              ))}
              </div>
          ))}
       </div>
    </div>
  );
};

// --- Main Grid Container ---
export const Grid: React.FC<GridProps> = ({ data, config, onToggleInput, onToggleOutput }) => {
  const [selectedDay, setSelectedDay] = useState<DayCellData | null>(null);

  const handleCellClick = (cellData: DayCellData) => {
    setSelectedDay(cellData);
  };

  const closeModal = () => setSelectedDay(null);

  return (
    <div className="w-full">
      {/* Mobile & Tablet View (< xl) */}
      <div className="block xl:hidden">
        <VerticalGrid data={data} onCellClick={handleCellClick} />
      </div>

      {/* Desktop View (>= xl) */}
      <div className="hidden xl:block">
        <HorizontalGrid data={data} onCellClick={handleCellClick} />
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