import React from 'react';
import { useTrackerData } from './hooks/useTrackerData';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { Grid } from './components/Grid';

const App: React.FC = () => {
  const { 
    data, 
    config, 
    toggleInput, 
    toggleOutput, 
    updateConfig, 
    stats 
  } = useTrackerData();

  const { themeMode, cycleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-950 px-4 md:px-8 lg:px-12 pb-20 transition-colors duration-200">
      <div className="w-full max-w-[1920px] mx-auto">
        <Header 
          config={config} 
          onUpdateConfig={updateConfig}
          themeMode={themeMode}
          onToggleTheme={cycleTheme}
        />
        
        <Stats 
          grindDays={stats.grindDays} 
          outputsShipped={stats.outputsShipped} 
        />

        <main className="w-full mt-8">
            <div className="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-100 dark:bg-neutral-900 rounded-sm"></div>
                    <span>Void</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neutral-900 dark:bg-neutral-200 rounded-sm"></div>
                    <span>Input</span>
                </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 dark:bg-red-600 rounded-sm"></div>
                    <span className="text-red-600 dark:text-red-500">Output</span>
                </div>
            </div>

            <Grid 
            data={data} 
            config={config}
            onToggleInput={toggleInput}
            onToggleOutput={toggleOutput}
            />
        </main>

        <footer className="mt-20 pt-8 border-t border-gray-100 dark:border-neutral-800 text-center text-gray-300 dark:text-neutral-700 text-xs font-mono">
            <p>DESIGNED FOR THE GRIND. DATA STORED LOCALLY.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;