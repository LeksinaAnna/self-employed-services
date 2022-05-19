import React from 'react';
import { TableBody } from '@mui/material';
import { RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { LocationReport } from '../../../../../server/modules/domains/report/entities/report.entity';
import { RoomsTableItem } from './RoomsTableItem';

interface Props {
    rooms: LocationReport[];
    onHoverItem: (value: string) => void;
    hoveredItem: RoomId;
}

export const RoomsTableBody: React.FC<Props> = ({ rooms, onHoverItem, hoveredItem }) => (
    <TableBody>
        {rooms.map(room => room.profit > 0 && (
            <RoomsTableItem
                key={`table-${room.roomId}`}
                room={room}
                onHoverItem={onHoverItem}
                isActive={hoveredItem === room.roomId}
            />
        ))}
    </TableBody>
);
