import React from 'react';
import { Button } from '@skbkontur/react-ui';
import { SpaceBetweenContainer } from '../../../ui/Containers/SpaceBetweenContainer';

interface Props {
    activeStep: number;
    countSteps: number;
    onNextStep: () => void;
    onPrevStep: () => void;
    disabled: boolean;
}

export const StepperNavigate: React.FC<Props> = ({ activeStep, onNextStep, onPrevStep, countSteps, disabled }) => (
    <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <SpaceBetweenContainer align="center">
            <div>
                {activeStep > 0 && (
                    <Button size="medium" onClick={onPrevStep}>
                        Предыдущий шаг
                    </Button>
                )}
            </div>
            <div>
                <Button size="medium" use="success" onClick={onNextStep} disabled={disabled}>
                    {activeStep !== countSteps - 1 ? 'Следующий шаг' : 'Отправить заявку'}
                </Button>
            </div>
        </SpaceBetweenContainer>
    </div>
);
