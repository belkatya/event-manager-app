//Авторизация
import React, { useState } from 'react';
import '../css/SignInForm.css';

const SignInForm = ({ isOpen, onClose, onSwitchToSignUp }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Очищаем ошибку при изменении поля
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Введите email';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }

        // Проверка пароля
        if (!formData.password) {
            newErrors.password = 'Введите пароль';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsLoading(true);
            
            try {
                // Здесь будет API запрос для входа
                console.log('Данные для входа:', formData);
                // Например: authService.login(formData)
                
                // Имитация загрузки
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // После успешного входа:
                onClose();
                
                // Можно показать сообщение об успехе
                alert('Вход выполнен успешно!');
                
                // Можно обновить состояние пользователя в приложении
                
            } catch (error) {
                setErrors({
                    general: 'Неверный email или пароль. Попробуйте снова.'
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleClose = () => {
        setFormData({
            email: '',
            password: '',
            rememberMe: false
        });
        setErrors({});
        onClose();
    };

    const handleForgotPassword = () => {
        // Здесь можно открыть форму восстановления пароля
        console.log('Восстановление пароля для:', formData.email);
        alert('Функция восстановления пароля будет реализована позже.');
    };

    // Если модальное окно закрыто, не рендерим
    if (!isOpen) return null;

    return (
        <div className="signin-modal-overlay">
            <div className="signin-modal-container">
                <div className="signin-modal">
                    {/* Заголовок и кнопка закрытия */}
                    <div className="signin-modal-header">
                        <h2 className="signin-modal-title">Вход в Wevent</h2>
                        <button 
                            className="signin-close-btn"
                            onClick={handleClose}
                            aria-label="Закрыть"
                            disabled={isLoading}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Форма входа */}
                    <form className="signin-form" onSubmit={handleSubmit}>
                        {/* Общая ошибка */}
                        {errors.general && (
                            <div className="error-general">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                <span>{errors.general}</span>
                            </div>
                        )}

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder="example@mail.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <span className="error-message">{errors.email}</span>
                            )}
                        </div>

                        {/* Пароль */}
                        <div className="form-group">
                            <div className="password-label-row">
                                <label htmlFor="password" className="form-label">
                                    Пароль
                                </label>
                                <button 
                                    type="button"
                                    className="forgot-password-btn"
                                    onClick={handleForgotPassword}
                                    disabled={isLoading}
                                >
                                    Забыли пароль?
                                </button>
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`form-input ${errors.password ? 'error' : ''}`}
                                placeholder="Введите ваш пароль"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <span className="error-message">{errors.password}</span>
                            )}
                        </div>

                        {/* Чекбокс "Запомнить меня" */}
                        <div className="checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    className="checkbox-input"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <span className="checkbox-custom"></span>
                                <span className="checkbox-text">Запомнить меня</span>
                            </label>
                        </div>

                        {/* Кнопка входа */}
                        <button 
                            type="submit" 
                            className="signin-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Вход...
                                </>
                            ) : (
                                'Войти'
                            )}
                        </button>
                    </form>

                    {/* Ссылка на регистрацию */}
                    <div className="signin-footer">
                        <p className="signin-footer-text">
                            Нет аккаунта?{' '}
                            <button 
                                type="button" 
                                className="signin-signup-link"
                                onClick={onSwitchToSignUp}
                                disabled={isLoading}
                            >
                                Зарегистрироваться
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;