export interface DailyEntry {
  input: boolean;
  output: boolean;
}

export interface TrackerData {
  [dateString: string]: DailyEntry; // Key format: YYYY-MM-DD
}

export interface AppConfig {
  inputLabel: string;
  outputLabel: string;
}

export interface DayCellData {
  date: Date;
  dateString: string; // YYYY-MM-DD
  isTargetYear: boolean; // Is actually in 2026 (for styling empty padding days)
  entry?: DailyEntry;
}

export type ThemeMode = 'light' | 'dark' | 'system';