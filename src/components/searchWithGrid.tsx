import React from "react";
import { GridComponent } from "./grid.component";
import SearchInput from "./search.component1";
import { STORAGE_KEY } from "../constants";

export const SearchWithGrid: React.FC<{ onSearchToggler: () => void }> = ({ onSearchToggler }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const onSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <button
        className="search__back-btn"
        onClick={onSearchToggler}
        aria-label="Go back"
      >
        Go back
      </button>
      <SearchInput setSearchTerm={setSearchTerm} onSearch={onSearch} storageKey={STORAGE_KEY} />
      {searchTerm.trim() !== "" && <GridComponent searchTerm={searchTerm} />}
    </>
  );
};
