import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import styled from '@emotion/styled';
import { Specialist } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { ServiceItem } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { hoveredColor } from '../../../../client-tools/styles/color';
import { ServiceListItem } from './ServiceListItem';

interface Props {
    specialist: Specialist;
    selectedSpecialist: Specialist;
    selectedService: ServiceItem;
    onSelectService: (service: ServiceItem, specialist: Specialist) => void;
}

const StyledAccordionSummary = styled(AccordionSummary)<{isActive: boolean}>(({ isActive }) => ({
    background: isActive && hoveredColor,
}));

export const SpecialistItem: React.FC<Props> = ({ specialist, onSelectService, selectedSpecialist, selectedService }) => {
    const [isExpended, setExpanded] = useState(false);

    const onChangeAccordion = (event: React.SyntheticEvent, expanded: boolean) => {
        setExpanded(expanded);
    }

    return (
        <Accordion onChange={onChangeAccordion}>
            <StyledAccordionSummary isActive={isExpended} expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%' }}>{specialist?.fullName}</Typography>
                <Typography sx={{ color: 'text.secondary', width: '54%' }}>{specialist?.contacts?.phone}</Typography>
                {specialist?.profileId === selectedSpecialist?.profileId && <DoneOutlineIcon color={'success'} />}
            </StyledAccordionSummary>
            <AccordionDetails>
                {specialist.services.map(service => (
                    <ServiceListItem
                        key={service?.serviceId}
                        service={service}
                        onSelectService={() => onSelectService(service, specialist)}
                        selectedService={selectedService}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
};
