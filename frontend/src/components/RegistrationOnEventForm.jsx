import React, { useState } from 'react';
import '../css/RegistrationOnEventForm.css';

const RegistrationOnEventForm = () => {
    const [formData, setFormData] = useState({
        introText: '',
        questions: [
            {
                id: Date.now(),
                text: 'E-mail',
                comment: '',
                isRequired: true,
                type: 'short-text',
                options: [],
                isCollapsed: false
            }
        ]
    });

    const questionTypes = [
        { value: 'short-text', label: 'Короткий произвольный ответ' },
        { value: 'long-text', label: 'Длинный произвольный ответ' },
        { value: 'single-choice', label: 'Выбор одного варианта' },
        { value: 'multiple-choice', label: 'Выбор нескольких вариантов' },
        { value: 'file', label: 'Прикрепление файла (доступно в тарифе «Расширенный»)' },
        { value: 'phone', label: 'Номер телефона' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleQuestionChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === id ? { ...q, [field]: value } : q
            )
        }));
    };

    const handleOptionChange = (questionId, optionIndex, value) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q => {
                if (q.id === questionId) {
                    const newOptions = [...q.options];
                    newOptions[optionIndex] = value;
                    return { ...q, options: newOptions };
                }
                return q;
            })
        }));
    };

    const addQuestion = () => {
        const newQuestion = {
            id: Date.now() + Math.random(),
            text: '',
            comment: '',
            isRequired: false,
            type: 'short-text',
            options: [],
            isCollapsed: false // По умолчанию не свернут
        };
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, newQuestion]
        }));
    };

    const removeQuestion = (id) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== id)
        }));
    };

    const addOption = (questionId) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId 
                    ? { ...q, options: [...q.options, ''] }
                    : q
            )
        }));
    };

    const removeOption = (questionId, optionIndex) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId 
                    ? { 
                        ...q, 
                        options: q.options.filter((_, index) => index !== optionIndex)
                      }
                    : q
            )
        }));
    };

    const toggleQuestionCollapse = (id) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === id ? { ...q, isCollapsed: !q.isCollapsed } : q
            )
        }));
    };

    const saveQuestion = (id) => {
        // Здесь можно добавить валидацию перед сохранением
        console.log('Сохранен вопрос:', formData.questions.find(q => q.id === id));
        
        // Сворачиваем вопрос после сохранения
        toggleQuestionCollapse(id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration form data submitted:', formData);
        // Здесь будет логика сохранения всей анкеты
    };

    const handleCancel = () => {
        setFormData({
            introText: '',
            questions: [
                {
                    id: Date.now(),
                    text: 'E-mail',
                    comment: '',
                    isRequired: true,
                    type: 'short-text',
                    options: [],
                    isCollapsed: false
                }
            ]
        });
    };

    const editQuestion = (id) => {
        // Разворачиваем вопрос для редактирования
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === id ? { ...q, isCollapsed: false } : q
            )
        }));
    };

    return (
        <div className="registration-form-container">
            <div className="registration-form-content">
                <form className="registration-form" onSubmit={handleSubmit}>
                    {/* Шапка с заголовком */}
                    <div className="form-header-section">
                        <h1 className="form-header-title">Регистрация на событие</h1>
                        <p className="form-header-subtitle">
                            Настройте форму регистрации для вашего мероприятия
                        </p>
                    </div>

                    {/* Текст перед анкетой */}
                    <div className="intro-section">
                        <h2 className="section-title">Текст перед анкетой регистрации</h2>
                        <div className="form-group">
                            <textarea
                                name="introText"
                                className="form-textarea intro-text"
                                placeholder="Введите текст, который увидят участники перед началом заполнения анкеты..."
                                rows="4"
                                value={formData.introText}
                                onChange={handleInputChange}
                            />
                            <div className="character-count">
                                {formData.introText.length}/1000
                            </div>
                        </div>
                    </div>

                    {/* Вопросы анкеты */}
                    <div className="questions-section">
                        <div className="section-header">
                            <h2 className="section-title">Вопросы анкеты</h2>
                            <button 
                                type="button" 
                                className="add-question-btn"
                                onClick={addQuestion}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Добавить вопрос
                            </button>
                        </div>

                        <div className="questions-list">
                            {formData.questions.map((question, index) => (
                                <div key={question.id} className="question-item">
                                    <div className="question-header">
                                        <div className="question-header-left">
                                            <span className="question-number">Вопрос {index + 1}</span>
                                            {question.isCollapsed && question.text && (
                                                <span className="question-preview-text">
                                                    {question.text}
                                                    {question.isRequired && <span className="required-star"> *</span>}
                                                    <span className="question-type-badge">
                                                        {questionTypes.find(t => t.value === question.type)?.label}
                                                    </span>
                                                </span>
                                            )}
                                        </div>
                                        <div className="question-header-actions">
                                            {question.isCollapsed ? (
                                                <button 
                                                    type="button"
                                                    className="edit-question-btn"
                                                    onClick={() => editQuestion(question.id)}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                    </svg>
                                                    Редактировать
                                                </button>
                                            ) : (
                                                <button 
                                                    type="button"
                                                    className="save-question-btn"
                                                    onClick={() => saveQuestion(question.id)}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
                                                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                                        <polyline points="7 3 7 8 15 8"></polyline>
                                                    </svg>
                                                    Сохранить вопрос
                                                </button>
                                            )}
                                            {formData.questions.length > 1 && (
                                                <button 
                                                    type="button"
                                                    className="remove-question-btn"
                                                    onClick={() => removeQuestion(question.id)}
                                                    aria-label="Удалить вопрос"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {!question.isCollapsed && (
                                        <div className="question-content">
                                            {/* Текст вопроса */}
                                            <div className="form-group">
                                                <label className="form-label">
                                                    Текст вопроса
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="Введите текст вопроса"
                                                    value={question.text}
                                                    onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                                                />
                                            </div>

                                            {/* Комментарий к вопросу */}
                                            <div className="form-group">
                                                <label className="form-label">
                                                    Комментарий к вопросу
                                                </label>
                                                <textarea
                                                    className="form-textarea comment-text"
                                                    placeholder="Необязательное пояснение к вопросу"
                                                    rows="2"
                                                    value={question.comment}
                                                    onChange={(e) => handleQuestionChange(question.id, 'comment', e.target.value)}
                                                />
                                                <div className="character-count">
                                                    {question.comment.length}/200
                                                </div>
                                            </div>

                                            {/* Чекбокс обязательности */}
                                            <div className="checkbox-group">
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={question.isRequired}
                                                        onChange={(e) => handleQuestionChange(question.id, 'isRequired', e.target.checked)}
                                                        className="checkbox-input"
                                                    />
                                                    <span className="checkbox-custom"></span>
                                                    <span className="checkbox-text">Ответ на вопрос обязателен</span>
                                                </label>
                                            </div>

                                            {/* Тип ответа */}
                                            <div className="form-group">
                                                <label className="form-label">
                                                    Тип ответа
                                                </label>
                                                <div className="answer-types">
                                                    {questionTypes.map((type) => (
                                                        <label key={type.value} className="radio-label">
                                                            <input
                                                                type="radio"
                                                                name={`question-type-${question.id}`}
                                                                value={type.value}
                                                                checked={question.type === type.value}
                                                                onChange={(e) => handleQuestionChange(question.id, 'type', e.target.value)}
                                                                className="radio-input"
                                                            />
                                                            <span className="radio-custom"></span>
                                                            <span className="radio-text">{type.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Поля для вариантов ответов (если выбран тип с вариантами) */}
                                            {(question.type === 'single-choice' || question.type === 'multiple-choice') && (
                                                <div className="options-section">
                                                    <div className="options-header">
                                                        <label className="form-label">Варианты ответов</label>
                                                        <button 
                                                            type="button"
                                                            className="add-option-btn"
                                                            onClick={() => addOption(question.id)}
                                                        >
                                                            + Добавить вариант
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="options-list">
                                                        {question.options.map((option, optionIndex) => (
                                                            <div key={optionIndex} className="option-item">
                                                                <input
                                                                    type="text"
                                                                    className="option-input"
                                                                    placeholder={`Вариант ${optionIndex + 1}`}
                                                                    value={option}
                                                                    onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                                                                />
                                                                {question.options.length > 1 && (
                                                                    <button 
                                                                        type="button"
                                                                        className="remove-option-btn"
                                                                        onClick={() => removeOption(question.id, optionIndex)}
                                                                        aria-label="Удалить вариант"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Предварительный просмотр */}
                    <div className="preview-section">
                        <h2 className="section-title">Предварительный просмотр</h2>
                        <div className="preview-content">
                            <div className="preview-header">
                                <h3 className="preview-title">Регистрация на событие</h3>
                                {formData.introText && (
                                    <p className="preview-intro">{formData.introText}</p>
                                )}
                                <hr className="preview-divider" />
                                <h4 className="preview-subtitle">Вопросы анкеты</h4>
                            </div>
                            
                            <div className="preview-questions">
                                {formData.questions.map((question, index) => (
                                    <div key={question.id} className="preview-question">
                                        <div className="preview-question-header">
                                            <span className="preview-question-text">
                                                {question.text || `Вопрос ${index + 1}`}
                                                {question.isRequired && <span className="required-star"> *</span>}
                                            </span>
                                            {question.comment && (
                                                <p className="preview-question-comment">{question.comment}</p>
                                            )}
                                        </div>
                                        <div className="preview-answer-field">
                                            {renderAnswerField(question)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            Назад
                        </button>
                        <button 
                            type="submit" 
                            className="submit-button"
                        >
                            Отправить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Вспомогательная функция для рендеринга полей ответов в превью
const renderAnswerField = (question) => {
    switch (question.type) {
        case 'short-text':
            return <input type="text" className="preview-input" placeholder="Короткий ответ..." disabled />;
        case 'long-text':
            return <textarea className="preview-textarea" placeholder="Длинный ответ..." rows="3" disabled />;
        case 'single-choice':
            return (
                <div className="preview-radio-group">
                    {question.options.map((option, index) => (
                        <label key={index} className="preview-radio-label">
                            <input type="radio" name={`preview-${question.id}`} disabled />
                            <span className="preview-radio-text">{option || `Вариант ${index + 1}`}</span>
                        </label>
                    ))}
                </div>
            );
        case 'multiple-choice':
            return (
                <div className="preview-checkbox-group">
                    {question.options.map((option, index) => (
                        <label key={index} className="preview-checkbox-label">
                            <input type="checkbox" disabled />
                            <span className="preview-checkbox-text">{option || `Вариант ${index + 1}`}</span>
                        </label>
                    ))}
                </div>
            );
        case 'phone':
            return <input type="tel" className="preview-input" placeholder="+7 (___) ___-__-__" disabled />;
        case 'file':
            return (
                <div className="preview-file-upload">
                    <button type="button" className="preview-file-btn" disabled>
                        Прикрепить файл
                    </button>
                    <span className="preview-file-hint">Доступно в тарифе «Расширенный»</span>
                </div>
            );
        default:
            return <input type="text" className="preview-input" placeholder="Ответ..." disabled />;
    }
};

export default RegistrationOnEventForm;