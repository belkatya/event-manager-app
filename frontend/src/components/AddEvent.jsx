import React, { useState, useMemo } from 'react';
import NewEventHeader from './NewEventHeader';
import NewEventForm from './NewEventForm';
import RegistrationOnEventForm from './RegistrationOnEventForm';

function AddEvent() {
    const [activeStep, setActiveStep] = useState(1);
    const steps = useMemo(() => {
        return {
            1: <NewEventForm onStepChange={setActiveStep} />,
            2: <RegistrationOnEventForm onStepChange={setActiveStep} />,
        };
    }, []);

    return (
        <div className="add-event-page">
            <div className="add-event-content">
                <NewEventHeader activeStep={activeStep} onStepChange={setActiveStep} />
                {steps[activeStep]}
            </div>
        </div>
    );
}

export default AddEvent;