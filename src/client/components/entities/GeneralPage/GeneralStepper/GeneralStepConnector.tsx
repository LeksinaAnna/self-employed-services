import styled from '@emotion/styled';
import { StepConnector, stepConnectorClasses } from '@mui/material';

export const GeneralStepConnector = styled(StepConnector)`
    .${stepConnectorClasses.line} {
        background-image: linear-gradient(95deg, rgb(186,200,144) 0%, rgb(186,200,144) 50%, rgb(186,200,144) 100%);
    }
    &.${stepConnectorClasses.alternativeLabel} {
        top: 24px;
    }
`;