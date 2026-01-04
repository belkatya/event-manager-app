// Search.jsx с кнопкой очистки
import React, { useState } from 'react';
import '../css/search.css';
import searchGif from '../images/search-icon.svg';

function Search({ onSearch, searchQuery }) {
    const [localQuery, setLocalQuery] = useState(searchQuery);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(localQuery);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setLocalQuery(value);
    };

    const handleClearSearch = () => {
        setLocalQuery('');
        onSearch('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    React.useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    return (
        <div className="search-section">
            <form className="search-form" onSubmit={handleSearch}>
                <h2 className="search-title">Поиск мероприятий</h2>
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <img 
                            src={searchGif} 
                            alt="Поиск" 
                            className="search-icon-svg" 
                            draggable="false" 
                            onDragStart={(e) => e.preventDefault()}
                        />
                        <input 
                            type="text" 
                            placeholder="Поиск событий по названию и описанию..."
                            className="search-input"
                            value={localQuery}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        {localQuery && (
                            <button 
                                type="button" 
                                className="clear-search-btn"
                                onClick={handleClearSearch}
                                aria-label="Очистить поиск"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <button type="submit" className="search-button">Поиск</button>
                </div>
            </form>
        </div>
    );
}

export default Search;