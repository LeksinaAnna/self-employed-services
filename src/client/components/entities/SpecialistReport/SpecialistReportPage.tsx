import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Center, DatePicker } from '@skbkontur/react-ui';
import { Pagination, Stack } from '@mui/material';
import { Typography } from '../../ui/Text/Typography';
import { notActiveText, secondaryText } from '../../../client-tools/styles/color';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { Statistics } from './Statistics/Statistics';
import { TableInfo } from './TableInfo/TableInfo';

export const SpecialistReportPage: React.FC = observer(() => {
    const { specialistReportStore } = useStores();
    const {
        startDate,
        finishDate,
        setStartDate,
        setFinishDate,
        service,
        clientsReport,
        destroy,
        currentPage,
        countPages,
    } = specialistReportStore;

    useAsyncEffectWithError(
        async abortSignal => {
            await service.init(abortSignal);
        },
        [startDate, finishDate],
    );

    useEffect(() => destroy, []);

    return (
        <Stack spacing={3}>
            <Typography fontSize="34px" color={secondaryText} fontWeight={700}>
                Отчёт
            </Typography>
            <div>
                <DatePicker onValueChange={setStartDate} width={110} value={startDate} />
                <span style={{ color: secondaryText, margin: '0 5px' }}>&mdash;</span>
                <DatePicker onValueChange={setFinishDate} width={110} value={finishDate} />
            </div>
            <Statistics />
            <Center>
                <Typography fontSize="18px" color={notActiveText}>
                    {`Статистика с ${startDate} по ${finishDate}`}
                </Typography>
            </Center>
            <div>
                {clientsReport.length > 0 && <TableInfo reports={clientsReport} />}
                {clientsReport.length === 0 && (
                    <Center>
                        <Typography fontSize={'20px'} color={secondaryText}>
                            Данные отсутствуют
                        </Typography>
                    </Center>
                )}
            </div>
            {countPages > 1 && (
                <Pagination
                    variant="outlined"
                    color="primary"
                    page={currentPage}
                    count={countPages}
                    onChange={(event, page) => service.changePage(page)}
                />
            )}
        </Stack>
    );
});
