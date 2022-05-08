import React from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import { LargeRecord, RecordId } from '../../../../../../server/modules/domains/records/entities/record.entity';
import { ListHead } from './ListHead';
import { ListItem } from './ListItem';

interface Props {
    records: LargeRecord[];
    accept: (recordId: RecordId) => void;
    cancel: (recordId: RecordId) => void;
}

export const RecordsTable: React.FC<Props> = ({ records, accept, cancel }) => (
    <Table>
        <TableHead>
            <ListHead />
        </TableHead>
        <TableBody>
            {records.map(record => (
                <ListItem key={record.recordId} record={record} acceptRecord={accept} cancelRecord={cancel} />
            ))}
        </TableBody>
    </Table>
);
