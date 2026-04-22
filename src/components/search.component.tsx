import React, { useEffect } from 'react'
import type { ISearchComponentProps } from '../types/ISearxhComponent';



export const SearchComponent: React.FC<ISearchComponentProps> = ({ setSearchTerm }) => {

  const [text, setText] = React.useState('');

  useEffect(() => {
    console.log('SearchComponent useEffect triggered with text:', text);
  },[text, setSearchTerm]);
  return (
    <>
      <div className="search">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </>
  );
};
