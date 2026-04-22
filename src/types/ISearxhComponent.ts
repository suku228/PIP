export interface ISearchComponentProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (term: string) => void;
  placeholder?: string;
  maxSuggestions?: number;
  storageKey?: string;
}