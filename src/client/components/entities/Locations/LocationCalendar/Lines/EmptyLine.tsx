import React  from 'react';
import styled from '@emotion/styled';
import { CalendarCell } from '../CalendarCell';
import { secondaryText } from '../../../../../client-tools/styles/color';

interface Props {
    times: string[];
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

export const EmptyLine: React.FC<Props> = ({ times }) => (
    <LineWrapper>
        {times.map(time => (
            <div key={`empty-${time}`}>
                <CalendarCell key={`time-${time}`} width={60} hintText={'Нажмите, чтобы добавить аренду'} time={time} />
                <TimeWrapper>
                    {time}
                    {time === '21:00' && <span style={{ marginLeft: 20 }}>22:00</span>}
                </TimeWrapper>
            </div>
        ))}
    </LineWrapper>
);
