import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Room } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { TitleItem } from './TitleItem';
import { LocationCalendar } from '../LocationCalendar/LocationCalendar';

interface Props {
    room: Room & WithRentals;
}

export const LocationItem: React.FC<Props> = observer(({ room }) => {
    const { locationsStore } = useStores();
    const { setRentals } = locationsStore;

    useEffect(() => {
        setRentals(room.rentals);
    }, []);

    return (
        <div>
            <TitleItem title={room?.title} price={room?.price} />
            <LocationCalendar />
        </div>
    );
});