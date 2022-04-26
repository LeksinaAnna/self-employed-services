import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Typography } from '../../../ui/Text/Typography';
import { secondaryText } from '../../../../client-tools/styles/color';

export const ListHead: React.FC = () => (
    <TableRow>
        <TableCell width="75%" style={{ padding: '15px 5px' }}>
            <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                Записи клиентов
            </Typography>
        </TableCell>
        <TableCell />
        <TableCell />
    </TableRow>
);