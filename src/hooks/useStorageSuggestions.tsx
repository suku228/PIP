import { useState, useEffect } from 'react';
import type { UseSearchSuggestionsReturn } from '../types/ISuggestions';

export const useSearchSuggestions = (
  storageKey: string = 'search_suggestions',
  maxSuggestions: number = 10
): UseSearchSuggestionsReturn => {

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const loadSuggestions = (): string[] => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  };

  const saveSuggestion = (term: string): void => {
    if (!term.trim()) return;

    const existing: string[] = loadSuggestions();
    const updated: string[] = [
      term,
      ...existing.filter(
        (s: string) => s.toLowerCase() !== term.toLowerCase()
      ),
    ].slice(0, maxSuggestions);

    localStorage.setItem(storageKey, JSON.stringify(updated));
    setSuggestions(updated);
  };

  const getFilteredSuggestions = (query: string): string[] => {
    const all: string[] = loadSuggestions();
    if (!query.trim()) return all;
    return all.filter((s: string) =>
      s.toLowerCase().includes(query.toLowerCase())
    );
  };

  const clearSuggestions = (): void => {
    localStorage.removeItem(storageKey);
    setSuggestions([]);
  };

  useEffect(() => {
    setSuggestions(loadSuggestions());
  }, []);

  return {
    suggestions,
    saveSuggestion,
    getFilteredSuggestions,
    clearSuggestions,
  };
};