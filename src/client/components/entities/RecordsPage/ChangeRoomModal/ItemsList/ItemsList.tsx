import React from 'react';
import { LargeRoom, RoomId } from '../../../../../../server/modules/domains/rooms/entities/room.entity';
import { RoomItem } from './RoomItem';

interface Props {
    items: LargeRoom[];
    onChange: (roomId: RoomId) => void;
}

export const ItemsList: React.FC<Props> = ({ items }) => {
    return (
        <div style={{ display: 'flex', padding: 15, flexDirection: 'column' }}>
            {items.length > 0 && items.map(room => <RoomItem key={room.roomId} item={room} />)}
        </div>
    );
};