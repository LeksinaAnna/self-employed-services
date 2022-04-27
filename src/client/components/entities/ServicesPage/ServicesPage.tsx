import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Center } from '@skbkontur/react-ui';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { Typography } from '../../ui/Text/Typography';
import { notActiveText } from '../../../client-tools/styles/color';
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
            <ServicesHead onValueChange={service.onSearchValue} searchValue={searchValue} />
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 10}}>
                <Button use="success" onClick={service.openCreateModal}>
                    Добавить услугу
                </Button>
            </div>
            <div style={{ margin: '20px 0 ' }}>{services.length > 0 && <ServicesTable />}</div>
            {services.length === 0 && (
                <Center style={{ marginTop: 50 }}>
                    <Typography color={notActiveText} fontSize={'24px'}>
                        Услуги отсутствуют
                    </Typography>
                </Center>
            )}
            {isModal && <CreateServiceModal />}
        </div>
    );
});
