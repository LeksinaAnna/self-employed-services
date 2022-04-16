import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { Typography } from '../../ui/Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { CreateServiceModal } from './CreateModal/CreateServiceModal';
import { ServicesHead } from './ServicesHead';
import { ServicesTable } from './ServicesTable/ServicesTable';

export const ServicesPage: React.FC = observer(() => {
    const { servicesPageStore } = useStores();
    const { service, isModal, searchValue, services } = servicesPageStore;

    useAsyncEffectWithError(async abortSignal => {
        await service.init(abortSignal);
    }, []);

    return (
        <div>
            <ServicesHead
                onValueChange={service.onSearchValue}
                searchValue={searchValue}
                openModal={service.openCreateModal}
            />
            <div style={{ margin: '20px 0 ' }}>{services.length > 0 && <ServicesTable />}</div>
            {services.length === 0 && (
                <Typography fontSize={'20px'} color={secondaryText}>
                    Нет ни одной услуги
                </Typography>
            )}
            {isModal && <CreateServiceModal />}
        </div>
    );
});
