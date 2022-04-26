import React from 'react';
import { DatePicker, Gapped } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { secondaryText } from '../../../client-tools/styles/color';
import { Typography } from '../../ui/Text/Typography';
import { LocationCalendar } from '../LocationCalendar/LocationCalendar';
import { HeadLocations } from './HeadLocations';
import { CreateModal } from './CreateModal/CreateModal';

export const LocationsPage: React.FC = observer(() => {
    const { locationsStore } = useStores();
    const { locations, currentDate, setCurrentDate, searchValue, isCreateModal, service, destroy } = locationsStore;

    useAsyncEffectWithError(
        async signal => {
            await service.init(signal);
        },
        [currentDate],
    );

    React.useEffect(() => destroy, []);

    return (
        <div>
            <HeadLocations
                onValueChange={service.onSearchChange}
                value={searchValue}
                isModal={isCreateModal}
                openModal={service.openCreateModal}
            />
            <div style={{ margin: '18px 0' }}>
                <DatePicker disabled={isCreateModal} value={currentDate} width={100} onValueChange={setCurrentDate} />
            </div>
            <Gapped vertical gap={40}>
                {locations.map(room => (
                    <LocationCalendar key={room.roomId} room={room} updatePage={service.init} currentDate={currentDate} />
                ))}
            </Gapped>
            {locations.length === 0 && (
                <Typography fontSize={'20px'} color={secondaryText}>
                    Локации отсутствуют
                </Typography>
            )}
            {isCreateModal && <CreateModal />}
        </div>
    );
});
