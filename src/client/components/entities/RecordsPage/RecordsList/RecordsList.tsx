import React from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import { Center } from '@skbkontur/react-ui';
import { LargeRecord, RecordId } from '../../../../../server/modules/domains/records/entities/record.entity';
import { Typography } from '../../../ui/Text/Typography';
import { notActiveText } from '../../../../client-tools/styles/color';
import { ListItem } from './ListItem';
import { ListHead } from './ListHead';

interface Props {
    records: LargeRecord[];
    acceptRecord: (recordId: RecordId) => void;
    cancelRecord: (recordId: RecordId) => void;
}

export const RecordsList: React.FC<Props> = ({ records, acceptRecord, cancelRecord }) => (
    <div style={{ marginTop: 80 }}>
        {records.length > 0 && (
            <Table>
                <TableHead>
                    <ListHead />
                </TableHead>
                <TableBody>
                    {records.map(record => (
                        <ListItem
                            key={record.recordId}
                            record={record}
                            acceptRecord={acceptRecord}
                            cancelRecord={cancelRecord}
                        />
                    ))}
                </TableBody>
            </Table>
        )}
        {records.length === 0 && (
            <Center style={{ marginTop: 50 }}>
                <Typography color={notActiveText} fontSize={'24px'}>
                    Записи отсутствуют
                </Typography>
            </Center>
        )}
    </div>
);
