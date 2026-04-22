export interface Suggestion {
  term: string;
  timestamp: number;
}

export interface UseSearchSuggestionsReturn {
  suggestions: string[];
  saveSuggestion: (term: string) => void;
  getFilteredSuggestions: (query: string) => string[];
  clearSuggestions: () => void;
}

export interface SearchInputProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  maxSuggestions?: number;
  storageKey?: string;
}