import React from 'react';
import styled from '@emotion/styled';
import { defaultPortalColor, hoveredColor } from '../../../client-tools/styles/color';

interface Cell {
    widthProp: number | string;
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
    boxShadow: `0 0 0 1px ${defaultPortalColor}`,
    backgroundColor: !isActive ? '#fff' : defaultPortalColor,
    cursor: 'pointer',
    ['&:hover']: {
        backgroundColor: hoveredColor,
    },
}));