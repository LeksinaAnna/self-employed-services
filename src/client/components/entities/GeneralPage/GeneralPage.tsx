import React from 'react';
import { observer } from 'mobx-react-lite';
import { Stack } from '@mui/material';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { GeneralStepper } from './GeneralStepper/GeneralStepper';
import { StepperNavigate } from './GeneralStepper/StepperNavigate';
import { LocationList } from './LocationList/LocationList';
import { ServicesList } from './ServicesList/ServicesList';

export const GeneralPage: React.FC = observer(() => {
    const { generalPageStore } = useStores();
    const { steps, currentStep, nextStep, prevStep, nextStepDisabled } = generalPageStore;

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <Stack spacing={3}>
                <GeneralStepper steps={steps} activeStep={currentStep} />
                <StepperNavigate
                    activeStep={currentStep}
                    onNextStep={nextStep}
                    onPrevStep={prevStep}
                    countSteps={steps.length}
                    disabled={nextStepDisabled}
                />
                {currentStep === 0 && <LocationList />}
                {currentStep === 1 && <ServicesList />}
                {currentStep === 2 && <LocationList />}
                {currentStep === 3 && <LocationList />}
            </Stack>
        </div>
    );
});
