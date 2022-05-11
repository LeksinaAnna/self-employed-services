import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../../client-tools/hooks/use-async-effect';
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
                            specialist={specialist}
                            onSelectService={setSelectedService}
                            selectedService={selectedService}
                            selectedSpecialist={selectedSpecialist}
                        />
                    ))}
            </Box>
        </div>
    );
});
