import React from 'react';
import { observer } from 'mobx-react-lite';
import { Center, DatePicker } from '@skbkontur/react-ui';
import { Grid } from '@mui/material';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../../client-tools/hooks/use-async-effect';
import { TimeItem } from './TimeItem';

export const TimeList: React.FC = observer(() => {
    const {
        generalPageStore: { _timesStore },
    } = useStores();
    const { currentDate, service, times, getDisabledTime, selectedTime, setSelectedTime } = _timesStore;

    useAsyncEffectWithError(async abortSignal => {
        await service.init(abortSignal);
    }, []);

    return (
        <div>
            <Center style={{ margin: 10 }}>
                <DatePicker onValueChange={service.onChangeDate} value={currentDate} width={110} />
            </Center>
            <div style={{ margin: 10 }}>
                <div style={{ padding: '20px 180px' }}>
                    <Grid container spacing={2} >
                        {times.map(time => (
                            <TimeItem
                                key={time}
                                time={time}
                                selectedTime={selectedTime}
                                onSelect={() => setSelectedTime(time)}
                                disabled={getDisabledTime(time)}
                            />
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
});
