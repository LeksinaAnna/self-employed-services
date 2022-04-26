import React from 'react';
import { Tabs } from '@skbkontur/react-ui';
import { Typography } from '../../../ui/Text/Typography';

interface Props {
    value: string;
    onValue: (value: string) => void;
}

export const TabsControl: React.FC<Props> = ({ value, onValue }) => (
    <Tabs value={value} onValueChange={onValue}>
        <Tabs.Tab id={'sent'} style={{ padding: 2 }}>
            <Typography fontSize="16px">Новые</Typography>
        </Tabs.Tab>
        <Tabs.Tab id={'accepted'} style={{ padding: 2 }}>
            <Typography fontSize="16px">Принятые</Typography>
        </Tabs.Tab>
        <Tabs.Tab id={'canceled'} style={{ padding: 2 }}>
            <Typography fontSize="16px">Отмененные</Typography>
        </Tabs.Tab>
    </Tabs>
);