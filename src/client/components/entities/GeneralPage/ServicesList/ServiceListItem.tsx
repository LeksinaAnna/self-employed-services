import React from 'react';
import { Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { defaultPortalColor, whiteHoveredColor } from '../../../../client-tools/styles/color';
import {
    ServiceItem,
    ServiceItemId,
} from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { UserId } from '../../../../../server/modules/domains/users/entities/user.entity';

const StyledPaper = styled(Paper)`
    padding: 15px;
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
    selectedService: ServiceItemId;
    onSelectService: (serviceId: ServiceItemId, specialistId: UserId) => void;
}

export const ServiceListItem: React.FC<Props> = ({ service, onSelectService, selectedService }) => (
    <StyledPaper onClick={() => onSelectService(service.serviceId, service.createdBy)}>
        <Typography sx={{ width: '33%' }}>{service.title}</Typography>
        <Typography sx={{ width: '33%' }}>{service.price} руб</Typography>
        <Typography sx={{ width: '20%' }}>{service.duration / (1000 * 60)} минут</Typography>
        {service.serviceId === selectedService && <DoneOutlineIcon color={'success'} />}
    </StyledPaper>
);
