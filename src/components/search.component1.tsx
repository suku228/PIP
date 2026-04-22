import React, { useState, useRef, useEffect, type JSX } from "react";
import type { ISearchComponentProps } from "../types/ISearxhComponent";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import "./styles/searchInput.css";
import useDebounce from "../hooks/useDebounce";

const SearchInput = ({
  onSearch,
  placeholder = "Search...",
  maxSuggestions = 10,
  storageKey = "search_suggestions",
  setSearchTerm,
}: ISearchComponentProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const debouncedText = useDebounce<string>(inputValue, 400);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { saveSuggestion, getFilteredSuggestions, clearSuggestions } =
    useSearchSuggestions(storageKey, maxSuggestions);

  useEffect(() => {
    setSearchTerm(debouncedText);
    saveSuggestion(debouncedText);
  }, [debouncedText, setSearchTerm]);

  const filteredSuggestions: string[] = getFilteredSuggestions(inputValue);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (term: string): void => {
    setInputValue(term);
    onSearch(term);
    setShowDropdown(false);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!showDropdown || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveSuggestion((prev: number) => {
        return prev < filteredSuggestions.length - 1 ? prev + 1 : 0;
      });
    } else if (e.key === "ArrowUp") {
      setActiveSuggestion((prev: number) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
      );
    } else if (e.key === "Enter") {
      if (activeSuggestion >= 0 && activeSuggestion < filteredSuggestions.length) {
        handleSelect(filteredSuggestions[activeSuggestion])
      };
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-wrapper">
      {/* Input */}
      <div className="input-wrapper">
        <svg
          className="input-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          className="input"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setInputValue(e.target.value);
            setShowDropdown(true);
            setActiveSuggestion(-1);
          }}
          onFocus={(): void => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
        />

        {inputValue && (
          <button
            className="input-clear"
            onClick={(): void => {
              setInputValue("");
              setShowDropdown(true);
              inputRef.current?.focus();
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && filteredSuggestions.length > 0 && (
        <div ref={dropdownRef} className="suggestions-dropdown">
          <div className="suggestions-header">
            <span>Recent Searches</span>
            <button className="clear-all" onClick={clearSuggestions}>
              Clear all
            </button>
          </div>

          {filteredSuggestions.map((suggestion: string, index: number) => (
            <div
              key={index}
              className={`suggestion-item ${activeSuggestion === index ? "active" : ""}`}
              onMouseDown={(): void => handleSelect(suggestion)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
