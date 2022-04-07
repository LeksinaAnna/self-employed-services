import React from 'react';
import { LargeRoom } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { LocationCalendar } from '../LocationCalendar/LocationCalendar';
import { TitleItem } from './TitleItem';

interface Props {
    room: LargeRoom;
}

export const LocationItem: React.FC<Props> = ({ room }) => (
    <div>
        <TitleItem title={room?.title} price={room?.price} />
        <LocationCalendar room={room} />
    </div>
);