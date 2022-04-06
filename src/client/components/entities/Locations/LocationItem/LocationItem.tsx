import React from 'react';
import { Room } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { TitleItem } from './TitleItem';

interface Props {
    room: Room;
}

export const LocationItem: React.FC<Props> = ({ room }) => (
    <div>
        <TitleItem title={room?.title} price={room?.price} />
    </div>
);