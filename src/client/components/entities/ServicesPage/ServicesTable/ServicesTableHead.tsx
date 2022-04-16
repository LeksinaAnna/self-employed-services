import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Typography } from '../../../ui/Text/Typography';
import { notActiveText } from '../../../../client-tools/styles/color';

export const ServicesTableHead: React.FC = () => (
    <TableRow>
        <TableCell width="65%" style={{ padding: 5 }}>
            <Typography color={notActiveText}>Наименование</Typography>
        </TableCell>
        <TableCell style={{ padding: 5 }}>
            <Typography color={notActiveText}>Длительность</Typography>
        </TableCell>
        <TableCell style={{ padding: 5 }}>
            <Typography color={notActiveText}>Стоимость</Typography>
        </TableCell>
        <TableCell />
    </TableRow>
);
