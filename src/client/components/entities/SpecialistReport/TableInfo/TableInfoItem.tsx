import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { ClientReport } from '../../../../../server/modules/domains/report/entities/report.entity';

interface Props {
    item: ClientReport;
}

export const TableInfoItem: React.FC<Props> = ({ item }) => (
    <TableRow>
        <TableCell style={{ padding: '10px 5px' }}>{item.name}</TableCell>
        <TableCell style={{ padding: '10px 5px' }}>{item.amountServices} руб.</TableCell>
        <TableCell style={{ padding: '10px 5px' }}>{item.servicesCount}</TableCell>
        <TableCell style={{ padding: '10px 5px' }}>{item.profit} руб.</TableCell>
    </TableRow>
);