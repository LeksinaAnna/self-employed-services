import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Stack } from '@mui/material';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { GeneralStepper } from './GeneralStepper/GeneralStepper';
import { StepperNavigate } from './GeneralStepper/StepperNavigate';
import { LocationList } from './LocationList/LocationList';
import { ServicesList } from './ServicesList/ServicesList';
import { TimeList } from './TimeList/TimeList';
import { RecordSendModal } from './RecordSendModal/RecordSendModal';

export const GeneralPage: React.FC = observer(() => {
    const { generalPageStore } = useStores();
    const { steps, currentStep, nextStep, prevStep, nextStepDisabled, destroy, isCompletedModal, setIsCompletedModal } = generalPageStore;

    useEffect(() => destroy, []);

    const openCompleteModal = () => {
        setIsCompletedModal(true);
    }

    const closeCompleteModal = () => {
        setIsCompletedModal(false);
    }

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <Stack spacing={3}>
                <GeneralStepper steps={steps} activeStep={currentStep} />
                <StepperNavigate
                    activeStep={currentStep}
                    onNextStep={currentStep < 2 ? nextStep : openCompleteModal}
                    onPrevStep={prevStep}
                    countSteps={steps.length}
                    disabled={nextStepDisabled}
                />
                {currentStep === 0 && <LocationList />}
                {currentStep === 1 && <ServicesList />}
                {currentStep === 2 && <TimeList />}

                {isCompletedModal && <RecordSendModal onClose={closeCompleteModal} />}
            </Stack>
        </div>
    );
});
