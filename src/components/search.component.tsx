import React, { useEffect } from 'react'
import type { ISearchComponentProps } from '../types/ISearxhComponent';
import useDebounce from '../hooks/useDebounce';



export const SearchComponent: React.FC<ISearchComponentProps> = React.memo(({ setSearchTerm }) => {

  const [text, setText] = React.useState('');

  const debouncedText = useDebounce<string>(text, 500);

  useEffect(() => {
    setSearchTerm(debouncedText);
  }, [debouncedText, setSearchTerm]);
  
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
});
