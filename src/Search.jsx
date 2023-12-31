import React from 'react';

export default function Search({ searchResults }) {
    const results = searchResults || [];
    console.log(results);
    return (
        <div className="search-results">
            <h2>Search Results</h2>
            {results.map((result) => (
                <div key={result.id} className="search-result-item">
                    <p>{result.todo}</p>
                    {/* Diğer sonuç bilgilerini buraya ekleyebilirsiniz */}
                </div>
            ))}
        </div>
    );
}