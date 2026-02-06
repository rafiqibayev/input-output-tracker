import React from 'react';
import { X, Check } from 'lucide-react';
import { format } from 'date-fns';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  dateString: string;
  inputLabel: string;
  outputLabel: string;
  hasInput: boolean;
  hasOutput: boolean;
  onToggleInput: (dateString: string) => void;
  onToggleOutput: (dateString: string) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  date,
  dateString,
  inputLabel,
  outputLabel,
  hasInput,
  hasOutput,
  onToggleInput,
  onToggleOutput
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-sm bg-white dark:bg-neutral-950 border-2 border-neutral-900 dark:border-neutral-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-gray-100 dark:hover:bg-neutral-800 p-1 rounded-sm transition-colors text-neutral-900 dark:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold mb-6 tracking-tight dark:text-white">
          {format(date, 'MMMM d, yyyy')}
        </h3>

        <div className="space-y-4">
          {/* Input Checkbox */}
          <label className="flex items-center gap-4 cursor-pointer group">
            <div 
              className={`w-6 h-6 border-2 border-neutral-900 dark:border-neutral-200 flex items-center justify-center transition-colors ${hasInput ? 'bg-neutral-900 dark:bg-neutral-200' : 'bg-transparent'}`}
            >
              {hasInput && <Check className="w-4 h-4 text-white dark:text-neutral-900" strokeWidth={3} />}
            </div>
            <input 
              type="checkbox" 
              className="hidden"
              checked={hasInput}
              onChange={() => onToggleInput(dateString)}
            />
            <span className="text-sm font-medium uppercase tracking-wider dark:text-white group-hover:underline">
              {inputLabel}
            </span>
          </label>

          {/* Output Checkbox */}
          <label className="flex items-center gap-4 cursor-pointer group">
             <div 
              className={`w-6 h-6 border-2 border-red-600 dark:border-red-500 flex items-center justify-center transition-colors ${hasOutput ? 'bg-red-600 dark:bg-red-500' : 'bg-transparent'}`}
            >
              {hasOutput && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
            </div>
            <input 
              type="checkbox" 
              className="hidden"
              checked={hasOutput}
              onChange={() => onToggleOutput(dateString)}
            />
             <span className="text-sm font-medium uppercase tracking-wider text-red-600 dark:text-red-500 group-hover:underline">
              {outputLabel}
            </span>
          </label>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-neutral-800 flex justify-end">
           <button 
             onClick={onClose}
             className="px-4 py-2 bg-neutral-900 dark:bg-neutral-200 text-white dark:text-neutral-900 text-xs uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-300"
           >
             Done
           </button>
        </div>
      </div>
    </div>
  );
};