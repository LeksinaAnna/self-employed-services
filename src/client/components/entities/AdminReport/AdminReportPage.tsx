import React from 'react';
import { observer } from 'mobx-react-lite';
import { DatePicker } from '@skbkontur/react-ui';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { greenText, notActiveText, secondaryText } from '../../../client-tools/styles/color';
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
        totalProfit,
        hoveredRoom,
        setHoveredRoom,
        service,
    } = adminReportStore;

    useAsyncEffectWithError(async abortSignal => {
        await service.init(abortSignal);
    }, [startDate, finishDate]);

    return (
        <div style={{ position: 'relative', height: '100%', marginBottom: 25 }}>
            <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                Отчёт
            </Typography>
            {rooms && <Chart onHoverItem={setHoveredRoom} hoveredRoom={hoveredRoom} rooms={rooms} />}
            <div style={{ textAlign: 'center', margin: 10 }}>
                <Typography color={notActiveText} fontSize="16px">
                    График выручки с {startDate} по {finishDate}
                </Typography>
            </div>
            <div>
                <DatePicker onValueChange={setStartDate} width={100} value={startDate} />
                <span style={{ color: secondaryText, margin: '0 5px' }}>&mdash;</span>
                <DatePicker onValueChange={setFinishDate} width={100} value={finishDate} />
            </div>
            {rooms.length > 0 && <RoomsTable onHoverItem={setHoveredRoom} hoveredItem={hoveredRoom} rooms={rooms} />}
            {rooms.length > 0 && (
                <ReportFooter>
                    <Typography fontSize="20px" color={greenText}>
                        {totalProfit} руб.
                    </Typography>
                </ReportFooter>
            )}
        </div>
    );
});
