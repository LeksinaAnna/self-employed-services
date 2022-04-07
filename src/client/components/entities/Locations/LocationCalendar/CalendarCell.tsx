import React from 'react';
import styled from '@emotion/styled';
import { darkBackground, notActiveText, secondaryText } from '../../../../client-tools/styles/color';

interface Cell {
    widthProp: number;
    isActive?: boolean;
}

/**
 * Компонент-ячейка для календаря
 *
 * @param widthProp - ширина ячейки 1минута = 1px
 * @param isActive - boolean, активная ли ячейка
 */
export const CalendarCell = styled.div<Cell>(({ widthProp, isActive }) => ({
    width: widthProp,
    height: 35,
    boxShadow: `0 0 0 1px ${secondaryText}`,
    backgroundColor: !isActive ? '#fff' : notActiveText,
    cursor: 'pointer',
    ['&:hover']: {
        backgroundColor: !isActive ? darkBackground : '#b6b3b3',
    }
}));
