import React from 'react';
import { AppConfig, ThemeMode } from '../types';
import { Pencil, Moon, Sun, Monitor } from 'lucide-react';

interface HeaderProps {
  config: AppConfig;
  onUpdateConfig: (key: keyof AppConfig, value: string) => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ config, onUpdateConfig, themeMode, onToggleTheme }) => {
  
  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light': return <Sun className="w-5 h-5 text-neutral-900" />;
      case 'dark': return <Moon className="w-5 h-5 text-white" />;
      case 'system': return <Monitor className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getThemeLabel = () => {
     switch (themeMode) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return 'Auto';
    }
  }

  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between py-8">
      <div className="flex justify-between items-start md:block w-full md:w-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter mb-1 dark:text-white">INPUT / OUTPUT</h1>
          <p className="text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-widest">2026 Visualization</p>
        </div>
        
        {/* Mobile Toggle Button */}
        <button 
          onClick={onToggleTheme}
          className="md:hidden flex items-center gap-2 p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label={`Current theme: ${getThemeLabel()}`}
          title={`Switch theme mode (Current: ${getThemeLabel()})`}
        >
          {getThemeIcon()}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto items-end">
        
        {/* Inputs Container */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          {/* Input Label Field */}
          <div className="relative group w-full">
            <label className="absolute -top-2 left-2 px-1 bg-white dark:bg-neutral-950 text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider transition-colors">
              Input Label
            </label>
            <input
              type="text"
              value={config.inputLabel}
              onChange={(e) => onUpdateConfig('inputLabel', e.target.value)}
              className="w-full md:w-64 border-2 border-gray-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm font-medium focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-200 dark:text-white focus:ring-0 transition-colors rounded-sm"
            />
            <Pencil className="w-3 h-3 text-gray-300 dark:text-neutral-600 absolute right-3 top-3.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Output Label Field */}
          <div className="relative group w-full">
            <label className="absolute -top-2 left-2 px-1 bg-white dark:bg-neutral-950 text-[10px] font-bold text-red-400 dark:text-red-500 uppercase tracking-wider transition-colors">
              Output Label
            </label>
            <input
              type="text"
              value={config.outputLabel}
              onChange={(e) => onUpdateConfig('outputLabel', e.target.value)}
              className="w-full md:w-64 border-2 border-gray-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm font-medium text-red-600 dark:text-red-500 focus:outline-none focus:border-red-600 dark:focus:border-red-500 focus:ring-0 transition-colors rounded-sm"
            />
            <Pencil className="w-3 h-3 text-red-200 dark:text-red-900 absolute right-3 top-3.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>

        {/* Desktop Toggle Button */}
        <button 
          onClick={onToggleTheme}
          className="hidden md:flex mb-1 p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
           aria-label={`Current theme: ${getThemeLabel()}`}
           title={`Switch theme mode (Current: ${getThemeLabel()})`}
        >
          {getThemeIcon()}
        </button>

      </div>
    </header>
  );
};