import React, { useContext } from 'react';
import { SearchContext } from './Root.jsx'; // adjust the path as needed

export default function Search() {
    const searchResults = useContext(SearchContext) || [];
    console.log(searchResults);
    // rest of your component

    return (
        <div className="search-results">
            <h2>Search Results</h2>
            {searchResults.map((result) => (
                <div key={result.id} className="search-result-item">
                    <p>{result.todo}</p>
                    {/* Diğer sonuç bilgilerini buraya ekleyebilirsiniz */}
                </div>
            ))}
        </div>
    );
}