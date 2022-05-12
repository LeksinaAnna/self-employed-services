import React from 'react';
import { observer } from 'mobx-react-lite';
import { DatePicker } from '@skbkontur/react-ui';
import { Box } from '@mui/material';
import { useStores } from '../../../../client-tools/hooks/use-stores';

export const TimeList: React.FC = observer(() => {
    const { generalPageStore: { _timesStore }} = useStores();
    const { currentDate, setCurrentDate, generateTimes } = _timesStore;

    generateTimes();

    return (
        <div>
            <DatePicker onValueChange={setCurrentDate} value={currentDate} width={110} />
            <Box>

            </Box>
        </div>
    );
});