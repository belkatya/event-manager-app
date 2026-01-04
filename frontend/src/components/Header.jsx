import React, { useState, useRef, useEffect } from 'react';
import '../css/header.css';

function Header({ onOpenSignUp, onOpenSignIn, isAuthenticated, user }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Закрытие dropdown при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSettings = () => {
        console.log('Переход к настройкам');
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        console.log('Выход из системы');
        // Здесь будет логика выхода
        setIsDropdownOpen(false);
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-brand">
                    <h1 className="brand-title">Wevent</h1>
                </div>
                
                <div className="nav-links">
                    <a href="#search" className="nav-link">Поиск мероприятий</a>
                    <a href="#create" className="nav-link">Создать мероприятие</a>
                    <a href="#my-events" className="nav-link">Мои мероприятия</a>
                    <a href="#favorites" className="nav-link">Избранное</a>
                </div>
                
                <div className="nav-actions" ref={dropdownRef}>
                    {!isAuthenticated ? (
                        // Показываем кнопки входа и регистрации для неавторизованных пользователей
                        <>
                            <button 
                                className="btn-login"
                                onClick={onOpenSignIn}
                            >
                                Войти
                            </button>
                            <button 
                                className="btn-register"
                                onClick={onOpenSignUp}
                            >
                                Регистрация
                            </button>
                        </>
                    ) : (
                        // Показываем личный кабинет для авторизованных пользователей
                        <>
                            <button 
                                className="user-dropdown-btn"
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                <span className="user-name">
                                    {user?.name || 'Личный кабинет'}
                                </span>
                                <svg 
                                    className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="white" 
                                    strokeWidth="2"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div className="user-dropdown-menu">
                                    <div className="dropdown-header">
                                        <div className="user-avatar">
                                            {user?.name?.substring(0, 2) || 'ИП'}
                                        </div>
                                        <div className="user-info">
                                            <div className="user-info-name">
                                                {user?.name || 'Имя пользователя'}
                                            </div>
                                            <div className="user-info-email">
                                                {user?.email || 'user@example.com'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="dropdown-divider"></div>
                                    
                                    <button 
                                        className="dropdown-item"
                                        onClick={handleSettings}
                                    >
                                        <svg className="dropdown-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                                        </svg>
                                        <span>Настройки</span>
                                    </button>
                                    
                                    <button 
                                        className="dropdown-item logout"
                                        onClick={handleLogout}
                                    >
                                        <svg className="dropdown-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        <span>Выход</span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header;