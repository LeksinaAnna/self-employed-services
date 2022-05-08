import React from 'react';
import { Center, Input } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { Typography } from '../../../ui/Text/Typography';
import { notActiveText, secondaryText } from '../../../../client-tools/styles/color';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { SpaceBetweenContainer } from '../../../ui/Containers/SpaceBetweenContainer';
import { TabsControl } from './TabsControl';
import { RecordsTable } from './RecordsTable/RecordsTable';

export const RecordsList: React.FC = observer(() => {
    const { recordsStore } = useStores();
    const { records, searchValue, service, activeTab, countRecord } = recordsStore;

    return (
        <div style={{ marginTop: 80 }}>
            <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                Записи клиентов
            </Typography>
            <SpaceBetweenContainer align={'center'} style={{ marginTop: 10 }}>
                <TabsControl value={activeTab} onValue={service.onChangeTab} />
                <Input placeholder={'ФИО клиента'} value={searchValue} onValueChange={service.onValueSearch} />
            </SpaceBetweenContainer>

            {records.length > 0 && (
                <div>
                    <div style={{ marginTop: 10 }}>
                        <Typography color={secondaryText} fontSize="14px">
                            Показано {records.length} из {countRecord}
                        </Typography>
                    </div>
                    <RecordsTable records={records} accept={service.acceptRecord} cancel={service.cancelRecord} />
                </div>
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
