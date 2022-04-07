import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { Nullable } from '../../../../../common/interfaces/common';
import { LargeRental } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { LargeRoom } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { CalendarCell } from './CalendarCell';
import { CalendarTimes } from './CalendarTimes';

interface Props {
    room: LargeRoom;
}

export const LocationCalendar: React.FC<Props> = observer(({ room }) => {
    const { locationsStore } = useStores();
    const { service, times } = locationsStore;
    const [rentals, setRentals] = useState<{ [key: string]: Nullable<LargeRental> }>();

    useEffect(() => {
        const rentalsFilled = service.fillRentals(room.rentals);
        setRentals(rentalsFilled);
    }, [room.rentals]);

    return (
        <div style={{ display: 'relative' }}>
            <div style={{ display: 'flex' }}>
                {rentals && Object.keys(rentals).map(key => <CalendarCell key={key} rental={rentals[key]} />)}
            </div>
            {rentals && <CalendarTimes times={times} />}
        </div>
    );
});
