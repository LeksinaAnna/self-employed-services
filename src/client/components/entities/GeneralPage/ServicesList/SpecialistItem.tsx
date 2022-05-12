import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Specialist } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { ServiceItem } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { ServiceListItem } from './ServiceListItem';

interface Props {
    specialist: Specialist;
    selectedSpecialist: Specialist;
    selectedService: ServiceItem;
    onSelectService: (service: ServiceItem, specialist: Specialist) => void;
}

export const SpecialistItem: React.FC<Props> = ({
    specialist,
    onSelectService,
    selectedSpecialist,
    selectedService,
}) => (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%' }}>{specialist?.fullName}</Typography>
            <Typography sx={{ color: 'text.secondary', width: '54%' }}>{specialist?.contacts?.phone}</Typography>
            {specialist?.profileId === selectedSpecialist?.profileId && <DoneOutlineIcon color={'success'} />}
        </AccordionSummary>
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
