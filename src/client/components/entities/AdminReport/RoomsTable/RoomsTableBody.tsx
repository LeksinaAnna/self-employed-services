import React from 'react';
import { TableBody } from '@mui/material';
import { RoomId, RoomWithProfit } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { RoomsTableItem } from './RoomsTableItem';

interface Props {
    rooms: RoomWithProfit[];
    onHoverItem: (value: string) => void;
    hoveredItem: RoomId;
}

export const RoomsTableBody: React.FC<Props> = ({ rooms, onHoverItem, hoveredItem }) => (
    <TableBody>
        {rooms.map(room => (
            <RoomsTableItem
                key={`table-${room.roomId}`}
                room={room}
                onHoverItem={onHoverItem}
                isActive={hoveredItem === room.roomId}
            />
        ))}
    </TableBody>
);
