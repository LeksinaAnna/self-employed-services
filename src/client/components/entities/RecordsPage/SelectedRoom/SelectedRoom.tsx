import React from 'react';
import { Room } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { LocationCalendar } from '../../Locations/LocationCalendar/LocationCalendar';
import { WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';

interface Props {
    room: Room & WithRentals;
    updatePage: () => Promise<void>;
}

export const SelectedRoom: React.FC<Props> = ({ room, updatePage }) => (
    <div>
        <LocationCalendar room={room} updatePage={updatePage} />
    </div>
);