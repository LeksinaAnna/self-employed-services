import React from 'react';
import { TableCell, TableRow } from '@mui/material';

export const ListHead: React.FC = () => (
    <TableRow>
        <TableCell width="75%" style={{ padding: 10}}/>
        <TableCell style={{ padding: 10}} />
        <TableCell style={{ padding: 10}} />
    </TableRow>
);