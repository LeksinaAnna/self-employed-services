import React from 'react';
import { Center, DatePicker, Input } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { Pagination } from '@mui/material';
import { Typography } from '../../../ui/Text/Typography';
import { notActiveText, secondaryText } from '../../../../client-tools/styles/color';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { SpaceBetweenContainer } from '../../../ui/Containers/SpaceBetweenContainer';
import { TabsControl } from './TabsControl';
import { RecordsTable } from './RecordsTable/RecordsTable';
import { RecordSettingsModal } from './RecordSettings/RecordSettingsModal';

export const RecordsList: React.FC = observer(() => {
    const { recordsStore } = useStores();
    const {
        records,
        searchValue,
        service,
        activeTab,
        openSettingsRecord,
        closeSettingsRecord,
        isSettingsRecordModal,
        selectedRecord,
        startDateRecord,
        finishDateRecord,
        pagesNum,
        currentPage,
    } = recordsStore;

    return (
        <div style={{ marginTop: 80 }}>
            <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                Записи клиентов
            </Typography>
            <TabsControl value={activeTab} onValue={service.onChangeTab} />
            <SpaceBetweenContainer align={'center'} style={{ marginTop: 10 }}>
                {activeTab === 'accepted' && (
                    <div>
                        <DatePicker width={110} onValueChange={service.onChangeStartDate} value={startDateRecord} />
                        <span style={{ color: secondaryText, margin: '0 5px' }}>&mdash;</span>
                        <DatePicker width={110} onValueChange={service.onChangeFinishDate} value={finishDateRecord} />
                    </div>
                )}
                <Input placeholder={'ФИО клиента'} value={searchValue} onValueChange={service.onValueSearch} />
            </SpaceBetweenContainer>

            {records.length > 0 && (
                <RecordsTable
                    records={records}
                    accept={service.acceptRecord}
                    cancel={service.cancelRecord}
                    openSettingsRecord={openSettingsRecord}
                />
            )}
            {records.length === 0 && (
                <Center style={{ marginTop: 50 }}>
                    <Typography color={notActiveText} fontSize={'24px'}>
                        Записи отсутствуют
                    </Typography>
                </Center>
            )}
            {isSettingsRecordModal && (
                <RecordSettingsModal
                    record={selectedRecord}
                    onClose={closeSettingsRecord}
                    accept={service.updateRecord}
                />
            )}
            {pagesNum > 1 && (
                <div style={{ marginTop: 20 }}>
                    <Pagination
                        color="primary"
                        variant="outlined"
                        count={pagesNum}
                        page={currentPage}
                        onChange={(event, page) => service.changePage(page)}
                    />
                </div>
            )}
        </div>
    );
});
