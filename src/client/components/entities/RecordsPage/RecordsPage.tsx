import React from 'react';
import { observer } from 'mobx-react-lite';
import { DatePicker } from '@skbkontur/react-ui';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { RecordsPageHead } from './RecordsPageHead';

export const RecordsPage: React.FC = observer(() => {
    const { recordsStore } = useStores();
    const { currentDate, setCurrentDate } = recordsStore;
    
    return (
        <div>
            <RecordsPageHead />
            <div style={{ margin: '18px 0' }}>
                <DatePicker width={100} onValueChange={setCurrentDate} value={currentDate} />
            </div>
        </div>
    );
});