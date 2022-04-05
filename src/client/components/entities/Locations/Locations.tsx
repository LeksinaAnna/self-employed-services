import React from 'react';
import { DatePicker } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { HeadLocations } from './HeadLocations';

export const Locations: React.FC = observer(() => {
    const { locationsStore } = useStores();
    const { locations, currentDate, setCurrentDate } = locationsStore;

    return (
        <div>
            <HeadLocations />
            <div style={{ margin: '18px 0' }}>
                <DatePicker value={currentDate} width={100} onValueChange={setCurrentDate} />
            </div>
        </div>
    );
});
