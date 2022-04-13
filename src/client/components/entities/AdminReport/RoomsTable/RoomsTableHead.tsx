import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { Typography } from '../../../ui/Text/Typography';
import { notActiveText } from '../../../../client-tools/styles/color';

export const RoomsTableHead = () => (
    <TableHead>
        <TableRow>
            <TableCell align="left" style={{ padding: 5 }} width={'55%'}>
                <Typography color={notActiveText}>Локация</Typography>
            </TableCell>
            <TableCell align="left" style={{ padding: 5 }}>
                <Typography color={notActiveText}>Цена</Typography>
            </TableCell>
            <TableCell align="left" style={{ padding: 5 }}>
                <Typography color={notActiveText}>Сумма аренды</Typography>
            </TableCell>
            <TableCell align="left" style={{ padding: 5 }}>
                <Typography color={notActiveText}>Прибыль</Typography>
            </TableCell>
        </TableRow>
    </TableHead>
);