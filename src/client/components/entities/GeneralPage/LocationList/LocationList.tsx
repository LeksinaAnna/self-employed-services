import React from 'react';
import { observer } from 'mobx-react-lite';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import styled from '@emotion/styled';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { LocationTabs } from '../../Locations/LocationTabs';
import { useAsyncEffectWithError } from '../../../../client-tools/hooks/use-async-effect';
import { LocationItem } from './LocationItem';

const StyledCell = styled(TableCell)`
    padding: 5px;
`;

export const LocationList: React.FC = observer(() => {
    const {
        generalPageStore: { _locationsStore },
    } = useStores();
    const { locations, activeTab, selectedLocation, selectRoom, service } = _locationsStore;

    useAsyncEffectWithError(async abortSignal => {
        await service.init(abortSignal);
    }, []);

    return (
        <Stack spacing={3}>
            <LocationTabs value={activeTab} onValue={service.changeTab} />
            {locations.length > 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledCell width='60%'>Адрес</StyledCell>
                            <StyledCell>Тип помещения</StyledCell>
                            <StyledCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locations.map(room => (
                            <LocationItem
                                key={room.roomId}
                                item={room}
                                selectedRoom={selectedLocation}
                                onSelect={selectRoom}
                            />
                        ))}
                    </TableBody>
                </Table>
            )}
        </Stack>
    );
});
