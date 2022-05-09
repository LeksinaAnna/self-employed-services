import React from 'react';
import { Tabs } from '@skbkontur/react-ui';
import { Typography } from '../../ui/Text/Typography';

interface Props {
    value: string;
    onValue: (value: string) => void;
}

export const LocationTabs: React.FC<Props> = ({ value, onValue }) => (
    <Tabs value={value} onValueChange={onValue}>
        <Tabs.Tab id={'all'} style={{ padding: 2 }}>
            <Typography fontSize="16px">Все</Typography>
        </Tabs.Tab>
        <Tabs.Tab id={'barber'} style={{ padding: 2 }}>
            <Typography fontSize="16px">Парикмахер</Typography>
        </Tabs.Tab>
        <Tabs.Tab id={'browist'} style={{ padding: 2 }}>
            <Typography fontSize="16px">Бровист</Typography>
        </Tabs.Tab>
        <Tabs.Tab id={'lashmaker'} style={{ padding: 2 }}>
            <Typography fontSize="16px">Лешмейкер</Typography>
        </Tabs.Tab>
        <Tabs.Tab id={'manicurist'} style={{ padding: 2 }}>
            <Typography fontSize="16px">Маникюр</Typography>
        </Tabs.Tab>
    </Tabs>
);