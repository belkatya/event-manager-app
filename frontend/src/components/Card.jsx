import React, { useState } from 'react';
import '../css/card.css';

function Card({ event }) {
    const { 
        category,
        title,
        description,
        date,
        location,
        imageUrl 
    } = event;

    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Предотвращаем всплытие события
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="event-card">
            <div className="card-header">
                <div className="card-category">
                    {category}
                </div>
                <button 
                    className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
                    onClick={handleFavoriteClick}
                    aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                
                <div className="card-details">
                    <div className="card-date">
                        <span className="icon">📅</span>
                        {date}
                    </div>
                    <div className="card-location">
                        <span className="icon">📍</span>
                        {location}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Значения по умолчанию
Card.defaultProps = {
    event: {
        category: "Technology",
        title: "Nordic Game 2006",
        description: "Nordic Game 2006 conference is open to game developers, publishers, distributors, retailers, academics and accredited...",
        date: "Sep 19, 2006",
        location: "Stockholm, Sweden",
        imageUrl: ""
    }
};

export default Card;