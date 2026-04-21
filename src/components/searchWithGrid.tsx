import React from 'react'
import { SearchComponent } from './search.component';
import { GridComponent } from './grid.component';

export const SearchWithGrid: React.FC = () =>{

    const [searchTerm, setSearchTerm] = React.useState('');
    return(<>
    <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <GridComponent searchTerm={searchTerm} />
    </>)
}