import React from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import { ClientReport } from '../../../../../server/modules/domains/report/entities/report.entity';
import { TableInfoHead } from './TableInfoHead';
import { TableInfoItem } from './TableInfoItem';

interface Props {
    reports: ClientReport[];
}

export const TableInfo: React.FC<Props> = ({ reports }) => (
    <Table>
        <TableHead>
            <TableInfoHead />
        </TableHead>
        <TableBody>
            {reports.map(report => (
                <TableInfoItem item={report} key={`${report.name}-${report.amountServices}`} />
            ))}
        </TableBody>
    </Table>
);
