import React from 'react';
import { useState } from 'react';

const Search = () => {
    const [search, setSearch] = useState({
        searchText: "",
        searchType: ""
    });

    const {searchText, searchType} = search;

    return (
        <div className='search-part'>
            <div className='input-part'>
                <input></input>
            </div>
        </div>
    );
};

export default Search;