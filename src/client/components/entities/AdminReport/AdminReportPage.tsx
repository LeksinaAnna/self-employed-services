import React from 'react';
import { observer } from 'mobx-react-lite';
import { Center, DatePicker } from '@skbkontur/react-ui';
import { Stack } from '@mui/material';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { notActiveText, secondaryText } from '../../../client-tools/styles/color';
import { Typography } from '../../ui/Text/Typography';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { Chart } from './Chart/Chart';
import { RoomsTable } from './RoomsTable/RoomsTable';
import { ReportFooter } from './ReportFooter';

export const AdminReportPage: React.FC = observer(() => {
    const { adminReportStore } = useStores();
    const {
        startDate,
        finishDate,
        setStartDate,
        setFinishDate,
        rooms,
        generalProfit,
        hoveredRoom,
        setHoveredRoom,
        service,
        duration,
    } = adminReportStore;

    useAsyncEffectWithError(
        async abortSignal => {
            await service.init(abortSignal);
        },
        [startDate, finishDate],
    );

    return (
        <div style={{ position: 'relative', height: '100%', marginBottom: 25 }}>
            <Stack spacing={2}>
                <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                    Отчёт
                </Typography>
                <div>
                    <DatePicker onValueChange={setStartDate} width={110} value={startDate} />
                    <span style={{ color: secondaryText, margin: '0 5px' }}>&mdash;</span>
                    <DatePicker onValueChange={setFinishDate} width={110} value={finishDate} />
                </div>
            </Stack>
            {generalProfit > 0 && (
                <div>
                    <Chart reportKoef={duration} onHoverItem={setHoveredRoom} hoveredRoom={hoveredRoom} rooms={rooms} />
                    <div style={{ textAlign: 'center', margin: 10 }}>
                        <Typography color={notActiveText} fontSize="16px">
                            График выручки с {startDate} по {finishDate}
                        </Typography>
                    </div>
                    <RoomsTable onHoverItem={setHoveredRoom} hoveredItem={hoveredRoom} rooms={rooms} />
                    <ReportFooter>
                        <Typography fontSize="20px">{generalProfit} руб.</Typography>
                    </ReportFooter>
                </div>
            )}
            {generalProfit === 0 && (
                <div>
                    <Center>
                        <Typography fontSize={'20px'} color={secondaryText}>
                            Данные отсутствуют
                        </Typography>
                    </Center>
                </div>
            )}
        </div>
    );
});
