import React from 'react';
import { DatePicker } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { HeadLocations } from './HeadLocations';
import { CreateModal } from './CreateModal/CreateModal';

export const Locations: React.FC = observer(() => {
    const { locationsStore } = useStores();
    const { locations, currentDate, setCurrentDate, isCreateModal, service } = locationsStore;

    return (
        <div>
            <HeadLocations openModal={service.openCreateModal} />
            <div style={{ margin: '18px 0' }}>
                <DatePicker value={currentDate} width={100} onValueChange={setCurrentDate} />
            </div>
            {isCreateModal && <CreateModal />}
        </div>
    );
});
