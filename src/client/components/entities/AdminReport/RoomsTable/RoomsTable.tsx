import React from 'react';
import { Table } from '@mui/material';
import { RoomId, RoomWithProfit } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { RoomsTableHead } from './RoomsTableHead';
import { RoomsTableBody } from './RoomsTableBody';

interface Props {
    rooms: RoomWithProfit[];
    onHoverItem: (value: string) => void;
    hoveredItem: RoomId;
}

export const RoomsTable: React.FC<Props> = ({ rooms, onHoverItem, hoveredItem }) => (
    <Table>
        <RoomsTableHead />
        <RoomsTableBody rooms={rooms} onHoverItem={onHoverItem} hoveredItem={hoveredItem} />
    </Table>
);