import React from "react";
import "./styles/default-screen.css";

interface DefaultScreenProps {
  recentSearches: { trim: string; full: string }[];
  onSearchToggler: () => void;
}

export const DefaultScreen: React.FC<DefaultScreenProps> = ({
  recentSearches,
  onSearchToggler,
}) => {
  return (
    <div className="default-screen">

      <div className="default-screen__action">
        <button className="default-screen__btn" onClick={onSearchToggler}>
          Start Searching
        </button>
      </div>

      {recentSearches.length > 0 && (
        <div className="default-screen__recent">
          <p className="default-screen__label">Recent Searches</p>
          <div className="default-screen__chips">
            {recentSearches.map((term, index) => (
              <button
                key={index}
                className="chip"
                title={term.full}
              >
                 {term.trim}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};