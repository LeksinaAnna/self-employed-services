import React from 'react';
import { observer } from 'mobx-react-lite';
import { Gapped } from '@skbkontur/react-ui';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { secondaryText } from '../../../../client-tools/styles/color';
import { CalendarCell } from './CalendarCell';

export const LocationCalendar: React.FC = observer(() => {
    const { locationsStore } = useStores();
    const { times, rentals } = locationsStore;

    return (
        <div style={{ border: `1px solid ${secondaryText}`, borderLeft: 'none', display: 'flex' }}>
            {times.map(
                (time, index) =>
                    index + 1 < rentals.size && (
                        <CalendarCell
                            isLast={index + 2 === rentals.size}
                            key={time}
                            time={time}
                            rental={rentals.get(time)}
                        />
                    ),
            )}
        </div>
    );
});
