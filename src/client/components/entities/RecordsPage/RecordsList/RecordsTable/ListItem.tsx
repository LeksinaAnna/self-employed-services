import React, { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Button } from '@skbkontur/react-ui';
import { LargeRecord, RecordId } from '../../../../../../server/modules/domains/records/entities/record.entity';
import { RecordInfo } from './RecordInfo';

interface Props {
    record: LargeRecord;
    acceptRecord: (recordId: RecordId) => void;
    cancelRecord: (recordId: RecordId) => void;
    openSettings: (record: LargeRecord) => void;
}

export const ListItem: React.FC<Props> = ({ record, acceptRecord, cancelRecord, openSettings }) => {
    const [loading, setLoading] = useState(false);

    const onCancel = async () => {
        setLoading(true);
        await cancelRecord(record.recordId);
        setLoading(false);
    }

    const onAccept = async () => {
        setLoading(true);
        await acceptRecord(record.recordId);
        setLoading(false);
    }

    return (
        <TableRow>
            <TableCell style={{ padding: 5 }}>
                <RecordInfo record={record} />
            </TableCell>
            <TableCell style={{ padding: 5 }}>
                {record.status === 'sent' && (
                    <Button disabled={loading} use="success" onClick={onAccept}>
                        Принять
                    </Button>
                )}
            </TableCell>
            <TableCell style={{ padding: 5 }}>
                {record.status !== 'canceled' && (
                    <Button disabled={loading} use="danger" onClick={onCancel}>
                        Отклонить
                    </Button>
                )}
            </TableCell>
            {record.status !== 'canceled' &&
                <TableCell style={{ padding: 5 }}>
                    <Button onClick={() => openSettings(record)}>Изменить</Button>
                </TableCell>
            }
        </TableRow>
    );
};
