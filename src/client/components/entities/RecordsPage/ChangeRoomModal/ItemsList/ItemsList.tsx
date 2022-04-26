import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LargeRoom, RoomId } from '../../../../../../server/modules/domains/rooms/entities/room.entity';
import { RoomItem } from './RoomItem';

interface Props {
    items: LargeRoom[];
    changeRoom: (roomId: RoomId) => void;
}

export const ItemsList: React.FC<Props> = ({ items, changeRoom }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
            </TableRow>
        </TableHead>
        <TableBody>
            {items.length > 0 && items.map(room => <RoomItem key={room.roomId} item={room} changeRoom={changeRoom} />)}
        </TableBody>
    </Table>

);