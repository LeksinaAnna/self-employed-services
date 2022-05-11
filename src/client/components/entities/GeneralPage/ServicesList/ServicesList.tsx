import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography } from '@mui/material';
import { Center } from '@skbkontur/react-ui';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../../client-tools/hooks/use-async-effect';
import { secondaryText } from '../../../../client-tools/styles/color';
import { SpecialistItem } from './SpecialistItem';

export const ServicesList: React.FC = observer(() => {
    const {
        generalPageStore: { _servicesStore },
    } = useStores();
    const { specialists, service, setSelectedService, selectedService, selectedSpecialist } = _servicesStore;

    useAsyncEffectWithError(async abortSignal => {
        await service.init(abortSignal);
    }, []);

    return (
        <div>
            <Box sx={{ padding: '20px', marginBottom: '25px' }}>
                {specialists.length > 0 &&
                    specialists.map(specialist => (
                        <SpecialistItem
                            key={specialist.profileId}
                            specialist={specialist}
                            onSelectService={setSelectedService}
                            selectedService={selectedService}
                            selectedSpecialist={selectedSpecialist}
                        />
                    ))}
                {specialists.length === 0 && (
                    <Center>
                        <Typography fontSize={24} color={secondaryText}>Мастера отсутствуют</Typography>
                    </Center>
                )}
            </Box>
        </div>
    );
});
