import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Center, DatePicker } from '@skbkontur/react-ui';
import { Typography } from '../../ui/Text/Typography';
import { notActiveText, secondaryText } from '../../../client-tools/styles/color';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { Statistics } from './Statistics/Statistics';
import { TableInfo } from './TableInfo/TableInfo';

export const SpecialistReportPage: React.FC = observer(() => {
    const { specialistReportStore } = useStores();
    const { startDate, finishDate, setStartDate, setFinishDate, service, clientsReport, destroy } = specialistReportStore;

    useAsyncEffectWithError(
        async abortSignal => {
            await service.init(abortSignal);
        },
        [startDate, finishDate],
    );

    useEffect(() => destroy, []);

    return (
        <div>
            <Typography fontSize="34px" color={secondaryText} fontWeight={700}>
                Отчёт
            </Typography>
            <div style={{ marginTop: 10 }}>
                <DatePicker onValueChange={setStartDate} width={100} value={startDate} />
                <span style={{ color: secondaryText, margin: '0 5px' }}>&mdash;</span>
                <DatePicker onValueChange={setFinishDate} width={100} value={finishDate} />
            </div>
            <Statistics />
            <Center style={{ marginTop: 10 }}>
                <Typography fontSize="18px" color={notActiveText}>
                    {`Статистика с ${startDate} по ${finishDate}`}
                </Typography>
            </Center>
            <div style={{ marginTop: 40 }}>
                {clientsReport.length > 0 && <TableInfo reports={clientsReport} />}
                {clientsReport.length === 0 && (
                    <Center>
                        <Typography fontSize={'20px'} color={secondaryText}>
                            Данные отсутствуют
                        </Typography>
                    </Center>
                )}
            </div>
        </div>
    );
});
