import React from 'react';
import { Step, StepIconProps, StepLabel, Stepper, stepLabelClasses } from '@mui/material';
import {
    AccountCircleOutlined,
    CalendarMonthOutlined,
    LocationOnOutlined,
    RoomServiceOutlined,
} from '@mui/icons-material';
import styled from '@emotion/styled';
import { blackGreenDefaultPortalColor, defaultPortalColor } from '../../../../client-tools/styles/color';
import { GeneralStepConnector } from './GeneralStepConnector';

const StyledStepLabel = styled(StepLabel)`
    .${stepLabelClasses.active} {
        color: ${defaultPortalColor} !important;
    }

    .${stepLabelClasses.completed} {
        color: ${blackGreenDefaultPortalColor} !important;
    }
`;

interface Props {
    steps: string[];
    activeStep: number;
}

export const GeneralStepper: React.FC<Props> = ({ steps, activeStep }) => (
    <Stepper activeStep={activeStep} alternativeLabel connector={<GeneralStepConnector />}>
        {steps.map(step => (
            <Step key={step}>
                <StyledStepLabel StepIconComponent={StepIcon}>{step}</StyledStepLabel>
            </Step>
        ))}
    </Stepper>
);

const IconWrapper = styled.div<{ active: boolean; completed: boolean }>(({ active, completed }) => ({
    color: '#fff',
    background: '#ccc',
    borderRadius: '50%',
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    ...(active && {
        background: defaultPortalColor,
    }),
    ...(completed && {
        background: blackGreenDefaultPortalColor,
    }),
}));

const StepIcon: React.FC<StepIconProps> = ({ active, completed, icon }) => {
    const icons = {
        1: <LocationOnOutlined />,
        2: <RoomServiceOutlined />,
        3: <AccountCircleOutlined />,
        4: <CalendarMonthOutlined />,
    };

    return (
        <IconWrapper active={active} completed={completed}>
            {icons[icon.toString()]}
        </IconWrapper>
    );
};
