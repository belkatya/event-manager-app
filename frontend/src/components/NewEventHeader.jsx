import React, { useState } from 'react';
import '../css/search.css';

function NewEventHeader({ activeStep = 1, onStepChange }) {
    const [currentStep, setCurrentStep] = useState(activeStep);

    const handleStepClick = (step) => {
        setCurrentStep(step);
        if (onStepChange) {
            onStepChange(step);
        }
    };

    return (
        <div className="search-section new-event-header">
            <h2 className="search-title search-form">Новое мероприятие</h2>
            
            <div className="new-event-steps search-form">
                <button 
                    type="button"
                    className={`new-event-step ${currentStep === 1 ? 'active' : ''}`}
                    onClick={() => handleStepClick(1)}
                >
                    <span className="step-number">1</span>
                    <span className="step-text">Описание</span>
                </button>
                
                <button 
                    type="button"
                    className={`new-event-step ${currentStep === 2 ? 'active' : ''}`}
                    onClick={() => handleStepClick(2)}
                >
                    <span className="step-number">2</span>
                    <span className="step-text">Анкета регистрации</span>
                </button>
            </div>
        </div>
    );
}

export default NewEventHeader;