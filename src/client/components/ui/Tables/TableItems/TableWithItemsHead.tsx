import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Typography } from '../../Text/Typography';
import { secondaryText } from '../../../../client-tools/styles/color';

export const TableWithItemsHead = () => (
    <TableRow >
        <TableCell width="65%" style={{ padding: 5 }} />
        <TableCell style={{ padding: 5 }} />
        <TableCell align='right' style={{ padding: 5 }}>
            <Typography color={secondaryText} fontSize={'14px'}>
                Комментарий
            </Typography>
        </TableCell>
    </TableRow>
);