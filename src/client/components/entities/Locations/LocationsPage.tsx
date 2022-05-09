import React from 'react';
import { Button, Center, DatePicker, Gapped } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { Pagination, Stack } from '@mui/material';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { secondaryText } from '../../../client-tools/styles/color';
import { Typography } from '../../ui/Text/Typography';
import { LocationCalendar } from '../LocationCalendar/LocationCalendar';
import { HeadLocations } from './HeadLocations';
import { LocationModal } from './LocationModal/CreateModal';
import { LocationTabs } from './LocationTabs';

export const LocationsPage: React.FC = observer(() => {
    const { locationsStore } = useStores();
    const {
        locations,
        currentDate,
        setCurrentDate,
        searchValue,
        isLocationModal,
        service,
        destroy,
        activeTab,
        countPages,
        currentPage,
        openLocationModal,
        closeLocationModal,
        selectedLocation,
    } = locationsStore;

    useAsyncEffectWithError(
        async signal => {
            await service.init(signal);
        },
        [currentDate],
    );

    React.useEffect(() => destroy, []);

    return (
        <Stack spacing={2}>
            <HeadLocations onValueChange={service.onSearchChange} value={searchValue} isModal={isLocationModal} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <DatePicker disabled={isLocationModal} value={currentDate} width={100} onValueChange={setCurrentDate} />
                <Button onClick={() => openLocationModal(null)} use="success">
                    Добавить локацию
                </Button>
            </div>
            <LocationTabs value={activeTab} onValue={service.changeTab} />
            <Gapped vertical gap={40}>
                {locations.map(room => (
                    <LocationCalendar
                        key={room.roomId}
                        openSettings={() => openLocationModal(room.roomId)}
                        room={room}
                        updatePage={service.init}
                        currentDate={currentDate}
                    />
                ))}
            </Gapped>
            {locations.length === 0 && (
                <Center>
                    <Typography fontSize={'20px'} color={secondaryText}>
                        Локации отсутствуют
                    </Typography>
                </Center>
            )}
            {countPages > 1 && (
                <div style={{ paddingTop: 20 }}>
                    <Pagination
                        variant="outlined"
                        color="primary"
                        count={countPages}
                        page={currentPage}
                        onChange={(event, page) => service.changePage(page)}
                    />
                </div>
            )}
            {isLocationModal && (
                <LocationModal
                    accept={selectedLocation ? service.updateLocation : service.createLocation}
                    room={selectedLocation}
                    onClose={closeLocationModal}
                />
            )}
        </Stack>
    );
});
