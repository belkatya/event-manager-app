import React from 'react';
import '../css/filter.css';

function Filter({ filters, setFilters }) {
    // Проверяем, есть ли активные фильтры
    const hasActiveFilters = () => {
        const hasCheckedCheckboxes = 
            Object.values(filters.eventTypes).some(Boolean) ||
            Object.values(filters.locations).some(Boolean);
        
        const hasCustomDateRange = filters.dateRange !== 'all-dates';
        
        return hasCheckedCheckboxes || hasCustomDateRange;
    };

    // Очистка всех фильтров
    const clearAllFilters = () => {
        setFilters({
            eventTypes: {
                conference: false,
                exhibition: false,
                workshop: false,
                other: false
            },
            locations: {
                tambov: false,
                moscow: false,
                otherLocation: false
            },
            dateRange: 'all-dates'
        });
    };

    const handleEventTypeChange = (eventType) => {
        setFilters(prev => ({
            ...prev,
            eventTypes: {
                ...prev.eventTypes,
                [eventType]: !prev.eventTypes[eventType]
            }
        }));
    };

    const handleLocationChange = (location) => {
        setFilters(prev => ({
            ...prev,
            locations: {
                ...prev.locations,
                [location]: !prev.locations[location]
            }
        }));
    };

    const handleDateRangeChange = (range) => {
        setFilters(prev => ({
            ...prev,
            dateRange: range
        }));
    };

    return (
        <div className="filter-sidebar-container">
            <div className="filter-header">
                <h2 className="filter-title">Фильтры</h2>
                {hasActiveFilters() && (
                    <button 
                        className="clear-all-btn"
                        onClick={clearAllFilters}
                    >
                        Очистить все
                    </button>
                )}
            </div>
            
            {/* Тип события */}
            <div className="filter-section">
                <h3 className="filter-section-title">Тип события</h3>
                <div className="checkbox-group">
                    {Object.entries(filters.eventTypes).map(([key, value]) => (
                        <label key={key} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={() => handleEventTypeChange(key)}
                                className="checkbox-input"
                            />
                            <span className="checkmark"></span>
                            {getEventTypeLabel(key)}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-divider"></div>

            {/* Местоположение */}
            <div className="filter-section">
                <h3 className="filter-section-title">Местоположение</h3>
                <div className="checkbox-group">
                    {Object.entries(filters.locations).map(([key, value]) => (
                        <label key={key} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={() => handleLocationChange(key)}
                                className="checkbox-input"
                            />
                            <span className="checkmark"></span>
                            {getLocationLabel(key)}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-divider"></div>

            {/* Диапазон дат */}
            <div className="filter-section">
                <h3 className="filter-section-title">Диапазон дат</h3>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="dateRange"
                            value="all-dates"
                            checked={filters.dateRange === 'all-dates'}
                            onChange={() => handleDateRangeChange('all-dates')}
                            className="radio-input"
                        />
                        <span className="radiomark"></span>
                        Все даты
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="dateRange"
                            value="this-month"
                            checked={filters.dateRange === 'this-month'}
                            onChange={() => handleDateRangeChange('this-month')}
                            className="radio-input"
                        />
                        <span className="radiomark"></span>
                        В этом месяце
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="dateRange"
                            value="next-3-months"
                            checked={filters.dateRange === 'next-3-months'}
                            onChange={() => handleDateRangeChange('next-3-months')}
                            className="radio-input"
                        />
                        <span className="radiomark"></span>
                        Следующие 3 месяца
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="dateRange"
                            value="this-year"
                            checked={filters.dateRange === 'this-year'}
                            onChange={() => handleDateRangeChange('this-year')}
                            className="radio-input"
                        />
                        <span className="radiomark"></span>
                        В этом году
                    </label>
                </div>
            </div>
        </div>
    );
}

// Вспомогательные функции для отображения labels
function getEventTypeLabel(key) {
    const labels = {
        conference: 'Конференция',
        exhibition: 'Выставка',
        workshop: 'Мастерская',
        other: 'Другое'
    };
    return labels[key] || key;
}

function getLocationLabel(key) {
    const labels = {
        tambov: 'Тамбов',
        moscow: 'Москва',
        otherLocation: 'Другое'
    };
    return labels[key] || key;
}

export default Filter;