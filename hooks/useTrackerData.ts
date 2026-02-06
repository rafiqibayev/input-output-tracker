import { useState, useEffect, useCallback } from 'react';
import { TrackerData, AppConfig, DailyEntry } from '../types';
import { STORAGE_KEY_DATA, STORAGE_KEY_CONFIG, DEFAULT_INPUT_LABEL, DEFAULT_OUTPUT_LABEL } from '../constants';

interface UseTrackerDataReturn {
  data: TrackerData;
  config: AppConfig;
  toggleInput: (dateString: string) => void;
  toggleOutput: (dateString: string) => void;
  updateConfig: (key: keyof AppConfig, value: string) => void;
  stats: {
    grindDays: number;
    outputsShipped: number;
  };
}

export const useTrackerData = (): UseTrackerDataReturn => {
  // --- State Initialization ---
  const [data, setData] = useState<TrackerData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DATA);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Failed to parse data from local storage", e);
      return {};
    }
  });

  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
      return stored ? JSON.parse(stored) : { inputLabel: DEFAULT_INPUT_LABEL, outputLabel: DEFAULT_OUTPUT_LABEL };
    } catch (e) {
      console.error("Failed to parse config from local storage", e);
      return { inputLabel: DEFAULT_INPUT_LABEL, outputLabel: DEFAULT_OUTPUT_LABEL };
    }
  });

  // --- Persistence Effects ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  }, [config]);

  // --- Handlers ---
  const toggleInput = useCallback((dateString: string) => {
    setData((prev) => {
      const current = prev[dateString] || { input: false, output: false };
      return {
        ...prev,
        [dateString]: { ...current, input: !current.input }
      };
    });
  }, []);

  const toggleOutput = useCallback((dateString: string) => {
    setData((prev) => {
      const current = prev[dateString] || { input: false, output: false };
      return {
        ...prev,
        [dateString]: { ...current, output: !current.output }
      };
    });
  }, []);

  const updateConfig = useCallback((key: keyof AppConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  // --- Stats Calculation ---
  // Memoization is optional here given the data size, but good practice.
  const grindDays = Object.values(data).filter((d: DailyEntry) => d.input || d.output).length;
  const outputsShipped = Object.values(data).filter((d: DailyEntry) => d.output).length;

  return {
    data,
    config,
    toggleInput,
    toggleOutput,
    updateConfig,
    stats: {
      grindDays,
      outputsShipped
    }
  };
};