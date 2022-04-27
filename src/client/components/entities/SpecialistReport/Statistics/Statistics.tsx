import React from 'react';
import { Center, Gapped } from '@skbkontur/react-ui';
import { StatisticBlock } from './StatisticBlock';

export const Statistics: React.FC = () => {
    return (
        <Center style={{ marginTop: 20 }}>
            <Gapped gap={60}>
                <StatisticBlock topTitle="Всего записей" topValue={54} bottomTitle="Выручка" bottomValue={`23000 Р`} />
                <StatisticBlock
                    topTitle="Затраты на аренду"
                    topValue={`3000 Р`}
                    bottomTitle={'Прибыль'}
                    bottomValue={`20000 Р`}
                />
            </Gapped>
        </Center>
    );
};
