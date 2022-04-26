import React, { useState } from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import { Center } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { Typography } from '../../../ui/Text/Typography';
import { notActiveText, secondaryText } from '../../../../client-tools/styles/color';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../../client-tools/hooks/use-async-effect';
import { RecordStatus } from '../../../../../server/modules/domains/records/entities/record.entity';
import { ListItem } from './ListItem';
import { ListHead } from './ListHead';
import { TabsControl } from './TabsControl';


export const RecordsList: React.FC = observer(() => {
    const { recordsStore } = useStores();
    const {records, service} = recordsStore;
    const [activeTab, setActiveTab] = useState('sent');

    useAsyncEffectWithError(async (abortSignal) => {
        await service.getRecords(activeTab as RecordStatus, abortSignal);
    }, [activeTab]);

    return (
        <div style={{ marginTop: 80 }}>
            <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                Записи клиентов
            </Typography>
            <div style={{ marginTop: 10 }}>
                <TabsControl value={activeTab} onValue={setActiveTab} />
            </div>
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
                                acceptRecord={service.acceptRecord}
                                cancelRecord={service.cancelRecord}
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
});
