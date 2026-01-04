import React from 'react';
import Filter from './Filter';
import Card from './Card';
import SortBtn from './SortBtn';
import '../css/main.css';
import { getPluralizedPhrase } from '../utils/pluralize';

function Main(props) {
    const { events, filters, setFilters } = props;
    const eventWord = getPluralizedPhrase(events.length, 'событие', 'события', 'событий');

    const handleSortChange = (sortValue) => {
        console.log('Сортировка изменена на:', sortValue);
    };

    return (
        <main className="main">
            <div className="main-container">
                <aside className="filter-sidebar">
                    <Filter filters={filters} setFilters={setFilters} />
                </aside>
                <section className="events-section">
                    <div className="events-header">
                        <h2 className="events-title">Найдено {events.length} {eventWord}</h2>
                        <SortBtn onSortChange={handleSortChange} />
                    </div>
                    <div className="events-grid">
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <Card key={index} event={event} />
                            ))
                        ) : (
                            <div className="no-events-message">
                                <p>По вашему запросу ничего не найдено. Попробуйте изменить фильтры.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Main;