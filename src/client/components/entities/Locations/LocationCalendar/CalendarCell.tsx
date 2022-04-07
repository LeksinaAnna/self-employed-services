import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { LargeRental } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { notActiveText, secondaryText } from '../../../../client-tools/styles/color';

interface Props {
    rental: LargeRental;
}

const ItemWrapper = styled.div<{ isActive: boolean; widthProp?: number }>(({ isActive, widthProp }) => ({
    width: `${61 * widthProp}px`,
    height: 35,
    backgroundColor: !isActive ? '#fff' : notActiveText,
    boxShadow: `0 0 0 1px ${secondaryText}`,
    color: notActiveText,
}));

export const CalendarCell: React.FC<Props> = ({ rental }) => {
    const getDeference = () => {
        const startTime = Number(moment(rental.startDate).format('HH'));
        const finishTime = Number(moment(rental.finishDate).format('HH'));
        return finishTime - startTime;
    };

    return <ItemWrapper isActive={!!rental} widthProp={!!rental ? getDeference() : 1} />;
};
