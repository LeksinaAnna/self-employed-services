import React from 'react';
import styled from '@emotion/styled';
import { secondaryText } from '../../../../client-tools/styles/color';

interface Props {
    times: string[];
}

const TimesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    margin-top: 3px;
    margin-left: -15px;
`;

const ItemWrapper = styled.div`
    width: 61px;
    font-size: 14px;
    color: ${secondaryText};
`;

export const CalendarTimes: React.FC<Props> = ({ times }) => (
    <TimesWrapper>
        {times.map(time => (
            <ItemWrapper key={`times-${time}`}>{time}</ItemWrapper>
        ))}
    </TimesWrapper>
);
