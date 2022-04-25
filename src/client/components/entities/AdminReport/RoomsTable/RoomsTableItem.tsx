import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { RoomWithProfit } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { Typography } from '../../../ui/Text/Typography';
import { greenText, hoveredColor, orangeText, secondaryText } from '../../../../client-tools/styles/color';

interface Props {
    room: RoomWithProfit;
    onHoverItem: (value: string) => void;
    isActive?: boolean;
}

export const RoomsTableItem: React.FC<Props> = ({ room, onHoverItem, isActive }) => {
    // Получем время в формате 1ч 20 минут
    const getDuration = (duration: number): string => {
        const hours = Math.trunc(duration / 60);
        const minutes = duration % 60 > 0 ? `${duration % 60} мин` : '';

        return `${hours} ч ${minutes}`;
    };

    return (
        <TableRow
            onMouseEnter={() => onHoverItem(room.roomId)}
            onMouseLeave={() => onHoverItem(null)}
            style={{ background: isActive && hoveredColor }}
        >
            <TableCell align="left" style={{ padding: '10px 5px' }}>
                <Typography fontSize="16px" color={secondaryText}>
                    {room.title}
                </Typography>
            </TableCell>
            <TableCell align="left" style={{ padding: '10px 5px' }}>
                <Typography fontSize="16px" color={orangeText}>
                    {room.price},00 руб/ч
                </Typography>
            </TableCell>
            <TableCell align="left" style={{ padding: '10px 5px' }}>
                <Typography fontSize="16px" color={secondaryText}>
                    {getDuration(room.duration)}
                </Typography>
            </TableCell>
            <TableCell align="left" style={{ padding: '10px 5px' }}>
                <Typography fontSize="16px" color={greenText}>
                    {room.profit} руб
                </Typography>
            </TableCell>
        </TableRow>
    );
};
