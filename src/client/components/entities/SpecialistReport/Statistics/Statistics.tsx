import React from 'react';
import { Center, Gapped } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { StatisticBlock } from './StatisticBlock';

export const Statistics: React.FC = observer(() => {
    const { specialistReportStore } = useStores();
    const { profit, expenses, income, countRecords } = specialistReportStore;

    return (
        <Center style={{ marginTop: 20 }}>
            <Gapped gap={60}>
                <StatisticBlock
                    topTitle="Всего записей"
                    topValue={countRecords}
                    bottomTitle="Выручка"
                    bottomValue={`${income} Р`}
                />
                <StatisticBlock
                    topTitle="Затраты на аренду"
                    topValue={`${expenses} Р`}
                    bottomTitle={'Прибыль'}
                    bottomValue={`${profit} Р`}
                />
            </Gapped>
        </Center>
    );
});
