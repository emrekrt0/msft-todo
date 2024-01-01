import React, { useContext } from 'react';
import { SearchContext } from './Root.jsx';

export default function Search() {
  const searchResults = useContext(SearchContext) || [];
  console.log(searchResults);
    return (
        <div className="mainBackground">
            <div className="importantHeader">
                <div className="importantHeader-title">
                  <h2>Search Results</h2>
                </div>
            </div>
            <div className="tasks mt-50">
            {searchResults.map((search) => (
                <div key={search.id} className="baseAdd addTask box-shadow mb-20 ts">
                    <button className="baseAdd-icon" type="Button" aria-label="Add a task" tabIndex={"0"} onClick={() => handleDelete(search.id)}>
                    <svg fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="blue"></path></svg>
                    </button>
                    <ul>
                        <li className="baseAddInput-important">
                            <div className="whatTodo">{search.todo} {search.date ? <p className="taskDate themeBlue">{search.date}</p> : null } </div> {!search.important ? <div className="importantCheck"><button onClick={ () => changeImportant(search.id, search.important)}>💫</button></div> : <button onClick={ () => changeImportant(search.id, search.important)}><div className="importantCheck">⭐</div></button>}
                        </li>
                    </ul>
                </div>
            ))}
            </div>
        </div>
    );
}