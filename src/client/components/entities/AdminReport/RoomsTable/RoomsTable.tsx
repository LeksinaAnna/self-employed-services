import React from 'react';
import { Table } from '@mui/material';
import { RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { LocationReport } from '../../../../../server/modules/domains/report/entities/report.entity';
import { RoomsTableHead } from './RoomsTableHead';
import { RoomsTableBody } from './RoomsTableBody';

interface Props {
    rooms: LocationReport[];
    onHoverItem: (value: string) => void;
    hoveredItem: RoomId;
}

export const RoomsTable: React.FC<Props> = ({ rooms, onHoverItem, hoveredItem }) => (
    <Table>
        <RoomsTableHead />
        <RoomsTableBody rooms={rooms} onHoverItem={onHoverItem} hoveredItem={hoveredItem} />
    </Table>
);