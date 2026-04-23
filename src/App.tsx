import React from "react";

import "./App.css";
import { SearchWithGrid } from "./components/searchWithGrid";
import { DefaultScreen } from "./components/DefaultScreen";

function App() {
  const [isDefaultScreen, setIsDefaultScreen] = React.useState(true);
  const recentSearches: string[] = [
    "Leanne Graham",
    "Ervin Howell",
    "Clementine Bauch",
  ];

  const onSearchToggler = () => {
    setIsDefaultScreen(false);
  };

  return (
    <>
      {isDefaultScreen ? (
        <DefaultScreen
          recentSearches={recentSearches}
          onSearchToggler={onSearchToggler}
        />
      ) : (
        <SearchWithGrid  onSearchToggler={onSearchToggler} />
      )}
    </>
  );
}

export default App;
