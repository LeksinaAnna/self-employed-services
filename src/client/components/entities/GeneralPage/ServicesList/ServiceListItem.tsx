import React from 'react';
import { Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { defaultPortalColor, whiteHoveredColor } from '../../../../client-tools/styles/color';
import { ServiceItem } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';

const StyledPaper = styled(Paper)`
    padding: 15px;
    margin: 5px 0;
    box-shadow: none;
    border: 1px solid ${defaultPortalColor};
    display: flex;

    :hover {
        cursor: pointer;
        background: ${whiteHoveredColor};
    }
`;

interface Props {
    service: ServiceItem;
    selectedService: ServiceItem;
    onSelectService: () => void;
}

export const ServiceListItem: React.FC<Props> = ({ service, onSelectService, selectedService }) => (
    <StyledPaper onClick={onSelectService}>
        <Typography sx={{ width: '33%' }}>{service?.title}</Typography>
        <Typography sx={{ width: '33%' }}>{service?.price} руб</Typography>
        <Typography sx={{ width: '20%' }}>{service?.duration / (1000 * 60)} минут</Typography>
        {service?.serviceId === selectedService?.serviceId && <DoneOutlineIcon color={'success'} />}
    </StyledPaper>
);
