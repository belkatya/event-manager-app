import React, { useState } from 'react';
import '../css/SignUpForm.css';

const SignUpForm = ({ isOpen, onClose, onSwitchToSignIn }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState({});

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

        // Проверка имени
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Введите имя';
        } else if (formData.firstName.length < 2) {
            newErrors.firstName = 'Имя должно быть не менее 2 символов';
        }

        // Проверка фамилии
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Введите фамилию';
        } else if (formData.lastName.length < 2) {
            newErrors.lastName = 'Фамилия должна быть не менее 2 символов';
        }

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
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов';
        }

        // Проверка подтверждения пароля
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Подтвердите пароль';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }

        // Проверка согласия с условиями
        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'Необходимо согласиться с условиями';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('Регистрационные данные:', formData);
            // Здесь будет API запрос для регистрации
            // Например: authService.register(formData)
            
            // После успешной регистрации:
            onClose();
            
            // Можно показать сообщение об успехе
            alert('Регистрация прошла успешно! Проверьте ваш email для подтверждения.');
        }
    };

    const handleClose = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false
        });
        setErrors({});
        onClose();
    };

    // Если модальное окно закрыто, не рендерим
    if (!isOpen) return null;

    return (
        <div className="signup-modal-overlay">
            <div className="signup-modal-container">
                <div className="signup-modal">
                    {/* Заголовок и кнопка закрытия */}
                    <div className="signup-modal-header">
                        <h2 className="signup-modal-title">Регистрация в Wevent</h2>
                        <button 
                            className="signup-close-btn"
                            onClick={handleClose}
                            aria-label="Закрыть"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Форма регистрации */}
                    <form className="signup-form" onSubmit={handleSubmit}>
                        {/* Первая строка: Имя и Фамилия */}
                        <div className="signup-form-row">
                            <div className="form-group half-width">
                                <label htmlFor="firstName" className="form-label">
                                    Имя
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                                    placeholder="Введите ваше имя"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                {errors.firstName && (
                                    <span className="error-message">{errors.firstName}</span>
                                )}
                            </div>

                            <div className="form-group half-width">
                                <label htmlFor="lastName" className="form-label">
                                    Фамилия
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                                    placeholder="Введите вашу фамилию"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                {errors.lastName && (
                                    <span className="error-message">{errors.lastName}</span>
                                )}
                            </div>
                        </div>

                        {/* Вторая строка: Email на всю ширину */}
                        <div className="signup-form-row">
                            <div className="form-group full-width">
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
                                />
                                {errors.email && (
                                    <span className="error-message">{errors.email}</span>
                                )}
                            </div>
                        </div>

                        {/* Третья строка: Пароль и Подтверждение пароля */}
                        <div className="signup-form-row">
                            <div className="form-group half-width">
                                <label htmlFor="password" className="form-label">
                                    Пароль
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    placeholder="Не менее 6 символов"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                {errors.password && (
                                    <span className="error-message">{errors.password}</span>
                                )}
                            </div>

                            <div className="form-group half-width">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Подтвердите пароль
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                                    placeholder="Повторите пароль"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                {errors.confirmPassword && (
                                    <span className="error-message">{errors.confirmPassword}</span>
                                )}
                            </div>
                        </div>

                        {/* Чекбокс согласия */}
                        <div className="checkbox-group">
                            <label className={`checkbox-label ${errors.agreeTerms ? 'error' : ''}`}>
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    className="checkbox-input"
                                    checked={formData.agreeTerms}
                                    onChange={handleInputChange}
                                />
                                <span className="checkbox-custom"></span>
                                <span className="checkbox-text">
                                    Я соглашаюсь с{' '}
                                    <a href="/terms" className="terms-link">
                                        Условиями использования
                                    </a>{' '}
                                    и{' '}
                                    <a href="/privacy" className="terms-link">
                                        Политикой конфиденциальности
                                    </a>
                                </span>
                            </label>
                            {errors.agreeTerms && (
                                <span className="error-message checkbox-error">{errors.agreeTerms}</span>
                            )}
                        </div>

                        {/* Кнопка регистрации */}
                        <button type="submit" className="signup-submit-btn">
                            Зарегистрироваться
                        </button>
                    </form>

                    {/* Ссылка на вход */}
                    <div className="signup-footer">
                        <p className="signup-footer-text">
                            Уже есть аккаунт?{' '}
                            <button 
                                type="button" 
                                className="signup-login-link"
                                onClick={onSwitchToSignIn}
                            >
                                Войти
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;