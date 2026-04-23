import React, { useMemo } from "react";

import "./App.css";
import { SearchWithGrid } from "./components/searchWithGrid";
import { DefaultScreen } from "./components/DefaultScreen";
import { STORAGE_KEY } from "./constants";
import { loadSuggestions } from "./helpers/loadSuggestions";

function App() {
  const [isDefaultScreen, setIsDefaultScreen] = React.useState(true);
  const recentSearches: { trim: string; full: string }[] = useMemo(
    () =>
      loadSuggestions(STORAGE_KEY)?.map((suggestion) => ({
        trim: suggestion.slice(0, 12) + (suggestion.length > 12 ? "..." : ""),
        full: suggestion,
      })) || [],
    [],
  );

  const onSearchToggler = () => {
    setIsDefaultScreen((prev) => !prev);
  };

  return (
    <>
      {isDefaultScreen ? (
        <DefaultScreen
          recentSearches={recentSearches}
          onSearchToggler={onSearchToggler}
        />
      ) : (
        <SearchWithGrid onSearchToggler={onSearchToggler} />
      )}
    </>
  );
}

export default App;
