import React from 'react'
// import { SearchComponent } from './search.component';
import { GridComponent } from './grid.component';
import SearchInput from './search.component1';

export const SearchWithGrid: React.FC = () =>{

    const [searchTerm, setSearchTerm] = React.useState('');

    const onSearch = (term: string) => {
        console.log("SearchWithGrid onSearch called with term:", term);
        setSearchTerm(term);
    }

    return(<>
    <SearchInput setSearchTerm={setSearchTerm} onSearch={onSearch} />
    {searchTerm.trim() !== '' && <GridComponent searchTerm={searchTerm} />}
    </>)
}