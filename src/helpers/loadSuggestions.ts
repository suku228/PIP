export const loadSuggestions = (storageKey: string): string[] => {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
};
