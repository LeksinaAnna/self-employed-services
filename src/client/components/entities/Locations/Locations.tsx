import React from 'react';
import { DatePicker, Gapped } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { HeadLocations } from './HeadLocations';
import { CreateModal } from './CreateModal/CreateModal';
import { LocationItem } from './LocationItem/LocationItem';

export const Locations: React.FC = observer(() => {
    const { locationsStore } = useStores();
    const { locations, currentDate, setCurrentDate, isCreateModal, service, destroy } = locationsStore;

    useAsyncEffectWithError(async (signal) => {
        await service.init(signal);
    }, [currentDate]);

    React.useEffect(() => destroy, []);

    return (
        <div>
            <HeadLocations openModal={service.openCreateModal} />
            <div style={{ margin: '18px 0' }}>
                <DatePicker value={currentDate} width={100} onValueChange={setCurrentDate} />
            </div>
            <Gapped vertical gap={25}>
                {locations.map(room => <LocationItem key={room.roomId} room={room} />)}
            </Gapped>
            {isCreateModal && <CreateModal />}
        </div>
    );
});
