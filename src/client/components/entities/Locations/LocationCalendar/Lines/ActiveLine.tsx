import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { CalendarCell } from '../CalendarCell';
import { LargeRental } from '../../../../../../server/modules/domains/rentals/entities/rental.entity';

interface Props {
    rentals: LargeRental[];
}

const CellWrapper = styled.div<{ leftProp: number | string }>(({ leftProp }) => ({
    position: 'absolute',
    left: leftProp,
    top: 0,
}));

export const ActiveLine: React.FC<Props> = ({ rentals }) => {
    const getPosition = (rental: LargeRental) => {
        // получаем часы:минуты и разбиваем их на отдельные сущности
        const [hours, minutes] = moment(rental.startDate).format('HH:mm').split(':');

        // Получаем начальное время в минутах
        const allMinutes = Number(hours) * 60 + Number(minutes);

        // Выясняем сколько минут между началом рабочего дня и стартовым временем аренды. В минутах
        return allMinutes - 60 * 8;
    };

    const getWidth = (rental: LargeRental): number => {
        const start = Number(moment(rental.startDate).format('x'));
        const finish = Number(moment(rental.finishDate).format('x'));

        // в 1 сек 1000мс, в 1минуте 60 сек. Результат выше приходит нам в мс
        return (finish - start) / 1000 / 60;
    };

    return (
        <>
            {rentals?.map(rental => (
                <CellWrapper key={rental.rentalId} leftProp={getPosition(rental)}>
                    <CalendarCell hintText={'Тут инфа об аренде'} width={getWidth(rental)} isActive />
                </CellWrapper>
            ))}
        </>
    );
};
