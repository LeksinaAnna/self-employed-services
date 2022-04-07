import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { secondaryText } from '../../../../client-tools/styles/color';
import { Nullable } from '../../../../../common/interfaces/common';
import { LargeRental } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { LargeRoom } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { CalendarCell } from './CalendarCell';

interface Props {
    room: LargeRoom;
}

export const LocationCalendar: React.FC<Props> = observer(({ room }) => {
    const { locationsStore } = useStores();
    const { getTimes, service } = locationsStore;
    const [rentals, setRentals] = useState<{ [key: string]: Nullable<LargeRental> }>();

    useEffect(() => {
        const rentalsFilled = service.fillRentals(room.rentals);
        setRentals(rentalsFilled);
    }, []);

    return (
        <div style={{ border: `1px solid ${secondaryText}`, borderLeft: 'none', display: 'flex' }}>
            {getTimes(rentals).map(
                (time, index) =>
                    index + 1 < Object.values(rentals).length && (
                        <CalendarCell
                            isLast={index + 2 === Object.values(rentals).length}
                            key={time}
                            time={time}
                            rental={rentals[time]}
                        />
                    ),
            )}
        </div>
    );
});
