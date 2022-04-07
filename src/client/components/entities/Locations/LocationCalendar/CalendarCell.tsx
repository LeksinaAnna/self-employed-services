import React from 'react';
import { Hint } from '@skbkontur/react-ui';
import moment from 'moment';
import styled from '@emotion/styled';
import { LargeRental } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { darkBackground, notActiveText, secondaryText } from '../../../../client-tools/styles/color';

interface Props {
    rental: LargeRental;
}

const ItemWrapper = styled.div<{ isActive?: boolean; widthProp?: number }>(({ isActive, widthProp }) => ({
    width: `${61 * widthProp}px`,
    height: 35,
    backgroundColor: !isActive ? '#fff' : notActiveText,
    boxShadow: `0 0 0 1px ${secondaryText}`,
    color: notActiveText,
    cursor: 'pointer',
    ['&:hover']: {
        backgroundColor: !isActive && darkBackground,
    },
}));

export const CalendarCell: React.FC<Props> = ({ rental }) => {
    const getDeference = () => {
        const startTime = Number(moment(rental.startDate).format('HH'));
        const finishTime = Number(moment(rental.finishDate).format('HH'));
        return finishTime - startTime;
    };

    const renderText = () => {
        const startTime = moment(rental.startDate).format('HH:mm');
        const finishTime = moment(rental.finishDate).format('HH:mm');

        return (
            <div>
                <div style={{ fontWeight: 700 }}>{rental?.profile?.fullName}</div>
                <div>{startTime} - {finishTime}</div>
            </div>
        )
    }

    return (
        <>
            {rental !== null && (
                <Hint text={renderText()}>
                    <ItemWrapper isActive widthProp={getDeference()} />
                </Hint>
            )}
            {rental === null && <ItemWrapper widthProp={1} />}
        </>
    );
};
