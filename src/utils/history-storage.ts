import type { SearchHistoryEntry } from "../types/weather";

const HISTORY_STORAGE_KEY = "weather-app-search-history";

// Reads the full search history from localStorage.
// Returns an empty array if nothing was saved yet, or if the saved value is corrupted.
export function loadSearchHistory(): SearchHistoryEntry[] {
  const rawValue = localStorage.getItem(HISTORY_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedHistory: SearchHistoryEntry[] = JSON.parse(rawValue);
    return parsedHistory;
  } catch (error) {
    return [];
  }
}

// Appends one new entry to the search history and persists it to localStorage.
export function addSearchHistoryEntry(entry: SearchHistoryEntry): SearchHistoryEntry[] {
  const existingHistory = loadSearchHistory();
  const updatedHistory = [entry, ...existingHistory];

  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));

  return updatedHistory;
}
