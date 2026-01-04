import React, { useState } from 'react';
import '../css/sortBtn.css';

function SortBtn({ onSortChange }) {
    const [sortBy, setSortBy] = useState('popularity');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Основные опции сортировки
    const mainSortOptions = [
        { value: 'favorites-desc', label: 'Сначала более популярные' },
        { value: 'favorites-asc', label: 'Сначала менее популярные' }
    ];

    // Функция для получения всех опций (включая сброс, если нужно)
    const getSortOptions = () => {
        const options = [...mainSortOptions];
        
        // Добавляем опцию сброса, если выбрана не дефолтная сортировка
        if (sortBy !== 'popularity') {
            options.push({ value: 'popularity', label: 'Сбросить сортировку' });
        }
        
        return options;
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setIsDropdownOpen(false);
        
        // Передаем выбранное значение в родительский компонент
        if (onSortChange) {
            onSortChange(value);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Текст для кнопки
    const getButtonLabel = () => {
        if (sortBy === 'popularity') {
            return 'Сортировать по популярности';
        }
        
        const currentOption = mainSortOptions.find(option => option.value === sortBy);
        return currentOption ? currentOption.label : 'Сортировать по популярности';
    };

    return (
        <div className="sort-dropdown">
            <button 
                className="sort-dropdown-btn"
                onClick={toggleDropdown}
            >
                {getButtonLabel()}
                <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
                    ▼
                </span>
            </button>
            {isDropdownOpen && (
                <div className="sort-dropdown-menu">
                    {getSortOptions().map(option => (
                        <button
                            key={option.value}
                            className={`sort-dropdown-item ${
                                sortBy === option.value ? 'active' : ''
                            } ${
                                option.value === 'popularity' ? 'reset-option' : ''
                            }`}
                            onClick={() => handleSortChange(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SortBtn;