import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { LargeRental } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { notActiveText, secondaryText } from '../../../../client-tools/styles/color';

interface Props {
    rental: LargeRental;
    time: string;
    isLast: boolean;
}

const ItemWrapper = styled.div<{ isActive: boolean }>(({isActive}) => ({
    width: 60,
    height: 35,
    backgroundColor: !isActive ? '#fff' : notActiveText,
    borderLeft: `1px solid ${secondaryText}`,
    position: 'relative',
    color: notActiveText
}));

const StartTimeWrapper = styled.div`
  position: absolute;
  left: -19px;
  bottom: -19px;
`;

const EndTimeWrapper = styled.div`
  position: absolute;
  right: -19px;
  bottom: -19px;
`;

export const CalendarCell: React.FC<Props> = observer(({ rental, time, isLast }) => {
    const {
        locationsStore: { endTime },
    } = useStores();

    return (
        <ItemWrapper isActive={!!rental}>
            <StartTimeWrapper>{time}</StartTimeWrapper>
            { isLast && <EndTimeWrapper>{endTime}</EndTimeWrapper> }
        </ItemWrapper>
    );
});
