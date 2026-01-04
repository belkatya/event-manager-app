import React, { useState } from 'react';
import '../css/NewEvent.css';

const NewEventForm = () => {
    const [eventData, setEventData] = useState({
        title: '',
        shortDescription: '',
        fullDescription: '',
        category: '',
        city: '',
        address: '',
        date: '',
        startTime: '',
        coverImage: null,
        coverPreview: null
    });

    const categories = [
        { value: '', label: 'Выберите категорию' },
        { value: 'conference', label: 'Конференция' },
        { value: 'exhibition', label: 'Выставка' },
        { value: 'workshop', label: 'Мастер-класс' },
        { value: 'other', label: 'Другое' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventData(prev => ({
                    ...prev,
                    coverImage: file,
                    coverPreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setEventData(prev => ({
            ...prev,
            coverImage: null,
            coverPreview: null
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Event data submitted:', eventData);
        // Здесь будет логика сохранения данных
    };

    const handleCancel = () => {
        setEventData({
            title: '',
            shortDescription: '',
            fullDescription: '',
            category: '',
            city: '',
            address: '',
            date: '',
            startTime: '',
            coverImage: null,
            coverPreview: null
        });
    };

    return (
        <div className="new-event-container">
            <div className="new-event-content">
                <form className="new-event-form" onSubmit={handleSubmit}>
                    {/* Секция обложки */}
                    <div className="cover-section">
                        <h2 className="section-title">Обложка</h2>
                        <div className="cover-content">
                            <div className="cover-upload-area">
                                {eventData.coverPreview ? (
                                    <div className="cover-preview-container">
                                        <div className="cover-preview-wrapper">
                                            <img 
                                                src={eventData.coverPreview} 
                                                alt="Обложка мероприятия" 
                                                className="cover-preview"
                                            />
                                            <button 
                                                type="button"
                                                className="remove-cover-btn"
                                                onClick={handleRemoveImage}
                                                aria-label="Удалить обложку"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="upload-label">
                                        <input
                                            type="file"
                                            className="file-input"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <div className="upload-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="#6d4fe6" strokeWidth="2">
                                                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        <p className="upload-text">Загрузить</p>
                                        <p className="upload-hint">PNG, JPG до 5MB</p>
                                    </label>
                                )}
                            </div>
                            <div className="cover-info">
                                <p className="cover-info-text">
                                    Загрузите обложку для вашего мероприятия. 
                                    Рекомендуемый размер: 1200×630 пикселей.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Секция с полями формы */}
                    <div className="form-fields-section">
                        <h2 className="section-title">Основная информация</h2>
                        
                        <div className="form-grid">
                            {/* Название */}
                            <div className="form-group">
                                <label htmlFor="title" className="form-label">
                                    Название
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-input"
                                    placeholder="Введите название мероприятия"
                                    value={eventData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="character-count">
                                    {eventData.title.length}/100
                                </div>
                            </div>

                            {/* Категория */}
                            <div className="form-group">
                                <label htmlFor="category" className="form-label">
                                    Категория
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="form-select"
                                    value={eventData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {categories.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Город */}
                            <div className="form-group">
                                <label htmlFor="city" className="form-label">
                                    Город
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="form-input"
                                    placeholder="Введите город проведения"
                                    value={eventData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Адрес */}
                            <div className="form-group">
                                <label htmlFor="address" className="form-label">
                                    Адрес
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="form-input"
                                    placeholder="Введите полный адрес мероприятия"
                                    value={eventData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Дата */}
                            <div className="form-group">
                                <label htmlFor="date" className="form-label">
                                    Дата проведения
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="form-input"
                                    value={eventData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Время начала */}
                            <div className="form-group">
                                <label htmlFor="startTime" className="form-label">
                                    Время начала
                                </label>
                                <input
                                    type="time"
                                    id="startTime"
                                    name="startTime"
                                    className="form-input"
                                    value={eventData.startTime}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="timezone-hint">
                                    Укажите время проведения по часовому поясу города
                                </div>
                            </div>

                            {/* Краткое описание */}
                            <div className="form-group full-width">
                                <label htmlFor="shortDescription" className="form-label">
                                    Краткое описание
                                </label>
                                <textarea
                                    id="shortDescription"
                                    name="shortDescription"
                                    className="form-textarea short-description"
                                    placeholder="Краткое описание мероприятия (будет отображаться в карточках и превью)"
                                    rows="3"
                                    value={eventData.shortDescription}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="character-count">
                                    {eventData.shortDescription.length}/200
                                </div>
                            </div>

                            {/* Полное описание */}
                            <div className="form-group full-width">
                                <label htmlFor="fullDescription" className="form-label">
                                    Полное описание
                                </label>
                                <textarea
                                    id="fullDescription"
                                    name="fullDescription"
                                    className="form-textarea full-description"
                                    placeholder="Полное описание мероприятия (подробная информация о событии)"
                                    rows="6"
                                    value={eventData.fullDescription}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="character-count">
                                    {eventData.fullDescription.length}/2000
                                </div>
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
                            Отмена
                        </button>
                        <button 
                            type="submit" 
                            className="submit-button"
                        >
                            Далее
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewEventForm;