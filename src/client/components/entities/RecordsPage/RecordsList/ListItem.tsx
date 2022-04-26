import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Button } from '@skbkontur/react-ui';
import { LargeRecord, RecordId } from '../../../../../server/modules/domains/records/entities/record.entity';
import { RecordInfo } from './RecordInfo';

interface Props {
    record: LargeRecord;
    acceptRecord: (recordId: RecordId) => void;
    cancelRecord: (recordId: RecordId) => void;
}

export const ListItem: React.FC<Props> = ({ record, acceptRecord, cancelRecord }) => (
    <TableRow>
        <TableCell style={{ padding: 5 }}>
            <RecordInfo record={record} />
        </TableCell>
        <TableCell style={{ padding: 5 }}>
            {record.status === 'sent' && (
                <Button use="success" onClick={() => acceptRecord(record.recordId)}>
                    Принять
                </Button>
            )}
        </TableCell>
        <TableCell style={{ padding: 5 }}>
            {record.status === 'sent' && (
                <Button use="danger" onClick={() => cancelRecord(record.recordId)}>
                    Отклонить
                </Button>
            )}
        </TableCell>
    </TableRow>
);
