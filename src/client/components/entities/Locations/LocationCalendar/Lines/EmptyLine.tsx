import React from 'react';
import styled from '@emotion/styled';
import { secondaryText } from '../../../../../client-tools/styles/color';
import { CalendarCell } from '../CalendarCell';

interface Props {
    times: string[];
    openModal: (time: string, position: number) => void;
}

const LineWrapper = styled.div`
    display: flex;
    z-index: 0;
`;

const TimeWrapper = styled.div`
    font-size: 14px;
    color: ${secondaryText};
    margin: 4px 0 0 -10px;
`;

export const EmptyLine: React.FC<Props> = ({ times, openModal }) => (
    <LineWrapper>
        {times.map((time, index) => (
            <div key={`empty-${time}`}>
                {/* position = берем порядковый номер ячейки умножаем на ее ширину и отнимаем половину ширины */}
                <CalendarCell widthProp={60} onClick={() => openModal(time, (index + 1) * 60 - 30)} />
                <TimeWrapper>
                    {time}
                    {time === '21:00' && <span style={{ marginLeft: 20 }}>22:00</span>}
                </TimeWrapper>
            </div>
        ))}
    </LineWrapper>
);
