import React from 'react';
import { observer } from 'mobx-react-lite';
import { TableBody } from '@mui/material';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { ServiceItem } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { ServicesTableItem } from './ServicesTableItem';

export const ServicesTableBody: React.FC = observer(() => {
    const { servicesPageStore } = useStores();
    const { services, setSelectedItem, service } = servicesPageStore;

    const onOpenSettings = (item: ServiceItem) => {
        setSelectedItem(item);
        service.openCreateModal();
    };

    return (
        <TableBody>
            {services.map(item => (
                <ServicesTableItem
                    onDelete={service.onDelete}
                    openSettings={onOpenSettings}
                    item={item}
                    key={item.serviceId}
                />
            ))}
        </TableBody>
    );
});
