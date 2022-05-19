import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Typography } from '../../../ui/Text/Typography';
import { hoveredColor } from '../../../../client-tools/styles/color';
import { LocationReport } from '../../../../../server/modules/domains/report/entities/report.entity';

interface Props {
    room: LocationReport;
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
                <Typography fontSize="16px">{room.title}</Typography>
            </TableCell>
            <TableCell align="left" style={{ padding: '10px 5px' }}>
                <Typography fontSize="16px">{room.price},00 руб/ч</Typography>
            </TableCell>
            <TableCell align="left" style={{ padding: '10px 5px' }}>
                <Typography fontSize="16px">{getDuration(room.duration)}</Typography>
            </TableCell>
            <TableCell align="left" style={{ padding: '10px 5px' }}>
                <Typography fontSize="16px">{room.profit} руб</Typography>
            </TableCell>
        </TableRow>
    );
};
