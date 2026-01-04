import React, { useState, useMemo, useEffect } from 'react';
import Main from './Main';
import Header from './Header';
import Search from './Search';
import Footer from './Footer';
import AddEvent from './AddEvent';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { parseRussianDate } from '../utils/dateUtils';

function App() {
    const [filters, setFilters] = useState({
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

    const [searchQuery, setSearchQuery] = useState('');
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [showSignInForm, setShowSignInForm] = useState(false);
    
    // СОСТОЯНИЕ АВТОРИЗАЦИИ
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState(null);

    const allEvents = [
        {
            "category": "Конференция",
            "title": "Цифровая трансформация промышленности 2025",
            "description": "Крупнейшая конференция по внедрению Industry 4.0 в России. Доклады от ведущих экспертов, кейсы компаний...",
            "date": "15 октября 2025",
            "location": "Москва"
        },
        {
            "category": "Выставка", 
            "title": "Агротех-Экспо: Инновации для села",
            "description": "Выставка современной сельхозтехники, оборудования и технологий для агробизнеса. Участвуют 200+ компаний...",
            "date": "22 мая 2025",
            "location": "Тамбов"
        },
        {
            "category": "Мастерская",
            "title": "Интенсив по Data Science для начинающих",
            "description": "Практический двухдневный воркшоп по основам анализа данных и машинного обучения на Python. Все материалы предоставляются...",
            "date": "10 декабря 2025",
            "location": "Санкт-Петербург"
        },
        {
            "category": "Другое",
            "title": "Хакатон FinTech Solutions",
            "description": "48-часовой марафон по разработке инновационных решений для финансового сектора. Призы от партнеров, менторская поддержка...",
            "date": "5 сентября 2025",
            "location": "Казань"
        },
        {
            "category": "Конференция",
            "title": "Будущее образования: EdTech форум",
            "description": "Обсуждение цифровизации образования, презентации образовательных платформ, опыт внедрения в вузах и школах...",
            "date": "18 апреля 2025",
            "location": "Новосибирск"
        },
        {
            "category": "Выставка",
            "title": "Арт-Москва: Современное искусство",
            "description": "Ежегодная выставка-ярмарка современного искусства. Галереи из России и стран СНГ, лекции, кураторские туры...",
            "date": "12 февраля 2026",
            "location": "Москва"
        }
    ];

    // Проверяем авторизацию при загрузке приложения
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // Функция успешного входа
    const handleSuccessfulLogin = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        setShowSignInForm(false);
        
        // Сохраняем в localStorage для сохранения состояния после обновления страницы
        localStorage.setItem('authToken', userData.token || 'mock-token');
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Функция успешной регистрации
    const handleSuccessfulSignUp = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        setShowSignUpForm(false);
        
        localStorage.setItem('authToken', userData.token || 'mock-token');
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Функция выхода
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setShowSignInForm(false);
        setShowSignUpForm(false);
        
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    };

    const filterEvents = (events) => {
        return events.filter(event => {
            // Поиск по названию (регистронезависимый)
            if (searchQuery.trim() !== '') {
                const query = searchQuery.toLowerCase();
                const title = event.title.toLowerCase();
                const description = event.description.toLowerCase();
                
                if (!title.includes(query) && !description.includes(query)) {
                    return false;
                }
            }

            // Фильтрация по типу события
            const categoryKeyMap = {
                'Конференция': 'conference',
                'Выставка': 'exhibition',
                'Мастерская': 'workshop',
                'Другое': 'other'
            };
            
            const eventTypeKey = categoryKeyMap[event.category];
            const hasEventTypeFilter = Object.values(filters.eventTypes).some(v => v);
            
            if (hasEventTypeFilter && !filters.eventTypes[eventTypeKey]) {
                return false;
            }

            // Фильтрация по местоположению
            const locationMap = {
                'Тамбов': 'tambov',
                'Москва': 'moscow'
            };
            
            const locationKey = locationMap[event.location] || 'otherLocation';
            const hasLocationFilter = Object.values(filters.locations).some(v => v);
            
            if (hasLocationFilter && !filters.locations[locationKey]) {
                return false;
            }

            // Фильтрация по дате
            const eventDate = parseRussianDate(event.date);
            const now = new Date();
            
            switch (filters.dateRange) {
                case 'this-month':
                    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                    return eventDate >= thisMonthStart && eventDate <= thisMonthEnd;
                    
                case 'next-3-months':
                    const threeMonthsLater = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
                    return eventDate >= now && eventDate <= threeMonthsLater;
                    
                case 'this-year':
                    const thisYearStart = new Date(now.getFullYear(), 0, 1);
                    const thisYearEnd = new Date(now.getFullYear(), 11, 31);
                    return eventDate >= thisYearStart && eventDate <= thisYearEnd;
                    
                case 'all-dates':
                default:
                    return true;
            }
        });
    };

    const filteredEvents = useMemo(() => {
        return filterEvents(allEvents);
    }, [filters, allEvents, searchQuery]);

    // Функция для обработки поиска
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Функции для управления модальными окнами
    const handleOpenSignUp = () => {
        setShowSignUpForm(true);
    };

    const handleCloseSignUp = () => {
        setShowSignUpForm(false);
    };

    const handleOpenSignIn = () => {
        setShowSignInForm(true);
    };

    const handleCloseSignIn = () => {
        setShowSignInForm(false);
    };

    const handleSwitchToSignIn = () => {
        setShowSignUpForm(false);
        setShowSignInForm(true);
    };

    const handleSwitchToSignUp = () => {
        setShowSignInForm(false);
        setShowSignUpForm(true);
    };

    // Моковые данные пользователя для демонстрации
    const mockUserData = {
        name: "Иван Петров",
        email: "ivan@example.com",
        token: "mock-token-12345"
    };

    return (
        <>
            {/* Модальное окно регистрации */}
            {showSignUpForm && (
                <SignUpForm 
                    isOpen={showSignUpForm}
                    onClose={handleCloseSignUp}
                    onSwitchToSignIn={handleSwitchToSignIn}
                    onSuccess={handleSuccessfulSignUp}
                    mockData={mockUserData} // Передаем моковые данные для демо
                />
            )}

            {/* Модальное окно авторизации */}
            {showSignInForm && (
                <SignInForm 
                    isOpen={showSignInForm}
                    onClose={handleCloseSignIn}
                    onSwitchToSignUp={handleSwitchToSignUp}
                    onSuccess={handleSuccessfulLogin}
                    mockData={mockUserData} // Передаем моковые данные для демо
                />
            )}
            
            {/* Header с поддержкой авторизации */}
            <Header 
                onOpenSignUp={handleOpenSignUp} 
                onOpenSignIn={handleOpenSignIn}
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout} // Передаем функцию выхода
            />
            
            <Search onSearch={handleSearch} searchQuery={searchQuery} />
            <Main events={filteredEvents} filters={filters} setFilters={setFilters} />
            <Footer />
            
            {/* Кнопка для добавления события */}
            <AddEvent />
        </>
    );
}

export default App;