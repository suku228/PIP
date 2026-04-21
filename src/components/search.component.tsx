import React from 'react'
import type { ISearchComponentProps } from '../types/ISearxhComponent';



export const SearchComponent: React.FC<ISearchComponentProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <div className="search">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
};
